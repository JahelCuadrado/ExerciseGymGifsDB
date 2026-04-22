#!/usr/bin/env node
/**
 * Generador de API estática a partir de las carpetas de GIFs.
 *
 * Estructura generada en /api:
 *   api/index.json                      -> metadata global
 *   api/muscles.json                    -> lista de grupos musculares
 *   api/muscles/<muscle>.json           -> ejercicios por músculo
 *   api/equipment.json + equipment/<eq>.json
 *   api/bodyparts.json + bodyparts/<bp>.json
 *   api/categories.json + categories/<cat>.json
 *   api/exercises.json                  -> todos los ejercicios
 *   api/exercises/<muscle>/<slug>.json  -> detalle individual
 *
 * Cada ejercicio expone:
 *   {
 *     id, slug, name, nameEs, muscle, bodyPart, equipment, category,
 *     secondaryMuscles, instructions, file, gifUrl
 *   }
 *
 * Los campos manuales (nameEs, secondaryMuscles, instructions) se cargan desde
 * overrides/<muscle>/<slug>.json. Cualquier campo presente en el override
 * (no vacío) sobrescribe al inferido, lo que permite corregir equipment,
 * category, etc. cuando la heurística falle.
 */

const fs = require("fs");
const path = require("path");
const {
	inferEquipment,
	inferBodyPart,
	inferCategory,
} = require("./enrich");
const {
	translateSlug,
	inferSecondary,
	generateInstructions,
} = require("./translate");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "api");
const OVERRIDES = path.join(ROOT, "overrides");

const BASE_URL = (
	process.env.API_BASE_URL ||
	"https://cdn.jsdelivr.net/gh/USER/REPO@main"
).replace(/\/+$/, "");

const IGNORE = new Set([
	"api",
	"scripts",
	"overrides",
	".git",
	".github",
	".vscode",
	"node_modules",
]);

function titleCase(slug) {
	return slug
		.replace(/-/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase())
		.replace(/\bV (\d+)\b/g, "v$1");
}

function isMuscleDir(name) {
	if (IGNORE.has(name) || name.startsWith(".")) return false;
	return fs.statSync(path.join(ROOT, name)).isDirectory();
}

function ensureDir(p) {
	fs.mkdirSync(p, { recursive: true });
}

function writeJson(file, data) {
	ensureDir(path.dirname(file));
	fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function loadOverride(muscle, slug) {
	const file = path.join(OVERRIDES, muscle, `${slug}.json`);
	if (!fs.existsSync(file)) return null;
	try {
		return JSON.parse(fs.readFileSync(file, "utf8"));
	} catch (err) {
		console.warn(`! Override inválido: ${file} (${err.message})`);
		return null;
	}
}

function isEmpty(value) {
	if (value == null) return true;
	if (typeof value === "string") return value.trim() === "";
	if (Array.isArray(value)) return value.length === 0;
	return false;
}

function applyOverride(base, override) {
	if (!override) return base;
	const out = { ...base };
	for (const [key, value] of Object.entries(override)) {
		if (isEmpty(value)) continue;
		out[key] = value;
	}
	return out;
}

function pushTo(map, key, value) {
	if (!map.has(key)) map.set(key, []);
	map.get(key).push(value);
}

function dumpGroup(folder, singular, map) {
	const summary = [];
	for (const [key, list] of [...map.entries()].sort((a, b) =>
		a[0].localeCompare(b[0])
	)) {
		writeJson(path.join(OUT, folder, `${key}.json`), {
			[singular]: key,
			count: list.length,
			exercises: list,
		});
		summary.push({
			[singular]: key,
			count: list.length,
			endpoint: `${folder}/${key}.json`,
		});
	}
	writeJson(path.join(OUT, `${folder}.json`), summary);
}

function main() {
	if (fs.existsSync(OUT)) {
		fs.rmSync(OUT, { recursive: true, force: true });
	}
	ensureDir(OUT);

	const muscles = fs.readdirSync(ROOT).filter(isMuscleDir).sort();

	const allExercises = [];
	const muscleSummaries = [];
	const byEquipment = new Map();
	const byBodyPart = new Map();
	const byCategory = new Map();
	let withEs = 0;
	let withInstructions = 0;

	for (const muscle of muscles) {
		const dir = path.join(ROOT, muscle);
		const gifs = fs
			.readdirSync(dir)
			.filter((f) => f.toLowerCase().endsWith(".gif"))
			.sort();

		const exercises = gifs.map((file) => {
			const slug = file.replace(/\.gif$/i, "");
			const relPath = `${muscle}/${file}`;
			const bodyPart = inferBodyPart(muscle);
			const equipment = inferEquipment(slug);
			const category = inferCategory(muscle, slug);
			const name = titleCase(slug);

			const base = {
				id: `${muscle}/${slug}`,
				slug,
				name,
				nameEs: translateSlug(slug),
				muscle,
				bodyPart,
				equipment,
				category,
				secondaryMuscles: inferSecondary(muscle, slug),
				instructions: generateInstructions({
					name,
					muscle,
					equipment,
					category,
				}),
				file: relPath,
				gifUrl: `${BASE_URL}/${relPath}`,
			};

			const merged = applyOverride(base, loadOverride(muscle, slug));

			if (!isEmpty(merged.nameEs)) withEs++;
			if (!isEmpty(merged.instructions)) withInstructions++;

			pushTo(byEquipment, merged.equipment, merged);
			pushTo(byBodyPart, merged.bodyPart, merged);
			pushTo(byCategory, merged.category, merged);

			return merged;
		});

		writeJson(path.join(OUT, "muscles", `${muscle}.json`), {
			muscle,
			count: exercises.length,
			exercises,
		});

		for (const ex of exercises) {
			writeJson(
				path.join(OUT, "exercises", muscle, `${ex.slug}.json`),
				ex
			);
		}

		muscleSummaries.push({
			muscle,
			count: exercises.length,
			endpoint: `muscles/${muscle}.json`,
		});

		allExercises.push(...exercises);
	}

	dumpGroup("equipment", "equipment", byEquipment);
	dumpGroup("bodyparts", "bodyPart", byBodyPart);
	dumpGroup("categories", "category", byCategory);

	writeJson(path.join(OUT, "muscles.json"), muscleSummaries);
	writeJson(path.join(OUT, "exercises.json"), {
		count: allExercises.length,
		exercises: allExercises,
	});
	writeJson(path.join(OUT, "index.json"), {
		name: "Exercise GIF API",
		baseUrl: BASE_URL,
		generatedAt: new Date().toISOString(),
		totals: {
			muscles: muscleSummaries.length,
			exercises: allExercises.length,
			equipment: byEquipment.size,
			bodyParts: byBodyPart.size,
			categories: byCategory.size,
			withSpanishName: withEs,
			withInstructions,
		},
		endpoints: {
			muscles: "muscles.json",
			exercises: "exercises.json",
			muscleDetail: "muscles/{muscle}.json",
			exerciseDetail: "exercises/{muscle}/{slug}.json",
			equipmentList: "equipment.json",
			equipmentDetail: "equipment/{equipment}.json",
			bodyPartList: "bodyparts.json",
			bodyPartDetail: "bodyparts/{bodyPart}.json",
			categoryList: "categories.json",
			categoryDetail: "categories/{category}.json",
		},
		muscles: muscleSummaries,
	});

	console.log(
		`OK -> ${muscleSummaries.length} grupos | ${allExercises.length} ejercicios`
	);
	console.log(
		`     equipment=${byEquipment.size} bodyParts=${byBodyPart.size} categories=${byCategory.size}`
	);
	console.log(
		`     con nameEs=${withEs} | con instructions=${withInstructions}`
	);
	console.log(`BASE_URL = ${BASE_URL}`);
	console.log(`Salida:   ${path.relative(ROOT, OUT)}/`);
}

main();
