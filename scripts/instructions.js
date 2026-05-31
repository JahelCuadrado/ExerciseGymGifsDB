/**
 * Movement-pattern-aware instruction generator.
 *
 * Replaces the old template-based system with unique, coaching-cue-driven
 * instructions for each exercise. Detects the movement pattern from the
 * exercise slug, then combines pattern-specific technique cues with
 * equipment setup, posture modifiers and breathing guidance.
 *
 * Patterns are ordered from most specific to most generic so the first
 * match wins.
 */

// ─────────────────────────────────────────────────────────────
// 1. MODIFIER DETECTION (posture, grip, laterality)
// ─────────────────────────────────────────────────────────────

/** @param {string} slug */
function detectModifiers(slug) {
	return {
		isSeated: /(^|-)seated(-|$)/.test(slug),
		isStanding: /(^|-)standing(-|$)/.test(slug),
		isLying: /(^|-)(lying|supine|prone)(-|$)/.test(slug),
		isIncline: /(^|-)incline(-|$)/.test(slug),
		isDecline: /(^|-)decline(-|$)/.test(slug),
		isKneeling: /(^|-)kneeling(-|$)/.test(slug),
		isOneArm: /(^|-)(one-arm|single-arm)(-|$)/.test(slug),
		isOneLeg: /(^|-)(one-leg|single-leg|one-legged)(-|$)/.test(slug),
		isAlternate: /(^|-)(alternate|alternating)(-|$)/.test(slug),
		isCloseGrip: /(^|-)close-grip(-|$)/.test(slug),
		isWideGrip: /(^|-)wide-grip(-|$)/.test(slug),
		isReverseGrip: /(^|-)(reverse-grip|underhand)(-|$)/.test(slug),
		isNeutralGrip: /(^|-)(neutral)(-|$)/.test(slug),
	};
}

// ─────────────────────────────────────────────────────────────
// 2. EQUIPMENT-AWARE TEXT SUBSTITUTION
// ─────────────────────────────────────────────────────────────
// Patterns reference "bar" because they were authored for barbell context.
// When the exercise uses a different equipment type, we post-process the
// core steps to replace "bar" with the correct noun.

/**
 * @param {string[]} steps - Core instruction steps.
 * @param {string} equipment - Equipment slug (e.g. 'dumbbell').
 * @param {string} lang - Language code.
 * @returns {string[]} Steps with equipment-corrected wording.
 */
function adaptStepsToEquipment(steps, equipment, lang) {
	if (!["dumbbell", "kettlebell", "band"].includes(equipment)) return steps;

	if (lang === "en") {
		const replacements = {
			dumbbell: [
				[/\bthe bar\b/gi, "the dumbbells"],
				[/\bDrag the bar\b/g, "Drag the dumbbells"],
				[/\bDrive the bar\b/g, "Drive the dumbbells"],
				[/\bsliding the bar\b/gi, "sliding the dumbbells"],
				[/\bbar over mid-foot\b/gi, "dumbbells at your sides"],
				[/\b[Bb]ar\b(?!bell)/g, (match) => match[0] === "B" ? "Weight" : "weight"],
			],
			kettlebell: [
				[/\bthe bar\b/gi, "the kettlebell"],
				[/\bDrag the bar\b/g, "Drag the kettlebell"],
				[/\bDrive the bar\b/g, "Drive the kettlebell"],
				[/\bsliding the bar\b/gi, "sliding the kettlebell"],
				[/\bbar over mid-foot\b/gi, "kettlebell between your feet"],
				[/\b[Bb]ar\b(?!bell)/g, (match) => match[0] === "B" ? "Weight" : "weight"],
			],
			band: [
				[/\bthe bar\b/gi, "the handle"],
				[/\bDrag the bar\b/g, "Drag the handle"],
				[/\bDrive the bar\b/g, "Drive the handle"],
				[/\bsliding the bar\b/gi, "sliding the handle"],
				[/\bbar over mid-foot\b/gi, "handle in front of you"],
				[/\b[Bb]ar\b(?!bell)/g, (match) => match[0] === "B" ? "Handle" : "handle"],
			],
		};
		return steps.map((step) =>
			replacements[equipment].reduce((text, [regex, replacement]) => text.replace(regex, replacement), step),
		);
	}

	// Spanish
	const replacements = {
		dumbbell: [
			[/\bla barra\b/gi, "las mancuernas"],
			[/\bLa barra\b/g, "Las mancuernas"],
			[/\bde la barra\b/gi, "de las mancuernas"],
			[/\bArrastra la barra\b/g, "Arrastra las mancuernas"],
			[/\bDirige la barra\b/g, "Dirige las mancuernas"],
			[/\bdeslizando la barra\b/gi, "deslizando las mancuernas"],
			[/\bbarra sobre la mitad del pie\b/gi, "mancuernas a los lados"],
			[/\blas mancuernas pase\b/gi, "las mancuernas pasen"],
			[/\bnunca se separa del cuerpo\b/gi, "nunca se separan del cuerpo"],
			[/\b[Bb]arra\b(?! EZ| de [dD]ominadas)/g, (match) => match[0] === "B" ? "Peso" : "peso"],
		],
		kettlebell: [
			[/\bla barra\b/gi, "la kettlebell"],
			[/\bLa barra\b/g, "La kettlebell"],
			[/\bde la barra\b/gi, "de la kettlebell"],
			[/\bArrastra la barra\b/g, "Arrastra la kettlebell"],
			[/\bDirige la barra\b/g, "Dirige la kettlebell"],
			[/\bdeslizando la barra\b/gi, "deslizando la kettlebell"],
			[/\bbarra sobre la mitad del pie\b/gi, "kettlebell entre los pies"],
			[/\b[Bb]arra\b(?! EZ| de [dD]ominadas)/g, (match) => match[0] === "B" ? "Peso" : "peso"],
		],
		band: [
			[/\bla barra\b/gi, "el agarre"],
			[/\bLa barra\b/g, "El agarre"],
			[/\bde la barra\b/gi, "del agarre"],
			[/\bArrastra la barra\b/g, "Arrastra el agarre"],
			[/\bDirige la barra\b/g, "Dirige el agarre"],
			[/\bdeslizando la barra\b/gi, "deslizando el agarre"],
			[/\bbarra sobre la mitad del pie\b/gi, "agarre frente a ti"],
			[/\b[Bb]arra\b(?! EZ| de [dD]ominadas)/g, (match) => match[0] === "B" ? "Agarre" : "agarre"],
		],
	};
	return steps.map((step) =>
		replacements[equipment].reduce((text, [regex, replacement]) => text.replace(regex, replacement), step),
	);
}

// ─────────────────────────────────────────────────────────────
// 2b. LATERALITY-AWARE TEXT SUBSTITUTION
// ─────────────────────────────────────────────────────────────
// When an exercise is unilateral (one-arm, one-leg, alternate), the core
// steps are authored in bilateral/plural form. This function post-processes
// them to use singular references so instructions match the unilateral nature.

const ONE_ARM_EN = [
	// Specific compound phrases (order matters — most specific first)
	[/\bthey are nailed in place\b/gi, "it is nailed in place"],
	[/\bthey are fixed points in space\b/gi, "it is a fixed point in space"],
	[/\byour elbows are door hinges that don't move\b/gi, "your elbow is a door hinge that doesn't move"],
	[/\byour elbows are door hinges\b/gi, "your elbow is a door hinge"],
	[/\bOnly your forearms move\b/g, "Only your forearm moves"],
	[/\blike steel rods\b/gi, "like a steel rod"],
	[/\blike ropes attached\b/gi, "like a rope attached"],
	[/\byour hands are just hooks\b/gi, "your hand is just a hook"],
	[/\bYour upper arms stay vertical\b/g, "Your upper arm stays vertical"],
	[/\byour upper arms stay vertical\b/g, "your upper arm stays vertical"],
	[/\byour upper arms are\b/gi, "your upper arm is"],
	[/\blike elevator shafts\b/gi, "like an elevator shaft"],
	[/\bfrom two pitchers\b/gi, "from a pitcher"],
	[/\btwo curved swords\b/gi, "a curved sword"],
	[/\bthe dumbbells\b/gi, "the dumbbell"],
	[/\bthe Dumbbells\b/g, "the Dumbbell"],
	// General body-part plurals → singular
	[/\byour elbows\b/gi, "your elbow"],
	[/\bthe elbows\b/gi, "the elbow"],
	[/\bElbows\b/g, "Elbow"],
	[/\belbows\b/g, "elbow"],
	[/\byour forearms\b/gi, "your forearm"],
	[/\byour wrists\b/gi, "your wrist"],
	[/\byour biceps\b/gi, "your bicep"],
	[/\byour triceps\b/gi, "your tricep"],
	[/\bthe triceps\b/gi, "the tricep"],
	[/\bthe biceps\b/gi, "the bicep"],
	[/\byour upper arms\b/gi, "your upper arm"],
	[/\byour arms\b/gi, "your arm"],
	[/\bwith arms\b/gi, "with your arm"],
	[/\byour hands\b/gi, "your hand"],
	[/\byour sides\b/gi, "your side"],
	[/\byour ears\b/gi, "your ear"],
];

const ONE_LEG_EN = [
	// Specific phrases
	[/\bboth knees\b/gi, "your knee"],
	[/\bboth legs\b/gi, "your leg"],
	[/\byour feet hip-to-shoulder-width\b/gi, "your foot on the ground"],
	// General body-part plurals → singular
	[/\byour legs\b/gi, "your leg"],
	[/\byour knees\b/gi, "your knee"],
	[/\byour heels\b/gi, "your heel"],
	[/\byour calves\b/gi, "your calf"],
	[/\byour hamstrings\b/gi, "your hamstring"],
	[/\byour quads\b/gi, "your quad"],
	[/\byour shins\b/gi, "your shin"],
];

const ONE_ARM_ES = [
	// Specific compound phrases
	[/\bimagina que están clavados en su sitio\b/gi, "imagina que está clavado en su sitio"],
	[/\bson puntos fijos en el espacio\b/gi, "es un punto fijo en el espacio"],
	[/\bSolo se mueven los antebrazos\b/g, "Solo se mueve el antebrazo"],
	[/\bSolo los antebrazos se mueven como bisagras de puerta\b/g, "Solo el antebrazo se mueve como una bisagra de puerta"],
	[/\btus codos son bisagras que no se mueven\b/gi, "tu codo es una bisagra que no se mueve"],
	[/\bLos brazos superiores permanecen verticales\b/g, "El brazo superior permanece vertical"],
	[/\blos brazos superiores\b/gi, "el brazo superior"],
	[/\bcomo pozos de ascensor\b/gi, "como un pozo de ascensor"],
	[/\bcomo barras de acero\b/gi, "como una barra de acero"],
	[/\bcomo cuerdas sujetas\b/gi, "como una cuerda sujeta"],
	[/\bcomo dos espadas curvas\b/gi, "como una espada curva"],
	[/\btus manos son solo ganchos\b/gi, "tu mano es solo un gancho"],
	[/\bde dos jarras\b/gi, "de una jarra"],
	[/\blas mancuernas\b/gi, "la mancuerna"],
	[/\bLas mancuernas\b/g, "La mancuerna"],
	// General body-part plurals → singular
	[/\blos codos\b/gi, "el codo"],
	[/\bLos codos\b/g, "El codo"],
	[/\blos antebrazos\b/gi, "el antebrazo"],
	[/\bLos antebrazos\b/g, "El antebrazo"],
	[/\blas muñecas rectas\b/gi, "la muñeca recta"],
	[/\blas muñecas\b/gi, "la muñeca"],
	[/\bLas muñecas\b/g, "La muñeca"],
	[/\blos bíceps\b/gi, "el bíceps"],
	[/\bLos bíceps\b/g, "El bíceps"],
	[/\blos tríceps\b/gi, "el tríceps"],
	[/\bLos tríceps\b/g, "El tríceps"],
	[/\blos brazos\b/gi, "el brazo"],
	[/\bLos brazos\b/g, "El brazo"],
	[/\blas manos\b/gi, "la mano"],
	[/\bLas manos\b/g, "La mano"],
	[/\ba los costados\b/gi, "al costado"],
	[/\bde las orejas\b/gi, "de la oreja"],
	[/\blas orejas\b/gi, "la oreja"],
];

const ONE_LEG_ES = [
	// Specific
	[/\bambas rodillas\b/gi, "la rodilla"],
	[/\bambas piernas\b/gi, "la pierna"],
	// General
	[/\blas piernas\b/gi, "la pierna"],
	[/\bLas piernas\b/g, "La pierna"],
	[/\blas rodillas\b/gi, "la rodilla"],
	[/\bLas rodillas\b/g, "La rodilla"],
	[/\blos talones\b/gi, "el talón"],
	[/\bLos talones\b/g, "El talón"],
	[/\blos gemelos\b/gi, "el gemelo"],
	[/\bLos gemelos\b/g, "El gemelo"],
	[/\blos isquiotibiales\b/gi, "el isquiotibial"],
	[/\bLos isquiotibiales\b/g, "El isquiotibial"],
	[/\blos cuádriceps\b/gi, "el cuádriceps"],
	[/\bLos cuádriceps\b/g, "El cuádriceps"],
	[/\blas espinillas\b/gi, "la espinilla"],
	[/\bLas espinillas\b/g, "La espinilla"],
];

/**
 * Adapt core steps to unilateral context by converting plural
 * body-part references to singular.
 *
 * @param {string[]} steps - Core instruction steps.
 * @param {object} modifiers - Result of detectModifiers().
 * @param {string} lang - Language code (en or es).
 * @returns {string[]} Steps with laterality-corrected wording.
 */
function adaptStepsToLaterality(steps, modifiers, lang) {
	if (!modifiers.isOneArm && !modifiers.isOneLeg && !modifiers.isAlternate) return steps;

	let replacements = [];

	if (lang === "en") {
		if (modifiers.isOneArm || modifiers.isAlternate) replacements = replacements.concat(ONE_ARM_EN);
		if (modifiers.isOneLeg) replacements = replacements.concat(ONE_LEG_EN);
	} else if (lang === "es") {
		if (modifiers.isOneArm || modifiers.isAlternate) replacements = replacements.concat(ONE_ARM_ES);
		if (modifiers.isOneLeg) replacements = replacements.concat(ONE_LEG_ES);
	}

	if (replacements.length === 0) return steps;

	return steps.map((step) =>
		replacements.reduce((text, [regex, replacement]) => text.replace(regex, replacement), step),
	);
}

// ─────────────────────────────────────────────────────────────
// 3. EQUIPMENT SETUP (step 1)
// ─────────────────────────────────────────────────────────────

const EQUIP_SETUP_EN = {
	barbell:
		"Load the barbell with appropriate weight. Grip the bar firmly and set your feet shoulder-width apart.",
	dumbbell:
		"Select the right dumbbell weight. Grip firmly and position yourself with a stable base.",
	cable:
		"Attach the appropriate handle, set the pulley height, and select your working weight.",
	machine:
		"Adjust the seat, pads, and range-of-motion settings to fit your body. Select the load.",
	lever:
		"Adjust the seat, pads, and range-of-motion settings to fit your body. Select the load.",
	smith:
		"Set the bar height on the Smith machine and load the appropriate weight. Position yourself under the bar.",
	"ez-bar":
		"Load the EZ-bar and grip it at the angled portion that suits your wrist comfort.",
	kettlebell:
		"Choose the right kettlebell weight. Grip the handle firmly with a neutral wrist.",
	band: "Secure the resistance band at the correct anchor point and make sure there is initial tension.",
	sled: "Load the sled with appropriate weight and grip the handles firmly.",
	bodyweight:
		"Position your body with proper alignment — ears over shoulders, shoulders over hips.",
	other:
		"Prepare your equipment and adopt a stable starting position with good posture.",
};

const EQUIP_SETUP_ES = {
	barbell:
		"Carga la barra con el peso adecuado. Agárrala con firmeza y coloca los pies a la anchura de los hombros.",
	dumbbell:
		"Elige el peso adecuado de mancuerna. Agarra con firmeza y colócate en una base estable.",
	cable:
		"Coloca el agarre adecuado, ajusta la altura de la polea y selecciona el peso de trabajo.",
	machine:
		"Ajusta el asiento, los cojines y el rango de movimiento a tu cuerpo. Selecciona la carga.",
	lever:
		"Ajusta el asiento, los cojines y el rango de movimiento a tu cuerpo. Selecciona la carga.",
	smith:
		"Ajusta la altura de la barra en la máquina Smith y carga el peso adecuado. Colócate bajo la barra.",
	"ez-bar":
		"Carga la barra EZ y agárrala en la zona angulada que resulte cómoda para tus muñecas.",
	kettlebell:
		"Elige el peso adecuado de kettlebell. Agarra el asa con firmeza y la muñeca neutra.",
	band: "Fija la banda elástica en el anclaje correcto y asegúrate de que haya tensión inicial.",
	sled: "Carga el trineo con el peso adecuado y agarra las asas con firmeza.",
	bodyweight:
		"Colócate con buena alineación corporal: orejas sobre hombros, hombros sobre caderas.",
	other:
		"Prepara tu equipo y adopta una posición inicial estable con buena postura.",
};

// ─────────────────────────────────────────────────────────────
// 4. POSTURE INSERTS (added after step 1 when relevant)
// ─────────────────────────────────────────────────────────────

function getPostureCueEn(modifiers) {
	if (modifiers.isSeated)
		return "Sit tall with your back straight and feet flat on the floor.";
	if (modifiers.isKneeling)
		return "Kneel with your hips stacked directly over your knees, torso upright.";
	if (modifiers.isIncline)
		return "Set the bench to the indicated incline and press your back firmly against the pad.";
	if (modifiers.isDecline)
		return "Set the bench to a decline angle and lock your feet under the pads.";
	if (modifiers.isLying)
		return "Lie down with your back flat against the surface, core engaged.";
	return null;
}

function getPostureCueEs(modifiers) {
	if (modifiers.isSeated)
		return "Siéntate erguido con la espalda recta y los pies apoyados en el suelo.";
	if (modifiers.isKneeling)
		return "Arrodíllate con las caderas justo encima de las rodillas, torso erguido.";
	if (modifiers.isIncline)
		return "Ajusta el banco a la inclinación indicada y presiona la espalda contra el respaldo.";
	if (modifiers.isDecline)
		return "Ajusta el banco en declinación y fija los pies bajo los soportes.";
	if (modifiers.isLying)
		return "Túmbate con la espalda plana contra la superficie y el core activado.";
	return null;
}

// ─────────────────────────────────────────────────────────────
// 5. GRIP INSERTS
// ─────────────────────────────────────────────────────────────

function getGripCueEn(modifiers) {
	if (modifiers.isCloseGrip)
		return "Use a close grip, hands roughly 15 cm apart, to shift emphasis inward.";
	if (modifiers.isWideGrip)
		return "Take a wide grip, hands well outside shoulder-width, to increase stretch and outer emphasis.";
	if (modifiers.isReverseGrip)
		return "Use an underhand (supinated) grip to change the angle of pull and muscle emphasis.";
	if (modifiers.isNeutralGrip)
		return "Use a neutral (palms-facing) grip, which is easier on the joints and shifts emphasis.";
	return null;
}

function getGripCueEs(modifiers) {
	if (modifiers.isCloseGrip)
		return "Usa agarre cerrado, manos a unos 15 cm de distancia, para enfatizar la zona interna.";
	if (modifiers.isWideGrip)
		return "Usa agarre amplio, manos bien por fuera de los hombros, para mayor estiramiento y énfasis externo.";
	if (modifiers.isReverseGrip)
		return "Usa agarre invertido (supinado) para cambiar el ángulo de tracción y el énfasis muscular.";
	if (modifiers.isNeutralGrip)
		return "Usa agarre neutro (palmas enfrentadas), más cómodo para las articulaciones y con diferente énfasis.";
	return null;
}

// ─────────────────────────────────────────────────────────────
// 6. LATERALITY INSERT
// ─────────────────────────────────────────────────────────────

function getLateralityCueEn(modifiers) {
	if (modifiers.isOneArm || modifiers.isOneLeg)
		return "Work one side at a time. Complete all reps on one side before switching. Match the weaker side's reps.";
	if (modifiers.isAlternate)
		return "Alternate sides each rep. Finish one full rep before starting the other side.";
	return null;
}

function getLateralityCueEs(modifiers) {
	if (modifiers.isOneArm || modifiers.isOneLeg)
		return "Trabaja un lado cada vez. Completa todas las repeticiones de un lado antes de cambiar. Iguala las repeticiones al lado más débil.";
	if (modifiers.isAlternate)
		return "Alterna lados en cada repetición. Completa una rep entera antes de pasar al otro lado.";
	return null;
}

// ─────────────────────────────────────────────────────────────
// 7. MOVEMENT PATTERN REGISTRY
// ─────────────────────────────────────────────────────────────
// Each entry: { test: RegExp, en: string[], es: string[] }
// The arrays contain the CORE execution steps (without setup and breathing,
// which are injected by the assembler). Steps should already include external
// focus cues, analogies, and key coaching points.

const PATTERNS = [
	// ── PRESS – bench family ──────────────────────────────
	{
		id: "bench-press",
		test: /(^|-)(bench-press|chest-press|floor-press)(-|$)/,
		en: [
			"Pinch your shoulder blades together as if holding a pencil between them — this creates a stable shelf for pressing.",
			"Lower the bar to your mid-chest with elbows at roughly 45° — think arrow shape, not a T — controlling the descent for 2-3 seconds.",
			"Push yourself away from the bar into the bench. Drive the bar in a slight arc back toward the rack to complete the rep.",
		],
		es: [
			"Junta las escápulas como si sostuvieras un lápiz entre ellas: esto crea una base estable para empujar.",
			"Baja la barra hasta el pecho medio con los codos a unos 45° — piensa en forma de flecha, no de T — controlando el descenso 2-3 segundos.",
			"Empújate a ti mismo contra el banco, alejándote de la barra. Dirige la barra en un ligero arco hacia el soporte para completar la repetición.",
		],
	},
	// ── PRESS – skull crusher / lying extension ───────────
	{
		id: "skull-crusher",
		test: /(^|-)(skull-?crush(?:er)?|lying-.*triceps?-extension|lying-extension|lying-close-grip-press|close-grip-to-skull|back-of-the-head-tricep|reverse-grip-skullcrusher)(-|$)/,
		en: [
			"Extend your arms straight above your chest. Your elbows point at the ceiling and stay locked in place throughout.",
			"Lower the weight toward your forehead or just behind it by bending only at the elbows — your upper arms are concrete pillars that don't move.",
			"Press back to full arm extension by squeezing your triceps hard at the top.",
		],
		es: [
			"Extiende los brazos rectos sobre el pecho. Los codos apuntan al techo y permanecen fijos en su sitio durante todo el movimiento.",
			"Baja el peso hacia la frente o justo detrás flexionando solo los codos — tus brazos son pilares de hormigón que no se mueven.",
			"Extiende de nuevo hasta bloquear los brazos apretando fuerte los tríceps en la parte superior.",
		],
	},
	// ── PRESS – overhead / military / shoulder ────────────
	{
		id: "overhead-press",
		test: /(^|-)(overhead-press|military-press|shoulder-press|push-press|arnold-press|bradford|scott-press|cuban-press|w-press|behind-neck-press|behind-head-press|anti-gravity-press|seesaw-press|thruster|jerk)(-|$)/,
		en: [
			"Stack your wrists directly over your elbows like a solid column. Squeeze your glutes and brace your core as if bracing for a punch.",
			"Press the weight straight up, moving your head out of the way. Once the bar clears your face, push your head through the window and lock out fully.",
			"Lower under control back to the start position on your front delts. Keep your torso vertical — you're pressing overhead, not doing a standing incline.",
		],
		es: [
			"Apila las muñecas justo encima de los codos como una columna sólida. Aprieta los glúteos y activa el core como si fueras a recibir un golpe.",
			"Empuja el peso recto hacia arriba, moviendo la cabeza para dejar pasar la barra. Cuando la barra pase tu cara, mete la cabeza hacia delante y bloquea los brazos arriba del todo.",
			"Baja con control hasta la posición inicial sobre los deltoides frontales. Mantén el torso vertical: estás empujando hacia arriba, no haciendo un press inclinado de pie.",
		],
	},
	// ── PRESS – generic (catch-all presses) ───────────────
	{
		id: "press-generic",
		test: /(^|-)press(es)?(-|$)/,
		en: [
			"Brace your core and set your shoulder blades. Initiate the press from a stable base.",
			"Drive the weight away from your body in a controlled path, fully extending without locking your joints violently.",
			"Return the weight under control, maintaining tension throughout the range of motion.",
		],
		es: [
			"Activa el core y fija las escápulas. Inicia el empuje desde una base estable.",
			"Empuja el peso alejándolo del cuerpo en una trayectoria controlada, extendiendo completamente sin bloquear las articulaciones de golpe.",
			"Devuelve el peso con control, manteniendo tensión durante todo el rango de movimiento.",
		],
	},
	// ── SQUAT ─────────────────────────────────────────────
	{
		id: "squat",
		test: /(^|-)(squat|squats|sissy-squat|goblet)(-|$)/,
		en: [
			"Screw your feet into the floor to create tension. Take a big breath into your belly — inflate a balloon behind your belt buckle.",
			"Sit back as if there's a chair behind you, spreading the floor apart with your feet. Keep your chest facing the mirror in front of you.",
			"Drive through the full foot and push the floor away from you to stand. Finish tall, as if someone is pulling a string from the top of your head.",
		],
		es: [
			"Enrosca los pies contra el suelo para crear tensión. Toma una gran bocanada de aire hacia el abdomen — infla un globo detrás de la hebilla del cinturón.",
			"Siéntate hacia atrás como si hubiera una silla detrás, separando el suelo con los pies. Mantén el pecho mirando al espejo que tienes delante.",
			"Empuja con todo el pie y aleja el suelo de ti para ponerte de pie. Termina erguido, como si alguien tirara de un hilo desde la coronilla.",
		],
	},
	// ── DEADLIFT / STIFF-LEG ─────────────────────────────
	{
		id: "deadlift",
		test: /(^|-)(deadlift|dead-lift|stiff-leg|straight-leg-deadlift|rack-pull)(-|$)/,
		en: [
			"Set your feet hip-width apart, bar over mid-foot. Hinge at the hips, chest up, and squeeze your armpits tight to engage your lats.",
			"Push the floor away with your legs — hips and shoulders rise together like an elevator. Drag the bar up your legs as if shaving them.",
			"Stand tall at the top and squeeze a coin between your glutes. Reverse by hinging the hips back, sliding the bar down your thighs — it never leaves your body.",
		],
		es: [
			"Coloca los pies a la anchura de las caderas, barra sobre la mitad del pie. Bisagra de cadera, pecho alto, y aprieta las axilas para activar los dorsales.",
			"Empuja el suelo con las piernas — caderas y hombros suben juntos como un ascensor. Arrastra la barra por las piernas como si te afeitaras con ella.",
			"Ponte totalmente erguido arriba y aprieta una moneda entre los glúteos. Vuelve haciendo bisagra de cadera, deslizando la barra por los muslos — nunca se separa del cuerpo.",
		],
	},
	// ── GOOD MORNING / HINGE ─────────────────────────────
	{
		id: "good-morning",
		test: /(^|-)(good-morning|pull-through)(-|$)/,
		en: [
			"With a slight knee bend, hinge at the hips pushing your butt back — imagine closing a car door with your glutes.",
			"Lower until you feel a deep hamstring stretch, keeping your back flat. A broomstick on your spine should touch head, mid-back, and tailbone.",
			"Drive your hips forward to return to standing, squeezing your glutes hard at the top.",
		],
		es: [
			"Con las rodillas ligeramente flexionadas, haz bisagra de cadera empujando el trasero hacia atrás — imagina cerrar la puerta de un coche con los glúteos.",
			"Baja hasta sentir un estiramiento profundo en los isquiotibiales, manteniendo la espalda plana. Un palo de escoba en la columna debería tocar cabeza, espalda media y coxis.",
			"Empuja las caderas hacia delante para volver a ponerte de pie, apretando fuerte los glúteos arriba.",
		],
	},
	// ── ROW – upright ────────────────────────────────────
	{
		id: "upright-row",
		test: /(^|-)(upright-row)(-|$)/,
		en: [
			"Hold the weight in front of your thighs with arms extended. Stand tall with core braced.",
			"Pull the weight up along your body, leading with your elbows toward the ceiling. Stop when your elbows reach shoulder height.",
			"Lower the weight slowly back to the starting position. If you feel shoulder pinching, widen your grip slightly.",
		],
		es: [
			"Sujeta el peso frente a los muslos con los brazos extendidos. Mantente erguido con el core activado.",
			"Tira del peso hacia arriba pegado al cuerpo, liderando con los codos hacia el techo. Para cuando los codos lleguen a la altura de los hombros.",
			"Baja el peso lentamente a la posición inicial. Si sientes molestias en el hombro, amplía ligeramente el agarre.",
		],
	},
	// ── ROW – bent over / generic ────────────────────────
	{
		id: "row",
		test: /(^|-)row(s?)(-|$)/,
		en: [
			"Hinge at the hips until your torso is close to parallel with the floor. Let your arms hang straight like ropes attached to the weight.",
			"Pull by driving your elbows toward your back pockets — your hands are just hooks. Squeeze your shoulder blades together at the top like cracking a walnut.",
			"Lower under control back to full arm extension for a complete stretch at the bottom. If your torso moves more than 10°, the weight is too heavy.",
		],
		es: [
			"Haz bisagra de cadera hasta que el torso esté casi paralelo al suelo. Deja los brazos colgando rectos como cuerdas sujetas al peso.",
			"Tira llevando los codos hacia los bolsillos traseros — tus manos son solo ganchos. Aprieta las escápulas arriba como si partieras una nuez entre ellas.",
			"Baja con control hasta la extensión completa de los brazos para un estiramiento completo abajo. Si tu torso se mueve más de 10°, el peso es demasiado.",
		],
	},
	// ── PULL-UP / CHIN-UP / MUSCLE-UP ────────────────────
	{
		id: "pull-up",
		test: /(^|-)(pull-ups?|chin-ups?|chin|muscle-ups?|gorilla-chin)(-|$)/,
		en: [
			"Hang from the bar with arms fully extended. Set your shoulders by pulling your shoulder blades down and back — pack them into your back pockets.",
			"Pull by driving your elbows into your back pockets, leading with your chest, not your chin. Imagine bending the bar around your collarbone.",
			"Clear the bar with your chin and squeeze at the top. Lower under full control to a dead hang — earn each rep from a full stretch.",
		],
		es: [
			"Cuélgate de la barra con los brazos completamente extendidos. Fija los hombros tirando de las escápulas hacia abajo y atrás — mételas en los bolsillos traseros.",
			"Tira llevando los codos hacia los bolsillos traseros, liderando con el pecho, no con la barbilla. Imagina doblar la barra alrededor de tus clavículas.",
			"Pasa la barbilla por encima de la barra y aprieta arriba. Baja con control total hasta colgarte por completo — gana cada repetición desde un estiramiento completo.",
		],
	},
	// ── PULLDOWN ─────────────────────────────────────────
	{
		id: "pulldown",
		test: /(^|-)(pulldowns?|pull-down|lat-pulldown|pushdown-pulldown|incline-pushdown)(-|$)/,
		en: [
			"Grip the bar and lock your thighs under the pad. Lean back slightly and set your shoulder blades down.",
			"Pull the bar to your upper chest by driving your elbows down and back. Imagine bending the bar around your collarbone.",
			"Squeeze your lats for a count at the bottom, then let the bar return slowly overhead, feeling a full stretch through your lats.",
		],
		es: [
			"Agarra la barra y fija los muslos bajo el soporte. Inclínate ligeramente hacia atrás y baja las escápulas.",
			"Tira de la barra hacia la parte alta del pecho llevando los codos hacia abajo y atrás. Imagina doblar la barra alrededor de tus clavículas.",
			"Aprieta los dorsales un instante abajo, luego deja que la barra suba lentamente por encima de la cabeza, sintiendo el estiramiento completo en los dorsales.",
		],
	},
	// ── CURL – wrist / forearm ───────────────────────────
	{
		id: "wrist-curl",
		test: /(^|-)(wrist-curl|wrist-roll|finger-curl|reverse-wrist|palms-down-wrist|palms-up-wrist|neutral-wrist)(-|$)/,
		en: [
			"Rest your forearms on your thighs or a bench with wrists hanging over the edge. Keep your forearms glued to the surface.",
			"Curl your wrists up, squeezing the forearm muscles at the top. Hold for a brief pause.",
			"Lower slowly, letting the weight stretch your wrist fully. Only your wrists move — forearms stay stationary.",
		],
		es: [
			"Apoya los antebrazos sobre los muslos o un banco con las muñecas colgando por el borde. Mantén los antebrazos pegados a la superficie.",
			"Flexiona las muñecas hacia arriba, apretando los músculos del antebrazo arriba. Haz una breve pausa.",
			"Baja lentamente, dejando que el peso estire la muñeca completamente. Solo se mueven las muñecas — los antebrazos no se mueven.",
		],
	},
	// ── CURL – hammer ────────────────────────────────────
	{
		id: "hammer-curl",
		test: /(^|-)(hammer-curl|hammer-preacher|cross-body-hammer)(-|$)/,
		en: [
			"Hold the weight with a neutral grip (palms facing each other). Pin your elbows to your sides — imagine they are nailed in place.",
			"Curl the weight up keeping the neutral grip. This targets the brachialis and brachioradialis in addition to the biceps.",
			"Lower for a slow 3-second count, fighting gravity every inch. Keep your wrist straight like a steel rod throughout.",
		],
		es: [
			"Sujeta el peso con agarre neutro (palmas enfrentadas). Clava los codos a los costados — imagina que están clavados en su sitio.",
			"Sube el peso manteniendo el agarre neutro. Esto trabaja el braquial y el braquiorradial además del bíceps.",
			"Baja en 3 segundos lentos, luchando contra la gravedad en cada centímetro. Mantén la muñeca recta como una barra de acero durante todo el movimiento.",
		],
	},
	// ── CURL – preacher ──────────────────────────────────
	{
		id: "preacher-curl",
		test: /(^|-)(preacher-curl|preacher)(-|$)/,
		en: [
			"Sit at the preacher bench with your armpits snug against the top edge. Let your arms extend fully down the pad.",
			"Curl the weight up by squeezing your biceps, keeping your upper arms pressed into the pad throughout.",
			"Lower under strict control all the way to full extension — the pad prevents cheating, so own the entire range of motion.",
		],
		es: [
			"Siéntate en el banco predicador con las axilas apoyadas en el borde superior. Deja los brazos extendidos completamente sobre el cojín.",
			"Sube el peso apretando los bíceps, manteniendo los brazos superiores presionados contra el cojín en todo momento.",
			"Baja con control estricto hasta la extensión completa — el cojín impide hacer trampa, así que domina todo el rango de movimiento.",
		],
	},
	// ── CURL – concentration ─────────────────────────────
	{
		id: "concentration-curl",
		test: /(^|-)(concentration-curl|concentration)(-|$)/,
		en: [
			"Sit with your legs apart and brace the back of your working arm against your inner thigh. This locks your upper arm in place.",
			"Curl the weight up slowly, focusing entirely on the bicep contraction. Squeeze the juice out of an orange at the top.",
			"Lower for a 3-second count and fully extend. Your thigh acts as a guardrail — no swinging possible.",
		],
		es: [
			"Siéntate con las piernas separadas y apoya la parte trasera del brazo que trabaja contra la cara interna del muslo. Esto bloquea el brazo superior en su sitio.",
			"Sube el peso lentamente, concentrándote por completo en la contracción del bíceps. Exprime el jugo de una naranja arriba del todo.",
			"Baja en 3 segundos y extiende completamente. Tu muslo actúa como barrera — no hay balanceo posible.",
		],
	},
	// ── CURL – spider ────────────────────────────────────
	{
		id: "spider-curl",
		test: /(^|-)(spider-curl|spider)(-|$)/,
		en: [
			"Lie chest-down on an incline bench with your arms hanging straight down. Gravity pulls against you the entire rep.",
			"Curl the weight up, squeezing your biceps hard at the top. The incline angle keeps constant tension — no rest at the bottom.",
			"Lower under control to full extension. The angle makes cheating nearly impossible, so use a lighter weight and focus on form.",
		],
		es: [
			"Túmbate boca abajo en un banco inclinado con los brazos colgando rectos. La gravedad tira en tu contra durante toda la repetición.",
			"Sube el peso apretando fuerte los bíceps arriba. El ángulo del banco mantiene tensión constante — no hay descanso abajo.",
			"Baja con control hasta la extensión completa. El ángulo hace casi imposible hacer trampa, así que usa menos peso y céntrate en la técnica.",
		],
	},
	// ── CURL – drag curl ─────────────────────────────────
	{
		id: "drag-curl",
		test: /(^|-)(drag-curl)(-|$)/,
		en: [
			"Hold the bar against your thighs. Instead of curling in an arc, drag the bar straight up your body — elbows travel backward.",
			"Pull your elbows behind you as the bar slides up your torso. This shifts emphasis to the long head of the biceps.",
			"Reverse the path, sliding the bar back down your body under control. The bar never leaves contact with your torso.",
		],
		es: [
			"Sujeta la barra contra los muslos. En vez de hacer un arco, arrastra la barra recta hacia arriba por el cuerpo — los codos viajan hacia atrás.",
			"Lleva los codos detrás de ti mientras la barra sube por el torso. Esto enfatiza la cabeza larga del bíceps.",
			"Invierte la trayectoria, deslizando la barra de vuelta por el cuerpo con control. La barra nunca pierde contacto con el torso.",
		],
	},
	// ── CURL – generic ───────────────────────────────────
	{
		id: "curl",
		test: /(^|-)(curl|curls)(-|$)/,
		en: [
			"Pin your elbows to your sides — imagine they are nailed in place. Only your forearms move.",
			"Curl the weight up squeezing your biceps hard. At the top, squeeze the juice out of an orange before lowering.",
			"Lower for a slow 3-second count, fighting gravity every inch. Keep your wrists straight like steel rods. If your body sways, the weight is too heavy.",
		],
		es: [
			"Clava los codos a los costados — imagina que están clavados en su sitio. Solo se mueven los antebrazos.",
			"Sube el peso apretando fuerte los bíceps. Arriba, exprime el jugo de una naranja antes de bajar.",
			"Baja en 3 segundos, luchando contra la gravedad en cada centímetro. Mantén las muñecas rectas como barras de acero. Si el cuerpo se balancea, el peso es demasiado.",
		],
	},
	// ── EXTENSION – tricep pushdown ─────────────────────
	{
		id: "pushdown",
		test: /(^|-)(pushdown|push-down)(-|$)/,
		en: [
			"Stand close to the cable, elbows pinned to your ribs. Grip the attachment with your elbows at 90°.",
			"Push down by extending only your forearms — your elbows are door hinges that don't move. Squeeze your triceps fully at lockout.",
			"Let the handle return slowly to 90°, resisting the cable's pull. Think about breaking the attachment apart at the bottom.",
		],
		es: [
			"Colócate cerca de la polea, codos pegados a las costillas. Agarra el accesorio con los codos a 90°.",
			"Empuja hacia abajo extendiendo solo los antebrazos — tus codos son bisagras que no se mueven. Aprieta los tríceps completamente al bloquear.",
			"Deja que el agarre vuelva lentamente a 90°, resistiendo el tirón del cable. Piensa en separar el accesorio en la parte de abajo.",
		],
	},
	// ── EXTENSION – kickback ────────────────────────────
	{
		id: "kickback",
		test: /(^|-)(kickbacks?|kick-backs?)(-|$)/,
		en: [
			"Hinge forward at the hips. Pin your upper arm parallel to your torso with elbow bent at 90°.",
			"Extend your arm fully behind you squeezing your triceps at lockout. Hold for a second at full extension.",
			"Lower under control back to 90° without letting your upper arm drop. Only the forearm swings like a gate.",
		],
		es: [
			"Inclínate hacia delante desde la cadera. Mantén el brazo superior paralelo al torso con el codo a 90°.",
			"Extiende el brazo completamente detrás apretando los tríceps al bloquear. Sostén un segundo en extensión completa.",
			"Baja con control de vuelta a 90° sin dejar caer el brazo superior. Solo el antebrazo oscila como una puerta.",
		],
	},
	// ── EXTENSION – overhead tricep ─────────────────────
	{
		id: "overhead-extension",
		test: /(^|-)(overhead.*extension|overhead.*tricep|behind.*tricep|behind.*extension)(-|$)/,
		en: [
			"Raise the weight overhead with arms fully extended. Keep your biceps close to your ears throughout.",
			"Lower the weight behind your head by bending only at the elbows. Your upper arms stay vertical — like elevator shafts.",
			"Press back up to full extension squeezing your triceps at the top. Avoid flaring your elbows outward.",
		],
		es: [
			"Levanta el peso sobre la cabeza con los brazos completamente extendidos. Mantén los bíceps cerca de las orejas en todo momento.",
			"Baja el peso detrás de la cabeza flexionando solo los codos. Los brazos superiores permanecen verticales — como pozos de ascensor.",
			"Empuja de vuelta a la extensión completa apretando los tríceps arriba. Evita que los codos se abran hacia fuera.",
		],
	},
	// ── EXTENSION – generic tricep ──────────────────────
	{
		id: "tricep-extension",
		test: /(^|-)(extension)(-|$)/,
		en: [
			"Lock your elbows in position — they are fixed points in space. Only your forearms move like a door hinge.",
			"Extend fully, squeezing your triceps hard at lockout. Pause for a beat at full extension.",
			"Return slowly to the starting position. Focus on the stretch at the bottom and the squeeze at the top.",
		],
		es: [
			"Bloquea los codos en su posición — son puntos fijos en el espacio. Solo los antebrazos se mueven como bisagras de puerta.",
			"Extiende completamente, apretando fuerte los tríceps al bloquear. Haz una pausa breve en extensión completa.",
			"Vuelve lentamente a la posición inicial. Céntrate en el estiramiento abajo y la contracción arriba.",
		],
	},
	// ── DIP ──────────────────────────────────────────────
	{
		id: "dip",
		test: /(^|-)(dip|dips|bench-dip|chest-dip|triceps-dip)(-|$)/,
		en: [
			"Grip the bars and lock out at the top. Lean slightly forward for chest emphasis, or stay upright for tricep emphasis.",
			"Lower by bending your elbows until your upper arms are at least parallel to the floor. Control the descent — no dropping.",
			"Press back up explosively to full lockout, squeezing the target muscle at the top.",
		],
		es: [
			"Agarra las barras y bloquea arriba. Inclínate ligeramente hacia delante para enfatizar el pecho, o quédate erguido para enfatizar tríceps.",
			"Baja flexionando los codos hasta que los brazos superiores estén al menos paralelos al suelo. Controla el descenso — nada de dejarte caer.",
			"Empuja de vuelta explosivamente hasta el bloqueo completo, apretando el músculo objetivo arriba.",
		],
	},
	// ── FLY – chest ─────────────────────────────────────
	{
		id: "chest-fly",
		test: /(^|-)(flye?s?|crossovers?|cross-over|low-fly|middle-fly|breeding|iron-cross|upper-chest-crossover)(-|$)/,
		en: [
			"Start with a slight bend in your elbows — your arms are like two curved swords. This bend stays constant throughout.",
			"Open your arms wide in an arc, feeling a deep stretch across your chest. Don't go past comfortable range.",
			"Bring the handles together by squeezing your chest — imagine hugging a large tree trunk. Hands nearly touch at the top.",
		],
		es: [
			"Comienza con una ligera flexión en los codos — tus brazos son como dos espadas curvas. Esta flexión se mantiene constante en todo momento.",
			"Abre los brazos en arco, sintiendo un estiramiento profundo en el pecho. No pases del rango cómodo.",
			"Junta los agarres apretando el pecho — imagina abrazar un gran tronco de árbol. Las manos casi se tocan arriba.",
		],
	},
	// ── FLY – reverse / rear delt ───────────────────────
	{
		id: "reverse-fly",
		test: /(^|-)(reverse-fly|reverse-flye|rear-fly|rear-flye|rear-delt-fly|rear-delt-flye|rear-delt-raise|rear-lateral-raise|rear-delt-row|rear-drive|deltoid-rear|rear-delt)(-|$)/,
		en: [
			"Bend forward at the hips or set the machine to target rear delts. Let your arms hang with a slight elbow bend.",
			"Raise the weight out and back by squeezing your shoulder blades together. Lead with your elbows, not your hands.",
			"Hold briefly at the top feeling the squeeze between your shoulder blades, then lower under control.",
		],
		es: [
			"Inclínate hacia delante desde las caderas o ajusta la máquina para trabajar el deltoides posterior. Deja los brazos colgando con ligera flexión de codo.",
			"Sube el peso hacia fuera y atrás apretando las escápulas. Lidera con los codos, no con las manos.",
			"Sostén brevemente arriba sintiendo la contracción entre las escápulas, luego baja con control.",
		],
	},
	// ── RAISE – lateral ─────────────────────────────────
	{
		id: "lateral-raise",
		test: /(^|-)(lateral-raise|lateral-to-front|side-raise|y-raise|lateral-bent-over)(-|$)/,
		en: [
			"Stand with weight at your sides and a slight forward lean. Slight bend in your elbows.",
			"Raise your arms out to the sides, leading with your elbows as if pouring water from two pitchers. Stop at shoulder height.",
			"Lower slowly under control, resisting gravity all the way down. Don't swing — if you need momentum, reduce the weight.",
		],
		es: [
			"De pie con el peso a los lados y ligeramente inclinado hacia delante. Leve flexión de codos.",
			"Sube los brazos hacia los lados, liderando con los codos como si vertieras agua de dos jarras. Para a la altura de los hombros.",
			"Baja lentamente con control, resistiendo la gravedad durante todo el recorrido. No balancees — si necesitas impulso, baja el peso.",
		],
	},
	// ── RAISE – front ───────────────────────────────────
	{
		id: "front-raise",
		test: /(^|-)(front-raise|forward-raise|front-raise-and-pullover)(-|$)/,
		en: [
			"Stand tall with the weight in front of your thighs and core braced.",
			"Raise the weight in front of you to shoulder height with a slight elbow bend. Keep your torso still — if you lean back, the weight is too heavy.",
			"Pause at the top, then lower under control. Don't let the weight swing — own every inch of the path.",
		],
		es: [
			"De pie erguido con el peso frente a los muslos y el core activado.",
			"Sube el peso frente a ti hasta la altura de los hombros con ligera flexión de codo. Mantén el torso quieto — si te inclinas hacia atrás, el peso es demasiado.",
			"Haz una pausa arriba, luego baja con control. No dejes que el peso se balancee — controla cada centímetro del recorrido.",
		],
	},
	// ── RAISE – calf ────────────────────────────────────
	{
		id: "calf-raise",
		test: /(^|-)(calf-raise|calf-raises|calves)(-|$)/,
		en: [
			"Stand on the edge of a step or platform with heels hanging off. Hold a support for balance if needed.",
			"Rise up on your toes as high as possible, squeezing your calves hard at the peak for a 2-second hold.",
			"Lower slowly past the platform edge until you feel a deep stretch in your calves. No bouncing — own every inch.",
		],
		es: [
			"Colócate en el borde de un escalón o plataforma con los talones colgando. Agárrate a un soporte si necesitas equilibrio.",
			"Sube de puntillas lo más alto posible, apretando los gemelos fuerte arriba durante 2 segundos.",
			"Baja lentamente pasando el borde de la plataforma hasta sentir un estiramiento profundo. Sin rebotes — controla cada centímetro.",
		],
	},
	// ── RAISE – leg / knee (abs context) ────────────────
	{
		id: "leg-raise",
		test: /(^|-)(leg-raise|knee-raise|hip-raise|leg-pull-in|pull-in|hanging-pike|pike)(-|$)/,
		en: [
			"Hang from a bar or position yourself with arms supported. Start with legs hanging straight down, core braced.",
			"Raise your legs by tilting your pelvis — think about bringing your belt buckle to your chin, not just lifting your feet.",
			"Control the descent slowly without swinging. If you swing, bend your knees to shorten the lever arm.",
		],
		es: [
			"Cuélgate de una barra o colócate con los brazos apoyados. Empieza con las piernas colgando rectas, core activado.",
			"Sube las piernas inclinando la pelvis — piensa en llevar la hebilla del cinturón hacia la barbilla, no solo en levantar los pies.",
			"Controla el descenso lentamente sin balancearte. Si te balanceas, flexiona las rodillas para acortar el brazo de palanca.",
		],
	},
	// ── RAISE – shoulder (serratus) ─────────────────────
	{
		id: "shoulder-raise",
		test: /(^|-)(shoulder-raise|shoulder-raises|scapula-push|scapular-push|incline-scapula|incline-shoulder-raise)(-|$)/,
		en: [
			"Get into a push-up or incline position with arms locked out straight.",
			"Without bending your elbows, push your body away from the floor by protracting your shoulder blades — round your upper back forward.",
			"Slowly let your shoulder blades retract and your chest sink down, then protract again. Focus on the serratus squeezing your ribs.",
		],
		es: [
			"Colócate en posición de flexión o inclinada con los brazos bloqueados.",
			"Sin flexionar los codos, empuja el cuerpo alejándolo del suelo protrayendo las escápulas — redondea la espalda superior hacia delante.",
			"Deja que las escápulas se retraigan lentamente y el pecho baje, luego protrae de nuevo. Céntrate en el serrato apretando las costillas.",
		],
	},
	// ── LUNGE ────────────────────────────────────────────
	{
		id: "lunge",
		test: /(^|-)(lunge|lunges|walking-lunge|rear-lunge|split-squat|bulgarian)(-|$)/,
		en: [
			"Stand with feet hip-width apart (train tracks, not a tightrope). Step into position with your torso upright like a flagpole.",
			"Drop your back knee straight down like an elevator — don't lunge forward. Aim for 90° at both knees. Keep your front shin vertical.",
			"Drive through the front heel to return. Imagine pressing the floor away through your front foot.",
		],
		es: [
			"De pie con los pies a la anchura de las caderas (vías de tren, no cuerda floja). Da el paso y mantén el torso erguido como un mástil.",
			"Baja la rodilla trasera recta como un ascensor — no te lances hacia delante. Busca 90° en ambas rodillas. Mantén la tibia delantera vertical.",
			"Empuja con el talón delantero para volver. Imagina presionar el suelo hacia abajo a través del pie delantero.",
		],
	},
	// ── STEP-UP ──────────────────────────────────────────
	{
		id: "step-up",
		test: /(^|-)(step-up)(-|$)/,
		en: [
			"Stand in front of a box or step. Place your entire foot on the platform — heel included.",
			"Drive through the top foot to step up — don't push off with the back foot. That front leg does all the work.",
			"Stand fully at the top, then lower slowly back down with control. Keep your torso upright and knee tracking over your toes.",
		],
		es: [
			"Colócate frente a un cajón o escalón. Pon todo el pie sobre la plataforma — talón incluido.",
			"Empuja con el pie de arriba para subir — no te impulses con el pie de atrás. La pierna delantera hace todo el trabajo.",
			"Ponte completamente de pie arriba, luego baja lentamente con control. Mantén el torso erguido y la rodilla alineada con los dedos del pie.",
		],
	},
	// ── HIP THRUST / GLUTE BRIDGE ───────────────────────
	{
		id: "hip-thrust",
		test: /(^|-)(hip-thrusts?|glute-bridge|hip-lift|pelvic-tilt)(-|$)/,
		en: [
			"Upper back against a bench (or flat on the floor for bridges). Feet flat, shins vertical at the top. Tuck your chin slightly.",
			"Drive through your heels and squeeze your glutes like cracking a walnut. Lift until your body forms a straight line from knees to shoulders — no further.",
			"Lower under control, then drive up again. Think about making your belt buckle touch the ceiling at the top.",
		],
		es: [
			"Espalda superior contra un banco (o plana en el suelo para puentes). Pies apoyados, tibias verticales arriba. Mete ligeramente la barbilla.",
			"Empuja con los talones y aprieta los glúteos como si partieras una nuez. Sube hasta que el cuerpo forme una línea recta de rodillas a hombros — no más allá.",
			"Baja con control y vuelve a subir. Piensa en hacer que la hebilla del cinturón toque el techo arriba.",
		],
	},
	// ── HIP ABDUCTION ───────────────────────────────────
	{
		id: "hip-abduction",
		test: /(^|-)(hip-abduction|abduction|abductor)(-|$)/,
		en: [
			"Position yourself on the machine or lie on your side with legs stacked and torso stable.",
			"Push your legs apart against the resistance, squeezing your outer glutes. Think about showing the logo on your shoes to the side walls.",
			"Hold the open position briefly, then close slowly under control. Don't let the weight slam back.",
		],
		es: [
			"Colócate en la máquina o túmbate de lado con las piernas apiladas y el torso estable.",
			"Empuja las piernas separándolas contra la resistencia, apretando los glúteos externos. Piensa en mostrar el logo de tus zapatillas a las paredes laterales.",
			"Sostén la posición abierta brevemente, luego cierra lentamente con control. No dejes que el peso vuelva de golpe.",
		],
	},
	// ── HIP ADDUCTION ───────────────────────────────────
	{
		id: "hip-adduction",
		test: /(^|-)(hip-adduction|adduction|adductor)(-|$)/,
		en: [
			"Position yourself with legs apart. Sit tall with your back against the pad.",
			"Squeeze your legs together against the resistance, engaging your inner thighs. Imagine squeezing a ball between your knees.",
			"Hold briefly at the closed position, then open under control. Keep your core braced throughout.",
		],
		es: [
			"Colócate con las piernas separadas. Siéntate erguido con la espalda contra el respaldo.",
			"Aprieta las piernas juntándolas contra la resistencia, activando los aductores. Imagina apretar una pelota entre las rodillas.",
			"Sostén brevemente en la posición cerrada, luego abre con control. Mantén el core activado durante todo el movimiento.",
		],
	},
	// ── LEG CURL / HAMSTRING CURL ───────────────────────
	{
		id: "leg-curl",
		test: /(^|-)(leg-curl|femoral|hamstring-curl|inverse-leg-curl|glute-ham-raise)(-|$)/,
		en: [
			"Adjust the machine pad to rest just above your heels. Grip the handles firmly and press your hips into the pad.",
			"Curl your heels toward your glutes, squeezing your hamstrings hard at the peak contraction.",
			"Lower the weight slowly — fight the machine's pull every inch. Don't let it drop. Keep your hips pressed down to avoid lower back compensation.",
		],
		es: [
			"Ajusta el cojín de la máquina justo por encima de los talones. Agarra las asas con firmeza y presiona las caderas contra el soporte.",
			"Flexiona los talones hacia los glúteos, apretando fuerte los isquiotibiales en la contracción máxima.",
			"Baja el peso lentamente — lucha contra el tirón de la máquina en cada centímetro. No lo dejes caer. Mantén las caderas presionadas para evitar compensar con la espalda baja.",
		],
	},
	// ── LEG EXTENSION ───────────────────────────────────
	{
		id: "leg-extension",
		test: /(^|-)(leg-extension|lever-leg-extension|resistance-band-leg-extension)(-|$)/,
		en: [
			"Sit with your back flat against the pad and the roller pad resting on your shins just above your ankles.",
			"Extend your legs fully by squeezing your quadriceps. Lock out at the top and hold for a brief second.",
			"Lower the weight under control — don't let it drop. Feel the stretch in your quads at the bottom before the next rep.",
		],
		es: [
			"Siéntate con la espalda plana contra el respaldo y el rodillo apoyado en las espinillas justo encima de los tobillos.",
			"Extiende las piernas completamente apretando los cuádriceps. Bloquea arriba y sostén un instante.",
			"Baja el peso con control — no lo dejes caer. Siente el estiramiento en los cuádriceps abajo antes de la siguiente repetición.",
		],
	},
	// ── LEG PRESS ────────────────────────────────────────
	{
		id: "leg-press",
		test: /(^|-)(leg-press|calf-press)(-|$)/,
		en: [
			"Sit in the machine with feet shoulder-width on the platform. Press your lower back firmly against the seat.",
			"Lower the platform by bending your knees toward your chest, going as deep as your mobility allows without your lower back lifting.",
			"Drive through the full foot to push the platform away. Don't fully lock your knees — keep a slight bend at the top.",
		],
		es: [
			"Siéntate en la máquina con los pies a la anchura de los hombros en la plataforma. Presiona la espalda baja contra el asiento.",
			"Baja la plataforma flexionando las rodillas hacia el pecho, bajando tanto como tu movilidad permita sin que la espalda baja se despegue.",
			"Empuja con todo el pie para alejar la plataforma. No bloquees las rodillas del todo — mantén una leve flexión arriba.",
		],
	},
	// ── PUSH-UP ─────────────────────────────────────────
	{
		id: "push-up",
		test: /(^|-)(push-up|push-ups|pushup)(-|$)/,
		en: [
			"Place your hands slightly wider than shoulder-width. Body in a straight line from head to heels — screw your hands into the floor for tension.",
			"Lower your body by bending your elbows at 45° until your chest nearly touches the floor. Pull yourself down actively.",
			"Push the floor away from you to return to the top. Squeeze your chest at lockout and keep your core tight throughout.",
		],
		es: [
			"Coloca las manos ligeramente más anchas que los hombros. Cuerpo en línea recta de cabeza a talones — enrosca las manos contra el suelo para crear tensión.",
			"Baja el cuerpo flexionando los codos a 45° hasta que el pecho casi toque el suelo. Tira activamente de ti mismo hacia abajo.",
			"Empuja el suelo lejos de ti para volver arriba. Aprieta el pecho al bloquear y mantén el core tenso durante todo el movimiento.",
		],
	},
	// ── PULLOVER ────────────────────────────────────────
	{
		id: "pullover",
		test: /(^|-)(pullover)(-|$)/,
		en: [
			"Lie on a bench with arms extended above your chest holding the weight. Maintain a slight bend in your elbows.",
			"Lower the weight behind your head in an arc, feeling a deep stretch in your lats and chest. Go only as far as comfortable.",
			"Pull the weight back over your chest using your lats — imagine scooping the weight back in a wide arc. Keep the same elbow bend throughout.",
		],
		es: [
			"Túmbate en un banco con los brazos extendidos sobre el pecho sujetando el peso. Mantén una ligera flexión de codos.",
			"Baja el peso detrás de la cabeza en arco, sintiendo un estiramiento profundo en dorsales y pecho. Llega solo hasta donde sea cómodo.",
			"Tira del peso de vuelta sobre el pecho usando los dorsales — imagina recoger el peso en un arco amplio. Mantén la misma flexión de codo durante todo el movimiento.",
		],
	},
	// ── SHRUG ────────────────────────────────────────────
	{
		id: "shrug",
		test: /(^|-)(shrug)(-|$)/,
		en: [
			"Hold the weight at your sides with arms fully extended. Stand tall with shoulders relaxed.",
			"Shrug your shoulders straight up toward your ears — don't roll them. Squeeze at the top for 2 seconds.",
			"Lower slowly back down. Keep your arms straight throughout — this is all traps, no biceps.",
		],
		es: [
			"Sujeta el peso a los lados con los brazos completamente extendidos. Mantente erguido con los hombros relajados.",
			"Encoge los hombros rectos hacia las orejas — no los rotes. Aprieta arriba durante 2 segundos.",
			"Baja lentamente. Mantén los brazos rectos en todo momento — esto es todo trapecios, nada de bíceps.",
		],
	},
	// ── SCAPULA ─────────────────────────────────────────
	{
		id: "scapula",
		test: /(^|-)(scapula|scapular)(-|$)/,
		en: [
			"Hang from the bar (or set up in the appropriate position) with arms extended and body relaxed.",
			"Without bending your elbows, retract and depress your shoulder blades — pull them down and together. You'll rise slightly.",
			"Hold the squeezed position briefly, then relax back to the start. Focus entirely on your shoulder blade movement.",
		],
		es: [
			"Cuélgate de la barra (o colócate en la posición adecuada) con los brazos extendidos y el cuerpo relajado.",
			"Sin flexionar los codos, retrae y deprime las escápulas — tíralas hacia abajo y juntas. Subirás ligeramente.",
			"Sostén la posición apretada brevemente, luego relaja al inicio. Céntrate exclusivamente en el movimiento de las escápulas.",
		],
	},
	// ── HYPEREXTENSION / BACK EXTENSION ─────────────────
	{
		id: "hyperextension",
		test: /(^|-)(hyperextension|back-extension|lower-back-curl|reverse-hyper)(-|$)/,
		en: [
			"Position yourself in the hyperextension bench with your hips at the edge of the pad. Cross your arms or place hands behind your head.",
			"Lower your torso down under control, maintaining a neutral spine. Go until you feel a stretch in your hamstrings.",
			"Raise back up by squeezing your glutes and lower back until your body forms a straight line — don't hyperextend past neutral.",
		],
		es: [
			"Colócate en el banco de hiperextensiones con las caderas en el borde del cojín. Cruza los brazos o pon las manos detrás de la cabeza.",
			"Baja el torso con control, manteniendo la columna neutra. Llega hasta sentir un estiramiento en los isquiotibiales.",
			"Sube apretando glúteos y zona lumbar hasta que el cuerpo forme una línea recta — no hiperextiendas más allá de la posición neutra.",
		],
	},
	// ── CRUNCH ───────────────────────────────────────────
	{
		id: "crunch",
		test: /(^|-)(crunch|crunches)(-|$)/,
		en: [
			"Lie on your back with knees bent. Hands behind your head for light support — don't pull on your neck.",
			"Curl your torso up by bringing your ribs toward your pelvis. Imagine shortening the distance between your sternum and belly button.",
			"Hold the top briefly squeezing your abs, then lower slowly back down. Keep your lower back on the floor — it's a short, controlled curl.",
		],
		es: [
			"Túmbate boca arriba con las rodillas flexionadas. Manos detrás de la cabeza como soporte ligero — no tires del cuello.",
			"Enrosca el torso hacia arriba acercando las costillas a la pelvis. Imagina acortar la distancia entre el esternón y el ombligo.",
			"Sostén arriba brevemente apretando los abdominales, luego baja lentamente. Mantén la espalda baja en el suelo — es un movimiento corto y controlado.",
		],
	},
	// ── SIT-UP ──────────────────────────────────────────
	{
		id: "sit-up",
		test: /(^|-)(sit-up|sit-ups|v-up|v-ups|full-sit|otis-up|cocoons?|bottoms-up|butt-ups?)(-|$)/,
		en: [
			"Lie on your back with knees bent and feet anchored (or free for V-ups). Arms in the indicated position.",
			"Sit up fully by engaging your core — lead with your chest, not your chin. For V-ups, raise legs and torso simultaneously.",
			"Lower back down under control. Don't use momentum to swing up — if you need to, regress the movement.",
		],
		es: [
			"Túmbate boca arriba con las rodillas flexionadas y los pies fijos (o libres para V-ups). Brazos en la posición indicada.",
			"Siéntate completamente activando el core — lidera con el pecho, no con la barbilla. En V-ups, sube piernas y torso simultáneamente.",
			"Baja con control. No uses impulso para subir — si lo necesitas, haz una regresión del movimiento.",
		],
	},
	// ── PLANK ────────────────────────────────────────────
	{
		id: "plank",
		test: /(^|-)(planks?|side-plank|side-bridge|shoulder-tap)(-|$)/,
		en: [
			"Set your forearms (or hands) on the floor. Body in a straight line from head to heels — squeeze your glutes and brace your core.",
			"Push the floor away from you to keep your shoulders active. Don't let your hips sag or pike up — imagine balancing a glass of water on your lower back.",
			"Breathe steadily — don't hold your breath. Hold the position for the prescribed time maintaining perfect alignment.",
		],
		es: [
			"Apoya los antebrazos (o manos) en el suelo. Cuerpo en línea recta de cabeza a talones — aprieta los glúteos y activa el core.",
			"Empuja el suelo para mantener los hombros activos. No dejes que las caderas caigan ni suban — imagina equilibrar un vaso de agua en la zona lumbar.",
			"Respira de manera constante — no contengas el aire. Mantén la posición durante el tiempo indicado con alineación perfecta.",
		],
	},
	// ── RUSSIAN TWIST / TWIST ───────────────────────────
	{
		id: "twist",
		test: /(^|-)(russian-twists?|twists?|twisting|rotating|rotation|woodchop|chop|pallof|landmine-180|judo-flip|spell-caster)(-|$)/,
		en: [
			"Sit with knees bent and lean back slightly — or stand with core braced for cable variations. Keep your chest up.",
			"Rotate your torso from side to side, moving with control from your mid-back — not just your arms. Touch the weight beside each hip.",
			"Move with control — range of rotation matters more than speed. Keep your core engaged throughout the entire range.",
		],
		es: [
			"Siéntate con las rodillas flexionadas e inclínate ligeramente — o de pie con el core activado en variantes con polea. Mantén el pecho alto.",
			"Rota el torso de lado a lado, moviendo con control desde la espalda media — no solo los brazos. Toca el peso junto a cada cadera.",
			"Muévete con control — el rango de rotación importa más que la velocidad. Mantén el core activado durante todo el recorrido.",
		],
	},
	// ── BICYCLE ─────────────────────────────────────────
	{
		id: "bicycle",
		test: /(^|-)(bicycle|air-bike|elbow-to-knee)(-|$)/,
		en: [
			"Lie on your back with hands behind your head. Lift both shoulders and feet off the floor.",
			"Bring one knee toward your chest while rotating your opposite elbow to meet it. Extend the other leg straight out.",
			"Alternate sides with a smooth pedaling motion. Each rep is a controlled rotation — don't just flap your elbows.",
		],
		es: [
			"Túmbate boca arriba con las manos detrás de la cabeza. Levanta ambos hombros y pies del suelo.",
			"Lleva una rodilla hacia el pecho mientras rotas el codo opuesto para encontrarla. Extiende la otra pierna recta.",
			"Alterna lados con un movimiento suave de pedaleo. Cada repetición es una rotación controlada — no agites los codos.",
		],
	},
	// ── HEEL TOUCHER / TOE TOUCH (abs) ──────────────────
	{
		id: "heel-touch",
		test: /(^|-)(heel-touch|toe-touch|oblique|heel-touchers?)(-|$)/,
		en: [
			"Lie on your back with knees bent and feet flat. Lift your shoulders slightly off the floor and keep them up throughout.",
			"Reach sideways with your hand to touch your heel (or toe), crunching your obliques. Feel the side of your abs squeeze.",
			"Alternate sides with a controlled lateral crunch. Keep your lower back on the floor and maintain constant tension in your abs.",
		],
		es: [
			"Túmbate boca arriba con las rodillas flexionadas y los pies apoyados. Levanta los hombros ligeramente del suelo y mantenlos arriba.",
			"Alcanza lateralmente con la mano para tocar el talón (o el pie), contrayendo los oblicuos. Siente apretar el lateral del abdomen.",
			"Alterna lados con un crunch lateral controlado. Mantén la espalda baja en el suelo y tensión constante en los abdominales.",
		],
	},
	// ── FLUTTER / SCISSOR ───────────────────────────────
	{
		id: "flutter",
		test: /(^|-)(flutter|scissor|swimmer)(-|$)/,
		en: [
			"Lie face up with your legs extended and hands under your glutes or by your sides. Press your lower back into the floor.",
			"Lift both legs a few inches off the floor and alternate kicking them up and down in a short, rapid motion.",
			"Keep your core braced and your lower back glued to the floor throughout. If your back arches, raise your legs higher.",
		],
		es: [
			"Túmbate boca arriba con las piernas extendidas y las manos bajo los glúteos o a los lados. Presiona la espalda baja contra el suelo.",
			"Levanta ambas piernas unos centímetros del suelo y alterna pateando arriba y abajo con un movimiento corto y rápido.",
			"Mantén el core activado y la espalda baja pegada al suelo. Si la espalda se arquea, sube las piernas un poco más.",
		],
	},
	// ── ROLLOUT (ab wheel) ──────────────────────────────
	{
		id: "rollout",
		test: /(^|-)(roller|rollerout|rollout|wheel-roller|body-saw)(-|$)/,
		en: [
			"Kneel (or stand for advanced) with both hands on the wheel or roller. Start with your hips over your knees and arms extended.",
			"Roll forward by extending through your shoulders while keeping your core rock solid. Don't let your hips sag — brace hard.",
			"Pull yourself back using your abs — imagine pulling your belly button toward your spine. Go only as far as you can control.",
		],
		es: [
			"Arrodíllate (o de pie para avanzados) con ambas manos en la rueda. Empieza con las caderas sobre las rodillas y brazos extendidos.",
			"Rueda hacia delante extendiendo por los hombros mientras mantienes el core firme como una roca. No dejes que las caderas caigan — activa fuerte.",
			"Tira de ti mismo de vuelta usando los abdominales — imagina llevar el ombligo hacia la columna. Llega solo hasta donde puedas controlar.",
		],
	},
	// ── CLEAN / SNATCH / POWER ──────────────────────────
	{
		id: "clean-snatch",
		test: /(^|-)(clean|snatch|power-clean|hang-clean|clean-and-press|clean-grip|snatch-pull|clean-pull)(-|$)/,
		en: [
			"Feet hip-width, bar over mid-foot. Drop your hips, chest up, arms straight — take the slack out of the bar.",
			"Drive explosively through the floor, extending hips and knees. As the bar passes your knees, accelerate with a violent hip extension and shrug.",
			"Catch the bar at the shoulders (clean) or overhead (snatch) by dropping fast under the bar. Absorb the catch with soft knees, then stand.",
		],
		es: [
			"Pies a la anchura de las caderas, barra sobre la mitad del pie. Baja las caderas, pecho alto, brazos rectos — quita la holgura de la barra.",
			"Empuja el suelo de forma explosiva, extendiendo caderas y rodillas. Cuando la barra pase las rodillas, acelera con una extensión violenta de cadera y encogimiento.",
			"Recibe la barra en los hombros (clean) o sobre la cabeza (snatch) dejándote caer rápido bajo la barra. Amortigua la recepción con rodillas suaves, luego ponte de pie.",
		],
	},
	// ── BURPEE ───────────────────────────────────────────
	{
		id: "burpee",
		test: /(^|-)(burpee)(-|$)/,
		en: [
			"Stand tall, then squat down and place your hands on the floor in front of you.",
			"Jump or step your feet back into a push-up position. Perform a push-up (or skip it for speed).",
			"Jump or step your feet back toward your hands, then explode up into a jump, reaching your hands overhead. Land softly and repeat.",
		],
		es: [
			"De pie, baja en sentadilla y coloca las manos en el suelo frente a ti.",
			"Salta o lleva los pies atrás a posición de flexión. Haz una flexión (o sáltala para más velocidad).",
			"Salta o lleva los pies de vuelta a las manos, luego explota hacia arriba en un salto con las manos sobre la cabeza. Aterriza suave y repite.",
		],
	},
	// ── MOUNTAIN CLIMBER ────────────────────────────────
	{
		id: "mountain-climber",
		test: /(^|-)(mountain-climber|climber)(-|$)/,
		en: [
			"Start in a push-up position with your core braced and body in a straight line.",
			"Drive one knee toward your chest, then quickly switch legs in a running motion while keeping your hips level.",
			"Maintain a fast but controlled pace. Don't let your hips bounce up and down — stay tight and think about running in place horizontally.",
		],
		es: [
			"Empieza en posición de flexión con el core activado y el cuerpo en línea recta.",
			"Lleva una rodilla hacia el pecho, luego cambia rápidamente de pierna en un movimiento de carrera manteniendo las caderas niveladas.",
			"Mantén un ritmo rápido pero controlado. No dejes que las caderas reboten — mantente tenso y piensa en correr en el sitio en horizontal.",
		],
	},
	// ── JUMP / PLYOMETRIC ───────────────────────────────
	{
		id: "jump",
		test: /(^|-)(jump|jumps|hop|hops|bounding|box-jump|star-jump|jack-jump|scissor-jump|semi-squat-jump|squat-jump|astride)(-|$)/,
		en: [
			"Stand with feet hip-to-shoulder-width apart. Load your legs with a quick dip — bend your knees and hips to build tension.",
			"Explode upward, fully extending your hips, knees, and ankles. Drive your arms for extra height if applicable.",
			"Land softly by bending your knees and absorbing the impact through your legs. Think about landing as quietly as a cat.",
		],
		es: [
			"De pie con los pies a la anchura de las caderas o los hombros. Carga las piernas con una flexión rápida para acumular tensión.",
			"Explota hacia arriba extendiendo completamente caderas, rodillas y tobillos. Impulsa con los brazos para ganar altura si aplica.",
			"Aterriza suave flexionando las rodillas y absorbiendo el impacto con las piernas. Piensa en aterrizar silenciosamente como un gato.",
		],
	},
	// ── JUMP ROPE ───────────────────────────────────────
	{
		id: "jump-rope",
		test: /(^|-)(jump-rope|skip-rope|rope-skip)(-|$)/,
		en: [
			"Stand tall with the rope behind you. Elbows close to your body, wrists doing the rotation — not your shoulders.",
			"Jump just high enough to clear the rope — a few centimeters is all you need. Stay on the balls of your feet.",
			"Maintain a rhythmic pace. Keep your core tight and your jumps light and quiet.",
		],
		es: [
			"De pie con la cuerda detrás. Codos pegados al cuerpo, las muñecas hacen la rotación — no los hombros.",
			"Salta justo lo necesario para pasar la cuerda — unos pocos centímetros bastan. Mantente en la punta de los pies.",
			"Mantén un ritmo constante. Core activado y saltos ligeros y silenciosos.",
		],
	},
	// ── RUNNING / JOGGING / WALKING ─────────────────────
	{
		id: "run",
		test: /(^|-)(run(?:ning)?|jog|walk(?:ing)?|sprints?|stride|treadmill|high-knee|skater|ski-step|back-and-forth|quick-feet|wind-sprints?)(-|$)/,
		en: [
			"Adopt an upright posture with a slight forward lean from the ankles. Arms at 90° swinging naturally.",
			"Drive your knees forward and land mid-foot, keeping your cadence smooth and consistent.",
			"Engage your core throughout and maintain your breathing rhythm — in through the nose, out through the mouth.",
		],
		es: [
			"Adopta una postura erguida con una ligera inclinación hacia delante desde los tobillos. Brazos a 90° balanceándose de forma natural.",
			"Impulsa las rodillas hacia delante y aterriza con la parte media del pie, manteniendo la cadencia suave y constante.",
			"Activa el core durante todo el ejercicio y mantén el ritmo de respiración — inhala por la nariz, exhala por la boca.",
		],
	},
	// ── CYCLING / BIKE / ELLIPTICAL ─────────────────────
	{
		id: "cycling",
		test: /(^|-)(bike|cycling|cycle|elliptical|cross-trainer|ergometer|erg)(-|$)/,
		en: [
			"Adjust the seat and handles to your body. Sit with a slight knee bend at the bottom of the pedal stroke.",
			"Pedal smoothly, pushing down and pulling up in a circular motion. Keep a steady cadence at your target resistance.",
			"Maintain an upright posture, engage your core, and keep your breathing rhythmic throughout.",
		],
		es: [
			"Ajusta el asiento y los agarres a tu cuerpo. Siéntate con una ligera flexión de rodilla en el punto más bajo del pedaleo.",
			"Pedalea suavemente, empujando hacia abajo y tirando hacia arriba en un movimiento circular. Mantén una cadencia constante a la resistencia objetivo.",
			"Mantén una postura erguida, activa el core y mantén una respiración rítmica durante todo el ejercicio.",
		],
	},
	// ── ROWING MACHINE ──────────────────────────────────
	{
		id: "rowing-machine",
		test: /(^|-)(rowing-machine|row-machine|stepmill|wheel-run)(-|$)/,
		en: [
			"Sit on the machine, strap your feet in, and grip the handle. Start with arms extended and knees bent.",
			"Drive with your legs first, then lean back slightly and pull the handle to your lower chest. The sequence is legs-back-arms.",
			"Return in reverse order: arms away, body forward, then bend your knees. Maintain a fluid, rhythmic motion throughout.",
		],
		es: [
			"Siéntate en la máquina, fija los pies y agarra el asa. Empieza con los brazos extendidos y las rodillas flexionadas.",
			"Impulsa primero con las piernas, luego inclínate ligeramente y tira del asa hacia la parte baja del pecho. La secuencia es piernas-espalda-brazos.",
			"Vuelve en orden inverso: brazos al frente, cuerpo hacia delante, luego flexiona las rodillas. Mantén un movimiento fluido y rítmico.",
		],
	},
	// ── SUPERMAN / BIRD-DOG / DEAD-BUG ──────────────────
	{
		id: "superman",
		test: /(^|-)(superman|bird-dog|dead-bug|swimmer-kick|upward-facing-dog|cobra|sphinx)(-|$)/,
		en: [
			"Lie face down (or face up for dead bugs). Extend your limbs in the starting position indicated.",
			"Raise the indicated limbs off the floor simultaneously, squeezing your back muscles (or core for dead bugs). Hold at the top for 2 seconds.",
			"Lower under control back to the starting position. Focus on lengthening your body as if being pulled from both ends.",
		],
		es: [
			"Túmbate boca abajo (o boca arriba para dead bugs). Extiende las extremidades en la posición inicial indicada.",
			"Levanta las extremidades indicadas del suelo simultáneamente, apretando los músculos de la espalda (o core para dead bugs). Sostén arriba 2 segundos.",
			"Baja con control a la posición inicial. Céntrate en alargar el cuerpo como si tiraran de ti desde ambos extremos.",
		],
	},
	// ── NECK STRETCH / LEVATOR SCAPULAE ─────────────────
	{
		id: "neck-stretch",
		test: /(^|-)(neck-stretch|neck-side|side-push-neck)(-|$)/,
		en: [
			"Sit or stand tall. Gently tilt your head toward one shoulder, bringing your ear toward it without raising the shoulder.",
			"Hold the stretch for 20-30 seconds, breathing deeply. You can use your hand for gentle additional pressure.",
			"Return slowly to center and repeat on the other side. Never force the stretch — go only to the point of mild tension.",
		],
		es: [
			"Siéntate o ponte de pie erguido. Inclina suavemente la cabeza hacia un hombro, llevando la oreja hacia él sin subir el hombro.",
			"Mantén el estiramiento 20-30 segundos, respirando profundamente. Puedes usar la mano para añadir una presión suave.",
			"Vuelve lentamente al centro y repite en el otro lado. Nunca fuerces el estiramiento — llega solo al punto de tensión leve.",
		],
	},
	// ── WINDMILL ─────────────────────────────────────────
	{
		id: "windmill",
		test: /(^|-)(windmill)(-|$)/,
		en: [
			"Press the weight overhead and lock your arm. Turn your feet about 45° away from the loaded side.",
			"Hinge at the hip and slide your free hand down your front leg while keeping your eyes on the weight overhead.",
			"Stand back up by driving your hips forward. The overhead arm stays locked and vertical throughout the entire movement.",
		],
		es: [
			"Empuja el peso sobre la cabeza y bloquea el brazo. Gira los pies unos 45° en la dirección contraria al peso.",
			"Haz bisagra de cadera y desliza la mano libre por la pierna delantera mientras mantienes la mirada en el peso de arriba.",
			"Ponte de pie empujando las caderas hacia delante. El brazo de arriba permanece bloqueado y vertical durante todo el movimiento.",
		],
	},
	// ── BEAR CRAWL ──────────────────────────────────────
	{
		id: "bear-crawl",
		test: /(^|-)(bear-crawl|crawl|inchworm)(-|$)/,
		en: [
			"Start on all fours with your knees hovering just an inch off the ground. Core engaged, back flat.",
			"Move forward by stepping opposite hand and foot simultaneously — right hand with left foot, and vice versa.",
			"Keep your hips low and stable, moving deliberately. The smaller and more controlled your steps, the better the core engagement.",
		],
		es: [
			"Empieza a cuatro patas con las rodillas flotando a un centímetro del suelo. Core activado, espalda plana.",
			"Avanza moviendo mano y pie opuestos a la vez — mano derecha con pie izquierdo, y viceversa.",
			"Mantén las caderas bajas y estables, moviéndote con intención. Cuanto más pequeños y controlados sean los pasos, mejor será la activación del core.",
		],
	},
	// ── FARMERS WALK / CARRY ─────────────────────────────
	{
		id: "carry",
		test: /(^|-)(farmer|carry|walk-.*weight|suitcase)(-|$)/,
		en: [
			"Pick up the weight and stand tall — shoulders back, chest up, core braced hard. The weight hangs at your sides.",
			"Walk forward with controlled, deliberate steps. Keep your shoulders level and resist the urge to lean.",
			"Maintain an upright posture throughout. Grip the weight as hard as you can — crush-grip strength is half the exercise.",
		],
		es: [
			"Coge el peso y ponte erguido — hombros atrás, pecho alto, core activado fuerte. El peso cuelga a los lados.",
			"Camina hacia delante con pasos controlados e intencionados. Mantén los hombros nivelados y resiste la tentación de inclinarte.",
			"Mantén una postura erguida en todo momento. Aprieta el peso con toda tu fuerza — la fuerza de agarre es la mitad del ejercicio.",
		],
	},
	// ── SWING (kettlebell) ───────────────────────────────
	{
		id: "swing",
		test: /(^|-)(swing|swing-360)(-|$)/,
		en: [
			"Stand with feet shoulder-width apart, gripping the kettlebell with both hands. Hinge at the hips to start the swing.",
			"Explosively drive your hips forward — the power comes from your hips, not your arms. The weight floats up as a consequence.",
			"Let the kettlebell fall naturally, hinging your hips back to absorb it. Keep your core braced and back flat throughout.",
		],
		es: [
			"De pie con los pies a la anchura de los hombros, agarra la kettlebell con ambas manos. Haz bisagra de cadera para iniciar el swing.",
			"Empuja las caderas hacia delante de forma explosiva — la potencia viene de las caderas, no de los brazos. El peso sube como consecuencia.",
			"Deja que la kettlebell caiga de forma natural, haciendo bisagra de cadera para absorberla. Mantén el core activado y la espalda plana.",
		],
	},
	// ── PRONATION / SUPINATION / ROTATION (forearms) ────
	{
		id: "forearm-rotation",
		test: /(^|-)(pronation|supination|rotate|wrist-circles?|hand-squeeze|gripper|wrist-rollerer)(-|$)/,
		en: [
			"Hold the weight (or grip device) with your forearm supported and stable.",
			"Rotate or squeeze through the full range of motion in a slow, controlled manner. Focus on the muscles of the forearm doing the work.",
			"Return under control to the starting position. Each rep should take 2-3 seconds in each direction.",
		],
		es: [
			"Sujeta el peso (o dispositivo de agarre) con el antebrazo apoyado y estable.",
			"Rota o aprieta por todo el rango de movimiento de forma lenta y controlada. Céntrate en los músculos del antebrazo haciendo el trabajo.",
			"Vuelve con control a la posición inicial. Cada repetición debería tomar 2-3 segundos en cada dirección.",
		],
	},
	// ── FACE PULL ────────────────────────────────────────
	{
		id: "face-pull",
		test: /(^|-)(face-pull)(-|$)/,
		en: [
			"Set the cable at face height. Grip the rope with palms facing each other and step back to create tension.",
			"Pull the rope toward your face, splitting the ends apart as you pull. Drive your elbows back and apart.",
			"Squeeze your rear delts and upper back at the end position for a count, then extend your arms back slowly.",
		],
		es: [
			"Ajusta la polea a la altura de la cara. Agarra la cuerda con las palmas enfrentadas y retrocede para crear tensión.",
			"Tira de la cuerda hacia la cara, separando los extremos mientras tiras. Lleva los codos hacia atrás y separados.",
			"Aprieta los deltoides posteriores y la espalda alta en la posición final durante un segundo, luego extiende los brazos lentamente.",
		],
	},
	// ── SKIER / BATTLING ROPES ───────────────────────────
	{
		id: "ropes-skier",
		test: /(^|-)(battling-ropes?|battle-ropes?|skier)(-|$)/,
		en: [
			"Stand with feet shoulder-width apart, knees slightly bent, core braced. Grip one end in each hand.",
			"Create continuous waves by alternating (or slamming) your arms up and down. The power comes from your entire body, not just your arms.",
			"Maintain a consistent rhythm and keep your core tight throughout. Don't let the ropes go slack — keep tension in every movement.",
		],
		es: [
			"De pie con los pies a la anchura de los hombros, rodillas ligeramente flexionadas, core activado. Agarra un extremo en cada mano.",
			"Crea ondas continuas alternando (o golpeando) los brazos arriba y abajo. La potencia viene de todo el cuerpo, no solo de los brazos.",
			"Mantén un ritmo constante y el core apretado. No dejes que las cuerdas se aflojen — mantén tensión en cada movimiento.",
		],
	},
	// ── YOGA / POSE ─────────────────────────────────────
	{
		id: "yoga",
		test: /(^|-)(yoga|pose|butterfly|frog|reclining|seated-wide-angle)(-|$)/,
		en: [
			"Move into the pose gradually, finding your comfortable edge. Don't force yourself into a deeper position than your body allows.",
			"Hold the position breathing deeply and steadily. With each exhale, try to relax a little deeper into the stretch.",
			"Come out of the pose slowly and mindfully. Notice the difference in how your body feels before and after.",
		],
		es: [
			"Entra en la postura gradualmente, encontrando tu límite cómodo. No te fuerces a una posición más profunda de la que tu cuerpo permite.",
			"Mantén la posición respirando profunda y constantemente. Con cada exhalación, intenta relajarte un poco más en el estiramiento.",
			"Sal de la postura lentamente y con atención. Nota la diferencia en cómo se siente tu cuerpo antes y después.",
		],
	},
	// ── STRETCH – generic ───────────────────────────────
	{
		id: "stretch",
		test: /(^|-)(stretch|stretching)(-|$)/,
		en: [
			"Move into the stretch position slowly until you feel a gentle pull in the target area — not pain.",
			"Hold for 20 to 40 seconds breathing deeply. With each exhale, try to sink slightly deeper into the stretch.",
			"Release slowly and repeat if desired. Consistency matters more than intensity — stretch regularly for lasting flexibility.",
		],
		es: [
			"Llega a la posición de estiramiento lentamente hasta sentir una tensión suave en la zona objetivo — no dolor.",
			"Mantén 20 a 40 segundos respirando profundamente. Con cada exhalación, intenta hundirte un poco más en el estiramiento.",
			"Suelta lentamente y repite si lo deseas. La constancia importa más que la intensidad — estira regularmente para una flexibilidad duradera.",
		],
	},
	// ── ISOMETRIC ────────────────────────────────────────
	{
		id: "isometric",
		test: /(^|-)(isometric|iso-hold|hold|static)(-|$)/,
		en: [
			"Get into the hold position as indicated, engaging the target muscles fully before you start the clock.",
			"Hold the position for the prescribed time. Push against the resistance without allowing any movement.",
			"Release slowly and rest between sets. Focus on maximal tension — every second under load counts.",
		],
		es: [
			"Colócate en la posición de mantenimiento indicada, activando completamente los músculos objetivo antes de empezar el tiempo.",
			"Mantén la posición durante el tiempo indicado. Empuja contra la resistencia sin permitir movimiento.",
			"Suelta lentamente y descansa entre series. Céntrate en la máxima tensión — cada segundo bajo carga cuenta.",
		],
	},
	// ── BOXING ───────────────────────────────────────────
	{
		id: "boxing",
		test: /(^|-)(hook|cross-punch|jab|uppercut|boxing|punch)(-|$)/,
		en: [
			"Stand in a boxing stance — feet staggered, hands up guarding your face, core tight.",
			"Throw the punch by rotating your hips and shoulders together. The power comes from the ground through your hips, not just your arm.",
			"Return your hand to the guard position immediately. Stay light on your feet and keep your non-punching hand protecting your face.",
		],
		es: [
			"Colócate en posición de boxeo — pies escalonados, manos arriba protegiendo la cara, core activado.",
			"Lanza el golpe rotando caderas y hombros juntos. La potencia viene del suelo a través de las caderas, no solo del brazo.",
			"Devuelve la mano a la posición de guardia inmediatamente. Mantente ligero sobre los pies y la mano que no golpea protegiendo la cara.",
		],
	},
	// ── SLED ─────────────────────────────────────────────
	{
		id: "sled",
		test: /(^|-)(sled|tire-flip|push-to-run)(-|$)/,
		en: [
			"Get behind the sled in a 45° lean position, hands on the handles. Drive your body weight forward.",
			"Push by driving your knees up and forward, digging your feet into the ground with each step.",
			"Keep your core braced and maintain consistent power output. Short, choppy steps deliver more force than long strides.",
		],
		es: [
			"Colócate detrás del trineo inclinado a 45°, manos en las asas. Impulsa el peso de tu cuerpo hacia delante.",
			"Empuja llevando las rodillas arriba y hacia delante, clavando los pies en el suelo en cada paso.",
			"Mantén el core activado y una potencia constante. Pasos cortos y rápidos generan más fuerza que zancadas largas.",
		],
	},
	// ── SPINE STRETCH / BACK MOBILITY ───────────────────
	{
		id: "spine-stretch",
		test: /(^|-)(spine-stretch|spine-twist|roller-back|hug)(-|$)/,
		en: [
			"Adopt the indicated position. Focus on finding a comfortable range where you feel gentle mobilization in your spine.",
			"Move slowly through the range of motion, breathing deeply. Let each exhale help you release tension.",
			"Repeat for the prescribed reps or hold time. This should feel therapeutic — never push through pain.",
		],
		es: [
			"Adopta la posición indicada. Céntrate en encontrar un rango cómodo donde sientas una movilización suave en la columna.",
			"Muévete lentamente por el rango de movimiento, respirando profundamente. Deja que cada exhalación te ayude a liberar tensión.",
			"Repite las repeticiones o tiempo indicado. Debería ser terapéutico — nunca empujes a través del dolor.",
		],
	},
	// ── BALANCE BOARD ───────────────────────────────────
	{
		id: "balance",
		test: /(^|-)(balance-board|bosu)(-|$)/,
		en: [
			"Step onto the balance surface carefully and find your center. Engage your core and fix your gaze on a point ahead.",
			"Perform the indicated movement while maintaining balance. Small corrections from your ankles and core are normal and beneficial.",
			"If you lose balance, step off safely and reset. Proprioception improves with practice — stay patient and consistent.",
		],
		es: [
			"Sube a la superficie de equilibrio con cuidado y encuentra tu centro. Activa el core y fija la mirada en un punto al frente.",
			"Realiza el movimiento indicado manteniendo el equilibrio. Pequeñas correcciones desde los tobillos y el core son normales y beneficiosas.",
			"Si pierdes el equilibrio, baja con seguridad y recolócate. La propiocepción mejora con la práctica — ten paciencia y constancia.",
		],
	},
	// ── CLAMSHELL / FIRE HYDRANT / DONKEY KICK ──────────
	{
		id: "glute-isolation",
		test: /(^|-)(clamshell|fire-hydrant|donkey-kick|donkey|hip-circle|ankle-circles?)(-|$)/,
		en: [
			"Get on all fours (or side-lying for clamshells) with your core engaged and spine neutral.",
			"Move the indicated leg through its range of motion slowly, focusing on squeezing the glute at the peak of each rep.",
			"Keep your hips stable and square — don't let them rock or rotate. The movement comes only from the hip joint.",
		],
		es: [
			"Colócate a cuatro patas (o de lado para clamshells) con el core activado y la columna neutra.",
			"Mueve la pierna indicada por su rango de movimiento lentamente, centrándote en apretar el glúteo en el punto máximo de cada repetición.",
			"Mantén las caderas estables y cuadradas — no dejes que se balanceen o roten. El movimiento sale solo de la articulación de la cadera.",
		],
	},
	// ── SIDE BEND ───────────────────────────────────────
	{
		id: "side-bend",
		test: /(^|-)(side-bend|side-bent)(-|$)/,
		en: [
			"Stand (or sit) tall holding the weight on one side. Keep your hips square and facing forward.",
			"Lean away from the weight, stretching the oblique, then contract your oblique to pull yourself back upright and past center.",
			"Move slowly with control — this is not a momentum exercise. Feel the stretch on one side and the squeeze on the other.",
		],
		es: [
			"De pie (o sentado) erguido sujetando el peso a un lado. Mantén las caderas cuadradas y mirando al frente.",
			"Inclínate alejándote del peso, estirando el oblicuo, luego contrae el oblicuo para volver erguido y pasar del centro.",
			"Muévete lentamente con control — no es un ejercicio de impulso. Siente el estiramiento a un lado y la contracción en el otro.",
		],
	},
	// ── GYMNASTIC HOLDS (lever, planche, maltese, etc.) ─
	{
		id: "gymnastic-hold",
		test: /(^|-)(front-lever|back-lever|lean-planche|full-planche|straddle-planche|full-maltese|straddle-maltese|handstand|l-sit|v-sit|flag|skin-the-cat|body-up)(-|$)/,
		en: [
			"Build tension through your entire body before entering the hold. Squeeze everything — glutes, core, lats, legs.",
			"Enter the position with control, maintaining full body rigidity. Think of your body as a single straight plank of wood.",
			"Hold for the prescribed time, or perform controlled reps. If you can't maintain perfect form, work on a regression of the same movement.",
		],
		es: [
			"Crea tensión en todo el cuerpo antes de entrar en la posición. Aprieta todo — glúteos, core, dorsales, piernas.",
			"Entra en la posición con control, manteniendo rigidez total del cuerpo. Piensa en tu cuerpo como una tabla de madera sólida.",
			"Mantén el tiempo indicado o realiza repeticiones controladas. Si no puedes mantener la forma perfecta, trabaja una regresión del mismo movimiento.",
		],
	},
	// ── MEDICINE BALL THROW / SLAM ──────────────────────
	{
		id: "medicine-ball",
		test: /(^|-)(medicine-ball|slam|chest-push|chest-pass|overhead-throw|catch-and)(-|$)/,
		en: [
			"Hold the medicine ball with both hands. Set your feet and load your hips and core like a coiled spring.",
			"Throw or slam the ball explosively using your whole body — hips drive first, then core, then arms. Put maximum intent into every rep.",
			"Retrieve the ball (or catch it), reset your position, and repeat. Each rep should be as powerful as the first — quality over volume.",
		],
		es: [
			"Sujeta el balón medicinal con ambas manos. Fija los pies y carga caderas y core como un muelle comprimido.",
			"Lanza o golpea el balón de forma explosiva usando todo el cuerpo — las caderas impulsan primero, luego el core, luego los brazos. Pon la máxima intención en cada repetición.",
			"Recoge el balón (o recíbelo), recoloca tu posición y repite. Cada repetición debe ser tan potente como la primera — calidad sobre volumen.",
		],
	},
	// ── ROPE CLIMB ──────────────────────────────────────
	{
		id: "rope-climb",
		test: /(^|-)(rope-climb)(-|$)/,
		en: [
			"Grip the rope above your head with both hands. Lock the rope around one foot with the other foot on top.",
			"Stand up on the foot lock, then reach up with your hands to a higher position. Re-lock your feet and repeat.",
			"Descend under control by slowly lowering hand over hand. Never slide down — the rope will burn your hands and shins.",
		],
		es: [
			"Agarra la cuerda sobre tu cabeza con ambas manos. Bloquea la cuerda alrededor de un pie con el otro pie encima.",
			"Ponte de pie sobre el bloqueo del pie, luego sube las manos a una posición más alta. Vuelve a bloquear los pies y repite.",
			"Desciende con control bajando mano sobre mano. Nunca te deslices — la cuerda quemará las manos y las espinillas.",
		],
	},
	// ── HIGH PULL ───────────────────────────────────────
	{
		id: "high-pull",
		test: /(^|-)(high-pull|sumo-high-pull)(-|$)/,
		en: [
			"Start in a wide stance (sumo) or hip-width. Grip the weight with arms extended and hips loaded.",
			"Drive explosively through the floor, extending hips and knees, then pull the weight to chin height leading with your elbows.",
			"Lower the weight under control back to the starting position. The power comes from the legs and hips, not the arms.",
		],
		es: [
			"Comienza en postura amplia (sumo) o a la anchura de caderas. Agarra el peso con los brazos extendidos y las caderas cargadas.",
			"Empuja el suelo de forma explosiva, extendiendo caderas y rodillas, luego tira del peso hasta la altura de la barbilla liderando con los codos.",
			"Baja el peso con control a la posición inicial. La potencia viene de las piernas y caderas, no de los brazos.",
		],
	},
	// ── FIGURE 8 / KETTLEBELL SPECIFIC ──────────────────
	{
		id: "figure-8",
		test: /(^|-)(figure-8|pirate|around-world|around-the-world|round-arm|arm-circles?)(-|$)/,
		en: [
			"Stand with feet wider than shoulder-width and the weight in one hand. Maintain an athletic stance with knees slightly bent.",
			"Pass the weight around or between your legs in the indicated pattern, transferring from hand to hand in a fluid motion.",
			"Keep your core engaged and your eyes forward — don't look down at the weight. The movement should be smooth and rhythmic.",
		],
		es: [
			"De pie con los pies más anchos que los hombros y el peso en una mano. Mantén una postura atlética con las rodillas ligeramente flexionadas.",
			"Pasa el peso alrededor o entre las piernas en el patrón indicado, transfiriéndolo de mano a mano en un movimiento fluido.",
			"Mantén el core activado y la mirada al frente — no mires hacia abajo al peso. El movimiento debe ser suave y rítmico.",
		],
	},
	// ── RAISE – generic (catch-all for dumbbell-raise etc.)
	{
		id: "raise-generic",
		test: /(^|-)(raise|raises)(-|$)/,
		en: [
			"Stand or sit in the starting position with the weight ready and core braced.",
			"Raise the weight through the indicated path of motion with a slight bend in your elbows. Stop at shoulder height unless indicated otherwise.",
			"Lower slowly under control, resisting gravity throughout the descent. Don't use momentum — control every inch.",
		],
		es: [
			"De pie o sentado en la posición inicial con el peso preparado y el core activado.",
			"Sube el peso por la trayectoria indicada con una leve flexión de codos. Para a la altura de los hombros salvo que se indique lo contrario.",
			"Baja lentamente con control, resistiendo la gravedad durante todo el descenso. No uses impulso — controla cada centímetro.",
		],
	},
	// ── SLEDGE HAMMER ───────────────────────────────────
	{
		id: "sledgehammer",
		test: /(^|-)(sledge-hammer|sledgehammer)(-|$)/,
		en: [
			"Stand with feet shoulder-width apart facing the tire. Grip the sledgehammer with hands staggered on the handle.",
			"Raise the hammer overhead, then swing it down powerfully into the tire, driving with your hips and core.",
			"Let the hammer bounce back naturally, then reset and swing again. Alternate the forward hand each set for balanced development.",
		],
		es: [
			"De pie con los pies a la anchura de los hombros frente al neumático. Agarra el mazo con las manos escalonadas en el mango.",
			"Levanta el mazo sobre la cabeza, luego golpea con fuerza el neumático, impulsando con caderas y core.",
			"Deja que el mazo rebote de forma natural, luego recoloca y golpea de nuevo. Alterna la mano delantera en cada serie para un desarrollo equilibrado.",
		],
	},
	// ── ELEVATOR (ab exercise) ──────────────────────────
	{
		id: "elevator",
		test: /(^|-)(elevator)(-|$)/,
		en: [
			"Hang from a bar or position yourself with arms supported. Start with legs hanging straight down.",
			"Raise your legs in stages — stopping at 45°, 90°, and full height — like an elevator making stops at each floor.",
			"Lower your legs in the same stages with control. Each pause builds isometric strength and control throughout the range.",
		],
		es: [
			"Cuélgate de una barra o colócate con los brazos apoyados. Empieza con las piernas colgando rectas.",
			"Sube las piernas por etapas — parando a 45°, 90° y altura máxima — como un ascensor parando en cada planta.",
			"Baja las piernas en las mismas etapas con control. Cada pausa construye fuerza isométrica y control en todo el rango.",
		],
	},
	// ── MARCH / WALL SIT ────────────────────────────────
	{
		id: "wall-sit",
		test: /(^|-)(march|wall|one-arm-against)(-|$)/,
		en: [
			"Position yourself against the wall as indicated. Slide down until your thighs are parallel to the floor.",
			"Hold the position or perform the indicated movement while keeping your back flat against the wall.",
			"Keep your weight through your heels and maintain the 90° knee angle throughout.",
		],
		es: [
			"Colócate contra la pared como se indica. Baja deslizándote hasta que los muslos estén paralelos al suelo.",
			"Mantén la posición o realiza el movimiento indicado con la espalda plana contra la pared.",
			"Mantén el peso en los talones y el ángulo de 90° en las rodillas durante todo el ejercicio.",
		],
	},
	// ── SINGLE LEG BRIDGE ───────────────────────────────
	{
		id: "single-leg-bridge",
		test: /(^|-)(single-leg-bridge|rear-decline-bridge)(-|$)/,
		en: [
			"Lie on your back with one foot flat on the floor and the other leg extended or elevated as indicated.",
			"Drive through the working foot's heel and squeeze your glute to lift your hips until your body forms a straight line.",
			"Lower under control without letting your hips drop to one side. The working glute should burn — that's the goal.",
		],
		es: [
			"Túmbate boca arriba con un pie apoyado en el suelo y la otra pierna extendida o elevada como se indica.",
			"Empuja con el talón del pie de trabajo y aprieta el glúteo para elevar las caderas hasta formar una línea recta con el cuerpo.",
			"Baja con control sin dejar que las caderas caigan a un lado. El glúteo de trabajo debería arder — ese es el objetivo.",
		],
	},
	// ── SUSPENDED / FALLOUT ─────────────────────────────
	{
		id: "suspended",
		test: /(^|-)(suspended|fallout|arm-slingers?)(-|$)/,
		en: [
			"Grip the suspension handles or bar and lean into the starting angle. The steeper the angle, the harder the exercise.",
			"Perform the movement with your core locked tight — imagine your torso is a rigid plank that doesn't bend.",
			"Return to the starting position under control. Adjust your foot position to increase or decrease difficulty.",
		],
		es: [
			"Agarra las asas de suspensión o barra e inclínate en el ángulo inicial. Cuanto mayor el ángulo, más difícil el ejercicio.",
			"Realiza el movimiento con el core totalmente bloqueado — imagina que tu torso es una tabla rígida que no se dobla.",
			"Vuelve a la posición inicial con control. Ajusta la posición de los pies para aumentar o reducir la dificultad.",
		],
	},
	// ── TOE RAISE / SMITH TOE ───────────────────────────
	{
		id: "toe-raise",
		test: /(^|-)(toe-raise|reverse-calf|rotary-calf)(-|$)/,
		en: [
			"Stand with your heels on the edge of a platform (or flat ground). Support yourself for balance.",
			"Lift your toes and the balls of your feet as high as possible, squeezing the front of your shins.",
			"Lower slowly under control. This strengthens the tibialis anterior — a key muscle for ankle stability and shin splint prevention.",
		],
		es: [
			"Colócate con los talones en el borde de una plataforma (o suelo plano). Agárrate a un soporte para mantener el equilibrio.",
			"Levanta los dedos y las puntas de los pies lo más alto posible, apretando la parte frontal de las espinillas.",
			"Baja lentamente con control. Esto fortalece el tibial anterior — un músculo clave para la estabilidad del tobillo y la prevención de periostitis.",
		],
	},
];

// ─────────────────────────────────────────────────────────────
// 8. BREATHING CUES (final step)
// ─────────────────────────────────────────────────────────────

const BREATHING_EN = {
	strength:
		"Breathe: exhale during the effort phase, inhale on the return. On heavy compound lifts, brace with a big belly breath and hold through the hardest part of the rep.",
	stretching:
		"Breathe deeply and steadily throughout the hold. Never hold your breath during stretches.",
	plyometrics:
		"Breathe: exhale sharply on the jump or explosive effort. Inhale during the loading phase.",
	cardio:
		"Breathe rhythmically — in through the nose and out through the mouth, matching your pace.",
};

const BREATHING_ES = {
	strength:
		"Respiración: exhala durante el esfuerzo, inhala en el retorno. En movimientos compuestos pesados, toma una gran bocanada de aire al abdomen y mantenla durante la parte más dura de la repetición.",
	stretching:
		"Respira profunda y constantemente durante todo el mantenimiento. Nunca contengas la respiración durante los estiramientos.",
	plyometrics:
		"Respiración: exhala de forma explosiva en el salto o esfuerzo. Inhala durante la fase de carga.",
	cardio:
		"Respira rítmicamente — inhala por la nariz y exhala por la boca, siguiendo tu ritmo.",
};

// ─────────────────────────────────────────────────────────────
// 9. ASSEMBLER — builds the final instruction array
// ─────────────────────────────────────────────────────────────

/**
 * @param {"en"|"es"} lang
 * @param {{ slug: string, name: string, muscle: string, equipment: string, category: string }} exercise
 * @returns {string[]} 4-6 instruction steps
 */
function generateInstructions(lang, { slug, name, muscle, equipment, category }) {
	const modifiers = detectModifiers(slug);

	// Step 1: Equipment setup
	const setupMap = lang === "es" ? EQUIP_SETUP_ES : EQUIP_SETUP_EN;
	const setup = setupMap[equipment] || setupMap.other;

	// Optional posture insert
	const postureCue =
		lang === "es" ? getPostureCueEs(modifiers) : getPostureCueEn(modifiers);

	// Optional grip insert
	const gripCue =
		lang === "es" ? getGripCueEs(modifiers) : getGripCueEn(modifiers);

	// Optional laterality insert
	const lateralityCue =
		lang === "es"
			? getLateralityCueEs(modifiers)
			: getLateralityCueEn(modifiers);

	// Core execution steps — match pattern
	let coreSteps = null;
	for (const pattern of PATTERNS) {
		if (pattern.test.test(slug)) {
			coreSteps = lang === "es" ? pattern.es : pattern.en;
			break;
		}
	}

	// Fallback for exercises that don't match any pattern
	if (!coreSteps) {
		coreSteps = buildFallbackSteps(lang, muscle, category);
	}

	// Adapt core steps to the actual equipment (replaces "bar" references)
	coreSteps = adaptStepsToEquipment(coreSteps, equipment, lang);

	// Adapt core steps to unilateral context (plural → singular body parts)
	coreSteps = adaptStepsToLaterality(coreSteps, modifiers, lang);

	// Breathing cue (final step)
	const breathingMap = lang === "es" ? BREATHING_ES : BREATHING_EN;
	const breathing = breathingMap[category] || breathingMap.strength;

	// Assemble — we insert optional cues only when they add value
	const steps = [setup];
	if (postureCue) steps.push(postureCue);
	if (gripCue) steps.push(gripCue);
	steps.push(...coreSteps);
	if (lateralityCue) steps.push(lateralityCue);
	steps.push(breathing);

	return steps;
}

// ─────────────────────────────────────────────────────────────
// 10. FALLBACK — when no pattern matches
// ─────────────────────────────────────────────────────────────

const MUSCLE_NAME_EN = {
	abductors: "the abductors",
	abs: "the core",
	adductors: "the adductors",
	biceps: "the biceps",
	calves: "the calves",
	cardio: "the cardiovascular system",
	delts: "the shoulders",
	forearms: "the forearms",
	glutes: "the glutes",
	hamstrings: "the hamstrings",
	lats: "the lats",
	"levator-scapulae": "the levator scapulae",
	pectorals: "the chest",
	quads: "the quadriceps",
	"serratus-anterior": "the serratus anterior",
	spine: "the lower back",
	traps: "the traps",
	triceps: "the triceps",
	"upper-back": "the upper back",
};

const MUSCLE_NAME_ES = {
	abductors: "los abductores",
	abs: "el core",
	adductors: "los aductores",
	biceps: "los bíceps",
	calves: "los gemelos",
	cardio: "el sistema cardiovascular",
	delts: "los hombros",
	forearms: "los antebrazos",
	glutes: "los glúteos",
	hamstrings: "los isquiotibiales",
	lats: "los dorsales",
	"levator-scapulae": "el elevador de la escápula",
	pectorals: "el pectoral",
	quads: "los cuádriceps",
	"serratus-anterior": "el serrato anterior",
	spine: "la zona lumbar",
	traps: "los trapecios",
	triceps: "los tríceps",
	"upper-back": "la espalda alta",
};

function buildFallbackSteps(lang, muscle, category) {
	if (lang === "es") {
		const muscleName = MUSCLE_NAME_ES[muscle] || muscle;
		if (category === "stretching") {
			return [
				`Lleva el cuerpo lentamente a la posición de estiramiento de ${muscleName}.`,
				"Mantén entre 20 y 40 segundos respirando de forma profunda, relajándote más en cada exhalación.",
				"Vuelve a la posición inicial lentamente y repite si lo deseas.",
			];
		}
		if (category === "cardio") {
			return [
				"Mantén un ritmo constante adaptado a tu nivel de forma física.",
				"Activa el core y mantén una postura erguida durante todo el ejercicio.",
				"Continúa el tiempo o las repeticiones planificadas manteniendo una técnica limpia.",
			];
		}
		if (category === "plyometrics") {
			return [
				"Realiza una breve flexión para acumular tensión en las piernas.",
				"Ejecuta el movimiento de forma explosiva con máxima intención.",
				"Aterriza suave amortiguando con las piernas y el core. Encadena la siguiente repetición cuando estés estable.",
			];
		}
		return [
			`Activa ${muscleName} antes de iniciar el movimiento. Siente la conexión mente-músculo.`,
			"Realiza el movimiento con control total, dominando tanto la fase concéntrica como la excéntrica.",
			"Vuelve a la posición inicial controlando la bajada — la fase excéntrica construye tanto músculo como la subida.",
		];
	}
	// EN fallback
	const muscleName = MUSCLE_NAME_EN[muscle] || muscle;
	if (category === "stretching") {
		return [
			`Move slowly into the ${muscleName} stretch position.`,
			"Hold for 20 to 40 seconds breathing deeply, relaxing a little more with each exhale.",
			"Return slowly to the starting position and repeat if desired.",
		];
	}
	if (category === "cardio") {
		return [
			"Keep a steady pace adapted to your fitness level.",
			"Engage your core and maintain an upright posture throughout.",
			"Continue for the planned time or repetitions with clean technique.",
		];
	}
	if (category === "plyometrics") {
		return [
			"Perform a brief dip to load tension in your legs.",
			"Execute the movement explosively with maximum intent.",
			"Land softly absorbing with your legs and core. Chain the next rep once you are stable.",
		];
	}
	return [
		`Engage ${muscleName} before initiating the movement. Feel the mind-muscle connection.`,
		"Perform the movement with total control, owning both the concentric and eccentric phases.",
		"Return to the starting position controlling the descent — the eccentric phase builds as much muscle as the way up.",
	];
}

// ─────────────────────────────────────────────────────────────
// 11. MULTILINGUAL SUPPORT (DE, FR, ZH, PT, JA)
// ─────────────────────────────────────────────────────────────

const {
	EQUIP_SETUP: EQUIP_SETUP_MULTI,
	POSTURE_CUES,
	GRIP_CUES,
	LATERALITY_CUES,
	BREATHING: BREATHING_MULTI,
	MUSCLE_NAMES: MUSCLE_NAMES_MULTI,
	EQUIP_ADAPT,
	LATERALITY_ADAPT,
	buildFallbackStepsMulti,
} = require("./i18n/instructions-data");

const LOCALIZED_PATTERNS = {
	de: require("./i18n/patterns-de"),
	fr: require("./i18n/patterns-fr"),
	zh: require("./i18n/patterns-zh"),
	pt: require("./i18n/patterns-pt"),
	ja: require("./i18n/patterns-ja"),
};

/**
 * Generate instructions for DE, FR, ZH, PT, JA.
 * Falls back to English pattern steps with localized wrapper cues.
 */
function generateInstructionsMulti(lang, { slug, name, muscle, equipment, category }) {
	const modifiers = detectModifiers(slug);

	// Step 1: Equipment setup
	const setupMap = EQUIP_SETUP_MULTI[lang];
	const setup = (setupMap && setupMap[equipment]) || (setupMap && setupMap.other) ||
		EQUIP_SETUP_EN[equipment] || EQUIP_SETUP_EN.other;

	// Posture cue
	let postureCue = null;
	const postureLang = POSTURE_CUES[lang];
	if (postureLang) {
		if (modifiers.isSeated) postureCue = postureLang.seated;
		else if (modifiers.isKneeling) postureCue = postureLang.kneeling;
		else if (modifiers.isIncline) postureCue = postureLang.incline;
		else if (modifiers.isDecline) postureCue = postureLang.decline;
		else if (modifiers.isLying) postureCue = postureLang.lying;
	}

	// Grip cue
	let gripCue = null;
	const gripLang = GRIP_CUES[lang];
	if (gripLang) {
		if (modifiers.isCloseGrip) gripCue = gripLang.close;
		else if (modifiers.isWideGrip) gripCue = gripLang.wide;
		else if (modifiers.isReverseGrip) gripCue = gripLang.reverse;
		else if (modifiers.isNeutralGrip) gripCue = gripLang.neutral;
	}

	// Laterality cue
	let lateralityCue = null;
	const lateralityLang = LATERALITY_CUES[lang];
	if (lateralityLang) {
		if (modifiers.isOneArm || modifiers.isOneLeg) lateralityCue = lateralityLang.unilateral;
		else if (modifiers.isAlternate) lateralityCue = lateralityLang.alternating;
	}

	// Core steps - use localized pattern file when available, fall back to English
	let coreSteps = null;
	const langPatterns = LOCALIZED_PATTERNS[lang];
	for (const pattern of PATTERNS) {
		if (pattern.test.test(slug)) {
			if (langPatterns && langPatterns[pattern.id]) {
				coreSteps = langPatterns[pattern.id];
			} else {
				coreSteps = pattern.en;
			}
			break;
		}
	}

	if (!coreSteps) {
		coreSteps = buildFallbackStepsMulti(lang, muscle, category);
		if (!coreSteps) {
			coreSteps = buildFallbackSteps("en", muscle, category);
		}
	}

	// Adapt equipment references for DE/FR
	if (EQUIP_ADAPT[lang]) {
		const adaptRules = EQUIP_ADAPT[lang][equipment];
		if (adaptRules) {
			coreSteps = coreSteps.map((step) =>
				adaptRules.reduce((text, [regex, replacement]) => text.replace(regex, replacement), step),
			);
		}
	}

	// Adapt core steps to unilateral context (plural → singular body parts)
	if (modifiers.isOneArm || modifiers.isOneLeg || modifiers.isAlternate) {
		const langAdapt = LATERALITY_ADAPT[lang];
		if (langAdapt) {
			let replacements = [];
			if (modifiers.isOneArm || modifiers.isAlternate) replacements = replacements.concat(langAdapt.oneArm || []);
			if (modifiers.isOneLeg) replacements = replacements.concat(langAdapt.oneLeg || []);
			if (replacements.length > 0) {
				coreSteps = coreSteps.map((step) =>
					replacements.reduce((text, [regex, replacement]) => text.replace(regex, replacement), step),
				);
			}
		} else {
			// Fallback: if steps are in English (no localized patterns found), apply EN rules
			coreSteps = adaptStepsToLaterality(coreSteps, modifiers, "en");
		}
	}

	// Breathing cue
	const breathingMap = BREATHING_MULTI[lang];
	const breathing = (breathingMap && breathingMap[category]) ||
		(breathingMap && breathingMap.strength) ||
		BREATHING_EN[category] || BREATHING_EN.strength;

	// Assemble
	const steps = [setup];
	if (postureCue) steps.push(postureCue);
	if (gripCue) steps.push(gripCue);
	steps.push(...coreSteps);
	if (lateralityCue) steps.push(lateralityCue);
	steps.push(breathing);

	return steps;
}

// ─────────────────────────────────────────────────────────────
// 12. PUBLIC API
// ─────────────────────────────────────────────────────────────

/** @param {{ slug: string, name: string, muscle: string, equipment: string, category: string }} params */
function generateInstructionsEn(params) {
	return generateInstructions("en", params);
}

/** @param {{ slug: string, name: string, muscle: string, equipment: string, category: string }} params */
function generateInstructionsEs(params) {
	return generateInstructions("es", params);
}

/**
 * Generic multilingual instruction generator.
 * @param {string} lang - Language code (en, es, de, fr, zh, pt, ja)
 * @param {{ slug: string, name: string, muscle: string, equipment: string, category: string }} params
 * @returns {string[]}
 */
function generateInstructionsForLang(lang, params) {
	if (lang === "en") return generateInstructions("en", params);
	if (lang === "es") return generateInstructions("es", params);
	return generateInstructionsMulti(lang, params);
}

module.exports = {
	generateInstructionsEn,
	generateInstructionsEs,
	generateInstructionsForLang,
};
