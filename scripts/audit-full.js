"use strict";
/**
 * Comprehensive API quality audit (EN + ES).
 * Validates:
 *  - name quality (missing Spanish artifacts in EN, raw slug tokens)
 *  - secondaryMuscles coverage
 *  - filter completeness (every exercise appears under muscle/equipment/bodyPart/category)
 *  - cross-language parity (same IDs in both languages)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const API = path.join(ROOT, "api");

function readJson(p) {
	return JSON.parse(fs.readFileSync(p, "utf8"));
}

function walkExercises(lang) {
	const base = path.join(API, lang, "exercises");
	const out = [];
	for (const muscle of fs.readdirSync(base)) {
		const muscleDir = path.join(base, muscle);
		if (!fs.statSync(muscleDir).isDirectory()) continue;
		for (const file of fs.readdirSync(muscleDir)) {
			if (!file.endsWith(".json")) continue;
			out.push({ muscle, file, path: path.join(muscleDir, file) });
		}
	}
	return out;
}

function auditLanguage(lang) {
	const exercises = walkExercises(lang);
	const issues = {
		missingName: [],
		emptyInstructions: [],
		missingSecondary: [],
		suspiciousName: [],
	};

	// Spanish diacritics used to catch Spanish leaking into EN.
	const spanishChars = /[áéíóúñ¿¡]/i;
	// Spanish-only function words (excluding those shared with EN like "cable").
	const spanishWords =
		/\b(con|sin|del|una|uno|unas|unos|la|el|los|las|sobre|bajo|para|por|hacia|contra|entre|cada|mano|manos|pierna|piernas|brazo|brazos|cadera|cabeza|pecho|espalda|rodilla|tumbado|sentado|parado|pie|cuerpo|peso|banca|banco|polea|cuerda|mancuerna|m[áa]quina|banda|fitball)\b/i;
	const rawSlug = /\b[a-z]+-[a-z]+\b/;

	for (const ex of exercises) {
		const data = readJson(ex.path);
		const key = `${ex.muscle}/${data.slug}`;

		if (!data.name || data.name.trim().length === 0) issues.missingName.push(key);

		if (!Array.isArray(data.instructions) || data.instructions.length === 0)
			issues.emptyInstructions.push(key);

		if (!Array.isArray(data.secondaryMuscles) || data.secondaryMuscles.length === 0) {
			// Allow zero secondary muscles for isolation/stretch/cardio exercises.
			const category = data.category || "";
			const slug = data.slug || "";
			const muscle = data.muscle || ex.muscle;
			const isStretch = /stretch|stretches/.test(slug) || category === "stretching";
			const isCardio = category === "cardio";
			// Rotator cuff / small isolation where empty secondary is fine.
			const isRotatorCuff =
				/shoulder-internal|shoulder-external|internal-rotation|external-rotation|rotator-cuff/.test(
					slug
				);
			// Muscles where isolation (empty secondary) is acceptable.
			const isolationMuscles = new Set([
				"abs",
				"abductors",
				"adductors",
				"calves",
				"forearms",
				"levator-scapulae",
				"serratus-anterior",
			]);
			const isIsolation = isolationMuscles.has(muscle);
			if (!isStretch && !isCardio && !isIsolation && !isRotatorCuff)
				issues.missingSecondary.push(key);
		}

		if (lang === "en") {
			if (spanishChars.test(data.name) || spanishWords.test(data.name))
				issues.suspiciousName.push(`${key}  ->  ${data.name}`);
			if (rawSlug.test(data.name))
				issues.suspiciousName.push(`${key}  ->  ${data.name}  (raw slug?)`);
		}
	}

	return { lang, count: exercises.length, issues };
}

function auditFilters(lang) {
	const exercises = walkExercises(lang).map((ex) => readJson(ex.path));
	const equipment = new Map();
	const bodyParts = new Map();
	const categories = new Map();

	for (const ex of exercises) {
		if (ex.equipment) equipment.set(ex.equipment, (equipment.get(ex.equipment) || 0) + 1);
		if (ex.bodyPart) bodyParts.set(ex.bodyPart, (bodyParts.get(ex.bodyPart) || 0) + 1);
		if (ex.category) categories.set(ex.category, (categories.get(ex.category) || 0) + 1);
	}

	const missing = [];
	for (const [equip] of equipment) {
		const p = path.join(API, lang, "equipment", `${equip}.json`);
		if (!fs.existsSync(p)) missing.push(`equipment/${equip}`);
	}
	for (const [bp] of bodyParts) {
		const p = path.join(API, lang, "bodyparts", `${bp}.json`);
		if (!fs.existsSync(p)) missing.push(`bodyparts/${bp}`);
	}
	for (const [cat] of categories) {
		const p = path.join(API, lang, "categories", `${cat}.json`);
		if (!fs.existsSync(p)) missing.push(`categories/${cat}`);
	}

	return {
		equipment: Object.fromEntries(equipment),
		bodyParts: Object.fromEntries(bodyParts),
		categories: Object.fromEntries(categories),
		missingFilters: missing,
	};
}

function parity() {
	const en = new Set(walkExercises("en").map((x) => `${x.muscle}/${x.file}`));
	const es = new Set(walkExercises("es").map((x) => `${x.muscle}/${x.file}`));
	const onlyEn = [...en].filter((x) => !es.has(x));
	const onlyEs = [...es].filter((x) => !en.has(x));
	return { onlyEn, onlyEs };
}

// --- main ---
const langs = ["en", "es"];
let anyFail = false;

for (const lang of langs) {
	const { count, issues } = auditLanguage(lang);
	const f = auditFilters(lang);
	console.log(`\n=== [${lang}] ejercicios=${count} ===`);
	console.log(`  equipment: ${Object.keys(f.equipment).length}  (${JSON.stringify(f.equipment)})`);
	console.log(`  bodyParts: ${Object.keys(f.bodyParts).length}  (${JSON.stringify(f.bodyParts)})`);
	console.log(`  categories: ${Object.keys(f.categories).length} (${JSON.stringify(f.categories)})`);
	console.log(`  missingName: ${issues.missingName.length}`);
	console.log(`  emptyInstructions: ${issues.emptyInstructions.length}`);
	console.log(`  missingSecondary: ${issues.missingSecondary.length}`);
	if (issues.missingSecondary.length) {
		console.log("    primeros 10:");
		issues.missingSecondary.slice(0, 10).forEach((k) => console.log(`      ${k}`));
	}
	console.log(`  suspiciousName: ${issues.suspiciousName.length}`);
	if (issues.suspiciousName.length) {
		issues.suspiciousName.slice(0, 15).forEach((k) => console.log(`      ${k}`));
	}
	console.log(`  missingFilters: ${f.missingFilters.length}  ${f.missingFilters.join(", ")}`);
	if (
		issues.missingName.length ||
		issues.emptyInstructions.length ||
		f.missingFilters.length
	)
		anyFail = true;
}

const p = parity();
console.log(`\n=== parity ===  onlyEn=${p.onlyEn.length}  onlyEs=${p.onlyEs.length}`);
if (p.onlyEn.length) p.onlyEn.slice(0, 10).forEach((x) => console.log(`  only-en: ${x}`));
if (p.onlyEs.length) p.onlyEs.slice(0, 10).forEach((x) => console.log(`  only-es: ${x}`));

process.exit(anyFail ? 1 : 0);
