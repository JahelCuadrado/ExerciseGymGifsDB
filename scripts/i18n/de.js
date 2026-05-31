/**
 * German (Deutsch) translation module for exercise slugs.
 *
 * Composition order for German exercise names:
 *   [MOVEMENT] [VARIANT] [EQUIPMENT], [POSTURE], [GRIP], [MODIFIERS]
 *
 * Examples:
 *   barbell-bench-press            -> Bankdrücken mit Langhantel
 *   cable-seated-close-grip-row    -> Rudern am Kabelzug, sitzend, mit engem Griff
 *   dumbbell-standing-curl         -> Bizepscurl mit Kurzhantel, stehend
 */

// ─────────────────────────────────────────────────────────────
// STOP WORDS (filtered from output)
// ─────────────────────────────────────────────────────────────
const STOP_WORDS = new Set(["a", "the", "an", "v", "male", "female", "pov", "side-pov", "back-pov", "front-pov", "version", "of", "and", "to", "in", "from", "into", "both", "on", "with", "for", "at", "by", "its", "all", "between", "can", "get", "plus", "self", "pro"]);

// ─────────────────────────────────────────────────────────────
// MOVEMENTS (multi-word phrases first for priority matching)
// ─────────────────────────────────────────────────────────────
const MOVEMENTS = [
	// Bench press family
	["barbell-guillotine-bench-press", "Guillotine-Bankdrücken mit Langhantel"],
	["close-grip-bench-press", "Bankdrücken mit engem Griff"],
	["incline-bench-press", "Schrägbankdrücken"],
	["decline-bench-press", "Negativ-Bankdrücken"],
	["bench-press", "Bankdrücken"],
	["chest-press", "Brustpresse"],
	["floor-press", "Bodendrücken"],
	// Overhead press
	["overhead-press", "Überkopfdrücken"],
	["military-press", "Military Press"],
	["shoulder-press", "Schulterdrücken"],
	["push-press", "Push Press"],
	["arnold-press", "Arnold Press"],
	["behind-neck-press", "Nackendrücken"],
	// Skull crusher / extensions
	["skull-crusher", "Skull Crusher"],
	["skull-crushers", "Skull Crusher"],
	["lying-triceps-extension", "Liegende Trizeps-Extension"],
	["overhead-triceps-extension", "Trizeps-Extension über Kopf"],
	["triceps-extension", "Trizeps-Extension"],
	["triceps-pushdown", "Trizepsdrücken"],
	["triceps-kickback", "Trizeps-Kickback"],
	// Squats
	["front-squat", "Frontkniebeuge"],
	["back-squat", "Kniebeuge"],
	["goblet-squat", "Goblet Squat"],
	["sissy-squat", "Sissy Squat"],
	["split-squat", "Split Squat"],
	["squat", "Kniebeuge"],
	// Deadlifts
	["sumo-deadlift", "Sumo-Kreuzheben"],
	["romanian-deadlift", "Rumänisches Kreuzheben"],
	["stiff-leg-deadlift", "Kreuzheben mit gestreckten Beinen"],
	["deadlift", "Kreuzheben"],
	["rack-pull", "Rack Pull"],
	// Rows
	["bent-over-row", "Vorgebeugtes Rudern"],
	["upright-row", "Aufrechtes Rudern"],
	["cable-row", "Rudern am Kabelzug"],
	["t-bar-row", "T-Bar Rudern"],
	["pendlay-row", "Pendlay Rudern"],
	["one-arm-row", "Einarmiges Rudern"],
	["row", "Rudern"],
	// Pull-ups / Chin-ups
	["pull-up", "Klimmzug"],
	["pull-ups", "Klimmzüge"],
	["chin-up", "Klimmzug im Untergriff"],
	["chin-ups", "Klimmzüge im Untergriff"],
	["muscle-up", "Muscle-up"],
	["lat-pulldown", "Latzug"],
	["pulldown", "Latzug"],
	// Curls
	["hammer-curl", "Hammercurl"],
	["hammer-curls", "Hammercurls"],
	["preacher-curl", "Preacher Curl"],
	["concentration-curl", "Konzentrationscurl"],
	["spider-curl", "Spider Curl"],
	["drag-curl", "Drag Curl"],
	["reverse-curl", "Reverse Curl"],
	["incline-curl", "Schrägcurl"],
	["decline-curl", "Negativcurl"],
	["zottman-curl", "Zottman Curl"],
	["wrist-curl", "Handgelenkcurl"],
	["biceps-curl", "Bizepscurl"],
	["bicep-curl", "Bizepscurl"],
	["curl", "Curl"],
	// Flyes
	["chest-fly", "Fliegende"],
	["reverse-fly", "Reverse Fly"],
	["fly", "Fliegende"],
	["flye", "Fliegende"],
	// Raises
	["lateral-raise", "Seitheben"],
	["front-raise", "Frontheben"],
	["rear-delt-raise", "Reverse Flys"],
	["calf-raise", "Wadenheben"],
	["knee-raise", "Knieheben"],
	["shoulder-raise", "Schulterheben"],
	["leg-raise", "Beinheben"],
	["raise", "Heben"],
	// Dips
	["chest-dip", "Dip für die Brust"],
	["triceps-dip", "Trizeps-Dip"],
	["dip", "Dip"],
	["dips", "Dips"],
	// Push-ups
	["push-up", "Liegestütz"],
	["push-ups", "Liegestütze"],
	// Lunges
	["walking-lunge", "Ausfallschritt im Gehen"],
	["reverse-lunge", "Reverse Ausfallschritt"],
	["lunge", "Ausfallschritt"],
	["lunges", "Ausfallschritte"],
	// Hip thrust / bridge
	["hip-thrust", "Hip Thrust"],
	["glute-bridge", "Glute Bridge"],
	// Plank
	["side-plank", "Seitliche Planke"],
	["plank", "Planke"],
	// Crunch / Sit-up
	["russian-twist", "Russian Twist"],
	["bicycle-crunch", "Fahrrad-Crunch"],
	["crunch", "Crunch"],
	["sit-up", "Sit-up"],
	["v-up", "V-Up"],
	// Leg work
	["leg-press", "Beinpresse"],
	["leg-extension", "Beinstrecken"],
	["leg-curl", "Beinbeugen"],
	["hip-abduction", "Hüftabduktion"],
	["hip-adduction", "Hüftadduktion"],
	["step-up", "Step-up"],
	// Compound / Olympic
	["clean-and-press", "Clean and Press"],
	["power-clean", "Power Clean"],
	["hang-clean", "Hang Clean"],
	["clean", "Clean"],
	["snatch", "Snatch"],
	["thruster", "Thruster"],
	// Back
	["hyperextension", "Hyperextension"],
	["back-extension", "Rückenstrecker"],
	["good-morning", "Good Morning"],
	["pullover", "Pullover"],
	["face-pull", "Face Pull"],
	["shrug", "Schulterheben"],
	// Cardio / plyo
	["burpee", "Burpee"],
	["mountain-climber", "Mountain Climber"],
	["box-jump", "Box Jump"],
	["jump-rope", "Seilspringen"],
	["jumping-jack", "Hampelmann"],
	["high-knee-against-wall", "Knieheben gegen die Wand"],
	["high-knee", "Knieheben"],
	["cycle-cross-trainer", "Fahrrad-Crosstrainer"],
	["walk-elliptical-cross-trainer", "Gehen auf dem Crosstrainer"],
	["pelvic-tilt-into-bridge", "Beckenkippen zur Brücke"],
	["pelvic-tilt", "Beckenkippen"],
	// Kettlebell specifics
	["kettlebell-swing", "Kettlebell Swing"],
	["turkish-get-up", "Turkish Get-up"],
	["windmill", "Windmill"],
	// Stretches
	["stretch", "Dehnung"],
	["stretching", "Dehnung"],
	// Generic
	["press", "Drücken"],
	["extension", "Extension"],
	["fly", "Fliegende"],
];

// ─────────────────────────────────────────────────────────────
// VARIANTS
// ─────────────────────────────────────────────────────────────
const VARIANTS = {
	hammer: "Hammer-",
	preacher: "Preacher-",
	concentration: "Konzentrations-",
	spider: "Spider-",
	drag: "Drag-",
	reverse: "Reverse-",
	zottman: "Zottman-",
	incline: "Schräg-",
	decline: "Negativ-",
	overhead: "Überkopf-",
	arnold: "Arnold-",
	bradford: "Bradford-",
	scott: "Scott-",
	cuban: "Kubanisch",
	pendlay: "Pendlay-",
	hindu: "Hindu-",
	sumo: "Sumo-",
	bulgarian: "Bulgarisch",
	romanian: "Rumänisch",
	goblet: "Goblet-",
	pistol: "Pistol-",
	sissy: "Sissy-",
	superman: "Superman-",
	russian: "Russisch",
	nordic: "Nordisch",
	french: "Französisch",
};

// ─────────────────────────────────────────────────────────────
// EQUIPMENT
// ─────────────────────────────────────────────────────────────
const EQUIPMENT = {
	barbell: "mit Langhantel",
	dumbbell: "mit Kurzhantel",
	dumbbells: "mit Kurzhanteln",
	cable: "am Kabelzug",
	cables: "am Kabelzug",
	machine: "an der Maschine",
	smith: "an der Smith-Maschine",
	"ez-bar": "mit SZ-Stange",
	"ez-barbell": "mit SZ-Stange",
	kettlebell: "mit Kettlebell",
	kettlebells: "mit Kettlebells",
	lever: "an der Maschine",
	bodyweight: "mit Körpergewicht",
	band: "mit Widerstandsband",
	bands: "mit Widerstandsbändern",
	"resistance-band": "mit Widerstandsband",
	rope: "mit Seil",
	"v-bar": "mit V-Griff",
	"straight-bar": "mit geradem Griff",
	"medicine-ball": "mit Medizinball",
	"exercise-ball": "auf dem Fitnessball",
	"stability-ball": "auf dem Fitnessball",
	"swiss-ball": "auf dem Fitnessball",
	"bosu-ball": "auf dem Bosu-Ball",
	sled: "am Schlitten",
	landmine: "an der Landmine",
	"trap-bar": "mit Trap-Bar",
};

// ─────────────────────────────────────────────────────────────
// POSTURE
// ─────────────────────────────────────────────────────────────
const POSTURE = {
	standing: "stehend",
	seated: "sitzend",
	sitting: "sitzend",
	lying: "liegend",
	"side-lying": "seitlich liegend",
	kneeling: "kniend",
	prone: "in Bauchlage",
	supine: "in Rückenlage",
	incline: "Schrägbank",
	decline: "Negativbank",
	flat: "flach",
	side: "seitlich",
	hanging: "hängend",
};

// ─────────────────────────────────────────────────────────────
// GRIPS
// ─────────────────────────────────────────────────────────────
const GRIPS = {
	"close-grip": "mit engem Griff",
	"wide-grip": "mit weitem Griff",
	"narrow-grip": "mit engem Griff",
	"medium-grip": "mit mittlerem Griff",
	"reverse-grip": "im Untergriff",
	"neutral-grip": "im Neutralgriff",
	"hammer-grip": "im Hammergriff",
	"underhand-grip": "im Untergriff",
	"overhand-grip": "im Obergriff",
	"supinated-grip": "im Untergriff",
	"pronated-grip": "im Obergriff",
	"mixed-grip": "mit Kreuzgriff",
};

// ─────────────────────────────────────────────────────────────
// MODIFIERS
// ─────────────────────────────────────────────────────────────
const MODIFIERS = {
	"one-arm": "einarmig",
	"two-arm": "beidarmig",
	"single-arm": "einarmig",
	"single-leg": "einbeinig",
	"one-leg": "einbeinig",
	alternating: "alternierend",
	alternate: "alternierend",
	weighted: "mit Zusatzgewicht",
	assisted: "unterstützt",
	"bent-over": "vorgebeugt",
	"bent-knee": "mit gebeugtem Knie",
	"straight-leg": "mit gestrecktem Bein",
	"straight-arm": "mit gestrecktem Arm",
	"stiff-leg": "mit gestreckten Beinen",
	"legs-up": "mit erhobenen Beinen",
	"feet-elevated": "mit erhöhten Füßen",
	twisting: "mit Rotation",
	"cross-body": "überkreuz",
	"full-range": "im vollen Bewegungsumfang",
	"with-rope": "mit Seil",
	"with-towel": "mit Handtuch",
	suspended: "hängend",
	wide: "weit",
	narrow: "eng",
	high: "hoch",
	low: "tief",
	front: "vorne",
	rear: "hinten",
};

// ─────────────────────────────────────────────────────────────
// EXTRA WORDS (fallback dictionary for unknown tokens)
// ─────────────────────────────────────────────────────────────
const EXTRA_WORDS = {
	chest: "Brust",
	back: "Rücken",
	shoulder: "Schulter",
	shoulders: "Schultern",
	arm: "Arm",
	arms: "Arme",
	leg: "Bein",
	legs: "Beine",
	hip: "Hüfte",
	hips: "Hüften",
	knee: "Knie",
	ankle: "Knöchel",
	wrist: "Handgelenk",
	elbow: "Ellbogen",
	neck: "Nacken",
	spine: "Wirbelsäule",
	core: "Rumpf",
	abs: "Bauch",
	glute: "Gesäß",
	glutes: "Gesäßmuskulatur",
	quad: "Quadrizeps",
	quads: "Quadrizeps",
	hamstring: "Beinbeuger",
	hamstrings: "Beinbeuger",
	calf: "Wade",
	calves: "Waden",
	biceps: "Bizeps",
	triceps: "Trizeps",
	forearm: "Unterarm",
	forearms: "Unterarme",
	pectoral: "Brust",
	lats: "Latissimus",
	traps: "Trapezius",
	deltoid: "Deltoid",
	delts: "Schultern",
	rotator: "Rotator",
	adductor: "Adduktor",
	abductor: "Abduktor",
	tibialis: "Schienbein",
	piriformis: "Piriformis",
	// Common words
	ball: "Ball",
	bench: "Bank",
	floor: "Boden",
	wall: "Wand",
	box: "Box",
	step: "Stufe",
	rope: "Seil",
	ring: "Ring",
	bar: "Stange",
	grip: "Griff",
	handle: "Griff",
	pad: "Polster",
	roller: "Rolle",
	wheel: "Rad",
	band: "Band",
	circle: "Kreis",
	circles: "Kreise",
	kick: "Tritt",
	punch: "Schlag",
	twist: "Drehung",
	rotation: "Rotation",
	slide: "Gleiten",
	push: "Drücken",
	pull: "Ziehen",
	hold: "Halten",
	squat: "Kniebeuge",
	deadlift: "Kreuzheben",
	straight: "gestreckt",
	lying: "liegend",
	rear: "hintere",
	full: "voll",


	// ─── AUTO-GENERATED TRANSLATIONS ───
	hand: "Hand",
	hands: "Hände",
	legged: "beinig",
	knees: "Knie",
	toe: "Zehen",
	heel: "Ferse",
	head: "Kopf",
	chin: "Kinn",
	feet: "Füße",
	ankles: "Knöchel",
	finger: "Finger",
	palm: "Handfläche",
	palms: "Handflächen",
	butt: "Gesäß",
	groin: "Leiste",
	gluteus: "Gesäß",
	pec: "Brust",
	pectoralis: "Brustmuskel",
	delt: "Schulter",
	bicep: "Bizeps",
	tricep: "Trizeps",
	lat: "Lat",
	trap: "Trapez",
	oblique: "schräger Bauchmuskel",
	ham: "Beinbeuger",
	femoral: "Oberschenkel",
	femoris: "Oberschenkel",
	rectus: "Rectus",
	peroneals: "Peronäus",
	abduction: "Abduktion",
	adduction: "Adduktion",
	flexor: "Beuger",
	retractor: "Retraktor",
	scapula: "Schulterblatt",
	scapular: "Schulterblatt",
	posterior: "hintere",
	forward: "vorwärts",
	backward: "rückwärts",
	lateral: "seitlich",
	behind: "hinter",
	above: "über",
	across: "quer",
	inner: "innere",
	outer: "äußere",
	inside: "innen",
	outside: "außen",
	upper: "obere",
	lower: "untere",
	middle: "mittlere",
	left: "links",
	vertical: "vertikal",
	horizontal: "horizontal",
	parallel: "parallel",
	diagonal: "diagonal",
	upright: "aufrecht",
	upward: "aufwärts",
	jump: "Sprung",
	jumps: "Sprünge",
	run: "Lauf",
	walk: "Gehen",
	walking: "gehend",
	climb: "Klettern",
	crawl: "Krabbeln",
	throw: "Wurf",
	catch: "Fangen",
	touch: "Berührung",
	lift: "Heben",
	lifting: "Heben",
	drive: "Antrieb",
	sprint: "Sprint",
	sprints: "Sprints",
	carry: "Tragen",
	drag: "Ziehen",
	hops: "Hüpfer",
	march: "Marsch",
	squeeze: "Drücken",
	raise: "Heben",
	raises: "Heben",
	raised: "erhöht",
	rotate: "Rotation",
	rotational: "rotierend",
	rotary: "Rotation",
	flexion: "Beugung",
	extension: "Extension",
	bend: "Beugung",
	bends: "Beugungen",
	bent: "gebeugt",
	pass: "Pass",
	circular: "kreisförmig",
	kicks: "Tritte",
	drop: "Absenken",
	flip: "Umdrehen",
	tilt: "Neigung",
	reach: "Reichweite",
	release: "loslassen",
	tap: "Tippen",
	planche: "Planche",
	isometric: "isometrisch",
	plyo: "Plyo",
	dynamic: "dynamisch",
	ballistic: "ballistisch",
	negative: "negativ",
	smith: "Smith",
	kettlebell: "Kettlebell",
	ez: "SZ",
	medicine: "Medizin",
	stability: "Stabilitäts",
	resistance: "Widerstands",
	towel: "Handtuch",
	bars: "Barren",
	attachment: "Aufsatz",
	platform: "Plattform",
	cage: "Käfig",
	board: "Brett",
	tire: "Reifen",
	strap: "Gurt",
	straps: "Gurte",
	ropes: "Seile",
	pulley: "Seilzug",
	landmine: "Landmine",
	pin: "Stift",
	stirrups: "Steigbügel",
	trainer: "Trainer",
	treadmill: "Laufband",
	elliptical: "Crosstrainer",
	ergometer: "Ergometer",
	stepmill: "Stepmill",
	staircase: "Treppe",
	gripper: "Handtrainer",
	iron: "Eisen",
	one: "ein",
	two: "zwei",
	single: "einzel",
	double: "doppelt",
	half: "halb",
	deep: "tief",
	wide: "weit",
	narrow: "eng",
	short: "kurz",
	high: "hoch",
	low: "tief",
	quick: "schnell",
	slow: "langsam",
	reverse: "Reverse",
	reversed: "umgekehrt",
	revers: "Reverse",
	inverted: "invertiert",
	inverse: "invers",
	modified: "modifiziert",
	advanced: "fortgeschritten",
	basic: "Grund",
	extended: "gestreckt",
	elevated: "erhöht",
	supported: "gestützt",
	support: "Stütze",
	fixed: "fixiert",
	stationary: "stationär",
	cross: "Kreuz",
	crossover: "Crossover",
	crossovers: "Crossovers",
	over: "über",
	down: "abwärts",
	up: "aufwärts",
	ups: "Ups",
	out: "aus",
	off: "ab",
	sit: "Sitz",
	anti: "Anti",
	russian: "Russisch",
	military: "Militär",
	hammer: "Hammer",
	spider: "Spider",
	preacher: "Preacher",
	concentration: "Konzentrations",
	sumo: "Sumo",
	hindu: "Hindu",
	turkish: "Türkisch",
	korean: "Koreanisch",
	cossack: "Kosaken",
	zercher: "Zercher",
	gironda: "Gironda",
	janda: "Janda",
	thibaudeau: "Thibaudeau",
	donkey: "Donkey",
	pushdown: "Drücken",
	kickback: "Kickback",
	kickbacks: "Kickbacks",
	hyperextension: "Hyperextension",
	rollout: "Rollout",
	rollerout: "Rollout",
	blaster: "Blaster",
	windmill: "Windmühle",
	superman: "Superman",
	inchworm: "Inchworm",
	lunge: "Ausfallschritt",
	pike: "Pike",
	tuck: "Tuck",
	flag: "Flagge",
	handstand: "Handstand",
	elevator: "Aufzug",
	sphinx: "Sphinx",
	cocoons: "Kokon",
	bike: "Rad",
	cycle: "Fahrrad",
	air: "Luft",
	exercise: "Übung",
	motion: "Bewegung",
	stance: "Stand",
	position: "Position",
	pose: "Pose",
	stretch: "Dehnung",
	angle: "Winkel",
	angled: "gewinkelt",
	power: "Power",
	speed: "Geschwindigkeit",
	hang: "Hang",
	dead: "tot",
	bug: "Bug",
	star: "Stern",
	frog: "Frosch",
	cat: "Katze",
	dog: "Hund",
	cobra: "Kobra",
	bear: "Bär",
	gorilla: "Gorilla",
	crab: "Krabbe",
	butterfly: "Schmetterling",
	swimmer: "Schwimmer",
	skater: "Skater",
	archer: "Bogenschütze",
	jerk: "Jerk",
	against: "gegen",
	through: "durch",
	around: "herum",
	apart: "auseinander",
	chair: "Stuhl",
	ground: "Boden",
	figure: "Figur",
	reps: "Wiederholungen",
	jack: "Jack",
	slam: "Slam",
	ab: "Bauch",
	abdominal: "Bauch",
	astride: "gegrätscht",
	balance: "Balance",
	battling: "Kampf",
	benches: "Bänke",
	big: "groß",
	body: "Körper",
	bottoms: "Boden",
	bowling: "Bowling",
	boxing: "Boxen",
	breeding: "Spreizen",
	cambered: "gebogen",
	captains: "Kapitäns",
	caster: "Roller",
	clap: "Klatschen",
	clasped: "gefaltet",
	clock: "Uhr",
	closer: "enger",
	contralateral: "kontralateral",
	crunches: "Crunches",
	crusher: "Crusher",
	curtsey: "Knicks",
	degrees: "Grad",
	depresor: "Depressor",
	depth: "Tiefe",
	diamond: "Diamant",
	equipment: "Gerät",
	external: "extern",
	facing: "zugewandt",
	fallout: "Fallout",
	farmers: "Farmers",
	flutter: "Flattern",
	flyes: "Flyes",
	forth: "vor",
	fours: "Vierfüßler",
	frankenstein: "Frankenstein",
	gravity: "Schwerkraft",
	greatest: "größte",
	gripless: "ohne Griff",
	guillotine: "Guillotine",
	hook: "Haken",
	hug: "Umarmung",
	hyght: "Hyght",
	hyper: "Hyper",
	impossible: "unmöglich",
	intermediate: "mittel",
	internal: "intern",
	jackknife: "Klappmesser",
	jm: "JM",
	judo: "Judo",
	kayak: "Kajak",
	keens: "Knie",
	kipping: "Kipping",
	knife: "Messer",
	lean: "geneigt",
	machine: "Maschine",
	major: "groß",
	maltese: "Malteser",
	monster: "Monster",
	multiple: "mehrfach",
	neutral: "neutral",
	olympic: "olympisch",
	otis: "Otis",
	outstretched: "ausgestreckt",
	overhand: "Obergriff",
	pallof: "Pallof",
	peacher: "Preacher",
	pelvic: "Becken",
	pirate: "Piraten",
	pistol: "Pistole",
	point: "Punkt",
	potty: "Potty",
	presses: "Drücken",
	prisoner: "Gefangener",
	pronate: "Pronation",
	pronated: "proniert",
	pronation: "Pronation",
	pulldown: "Pulldown",
	pyramid: "Pyramide",
	quarter: "Viertel",
	range: "Bereich",
	reclining: "liegend",
	renegade: "Renegade",
	response: "Reaktion",
	rocking: "schaukelnd",
	rocky: "Rocky",
	rollerer: "Roller",
	round: "rund",
	row: "Rudern",
	runners: "Läufer",
	saw: "Säge",
	scissor: "Schere",
	seesaw: "Wippe",
	semi: "halb",
	sequence: "Sequenz",
	side: "Seite",
	sitted: "sitzend",
	ski: "Ski",
	skier: "Skifahrer",
	skin: "Haut",
	skull: "Schädel",
	skullcrusher: "Skullcrusher",
	sledge: "Schlitten",
	slingers: "Schleudern",
	spell: "Zauber",
	squad: "Trupp",
	squats: "Kniebeugen",
	squatting: "kniebeugend",
	stabilization: "Stabilisation",
	stalder: "Stalder",
	stepbox: "Stepbox",
	sternum: "Brustbein",
	stork: "Storch",
	straddle: "Grätsche",
	stride: "Schritt",
	style: "Stil",
	supinated: "supiniert",
	supination: "Supination",
	supper: "Supper",
	svend: "Svend",
	sz: "SZ",
	tate: "Tate",
	tennis: "Tennis",
	three: "drei",
	thrusts: "Stöße",
	touchers: "Berührer",
	twin: "Zwilling",
	twisted: "gedreht",
	twists: "Drehungen",
	under: "unter",
	underhand: "Untergriff",
	unilateral: "einseitig",
	variation: "Variante",
	waiter: "Kellner",
	wind: "Wind",
	wipers: "Scheibenwischer",
	world: "Welt",
	yoga: "Yoga",
	curl: "Curl",
	press: "Drücken",
	swing: "Schwung",
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
// COMPOSITION LOGIC
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
	// Join with hyphen-prefix compounding (German compound words)
	let result = "";
	for (let i = 0; i < out.length; i++) {
		if (i === 0) {
			result = out[i];
		} else if (result.endsWith("-")) {
			result += out[i];
		} else {
			result += " " + out[i];
		}
	}
	return result;
}

function translateSlug(slug) {
	const tokens = tokenize(slug);
	const used = new Array(tokens.length).fill(false);

	// 1) Main movement
	let movement = null;
	for (const [key, value] of MOVEMENTS) {
		const idx = tokens.indexOf(key);
		if (idx !== -1) {
			movement = value;
			used[idx] = true;
			break;
		}
	}

	// 2) Variants
	const variants = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (VARIANTS[tok]) {
			variants.push(VARIANTS[tok]);
			used[i] = true;
		}
	});

	// 3) Equipment
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

	// 4) Postures
	const postures = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (POSTURE[tok]) {
			postures.push(POSTURE[tok]);
			used[i] = true;
		}
	});

	// 5) Grips
	const grips = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (GRIPS[tok]) {
			grips.push(GRIPS[tok]);
			used[i] = true;
		}
	});

	// 6) Modifiers
	const modifiers = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (MODIFIERS[tok]) {
			modifiers.push(MODIFIERS[tok]);
			used[i] = true;
		}
	});

	// 7) Leftover words (deduplicated)
	const leftoverRaw = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (STOP_WORDS.has(tok)) return;
		if (/^\d+$/.test(tok)) return;
		const movMatch = MOVEMENTS.find(([key]) => key === tok);
		leftoverRaw.push(movMatch ? movMatch[1] : (EXTRA_WORDS[tok] || tok));
	});
	const leftover = [...new Set(leftoverRaw)];

	// Build main block: variants + movement + equipment (German: prefix before noun)
	const mainParts = [];
	let leftoverConsumed = false;
	if (movement) {
		if (variants.length) mainParts.push(...variants);
		mainParts.push(movement);
	} else if (leftover.length) {
		if (variants.length) mainParts.push(...variants);
		mainParts.push(leftover.join(" "));
		leftoverConsumed = true;
	} else if (variants.length) {
		mainParts.push(...variants);
	}
	if (equipment.length) mainParts.push(...equipment);

	const mainBlock = joinDedup(mainParts);

	// Secondary blocks (comma-separated)
	const secondaryBlocks = [];
	if (postures.length) secondaryBlocks.push(joinDedup(postures));
	if (grips.length) secondaryBlocks.push(joinDedup(grips));
	if (modifiers.length) secondaryBlocks.push(joinDedup(modifiers));
	if (!leftoverConsumed && leftover.length) {
		secondaryBlocks.push(leftover.join(" "));
	}

	// Filter secondary blocks whose words already appear in main
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

	// Capitalize first letter
	result = result.replace(/\s+/g, " ").trim();
	if (result.length) result = result[0].toUpperCase() + result.slice(1);
	return result;
}

module.exports = { translateSlug };
