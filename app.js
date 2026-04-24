// =====================================================================
// Exercise Gym GIFs DB — landing
// =====================================================================
// Bump this constant when releasing a new SemVer tag and the docs/snippets
// will follow automatically. Use a tag (e.g. "v1.1.0") for stable URLs that
// jsDelivr can cache forever; avoid branch names like `version-1.x`.
const API_VERSION = "v1.1.0";
const BASE = `https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@${API_VERSION}`;

let GLOBAL_INDEX = null;
let MUSCLES = [];
let EQUIPMENT = [];
let BODYPARTS = [];
let CATEGORIES = [];
const muscleCache = new Map(); // `${lang}/${muscle}` -> exercises[]

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ---------------------------------------------------------------------
// UI translations (independent from API language)
// ---------------------------------------------------------------------
const I18N = {
	en: {
		"meta.title": "Exercise Gym GIFs DB · Static exercise API",
		"meta.description":
			"Free static API with 1300+ gym exercise GIFs. No backend, no API keys, ready for your app.",
		"nav.features": "Features",
		"nav.docs": "Docs",
		"nav.playground": "Playground",
		"nav.gallery": "Gallery",
		"ticker.text":
			"1323 exercises · 19 muscle groups · 11 equipment types · zero servers · zero api keys · jsdelivr cdn · open source",
		"hero.badge": "Static API · Free · No backend",
		"hero.title":
			"<span class=\"grad\">1323</span><br/>gym exercises<br/><em>ready to lift</em>",
		"hero.lead":
			"JSON + GIFs served straight from GitHub through the jsDelivr CDN. No keys, no hard limits, no servers. Paste the URL and consume.",
		"hero.cta1": "Start Training →",
		"hero.cta2": "Read the docs",
		"hero.sticker.top": "Player",
		"hero.sticker.bottom": "Free Forever",
		"stats.exercises": "Exercises",
		"stats.muscles": "Muscles",
		"stats.equipment": "Equipment",
		"stats.categories": "Categories",
		"features.label": "Round 01 / Why",
		"features.title": "No excuses",
		"features.sub":
			"Six reasons that make this the laziest API integration of your week.",
		"features.fast.title": "Fast",
		"features.fast.text":
			"Served by jsDelivr's global CDN. Aggressive caching at every PoP.",
		"features.free.title": "Free",
		"features.free.text": "No API keys, no billing, no quotas. Zero friction.",
		"features.static.title": "Static",
		"features.static.text": "Just JSON files + GIFs. Works from any client.",
		"features.bilingual.title": "Bilingual",
		"features.bilingual.text":
			"Each exercise comes with structured names and instructions in English and Spanish.",
		"features.filter.title": "Filterable",
		"features.filter.text":
			"Endpoints by muscle, equipment, category and body part.",
		"features.oss.title": "Open source",
		"features.oss.text":
			"Code and data on GitHub. Forkable and pinnable to a tag.",
		"docs.label": "Round 02 / Playbook",
		"docs.title": "Playbook",
		"docs.sub":
			"Everything you need to start consuming the API in less than a minute.",
		"docs.side.title": "Warm up",
		"docs.side.base": "Base URL",
		"docs.side.endpoints": "Endpoints",
		"docs.side.schema": "Schema",
		"docs.side.example": "Fetch example",
		"docs.base.title": "Base URL",
		"docs.base.text": "Everything else hangs off this:",
		"docs.base.note":
			"Pinned to <code>@v1.1.0</code> for reproducible builds. Replace the tag with another (e.g. <code>@v1.0.0</code>) to switch versions.",
		"docs.endpoints.title": "Endpoints",
		"docs.endpoints.text":
			"The API has one version per language. Replace <code>{lang}</code> with <code>en</code> or <code>es</code>.",
		"docs.ep.global": "Global metadata and available languages.",
		"docs.ep.langIndex": "Metadata for the selected language.",
		"docs.ep.muscles": "List of muscle groups.",
		"docs.ep.muscleDetail": "Exercises for a muscle group.",
		"docs.ep.equipment": "List of equipment.",
		"docs.ep.equipmentDetail": "Exercises by equipment.",
		"docs.ep.bodyparts": "List of body parts.",
		"docs.ep.bodypartDetail": "Exercises by body part.",
		"docs.ep.categories": "List of categories.",
		"docs.ep.categoryDetail": "Exercises by category.",
		"docs.ep.exercises": "All exercises.",
		"docs.ep.exerciseDetail": "Single exercise detail.",
		"docs.ep.gif": "The original GIF (shared between languages).",
		"docs.schema.title": "Exercise schema",
		"docs.schema.text":
			"The schema is identical across languages; only <code>name</code> and <code>instructions</code> change.",
		"docs.enums.title": "Allowed values",
		"docs.example.title": "Usage example",
		"play.label": "Round 03 / Live training",
		"play.title": "Playground",
		"play.subtitle": "Build a request and see the live response.",
		"play.lang": "Language",
		"play.endpoint": "Endpoint",
		"play.muscle": "Muscle",
		"play.equipment": "Equipment",
		"play.bodypart": "Body part",
		"play.category": "Category",
		"play.slug": "Slug",
		"play.send": "Send GET",
		"play.url": "URL",
		"play.copy": "Copy",
		"play.copied": "Copied!",
		"play.open": "Open ↗",
		"play.hint": "Press “Send GET” to see the response.",
		"play.loading": "Loading…",
		"play.loadFail": "Could not load the API. Check your connection.",
		"gallery.label": "Round 04 / Highlights",
		"gallery.title": "Highlights",
		"gallery.subtitle": "A random sample served straight from the API.",
		"gallery.shuffle": "↻ Shuffle",
		"gallery.loading": "Loading GIFs…",
		"footer.line1":
			"Made with ♥ by <a href=\"https://github.com/JahelCuadrado\" target=\"_blank\" rel=\"noopener\">Jahel</a> · <a href=\"https://github.com/JahelCuadrado/ExerciseGymGifsDB\" target=\"_blank\" rel=\"noopener\">Source on GitHub</a>",
		"footer.line2":
			"GIFs belong to their respective authors. This project only organises and exposes the files as a static API.",
	},
	es: {
		"meta.title": "Exercise Gym GIFs DB · API estática de ejercicios",
		"meta.description":
			"API estática y gratuita con más de 1300 GIFs de ejercicios de gimnasio. Sin backend, sin claves, lista para tu app.",
		"nav.features": "Features",
		"nav.docs": "Docs",
		"nav.playground": "Playground",
		"nav.gallery": "Galería",
		"ticker.text":
			"1323 ejercicios · 19 grupos musculares · 11 equipamientos · cero servidores · cero claves · cdn jsdelivr · open source",
		"hero.badge": "API estática · Gratis · Sin backend",
		"hero.title":
			"<span class=\"grad\">1323</span><br/>ejercicios de gym<br/><em>listos para levantar</em>",
		"hero.lead":
			"JSON + GIFs servidos directamente desde GitHub a través del CDN de jsDelivr. Sin claves, sin límites duros, sin servidores. Pega la URL y consume.",
		"hero.cta1": "Empezar →",
		"hero.cta2": "Ver documentación",
		"hero.sticker.top": "Dorsal",
		"hero.sticker.bottom": "Gratis siempre",
		"stats.exercises": "Ejercicios",
		"stats.muscles": "Músculos",
		"stats.equipment": "Equipos",
		"stats.categories": "Categorías",
		"features.label": "Round 01 / Ventajas",
		"features.title": "Sin excusas",
		"features.sub":
			"Seis razones para que esta sea la integración más vaga de tu semana.",
		"features.fast.title": "Rápida",
		"features.fast.text":
			"Servida por jsDelivr con CDN global. Caché agresiva en cada PoP.",
		"features.free.title": "Gratis",
		"features.free.text":
			"Sin claves de API, sin facturación, sin cuotas. Cero fricción.",
		"features.static.title": "Estática",
		"features.static.text":
			"Solo archivos JSON + GIFs. Funciona desde cualquier cliente.",
		"features.bilingual.title": "Bilingüe",
		"features.bilingual.text":
			"Cada ejercicio incluye nombre e instrucciones estructuradas en inglés y español.",
		"features.filter.title": "Filtrable",
		"features.filter.text":
			"Endpoints por músculo, equipamiento, categoría y parte del cuerpo.",
		"features.oss.title": "Open source",
		"features.oss.text":
			"Código y datos en GitHub. Forkeable y versionable con tags.",
		"docs.label": "Round 02 / Manual",
		"docs.title": "El manual",
		"docs.sub":
			"Todo lo que necesitas para empezar a consumir la API en menos de un minuto.",
		"docs.side.title": "Calentamiento",
		"docs.side.base": "Base URL",
		"docs.side.endpoints": "Endpoints",
		"docs.side.schema": "Esquema",
		"docs.side.example": "Ejemplo fetch",
		"docs.base.title": "Base URL",
		"docs.base.text": "Todo lo demás cuelga de aquí:",
		"docs.base.note":
			"Anclada a <code>@v1.1.0</code> para builds reproducibles. Cambia el tag (p. ej. <code>@v1.0.0</code>) para usar otra versión.",
		"docs.endpoints.title": "Endpoints",
		"docs.endpoints.text":
			"La API tiene una versión por idioma. Sustituye <code>{lang}</code> por <code>en</code> o <code>es</code>.",
		"docs.ep.global": "Metadata global e idiomas disponibles.",
		"docs.ep.langIndex": "Metadata del idioma seleccionado.",
		"docs.ep.muscles": "Lista de grupos musculares.",
		"docs.ep.muscleDetail": "Ejercicios de un grupo.",
		"docs.ep.equipment": "Lista de equipamientos.",
		"docs.ep.equipmentDetail": "Ejercicios por equipamiento.",
		"docs.ep.bodyparts": "Lista de partes del cuerpo.",
		"docs.ep.bodypartDetail": "Ejercicios por parte del cuerpo.",
		"docs.ep.categories": "Lista de categorías.",
		"docs.ep.categoryDetail": "Ejercicios por categoría.",
		"docs.ep.exercises": "Todos los ejercicios.",
		"docs.ep.exerciseDetail": "Detalle individual.",
		"docs.ep.gif": "El GIF original (compartido entre idiomas).",
		"docs.schema.title": "Esquema de un ejercicio",
		"docs.schema.text":
			"El esquema es el mismo en todos los idiomas; lo que cambia es el contenido de <code>name</code> e <code>instructions</code>.",
		"docs.enums.title": "Valores admitidos",
		"docs.example.title": "Ejemplo de uso",
		"play.label": "Round 03 / Entrenamiento",
		"play.title": "Playground",
		"play.subtitle": "Construye una petición y mira la respuesta en directo.",
		"play.lang": "Idioma",
		"play.endpoint": "Endpoint",
		"play.muscle": "Músculo",
		"play.equipment": "Equipamiento",
		"play.bodypart": "Parte del cuerpo",
		"play.category": "Categoría",
		"play.slug": "Slug",
		"play.send": "Enviar GET",
		"play.url": "URL",
		"play.copy": "Copiar",
		"play.copied": "¡Copiado!",
		"play.open": "Abrir ↗",
		"play.hint": "Pulsa “Enviar GET” para ver la respuesta.",
		"play.loading": "Cargando…",
		"play.loadFail": "No se pudo cargar la API. Comprueba tu conexión.",
		"gallery.label": "Round 04 / Mejores jugadas",
		"gallery.title": "Mejores jugadas",
		"gallery.subtitle": "Una muestra aleatoria sirviéndose desde la API.",
		"gallery.shuffle": "↻ Mezclar",
		"gallery.loading": "Cargando GIFs…",
		"footer.line1":
			"Hecho con ♥ por <a href=\"https://github.com/JahelCuadrado\" target=\"_blank\" rel=\"noopener\">Jahel</a> · <a href=\"https://github.com/JahelCuadrado/ExerciseGymGifsDB\" target=\"_blank\" rel=\"noopener\">Código en GitHub</a>",
		"footer.line2":
			"Los GIFs pertenecen a sus respectivos autores. Este proyecto solo organiza y expone los archivos como API estática.",
	},
};

let UI_LANG = "en";

function t(key) {
	return (I18N[UI_LANG] && I18N[UI_LANG][key]) || I18N.en[key] || key;
}

function applyI18n() {
	document.documentElement.lang = UI_LANG;
	document.title = t("meta.title");
	const metaDesc = document.querySelector('meta[name="description"]');
	if (metaDesc) metaDesc.setAttribute("content", t("meta.description"));

	$$("[data-i18n]").forEach((el) => {
		if (el.tagName === "META" || el.tagName === "TITLE") return;
		el.textContent = t(el.getAttribute("data-i18n"));
	});
	$$("[data-i18n-html]").forEach((el) => {
		el.innerHTML = t(el.getAttribute("data-i18n-html"));
	});

	// Update toggle visual state
	$$("#ui-lang-toggle [data-ui-lang]").forEach((s) => {
		s.classList.toggle("active", s.dataset.uiLang === UI_LANG);
	});
}

function setUiLang(lang) {
	UI_LANG = I18N[lang] ? lang : "en";
	try {
		localStorage.setItem("ui-lang", UI_LANG);
	} catch {}
	applyI18n();
}

function init() {
	const stored = (() => {
		try {
			return localStorage.getItem("ui-lang");
		} catch {
			return null;
		}
	})();
	const fallback =
		navigator.language && navigator.language.toLowerCase().startsWith("es")
			? "es"
			: "en";
	UI_LANG = I18N[stored] ? stored : fallback;
	applyI18n();

	// Bind UI BEFORE bootstrap so the toggle works even if API fetch hangs
	bindUI();
	bootstrap().catch((err) => {
		console.error(err);
		const meta = document.getElementById("result-meta");
		if (meta) meta.textContent = t("play.loadFail");
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}

async function bootstrap() {
	GLOBAL_INDEX = await fetchJSON(`${BASE}/api/index.json`);
	updateStats(GLOBAL_INDEX);

	const lang = currentLang();
	const langIndex = await fetchJSON(`${BASE}/api/${lang}/index.json`);
	MUSCLES = langIndex.muscles.map((m) => m.muscle);

	fetchJSON(`${BASE}/api/${lang}/equipment.json`).then((j) => {
		EQUIPMENT = (j || []).map((x) => x.equipment);
		fillSelect("#param-equipment", EQUIPMENT);
	});
	fetchJSON(`${BASE}/api/${lang}/bodyparts.json`).then((j) => {
		BODYPARTS = (j || []).map((x) => x.bodyPart);
		fillSelect("#param-bodypart", BODYPARTS);
	});
	fetchJSON(`${BASE}/api/${lang}/categories.json`).then((j) => {
		CATEGORIES = (j || []).map((x) => x.category);
		fillSelect("#param-category", CATEGORIES);
	});

	fillSelect("#param-muscle", MUSCLES);
	fillSelect("#gallery-muscle", MUSCLES);

	if (MUSCLES.length) {
		loadMuscle(lang, MUSCLES[0]).then((data) => {
			fillSelect(
				"#param-slug",
				data.exercises.map((e) => e.slug)
			);
			updateUrlPreview();
		});
	}

	updateUrlPreview();
	await loadGallery(currentGalleryLang(), MUSCLES[0]);
}

function updateStats(idx) {
	if (!idx?.totals) return;
	const defLang = idx.defaultLanguage || (idx.languages && idx.languages[0]);
	const tot = idx.totals?.[defLang] || idx.totals;
	if (!tot) return;
	$("#stat-exercises").textContent = tot.exercises ?? "—";
	$("#stat-muscles").textContent = tot.muscles ?? "—";
	$("#stat-equipment").textContent = tot.equipment ?? "—";
	$("#stat-categories").textContent = tot.categories ?? "—";
}

async function fetchJSON(url) {
	const r = await fetch(url);
	if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
	return r.json();
}

function fillSelect(sel, items) {
	const el = $(sel);
	if (!el) return;
	const prev = el.value;
	el.innerHTML = items
		.map((v) => `<option value="${v}">${v}</option>`)
		.join("");
	if (items.includes(prev)) el.value = prev;
}

function currentLang() {
	return $("#lang-select")?.value || "en";
}

function currentGalleryLang() {
	return $("#gallery-lang")?.value || "en";
}

// ---------------------------------------------------------------------
// UI bindings
// ---------------------------------------------------------------------
function bindUI() {
	const toggle = $("#ui-lang-toggle");
	if (toggle) {
		toggle.addEventListener("click", (e) => {
			e.preventDefault();
			setUiLang(UI_LANG === "en" ? "es" : "en");
		});
	}

	$("#lang-select")?.addEventListener("change", () => {
		updateUrlPreview();
		onMuscleChangeForExerciseDetail().then(updateUrlPreview);
	});
	$("#endpoint-select")?.addEventListener("change", onEndpointChange);

	$("#param-muscle")?.addEventListener("change", async () => {
		await onMuscleChangeForExerciseDetail();
		updateUrlPreview();
	});
	$("#param-equipment")?.addEventListener("change", updateUrlPreview);
	$("#param-bodypart")?.addEventListener("change", updateUrlPreview);
	$("#param-category")?.addEventListener("change", updateUrlPreview);
	$("#param-slug")?.addEventListener("change", updateUrlPreview);

	$("#btn-send")?.addEventListener("click", sendRequest);
	$("#btn-copy")?.addEventListener("click", copyUrl);

	$("#gallery-lang")?.addEventListener("change", () =>
		loadGallery(currentGalleryLang(), $("#gallery-muscle").value)
	);
	$("#gallery-muscle")?.addEventListener("change", (e) =>
		loadGallery(currentGalleryLang(), e.target.value)
	);
	$("#btn-shuffle")?.addEventListener("click", () =>
		loadGallery(currentGalleryLang(), $("#gallery-muscle").value)
	);

	onEndpointChange();
}

function onEndpointChange() {
	const ep = $("#endpoint-select")?.value;
	toggle("#param-muscle-wrap", ["muscleDetail", "exerciseDetail"].includes(ep));
	toggle("#param-equipment-wrap", ep === "equipmentDetail");
	toggle("#param-bodypart-wrap", ep === "bodypartDetail");
	toggle("#param-category-wrap", ep === "categoryDetail");
	toggle("#param-slug-wrap", ep === "exerciseDetail");
	if (ep === "exerciseDetail") {
		onMuscleChangeForExerciseDetail().then(updateUrlPreview);
	}
	updateUrlPreview();
}

function toggle(sel, show) {
	const el = $(sel);
	if (!el) return;
	el.hidden = !show;
}

async function onMuscleChangeForExerciseDetail() {
	const ep = $("#endpoint-select")?.value;
	if (ep !== "exerciseDetail") return;
	const slugSel = $("#param-slug");
	const muscle = $("#param-muscle")?.value;
	if (!muscle) {
		if (slugSel) slugSel.innerHTML = "";
		return;
	}
	slugSel.innerHTML = `<option value="">${t("play.loading")}</option>`;
	try {
		const data = await loadMuscle(currentLang(), muscle);
		fillSelect("#param-slug", data.exercises.map((e) => e.slug));
	} catch (err) {
		slugSel.innerHTML = `<option value="">Error: ${err.message}</option>`;
	}
}

async function loadMuscle(lang, muscle) {
	const key = `${lang}/${muscle}`;
	if (muscleCache.has(key)) return muscleCache.get(key);
	const data = await fetchJSON(`${BASE}/api/${lang}/muscles/${muscle}.json`);
	muscleCache.set(key, data);
	return data;
}

function buildUrl() {
	const ep = $("#endpoint-select")?.value;
	const lang = currentLang();
	switch (ep) {
		case "globalIndex":
			return `${BASE}/api/index.json`;
		case "index":
			return `${BASE}/api/${lang}/index.json`;
		case "muscles":
			return `${BASE}/api/${lang}/muscles.json`;
		case "muscleDetail":
			return `${BASE}/api/${lang}/muscles/${$("#param-muscle").value}.json`;
		case "equipment":
			return `${BASE}/api/${lang}/equipment.json`;
		case "equipmentDetail":
			return `${BASE}/api/${lang}/equipment/${$("#param-equipment").value}.json`;
		case "bodyparts":
			return `${BASE}/api/${lang}/bodyparts.json`;
		case "bodypartDetail":
			return `${BASE}/api/${lang}/bodyparts/${$("#param-bodypart").value}.json`;
		case "categories":
			return `${BASE}/api/${lang}/categories.json`;
		case "categoryDetail":
			return `${BASE}/api/${lang}/categories/${$("#param-category").value}.json`;
		case "exerciseDetail":
			return `${BASE}/api/${lang}/exercises/${$("#param-muscle").value}/${$(
				"#param-slug"
			).value}.json`;
	}
	return BASE;
}

function updateUrlPreview() {
	const preview = $("#url-preview");
	if (!preview) return;
	const url = buildUrl();
	preview.textContent = url;
	const open = $("#btn-open");
	if (open) open.href = url;
}

async function sendRequest() {
	const url = buildUrl();
	const meta = $("#result-meta");
	const body = $("#result-body");
	meta.textContent = t("play.loading");
	meta.className = "result-meta";
	body.textContent = "";
	const t0 = performance.now();
	try {
		const r = await fetch(url);
		const text = await r.text();
		const ms = Math.round(performance.now() - t0);
		const sizeKb = (new Blob([text]).size / 1024).toFixed(1);
		meta.textContent = `${r.status} ${r.statusText} · ${ms} ms · ${sizeKb} KB`;
		meta.className = "result-meta " + (r.ok ? "ok" : "err");
		try {
			body.textContent = JSON.stringify(JSON.parse(text), null, 2);
		} catch {
			body.textContent = text;
		}
	} catch (err) {
		meta.textContent = "Error: " + err.message;
		meta.className = "result-meta err";
	}
}

async function copyUrl() {
	try {
		await navigator.clipboard.writeText(buildUrl());
		const btn = $("#btn-copy");
		const old = btn.textContent;
		btn.textContent = t("play.copied");
		setTimeout(() => (btn.textContent = old), 1200);
	} catch {}
}

// ---------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------
async function loadGallery(lang, muscle) {
	const grid = $("#gallery-grid");
	if (!muscle) return;
	grid.innerHTML = `<p class="muted">${t("gallery.loading")}</p>`;
	try {
		const data = await loadMuscle(lang, muscle);
		const sample = shuffle(data.exercises).slice(0, 12);
		grid.innerHTML = sample
			.map(
				(ex) => `
			<a class="gif-card" href="${ex.gifUrl}" target="_blank" rel="noopener">
				<img src="${ex.gifUrl}" alt="${escapeHtml(ex.name)}" loading="lazy" />
				<div class="meta">
					<h4>${escapeHtml(ex.name)}</h4>
					<p>${escapeHtml(ex.equipment)} · ${escapeHtml(ex.bodyPart)}</p>
				</div>
			</a>`
			)
			.join("");
	} catch (err) {
		grid.innerHTML = `<p class="muted">Error: ${escapeHtml(err.message)}</p>`;
	}
}

function shuffle(arr) {
	const a = arr.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function escapeHtml(str) {
	return String(str ?? "").replace(/[&<>"']/g, (c) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
	})[c]);
}
