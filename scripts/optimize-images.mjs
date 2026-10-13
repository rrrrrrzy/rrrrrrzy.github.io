import { readFile, readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const manifestPath = 'src/data/imageManifest.json';
const outputDir = 'public/images/optimized';
const sources = (await readdir('public/images', { recursive: true })).filter(file => !file.startsWith('optimized/') && /\.(jpe?g|png|webp)$/i.test(file)).sort().map(file => `public/images/${file}`);
let previous = {};
try { previous = JSON.parse(await readFile(manifestPath, 'utf8')); } catch { /* First build generates the manifest. */ }
await mkdir(outputDir, { recursive: true });
const manifest = {};
for (const source of sources) {
    const data = await readFile(source);
    const hash = createHash('sha256').update(data).update('webp-q80-v1').digest('hex');
    const key = source.replace(/^public/, '');
    const name = key.replace(/^\/images\//, '').replace(/\.[^.]+$/, '').replaceAll('/', '-');
    const widths = key.includes('/gallery/') ? [640, 1280] : [256, 512];
    const prior = previous[key];
    if (prior?.hash === hash && await Promise.all(prior.variants.map(async item => {
        try { await stat('public' + item.src); return true; } catch { return false; }
    })).then(results => results.every(Boolean))) {
        manifest[key] = prior;
        continue;
    }
    const variants = [];
    for (const width of widths) {
        const src = `/images/optimized/${name}-${width}.webp`;
        const result = await sharp(data).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile('public' + src);
        variants.push({ src, width: result.width, height: result.height });
    }
    manifest[key] = { hash, width: variants.at(-1).width, height: variants.at(-1).height, variants };
    console.log(`Optimized ${key}`);
}
// Existing paper figures are already compressed; record dimensions without recompressing them.
for (const file of (await readdir('public/fm-geometry/media')).filter(file => /\.(jpe?g|png|webp)$/i.test(file)).sort()) {
    const src = '/fm-geometry/media/' + file;
    const { width, height } = await sharp('public' + src).metadata();
    manifest[src] = { width, height, variants: [{ src, width, height }] };
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
