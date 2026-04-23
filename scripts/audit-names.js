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

// Palabras 100% inglesas que NO se usan en español en este contexto.
// Excluimos "lateral", "posterior", "frontal", "rear", "front" porque son
// correctas en español. También palabras como "press", "curl", "crunch"...
const eng =
	/\b(with|and|the|of|to|for|in|on|at|from|by|under|over|behind|above|below|between|through|across|into|onto|against|beside|during|around|one|two|three|four|five|six|seven|eight|nine|ten|both|all|each|every|any|some|male|female|bent|straight|stretched|outstretched|standing|seated|sitting|lying|kneeling|squatting|prone|supine|pronated|supinated|shoulder|shoulders|elbow|elbows|knee|knees|arm|arms|leg|legs|hip|hips|chest|back|head|hand|hands|foot|feet|wrist|wrists|ankle|ankles|stretch|bend|reach|tap|taps|throw|throws|walk|run|jog|kick|kicks|hop|hops|twist|twists|lift|lifts|dip|dips|hold|raise|raises|fly|flies|flye|flyes|waist|thigh|thighs|palm|palms|groin|waiter|saw|kayak|thibadea|tennis|racquet|dynamic|static|runner|guillotine|piriformis|peroneal|span|wing|kettle|close|wide|narrow|neutral|reverse|diagonal|vertical|horizontal|medial|anterior|inner|outer|upper|lower|full|half|partial|empty|deep|shallow|heavy|light|slow|fast|hard|soft|high|low|tall|short|long|big|small|huge|tiny|round|square|wide|tight|loose|strong|weak|active|passive|pov|stirrups|support|squeeze|can|weighted|alternate|alternating|assisted|suspended|isometric|motion|position|version|gluteus|deltoid)\b/i;
const mixed = data.filter((d) => eng.test(d.name));

console.log("Total ejercicios:", data.length);
console.log("Nombres con palabras repetidas:", repeat.length);
console.log("Nombres con palabras EN/raras:", mixed.length);

const N = parseInt(process.argv[2] || "20", 10);
console.log(`\n--- ${N} duplicados ---`);
repeat.slice(0, N).forEach((d) => console.log(`  ${d.muscle}/${d.slug}  ->  ${d.name}`));
console.log(`\n--- ${N} mezclados ---`);
mixed.slice(0, N).forEach((d) => console.log(`  ${d.muscle}/${d.slug}  ->  ${d.name}`));
