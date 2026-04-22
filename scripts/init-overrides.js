#!/usr/bin/env node
/**
 * Crea plantillas vacías de overrides para cada ejercicio que aún no tenga una.
 *
 * Salida: overrides/<muscle>/<slug>.json
 *
 * Cada plantilla incluye los campos manuales que el generador no puede inferir.
 * Edítalos cuando quieras y al regenerar la API se mezclan con los datos
 * automáticos. Los campos vacíos se ignoran.
 *
 * Uso:
 *   node scripts/init-overrides.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OVERRIDES = path.join(ROOT, "overrides");

const IGNORE = new Set([
	"api",
	"scripts",
	"overrides",
	".git",
	".github",
	".vscode",
	"node_modules",
]);

function isMuscleDir(name) {
	if (IGNORE.has(name) || name.startsWith(".")) return false;
	return fs.statSync(path.join(ROOT, name)).isDirectory();
}

function ensureDir(p) {
	fs.mkdirSync(p, { recursive: true });
}

function main() {
	const muscles = fs.readdirSync(ROOT).filter(isMuscleDir).sort();
	let created = 0;
	let existed = 0;

	for (const muscle of muscles) {
		const dir = path.join(ROOT, muscle);
		const gifs = fs
			.readdirSync(dir)
			.filter((f) => f.toLowerCase().endsWith(".gif"));

		for (const file of gifs) {
			const slug = file.replace(/\.gif$/i, "");
			const out = path.join(OVERRIDES, muscle, `${slug}.json`);
			if (fs.existsSync(out)) {
				existed++;
				continue;
			}
			ensureDir(path.dirname(out));
			const template = {
				nameEs: "",
				secondaryMuscles: [],
				instructions: [],
			};
			fs.writeFileSync(
				out,
				JSON.stringify(template, null, 2) + "\n",
				"utf8"
			);
			created++;
		}
	}

	console.log(`Plantillas creadas: ${created}`);
	console.log(`Ya existentes:      ${existed}`);
	console.log(`Carpeta:            overrides/`);
}

main();
