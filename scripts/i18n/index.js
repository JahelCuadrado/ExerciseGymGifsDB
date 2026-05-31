/**
 * Multilingual translation dispatcher.
 *
 * Routes slug translation to the appropriate language module.
 * Each language module exports a `translateSlug(slug)` function.
 *
 * Supported languages: en, es, de, fr, zh, pt, ja
 */

const translateDe = require("./de").translateSlug;
const translateFr = require("./fr").translateSlug;
const translateZh = require("./zh").translateSlug;
const translatePt = require("./pt").translateSlug;
const translateJa = require("./ja").translateSlug;

/**
 * Translate an exercise slug into the specified language.
 * @param {string} slug - Exercise slug (e.g. "barbell-bench-press")
 * @param {string} lang - Target language code (de, fr, zh, pt, ja)
 * @returns {string} Translated exercise name
 */
function translateSlugForLang(slug, lang) {
	switch (lang) {
		case "de":
			return translateDe(slug);
		case "fr":
			return translateFr(slug);
		case "zh":
			return translateZh(slug);
		case "pt":
			return translatePt(slug);
		case "ja":
			return translateJa(slug);
		default:
			throw new Error(`Unsupported language for translation: ${lang}`);
	}
}

module.exports = { translateSlugForLang };
