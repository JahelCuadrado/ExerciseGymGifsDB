"use strict";

// Canonical aliases for historical/typo slugs used only for display name generation.
const FULL_SLUG_ALIASES = new Map([
  ["kettlebell-pirate-supper-legs", "kettlebell-around-legs-pass"],
  ["hyght-dumbbell-fly", "high-dumbbell-fly"],
]);

const TOKEN_ALIASES = new Map([
  ["revers", "reverse"],
  ["sitted", "seated"],
  ["peacher", "preacher"],
  ["rollerer", "roller"],
  ["hyght", "high"],
  ["supper", "pass"],
  ["breeding", "fly"],
]);

function normalizeSlugForNaming(slug) {
  const direct = FULL_SLUG_ALIASES.get(slug);
  if (direct) return direct;

  return slug
    .split("-")
    .map((token) => TOKEN_ALIASES.get(token) || token)
    .join("-");
}

module.exports = { normalizeSlugForNaming };
