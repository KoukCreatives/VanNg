// Screenshots every concept at mobile (390) and desktop (1440) in EN + zh-Hant,
// plus the type page. Fonts are served from node_modules in place of the jsDelivr CDN.
// Usage: node build/shoot.mjs [slugFilter] [--nofonts]
import { createRequire as cr } from 'node:module';
const { chromium } = cr(import.meta.url)('playwright');
import fs from 'node:fs';
import path from 'node:path';
import { concepts } from './concepts.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const filter = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : '';
const noFonts = process.argv.includes('--nofonts');
const out = path.join(ROOT, noFonts ? 'screens/fallback' : 'screens');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
async function shot(file, width, name, full = true) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.route('https://cdn.jsdelivr.net/npm/@fontsource/**', async (route) => {
    if (noFonts) return route.abort();
    const m = route.request().url().match(/@fontsource\/([^@]+)@[^/]+\/(.+)$/);
    const p = path.join(ROOT, 'node_modules/@fontsource', m[1], m[2]);
    const type = p.endsWith('.css') ? 'text/css' : 'font/woff2';
    route.fulfill({ path: p, contentType: type, headers: { 'access-control-allow-origin': '*' } });
  });
  await pg.goto('file://' + path.join(ROOT, 'concepts', file));
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(400);
  // overflow check: anything wider than viewport?
  const over = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (over > 0) console.log('HORIZONTAL OVERFLOW', file, width, over);
  await pg.screenshot({ path: path.join(out, name), fullPage: full, type: 'jpeg', quality: 82 });
  await ctx.close();
}
for (const c of concepts.filter((c) => c.slug.includes(filter))) {
  for (const [k, f] of [['en', `${c.slug}-en.html`], ['zh', `${c.slug}-zh-hant.html`]]) {
    await shot(f, 390, `${c.slug}-${k}-mobile.jpg`);
    await shot(f, 1440, `${c.slug}-${k}-desktop.jpg`);
  }
  if (!noFonts) { await shot(`${c.slug}-type.html`, 1440, `${c.slug}-type.jpg`); await shot(`${c.slug}-zh-hans.html`, 390, `${c.slug}-hans-mobile.jpg`); }
  console.log('done', c.slug);
}
await browser.close();
