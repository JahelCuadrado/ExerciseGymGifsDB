/**
 * Generador de índice de búsqueda (/api/{lang}/search.json).
 *
 * Expone:
 *  - `items[]`: cada ejercicio con campos mínimos (id, slug, muscle, equipment,
 *    bodyPart, category, name, gifUrl, terms[]). `terms` es una lista de
 *    palabras clave normalizadas (sin acentos ni mayúsculas) con las que se
 *    puede buscar el ejercicio: nombre, músculo en ES/EN, equipamiento en
 *    ES/EN, alias populares ("mancuerna", "antebrazo"...).
 *  - `filters`: mapas que traducen términos de búsqueda ES/EN al slug canónico
 *    (ej. "antebrazo" -> { muscle: "forearms" }, "mancuerna" -> { equipment: "dumbbell" }).
 *
 * La idea: un cliente puede cargar search.json una sola vez (cacheable por
 * jsDelivr) y luego hacer búsqueda libre 100% offline.
 */

function normalize(text) {
	return String(text)
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // quita acentos
		.replace(/[^a-z0-9\s-]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

// Alias: término buscable -> slug canónico.
const MUSCLE_ALIASES = {
	es: {
		abductors: ["abductores", "abductor"],
		abs: ["abdominales", "abdomen", "abs", "core"],
		adductors: ["aductores", "aductor"],
		biceps: ["biceps", "bicep", "biceps braquial"],
		calves: ["gemelos", "gemelo", "pantorrilla", "pantorrillas", "sóleo", "soleo"],
		cardio: ["cardio", "cardiovascular", "aerobico", "aeróbico"],
		delts: ["hombros", "hombro", "deltoides", "delt"],
		forearms: ["antebrazos", "antebrazo"],
		glutes: ["gluteos", "glúteos", "gluteo", "glúteo", "culo"],
		hamstrings: ["isquiotibiales", "isquios", "femoral", "femorales"],
		lats: ["dorsales", "dorsal", "lat", "lats"],
		"levator-scapulae": ["elevador de la escapula", "elevador de la escápula", "escapula"],
		pectorals: ["pectorales", "pectoral", "pecho", "pec"],
		quads: ["cuadriceps", "cuádriceps", "cuadriceps", "pierna", "piernas"],
		"serratus-anterior": ["serrato anterior", "serrato"],
		spine: ["lumbar", "lumbares", "espalda baja", "zona lumbar"],
		traps: ["trapecios", "trapecio"],
		triceps: ["triceps", "tricep"],
		"upper-back": ["espalda alta", "espalda superior", "espalda"],
	},
	en: {
		abductors: ["abductors", "abductor"],
		abs: ["abs", "abdominals", "core"],
		adductors: ["adductors", "adductor"],
		biceps: ["biceps", "bicep"],
		calves: ["calves", "calf", "soleus"],
		cardio: ["cardio", "cardiovascular"],
		delts: ["shoulders", "shoulder", "delts", "delt", "deltoid"],
		forearms: ["forearms", "forearm"],
		glutes: ["glutes", "glute", "butt", "buttocks"],
		hamstrings: ["hamstrings", "hammies", "hamstring"],
		lats: ["lats", "latissimus"],
		"levator-scapulae": ["levator scapulae", "scapula"],
		pectorals: ["chest", "pectorals", "pecs", "pec"],
		quads: ["quads", "quadriceps", "quad"],
		"serratus-anterior": ["serratus anterior", "serratus"],
		spine: ["lower back", "spine", "lumbar"],
		traps: ["traps", "trapezius"],
		triceps: ["triceps", "tricep"],
		"upper-back": ["upper back", "back"],
	},
};

const EQUIPMENT_ALIASES = {
	es: {
		barbell: ["barra", "barra olimpica", "barra olímpica"],
		dumbbell: ["mancuerna", "mancuernas", "pesas"],
		cable: ["polea", "poleas", "cable"],
		machine: ["maquina", "máquina"],
		lever: ["maquina", "máquina", "palanca"],
		smith: ["maquina smith", "máquina smith", "smith"],
		"ez-bar": ["barra z", "ez"],
		kettlebell: ["kettlebell", "pesa rusa"],
		band: ["banda", "banda elastica", "banda elástica", "goma"],
		bodyweight: ["peso corporal", "calistenia", "sin peso", "sin material"],
		other: ["otros", "otro", "otros accesorios"],
	},
	en: {
		barbell: ["barbell", "olympic barbell"],
		dumbbell: ["dumbbell", "dumbbells"],
		cable: ["cable", "pulley"],
		machine: ["machine"],
		lever: ["machine", "lever"],
		smith: ["smith machine", "smith"],
		"ez-bar": ["ez bar", "ez-bar"],
		kettlebell: ["kettlebell"],
		band: ["band", "resistance band"],
		bodyweight: ["bodyweight", "calisthenics", "no equipment"],
		other: ["other"],
	},
};

const BODYPART_ALIASES = {
	es: {
		arms: ["brazos", "brazo"],
		back: ["espalda"],
		cardio: ["cardio"],
		chest: ["pecho"],
		core: ["core", "abdomen", "abdominales"],
		legs: ["piernas", "pierna", "tren inferior"],
		shoulders: ["hombros", "hombro"],
	},
	en: {
		arms: ["arms"],
		back: ["back"],
		cardio: ["cardio"],
		chest: ["chest"],
		core: ["core", "abs"],
		legs: ["legs"],
		shoulders: ["shoulders"],
	},
};

const CATEGORY_ALIASES = {
	es: {
		strength: ["fuerza"],
		stretching: ["estiramiento", "estiramientos", "flexibilidad"],
		cardio: ["cardio", "cardiovascular"],
		plyometrics: ["pliometria", "pliometría", "saltos"],
	},
	en: {
		strength: ["strength"],
		stretching: ["stretching", "flexibility"],
		cardio: ["cardio"],
		plyometrics: ["plyometrics", "plyo"],
	},
};

/**
 * Construye terms[] para un ejercicio en el idioma dado.
 */
function buildTerms(lang, exercise) {
	const terms = new Set();
	// Nombre
	for (const w of normalize(exercise.name).split(" ")) {
		if (w.length >= 2) terms.add(w);
	}
	// Slug (tokens)
	for (const w of exercise.slug.split("-")) {
		if (w.length >= 2) terms.add(w);
	}
	// Alias del músculo principal y secundarios
	const muscleMap = MUSCLE_ALIASES[lang] || {};
	const pushAlias = (map, key) => {
		for (const a of map[key] || []) {
			for (const w of normalize(a).split(" ")) {
				if (w.length >= 2) terms.add(w);
			}
		}
	};
	pushAlias(muscleMap, exercise.muscle);
	for (const m of exercise.secondaryMuscles || []) {
		pushAlias(muscleMap, m);
	}
	pushAlias(EQUIPMENT_ALIASES[lang] || {}, exercise.equipment);
	pushAlias(BODYPART_ALIASES[lang] || {}, exercise.bodyPart);
	pushAlias(CATEGORY_ALIASES[lang] || {}, exercise.category);
	return [...terms].sort();
}

/**
 * Devuelve { term -> { muscle | equipment | bodyPart | category : slug } }.
 */
function buildFilterIndex(lang) {
	const filters = {};
	const add = (term, field, value) => {
		const key = normalize(term);
		if (!key) return;
		if (!filters[key]) filters[key] = {};
		// Primer match gana; no sobreescribe.
		if (!filters[key][field]) filters[key][field] = value;
	};
	for (const [slug, list] of Object.entries(MUSCLE_ALIASES[lang] || {})) {
		add(slug, "muscle", slug);
		for (const a of list) add(a, "muscle", slug);
	}
	for (const [slug, list] of Object.entries(EQUIPMENT_ALIASES[lang] || {})) {
		add(slug, "equipment", slug);
		for (const a of list) add(a, "equipment", slug);
	}
	for (const [slug, list] of Object.entries(BODYPART_ALIASES[lang] || {})) {
		add(slug, "bodyPart", slug);
		for (const a of list) add(a, "bodyPart", slug);
	}
	for (const [slug, list] of Object.entries(CATEGORY_ALIASES[lang] || {})) {
		add(slug, "category", slug);
		for (const a of list) add(a, "category", slug);
	}
	return filters;
}

/**
 * Construye el payload completo de search.json.
 */
function buildSearchIndex(lang, exercises) {
	const items = exercises.map((ex) => ({
		id: ex.id,
		slug: ex.slug,
		name: ex.name,
		muscle: ex.muscle,
		bodyPart: ex.bodyPart,
		equipment: ex.equipment,
		category: ex.category,
		secondaryMuscles: ex.secondaryMuscles || [],
		gifUrl: ex.gifUrl,
		terms: buildTerms(lang, ex),
	}));
	return {
		language: lang,
		count: items.length,
		filters: buildFilterIndex(lang),
		items,
	};
}

module.exports = {
	normalize,
	buildSearchIndex,
	MUSCLE_ALIASES,
	EQUIPMENT_ALIASES,
	BODYPART_ALIASES,
	CATEGORY_ALIASES,
};
