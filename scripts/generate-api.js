#!/usr/bin/env node
/**
 * Generador de API estática a partir de las carpetas de GIFs.
 *
 * Estructura generada en /api:
 *   api/index.json                -> metadata + lista de grupos musculares
 *   api/muscles.json              -> lista simple de grupos musculares
 *   api/exercises.json            -> array con todos los ejercicios
 *   api/muscles/<muscle>.json     -> ejercicios filtrados por grupo
 *   api/exercises/<id>.json       -> detalle individual de cada ejercicio
 *
 * Cada ejercicio expone:
 *   {
 *     id:        "biceps/barbell-curl",
 *     slug:      "barbell-curl",
 *     name:      "Barbell Curl",
 *     muscle:    "biceps",
 *     file:      "biceps/barbell-curl.gif",
 *     gifUrl:    "<BASE_URL>/biceps/barbell-curl.gif"
 *   }
 *
 * Configura BASE_URL con la variable de entorno API_BASE_URL o editando el
 * default que aparece debajo. Recomendado:
 *   - jsDelivr (rápido, con CDN):
 *       https://cdn.jsdelivr.net/gh/<USER>/<REPO>@<BRANCH>
 *   - Raw GitHub:
 *       https://raw.githubusercontent.com/<USER>/<REPO>/<BRANCH>
 *   - GitHub Pages:
 *       https://<USER>.github.io/<REPO>
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "api");

const BASE_URL = (
	process.env.API_BASE_URL ||
	"https://cdn.jsdelivr.net/gh/USER/REPO@main"
).replace(/\/+$/, "");

const IGNORE = new Set([
	"api",
	"scripts",
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
	if (IGNORE.has(name)) return false;
	if (name.startsWith(".")) return false;
	const full = path.join(ROOT, name);
	return fs.statSync(full).isDirectory();
}

function ensureDir(p) {
	fs.mkdirSync(p, { recursive: true });
}

function writeJson(file, data) {
	ensureDir(path.dirname(file));
	fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function main() {
	if (fs.existsSync(OUT)) {
		fs.rmSync(OUT, { recursive: true, force: true });
	}
	ensureDir(OUT);

	const muscles = fs
		.readdirSync(ROOT)
		.filter(isMuscleDir)
		.sort((a, b) => a.localeCompare(b));

	const allExercises = [];
	const muscleSummaries = [];

	for (const muscle of muscles) {
		const dir = path.join(ROOT, muscle);
		const gifs = fs
			.readdirSync(dir)
			.filter((f) => f.toLowerCase().endsWith(".gif"))
			.sort((a, b) => a.localeCompare(b));

		const exercises = gifs.map((file) => {
			const slug = file.replace(/\.gif$/i, "");
			const relPath = `${muscle}/${file}`;
			return {
				id: `${muscle}/${slug}`,
				slug,
				name: titleCase(slug),
				muscle,
				file: relPath,
				gifUrl: `${BASE_URL}/${relPath}`,
			};
		});

		// /api/muscles/<muscle>.json
		writeJson(path.join(OUT, "muscles", `${muscle}.json`), {
			muscle,
			count: exercises.length,
			exercises,
		});

		// /api/exercises/<muscle>/<slug>.json
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

	writeJson(path.join(OUT, "muscles.json"), muscleSummaries);
	writeJson(path.join(OUT, "exercises.json"), {
		count: allExercises.length,
		exercises: allExercises,
	});
	writeJson(path.join(OUT, "index.json"), {
		name: "Exercise GIF API",
		baseUrl: BASE_URL,
		generatedAt: new Date().toISOString(),
		totalMuscles: muscleSummaries.length,
		totalExercises: allExercises.length,
		endpoints: {
			muscles: "muscles.json",
			exercises: "exercises.json",
			muscleDetail: "muscles/{muscle}.json",
			exerciseDetail: "exercises/{muscle}/{slug}.json",
		},
		muscles: muscleSummaries,
	});

	console.log(
		`OK -> ${muscleSummaries.length} grupos | ${allExercises.length} ejercicios`
	);
	console.log(`BASE_URL = ${BASE_URL}`);
	console.log(`Salida:   ${path.relative(ROOT, OUT)}/`);
}

main();
