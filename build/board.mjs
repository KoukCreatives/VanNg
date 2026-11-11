// Builds index.html: links + live previews of the eight Home-0N.html designs.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const homes = [
  ['Petal Invitation', 'Blush', 'Cormorant Garamond + Noto Serif TC', 'Wedding-stationery feel. A framed invitation card overlaps an arched portrait, with centred sections and language “rings”. One champagne hairline.', '01-petal-letter'],
  ['Red Editorial', 'Lucky red', 'EB Garamond + Noto Serif TC', 'Magazine cover. A large burgundy headline beside a tall portrait, a three-fact strip (languages, travel, registration) and one short burgundy band.', '02-lucky-red-letter'],
  ['Quiet Letter', 'Blush', 'Literata + Noto Serif TC', 'The home page reads as a personal letter on paper, with a sticky sidebar for navigation on desktop. The calmest and most readable for long Chinese text.', '03-quiet-page'],
  ['Soft Bento', 'Rose & Ivory (no gold)', 'Source Sans 3 + Noto Sans TC', 'Rounded tiles in a bento grid with a floating pill header. All sans serif, practical and light to load.', '04-soft-sans'],
  ['Ink & Petal', 'Peony & Mocha', 'Cormorant + LXGW WenKai accent', 'A full-bleed ceremony photo with an overlapping intro panel. One short handwritten-style Chinese phrase and a mocha quote band.', '05-ink-and-petal'],
  ['Red Thread', 'Lucky red', 'Noto Serif + Noto Serif TC', 'A burgundy hero with a framed portrait, then a red “thread” line with knots running through every section.', '06-red-thread'],
  ['Garden Collage', 'Blush', 'Fraunces + Noto Serif TC', 'Three-photo collage with fine-line sprigs, wavy blush bands and offset cards. The most celebratory.', '07-garden-hour'],
  ['Two Voices', 'Ivory & burgundy', 'Source Serif 4 + Noto Serif TC', 'English and Chinese heroes sit side by side, split by a vertical Chinese phrase. Each language row shows its name in both scripts.', '08-two-voices'],
];
const card = ([name, pal, type, desc, slug], i) => {
  const f = `Home-${String(i + 1).padStart(2, '0')}.html`;
  return `<article class="c">
<a class="pv" href="${f}" aria-label="Open ${name}"><iframe src="${f}" loading="lazy" tabindex="-1" title="${name} preview" scrolling="no"></iframe></a>
<div class="meta"><p class="num">Home ${String(i + 1).padStart(2, '0')}</p><h2><a href="${f}">${name}</a></h2>
<p class="tags"><span>${pal}</span><span>${type}</span></p><p>${desc}</p>
<p class="links"><a href="${f}">English</a><a href="${f}#zh-hant" lang="zh-Hant">繁體中文</a><a href="${f}#zh-hans" lang="zh-Hans">简体 (test)</a><a href="concepts/${slug}-type.html">Type sheet</a></p></div>
</article>`;
};
const html = `<!doctype html>
<html lang="en-NZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Van Ng · 8 homepage designs</title><meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/source-sans-3@5.3.1/400.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/source-sans-3@5.3.1/600.css">
<style>
:root{--bg:#f7f4f2;--ink:#232022;--muted:#5d5759;--line:#e2dcd9;--card:#fff;--acc:#7a3e4e}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.6 "Source Sans 3",system-ui,sans-serif;font-synthesis:none}
.wrap{max-width:86rem;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
@media(min-width:900px){.wrap{padding-left:40px;padding-right:40px}}
header{padding-block:44px 16px}h1{font-size:clamp(2rem,1.5rem + 2vw,3rem);line-height:1.1;margin:0 0 .4em;font-weight:600;text-wrap:balance}
.lede{max-width:52rem;color:var(--muted);font-size:1.125rem;margin:0 0 .6em}
.status{display:inline-block;background:#fff4d6;border:1px dashed #b8860b;color:#6a4a00;font-size:.8125rem;padding:.15rem .5rem;border-radius:3px}
.grid{display:grid;gap:24px;padding-block:24px 64px}@media(min-width:1000px){.grid{grid-template-columns:1fr 1fr}}
.c{background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:hidden;display:grid;min-width:0}
.pv{display:block;position:relative;aspect-ratio:16/10;overflow:hidden;border-bottom:1px solid var(--line);background:#eee}
.pv iframe{position:absolute;top:0;left:0;width:1440px;height:900px;border:0;transform-origin:0 0;pointer-events:none}
.meta{padding:18px 22px 22px}.num{margin:0;color:var(--muted);font-size:.8125rem;letter-spacing:.06em;text-transform:uppercase}
h2{margin:.1em 0 .3em;font-size:1.5rem;line-height:1.2;font-weight:600}h2 a{color:inherit;text-decoration:none}h2 a:hover{text-decoration:underline}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 .6em}.tags span{font-size:.8125rem;border:1px solid var(--line);border-radius:999px;padding:.1rem .6rem;color:var(--muted)}
.meta p{margin:0 0 .6em}.links{display:flex;flex-wrap:wrap;gap:4px 16px}.links a{color:var(--acc);font-weight:600}
footer{padding-block:0 64px;color:var(--muted);font-size:.9375rem}footer a{color:var(--acc)}
</style></head><body>
<header class="wrap"><p class="status">KC-575 · not client-approved · draft copy from KC-576 · Chinese is a type-testing draft for fluent review</p>
<h1>Van Ng: 8 homepage designs</h1>
<p class="lede">Each design is a live, responsive home page. Use the language switch in its header to change between English, Traditional Chinese, and a Simplified test. The pink boxes stand in for Van’s authorised photos.</p></header>
<main class="wrap"><div class="grid">${homes.map(card).join('\n')}</div></main>
<footer class="wrap"><p><a href="typography.html">Typography decisions</a> · <a href="https://github.com/KoukCreatives/VanNg">Source on GitHub</a></p></footer>
<script>
function fit(){document.querySelectorAll('.pv').forEach(function(p){var f=p.querySelector('iframe');f.style.transform='scale('+(p.clientWidth/1440)+')';});}
addEventListener('resize',fit);fit();
</script>
</body></html>`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('board written');
