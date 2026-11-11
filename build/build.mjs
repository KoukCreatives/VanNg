// Builds the concept pages. Run: node build/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import * as OpenCC from 'opencc-js';
import { en, zhHant, spec } from './content.mjs';
import { concepts, palettes } from './concepts.mjs';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const FS = path.join(ROOT, 'node_modules/@fontsource');
const ver = (pkg) => require(`${FS}/${pkg}/package.json`).version;
export const cdn = (pkg, file) => `https://cdn.jsdelivr.net/npm/@fontsource/${pkg}@${ver(pkg)}/${file}`;

// ---------- Simplified test copy (OpenCC tw -> cn) ----------
const t2s = OpenCC.Converter({ from: 'tw', to: 'cn' });
const deep = (o) => typeof o === 'string' ? t2s(o) : Array.isArray(o) ? o.map(deep) : (o && typeof o === 'object') ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, deep(v)])) : o;
const zhHans = { ...deep(zhHant), lang: 'zh-Hans', draftFlag: '概念样稿 · 简体为字体测试（由繁体自动转换）· 网站文字尚未决定', brand: zhHant.brand, copyright: zhHant.copyright };
const specHans = deep(spec);

// ---------- contrast ----------
const lum = (hex) => { const c = hex.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255).map((v) => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

// ---------- font CSS ----------
// ARTIFACT=1 builds dist/ for claude.ai hosting: Google Fonts CSS + inlined display face (CSP allows only those).
const ARTIFACT = process.env.ARTIFACT === '1';
const OUT = ARTIFACT ? path.join(ROOT, 'dist') : ROOT;
const gname = { 'source-sans-3': 'Source Sans 3', 'noto-serif-tc': 'Noto Serif TC', 'noto-sans-tc': 'Noto Sans TC', 'noto-serif-sc': 'Noto Serif SC', 'noto-sans-sc': 'Noto Sans SC', 'lxgw-wenkai-tc': 'LXGW WenKai TC' };
function googleLink(c, scripts) {
  const fams = new Map([['Source Sans 3', new Set(c.bodyLatin.weights)]]);
  const add = (pkg, w) => { const n = gname[pkg]; if (!fams.has(n)) fams.set(n, new Set()); fams.get(n).add(w); };
  for (const s of scripts) { add(c.zhHead[s], c.zhHead.weight); add(c.zhBody[s], c.zhBody.weight); }
  if (c.accent) add('lxgw-wenkai-tc', 400);
  const q = [...fams].map(([n, ws]) => `family=${n.replace(/ /g, '+')}:wght@${[...ws].sort().join(';')}`).join('&');
  return `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${q}&display=swap">`;
}
function headFace(c) {
  // Re-declare the Latin display face under two names: as-is for English, size-adjusted for Chinese lines.
  const out = [];
  for (const sub of ['latin', 'latin-ext']) {
    const css = fs.readFileSync(`${FS}/${c.head.pkg}/${c.head.weight}.css`, 'utf8');
    const block = css.split('/* ').find((b) => b.startsWith(`${c.head.pkg}-${sub}-${c.head.weight}-normal */`));
    const range = block.match(/unicode-range:\s*([^;]+);/)[1];
    const file = `files/${c.head.pkg}-${sub}-${c.head.weight}-normal.woff2`;
    const url = ARTIFACT ? `data:font/woff2;base64,${fs.readFileSync(`${FS}/${c.head.pkg}/${file}`).toString('base64')}` : cdn(c.head.pkg, file);
    for (const [fam, adj] of [['HeadLatin', 1], ['HeadLatinZh', c.head.zhAdjust]]) {
      out.push(`@font-face{font-family:"${fam}";src:url(${url}) format("woff2");font-weight:${c.head.weight};font-style:normal;font-display:swap;unicode-range:${range};${adj !== 1 ? `size-adjust:${Math.round(adj * 100)}%;` : ''}}`);
    }
  }
  return out.join('\n');
}
function fontLinks(c, script, { allScripts = false } = {}) {
  if (ARTIFACT) return googleLink(c, allScripts ? ['tc', 'sc'] : [script]);
  const links = [];
  const pre = cdn(c.head.pkg, `files/${c.head.pkg}-latin-${c.head.weight}-normal.woff2`);
  links.push(`<link rel="preload" as="font" type="font/woff2" crossorigin href="${pre}">`);
  for (const w of c.bodyLatin.weights) links.push(`<link rel="stylesheet" href="${cdn(c.bodyLatin.pkg, `latin-${w}.css`)}">`, `<link rel="stylesheet" href="${cdn(c.bodyLatin.pkg, `latin-ext-${w}.css`)}">`);
  const scripts = allScripts ? ['tc', 'sc'] : [script];
  for (const s of scripts) {
    // Fontsource CJK CSS is sliced by unicode-range: the browser only fetches slices for characters on the page.
    links.push(`<link rel="stylesheet" href="${cdn(c.zhHead[s], `${c.zhHead.weight}.css`)}">`);
    if (c.zhBody[s] !== c.zhHead[s] || c.zhBody.weight !== c.zhHead.weight) links.push(`<link rel="stylesheet" href="${cdn(c.zhBody[s], `${c.zhBody.weight}.css`)}">`);
    if (c.accent) links.push(`<link rel="stylesheet" href="${cdn(s === 'tc' ? 'lxgw-wenkai-tc' : 'lxgw-wenkai', s === 'tc' ? '400.css' : '500.css')}">`);
  }
  return links.join('\n');
}
const fam = (pkg) => ({ 'noto-serif-tc': 'Noto Serif TC', 'noto-sans-tc': 'Noto Sans TC', 'noto-serif-sc': 'Noto Serif SC', 'noto-sans-sc': 'Noto Sans SC' }[pkg]);
function tokens(c) {
  const p = palettes[c.palette];
  const latinBody = { 'source-sans-3': 'Source Sans 3' }[c.bodyLatin.pkg];
  return `/* ${c.name} · generated tokens */
:root{--bg:${p.bg};--band:${p.band};--text:${p.text};--head:${p.head};--muted:${p.muted};--btn:${p.btn};--btn-hover:${p.btnHover};--on-btn:${p.onBtn};--link:${p.link};--deco:${p.deco};${p.deco2 ? `--deco2:${p.deco2};` : ''}--field-border:${p.field};--focus:${p.text};--surface:${p.surface};--line:color-mix(in srgb, ${p.text} 18%, transparent);
--f-body-latin:"${latinBody}";--f-head-zh:"${fam(c.zhHead.tc)}";--f-body-zh:"${fam(c.zhBody.tc)}";}
:lang(zh-Hans){--f-head-zh:"${fam(c.zhHead.sc)}";--f-body-zh:"${fam(c.zhBody.sc)}";}
${c.slug === '04-soft-sans' ? ':root, [lang]{--font-head: var(--f-head-latin), var(--f-head-zh), system-ui, var(--zh-sans-fallback), sans-serif;}' : ''}
${c.zhHead.weight !== c.head.weight ? `:lang(zh) h1, :lang(zh) h2, :lang(zh) h3, :lang(zh) .quote p { font-weight: ${c.zhHead.weight}; }` : ''}
`;
}

// ---------- SVG ornaments (generic, original) ----------
const sprig = `<svg class="orn orn-sprig" viewBox="0 0 200 160" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M10 150 C60 120 100 80 190 10"/><path d="M60 118 c-6-18 4-34 22-38 c-2 18-10 32-22 38z"/><path d="M95 88 c14-12 32-12 44-2 c-14 10-30 12-44 2z"/><path d="M118 62 c-4-20 8-36 26-38 c0 18-10 32-26 38z"/><path d="M150 36 c12-8 26-6 34 2 c-12 8-24 8-34-2z"/><circle cx="40" cy="132" r="5"/><circle cx="172" cy="16" r="4"/></svg>`;
const blob = `<svg class="orn orn-blob" viewBox="0 0 200 200" aria-hidden="true"><path fill="currentColor" d="M44 30c30-28 92-30 122 6s30 96-6 124-104 30-132-6S14 58 44 30z"/></svg>`;
const blob2 = blob.replace('orn-blob', 'orn-blob2');

// ---------- page template ----------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function page(c, L, key) {
  const isZh = key !== 'en';
  const files = { en: `${c.slug}-en.html`, hant: `${c.slug}-zh-hant.html`, hans: `${c.slug}-zh-hans.html`, type: `${c.slug}-type.html` };
  const accentPhrase = key === 'hans' ? '言语的力量' : '言語的力量';
  const accent = c.accent ? `<span class="accent" lang="${key === 'hans' ? 'zh-Hans' : 'zh-Hant'}" ${isZh ? '' : 'aria-describedby="accent-gloss"'}>${accentPhrase}</span>${isZh ? '' : '<span id="accent-gloss" hidden>“The power of words”</span>'}` : '';
  const lockup = c.layout === 'lockup' ? `<ul class="lockup" aria-label="${isZh ? '儀式語言' : 'Ceremony languages'}"><li lang="en">English</li><li lang="${key === 'hans' ? 'zh-Hans' : 'zh-Hant'}">${key === 'hans' ? '粤语' : '粵語'}</li><li lang="${key === 'hans' ? 'zh-Hans' : 'zh-Hant'}">${key === 'hans' ? '普通话' : '普通話'}</li></ul>` : '';
  const vert = c.layout === 'lockup' ? `<p class="vert" lang="${key === 'hans' ? 'zh-Hans' : 'zh-Hant'}" aria-hidden="true">${accentPhrase}</p>` : '';
  const heroCopy = `<div class="hero-copy">${accent}${lockup}
      <p class="eyebrow">${L.heroEyebrow}</p>
      <h1>${L.h1}</h1>
      <p class="lede">${L.intro}</p>
      <p>${L.intro2}</p>
      <div class="btns"><a class="btn" href="#enquire">${L.cta}</a><a class="textlink" href="#approach">${L.cta2}</a></div>
      <hr class="hairline">
    </div>`;
  const fig = `<figure class="figure hero-fig"><b>${L.imgLabel}</b><span>${L.imgNote}</span></figure>`;
  const hero = c.layout === 'band'
    ? `<section class="hero"><div class="hero-band"><div class="wrap">${heroCopy}</div></div><div class="wrap hero-figwrap">${fig}</div></section>`
    : `<section class="hero">${sprig}<div class="wrap hero-grid">${blob}${blob2}${heroCopy}${vert}${fig}</div></section>`;
  const langLinks = `<div class="langswitch" role="navigation" aria-label="${isZh ? '語言' : 'Language'}"><span class="ls-label">${L.switchLabel}:</span>
      <a href="${files.en}" lang="en" hreflang="en" ${key === 'en' ? 'aria-current="true"' : ''}>English</a>
      <a href="${key === 'hans' ? files.hans : files.hant}" lang="${key === 'hans' ? 'zh-Hans' : 'zh-Hant'}" hreflang="${key === 'hans' ? 'zh-Hans' : 'zh-Hant'}" ${isZh ? 'aria-current="true"' : ''}>${key === 'hans' ? '简体中文' : '繁體中文'}</a></div>`;
  const navItems = L.nav.map((n, i) => `<li><a href="#" ${i === 0 ? 'aria-current="page"' : ''}>${n}</a></li>`).join('');
  return `<!doctype html>
<html lang="${key === 'en' ? 'en-NZ' : L.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${c.n}. ${c.name} · ${key === 'en' ? 'English' : key === 'hant' ? '繁體中文' : '简体中文 (test)'} · Van Ng concepts</title>
<meta name="robots" content="noindex">
${fontLinks(c, key === 'hans' ? 'sc' : 'tc')}
<style>${headFace(c)}</style>
<link rel="stylesheet" href="../assets/base.css">
<link rel="stylesheet" href="../assets/${c.slug}.css">
</head>
<body class="c-${c.slug} l-${c.layout}">
<a class="skip" href="#main">${isZh ? '跳至主要內容' : 'Skip to content'}</a>
<div class="draftbar" lang="en"><div class="wrap"><span>Concept ${c.n} · ${c.name} — ${esc(L.draftFlag)}</span>
<nav aria-label="Concept views"><a href="../index.html">All concepts</a><a href="${files.en}" ${key === 'en' ? 'aria-current="page"' : ''}>EN</a><a href="${files.hant}" ${key === 'hant' ? 'aria-current="page"' : ''}>繁</a><a href="${files.hans}" ${key === 'hans' ? 'aria-current="page"' : ''}>简 test</a><a href="${files.type}">Type system</a></nav></div></div>
<header class="site-head"><div class="wrap">
  <a class="brand" href="#" lang="en"><span class="brand-name">${L.brand}</span><span class="brand-sub" lang="${isZh ? L.lang : 'en'}">${L.brandSub}</span></a>
  <div class="head-right">
    <nav class="nav-desk" aria-label="${isZh ? '主選單' : 'Main'}"><ul>${navItems}</ul></nav>
    ${langLinks}
    <details class="nav-mob"><summary>${isZh ? '選單' : 'Menu'}</summary><nav aria-label="${isZh ? '主選單' : 'Main'}"><ul>${navItems}</ul></nav></details>
  </div>
</div></header>
<main id="main">
${hero}
<section class="approach" id="approach"><div class="wrap">
  <h2>${L.approachH}</h2>
  <div><p>${L.approach1}</p><p>${L.approach2}</p>
  <blockquote class="quote"><p>${L.quote}</p><footer>${L.quoteBy} <span class="flag">${L.quoteFlag}</span></footer></blockquote></div>
</div></section>
<section class="services"><div class="wrap">
  <h2>${L.servicesH}</h2>
  <div class="cards">${L.services.map((s) => `<article class="card"><h3>${s.h}</h3><p>${s.p.replace(/(\[[^\]]+\]|［[^］]+］)/g, '<span class="flag">$1</span>')}</p></article>`).join('')}</div>
</div></section>
<section class="languages band"><div class="wrap">
  <h2>${L.langH}</h2>
  <div><p>${L.lang1}</p><ul class="chips">${L.langChips.map((x) => `<li>${x}</li>`).join('')}</ul><a class="textlink" href="#">${L.langLink}</a></div>
</div></section>
<section class="cred-travel"><div class="wrap two">
  <div><h3>${L.credH}</h3><p>${L.cred}</p><a class="textlink" href="#">${L.credLink}</a></div>
  <div><h3>${L.travelH}</h3><p>${L.travel}</p></div>
</div></section>
<section class="enquiry" id="enquire"><div class="wrap two">
  <div class="enquiry-intro"><h2>${L.enqH}</h2><p>${L.enq1}</p><p>${L.enq2}</p><p class="note">${L.enqNote}</p></div>
  <div><p class="form-flag"><span class="flag">${L.formFlag}</span></p>
  <form onsubmit="return false" aria-describedby="privacy">
    ${L.fields.map(([lab, type, ph], i) => `<div class="field"><label for="f${i}">${lab}</label><input id="f${i}" type="${type}" ${ph ? `placeholder="${ph}"` : ''}></div>`).join('\n    ')}
    <div class="field"><label for="fm">${L.msg}</label><textarea id="fm"></textarea></div>
    <div><button class="btn" type="submit">${L.submit}</button></div>
    <p class="note" id="privacy"><span class="flag">${L.privacy}</span></p>
  </form></div>
</div></section>
</main>
<footer class="site-foot"><div class="wrap">
  <div><p class="brand-name" lang="en">${L.brand}</p><p>${L.footNote}</p><p><span class="flag">${L.footContact}</span></p></div>
  <div>${langLinks}<p class="note">${L.copyright}</p></div>
</div></footer>
</body>
</html>`;
}

// ---------- type system page ----------
function typePage(c) {
  const p = palettes[c.palette];
  const pairs = [
    ['Body text', p.text, p.bg], ['Body on band', p.text, p.band], ['Headings', p.head, p.bg], ['Headings on band', p.head, p.band],
    ['Muted / notes', p.muted, p.bg], ['Muted on band', p.muted, p.band], ['Links', p.link, p.bg], ['Button label', p.onBtn, p.btn],
    ['Button hover', p.onBtn, p.btnHover], ['Field border (non-text, 3:1)', p.field, p.surface], ['Decorative accent (never text)', p.deco, p.bg],
  ];
  const rows = pairs.map(([n, f, b]) => { const r = ratio(f, b); const need = n.includes('non-text') ? 3 : n.includes('Decorative') ? 0 : 4.5; return `<tr><td>${n}</td><td><span class="sw" style="background:${f}"></span>${f}</td><td><span class="sw" style="background:${b}"></span>${b}</td><td>${r.toFixed(2)}:1</td><td>${need === 0 ? 'decorative only' : r >= need ? 'pass' : '<b>FAIL</b>'}</td></tr>`; }).join('');
  const sample = (lang, L, S) => `
  <div class="spec-col" lang="${lang}">
    <p class="spec-label">${lang === 'en' ? 'English' : lang === 'zh-Hant' ? '繁體中文 (draft)' : '简体中文 (test)'}</p>
    <p class="spec-meta">H1</p><h1>${L.h1}</h1>
    <p class="spec-meta">H2</p><h2>${L.approachH}</h2>
    <p class="spec-meta">H3</p><h3>${L.credH}</h3>
    <p class="spec-meta">Long heading (H2)</p><h2>${lang === 'en' ? S.enLongH : S.zhLongH}</h2>
    <p class="spec-meta">Body</p><p>${lang === 'en' ? L.approach1 + ' ' + L.approach2 : S.zhLongP}</p>
    <p class="spec-meta">Mixed-script line</p><p>${lang === 'en' ? S.mixedEn : S.mixed}</p>
    ${lang === 'en' ? '' : `<p class="spec-meta">Punctuation · numerals</p><p>${S.punct}<br>${S.nums}</p>`}
    <p class="spec-meta">Quote</p><blockquote class="quote"><p>${L.quote}</p></blockquote>
    <p class="spec-meta">Button · label · nav</p><p><a class="btn" href="#">${L.cta}</a></p><label>${L.fields[2][0]}</label>
    <p>${L.nav.join(' · ')}</p>
  </div>`;
  const fontRows = [
    ['English headings', c.head.label, `${c.head.pkg} latin + latin-ext, 1 file each, preloaded (latin)`],
    ['English body, nav, forms, buttons', c.bodyLatin.label, '2 weights × latin/latin-ext'],
    ['Chinese headings', `${c.zhHead.label} / SC ${c.zhHead.weight}`, 'unicode-range slices, CJK weight 1 of 2'],
    ['Chinese body, nav, forms, buttons', `${c.zhBody.label} / SC ${c.zhBody.weight}`, 'unicode-range slices, CJK weight 2 of 2'],
    ...(c.accent ? [['Accent phrase only', c.accent.label, 'production: subset to phrase glyphs only']] : []),
  ].map((r) => `<tr>${r.map((x) => `<td>${x}</td>`).join('')}</tr>`).join('');
  return `<!doctype html>
<html lang="en-NZ">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${c.n}. ${c.name} · Type system · Van Ng concepts</title><meta name="robots" content="noindex">
${fontLinks(c, 'tc', { allScripts: true })}
<style>${headFace(c)}</style>
<link rel="stylesheet" href="../assets/base.css"><link rel="stylesheet" href="../assets/${c.slug}.css">
<link rel="stylesheet" href="../assets/type.css">
</head>
<body class="c-${c.slug} typepage">
<div class="draftbar"><div class="wrap"><span>Concept ${c.n} · ${c.name} — type system and checks</span>
<nav aria-label="Concept views"><a href="../index.html">All concepts</a><a href="${c.slug}-en.html">EN</a><a href="${c.slug}-zh-hant.html">繁</a><a href="${c.slug}-zh-hans.html">简 test</a><a aria-current="page" href="#">Type system</a></nav></div></div>
<main class="wrap">
  <header class="spec-head"><p class="eyebrow">Concept ${c.n} · ${palettes[c.palette].name}</p><h1 class="spec-title">${c.name}</h1><p>${c.summary}</p></header>
  <section><h2 class="spec-h">Typography decisions</h2><ul class="spec-list">${c.type.map((t) => `<li>${t}</li>`).join('')}</ul>
  <table class="spec-table"><thead><tr><th>Role</th><th>Font</th><th>Loading</th></tr></thead><tbody>${fontRows}</tbody></table>
  <p class="note">Every page sets <code>font-synthesis: none</code>, <code>font-display: swap</code> and Chinese <code>letter-spacing: normal</code>. Latin is first in every stack, then the CJK web font, then system CJK fonts. On Chinese pages the Latin display face is re-declared with <code>size-adjust: ${Math.round(c.head.zhAdjust * 100)}%</code>. Chinese uses one body weight, so emphasis uses colour, not bold.</p></section>
  <section><h2 class="spec-h">Hierarchy in both scripts</h2><div class="spec-grid">${sample('en', en, spec)}${sample('zh-Hant', zhHant, spec)}</div></section>
  <section><h2 class="spec-h">Traditional vs Simplified (script decision pending)</h2><div class="spec-grid">${sample('zh-Hant', zhHant, spec)}${sample('zh-Hans', zhHans, specHans)}</div></section>
  <section><h2 class="spec-h">Contrast (calculated from tokens)</h2><table class="spec-table"><thead><tr><th>Pair</th><th>Foreground</th><th>Background</th><th>Ratio</th><th>AA</th></tr></thead><tbody>${rows}</tbody></table>
  <p><b>Gold / accent:</b> ${c.gold}</p><p><b>Risks to check:</b> ${c.risks}</p></section>
</main>
</body></html>`;
}

// ---------- write ----------
fs.mkdirSync(path.join(OUT, 'concepts'), { recursive: true }); fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
for (const c of concepts) {
  fs.writeFileSync(path.join(OUT, 'assets', `${c.slug}.css`), tokens(c) + c.css);
  fs.writeFileSync(path.join(OUT, 'concepts', `${c.slug}-en.html`), page(c, en, 'en'));
  fs.writeFileSync(path.join(OUT, 'concepts', `${c.slug}-zh-hant.html`), page(c, zhHant, 'hant'));
  fs.writeFileSync(path.join(OUT, 'concepts', `${c.slug}-zh-hans.html`), page(c, zhHans, 'hans'));
  fs.writeFileSync(path.join(OUT, 'concepts', `${c.slug}-type.html`), typePage(c));
}
// contrast report for the console
for (const c of concepts) {
  const p = palettes[c.palette];
  const bad = [['text/bg', p.text, p.bg], ['text/band', p.text, p.band], ['head/bg', p.head, p.bg], ['head/band', p.head, p.band], ['muted/bg', p.muted, p.bg], ['muted/band', p.muted, p.band], ['link/bg', p.link, p.bg], ['link/band', p.link, p.band], ['btn', p.onBtn, p.btn], ['hover', p.onBtn, p.btnHover], ['bg/head band', p.bg, p.head]].filter(([, a, b]) => ratio(a, b) < 4.5);
  console.log(c.slug, bad.length ? 'LOW: ' + bad.map(([n, a, b]) => `${n} ${ratio(a, b).toFixed(2)}`).join(', ') : 'all text pairs ≥ 4.5');
}
console.log('zh-Hans sample:', zhHans.h1, '|', specHans.zhLongP.slice(0, 40));
