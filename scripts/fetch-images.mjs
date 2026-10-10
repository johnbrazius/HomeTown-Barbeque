#!/usr/bin/env node
/**
 * Self-host the site imagery: downloads every image in src/content/images.ts
 * that is missing from public/images. Re-run safely; existing files are kept.
 *
 *   npm run images:fetch
 *
 * Once the files exist, the site serves them locally (see src/lib/images.ts)
 * and the remote host is no longer contacted.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { images } = await import(path.join(root, "src/content/images.ts"));
const outDir = path.join(root, "public/images");
await mkdir(outDir, { recursive: true });

let failed = 0;
for (const [key, entry] of Object.entries(images)) {
  const dest = path.join(outDir, entry.file);
  try {
    await access(dest);
    console.log(`✓ ${entry.file} (already present)`);
    continue;
  } catch {}
  try {
    const res = await fetch(entry.remote);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`↓ ${entry.file} (${(buf.length / 1024).toFixed(0)} KB) ← ${key}`);
  } catch (err) {
    failed++;
    console.error(`✗ ${entry.file}: ${err.message}`);
  }
}
if (failed) {
  console.error(`\n${failed} image(s) failed. The site keeps using the remote URL for those.`);
  process.exit(1);
}
console.log("\nDone. Commit public/images to self-host the imagery.");
