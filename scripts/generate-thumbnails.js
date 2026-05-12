#!/usr/bin/env node
/**
 * Generate optimized animated WebP thumbnails from exercise GIF files.
 *
 * For each `.gif` found recursively in the repo (excluding api/, node_modules,
 * .git, .github, .vscode, scripts, overrides), produces a `{slug}.thumb.webp`
 * in the same directory — 128 px wide, preserving aspect ratio and animation.
 *
 * Primary engine: sharp (animated WebP support).
 * Fallback engine: ffmpeg via fluent-ffmpeg (when sharp cannot handle the file).
 *
 * Usage:
 *   node scripts/generate-thumbnails.js
 *   node scripts/generate-thumbnails.js --force   # overwrite existing thumbs
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const THUMB_WIDTH = 128;
const THUMB_SUFFIX = ".thumb.webp";

const IGNORE = new Set([
	"api",
	"scripts",
	"overrides",
	".git",
	".github",
	".vscode",
	"node_modules",
]);

const FORCE = process.argv.includes("--force");

/* ------------------------------------------------------------------ */
/*  Filesystem helpers                                                 */
/* ------------------------------------------------------------------ */

/**
 * Recursively collects all `.gif` file paths under `directory`,
 * skipping folders listed in IGNORE.
 */
function collectGifs(directory, relativeTo = directory) {
	const results = [];
	const entries = fs.readdirSync(directory, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(directory, entry.name);
		const relativeFromRoot = path.relative(relativeTo, fullPath);
		const topFolder = relativeFromRoot.split(path.sep)[0];

		if (entry.isDirectory()) {
			if (IGNORE.has(entry.name) || IGNORE.has(topFolder)) continue;
			results.push(...collectGifs(fullPath, relativeTo));
		} else if (entry.isFile() && entry.name.toLowerCase().endsWith(".gif")) {
			results.push(fullPath);
		}
	}

	return results;
}

/**
 * Returns the output path for a given GIF path.
 * e.g. abductors/lever-seated-hip-abduction.gif → abductors/lever-seated-hip-abduction.thumb.webp
 */
function thumbPath(gifPath) {
	const parsed = path.parse(gifPath);
	return path.join(parsed.dir, `${parsed.name}${THUMB_SUFFIX}`);
}

function formatSize(bytes) {
	if (bytes < 1024) return `${bytes}B`;
	const kb = bytes / 1024;
	if (kb < 1024) return `${kb.toFixed(0)}KB`;
	return `${(kb / 1024).toFixed(1)}MB`;
}

/* ------------------------------------------------------------------ */
/*  Conversion engines                                                 */
/* ------------------------------------------------------------------ */

/**
 * Attempt conversion with sharp (supports animated GIF → animated WebP).
 * Returns true on success, false if sharp is unavailable or fails.
 */
async function convertWithSharp(inputPath, outputPath) {
	try {
		const sharp = require("sharp");
		await sharp(inputPath, { animated: true })
			.resize({ width: THUMB_WIDTH })
			.webp({ quality: 75, effort: 4 })
			.toFile(outputPath);
		return true;
	} catch {
		return false;
	}
}

/**
 * Fallback conversion with ffmpeg via fluent-ffmpeg.
 * Returns true on success, false if unavailable or fails.
 */
function convertWithFfmpeg(inputPath, outputPath) {
	return new Promise((resolve) => {
		try {
			const ffmpeg = require("fluent-ffmpeg");
			ffmpeg(inputPath)
				.outputOptions([
					`-vf scale=${THUMB_WIDTH}:-2`,
					"-c:v libwebp",
					"-lossless 0",
					"-q:v 75",
					"-loop 0",
					"-an",
				])
				.output(outputPath)
				.on("end", () => resolve(true))
				.on("error", () => resolve(false))
				.run();
		} catch {
			resolve(false);
		}
	});
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

async function main() {
	console.log("Scanning for GIF files...\n");

	const gifs = collectGifs(ROOT);
	if (gifs.length === 0) {
		console.log("No GIF files found.");
		return;
	}

	console.log(`Found ${gifs.length} GIF(s). Generating thumbnails...\n`);

	let processed = 0;
	let skipped = 0;
	let failed = 0;
	let totalOriginalSize = 0;
	let totalThumbSize = 0;

	for (const gifPath of gifs) {
		const outPath = thumbPath(gifPath);
		const relGif = path.relative(ROOT, gifPath);
		const relThumb = path.relative(ROOT, outPath);

		if (!FORCE && fs.existsSync(outPath)) {
			const thumbStat = fs.statSync(outPath);
			const gifStat = fs.statSync(gifPath);
			totalOriginalSize += gifStat.size;
			totalThumbSize += thumbStat.size;
			skipped++;
			console.log(`[SKIP] ${relThumb} (already exists)`);
			continue;
		}

		const gifStat = fs.statSync(gifPath);
		totalOriginalSize += gifStat.size;

		let success = await convertWithSharp(gifPath, outPath);

		if (!success) {
			success = await convertWithFfmpeg(gifPath, outPath);
		}

		if (success && fs.existsSync(outPath)) {
			const thumbStat = fs.statSync(outPath);
			totalThumbSize += thumbStat.size;
			processed++;
			console.log(`[OK]   ${relThumb} (${formatSize(thumbStat.size)})`);
		} else {
			failed++;
			console.error(`[FAIL] ${relGif}`);
		}
	}

	/* ---- Summary ---- */
	console.log("\n========== SUMMARY ==========");
	console.log(`Total GIFs found:    ${gifs.length}`);
	console.log(`Processed:           ${processed}`);
	if (skipped > 0) console.log(`Skipped (existing):  ${skipped}`);
	if (failed > 0) console.log(`Failed:              ${failed}`);
	console.log(`Original total size: ${formatSize(totalOriginalSize)}`);
	console.log(`Thumb total size:    ${formatSize(totalThumbSize)}`);

	if (totalOriginalSize > 0) {
		const reduction = (
			((totalOriginalSize - totalThumbSize) / totalOriginalSize) *
			100
		).toFixed(1);
		console.log(`Size reduction:      ${reduction}%`);
	}

	console.log("=============================");

	if (failed > 0) {
		process.exitCode = 1;
	}
}

main();
