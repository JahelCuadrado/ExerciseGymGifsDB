/**
 * Inferencia y constantes compartidas para enriquecer la API.
 */

// Orden importa: las claves más específicas van primero.
// Notas:
//  - "lever" y "machine" comparten semántica (máquina guiada). Mantenemos
//    "lever" como preferente porque engloba la mayoría de los GIFs de gimnasio.
//  - "bodyweight" cubre tanto peso corporal puro como movimientos con balón
//    medicinal / bosu / fitball / foam roller (todos asistidos pero sin carga
//    externa convencional). Se mantienen como "bodyweight" para poder filtrar
//    todo lo que NO requiere peso libre ni máquina.
const EQUIPMENT_RULES = [
	{ key: "smith", match: /(^|-)smith(-|$)/ },
	{ key: "ez-bar", match: /(^|-)ez-(bar|barbell)(-|$)/ },
	{ key: "olympic-barbell", match: /(^|-)olympic-barbell(-|$)/ },
	{ key: "barbell", match: /(^|-)(barbell|trap-bar|cambered-bar|landmine)(-|$)/ },
	{ key: "dumbbell", match: /(^|-)dumbbells?(-|$)/ },
	{ key: "kettlebell", match: /(^|-)kettlebells?(-|$)/ },
	{ key: "cable", match: /(^|-)(cable|pulley|rope-attachment|rope-crossover|rope-extension)(-|$)/ },
	{ key: "lever", match: /(^|-)(lever|hack)(-|$)/ },
	{ key: "band", match: /(^|-)(band|resistance-band|tubing|battling-ropes|battle-rope)(-|$)/ },
	{ key: "machine", match: /(^|-)(machine|sled|sledge|platform-slide|stepmill|cross-trainer|elliptical|treadmill)(-|$)/ },
	// Movimientos con accesorios livianos que no son peso libre ni máquina:
	// balón medicinal, bosu, fitball/stability-ball, foam roller, silla, caja,
	// pared, toalla, anillas, barra fija, suspensión, yoga, boxing.
	{
		key: "bodyweight",
		match:
			/(^|-)(bodyweight|self|weighted|medicine-ball|bosu|stability-ball|exercise-ball|swiss-ball|fitball|foam-roller|roller|chair|captains-chair|wall|towel|ring|rings|suspended|suspension|box|bench|vertical-bar|parallel-bars|dip-cage|dip|dips|chin|pull-up|push-up|sit-up|crunch|crunches|plank|bridge|squat|squats|split-squat|split-squats|lunge|stretch|jump|hop|burpee|mountain-climber|handstand|muscle-up|v-up|v-ups|v-sit|sit-ups|push-ups|pull-ups|chin-ups|knee-raise|leg-raise|hip-raise|hip-abduction|hip-abductor|hip-lift|hanging|hyperextension|back-extension|russian-twist|bicycle|flutter|scissor|cocoon|cocoons|inchworm|frog|maltese|planche|flag|l-sit|toe-touch|heel-touch|heel-toucher|heel-touchers|butt-up|butt-ups|bottoms-up|pelvic-tilt|clamshell|fire-hydrant|donkey-kick|donkey|glute-bridge|glute-ham-raise|side-lying|side-bend|side-plank|side-hip|dead-bug|bird-dog|superman|otis-up|sphinx|cobra|landmine-180|jumping-jack|high-knees|butt-kicks|arm-slingers|world-greatest|skip|run|walk|jog|air-bike|ski-erg|ski-ergometer|rowing-machine|calf-raise|calf-raises|calves|shoulder-tap|shoulder-taps|spell-caster|spine-twist|wheel-roller|wheel-rollerout|wind-sprint|wind-sprints|sprint|skater|ski-step|swing|butterfly|yoga|ankle-circle|ankle-circles|curl-up|elbow-to-knee|concentration|step-to|back-and-forth|bear-crawl|crawl|boxing|hook|cross-punch|jab|uppercut|astride-jumps|half-knee-bends|behind-neck-press|posterior-step|finger-curls?|wrist-curls?|wrist-circles?|wrist-rollerer|twist|twists|lying-twist|swimmer-kicks|tire-flip|power-clean|snatch|snatch-pull|clean|jerk|pulldown|lat-pulldown|rope-climb|skin-the-cat|korean|elbow-dips|scapula-dips|impossible-dips|stalder-press|triceps-dips|triceps-press|body-up|hands-bike|isometric|balance-board|quads|quick-feet|lower-back-curl|upward-facing-dog|inverted-row|kick-out|reclining|seated-wide-angle|oblique-crunches|prone|hug)(-|$)/,
	},
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
