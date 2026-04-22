#!/usr/bin/env node
/**
 * Generador de API estática multilingüe.
 *
 * Estructura:
 *   api/index.json                          -> metadata global y idiomas disponibles
 *   api/{lang}/index.json                   -> metadata por idioma
 *   api/{lang}/muscles.json                 -> lista de grupos
 *   api/{lang}/muscles/{muscle}.json        -> ejercicios por grupo
 *   api/{lang}/equipment.json + equipment/{eq}.json
 *   api/{lang}/bodyparts.json + bodyparts/{bp}.json
 *   api/{lang}/categories.json + categories/{cat}.json
 *   api/{lang}/exercises.json
 *   api/{lang}/exercises/{muscle}/{slug}.json
 *
 * Idiomas soportados: en, es
 *
 * Cada ejercicio expone (mismo esquema en cualquier idioma):
 *   { id, slug, name, muscle, bodyPart, equipment, category,
 *     secondaryMuscles, instructions, file, gifUrl }
 *
 * Los overrides en overrides/<muscle>/<slug>.json pueden contener:
 *   - claves planas (nameEs, instructions, ...) -> compat con la versión anterior
 *   - claves por idioma:  { en: { name, instructions }, es: { name, instructions } }
 */

const fs = require("fs");
const path = require("path");
const { inferEquipment, inferBodyPart, inferCategory } = require("./enrich");
const {
	translateSlug,
	inferSecondary,
	generateInstructionsEs,
	generateInstructionsEn,
} = require("./translate");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "api");
const OVERRIDES = path.join(ROOT, "overrides");

const BASE_URL = (
	process.env.API_BASE_URL ||
	"https://cdn.jsdelivr.net/gh/USER/REPO@main"
).replace(/\/+$/, "");

const LANGS = ["en", "es"];

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

/**
 * Devuelve el override aplicable a un idioma concreto.
 * Soporta dos formatos:
 *   - { nameEs: "...", instructions: [...] }   (legacy plano)
 *   - { en: { name, instructions }, es: {...}, secondaryMuscles: [] }
 */
function pickLangOverride(override, lang) {
	if (!override) return {};
	const out = {};
	// Comunes (no dependen de idioma)
	if (Array.isArray(override.secondaryMuscles)) {
		out.secondaryMuscles = override.secondaryMuscles;
	}
	for (const k of ["equipment", "bodyPart", "category"]) {
		if (!isEmpty(override[k])) out[k] = override[k];
	}
	// Por idioma
	const langBlock = override[lang];
	if (langBlock && typeof langBlock === "object") {
		if (!isEmpty(langBlock.name)) out.name = langBlock.name;
		if (!isEmpty(langBlock.instructions))
			out.instructions = langBlock.instructions;
	}
	// Compat legacy
	if (lang === "es") {
		if (!isEmpty(override.nameEs)) out.name = override.nameEs;
		if (!isEmpty(override.instructions) && !out.instructions) {
			out.instructions = override.instructions;
		}
	} else if (lang === "en") {
		if (!isEmpty(override.nameEn)) out.name = override.nameEn;
	}
	return out;
}

function applyOverride(base, override) {
	if (!override) return base;
	const out = { ...base };
	for (const [k, v] of Object.entries(override)) {
		if (isEmpty(v)) continue;
		out[k] = v;
	}
	return out;
}

function pushTo(map, key, value) {
	if (!map.has(key)) map.set(key, []);
	map.get(key).push(value);
}

function dumpGroup(langOut, folder, singular, map) {
	const summary = [];
	for (const [key, list] of [...map.entries()].sort((a, b) =>
		a[0].localeCompare(b[0])
	)) {
		writeJson(path.join(langOut, folder, `${key}.json`), {
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
	writeJson(path.join(langOut, `${folder}.json`), summary);
}

function buildExercise(lang, muscle, slug, file, override) {
	const relPath = `${muscle}/${file}`;
	const bodyPart = inferBodyPart(muscle);
	const equipment = inferEquipment(slug);
	const category = inferCategory(muscle, slug);
	const nameInferred =
		lang === "es" ? translateSlug(slug) : titleCase(slug);
	const instructionsInferred =
		lang === "es"
			? generateInstructionsEs({
					name: nameInferred,
					muscle,
					equipment,
					category,
			  })
			: generateInstructionsEn({
					name: nameInferred,
					muscle,
					equipment,
					category,
			  });

	const base = {
		id: `${muscle}/${slug}`,
		slug,
		name: nameInferred,
		muscle,
		bodyPart,
		equipment,
		category,
		secondaryMuscles: inferSecondary(muscle, slug),
		instructions: instructionsInferred,
		file: relPath,
		gifUrl: `${BASE_URL}/${relPath}`,
	};

	return applyOverride(base, pickLangOverride(override, lang));
}

function main() {
	if (fs.existsSync(OUT)) {
		fs.rmSync(OUT, { recursive: true, force: true });
	}
	ensureDir(OUT);

	const muscles = fs.readdirSync(ROOT).filter(isMuscleDir).sort();

	const totals = {};
	for (const lang of LANGS) {
		const langOut = path.join(OUT, lang);
		ensureDir(langOut);

		const allExercises = [];
		const muscleSummaries = [];
		const byEquipment = new Map();
		const byBodyPart = new Map();
		const byCategory = new Map();

		for (const muscle of muscles) {
			const dir = path.join(ROOT, muscle);
			const gifs = fs
				.readdirSync(dir)
				.filter((f) => f.toLowerCase().endsWith(".gif"))
				.sort();

			const exercises = gifs.map((file) => {
				const slug = file.replace(/\.gif$/i, "");
				const override = loadOverride(muscle, slug);
				const ex = buildExercise(lang, muscle, slug, file, override);
				pushTo(byEquipment, ex.equipment, ex);
				pushTo(byBodyPart, ex.bodyPart, ex);
				pushTo(byCategory, ex.category, ex);
				return ex;
			});

			writeJson(path.join(langOut, "muscles", `${muscle}.json`), {
				muscle,
				count: exercises.length,
				exercises,
			});

			for (const ex of exercises) {
				writeJson(
					path.join(langOut, "exercises", muscle, `${ex.slug}.json`),
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

		dumpGroup(langOut, "equipment", "equipment", byEquipment);
		dumpGroup(langOut, "bodyparts", "bodyPart", byBodyPart);
		dumpGroup(langOut, "categories", "category", byCategory);

		writeJson(path.join(langOut, "muscles.json"), muscleSummaries);
		writeJson(path.join(langOut, "exercises.json"), {
			count: allExercises.length,
			exercises: allExercises,
		});
		writeJson(path.join(langOut, "index.json"), {
			name: "Exercise GIF API",
			language: lang,
			baseUrl: BASE_URL,
			generatedAt: new Date().toISOString(),
			totals: {
				muscles: muscleSummaries.length,
				exercises: allExercises.length,
				equipment: byEquipment.size,
				bodyParts: byBodyPart.size,
				categories: byCategory.size,
			},
			endpoints: {
				muscles: `${lang}/muscles.json`,
				exercises: `${lang}/exercises.json`,
				muscleDetail: `${lang}/muscles/{muscle}.json`,
				exerciseDetail: `${lang}/exercises/{muscle}/{slug}.json`,
				equipmentList: `${lang}/equipment.json`,
				equipmentDetail: `${lang}/equipment/{equipment}.json`,
				bodyPartList: `${lang}/bodyparts.json`,
				bodyPartDetail: `${lang}/bodyparts/{bodyPart}.json`,
				categoryList: `${lang}/categories.json`,
				categoryDetail: `${lang}/categories/{category}.json`,
			},
			muscles: muscleSummaries,
		});

		totals[lang] = {
			muscles: muscleSummaries.length,
			exercises: allExercises.length,
			equipment: byEquipment.size,
			bodyParts: byBodyPart.size,
			categories: byCategory.size,
		};
	}

	// Index global con la lista de idiomas y totales
	writeJson(path.join(OUT, "index.json"), {
		name: "Exercise GIF API",
		baseUrl: BASE_URL,
		generatedAt: new Date().toISOString(),
		languages: LANGS,
		defaultLanguage: "en",
		totals,
		endpoints: {
			languageRoot: "{lang}/",
			languageIndex: "{lang}/index.json",
			musclesByLang: "{lang}/muscles.json",
			exerciseDetail: "{lang}/exercises/{muscle}/{slug}.json",
		},
	});

	console.log(`OK -> idiomas=${LANGS.join(",")}`);
	for (const lang of LANGS) {
		const t = totals[lang];
		console.log(
			`  [${lang}] muscles=${t.muscles} exercises=${t.exercises} equipment=${t.equipment} bodyParts=${t.bodyParts} categories=${t.categories}`
		);
	}
	console.log(`BASE_URL = ${BASE_URL}`);
	console.log(`Salida:   ${path.relative(ROOT, OUT)}/`);
}

main();
