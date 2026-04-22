/**
 * Traducción estructurada de slugs a español.
 *
 * El nombre se compone con este orden, separando cada bloque por coma:
 *   [variante] MOVIMIENTO [con/en EQUIPAMIENTO] , POSTURA , AGARRE , MODIFICADORES
 *
 * Ejemplos:
 *   barbell-curl                                  -> Curl con barra
 *   barbell-standing-close-grip-curl              -> Curl con barra, de pie, con agarre cerrado
 *   cable-decline-seated-wide-grip-row            -> Remo en polea, sentado declinado, con agarre ancho
 *   dumbbell-alternate-hammer-preacher-curl       -> Curl martillo predicador con mancuerna, alternado
 *   smith-close-grip-bench-press                  -> Press de banca en máquina Smith, con agarre cerrado
 *
 * Si una palabra no se reconoce, se conserva tal cual al final del bloque que toque.
 */

// ---------------------------------------------------------------------------
// Diccionarios por categoría
// ---------------------------------------------------------------------------

// Movimiento principal (núcleo del nombre).
// Se busca en este orden y solo se elige UNO (el primero que aparezca).
const MOVEMENTS = [
	["bench-press", "Press de banca"],
	["shoulder-press", "Press de hombros"],
	["military-press", "Press militar"],
	["overhead-press", "Press sobre la cabeza"],
	["chest-press", "Press de pecho"],
	["leg-press", "Prensa de piernas"],
	["floor-press", "Press en el suelo"],
	["push-press", "Push press"],
	["push-ups", "Flexiones"],
	["push-up", "Flexión"],
	["pull-ups", "Dominadas"],
	["pull-up", "Dominada"],
	["chin-ups", "Dominadas supinas"],
	["chin-up", "Dominada supina"],
	["sit-ups", "Abdominales"],
	["sit-up", "Abdominal"],
	["v-ups", "V-ups"],
	["v-up", "V-up"],
	["leg-raises", "Elevaciones de piernas"],
	["leg-raise", "Elevación de piernas"],
	["leg-curls", "Curl femoral"],
	["leg-curl", "Curl femoral"],
	["leg-extensions", "Extensiones de cuádriceps"],
	["leg-extension", "Extensión de cuádriceps"],
	["calf-raises", "Elevaciones de talones"],
	["calf-raise", "Elevación de talones"],
	["hip-thrusts", "Hip thrust"],
	["hip-thrust", "Hip thrust"],
	["good-mornings", "Good mornings"],
	["good-morning", "Good morning"],
	["front-raises", "Elevaciones frontales"],
	["front-raise", "Elevación frontal"],
	["lateral-raises", "Elevaciones laterales"],
	["lateral-raise", "Elevación lateral"],
	["rear-delt-fly", "Pájaros (deltoides posterior)"],
	["rear-delt-flye", "Pájaros (deltoides posterior)"],
	["rear-delt-raise", "Elevación posterior de deltoides"],
	["upright-rows", "Remo al mentón"],
	["upright-row", "Remo al mentón"],
	["bent-over-rows", "Remo inclinado"],
	["bent-over-row", "Remo inclinado"],
	["t-bar-row", "Remo en T"],
	["seal-rows", "Remo seal"],
	["seal-row", "Remo seal"],
	["pendlay-rows", "Remo Pendlay"],
	["pendlay-row", "Remo Pendlay"],
	["face-pulls", "Face pull"],
	["face-pull", "Face pull"],
	["facepulls", "Face pull"],
	["facepull", "Face pull"],
	["romanian-deadlift", "Peso muerto rumano"],
	["stiff-leg-deadlift", "Peso muerto a piernas rígidas"],
	["stiff-legged-deadlift", "Peso muerto a piernas rígidas"],
	["sumo-deadlift", "Peso muerto sumo"],
	["deadlift", "Peso muerto"],
	["clean-and-jerk", "Cargada y envión"],
	["snatch", "Arrancada"],
	["clean", "Cargada"],
	["jerk", "Envión"],
	["skull-crushers", "Rompecráneos"],
	["skull-crusher", "Rompecráneos"],
	["jumping-jacks", "Jumping jacks"],
	["jumping-jack", "Jumping jack"],
	["mountain-climbers", "Escaladores"],
	["mountain-climber", "Escalador"],
	["burpees", "Burpees"],
	["burpee", "Burpee"],
	["box-jumps", "Saltos al cajón"],
	["box-jump", "Salto al cajón"],
	["jump-rope", "Comba"],
	["jump-squats", "Sentadillas con salto"],
	["jump-squat", "Sentadilla con salto"],
	["jump-lunges", "Zancadas con salto"],
	["jump-lunge", "Zancada con salto"],
	["butt-kicks", "Talones al glúteo"],
	["high-knees", "Rodillas altas"],
	["russian-twists", "Russian twists"],
	["russian-twist", "Russian twist"],
	["bicycle-crunches", "Bicicleta abdominal"],
	["bicycle-crunch", "Bicicleta abdominal"],
	["reverse-crunches", "Crunches invertidos"],
	["reverse-crunch", "Crunch invertido"],
	["hanging-leg-raises", "Elevaciones de piernas en barra"],
	["hanging-leg-raise", "Elevación de piernas en barra"],
	["goblet-squat", "Sentadilla goblet"],
	["front-squat", "Sentadilla frontal"],
	["back-squat", "Sentadilla trasera"],
	["bulgarian-split-squat", "Sentadilla búlgara"],
	["split-squat", "Split squat"],
	["sumo-squat", "Sentadilla sumo"],
	["wall-sit", "Sentadilla isométrica en pared"],
	["squats", "Sentadillas"],
	["squat", "Sentadilla"],
	["lunges", "Zancadas"],
	["lunge", "Zancada"],
	["step-ups", "Step-ups"],
	["step-up", "Step-up"],
	["pulldowns", "Jalones"],
	["pulldown", "Jalón"],
	["pull-down", "Jalón"],
	["pullovers", "Pullover"],
	["pullover", "Pullover"],
	["pushdown", "Pushdown"],
	["pushdowns", "Pushdowns"],
	["kickbacks", "Patadas de tríceps"],
	["kickback", "Patada de tríceps"],
	["shrugs", "Encogimientos"],
	["shrug", "Encogimiento"],
	["dips", "Fondos"],
	["dip", "Fondo"],
	["planks", "Planchas"],
	["plank", "Plancha"],
	["bridges", "Puentes"],
	["bridge", "Puente"],
	["clamshells", "Almejas"],
	["clamshell", "Almeja"],
	["swings", "Swings"],
	["swing", "Swing"],
	["thrusters", "Thrusters"],
	["thruster", "Thruster"],
	["wrist-curls", "Curl de muñeca"],
	["wrist-curl", "Curl de muñeca"],
	["finger-curls", "Curl de dedos"],
	["finger-curl", "Curl de dedos"],
	["biceps-curl", "Curl de bíceps"],
	["bicep-curl", "Curl de bíceps"],
	["curls", "Curl"],
	["curl", "Curl"],
	["rows", "Remo"],
	["row", "Remo"],
	["press", "Press"],
	["raises", "Elevaciones"],
	["raise", "Elevación"],
	["extensions", "Extensiones"],
	["extension", "Extensión"],
	["fly", "Apertura"],
	["flye", "Apertura"],
	["flies", "Aperturas"],
	["flyes", "Aperturas"],
	["twists", "Giros"],
	["twist", "Giro"],
	["crunches", "Crunches"],
	["crunch", "Crunch"],
	["holds", "Isométricos"],
	["hold", "Isométrico"],
	["stretches", "Estiramientos"],
	["stretch", "Estiramiento"],
	["jumps", "Saltos"],
	["jump", "Salto"],
];

// Variantes del movimiento (van después del verbo: "Curl martillo")
const VARIANTS = {
	hammer: "martillo",
	preacher: "predicador",
	concentration: "concentrado",
	spider: "spider",
	drag: "drag",
	reverse: "invertido",
	zottman: "Zottman",
	incline: "inclinado",
	decline: "declinado",
	flat: "plano",
	"cross-body": "cruzado al cuerpo",
	"cross-bench": "cruzado en banco",
	prone: "tumbado boca abajo",
	supine: "tumbado boca arriba",
	overhead: "sobre la cabeza",
	scott: "Scott",
	arnold: "Arnold",
	bradford: "Bradford",
};

// Equipamiento (va al final del primer bloque: "Curl con barra")
const EQUIPMENT = {
	barbell: "con barra",
	dumbbell: "con mancuerna",
	dumbbells: "con mancuernas",
	cable: "en polea",
	cables: "en poleas",
	machine: "en máquina",
	smith: "en máquina Smith",
	"ez-bar": "con barra Z",
	"ez-barbell": "con barra Z",
	"olympic-barbell": "con barra olímpica",
	kettlebell: "con kettlebell",
	kettlebells: "con kettlebells",
	lever: "en máquina",
	bodyweight: "con peso corporal",
	band: "con banda",
	bands: "con bandas",
	"resistance-band": "con banda elástica",
	"trap-bar": "con barra hexagonal",
	rope: "con cuerda",
	"v-bar": "con barra en V",
	"straight-bar": "con barra recta",
	"medicine-ball": "con balón medicinal",
	"exercise-ball": "en fitball",
	"stability-ball": "en fitball",
	"swiss-ball": "en fitball",
	"bosu-ball": "en bosu",
	"foam-roller": "con foam roller",
	towel: "con toalla",
};

// Postura (segundo bloque: ", de pie")
const POSTURE = {
	standing: "de pie",
	seated: "sentado",
	sitting: "sentado",
	lying: "tumbado",
	kneeling: "de rodillas",
	squatting: "en cuclillas",
	"half-kneeling": "en media rodilla",
	prone: "boca abajo",
	supine: "boca arriba",
	incline: "inclinado",
	decline: "declinado",
	flat: "plano",
};

// Agarre (tercer bloque: ", con agarre cerrado")
const GRIPS = {
	"close-grip": "con agarre cerrado",
	"wide-grip": "con agarre ancho",
	"narrow-grip": "con agarre estrecho",
	"medium-grip": "con agarre medio",
	"reverse-grip": "con agarre invertido",
	"neutral-grip": "con agarre neutro",
	"hammer-grip": "con agarre martillo",
	"underhand-grip": "con agarre supino",
	"overhand-grip": "con agarre prono",
	"supinated-grip": "con agarre supino",
	"pronated-grip": "con agarre prono",
	"mixed-grip": "con agarre mixto",
	"inner-grip": "con agarre interno",
	"outer-grip": "con agarre externo",
	"neutral-wrist": "con muñeca neutra",
};

// Modificadores (último bloque: ", a una mano")
const MODIFIERS = {
	"one-arm": "a una mano",
	"two-arm": "a dos manos",
	"single-arm": "a una mano",
	"single-leg": "a una pierna",
	"one-leg": "a una pierna",
	"both-arms": "a dos manos",
	alternating: "alternado",
	alternate: "alternado",
	"front-to-back": "adelante y atrás",
	"side-to-side": "lado a lado",
	bilateral: "bilateral",
	unilateral: "unilateral",
	wide: "ancho",
	narrow: "estrecho",
	close: "cerrado",
	high: "alto",
	low: "bajo",
	front: "frontal",
	rear: "posterior",
	side: "lateral",
	inner: "interno",
	outer: "externo",
	"with-arm-blaster": "con arm blaster",
	"arm-blaster": "con arm blaster",
	"with-stork-stance": "en postura de cigüeña",
	"stork-stance": "en postura de cigüeña",
	"with-leg-raised": "con pierna elevada",
	"leg-raised": "con pierna elevada",
	"on-exercise-ball": "en fitball",
	"on-stability-ball": "en fitball",
	"on-bosu-ball": "en bosu",
	"over-bench": "sobre banco",
	"over-exercise-ball": "sobre fitball",
	"over-incline-bench": "sobre banco inclinado",
	"with-rope": "con cuerda",
	"with-towel": "con toalla",
	"with-bowling-motion": "con movimiento de bolos",
	"with-bicep-curl": "con curl de bíceps",
	"with-press": "con press",
	"to-shoulder-press": "y press de hombros",
	"and-press": "y press",
	"to-press": "y press",
	"v-2": "v2",
	"v-3": "v3",
};

// ---------------------------------------------------------------------------
// Tokenizador con frases multi-palabra
// ---------------------------------------------------------------------------

// Listas de keys multi-palabra ordenadas por longitud descendente para hacer
// matching codicioso correctamente.
function buildPhrases(...maps) {
	const phrases = new Set();
	for (const m of maps) {
		const keys = Array.isArray(m) ? m.map((p) => p[0]) : Object.keys(m);
		for (const k of keys) {
			if (k.includes("-")) phrases.add(k);
		}
	}
	return [...phrases].sort((a, b) => b.length - a.length);
}

const ALL_PHRASES = buildPhrases(
	MOVEMENTS,
	VARIANTS,
	EQUIPMENT,
	POSTURE,
	GRIPS,
	MODIFIERS
);

function findInList(list, key) {
	if (Array.isArray(list)) {
		for (const [k, v] of list) {
			if (k === key) return v;
		}
		return undefined;
	}
	return list[key];
}

/**
 * Convierte el slug en una lista de tokens, respetando frases multi-palabra
 * conocidas (como "bench-press" o "close-grip").
 */
function tokenize(slug) {
	const parts = slug.toLowerCase().split("-");
	const tokens = [];
	let i = 0;
	while (i < parts.length) {
		// Intenta encajar la frase más larga posible que empiece en parts[i].
		let matched = null;
		for (const phrase of ALL_PHRASES) {
			const ph = phrase.split("-");
			if (ph.length > parts.length - i) continue;
			let ok = true;
			for (let j = 0; j < ph.length; j++) {
				if (parts[i + j] !== ph[j]) {
					ok = false;
					break;
				}
			}
			if (ok) {
				matched = phrase;
				break;
			}
		}
		if (matched) {
			tokens.push(matched);
			i += matched.split("-").length;
		} else {
			tokens.push(parts[i]);
			i += 1;
		}
	}
	return tokens;
}

// ---------------------------------------------------------------------------
// Composición del nombre
// ---------------------------------------------------------------------------

// Palabras "ruido" que ignoramos por completo (conectores, números de variante,
// términos sin valor traducido).
const STOP_WORDS = new Set([
	"a",
	"an",
	"the",
	"of",
	"on",
	"in",
	"with",
	"for",
	"and",
	"to",
	"from",
	"v",
	"the",
	"position",
	"motion",
	"stance",
	"grip",
	"version",
]);

// Diccionario adicional de palabras sueltas (anatomía, términos comunes).
// Se aplica al final sobre los leftover.
const EXTRA_WORDS = {
	biceps: "bíceps",
	bicep: "bíceps",
	triceps: "tríceps",
	tricep: "tríceps",
	forearm: "antebrazo",
	forearms: "antebrazos",
	chest: "pecho",
	back: "espalda",
	shoulder: "hombro",
	shoulders: "hombros",
	abs: "abdominal",
	core: "core",
	glute: "glúteo",
	glutes: "glúteos",
	hamstring: "isquiotibial",
	hamstrings: "isquiotibiales",
	quad: "cuádriceps",
	quads: "cuádriceps",
	calf: "gemelo",
	calves: "gemelos",
	delt: "deltoides",
	delts: "deltoides",
	lat: "dorsal",
	lats: "dorsales",
	trap: "trapecio",
	traps: "trapecios",
	pec: "pectoral",
	pecs: "pectorales",
	pectoral: "pectoral",
	pectorals: "pectorales",
	abductor: "abductor",
	abductors: "abductores",
	adductor: "aductor",
	adductors: "aductores",
	spine: "columna",
	oblique: "oblicuo",
	obliques: "oblicuos",
	leg: "pierna",
	legs: "piernas",
	arm: "brazo",
	arms: "brazos",
	hip: "cadera",
	hips: "caderas",
	knee: "rodilla",
	knees: "rodillas",
	wrist: "muñeca",
	wrists: "muñecas",
	finger: "dedos",
	fingers: "dedos",
	ankle: "tobillo",
	bowler: "de bolos",
	bowling: "de bolos",
	power: "potencia",
	point: "punto",
	jack: "jack",
	jacks: "jacks",
	straight: "recto",
	bent: "doblado",
	raised: "elevada",
	stork: "cigüeña",
	balance: "equilibrio",
	bottom: "fondo",
	bottoms: "fondo",
	hang: "colgado",
	double: "doble",
	single: "individual",
	half: "medio",
	full: "completo",
	walking: "caminando",
	walk: "caminar",
	running: "corriendo",
	run: "correr",
	jogging: "trotando",
	cycling: "ciclismo",
	rowing: "remo",
	elliptical: "elíptica",
	treadmill: "cinta",
	stair: "escalera",
	stairs: "escaleras",
	climber: "escalador",
	climbers: "escaladores",
	outside: "externo",
	inside: "interno",
	side: "lateral",
	front: "frontal",
	rear: "posterior",
	upper: "superior",
	lower: "inferior",
	floor: "suelo",
	wall: "pared",
	bench: "banco",
	box: "cajón",
	bar: "barra",
	pin: "pin",
	platform: "plataforma",
	chair: "silla",
	step: "step",
	bridge: "puente",
	"to-the": "a la",
	rope: "cuerda",
	towel: "toalla",
	"v-bar": "barra V",
	"straight-bar": "barra recta",
};

function joinDedup(parts) {
	const seen = new Set();
	const out = [];
	for (const p of parts) {
		if (!p) continue;
		if (seen.has(p)) continue;
		seen.add(p);
		out.push(p);
	}
	return out.join(" ");
}

function translateSlug(slug) {
	const tokens = tokenize(slug);

	const used = new Array(tokens.length).fill(false);

	// 1) Movimiento principal (el primero que aparezca, en el orden de la lista).
	let movement = null;
	let movementIdx = -1;
	for (const [key, value] of MOVEMENTS) {
		const idx = tokens.indexOf(key);
		if (idx !== -1) {
			movement = value;
			movementIdx = idx;
			used[idx] = true;
			break;
		}
	}

	// 2) Variantes (van con el movimiento)
	const variants = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (VARIANTS[tok]) {
			variants.push(VARIANTS[tok]);
			used[i] = true;
		}
	});

	// 3) Equipamiento
	const equipment = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (EQUIPMENT[tok]) {
			equipment.push(EQUIPMENT[tok]);
			used[i] = true;
		}
	});

	// 4) Posturas
	const postures = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (POSTURE[tok]) {
			postures.push(POSTURE[tok]);
			used[i] = true;
		}
	});

	// 5) Agarres
	const grips = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (GRIPS[tok]) {
			grips.push(GRIPS[tok]);
			used[i] = true;
		}
	});

	// 6) Modificadores
	const modifiers = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (MODIFIERS[tok]) {
			modifiers.push(MODIFIERS[tok]);
			used[i] = true;
		}
	});

	// 7) Resto: palabras desconocidas. Las traducimos con el diccionario extra
	// si podemos, y las añadimos como bloque final.
	const leftover = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (STOP_WORDS.has(tok)) return;
		leftover.push(EXTRA_WORDS[tok] || tok);
	});

	// Construir el bloque principal: movimiento + variantes + equipamiento
	const mainParts = [];
	if (movement) {
		mainParts.push(movement);
	}
	if (variants.length) mainParts.push(...variants);
	if (equipment.length) mainParts.push(...equipment);

	const mainBlock = joinDedup(mainParts);

	// Bloques secundarios (cada uno con su coma).
	const secondaryBlocks = [];
	if (postures.length) secondaryBlocks.push(joinDedup(postures));
	if (grips.length) secondaryBlocks.push(joinDedup(grips));
	if (modifiers.length) secondaryBlocks.push(joinDedup(modifiers));
	if (leftover.length) secondaryBlocks.push(leftover.join(" "));

	let result = mainBlock || (leftover.length ? leftover.join(" ") : slug);
	if (secondaryBlocks.length) {
		result += ", " + secondaryBlocks.join(", ");
	}

	// Capitalizar primera letra
	result = result.replace(/\s+/g, " ").trim();
	if (result.length) result = result[0].toUpperCase() + result.slice(1);
	return result;
}

// ---------------------------------------------------------------------------
// Inferencia de músculos secundarios
// ---------------------------------------------------------------------------

const SECONDARY_RULES = [
	{
		when: (m, slug) => m === "biceps" && /curl/.test(slug),
		add: ["forearms"],
	},
	{
		when: (m, slug) => /press|push-up|push-ups/.test(slug),
		add: ["triceps", "delts"],
	},
	{
		when: (m, slug) => /\bdips?\b/.test(slug),
		add: ["triceps", "delts", "pectorals"],
	},
	{
		when: (m, slug) => /squat/.test(slug),
		add: ["glutes", "hamstrings", "calves"],
	},
	{
		when: (m, slug) => /deadlift/.test(slug),
		add: ["glutes", "hamstrings", "lats", "traps", "forearms", "spine"],
	},
	{
		when: (m, slug) => /hip-thrust|bridge/.test(slug),
		add: ["hamstrings", "abs"],
	},
	{
		when: (m, slug) =>
			/\brow|pulldown|pull-down|pull-up|chin-up\b/.test(slug),
		add: ["biceps", "forearms", "delts"],
	},
	{
		when: (m, slug) => /lunge/.test(slug),
		add: ["glutes", "hamstrings", "calves"],
	},
	{
		when: (m, slug) => /clean|snatch|swing|jerk/.test(slug),
		add: ["glutes", "hamstrings", "spine", "traps", "delts", "forearms"],
	},
	{
		when: (m, slug) => /raise/.test(slug) && m === "delts",
		add: ["traps"],
	},
	{
		when: (m, slug) => /plank/.test(slug),
		add: ["abs", "delts", "glutes"],
	},
	{
		when: (m, slug) => /burpee/.test(slug),
		add: ["pectorals", "triceps", "quads", "glutes", "abs"],
	},
];

function inferSecondary(muscle, slug) {
	const set = new Set();
	for (const rule of SECONDARY_RULES) {
		if (rule.when(muscle, slug)) {
			for (const m of rule.add) {
				if (m !== muscle) set.add(m);
			}
		}
	}
	return [...set];
}

// ---------------------------------------------------------------------------
// Plantillas de instrucciones (genéricas)
// ---------------------------------------------------------------------------

const EQUIP_SETUP = {
	barbell: "Carga el peso adecuado en la barra y adopta la postura inicial.",
	dumbbell: "Coge una mancuerna en cada mano (o la indicada) con un peso adecuado.",
	cable: "Ajusta la polea a la altura indicada y selecciona el peso.",
	machine: "Ajusta la máquina a tu medida y selecciona la carga.",
	lever: "Ajusta la máquina a tu medida y selecciona la carga.",
	smith: "Coloca la barra en la máquina Smith a la altura adecuada.",
	"ez-bar": "Carga la barra Z con un peso adecuado y agárrala con firmeza.",
	kettlebell: "Coge la kettlebell con un peso adecuado y adopta la postura.",
	band: "Fija la banda elástica y mantén la tensión inicial.",
	bodyweight: "Adopta la postura inicial con buena alineación corporal.",
	other: "Prepara el equipo y adopta la postura inicial.",
};

const CATEGORY_FOCUS = {
	strength: "Realiza el movimiento de forma controlada manteniendo la técnica.",
	stretching: "Mantén la posición sintiendo el estiramiento sin rebotes.",
	plyometrics: "Ejecuta el movimiento de forma explosiva y aterriza con control.",
	cardio: "Mantén un ritmo constante adaptado a tu nivel.",
};

function generateInstructions({ name, muscle, equipment, category }) {
	const setup = EQUIP_SETUP[equipment] || EQUIP_SETUP.other;
	const focus = CATEGORY_FOCUS[category] || CATEGORY_FOCUS.strength;

	if (category === "stretching") {
		return [
			setup,
			`Lleva el cuerpo a la posición de estiramiento del ${muscle}.`,
			"Mantén entre 20 y 40 segundos respirando de forma profunda.",
			"Vuelve a la posición inicial lentamente y repite si lo deseas.",
		];
	}
	if (category === "cardio") {
		return [
			setup,
			focus,
			"Activa el core y mantén una postura erguida durante todo el ejercicio.",
			"Continúa el tiempo o las repeticiones planificadas.",
		];
	}
	if (category === "plyometrics") {
		return [
			setup,
			"Realiza una breve flexión para acumular tensión.",
			focus,
			"Aterriza suave amortiguando con piernas y core, y encadena la siguiente repetición.",
		];
	}
	return [
		setup,
		`Activa el ${muscle} antes de iniciar el movimiento.`,
		focus,
		"Vuelve a la posición inicial controlando la fase excéntrica.",
		"Mantén la respiración: exhala en el esfuerzo, inhala al volver.",
	];
}

module.exports = {
	translateSlug,
	inferSecondary,
	generateInstructions,
};
