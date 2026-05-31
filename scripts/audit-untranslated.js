/**
 * Diagnostic script: finds all untranslated tokens per language.
 * Hooks into each module's internal dictionaries to find tokens
 * that pass through the fallback path without translation.
 */
const fs = require("fs");
const path = require("path");

// Gather all exercise slugs from the EN source
const exerciseDirs = fs.readdirSync("./api/en/exercises");
const allSlugs = [];
for (const muscle of exerciseDirs) {
	const muscleDir = path.join("./api/en/exercises", muscle);
	if (!fs.statSync(muscleDir).isDirectory()) continue;
	for (const file of fs.readdirSync(muscleDir)) {
		if (file.endsWith(".json")) {
			allSlugs.push(file.replace(".json", ""));
		}
	}
}
console.log(`Total slugs: ${allSlugs.length}`);

// For each language module, find tokens that aren't covered by any dictionary
const LANGS = ["de", "fr", "zh", "pt", "ja"];

for (const lang of LANGS) {
	// We need to access the internal dictionaries. Since the modules export translateSlug
	// but not the dictionaries, we'll require the file and parse it differently.
	// Actually, let's just re-implement the token detection logic inline.
	const modPath = path.resolve(`./scripts/i18n/${lang}.js`);
	const modSource = fs.readFileSync(modPath, "utf8");
	
	// Import the module - it exports translateSlug and possibly getUntranslated
	const mod = require(modPath);
	
	// Strategy: run translateSlug on each slug, then compare output tokens
	// against the slug tokens to find pass-through tokens.
	// A token is "untranslated" if it appears identically in both the slug and the output.
	
	const tokenFreq = {};
	let issueCount = 0;

	for (const slug of allSlugs) {
		const translated = mod.translateSlug(slug);
		// Tokenize the original slug
		const slugTokens = slug.split("-").filter(t => t.length > 0);
		
		// Find slug tokens that appear literally in the translated output (case-insensitive)
		const translatedLower = translated.toLowerCase();
		const untranslated = [];
		
		for (const tok of slugTokens) {
			if (tok.length < 2) continue;
			// Skip if it's a number
			if (/^\d+$/.test(tok)) continue;
			// Check if this English token appears verbatim in the output
			// Use word boundary check to avoid false matches
			const regex = new RegExp(`(^|[\\s,()\\-])${tok}([\\s,()\\-]|$)`, "i");
			if (regex.test(translatedLower)) {
				// It's in the output verbatim - likely untranslated
				// But check if the target language legitimately uses this word
				if (isLegitimateInLang(lang, tok)) continue;
				untranslated.push(tok);
			}
		}

		for (const tok of untranslated) {
			tokenFreq[tok] = (tokenFreq[tok] || 0) + 1;
		}
		if (untranslated.length > 0) issueCount++;
	}

	// Sort by frequency
	const sorted = Object.entries(tokenFreq).sort((a, b) => b[1] - a[1]);
	console.log(`\n[${lang.toUpperCase()}] ${issueCount} exercises with untranslated tokens, ${sorted.length} unique tokens`);
	console.log("Top 80:");
	sorted.slice(0, 80).forEach(([tok, count]) => console.log(`  ${tok}: ${count}`));
	
	// Write full list
	fs.writeFileSync(`./scripts/missing-${lang}.json`, JSON.stringify(sorted, null, 2));
}

/**
 * Check if a token is a legitimate word in the target language
 * (i.e., the fitness community actually uses this English word as-is)
 */
function isLegitimateInLang(lang, tok) {
	// Words that are legitimately used as English loan words in fitness across ALL languages
	const universalLoanWords = new Set([
		"push", "pull", "box", "step", "ball", "ring", "hip",
		"plank", "burpee", "clean", "snatch", "thruster", "muscle",
	]);
	if (universalLoanWords.has(tok)) return true;

	// German keeps many English terms
	if (lang === "de") {
		const deLoan = new Set([
			"dip", "dips", "curl", "curls", "crunch", "press",
			"pull", "push", "swing", "squat", "row", "fly",
			"hip", "thrust", "bridge", "plank", "box", "step",
			"hack", "split", "goblet", "sissy", "arnold", "pendlay",
			"zottman", "bradford", "jefferson", "scott", "clean", "snatch",
			"thruster", "burpee", "mountain", "climber", "face",
			"pullover", "kickback", "muscle", "up", "shrug",
			"good", "morning", "rack", "floor", "bosu",
		]);
		return deLoan.has(tok);
	}

	// French keeps many English terms
	if (lang === "fr") {
		const frLoan = new Set([
			"curl", "curls", "squat", "squats", "dip", "dips",
			"crunch", "crunches", "press", "swing", "pull",
			"push", "row", "rowing", "hip", "thrust", "bridge",
			"plank", "box", "step", "hack", "split",
			"goblet", "sissy", "arnold", "pendlay", "zottman",
			"bradford", "jefferson", "scott", "clean", "snatch",
			"thruster", "burpee", "mountain", "climber", "face",
			"pullover", "kickback", "muscle", "up", "shrug",
			"good", "morning", "rack", "floor", "bosu",
			"front", "fly", "superman", "dead", "bug",
		]);
		return frLoan.has(tok);
	}

	// Portuguese keeps some English terms
	if (lang === "pt") {
		const ptLoan = new Set([
			"curl", "curls", "hip", "thrust", "bridge",
			"plank", "box", "step", "hack", "split",
			"goblet", "sissy", "arnold", "pendlay", "zottman",
			"bradford", "jefferson", "scott", "clean", "snatch",
			"thruster", "burpee", "mountain", "climber",
			"pullover", "kickback", "muscle", "up", "shrug",
			"good", "morning", "rack", "floor", "bosu",
			"push", "swing", "press", "dip", "crunch",
			"face", "pull", "fly", "superman", "dead", "bug",
		]);
		return ptLoan.has(tok);
	}

	// Chinese - very few loan words kept in latin
	if (lang === "zh") {
		const zhLoan = new Set([
			"arnold", "pendlay", "zottman", "bradford", "jefferson", "scott",
			"bosu", "v",
		]);
		return zhLoan.has(tok);
	}

	// Japanese uses katakana for loan words, but some stay in latin
	if (lang === "ja") {
		const jaLoan = new Set([
			"arnold", "pendlay", "zottman", "bradford", "jefferson", "scott",
			"bosu", "v",
		]);
		return jaLoan.has(tok);
	}

	return false;
}
