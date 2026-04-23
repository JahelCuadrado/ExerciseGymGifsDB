#!/usr/bin/env node
/**
 * Audita los nombres en español: detecta nombres con palabras repetidas o
 * palabras en inglés que se nos hayan colado.
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "api", "es", "exercises");
const files = [];
(function walk(d) {
	for (const f of fs.readdirSync(d)) {
		const fp = path.join(d, f);
		if (fs.statSync(fp).isDirectory()) walk(fp);
		else if (f.endsWith(".json")) files.push(fp);
	}
})(dir);

const data = files.map((f) => {
	const j = JSON.parse(fs.readFileSync(f, "utf8"));
	return { slug: j.slug, name: j.name, muscle: j.muscleSlug || j.muscle };
});

const STOP = new Set([
	"con", "de", "del", "en", "el", "la", "los", "las", "a", "y", "o",
	"un", "una", "unas", "unos", "para", "por", "sobre", "entre", "al",
]);

const repeat = data.filter((d) => {
	const w = d.name
		.toLowerCase()
		.split(/[\s,()]+/)
		.filter((x) => x && x.length > 1 && !STOP.has(x));
	const c = {};
	w.forEach((x) => (c[x] = (c[x] || 0) + 1));
	return Object.values(c).some((v) => v > 1);
});

const eng =
	/\b(with|and|press|row|push|pull|fly|hold|bench|cable|dumbbell|barbell|machine|stretch|extension|abduction|adduction|hip|arm|chest|back|shoulder|knee|standing|seated|lying|kneeling|incline|decline|reverse|wide|close|grip|side|front|over|under|alternate|alternating|male|female|elbow|toes|legs|knees|bend|slingers|hanging|pike|brazo|recto|doblado|completo)\b/i;
const mixed = data.filter((d) => eng.test(d.name));

console.log("Total ejercicios:", data.length);
console.log("Nombres con palabras repetidas:", repeat.length);
console.log("Nombres con palabras EN/raras:", mixed.length);

const N = parseInt(process.argv[2] || "20", 10);
console.log(`\n--- ${N} duplicados ---`);
repeat.slice(0, N).forEach((d) => console.log(`  ${d.muscle}/${d.slug}  ->  ${d.name}`));
console.log(`\n--- ${N} mezclados ---`);
mixed.slice(0, N).forEach((d) => console.log(`  ${d.muscle}/${d.slug}  ->  ${d.name}`));
