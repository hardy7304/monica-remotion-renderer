/**
 * CLI render script for Monica Remotion Renderer.
 *
 * Usage:
 *   npm run render -- --title "Hello Monica" --subtitle "Auto video render"
 *   npm run render -- --title "Hello" --subtitle "World" --out out/custom.mp4
 */

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");

// ---------------------------------------------------------------------------
// Parse CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);

function getArg(name, fallback) {
  const index = args.indexOf(`--${name}`);
  if (index === -1 || index + 1 >= args.length) return fallback;
  const val = args[index + 1];
  // Skip flags
  if (val.startsWith("--")) return fallback;
  return val;
}

const title = getArg("title", "Monica Remotion Renderer");
const subtitle = getArg("subtitle", "Automatic video rendering pipeline");
const outPath = resolve(process.cwd(), getArg("out", "out/video.mp4"));

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\n🎬 Monica Remotion Renderer v${pkg.version}`);
  console.log(`   Title:    ${title}`);
  console.log(`   Subtitle: ${subtitle}`);
  console.log(`   Output:   ${outPath}\n`);

  // Ensure out dir exists
  mkdirSync(dirname(outPath), { recursive: true });

  const entry = resolve(process.cwd(), "src/index.ts");

  console.log("📦 Bundling...");
  const bundled = await bundle({ entryPoint: entry });

  console.log("🎞️  Selecting composition...");
  const composition = await selectComposition({
    serveUrl: bundled,
    id: "MonicaDemo",
    inputProps: { title, subtitle },
  });

  console.log(`   Composition: ${composition.id} (${composition.width}x${composition.height}, ${composition.durationInFrames}f @ ${composition.fps}fps)`);

  console.log("🎥 Rendering...");
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: outPath,
    inputProps: { title, subtitle },
  });

  console.log(`\n✅ Done! Output: ${outPath}\n`);
}

main().catch((err) => {
  console.error("❌ Render failed:");
  console.error(err);
  process.exit(1);
});