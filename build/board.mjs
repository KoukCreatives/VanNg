// Builds index.html: links + live previews of the eight Home-0N.html designs.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const homes = [
  ['Estate', 'Blush + cocoa', 'Cormorant Garamond + Noto Serif TC', 'Full-screen ceremony photo under a slim ribbon, a three-part strip (languages, travel, registration), and a photo-backed quote.', '01-petal-letter', 'Markovina Estate'],
  ['Panorama', 'White + rose', 'EB Garamond + Noto Serif TC', 'Lake panorama first, quiet uppercase navigation with a clear 中文 switch, and a swipeable photo strip.', '02-lucky-red-letter', 'Felix Image'],
  ['Statement', 'Lucky red', 'Source Sans 3 Black + Noto Sans TC', '“Your story, in your words.” huge on a rounded photo card, a scrolling language marquee and chunky rounded panels.', '04-soft-sans', 'Fallon Photography'],
  ['Planner', 'Blush', 'Literata + Noto Serif TC', 'Pick languages and location in the hero. The choice fills the enquiry form for you.', '03-quiet-page', 'OneThreeOneFour'],
  ['Cinematic', 'Peony + mocha', 'Cormorant Garamond Italic + Noto Serif TC', 'Black-and-white film-like hero with an italic headline, then image and text in a zig-zag.', '05-ink-and-petal', 'Abel Estate'],
  ['Horizon', 'Warm ivory', 'EB Garamond Italic + Noto Serif TC', 'Oversized serif with one rose italic phrase, over an alpine lake with a round photo inset.', '07-garden-hour', 'Queenstown Elopements'],
  ['Gallery', 'White + rose', 'Cormorant Garamond + Noto Serif TC', 'Centred wordmark with split menu, and a full-width crossfading slideshow.', '06-red-thread', 'Roy Byrne Photography'],
  ['Journal', 'Lucky red', 'Source Serif 4 + Noto Serif TC', 'Magazine masthead, image tiles that jump to each section, and a drop cap.', '08-two-voices', 'Together Journal'],
];
const card = ([name, pal, type, desc, slug, ref], i) => {
  const f = `Home-${String(i + 1).padStart(2, '0')}.html`;
  return `<article class="c">
<a class="pv" href="${f}" aria-label="Open ${name}"><iframe src="${f}" loading="lazy" tabindex="-1" title="${name} preview" scrolling="no"></iframe></a>
<div class="meta"><p class="num">Home ${String(i + 1).padStart(2, '0')}</p><h2><a href="${f}">${name}</a></h2>
<p class="tags"><span>${pal}</span><span>${type}</span><span>Pattern from: ${ref}</span></p><p>${desc}</p>
<p class="links"><a href="${f}">English</a><a href="${f}#zh-hant" lang="zh-Hant">繁體中文</a><a href="${f}#zh-hans" lang="zh-Hans">简体 (test)</a></p></div>
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
<p class="lede">Round 2. Each design is an original Van home page built on one strong pattern from a leading NZ wedding site. Nothing is copied from those sites. Each page is live and responsive. Use the language switch in its header to change between English, Traditional Chinese, and a Simplified test. Photos are Unsplash samples standing in for Van’s authorised photos.</p></header>
<main class="wrap"><div class="grid">${homes.map(card).join('\n')}</div></main>
<footer class="wrap"><p><a href="typography.html">Typography decisions</a> · <a href="https://github.com/KoukCreatives/VanNg">Source on GitHub</a></p></footer>
<script>
function fit(){document.querySelectorAll('.pv').forEach(function(p){var f=p.querySelector('iframe');f.style.transform='scale('+(p.clientWidth/1440)+')';});}
addEventListener('resize',fit);fit();
</script>
</body></html>`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('board written');
