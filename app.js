// =====================================================================
// Exercise Gym GIFs DB — landing
// =====================================================================
const BASE = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main";

let GLOBAL_INDEX = null;
let MUSCLES = [];
let EQUIPMENT = [];
let BODYPARTS = [];
let CATEGORIES = [];
const muscleCache = new Map(); // `${lang}/${muscle}` -> exercises[]

const $ = (sel) => document.querySelector(sel);

document.addEventListener("DOMContentLoaded", () => {
	bootstrap();
	bindUI();
});

async function bootstrap() {
	try {
		GLOBAL_INDEX = await fetchJSON(`${BASE}/api/index.json`);
		updateStats(GLOBAL_INDEX);

		const lang = currentLang();
		const langIndex = await fetchJSON(`${BASE}/api/${lang}/index.json`);
		MUSCLES = langIndex.muscles.map((m) => m.muscle);

		// Cargas paralelas para los desplegables
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
	} catch (err) {
		console.error(err);
		document.getElementById("result-meta").textContent =
			"No se pudo cargar la API. Comprueba tu conexión.";
	}
}

function updateStats(idx) {
	if (!idx?.totals) return;
	// Tomamos los totales del idioma por defecto.
	const defLang = idx.defaultLanguage || (idx.languages && idx.languages[0]);
	const t = idx.totals?.[defLang] || idx.totals;
	if (!t) return;
	$("#stat-exercises").textContent = t.exercises ?? "—";
	$("#stat-muscles").textContent = t.muscles ?? "—";
	$("#stat-equipment").textContent = t.equipment ?? "—";
	$("#stat-categories").textContent = t.categories ?? "—";
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
	return $("#lang-select")?.value || "es";
}

function currentGalleryLang() {
	return $("#gallery-lang")?.value || "es";
}

// ---------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------
function bindUI() {
	$("#lang-select").addEventListener("change", () => {
		updateUrlPreview();
		// recargar slugs si el endpoint los necesita
		onMuscleChangeForExerciseDetail().then(updateUrlPreview);
	});
	$("#endpoint-select").addEventListener("change", onEndpointChange);

	$("#param-muscle").addEventListener("change", async () => {
		await onMuscleChangeForExerciseDetail();
		updateUrlPreview();
	});
	$("#param-equipment").addEventListener("change", updateUrlPreview);
	$("#param-bodypart").addEventListener("change", updateUrlPreview);
	$("#param-category").addEventListener("change", updateUrlPreview);
	$("#param-slug").addEventListener("change", updateUrlPreview);

	$("#btn-send").addEventListener("click", sendRequest);
	$("#btn-copy").addEventListener("click", copyUrl);

	$("#gallery-lang").addEventListener("change", () =>
		loadGallery(currentGalleryLang(), $("#gallery-muscle").value)
	);
	$("#gallery-muscle").addEventListener("change", (e) =>
		loadGallery(currentGalleryLang(), e.target.value)
	);
	$("#btn-shuffle").addEventListener("click", () =>
		loadGallery(currentGalleryLang(), $("#gallery-muscle").value)
	);

	onEndpointChange();
}

function onEndpointChange() {
	const ep = $("#endpoint-select").value;
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
	const ep = $("#endpoint-select").value;
	if (ep !== "exerciseDetail") return;
	const slugSel = $("#param-slug");
	const muscle = $("#param-muscle").value;
	if (!muscle) {
		slugSel.innerHTML = "";
		return;
	}
	slugSel.innerHTML = '<option value="">Cargando…</option>';
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
	const ep = $("#endpoint-select").value;
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
	const url = buildUrl();
	$("#url-preview").textContent = url;
	$("#btn-open").href = url;
}

async function sendRequest() {
	const url = buildUrl();
	const meta = $("#result-meta");
	const body = $("#result-body");
	meta.textContent = "Cargando…";
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
		btn.textContent = "¡Copiado!";
		setTimeout(() => (btn.textContent = old), 1200);
	} catch {}
}

// ---------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------
async function loadGallery(lang, muscle) {
	const grid = $("#gallery-grid");
	if (!muscle) return;
	grid.innerHTML = '<p class="muted">Cargando GIFs…</p>';
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
