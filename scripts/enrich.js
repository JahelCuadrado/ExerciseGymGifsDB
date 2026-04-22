/**
 * Inferencia y constantes compartidas para enriquecer la API.
 */

// Orden importa: las claves más específicas van primero.
const EQUIPMENT_RULES = [
	{ key: "smith", match: /(^|-)smith(-|$)/ },
	{ key: "ez-bar", match: /(^|-)ez-(bar|barbell)(-|$)/ },
	{ key: "olympic-barbell", match: /(^|-)olympic-barbell(-|$)/ },
	{ key: "barbell", match: /(^|-)barbell(-|$)/ },
	{ key: "dumbbell", match: /(^|-)dumbbell(-|$)/ },
	{ key: "kettlebell", match: /(^|-)kettlebell(-|$)/ },
	{ key: "cable", match: /(^|-)cable(-|$)/ },
	{ key: "lever", match: /(^|-)lever(-|$)/ },
	{ key: "band", match: /(^|-)(band|resistance-band)(-|$)/ },
	{ key: "machine", match: /(^|-)machine(-|$)/ },
	{ key: "bodyweight", match: /(^|-)(bodyweight|self|weighted)(-|$)/ },
];

// "olympic-barbell" lo mapeamos a "barbell" para cumplir el enum del usuario.
const EQUIPMENT_NORMALIZE = {
	"olympic-barbell": "barbell",
};

const BODY_PART_BY_MUSCLE = {
	abs: "core",
	abductors: "legs",
	adductors: "legs",
	biceps: "arms",
	calves: "legs",
	cardio: "cardio",
	delts: "shoulders",
	forearms: "arms",
	glutes: "legs",
	hamstrings: "legs",
	lats: "back",
	"levator-scapulae": "back",
	pectorals: "chest",
	quads: "legs",
	"serratus-anterior": "chest",
	spine: "back",
	traps: "back",
	triceps: "arms",
	"upper-back": "back",
};

function inferEquipment(slug) {
	for (const rule of EQUIPMENT_RULES) {
		if (rule.match.test(slug)) {
			return EQUIPMENT_NORMALIZE[rule.key] || rule.key;
		}
	}
	return "other";
}

function inferBodyPart(muscle) {
	return BODY_PART_BY_MUSCLE[muscle] || "other";
}

function inferCategory(muscle, slug) {
	if (muscle === "cardio") return "cardio";
	if (/(^|-)stretch(-|$|es|ing)/.test(slug)) return "stretching";
	if (/(^|-)(jump|jumping|plyo|hop|hopping|bounding)(-|$)/.test(slug)) {
		return "plyometrics";
	}
	return "strength";
}

module.exports = {
	inferEquipment,
	inferBodyPart,
	inferCategory,
};
