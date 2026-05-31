/**
 * French (Français) translation module for exercise slugs.
 *
 * Composition order:
 *   [MOVEMENT] [VARIANT] [EQUIPMENT], [POSTURE], [GRIP], [MODIFIERS]
 *
 * Examples:
 *   barbell-bench-press                -> Développé couché à la barre
 *   cable-seated-close-grip-row        -> Rowing à la poulie, assis, prise serrée
 *   dumbbell-standing-lateral-raise    -> Élévation latérale aux haltères, debout
 */

const STOP_WORDS = new Set(["a", "the", "an", "v", "male", "female", "pov", "side-pov", "back-pov", "front-pov", "version", "of", "and", "to", "in", "from", "into", "both", "on", "with", "for", "at", "by", "its", "all", "between", "can", "get", "plus", "self", "pro"]);

// ─────────────────────────────────────────────────────────────
// MOVEMENTS
// ─────────────────────────────────────────────────────────────
const MOVEMENTS = [
	// Bench press family
	["close-grip-bench-press", "Développé couché prise serrée"],
	["incline-bench-press", "Développé incliné"],
	["decline-bench-press", "Développé décliné"],
	["bench-press", "Développé couché"],
	["chest-press", "Presse pectorale"],
	["floor-press", "Développé au sol"],
	// Overhead press
	["overhead-press", "Développé militaire"],
	["military-press", "Développé militaire"],
	["shoulder-press", "Développé épaules"],
	["push-press", "Push Press"],
	["arnold-press", "Arnold Press"],
	["behind-neck-press", "Développé nuque"],
	// Triceps
	["skull-crusher", "Barre au front"],
	["skull-crushers", "Barre au front"],
	["lying-triceps-extension", "Extension triceps couché"],
	["overhead-triceps-extension", "Extension triceps au-dessus de la tête"],
	["triceps-extension", "Extension triceps"],
	["triceps-pushdown", "Pushdown triceps"],
	["triceps-kickback", "Kickback triceps"],
	// Squats
	["front-squat", "Squat avant"],
	["back-squat", "Squat"],
	["goblet-squat", "Goblet Squat"],
	["sissy-squat", "Sissy Squat"],
	["split-squat", "Split Squat"],
	["squat", "Squat"],
	// Deadlifts
	["sumo-deadlift", "Soulevé de terre sumo"],
	["romanian-deadlift", "Soulevé de terre roumain"],
	["stiff-leg-deadlift", "Soulevé de terre jambes tendues"],
	["deadlift", "Soulevé de terre"],
	["rack-pull", "Rack Pull"],
	// Rows
	["bent-over-row", "Rowing penché"],
	["upright-row", "Rowing menton"],
	["cable-row", "Rowing à la poulie"],
	["t-bar-row", "Rowing T-barre"],
	["pendlay-row", "Rowing Pendlay"],
	["one-arm-row", "Rowing un bras"],
	["row", "Rowing"],
	// Pull-ups / Chin-ups
	["pull-up", "Traction"],
	["pull-ups", "Tractions"],
	["chin-up", "Traction supination"],
	["chin-ups", "Tractions supination"],
	["muscle-up", "Muscle-up"],
	["lat-pulldown", "Tirage vertical"],
	["pulldown", "Tirage vertical"],
	// Curls
	["hammer-curl", "Curl marteau"],
	["hammer-curls", "Curl marteau"],
	["preacher-curl", "Curl au pupitre"],
	["concentration-curl", "Curl concentration"],
	["spider-curl", "Spider Curl"],
	["drag-curl", "Drag Curl"],
	["reverse-curl", "Curl inversé"],
	["zottman-curl", "Curl Zottman"],
	["wrist-curl", "Curl de poignet"],
	["biceps-curl", "Curl biceps"],
	["bicep-curl", "Curl biceps"],
	["curl", "Curl"],
	// Flyes
	["chest-fly", "Écarté"],
	["reverse-fly", "Écarté inversé"],
	["fly", "Écarté"],
	["flye", "Écarté"],
	// Raises
	["lateral-raise", "Élévation latérale"],
	["front-raise", "Élévation frontale"],
	["rear-delt-raise", "Élévation arrière"],
	["calf-raise", "Mollets"],
	["leg-raise", "Relevé de jambes"],
	["raise", "Élévation"],
	// Dips
	["chest-dip", "Dip pectoraux"],
	["triceps-dip", "Dip triceps"],
	["dip", "Dip"],
	["dips", "Dips"],
	// Push-ups
	["push-up", "Pompe"],
	["push-ups", "Pompes"],
	// Lunges
	["walking-lunge", "Fente en marchant"],
	["reverse-lunge", "Fente arrière"],
	["lunge", "Fente"],
	["lunges", "Fentes"],
	// Hip thrust / bridge
	["hip-thrust", "Hip Thrust"],
	["glute-bridge", "Pont fessier"],
	// Plank
	["side-plank", "Planche latérale"],
	["plank", "Planche"],
	// Crunch / Sit-up
	["russian-twist", "Russian Twist"],
	["bicycle-crunch", "Crunch vélo"],
	["crunch", "Crunch"],
	["sit-up", "Sit-up"],
	["v-up", "V-Up"],
	// Leg work
	["leg-press", "Presse à cuisses"],
	["leg-extension", "Extension de jambes"],
	["leg-curl", "Leg Curl"],
	["hip-abduction", "Abduction de hanche"],
	["hip-adduction", "Adduction de hanche"],
	["step-up", "Step-up"],
	// Compound / Olympic
	["clean-and-press", "Épaulé-jeté"],
	["power-clean", "Power Clean"],
	["hang-clean", "Hang Clean"],
	["clean", "Épaulé"],
	["snatch", "Arraché"],
	["thruster", "Thruster"],
	// Back
	["hyperextension", "Hyperextension"],
	["back-extension", "Extension lombaire"],
	["good-morning", "Good Morning"],
	["pullover", "Pullover"],
	["face-pull", "Face Pull"],
	["shrug", "Haussement d'épaules"],
	// Cardio / plyo
	["burpee", "Burpee"],
	["mountain-climber", "Mountain Climber"],
	["box-jump", "Box Jump"],
	["jump-rope", "Corde à sauter"],
	["jumping-jack", "Jumping Jack"],
	["high-knee", "Genoux hauts"],
	// Rotations (word order fix)
	["cable-seated-shoulder-internal-rotation", "Rotation interne d'épaule à la poulie, assis"],
	["cable-standing-shoulder-external-rotation", "Rotation externe d'épaule à la poulie, debout"],
	["dumbbell-lying-external-shoulder-rotation", "Rotation externe d'épaule aux haltères, couché"],
	["dumbbell-upright-shoulder-external-rotation", "Rotation externe d'épaule aux haltères, debout"],
	["band-lying-hip-internal-rotation", "Rotation interne de hanche à l'élastique, couché"],
	["band-seated-hip-internal-rotation", "Rotation interne de hanche à l'élastique, assis"],
	// Pelvic tilt
	["pelvic-tilt-into-bridge", "Bascule du bassin vers le pont"],
	["pelvic-tilt", "Bascule du bassin"],
	["standing-pelvic-tilt", "Bascule du bassin, debout"],
	// Spine twist
	["spine-twist", "Rotation de la colonne"],
	// Crab twist
	["crab-twist-toe-touch", "Toucher d'orteils en crabe avec rotation"],
	// Kettlebell specifics
	["kettlebell-swing", "Swing Kettlebell"],
	["turkish-get-up", "Turkish Get-up"],
	["windmill", "Windmill"],
	// Stretches
	["stretch", "Étirement"],
	["stretching", "Étirement"],
	// Generic
	["press", "Développé"],
	["extension", "Extension"],
	["raises", "Élévations"],
];

// ─────────────────────────────────────────────────────────────
// VARIANTS
// ─────────────────────────────────────────────────────────────
const VARIANTS = {
	hammer: "marteau",
	preacher: "au pupitre",
	concentration: "concentration",
	spider: "spider",
	drag: "drag",
	reverse: "inversé",
	zottman: "Zottman",
	incline: "incliné",
	decline: "décliné",
	overhead: "au-dessus de la tête",
	arnold: "Arnold",
	bradford: "Bradford",
	scott: "Scott",
	cuban: "cubain",
	pendlay: "Pendlay",
	hindu: "hindou",
	sumo: "sumo",
	bulgarian: "bulgare",
	romanian: "roumain",
	goblet: "goblet",
	pistol: "pistol",
	sissy: "sissy",
	superman: "superman",
	russian: "russe",
	nordic: "nordique",
	french: "français",
};

// ─────────────────────────────────────────────────────────────
// EQUIPMENT
// ─────────────────────────────────────────────────────────────
const EQUIPMENT = {
	barbell: "à la barre",
	dumbbell: "aux haltères",
	dumbbells: "aux haltères",
	cable: "à la poulie",
	cables: "aux poulies",
	machine: "à la machine",
	smith: "au Smith",
	"ez-bar": "à la barre EZ",
	"ez-barbell": "à la barre EZ",
	kettlebell: "au kettlebell",
	kettlebells: "aux kettlebells",
	lever: "à la machine",
	bodyweight: "au poids du corps",
	band: "à l'élastique",
	bands: "aux élastiques",
	"resistance-band": "à l'élastique",
	rope: "à la corde",
	"v-bar": "barre en V",
	"straight-bar": "barre droite",
	"medicine-ball": "au médecine-ball",
	"exercise-ball": "sur Swiss ball",
	"stability-ball": "sur Swiss ball",
	"swiss-ball": "sur Swiss ball",
	"bosu-ball": "sur Bosu",
	sled: "au traîneau",
	landmine: "à la landmine",
	"trap-bar": "à la trap bar",
};

// ─────────────────────────────────────────────────────────────
// POSTURE
// ─────────────────────────────────────────────────────────────
const POSTURE = {
	standing: "debout",
	seated: "assis",
	sitting: "assis",
	lying: "couché",
	"side-lying": "couché sur le côté",
	kneeling: "à genoux",
	prone: "à plat ventre",
	supine: "sur le dos",
	incline: "incliné",
	decline: "décliné",
	flat: "à plat",
	side: "latéral",
	hanging: "suspendu",
};

// ─────────────────────────────────────────────────────────────
// GRIPS
// ─────────────────────────────────────────────────────────────
const GRIPS = {
	"close-grip": "prise serrée",
	"wide-grip": "prise large",
	"narrow-grip": "prise serrée",
	"medium-grip": "prise moyenne",
	"reverse-grip": "prise supination",
	"neutral-grip": "prise neutre",
	"hammer-grip": "prise marteau",
	"underhand-grip": "prise supination",
	"overhand-grip": "prise pronation",
	"supinated-grip": "prise supination",
	"pronated-grip": "prise pronation",
	"mixed-grip": "prise mixte",
};

// ─────────────────────────────────────────────────────────────
// MODIFIERS
// ─────────────────────────────────────────────────────────────
const MODIFIERS = {
	"one-arm": "un bras",
	"two-arm": "deux bras",
	"single-arm": "un bras",
	"single-leg": "une jambe",
	"one-leg": "une jambe",
	alternating: "alterné",
	alternate: "alterné",
	weighted: "lesté",
	assisted: "assisté",
	"bent-over": "penché",
	"bent-knee": "genou fléchi",
	"straight-leg": "jambe tendue",
	"straight-arm": "bras tendu",
	"stiff-leg": "jambes tendues",
	"legs-up": "jambes levées",
	"feet-elevated": "pieds surélevés",
	twisting: "avec rotation",
	"cross-body": "croisé",
	"full-range": "amplitude complète",
	"with-rope": "à la corde",
	"with-towel": "avec serviette",
	suspended: "suspendu",
	wide: "large",
	narrow: "serré",
	high: "haut",
	low: "bas",
	front: "avant",
	rear: "arrière",
};

// ─────────────────────────────────────────────────────────────
// EXTRA WORDS
// ─────────────────────────────────────────────────────────────
const EXTRA_WORDS = {
	chest: "poitrine",
	back: "dos",
	shoulder: "épaule",
	shoulders: "épaules",
	arm: "bras",
	arms: "bras",
	leg: "jambe",
	legs: "jambes",
	hip: "hanche",
	hips: "hanches",
	knee: "genou",
	ankle: "cheville",
	wrist: "poignet",
	elbow: "coude",
	neck: "cou",
	spine: "colonne",
	core: "gainage",
	abs: "abdominaux",
	glute: "fessier",
	glutes: "fessiers",
	quad: "quadriceps",
	quads: "quadriceps",
	hamstring: "ischio-jambier",
	hamstrings: "ischio-jambiers",
	calf: "mollet",
	calves: "mollets",
	biceps: "biceps",
	triceps: "triceps",
	forearm: "avant-bras",
	forearms: "avant-bras",
	lats: "dorsaux",
	traps: "trapèzes",
	delts: "épaules",
	ball: "ballon",
	bench: "banc",
	floor: "sol",
	wall: "mur",
	box: "box",
	bridge: "pont",
	step: "marche",
	rope: "corde",
	bar: "barre",
	grip: "prise",
	roller: "rouleau",
	wheel: "roue",
	kick: "coup de pied",
	twist: "rotation",
	push: "poussée",
	pull: "tirage",
	hold: "maintien",
	squat: "squat",
	deadlift: "soulevé de terre",


	// ─── AUTO-GENERATED TRANSLATIONS ───
	hand: "main",
	hands: "mains",
	legged: "jambe",
	knees: "genoux",
	toe: "orteils",
	heel: "talon",
	head: "tête",
	chin: "menton",
	feet: "pieds",
	ankles: "chevilles",
	finger: "doigt",
	palm: "paume",
	palms: "paumes",
	butt: "fessiers",
	groin: "aine",
	gluteus: "fessier",
	pec: "pectoral",
	pectoralis: "pectoral",
	delt: "deltoïde",
	deltoid: "deltoïde",
	bicep: "biceps",
	tricep: "triceps",
	lat: "dorsal",
	trap: "trapèze",
	oblique: "oblique",
	ham: "ischio",
	femoral: "fémoral",
	femoris: "fémoral",
	rectus: "droit",
	tibialis: "tibial",
	peroneals: "péroniers",
	piriformis: "piriforme",
	abductor: "abducteur",
	adductor: "adducteur",
	abduction: "abduction",
	adduction: "adduction",
	flexor: "fléchisseur",
	retractor: "rétracteur",
	scapula: "omoplate",
	scapular: "scapulaire",
	posterior: "postérieur",
	forward: "avant",
	backward: "arrière",
	lateral: "latéral",
	behind: "derrière",
	above: "au-dessus",
	across: "croisé",
	inner: "intérieur",
	outer: "extérieur",
	inside: "intérieur",
	outside: "extérieur",
	upper: "supérieur",
	lower: "inférieur",
	middle: "milieu",
	left: "gauche",
	vertical: "vertical",
	horizontal: "horizontal",
	parallel: "parallèle",
	diagonal: "diagonal",
	upright: "debout",
	upward: "vers le haut",
	jump: "saut",
	jumps: "sauts",
	run: "course",
	walk: "marche",
	walking: "en marchant",
	climb: "grimper",
	crawl: "ramper",
	throw: "lancer",
	catch: "attraper",
	touch: "toucher",
	lift: "lever",
	lifting: "lever",
	drive: "poussée",
	slide: "glisser",
	sprint: "sprint",
	sprints: "sprints",
	carry: "porter",
	drag: "tirer",
	hops: "sauts",
	march: "marche",
	squeeze: "serrer",
	raise: "élévation",
	raises: "élévations",
	raised: "élevé",
	rotate: "rotation",
	rotation: "rotation",
	rotational: "rotatoire",
	rotary: "rotatoire",
	flexion: "flexion",
	extension: "extension",
	bend: "flexion",
	bends: "flexions",
	bent: "penché",
	pass: "passe",
	circles: "cercles",
	circular: "circulaire",
	kicks: "coups de pied",
	drop: "descente",
	flip: "retourner",
	tilt: "inclinaison",
	reach: "atteindre",
	release: "relâcher",
	tap: "toucher",
	planche: "planche",
	isometric: "isométrique",
	plyo: "plyo",
	dynamic: "dynamique",
	ballistic: "balistique",
	negative: "négatif",
	smith: "Smith",
	kettlebell: "kettlebell",
	ez: "EZ",
	medicine: "médecine",
	stability: "stabilité",
	resistance: "résistance",
	towel: "serviette",
	bars: "barres",
	attachment: "accessoire",
	pad: "coussin",
	platform: "plateforme",
	cage: "cage",
	board: "planche",
	tire: "pneu",
	strap: "sangle",
	straps: "sangles",
	ropes: "cordes",
	handle: "poignée",
	pulley: "poulie",
	landmine: "landmine",
	pin: "tige",
	stirrups: "étriers",
	trainer: "entraîneur",
	treadmill: "tapis de course",
	elliptical: "elliptique",
	ergometer: "ergomètre",
	stepmill: "stepmill",
	staircase: "escalier",
	gripper: "pince",
	iron: "fer",
	one: "un",
	two: "deux",
	single: "unilatéral",
	double: "double",
	half: "demi",
	full: "complet",
	deep: "profond",
	wide: "large",
	narrow: "serré",
	short: "court",
	high: "haut",
	low: "bas",
	quick: "rapide",
	slow: "lent",
	reverse: "inversé",
	reversed: "inversé",
	revers: "inversé",
	inverted: "inversé",
	inverse: "inverse",
	modified: "modifié",
	advanced: "avancé",
	basic: "basique",
	extended: "étendu",
	elevated: "surélevé",
	supported: "assisté",
	support: "appui",
	fixed: "fixe",
	stationary: "stationnaire",
	cross: "croisé",
	crossover: "croisé",
	crossovers: "croisés",
	over: "par-dessus",
	down: "vers le bas",
	up: "vers le haut",
	ups: "ups",
	out: "dehors",
	off: "hors",
	sit: "assis",
	anti: "anti",
	russian: "russe",
	military: "militaire",
	hammer: "marteau",
	spider: "spider",
	preacher: "pupitre",
	concentration: "concentration",
	sumo: "sumo",
	hindu: "hindou",
	turkish: "turc",
	korean: "coréen",
	cossack: "cosaque",
	zercher: "Zercher",
	gironda: "Gironda",
	janda: "Janda",
	thibaudeau: "Thibaudeau",
	donkey: "âne",
	pushdown: "tirage bas",
	kickback: "kickback",
	kickbacks: "kickbacks",
	hyperextension: "hyperextension",
	rollout: "rollout",
	rollerout: "rollout",
	blaster: "blaster",
	windmill: "moulin",
	superman: "superman",
	inchworm: "chenille",
	lunge: "fente",
	pike: "pike",
	tuck: "tuck",
	flag: "drapeau",
	handstand: "poirier",
	elevator: "ascenseur",
	sphinx: "sphinx",
	cocoons: "cocon",
	bike: "vélo",
	cycle: "vélo",
	air: "air",
	exercise: "exercice",
	motion: "mouvement",
	stance: "position",
	position: "position",
	pose: "pose",
	stretch: "étirement",
	straight: "droit",
	angle: "angle",
	angled: "incliné",
	power: "puissance",
	speed: "vitesse",
	hang: "suspension",
	dead: "mort",
	bug: "bug",
	star: "étoile",
	frog: "grenouille",
	cat: "chat",
	dog: "chien",
	cobra: "cobra",
	bear: "ours",
	gorilla: "gorille",
	crab: "crabe",
	butterfly: "papillon",
	swimmer: "nageur",
	skater: "patineur",
	archer: "archer",
	jerk: "jeté",
	against: "contre",
	through: "à travers",
	around: "autour",
	apart: "écartées",
	chair: "chaise",
	ground: "sol",
	figure: "figure",
	reps: "répétitions",
	jack: "jack",
	slam: "slam",
	ab: "abdo",
	abdominal: "abdominal",
	astride: "à califourchon",
	balance: "équilibre",
	battling: "combat",
	benches: "bancs",
	big: "grand",
	body: "corps",
	bottoms: "bas",
	bowling: "bowling",
	boxing: "boxe",
	breeding: "écart",
	cambered: "cambré",
	captains: "capitaine",
	caster: "roulette",
	clap: "claquement",
	clasped: "jointes",
	clock: "horloge",
	closer: "rapproché",
	contralateral: "controlatéral",
	crunches: "crunchs",
	crusher: "écraseur",
	curtsey: "révérence",
	degrees: "degrés",
	depresor: "dépresseur",
	depth: "profondeur",
	diamond: "diamant",
	equipment: "équipement",
	external: "externe",
	facing: "face",
	fallout: "fallout",
	farmers: "fermier",
	flutter: "battement",
	flyes: "écartés",
	forth: "avant",
	fours: "quatre pattes",
	frankenstein: "Frankenstein",
	gravity: "gravité",
	greatest: "plus grand",
	gripless: "sans prise",
	guillotine: "guillotine",
	hook: "crochet",
	hug: "étreinte",
	hyght: "Hyght",
	hyper: "hyper",
	impossible: "impossible",
	intermediate: "intermédiaire",
	internal: "interne",
	jackknife: "couteau",
	jm: "JM",
	judo: "judo",
	kayak: "kayak",
	keens: "genoux",
	kipping: "kipping",
	knife: "couteau",
	lean: "incliné",
	lying: "couché",
	machine: "machine",
	major: "majeur",
	maltese: "maltais",
	monster: "monstre",
	multiple: "multiple",
	neutral: "neutre",
	olympic: "olympique",
	otis: "Otis",
	outstretched: "tendus",
	overhand: "pronation",
	pallof: "Pallof",
	peacher: "pupitre",
	pelvic: "pelvien",
	pirate: "pirate",
	pistol: "pistol",
	point: "pointe",
	potty: "pot",
	presses: "développés",
	prisoner: "prisonnier",
	pronate: "pronation",
	pronated: "en pronation",
	pronation: "pronation",
	pulldown: "tirage",
	pyramid: "pyramide",
	quarter: "quart",
	range: "amplitude",
	reclining: "incliné",
	renegade: "renégat",
	response: "réponse",
	rocking: "balancement",
	rocky: "Rocky",
	rollerer: "rouleau",
	round: "rond",
	row: "tirage",
	runners: "coureur",
	saw: "scie",
	scissor: "ciseaux",
	seesaw: "bascule",
	semi: "semi",
	sequence: "séquence",
	side: "côté",
	sitted: "assis",
	ski: "ski",
	skier: "skieur",
	skin: "peau",
	skull: "crâne",
	skullcrusher: "barre au front",
	sledge: "traîneau",
	slingers: "fronde",
	spell: "sort",
	squad: "équipe",
	squats: "squats",
	squatting: "en squat",
	stabilization: "stabilisation",
	stalder: "Stalder",
	stepbox: "step",
	sternum: "sternum",
	stork: "cigogne",
	straddle: "écart",
	stride: "foulée",
	style: "style",
	supinated: "en supination",
	supination: "supination",
	supper: "supper",
	svend: "Svend",
	sz: "EZ",
	tate: "Tate",
	tennis: "tennis",
	three: "trois",
	thrusts: "poussées",
	touchers: "touches",
	twin: "jumeau",
	twisted: "tordu",
	twists: "torsions",
	under: "sous",
	underhand: "supination",
	unilateral: "unilatéral",
	variation: "variante",
	waiter: "serveur",
	wind: "vent",
	wipers: "essuie-glaces",
	world: "monde",
	yoga: "yoga",
	curl: "curl",
	press: "développé",
	swing: "balancé",
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
