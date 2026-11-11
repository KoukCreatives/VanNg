// Builds index.html, the overview board for all concepts.
import fs from 'node:fs';
import path from 'node:path';
import { concepts, palettes } from './concepts.mjs';
import { cdn } from './build.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const card = (c) => {
  const p = palettes[c.palette];
  return `<article class="concept" id="c${c.n}">
  <header><p class="num">Concept ${c.n}</p><h2>${c.name}</h2>
  <p class="pal"><span class="dot" style="background:${p.bg}"></span><span class="dot" style="background:${p.band}"></span><span class="dot" style="background:${p.head}"></span><span class="dot" style="background:${p.btn}"></span><span class="dot" style="background:${p.deco}"></span>${p.name}</p></header>
  <div class="shots">
    <a href="screens/${c.slug}-en-desktop.jpg" class="desk"><img loading="lazy" src="screens/${c.slug}-en-desktop.jpg" alt="${c.name}, English, desktop"></a>
    <a href="screens/${c.slug}-en-mobile.jpg" class="mob"><img loading="lazy" src="screens/${c.slug}-en-mobile.jpg" alt="${c.name}, English, mobile"></a>
    <a href="screens/${c.slug}-zh-mobile.jpg" class="mob"><img loading="lazy" src="screens/${c.slug}-zh-mobile.jpg" alt="${c.name}, Traditional Chinese, mobile"></a>
  </div>
  <p>${c.summary}</p>
  <dl><dt>English</dt><dd>${c.head.label} + ${c.bodyLatin.label}</dd><dt>中文</dt><dd>${c.zhHead.label} + ${c.zhBody.label}${c.accent ? ` + ${c.accent.label}` : ''}</dd><dt>Gold</dt><dd>${c.gold}</dd></dl>
  <p class="links"><a href="concepts/${c.slug}-en.html">English page</a><a href="concepts/${c.slug}-zh-hant.html" lang="zh-Hant">繁體中文</a><a href="concepts/${c.slug}-zh-hans.html" lang="zh-Hans">简体 (test)</a><a href="concepts/${c.slug}-type.html">Type system and contrast</a><a href="screens/${c.slug}-zh-desktop.jpg">中文 desktop</a></p>
</article>`;
};

const html = `<!doctype html>
<html lang="en-NZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Van Ng · Website concepts</title><meta name="robots" content="noindex">
<link rel="stylesheet" href="${cdn('source-sans-3', '400.css')}"><link rel="stylesheet" href="${cdn('source-sans-3', '600.css')}"><link rel="stylesheet" href="${cdn('noto-sans-tc', '400.css')}">
<style>
:root{--bg:#f7f4f2;--ink:#232022;--muted:#5d5759;--line:#e2dcd9;--card:#fff}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.6 "Source Sans 3","Noto Sans TC",system-ui,sans-serif;font-synthesis:none}
.wrap{max-width:84rem;margin:0 auto;padding:0 16px}@media(min-width:900px){.wrap{padding:0 40px}}
header.top{padding:48px 0 24px}h1{font-size:clamp(2rem,1.5rem + 2vw,3rem);line-height:1.1;margin:0 0 .5rem;font-weight:600}
.lede{max-width:52rem;color:var(--muted);font-size:1.125rem}
.status{display:inline-block;background:#fff4d6;border:1px dashed #b8860b;color:#6a4a00;font-size:.8125rem;padding:.15rem .5rem;border-radius:3px}
.grid{display:grid;gap:24px;padding:24px 0 48px}@media(min-width:1000px){.grid{grid-template-columns:1fr 1fr}}
.concept{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:20px;min-width:0}
.concept h2{margin:0;font-size:1.5rem;line-height:1.2;font-weight:600}.num{margin:0;color:var(--muted);font-size:.8125rem;letter-spacing:.06em;text-transform:uppercase}
.pal{display:flex;align-items:center;gap:4px;flex-wrap:wrap;font-size:.875rem;color:var(--muted);margin:.4rem 0 1rem}.dot{width:16px;height:16px;border-radius:50%;border:1px solid rgba(0,0,0,.12);display:inline-block}.pal .dot:last-of-type{margin-right:6px}
.shots{display:grid;grid-template-columns:3fr 1fr 1fr;gap:8px;align-items:start}.shots a{display:block;height:300px;overflow:hidden;border:1px solid var(--line);border-radius:6px;background:#eee}
.shots img{width:100%;display:block}
dl{display:grid;grid-template-columns:auto 1fr;gap:.25rem 1rem;font-size:.9375rem;margin:1rem 0}dt{font-weight:600}dd{margin:0;color:var(--muted)}
.links{display:flex;flex-wrap:wrap;gap:.25rem 1rem;font-size:.9375rem}.links a{color:#7a3e4e}
section.notes{padding:8px 0 64px}section.notes h2{font-size:1.375rem;font-weight:600}section.notes li{margin-bottom:.4rem;max-width:56rem}
</style></head>
<body>
<header class="top wrap">
<p class="status">KC-575 · Round 1 concepts · not client-approved · draft copy from KC-576 · Chinese is a type-testing draft for fluent review</p>
<h1>Van Ng website: eight bilingual concepts</h1>
<p class="lede">Each concept is a working home page in English and Traditional Chinese, with a Simplified test page and a type-system sheet. The image boxes are placeholders for Van’s authorised photos. Concepts 1 and 2 are the fair palette pair: same layout, type, crop and wording, with only the colour direction changed. Start with those when asking Van which feels warm, trustworthy and genuinely her.</p>
<p class="lede"><a href="typography.html">Typography decisions (shared system)</a> · <a href="https://github.com/KoukCreatives/VanNg">Source on GitHub</a></p>
</header>
<main class="wrap"><div class="grid">
${concepts.map(card).join('\n')}
</div>
<section class="notes"><h2>Decisions needed before Round 2</h2><ul>
<li>Traditional, Simplified or both. The Traditional pages are designed first because of the poster and the testimonial screenshot, but that is a clue, not a decision. Every concept already swaps to Noto SC.</li>
<li>Blush or lucky red, and whether any decorative gold feels genuine to Van. Concepts 3, 4, 6, 7 and 8 work with no gold at all.</li>
<li>Glossary terms for the fluent reviewer: 證婚人, 粵語 / 廣東話, 普通話 / 國語, 民事結合, 索取報價.</li>
<li>Whether the LXGW WenKai accent (Concept 5) or the vertical phrase (Concept 8) is welcome. Both are optional and decorative.</li>
<li>Final URLs (/ceremonies/ and the Chinese URL pattern). The concepts use flat file names only so they can be browsed from GitHub.</li>
</ul></section></main>
</body></html>`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('board written');
