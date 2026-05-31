/**
 * Brazilian Portuguese (Português) translation module for exercise slugs.
 *
 * Composition order (similar to Spanish - Romance language):
 *   [MOVEMENT] [VARIANT] [EQUIPMENT], [POSTURE], [GRIP], [MODIFIERS]
 *
 * Examples:
 *   barbell-bench-press            -> Supino com barra
 *   cable-seated-close-grip-row    -> Remada na polia, sentado, pegada fechada
 *   dumbbell-standing-curl         -> Rosca com halteres, em pé
 */

const STOP_WORDS = new Set(["a", "the", "an", "v", "male", "female", "pov", "side-pov", "back-pov", "front-pov", "version", "of", "and", "to", "in", "from", "into", "both", "on", "with", "for", "at", "by", "its", "all", "between", "can", "get", "plus", "self", "pro"]);

// ─────────────────────────────────────────────────────────────
// MOVEMENTS
// ─────────────────────────────────────────────────────────────
const MOVEMENTS = [
	// Bench press
	["close-grip-bench-press", "Supino com pegada fechada"],
	["incline-bench-press", "Supino inclinado"],
	["decline-bench-press", "Supino declinado"],
	["bench-press", "Supino"],
	["chest-press", "Press de peito"],
	["floor-press", "Supino no chão"],
	// Overhead press
	["overhead-press", "Desenvolvimento"],
	["military-press", "Desenvolvimento militar"],
	["shoulder-press", "Desenvolvimento de ombros"],
	["push-press", "Push Press"],
	["arnold-press", "Arnold Press"],
	["behind-neck-press", "Desenvolvimento por trás"],
	// Triceps
	["skull-crusher", "Tríceps testa"],
	["skull-crushers", "Tríceps testa"],
	["lying-triceps-extension", "Extensão de tríceps deitado"],
	["overhead-triceps-extension", "Extensão de tríceps acima da cabeça"],
	["triceps-extension", "Extensão de tríceps"],
	["triceps-pushdown", "Tríceps"],
	["triceps-kickback", "Tríceps coice"],
	// Squats
	["front-squat", "Agachamento frontal"],
	["back-squat", "Agachamento"],
	["goblet-squat", "Agachamento goblet"],
	["sissy-squat", "Agachamento sissy"],
	["split-squat", "Agachamento búlgaro"],
	["squat", "Agachamento"],
	// Deadlifts
	["sumo-deadlift", "Levantamento terra sumo"],
	["romanian-deadlift", "Levantamento terra romeno"],
	["stiff-leg-deadlift", "Levantamento terra com pernas retas"],
	["deadlift", "Levantamento terra"],
	["rack-pull", "Rack Pull"],
	// Rows
	["bent-over-row", "Remada curvada"],
	["upright-row", "Remada alta"],
	["cable-row", "Remada na polia"],
	["t-bar-row", "Remada cavalinho"],
	["pendlay-row", "Remada Pendlay"],
	["one-arm-row", "Remada unilateral"],
	["row", "Remada"],
	// Pull-ups / Chin-ups
	["pull-up", "Barra fixa"],
	["pull-ups", "Barra fixa"],
	["chin-up", "Barra fixa supinada"],
	["chin-ups", "Barra fixa supinada"],
	["muscle-up", "Muscle-up"],
	["lat-pulldown", "Puxada alta"],
	["pulldown", "Puxada"],
	// Curls
	["hammer-curl", "Rosca martelo"],
	["hammer-curls", "Rosca martelo"],
	["preacher-curl", "Rosca Scott"],
	["concentration-curl", "Rosca concentrada"],
	["spider-curl", "Rosca spider"],
	["drag-curl", "Rosca drag"],
	["reverse-curl", "Rosca inversa"],
	["zottman-curl", "Rosca Zottman"],
	["wrist-curl", "Rosca de punho"],
	["biceps-curl", "Rosca bíceps"],
	["bicep-curl", "Rosca bíceps"],
	["curl", "Rosca"],
	// Flyes
	["chest-fly", "Crucifixo"],
	["reverse-fly", "Crucifixo inverso"],
	["fly", "Crucifixo"],
	["flye", "Crucifixo"],
	// Raises
	["lateral-raise", "Elevação lateral"],
	["front-raise", "Elevação frontal"],
	["rear-delt-raise", "Elevação posterior"],
	["calf-raise", "Panturrilha"],
	["leg-raise", "Elevação de pernas"],
	["raise", "Elevação"],
	// Dips
	["chest-dip", "Mergulho para peito"],
	["triceps-dip", "Mergulho para tríceps"],
	["dip", "Mergulho"],
	["dips", "Mergulhos"],
	// Push-ups
	["push-up", "Flexão"],
	["push-ups", "Flexões"],
	// Lunges
	["walking-lunge", "Avanço caminhando"],
	["reverse-lunge", "Avanço reverso"],
	["lunge", "Avanço"],
	["lunges", "Avanços"],
	// Hip thrust / bridge
	["hip-thrust", "Hip Thrust"],
	["glute-bridge", "Ponte de glúteos"],
	// Plank
	["side-plank", "Prancha lateral"],
	["plank", "Prancha"],
	// Crunch / Sit-up
	["russian-twist", "Giro russo"],
	["bicycle-crunch", "Abdominal bicicleta"],
	["crunch", "Abdominal"],
	["sit-up", "Abdominal completo"],
	["v-up", "V-Up"],
	// Leg work
	["leg-press", "Leg press"],
	["leg-extension", "Extensão de pernas"],
	["leg-curl", "Mesa flexora"],
	["hip-abduction", "Abdução de quadril"],
	["hip-adduction", "Adução de quadril"],
	["step-up", "Step-up"],
	// Olympic
	["clean-and-press", "Clean and Press"],
	["power-clean", "Power Clean"],
	["hang-clean", "Hang Clean"],
	["clean", "Clean"],
	["snatch", "Arranco"],
	["thruster", "Thruster"],
	// Back
	["hyperextension", "Hiperextensão"],
	["back-extension", "Extensão lombar"],
	["good-morning", "Good Morning"],
	["pullover", "Pullover"],
	["face-pull", "Face Pull"],
	["shrug", "Encolhimento de ombros"],
	// Cardio / plyo
	["burpee", "Burpee"],
	["mountain-climber", "Escalador"],
	["box-jump", "Salto na caixa"],
	["jump-rope", "Pular corda"],
	["jumping-jack", "Polichinelo"],
	["high-knee", "Elevação de joelhos"],
	// Cross-trainer / circular
	["cycle-cross-trainer", "Bicicleta elíptica"],
	["walk-elliptical-cross-trainer", "Caminhada no elíptico"],
	["run-elliptical-cross-trainer", "Corrida no elíptico"],
	["arms-circular-motion-with-dumbbell", "Movimento circular de braços com halteres"],
	// Kettlebell specifics
	["kettlebell-swing", "Swing com kettlebell"],
	["turkish-get-up", "Levantamento turco"],
	["windmill", "Windmill"],
	// Stretches
	["stretch", "Alongamento"],
	["stretching", "Alongamento"],
	// Generic
	["press", "Press"],
	["extension", "Extensão"],
	["raises", "Elevações"],
];

// ─────────────────────────────────────────────────────────────
// VARIANTS
// ─────────────────────────────────────────────────────────────
const VARIANTS = {
	hammer: "martelo",
	preacher: "Scott",
	concentration: "concentrada",
	spider: "spider",
	drag: "drag",
	reverse: "inverso",
	zottman: "Zottman",
	incline: "inclinado",
	decline: "declinado",
	overhead: "acima da cabeça",
	arnold: "Arnold",
	bradford: "Bradford",
	scott: "Scott",
	cuban: "cubano",
	pendlay: "Pendlay",
	hindu: "hindu",
	sumo: "sumo",
	bulgarian: "búlgaro",
	romanian: "romeno",
	goblet: "goblet",
	pistol: "pistol",
	sissy: "sissy",
	superman: "superman",
	russian: "russo",
	nordic: "nórdico",
	french: "francês",
};

// ─────────────────────────────────────────────────────────────
// EQUIPMENT
// ─────────────────────────────────────────────────────────────
const EQUIPMENT = {
	barbell: "com barra",
	dumbbell: "com halteres",
	dumbbells: "com halteres",
	cable: "na polia",
	cables: "nas polias",
	machine: "na máquina",
	smith: "no Smith",
	"ez-bar": "com barra W",
	"ez-barbell": "com barra W",
	kettlebell: "com kettlebell",
	kettlebells: "com kettlebells",
	lever: "na máquina",
	bodyweight: "com peso corporal",
	band: "com faixa elástica",
	bands: "com faixas elásticas",
	"resistance-band": "com faixa elástica",
	rope: "com corda",
	"v-bar": "com barra V",
	"straight-bar": "com barra reta",
	"medicine-ball": "com medicine ball",
	"exercise-ball": "na bola suíça",
	"stability-ball": "na bola suíça",
	"swiss-ball": "na bola suíça",
	"bosu-ball": "no bosu",
	sled: "no trenó",
	landmine: "na landmine",
	"trap-bar": "com barra hexagonal",
};

// ─────────────────────────────────────────────────────────────
// POSTURE
// ─────────────────────────────────────────────────────────────
const POSTURE = {
	standing: "em pé",
	seated: "sentado",
	sitting: "sentado",
	lying: "deitado",
	"side-lying": "deitado de lado",
	kneeling: "ajoelhado",
	prone: "de bruços",
	supine: "de costas",
	incline: "inclinado",
	decline: "declinado",
	flat: "reto",
	side: "lateral",
	hanging: "suspenso",
};

// ─────────────────────────────────────────────────────────────
// GRIPS
// ─────────────────────────────────────────────────────────────
const GRIPS = {
	"close-grip": "pegada fechada",
	"wide-grip": "pegada aberta",
	"narrow-grip": "pegada fechada",
	"medium-grip": "pegada média",
	"reverse-grip": "pegada supinada",
	"neutral-grip": "pegada neutra",
	"hammer-grip": "pegada martelo",
	"underhand-grip": "pegada supinada",
	"overhand-grip": "pegada pronada",
	"supinated-grip": "pegada supinada",
	"pronated-grip": "pegada pronada",
	"mixed-grip": "pegada mista",
};

// ─────────────────────────────────────────────────────────────
// MODIFIERS
// ─────────────────────────────────────────────────────────────
const MODIFIERS = {
	"one-arm": "unilateral",
	"two-arm": "bilateral",
	"single-arm": "unilateral",
	"single-leg": "unilateral",
	"one-leg": "unilateral",
	alternating: "alternado",
	alternate: "alternado",
	weighted: "com carga",
	assisted: "assistido",
	"bent-over": "curvado",
	"bent-knee": "com joelho flexionado",
	"straight-leg": "com perna reta",
	"straight-arm": "com braço reto",
	"stiff-leg": "com pernas retas",
	"legs-up": "com pernas elevadas",
	"feet-elevated": "com pés elevados",
	twisting: "com rotação",
	"cross-body": "cruzado",
	"full-range": "amplitude completa",
	"with-rope": "com corda",
	"with-towel": "com toalha",
	suspended: "suspenso",
	wide: "aberto",
	narrow: "fechado",
	high: "alto",
	low: "baixo",
	front: "frontal",
	rear: "posterior",
};

// ─────────────────────────────────────────────────────────────
// EXTRA WORDS
// ─────────────────────────────────────────────────────────────
const EXTRA_WORDS = {
	chest: "peito",
	back: "costas",
	shoulder: "ombro",
	shoulders: "ombros",
	arm: "braço",
	arms: "braços",
	leg: "perna",
	legs: "pernas",
	hip: "quadril",
	hips: "quadris",
	knee: "joelho",
	ankle: "tornozelo",
	wrist: "punho",
	elbow: "cotovelo",
	neck: "pescoço",
	spine: "coluna",
	core: "core",
	abs: "abdominais",
	glute: "glúteo",
	glutes: "glúteos",
	quad: "quadríceps",
	quads: "quadríceps",
	hamstring: "posterior de coxa",
	hamstrings: "posteriores de coxa",
	calf: "panturrilha",
	calves: "panturrilhas",
	biceps: "bíceps",
	triceps: "tríceps",
	forearm: "antebraço",
	forearms: "antebraços",
	lats: "dorsais",
	traps: "trapézio",
	delts: "deltoides",
	ball: "bola",
	bench: "banco",
	floor: "chão",
	wall: "parede",
	box: "caixa",
	bridge: "ponte",
	step: "degrau",
	rope: "corda",
	bar: "barra",
	grip: "pegada",
	roller: "rolo",
	wheel: "roda",
	kick: "chute",
	twist: "rotação",
	push: "empurrar",
	pull: "puxar",
	hold: "segurar",
	squat: "agachamento",
	deadlift: "levantamento terra",


	// ─── AUTO-GENERATED TRANSLATIONS ───
	hand: "mão",
	hands: "mãos",
	legged: "perna",
	knees: "joelhos",
	toe: "dedos do pé",
	heel: "calcanhar",
	head: "cabeça",
	chin: "queixo",
	feet: "pés",
	ankles: "tornozelos",
	finger: "dedo",
	palm: "palma",
	palms: "palmas",
	butt: "glúteos",
	groin: "virilha",
	gluteus: "glúteo",
	pec: "peitoral",
	pectoralis: "peitoral",
	delt: "deltoide",
	deltoid: "deltoide",
	bicep: "bíceps",
	tricep: "tríceps",
	lat: "dorsal",
	trap: "trapézio",
	oblique: "oblíquo",
	ham: "posterior",
	femoral: "femoral",
	femoris: "femoral",
	rectus: "reto",
	tibialis: "tibial",
	peroneals: "fibulares",
	piriformis: "piriforme",
	abductor: "abdutor",
	adductor: "adutor",
	abduction: "abdução",
	adduction: "adução",
	flexor: "flexor",
	retractor: "retrator",
	scapula: "escápula",
	scapular: "escapular",
	posterior: "posterior",
	forward: "à frente",
	backward: "para trás",
	lateral: "lateral",
	behind: "atrás",
	above: "acima",
	across: "cruzado",
	inner: "interno",
	outer: "externo",
	inside: "interno",
	outside: "externo",
	upper: "superior",
	lower: "inferior",
	middle: "médio",
	left: "esquerdo",
	vertical: "vertical",
	horizontal: "horizontal",
	parallel: "paralelo",
	diagonal: "diagonal",
	upright: "ereto",
	upward: "para cima",
	jump: "salto",
	jumps: "saltos",
	run: "corrida",
	walk: "caminhada",
	walking: "caminhando",
	climb: "escalada",
	crawl: "rastejamento",
	throw: "arremesso",
	catch: "pegada",
	touch: "toque",
	lift: "levantamento",
	lifting: "levantamento",
	drive: "impulso",
	slide: "deslizamento",
	sprint: "sprint",
	sprints: "sprints",
	carry: "carregamento",
	drag: "arraste",
	hops: "saltos",
	march: "marcha",
	squeeze: "apertar",
	raise: "elevação",
	raises: "elevações",
	raised: "elevado",
	rotate: "rotação",
	rotation: "rotação",
	rotational: "rotacional",
	rotary: "rotatório",
	flexion: "flexão",
	extension: "extensão",
	bend: "flexão",
	bends: "flexões",
	bent: "curvado",
	pass: "passe",
	circles: "círculos",
	circular: "circular",
	kicks: "chutes",
	drop: "queda",
	flip: "virar",
	tilt: "inclinação",
	reach: "alcance",
	release: "soltar",
	tap: "toque",
	planche: "planche",
	isometric: "isométrico",
	plyo: "plio",
	dynamic: "dinâmico",
	ballistic: "balístico",
	negative: "negativo",
	smith: "Smith",
	kettlebell: "kettlebell",
	ez: "EZ",
	medicine: "medicine",
	stability: "estabilidade",
	resistance: "resistência",
	towel: "toalha",
	bars: "barras",
	attachment: "acessório",
	pad: "apoio",
	platform: "plataforma",
	cage: "gaiola",
	board: "prancha",
	tire: "pneu",
	strap: "faixa",
	straps: "faixas",
	ropes: "cordas",
	handle: "pegada",
	pulley: "polia",
	landmine: "landmine",
	pin: "pino",
	stirrups: "estribos",
	trainer: "elíptico",
	treadmill: "esteira",
	elliptical: "elíptico",
	ergometer: "ergômetro",
	stepmill: "stepmill",
	staircase: "escada",
	gripper: "hand grip",
	iron: "ferro",
	one: "um",
	two: "dois",
	single: "unilateral",
	double: "duplo",
	half: "meio",
	full: "completo",
	deep: "profundo",
	wide: "aberto",
	narrow: "fechado",
	short: "curto",
	high: "alto",
	low: "baixo",
	quick: "rápido",
	slow: "lento",
	reverse: "inverso",
	reversed: "inverso",
	revers: "inverso",
	inverted: "invertido",
	inverse: "inverso",
	modified: "modificado",
	advanced: "avançado",
	basic: "básico",
	extended: "estendido",
	elevated: "elevado",
	supported: "apoiado",
	support: "apoio",
	fixed: "fixo",
	stationary: "estacionário",
	cross: "cruzado",
	crossover: "cruzado",
	crossovers: "cruzados",
	over: "sobre",
	down: "para baixo",
	up: "para cima",
	ups: "ups",
	out: "fora",
	off: "fora",
	sit: "sentado",
	anti: "anti",
	russian: "russo",
	military: "militar",
	hammer: "martelo",
	spider: "spider",
	preacher: "Scott",
	concentration: "concentrada",
	sumo: "sumo",
	hindu: "hindu",
	turkish: "turco",
	korean: "coreano",
	cossack: "cossaco",
	zercher: "Zercher",
	gironda: "Gironda",
	janda: "Janda",
	thibaudeau: "Thibaudeau",
	donkey: "burro",
	pushdown: "puxada",
	kickback: "kickback",
	kickbacks: "kickbacks",
	hyperextension: "hiperextensão",
	rollout: "rollout",
	rollerout: "rollout",
	blaster: "blaster",
	windmill: "moinho",
	superman: "superman",
	inchworm: "minhoca",
	lunge: "avanço",
	pike: "pike",
	tuck: "tuck",
	flag: "bandeira",
	handstand: "parada de mão",
	elevator: "elevador",
	sphinx: "esfinge",
	cocoons: "casulo",
	bike: "bicicleta",
	cycle: "bicicleta",
	air: "aéreo",
	exercise: "exercício",
	motion: "movimento",
	stance: "posição",
	position: "posição",
	pose: "pose",
	stretch: "alongamento",
	straight: "reto",
	angle: "ângulo",
	angled: "angulado",
	power: "potência",
	speed: "velocidade",
	hang: "suspensão",
	dead: "morto",
	bug: "bug",
	star: "estrela",
	frog: "sapo",
	cat: "gato",
	dog: "cachorro",
	cobra: "cobra",
	bear: "urso",
	gorilla: "gorila",
	crab: "caranguejo",
	butterfly: "borboleta",
	swimmer: "nadador",
	skater: "patinador",
	archer: "arqueiro",
	jerk: "jerk",
	against: "contra",
	through: "através",
	around: "ao redor",
	apart: "afastado",
	chair: "cadeira",
	ground: "chão",
	figure: "figura",
	reps: "repetições",
	jack: "polichinelo",
	slam: "slam",
	ab: "abdominal",
	abdominal: "abdominal",
	astride: "escarranchado",
	balance: "equilíbrio",
	battling: "batalha",
	benches: "bancos",
	big: "grande",
	body: "corpo",
	bottoms: "fundo",
	bowling: "boliche",
	boxing: "boxe",
	breeding: "abertura",
	cambered: "arqueado",
	captains: "capitão",
	caster: "roldana",
	clap: "palma",
	clasped: "unidas",
	clock: "relógio",
	closer: "próximo",
	contralateral: "contralateral",
	crunches: "abdominais",
	crusher: "triturador",
	curtsey: "cortesia",
	degrees: "graus",
	depresor: "depressor",
	depth: "profundidade",
	diamond: "diamante",
	equipment: "equipamento",
	external: "externo",
	facing: "de frente",
	fallout: "fallout",
	farmers: "fazendeiro",
	flutter: "batida",
	flyes: "crucifixo",
	forth: "frente",
	fours: "quatro apoios",
	frankenstein: "Frankenstein",
	gravity: "gravidade",
	greatest: "maior",
	gripless: "sem pegada",
	guillotine: "guilhotina",
	hook: "gancho",
	hug: "abraço",
	hyght: "Hyght",
	hyper: "hiper",
	impossible: "impossível",
	intermediate: "intermediário",
	internal: "interno",
	jackknife: "canivete",
	jm: "JM",
	judo: "judô",
	kayak: "caiaque",
	keens: "joelhos",
	kipping: "kipping",
	knife: "faca",
	lean: "inclinado",
	lying: "deitado",
	machine: "máquina",
	major: "maior",
	maltese: "maltês",
	monster: "monstro",
	multiple: "múltiplo",
	neutral: "neutro",
	olympic: "olímpico",
	otis: "Otis",
	outstretched: "esticados",
	overhand: "pronada",
	pallof: "Pallof",
	peacher: "Scott",
	pelvic: "pélvico",
	pirate: "pirata",
	pistol: "pistol",
	point: "ponta",
	potty: "potty",
	presses: "supinos",
	prisoner: "prisioneiro",
	pronate: "pronação",
	pronated: "pronada",
	pronation: "pronação",
	pulldown: "puxada",
	pyramid: "pirâmide",
	quarter: "quarto",
	range: "amplitude",
	reclining: "reclinado",
	renegade: "renegado",
	response: "resposta",
	rocking: "balanço",
	rocky: "Rocky",
	rollerer: "rolo",
	round: "redondo",
	row: "remada",
	runners: "corredor",
	saw: "serra",
	scissor: "tesoura",
	seesaw: "gangorra",
	semi: "semi",
	sequence: "sequência",
	side: "lateral",
	sitted: "sentado",
	ski: "esqui",
	skier: "esquiador",
	skin: "pele",
	skull: "crânio",
	skullcrusher: "tríceps testa",
	sledge: "trenó",
	slingers: "estilingue",
	spell: "feitiço",
	squad: "equipe",
	squats: "agachamentos",
	squatting: "agachando",
	stabilization: "estabilização",
	stalder: "Stalder",
	stepbox: "step",
	sternum: "esterno",
	stork: "cegonha",
	straddle: "escarrancho",
	stride: "passada",
	style: "estilo",
	supinated: "supinada",
	supination: "supinação",
	supper: "supper",
	svend: "Svend",
	sz: "EZ",
	tate: "Tate",
	tennis: "tênis",
	three: "três",
	thrusts: "impulsos",
	touchers: "toques",
	twin: "gêmeo",
	twisted: "torcido",
	twists: "torções",
	under: "sob",
	underhand: "supinada",
	unilateral: "unilateral",
	variation: "variação",
	waiter: "garçom",
	wind: "vento",
	wipers: "limpador",
	world: "mundo",
	yoga: "yoga",
	curl: "rosca",
	press: "supino",
	swing: "balanço",
};

// ─────────────────────────────────────────────────────────────
// TOKENIZER
// ─────────────────────────────────────────────────────────────

function tokenize(slug) {
	const multiWordKeys = [
		...MOVEMENTS.map(([k]) => k),
		...Object.keys(EQUIPMENT).filter(k => k.includes("-")),
		...Object.keys(GRIPS).filter(k => k.includes("-")),
		...Object.keys(MODIFIERS).filter(k => k.includes("-")),
		...Object.keys(POSTURE).filter(k => k.includes("-")),
	].sort((a, b) => b.length - a.length);
	let remaining = slug;
	const tokens = [];

	while (remaining.length > 0) {
		let matched = false;
		for (const key of multiWordKeys) {
			if (remaining === key || remaining.startsWith(key + "-")) {
				tokens.push(key);
				remaining = remaining.slice(key.length);
				if (remaining.startsWith("-")) remaining = remaining.slice(1);
				matched = true;
				break;
			}
		}
		if (!matched) {
			const dashIdx = remaining.indexOf("-");
			if (dashIdx === -1) {
				tokens.push(remaining);
				remaining = "";
			} else {
				tokens.push(remaining.slice(0, dashIdx));
				remaining = remaining.slice(dashIdx + 1);
			}
		}
	}
	return tokens;
}

// ─────────────────────────────────────────────────────────────
// COMPOSITION
// ─────────────────────────────────────────────────────────────

function joinDedup(parts) {
	const seen = new Set();
	const out = [];
	for (const p of parts) {
		if (!p) continue;
		const lower = p.toLowerCase();
		if (seen.has(lower)) continue;
		seen.add(lower);
		out.push(p);
	}
	return out.join(" ");
}

function translateSlug(slug) {
	const tokens = tokenize(slug);
	const used = new Array(tokens.length).fill(false);

	let movement = null;
	for (const [key, value] of MOVEMENTS) {
		const idx = tokens.indexOf(key);
		if (idx !== -1) {
			movement = value;
			used[idx] = true;
			break;
		}
	}

	const variants = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (VARIANTS[tok]) {
			variants.push(VARIANTS[tok]);
			used[i] = true;
		}
	});

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

	const postures = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (POSTURE[tok]) {
			postures.push(POSTURE[tok]);
			used[i] = true;
		}
	});

	const grips = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (GRIPS[tok]) {
			grips.push(GRIPS[tok]);
			used[i] = true;
		}
	});

	const modifiers = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (MODIFIERS[tok]) {
			modifiers.push(MODIFIERS[tok]);
			used[i] = true;
		}
	});

	const leftoverRaw = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (STOP_WORDS.has(tok)) return;
		if (/^\d+$/.test(tok)) return;
		const movMatch = MOVEMENTS.find(([key]) => key === tok);
		leftoverRaw.push(movMatch ? movMatch[1] : (EXTRA_WORDS[tok] || tok));
	});
	const leftover = [...new Set(leftoverRaw)];

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

	const secondaryBlocks = [];
	if (postures.length) secondaryBlocks.push(joinDedup(postures));
	if (grips.length) secondaryBlocks.push(joinDedup(grips));
	if (modifiers.length) secondaryBlocks.push(joinDedup(modifiers));
	if (!leftoverConsumed && leftover.length) {
		secondaryBlocks.push(leftover.join(" "));
	}

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

	let result = mainBlock || (leftover.length ? leftover.join(" ") : "");
	if (filteredSecondary.length) {
		result = result
			? result + ", " + filteredSecondary.join(", ")
			: filteredSecondary.join(", ");
	}
	if (!result) result = slug;

	result = result.replace(/\s+/g, " ").trim();
	if (result.length) result = result[0].toUpperCase() + result.slice(1);
	return result;
}

module.exports = { translateSlug };
