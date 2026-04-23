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
	["side-bridge-hip-abduction", "Abducción de cadera en puente lateral"],
	["side-plank-hip-abduction", "Abducción de cadera en plancha lateral"],
	["side-plank-hip-adduction", "Aducción de cadera en plancha lateral"],
	["elbow-to-knee", "Codo a la rodilla"],
	["side-bridge", "Puente lateral"],
	["side-plank", "Plancha lateral"],
	["side-to-side-toe-touch", "Toques de punta lado a lado"],
	["captains-chair-leg-raise", "Elevación de piernas en silla del capitán"],
	["captains-chair-knee-raise", "Elevación de rodillas en silla del capitán"],
	["captains-chair-straight-leg-raise", "Elevación de piernas rectas en silla del capitán"],
	["flexion-leg-sit-up", "Abdominal con piernas flexionadas"],
	["hip-raise-bent-knee", "Elevación de cadera con rodillas flexionadas"],
	["hip-raise", "Elevación de cadera"],
	["arm-slingers", "Arm slingers"],
	["plyo-push-up", "Flexión pliométrica"],
	["clap-push-up", "Flexión con palmada"],
	["diamond-push-up", "Flexión diamante"],
	["archer-push-up", "Flexión del arquero"],
	["shoulder-tap-push-up", "Flexión con toque de hombro"],
	["superman-push-up", "Flexión superman"],
	["hindu-push-up", "Flexión hindú"],
	["modified-hindu-push-up", "Flexión hindú modificada"],
	["single-arm-push-up", "Flexión a una mano"],
	["two-arm-push-up", "Flexión a dos manos"],
	["wide-hand-push-up", "Flexión con manos abiertas"],
	["narrow-push-up", "Flexión cerrada"],
	["close-grip-push-up", "Flexión con agarre cerrado"],
	["incline-push-up", "Flexión inclinada"],
	["decline-push-up", "Flexión declinada"],
	["weighted-push-up", "Flexión con peso"],
	["side-push-up", "Flexión lateral"],
	// Abdominales / sit-ups con prefijo
	["push-sit-up", "Abdominal con empuje"],
	["press-sit-up", "Abdominal con press"],
	["jack-knife-sit-up", "Abdominal navaja"],
	["jackknife-sit-up", "Abdominal navaja"],
	// Pull-in
	["leg-pull-in", "Pull-in de piernas"],
	// V-2 / V-3 como variantes (omitidas por stopword)
	// Abducciones / aducciones
	["hip-abduction", "Abducción de cadera"],
	["hip-adduction", "Aducción de cadera"],
	["leg-abduction", "Abducción de pierna"],
	["leg-adduction", "Aducción de pierna"],
	["abductions", "Abducciones"],
	["abduction", "Abducción"],
	["adductions", "Aducciones"],
	["adduction", "Aducción"],
	["abductor", "Abductores"],
	["adductor", "Aductores"],
	// Pallof / press funcionales
	["horizontal-pallof-press", "Pallof press horizontal"],
	["vertical-pallof-press", "Pallof press vertical"],
	["pallof-press", "Pallof press"],
	// Press clásicos
	["bench-press", "Press de banca"],
	["shoulder-press", "Press de hombros"],
	["military-press", "Press militar"],
	["overhead-press", "Press sobre la cabeza"],
	["chest-press", "Press de pecho"],
	["leg-press", "Prensa de piernas"],
	["floor-press", "Press en el suelo"],
	["french-press", "Press francés"],
	["jm-press", "JM press"],
	["push-press", "Push press"],
	["bent-press", "Press doblado"],
	// Flexiones, dominadas, abdominales
	["push-ups", "Flexiones"],
	["push-up", "Flexión"],
	["pull-ups", "Dominadas"],
	["pull-up", "Dominada"],
	["chin-ups", "Dominadas supinas"],
	["chin-up", "Dominada supina"],
	["muscle-up", "Muscle-up"],
	["muscle-ups", "Muscle-ups"],
	["sit-ups", "Abdominales"],
	["sit-up", "Abdominal"],
	["v-ups", "V-ups"],
	["v-up", "V-up"],
	["otis-up", "Otis-up"],
	["butt-ups", "Butt-ups"],
	["toes-to-bar", "Toes to bar"],
	["knees-to-elbows", "Rodillas al pecho en barra"],
	["knee-raises", "Elevación de rodillas"],
	["knee-raise", "Elevación de rodillas"],
	// Elevaciones
	["leg-raises", "Elevaciones de piernas"],
	["leg-raise", "Elevación de piernas"],
	["hip-raise", "Elevación de cadera"],
	["hip-raises", "Elevaciones de cadera"],
	["calf-raises", "Elevaciones de talones"],
	["calf-raise", "Elevación de talones"],
	["front-raises", "Elevaciones frontales"],
	["front-raise", "Elevación frontal"],
	["lateral-raises", "Elevaciones laterales"],
	["lateral-raise", "Elevación lateral"],
	["shoulder-raises", "Elevaciones de hombros"],
	["shoulder-raise", "Elevación de hombros"],
	["y-raise", "Y-raise"],
	// Curl femoral / cuádriceps
	["leg-curls", "Curl femoral"],
	["leg-curl", "Curl femoral"],
	["inverse-leg-curl", "Curl femoral nórdico"],
	["leg-extensions", "Extensiones de cuádriceps"],
	["leg-extension", "Extensión de cuádriceps"],
	["triceps-extension", "Extensión de tríceps"],
	["tricep-extension", "Extensión de tríceps"],
	// Hip thrust / cadera
	["hip-thrusts", "Hip thrust"],
	["hip-thrust", "Hip thrust"],
	["good-mornings", "Good morning"],
	["good-morning", "Good morning"],
	// Aperturas / hombros
	["rear-delt-fly", "Pájaros"],
	["rear-delt-flye", "Pájaros"],
	["rear-delt-raise", "Pájaros"],
	["face-pulls", "Face pull"],
	["face-pull", "Face pull"],
	["facepulls", "Face pull"],
	["facepull", "Face pull"],
	["reverse-fly", "Apertura inversa"],
	["reverse-flye", "Apertura inversa"],
	["reverse-flies", "Aperturas inversas"],
	["reverse-flyes", "Aperturas inversas"],
	["chest-fly", "Apertura de pecho"],
	["chest-flye", "Apertura de pecho"],
	["chest-flies", "Aperturas de pecho"],
	["chest-flyes", "Aperturas de pecho"],
	["pec-deck", "Contractor de pecho"],
	// Remos
	["upright-rows", "Remo al mentón"],
	["upright-row", "Remo al mentón"],
	["bent-over-rows", "Remo inclinado"],
	["bent-over-row", "Remo inclinado"],
	["t-bar-row", "Remo en T"],
	["seal-rows", "Remo seal"],
	["seal-row", "Remo seal"],
	["pendlay-rows", "Remo Pendlay"],
	["pendlay-row", "Remo Pendlay"],
	["renegade-row", "Remo renegado"],
	["inverted-row", "Remo invertido"],
	["inverted-rows", "Remo invertido"],
	["high-row", "Remo alto"],
	["low-row", "Remo bajo"],
	["seated-row", "Remo sentado"],
	// Peso muerto y olímpicos
	["romanian-deadlift", "Peso muerto rumano"],
	["stiff-leg-deadlift", "Peso muerto a piernas rígidas"],
	["stiff-legged-deadlift", "Peso muerto a piernas rígidas"],
	["sumo-deadlift", "Peso muerto sumo"],
	["deadlift", "Peso muerto"],
	["clean-and-jerk", "Cargada y envión"],
	["snatch", "Arrancada"],
	["clean", "Cargada"],
	["jerk", "Envión"],
	// Tríceps
	["skull-crushers", "Rompecráneos"],
	["skull-crusher", "Rompecráneos"],
	// Cardio / pliometría
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
	["air-bike", "Bicicleta aérea"],
	["stationary-bike", "Bicicleta estática"],
	["ski-ergometer", "Esquí ergómetro"],
	["ski-erg", "Esquí ergómetro"],
	// Core
	["russian-twists", "Russian twists"],
	["russian-twist", "Russian twist"],
	["bicycle-crunches", "Bicicleta abdominal"],
	["bicycle-crunch", "Bicicleta abdominal"],
	["reverse-crunches", "Crunches invertidos"],
	["reverse-crunch", "Crunch invertido"],
	["hanging-leg-raises", "Elevación de piernas en barra"],
	["hanging-leg-raise", "Elevación de piernas en barra"],
	["hanging-knee-raises", "Elevación de rodillas en barra"],
	["hanging-knee-raise", "Elevación de rodillas en barra"],
	["hanging-pike", "Pike colgado"],
	["dead-bug", "Dead bug"],
	["bird-dog", "Bird dog"],
	["side-bend", "Inclinación lateral"],
	["side-bends", "Inclinaciones laterales"],
	["45-side-bend", "Inclinación lateral a 45º"],
	["heel-touchers", "Toques de talón"],
	["toe-touch", "Tocar punta del pie"],
	["toe-touches", "Tocar punta del pie"],
	["two-toe-touch", "Toques de dos puntas"],
	["flutter-kicks", "Tijeras"],
	["scissor-kicks", "Tijeras"],
	["cocoons", "Cocoons"],
	["inchworm", "Gusano"],
	["curl-up", "Curl-up abdominal"],
	["pelvic-tilt", "Inclinación pélvica"],
	["pull-in", "Pull-in"],
	["pull-ins", "Pull-ins"],
	["l-sit", "L-sit"],
	["landmine-180", "Landmine 180"],
	["landmine", "Landmine"],
	// Calistenia avanzada
	["frog-planche", "Plancha rana"],
	["lean-planche", "Plancha inclinada"],
	["full-planche", "Plancha completa"],
	["full-maltese", "Cruz maltesa"],
	["maltese", "Cruz maltesa"],
	["planche", "Plancha calisténica"],
	["flag", "Bandera humana"],
	["front-lever", "Front lever"],
	["back-lever", "Back lever"],
	["gorilla-chin", "Gorilla chin-up"],
	["handstand-push-up", "Flexión en parada de manos"],
	["handstand", "Parada de manos"],
	["stalder-press", "Stalder press"],
	// Sentadillas y zancadas
	["goblet-squat", "Sentadilla goblet"],
	["front-squat", "Sentadilla frontal"],
	["back-squat", "Sentadilla trasera"],
	["bulgarian-split-squat", "Sentadilla búlgara"],
	["split-squat", "Split squat"],
	["sumo-squat", "Sentadilla sumo"],
	["wall-sit", "Sentadilla isométrica en pared"],
	["wall-ball", "Wall ball"],
	["box-squat", "Sentadilla al cajón"],
	["hack-squat", "Hack squat"],
	["pistol-squat", "Sentadilla pistol"],
	["sissy-squat", "Sissy squat"],
	["squats", "Sentadillas"],
	["squat", "Sentadilla"],
	["lunges", "Zancadas"],
	["lunge", "Zancada"],
	["step-ups", "Step-ups"],
	["step-up", "Step-up"],
	// Jalones / pullover
	["lat-pulldown", "Jalón al pecho"],
	["pulldowns", "Jalón al pecho"],
	["pulldown", "Jalón al pecho"],
	["pull-down", "Jalón al pecho"],
	["pullovers", "Pullover"],
	["pullover", "Pullover"],
	["pushdown", "Pushdown"],
	["pushdowns", "Pushdowns"],
	// Patadas
	["kickbacks", "Patada de tríceps"],
	["kickback", "Patada de tríceps"],
	["glute-kickback", "Patada de glúteo"],
	["glute-kickbacks", "Patada de glúteo"],
	["donkey-kicks", "Patada de burro"],
	["donkey-kick", "Patada de burro"],
	["fire-hydrants", "Bombero"],
	["fire-hydrant", "Bombero"],
	// Encogimientos / fondos
	["shrugs", "Encogimientos"],
	["shrug", "Encogimiento"],
	["dips", "Fondos"],
	["dip", "Fondo"],
	["tricep-dip", "Fondo de tríceps"],
	["tricep-dips", "Fondos de tríceps"],
	["triceps-dip", "Fondo de tríceps"],
	["triceps-dips", "Fondos de tríceps"],
	["bench-dip", "Fondo en banco"],
	["bench-dips", "Fondos en banco"],
	// Plancha / puente
	["side-plank", "Plancha lateral"],
	["side-bridge", "Puente lateral"],
	["glute-bridge", "Puente de glúteos"],
	["planks", "Planchas"],
	["plank", "Plancha"],
	["bridges", "Puentes"],
	["bridge", "Puente"],
	["clamshells", "Almejas"],
	["clamshell", "Almeja"],
	// Kettlebell / dinámicos
	["swings", "Swing"],
	["swing", "Swing"],
	["thrusters", "Thrusters"],
	["thruster", "Thruster"],
	["snatch-pull", "Snatch pull"],
	// Curl muñeca / dedos
	["wrist-curls", "Curl de muñeca"],
	["wrist-curl", "Curl de muñeca"],
	["finger-curls", "Curl de dedos"],
	["finger-curl", "Curl de dedos"],
	// Curl de bíceps
	["biceps-curl", "Curl de bíceps"],
	["bicep-curl", "Curl de bíceps"],
	["hammer-curl", "Curl martillo"],
	["hammer-curls", "Curl martillo"],
	["preacher-curl", "Curl predicador"],
	["preacher-curls", "Curl predicador"],
	["concentration-curl", "Curl concentrado"],
	["concentration-curls", "Curl concentrado"],
	["drag-curl", "Curl drag"],
	["drag-curls", "Curl drag"],
	["reverse-curl", "Curl invertido"],
	["reverse-curls", "Curl invertido"],
	["zottman-curl", "Curl Zottman"],
	["spider-curl", "Curl spider"],
	["curls", "Curl"],
	["curl", "Curl"],
	// Genéricos al final (fallback)
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
	"side-lying": "tumbado de lado",
	kneeling: "de rodillas",
	squatting: "en cuclillas",
	"half-kneeling": "en media rodilla",
	prone: "boca abajo",
	supine: "boca arriba",
	incline: "inclinado",
	decline: "declinado",
	flat: "plano",
	side: "lateral",
	hanging: "colgado",
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
	"two-legs": "a dos piernas",
	"both-arms": "a dos manos",
	"bent-knee": "con rodillas flexionadas",
	"bent-knees": "con rodillas flexionadas",
	"straight-leg": "con piernas rectas",
	"straight-legs": "con piernas rectas",
	"straight-arm": "con brazo recto",
	"straight-arms": "con brazos rectos",
	"arms-overhead": "con brazos sobre la cabeza",
	"legs-up": "con piernas arriba",
	"feet-up": "con pies arriba",
	"feet-elevated": "con pies elevados",
	"knees-up": "con rodillas arriba",
	"twisting": "con giro",
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
	inner: "interno",
	outer: "externo",
	horizontal: "horizontal",
	vertical: "vertical",
	weighted: "con peso",
	assisted: "asistido",
	suspended: "suspendido",
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
	"v-2",
	"v-3",
	"position",
	"motion",
	"stance",
	"grip",
	"version",
	"male",
	"female",
	"pov",
	"0656",
	"1766",
	"180",
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
	elbow: "codo",
	elbows: "codos",
	captain: "capitán",
	captains: "capitán",
	slingers: "slingers",
	pike: "pike",
	nordic: "nórdico",
	sphinx: "esfinge",
	cobra: "cobra",
	world: "world",
	greatest: "greatest",
	neck: "cuello",
	jaw: "mandíbula",
	walking: "caminando",
	walk: "caminata",
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
	sides: "lados",
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

	// 3) Equipamiento. Si Smith está en los tokens ignoramos un "machine"
	// suelto para evitar "máquina Smith en máquina".
	const equipment = [];
	const hasSmith = tokens.includes("smith");
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (hasSmith && tok === "machine") {
			used[i] = true;
			return;
		}
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
	// si podemos, y las añadimos como bloque final. Filtra números sueltos.
	const leftover = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (STOP_WORDS.has(tok)) return;
		if (/^\d+$/.test(tok)) return; // números sueltos (0656, 180, 2, 1766)
		leftover.push(EXTRA_WORDS[tok] || tok);
	});

	// Construir el bloque principal: movimiento + variantes + equipamiento.
	// Si no hay movimiento conocido, usamos el leftover como núcleo del nombre
	// (no como bloque secundario, para evitar duplicaciones).
	const mainParts = [];
	let leftoverConsumed = false;
	if (movement) {
		mainParts.push(movement);
		if (variants.length) mainParts.push(...variants);
	} else if (leftover.length) {
		mainParts.push(leftover.join(" "));
		leftoverConsumed = true;
		if (variants.length) mainParts.push(...variants);
	} else if (variants.length) {
		mainParts.push(...variants);
	}
	if (equipment.length) mainParts.push(...equipment);

	const mainBlock = joinDedup(mainParts);

	// Bloques secundarios (cada uno con su coma).
	const secondaryBlocks = [];
	if (postures.length) secondaryBlocks.push(joinDedup(postures));
	if (grips.length) secondaryBlocks.push(joinDedup(grips));
	if (modifiers.length) secondaryBlocks.push(joinDedup(modifiers));
	if (!leftoverConsumed && leftover.length) {
		secondaryBlocks.push(leftover.join(" "));
	}

	// Filtra bloques secundarios cuyas palabras ya están en el principal.
	const mainWords = new Set(
		mainBlock
			.toLowerCase()
			.replace(/[,()]/g, " ")
			.split(/\s+/)
			.filter(Boolean)
	);
	const filteredSecondary = secondaryBlocks.filter((b) => {
		const words = b.toLowerCase().split(/\s+/).filter(Boolean);
		return words.some((w) => !mainWords.has(w));
	});

	let result = mainBlock || (leftover.length ? leftover.join(" ") : slug);
	if (filteredSecondary.length) {
		result += ", " + filteredSecondary.join(", ");
	}

	// Dedup palabra a palabra dentro de cada bloque (preservando comas)
	result = result
		.split(",")
		.map((block) => {
			const words = block.trim().split(/\s+/);
			const seen = new Set();
			const kept = [];
			for (const w of words) {
				const key = w.toLowerCase().replace(/[.,;:]+$/, "");
				if (!key) continue;
				// Conectores cortos pueden repetirse legítimamente
				if (["con", "de", "en", "y", "a", "al", "la", "el"].includes(key)) {
					kept.push(w);
					continue;
				}
				if (seen.has(key)) continue;
				seen.add(key);
				kept.push(w);
			}
			return kept.join(" ");
		})
		.filter((b) => b.length > 0)
		.join(", ");

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

const EQUIP_SETUP_ES = {
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

const CATEGORY_FOCUS_ES = {
	strength: "Realiza el movimiento de forma controlada manteniendo la técnica.",
	stretching: "Mantén la posición sintiendo el estiramiento sin rebotes.",
	plyometrics: "Ejecuta el movimiento de forma explosiva y aterriza con control.",
	cardio: "Mantén un ritmo constante adaptado a tu nivel.",
};

// Nombre de músculo para usar en instrucciones (con artículo y forma natural).
// Ej.: biceps -> "los bíceps", forearms -> "los antebrazos", abs -> "el core".
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

function generateInstructionsEs({ name, muscle, equipment, category }) {
	const setup = EQUIP_SETUP_ES[equipment] || EQUIP_SETUP_ES.other;
	const focus = CATEGORY_FOCUS_ES[category] || CATEGORY_FOCUS_ES.strength;
	const muscleEs = MUSCLE_NAME_ES[muscle] || muscle;

	if (category === "stretching") {
		return [
			setup,
			`Lleva el cuerpo a la posición de estiramiento de ${muscleEs}.`,
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
		`Activa ${muscleEs} antes de iniciar el movimiento.`,
		focus,
		"Vuelve a la posición inicial controlando la fase excéntrica.",
		"Mantén la respiración: exhala en el esfuerzo, inhala al volver.",
	];
}

const EQUIP_SETUP_EN = {
	barbell: "Load the bar with an appropriate weight and adopt the starting position.",
	dumbbell: "Grab a dumbbell in each hand (or the indicated one) with an appropriate weight.",
	cable: "Set the pulley at the required height and select the weight.",
	machine: "Adjust the machine to your size and select the load.",
	lever: "Adjust the machine to your size and select the load.",
	smith: "Set the bar on the Smith machine at the right height.",
	"ez-bar": "Load the EZ-bar with an appropriate weight and grip it firmly.",
	kettlebell: "Grab the kettlebell with an appropriate weight and adopt the position.",
	band: "Anchor the resistance band and maintain initial tension.",
	bodyweight: "Adopt the starting position with proper body alignment.",
	other: "Prepare the equipment and adopt the starting position.",
};

const CATEGORY_FOCUS_EN = {
	strength: "Perform the movement in a controlled manner, keeping good form.",
	stretching: "Hold the position feeling the stretch without bouncing.",
	plyometrics: "Execute the movement explosively and land under control.",
	cardio: "Keep a steady pace adapted to your fitness level.",
};

function generateInstructionsEn({ name, muscle, equipment, category }) {
	const setup = EQUIP_SETUP_EN[equipment] || EQUIP_SETUP_EN.other;
	const focus = CATEGORY_FOCUS_EN[category] || CATEGORY_FOCUS_EN.strength;
	const muscleEn = MUSCLE_NAME_EN[muscle] || muscle;

	if (category === "stretching") {
		return [
			setup,
			`Move into the ${muscleEn} stretch position.`,
			"Hold for 20 to 40 seconds breathing deeply.",
			"Return slowly to the starting position and repeat if desired.",
		];
	}
	if (category === "cardio") {
		return [
			setup,
			focus,
			"Engage your core and keep an upright posture throughout.",
			"Continue for the planned time or repetitions.",
		];
	}
	if (category === "plyometrics") {
		return [
			setup,
			"Perform a brief dip to load tension.",
			focus,
			"Land softly absorbing with legs and core, then chain the next rep.",
		];
	}
	return [
		setup,
		`Pre-engage ${muscleEn} before initiating the movement.`,
		focus,
		"Return to the starting position controlling the eccentric phase.",
		"Breathe: exhale on effort, inhale on the way back.",
	];
}

module.exports = {
	translateSlug,
	inferSecondary,
	generateInstructionsEs,
	generateInstructionsEn,
};
