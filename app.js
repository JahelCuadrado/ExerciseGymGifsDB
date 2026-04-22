// =====================================================================
// Exercise Gym GIFs DB — landing
// =====================================================================
const BASE = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main";

// Cargamos el index para tener músculos, equipos, etc.
let INDEX = null;
let MUSCLES = [];
let EQUIPMENT = [];
let BODYPARTS = [];
let CATEGORIES = [];
const muscleCache = new Map(); // muscle -> exercises[]

const $ = (sel) => document.querySelector(sel);

document.addEventListener("DOMContentLoaded", () => {
	bootstrap();
	bindUI();
});

async function bootstrap() {
	try {
		INDEX = await fetchJSON(`${BASE}/api/index.json`);
		updateStats(INDEX);
		MUSCLES = INDEX.muscles.map((m) => m.muscle);

		// Cargas opcionales para el playground (en paralelo, sin bloquear)
		fetchJSON(`${BASE}/api/equipment.json`).then((j) => {
			EQUIPMENT = (j || []).map((x) => x.equipment);
			fillSelect("#param-equipment", EQUIPMENT);
		});
		fetchJSON(`${BASE}/api/bodyparts.json`).then((j) => {
			BODYPARTS = (j || []).map((x) => x.bodyPart);
			fillSelect("#param-bodypart", BODYPARTS);
		});
		fetchJSON(`${BASE}/api/categories.json`).then((j) => {
			CATEGORIES = (j || []).map((x) => x.category);
			fillSelect("#param-category", CATEGORIES);
		});

		fillSelect("#param-muscle", MUSCLES);
		fillSelect("#gallery-muscle", MUSCLES);

		// Precargar slugs del primer músculo para que el desplegable no aparezca vacío
		if (MUSCLES.length) {
			loadMuscle(MUSCLES[0]).then((data) => {
				fillSelect(
					"#param-slug",
					data.exercises.map((e) => e.slug)
				);
				updateUrlPreview();
			});
		}

		updateUrlPreview();
		await loadGallery(MUSCLES[0]);
	} catch (err) {
		console.error(err);
		document.getElementById("result-meta").textContent =
			"No se pudo cargar la API. Comprueba tu conexión.";
	}
}

function updateStats(idx) {
	if (!idx?.totals) return;
	$("#stat-exercises").textContent = idx.totals.exercises;
	$("#stat-muscles").textContent = idx.totals.muscles;
	$("#stat-equipment").textContent = idx.totals.equipment;
	$("#stat-categories").textContent = idx.totals.categories;
}

async function fetchJSON(url) {
	const r = await fetch(url);
	if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
	return r.json();
}

function fillSelect(sel, items) {
	const el = $(sel);
	if (!el) return;
	el.innerHTML = items
		.map((v) => `<option value="${v}">${v}</option>`)
		.join("");
}

// ---------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------
function bindUI() {
	const select = $("#endpoint-select");
	select.addEventListener("change", onEndpointChange);

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

	$("#gallery-muscle").addEventListener("change", (e) =>
		loadGallery(e.target.value)
	);
	$("#btn-shuffle").addEventListener("click", () =>
		loadGallery($("#gallery-muscle").value)
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
		const data = await loadMuscle(muscle);
		const slugs = data.exercises.map((e) => e.slug);
		fillSelect("#param-slug", slugs);
	} catch (err) {
		slugSel.innerHTML = `<option value="">Error: ${err.message}</option>`;
	}
}

async function loadMuscle(muscle) {
	if (muscleCache.has(muscle)) return muscleCache.get(muscle);
	const data = await fetchJSON(`${BASE}/api/muscles/${muscle}.json`);
	muscleCache.set(muscle, data);
	return data;
}

function buildUrl() {
	const ep = $("#endpoint-select").value;
	switch (ep) {
		case "index":
			return `${BASE}/api/index.json`;
		case "muscles":
			return `${BASE}/api/muscles.json`;
		case "muscleDetail":
			return `${BASE}/api/muscles/${$("#param-muscle").value}.json`;
		case "equipment":
			return `${BASE}/api/equipment.json`;
		case "equipmentDetail":
			return `${BASE}/api/equipment/${$("#param-equipment").value}.json`;
		case "bodyparts":
			return `${BASE}/api/bodyparts.json`;
		case "bodypartDetail":
			return `${BASE}/api/bodyparts/${$("#param-bodypart").value}.json`;
		case "categories":
			return `${BASE}/api/categories.json`;
		case "categoryDetail":
			return `${BASE}/api/categories/${$("#param-category").value}.json`;
		case "exerciseDetail":
			return `${BASE}/api/exercises/${$("#param-muscle").value}/${$(
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
async function loadGallery(muscle) {
	const grid = $("#gallery-grid");
	grid.innerHTML = '<p class="muted">Cargando GIFs…</p>';
	try {
		const data = await loadMuscle(muscle);
		const sample = shuffle(data.exercises).slice(0, 12);
		grid.innerHTML = sample
			.map(
				(ex) => `
			<a class="gif-card" href="${ex.gifUrl}" target="_blank" rel="noopener">
				<img src="${ex.gifUrl}" alt="${escapeHtml(ex.nameEs || ex.name)}" loading="lazy" />
				<div class="meta">
					<h4>${escapeHtml(ex.nameEs || ex.name)}</h4>
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
