// Shared pieces for the Home-0N.html designs: copy dictionary, i18n runtime, type core, partials.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import * as OpenCC from 'opencc-js';
import { en as EN0, zhHant as ZH0 } from './content.mjs';

const require = createRequire(import.meta.url);
export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const FS = path.join(ROOT, 'node_modules/@fontsource');
const ver = (pkg) => require(`${FS}/${pkg}/package.json`).version;
export const cdn = (pkg, file) => `https://cdn.jsdelivr.net/npm/@fontsource/${pkg}@${ver(pkg)}/${file}`;

// ---------- copy ----------
const extraEN = {
  incH: 'Useful things to include',
  inc: ['Your preferred date, or a few dates you are considering', 'Where you plan to marry, if you know', 'The languages you, your families and guests speak'],
  accent: 'The power of words',
  langSwitch: 'Language',
  menu: 'Menu',
  skip: 'Skip to content',
  phPortrait: '[Van’s portrait · authorised photo to be supplied]',
  phCeremony: '[Ceremony photo · couple consent + photographer licence needed]',
  phDetail: '[Detail photo · flowers, hands or venue]',
  conceptTag: 'Concept preview · draft copy (KC-576) · not approved',
};
const extraZH = {
  incH: '查詢時可以告訴我',
  inc: ['心儀日期，或幾個正在考慮的日期', '打算舉行儀式的地點（如已決定）', '你們、家人及賓客使用的語言'],
  accent: '言語的力量',
  langSwitch: '語言',
  menu: '選單',
  skip: '跳至主要內容',
  phPortrait: '［Van 的人像 · 待提供經授權照片］',
  phCeremony: '［儀式照片 · 須新人同意及攝影師授權］',
  phDetail: '［細節照片 · 花卉、雙手或場地］',
  conceptTag: '概念預覽 · 中文為排版測試草稿 · 須經母語審閱',
};
const en = { ...EN0, ...extraEN };
const zhHant = { ...ZH0, ...extraZH };
const t2s = OpenCC.Converter({ from: 'tw', to: 'cn' });
const deep = (o) => typeof o === 'string' ? t2s(o) : Array.isArray(o) ? o.map(deep) : (o && typeof o === 'object') ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, deep(v)])) : o;
const zhHans = { ...deep(zhHant), conceptTag: '概念预览 · 简体为字体测试（由繁体自动转换）· 网站文字尚未决定' };

const flat = (o, pre = '', out = {}) => { for (const [k, v] of Object.entries(o)) { const key = pre ? `${pre}.${k}` : k; if (v && typeof v === 'object') flat(v, key, out); else out[key] = v; } return out; };
export const DICT = { en: flat(en), hant: flat(zhHant), hans: flat(zhHans) };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
export const flags = (s) => esc(s).replace(/(\[[^\]]+\]|［[^］]+］)/g, '<span class="flag">$1</span>');
// T('h1','h1',{class:'x'}) -> <h1 data-i="h1" class="x">English text</h1>
export const T = (tag, key, attrs = '') => `<${tag} data-i="${key}"${attrs ? ' ' + attrs : ''}>${flags(DICT.en[key])}</${tag}>`;
export const txt = (key) => flags(DICT.en[key]);

// ---------- fonts ----------
export function fontHead(f) {
  const tags = [`<link rel="preload" as="font" type="font/woff2" crossorigin href="${cdn(f.head.pkg, `files/${f.head.pkg}-latin-${f.head.weight}-normal.woff2`)}">`];
  const faces = [];
  for (const sub of ['latin', 'latin-ext']) {
    const css = fs.readFileSync(`${FS}/${f.head.pkg}/${f.head.weight}.css`, 'utf8');
    const block = css.split('/* ').find((b) => b.startsWith(`${f.head.pkg}-${sub}-${f.head.weight}-normal */`));
    const range = block.match(/unicode-range:\s*([^;]+);/)[1];
    const url = cdn(f.head.pkg, `files/${f.head.pkg}-${sub}-${f.head.weight}-normal.woff2`);
    faces.push(`@font-face{font-family:"HeadLatin";src:url(${url}) format("woff2");font-weight:${f.head.weight};font-display:swap;unicode-range:${range}}`);
    faces.push(`@font-face{font-family:"HeadLatinZh";src:url(${url}) format("woff2");font-weight:${f.head.weight};font-display:swap;unicode-range:${range};size-adjust:${Math.round(f.head.zhAdjust * 100)}%}`);
  }
  for (const w of [400, 600]) tags.push(`<link rel="stylesheet" href="${cdn('source-sans-3', `${w}.css`)}">`);
  // CJK: unicode-range slices; only slices for characters actually rendered are downloaded.
  for (const [pkg, w] of [[f.zhHead, f.zhHeadW], [f.zhBody, f.zhBodyW], [f.zhHead.replace('-tc', '-sc'), f.zhHeadW], [f.zhBody.replace('-tc', '-sc'), f.zhBodyW]]) {
    const href = cdn(pkg, `${w}.css`); if (!tags.some((x) => x.includes(href))) tags.push(`<link rel="stylesheet" href="${href}">`);
  }
  if (f.accent) tags.push(`<link rel="stylesheet" href="${cdn('lxgw-wenkai-tc', '400.css')}">`, `<link rel="stylesheet" href="${cdn('lxgw-wenkai', '500.css')}">`);
  return tags.join('\n') + `\n<style>${faces.join('\n')}</style>`;
}
const famName = { 'noto-serif-tc': 'Noto Serif TC', 'noto-sans-tc': 'Noto Sans TC' };

// ---------- type core (identical rules in every design) ----------
export function core(f) {
  const zh = famName[f.zhHead], zhb = famName[f.zhBody];
  return `
:root{--f-hl:"HeadLatin";--f-bl:"Source Sans 3";--zh-h:"${zh}";--zh-b:"${zhb}";
--zh-serif-fb:"Songti TC","PMingLiU","Noto Serif CJK TC";--zh-sans-fb:"PingFang TC","Microsoft JhengHei","Noto Sans CJK TC";
--hs:1;--lh-h:1.1;--lh-b:1.6;--body:1.0625rem;--track:.08em;--measure:36rem;--hw:${f.head.weight};--zhw:${f.zhHeadW}}
:lang(zh){--f-hl:"HeadLatinZh";--hs:.72;--lh-h:1.36;--lh-b:1.8;--body:1rem;--track:.04em;--measure:34rem;--hw:${f.zhHeadW}}
:lang(zh-Hans){--zh-h:"${zh.replace('TC', 'SC')}";--zh-b:"${zhb.replace('TC', 'SC')}";--zh-serif-fb:"Songti SC","SimSun","Noto Serif CJK SC";--zh-sans-fb:"PingFang SC","Microsoft YaHei","Noto Sans CJK SC"}
[lang|="en"]{--f-hl:"HeadLatin"}
:root,[lang]{--f-head:var(--f-hl),var(--zh-h),Georgia,var(--zh-serif-fb),serif;--f-body:var(--f-bl),var(--zh-b),"Segoe UI",system-ui,var(--zh-sans-fb),sans-serif}
@media(min-width:900px){:root{--body:1.125rem}:lang(zh){--body:1.0625rem}}
:where(body [lang|=zh]){font-size:var(--body);line-height:var(--lh-b)}
*,*::before,*::after{box-sizing:border-box}
html{font-synthesis:none;-webkit-text-size-adjust:100%;scroll-behavior:smooth}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation:none!important;transition:none!important}}
body{margin:0;font-family:var(--f-body);font-size:var(--body);line-height:var(--lh-b);letter-spacing:normal}
:lang(zh){line-break:strict;word-break:normal;overflow-wrap:break-word;text-autospace:normal}
h1,h2,h3{font-family:var(--f-head);font-weight:var(--hw);letter-spacing:normal;text-wrap:balance;margin:0 0 .5em}
p{margin:0 0 1em;text-wrap:pretty}
img,svg{display:block;max-width:100%}
a{text-underline-offset:.18em}
:focus-visible{outline:3px solid currentColor;outline-offset:3px}
:lang(zh) b,:lang(zh) strong,:lang(zh) label,:lang(zh) .btn,:lang(zh) .w6{font-weight:400}
.flag{display:inline-block;font:400 .75rem/1.4 "Source Sans 3","Noto Sans TC",system-ui,sans-serif;letter-spacing:.01em;color:#6a4a00;background:#fff4d6;border:1px dashed #b8860b;padding:.05rem .4rem;border-radius:3px;vertical-align:middle}
.skip{position:absolute;left:-999px;top:0;z-index:99;background:#fff;color:#000;padding:.5rem 1rem}.skip:focus{left:1rem}
.ctag{font:500 12px/1.4 "Source Sans 3","Noto Sans TC",system-ui,sans-serif;background:#1d1b1c;color:#f4f1ee;padding:6px max(16px,env(safe-area-inset-left,0px));display:flex;flex-wrap:wrap;gap:4px 16px;justify-content:space-between}
.ctag a{color:#f4f1ee}
.ls{display:flex;gap:2px;align-items:center;font-size:.875rem;flex-wrap:nowrap}
.ls button{font:inherit;font-size:.875rem;background:none;border:1px solid transparent;color:inherit;padding:.3rem .55rem;border-radius:999px;cursor:pointer;white-space:nowrap;line-height:1.3}
.ls button[aria-pressed=true]{border-color:currentColor}
.ls .ls-l{opacity:.75;margin-right:4px}
.ls .t{font-size:.6875rem;opacity:.7}
@media(max-width:899px){.ls .ls-l,.nav-d{display:none!important}.ls button{padding:.3rem .4rem}}
@media(min-width:900px){.nav-m{display:none!important}}
@media(max-width:899px){.hd-in,.bar,.side{flex-wrap:wrap;row-gap:10px}.hd-r{display:contents!important}.hd-r .ls{order:3;width:100%;grid-column:1/-1}.hd-r .nav-m{margin-left:auto}.bar{border-radius:24px!important}}
.nav-m{position:relative}.nav-m summary{list-style:none;cursor:pointer;border:1px solid currentColor;border-radius:999px;padding:.3rem .8rem;font-size:.875rem;white-space:nowrap}
.nav-m summary::-webkit-details-marker{display:none}
.nav-m ul{position:absolute;right:0;top:calc(100% + 8px);min-width:14rem;list-style:none;margin:0;padding:.5rem;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.12);z-index:20}
.nav-m li a{display:block;padding:.6rem .75rem;text-decoration:none;color:inherit}
.field{display:grid;gap:.35rem}
input,textarea{font:inherit;font-size:1rem;width:100%;min-height:3rem;padding:.7rem .85rem;border-radius:var(--r,4px);color:inherit}
textarea{min-height:7rem;resize:vertical}
`;
}

// ---------- partials ----------
export const navList = (cls = '') => `<ul class="${cls}">${DICT.en['nav.0'] ? [0, 1, 2, 3, 4, 5].map((i) => `<li><a href="#" data-i="nav.${i}"${i === 0 ? ' aria-current="page"' : ''}>${txt(`nav.${i}`)}</a></li>`).join('') : ''}</ul>`;
export const langSwitch = () => `<div class="ls" role="group" aria-label="Language"><span class="ls-l" data-i="langSwitch">${txt('langSwitch')}</span><button type="button" data-lang="en" lang="en" aria-pressed="true">English</button><button type="button" data-lang="hant" lang="zh-Hant" aria-pressed="false">繁體中文</button><button type="button" data-lang="hans" lang="zh-Hans" aria-pressed="false">简体<span class="t" lang="en"> test</span></button></div>`;
export const mobileNav = () => `<details class="nav-m"><summary data-i="menu">${txt('menu')}</summary>${navList()}</details>`;
export const brand = (cls = 'brand') => `<a class="${cls}" href="#"><span class="bn" lang="en">Vannarady Ng</span><span class="bs" data-i="brandSub">${txt('brandSub')}</span></a>`;
export const form = (idp = 'f') => `<p><span class="flag" data-i="formFlag">${txt('formFlag')}</span></p>
<form onsubmit="event.preventDefault()" aria-describedby="${idp}-priv">
${[0, 1, 2, 3, 4].map((i) => `<div class="field"><label for="${idp}${i}" data-i="fields.${i}.0">${txt(`fields.${i}.0`)}</label><input id="${idp}${i}" type="${DICT.en[`fields.${i}.1`]}"${DICT.en[`fields.${i}.2`] ? ` placeholder="${esc(DICT.en[`fields.${i}.2`])}" data-ip="fields.${i}.2"` : ''}></div>`).join('\n')}
<div class="field"><label for="${idp}m" data-i="msg">${txt('msg')}</label><textarea id="${idp}m"></textarea></div>
<div><button class="btn" type="submit" data-i="submit">${txt('submit')}</button></div>
<p class="note" id="${idp}-priv">${T('span', 'privacy')}</p>
</form>`;
export const incList = (cls = 'inc') => `<ul class="${cls}">${[0, 1, 2].map((i) => `<li data-i="inc.${i}">${txt(`inc.${i}`)}</li>`).join('')}</ul>`;
export const chips = (cls = 'chips') => `<ul class="${cls}">${[0, 1, 2].map((i) => `<li data-i="langChips.${i}">${txt(`langChips.${i}`)}</li>`).join('')}</ul>`;
export const ph = (key, cls = '') => `<figure class="ph ${cls}" role="img" aria-label="${esc(DICT.en[key])}"><figcaption data-i="${key}">${txt(key)}</figcaption></figure>`;

// ---------- page shell ----------
export function page({ n, name, fonts, css, body }) {
  return `<!doctype html>
<html lang="en-NZ">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Home ${String(n).padStart(2, '0')} · ${name} · Van Ng concepts</title>
<meta name="robots" content="noindex, nofollow">
${fontHead(fonts)}
<style>${core(fonts)}${css}</style>
</head>
<body>
<a class="skip" href="#main" data-i="skip">${txt('skip')}</a>
<div class="ctag" lang="en"><span>Home ${String(n).padStart(2, '0')} · ${name} — <span data-i="conceptTag">${txt('conceptTag')}</span></span><span><a href="index.html">All 8 designs</a> · ${n > 1 ? `<a href="Home-${String(n - 1).padStart(2, '0')}.html">← Prev</a> · ` : ''}${n < 8 ? `<a href="Home-${String(n + 1).padStart(2, '0')}.html">Next →</a>` : ''}</span></div>
${body}
<script>
(function(){
var D=${JSON.stringify(DICT)};
var L={en:'en-NZ',hant:'zh-Hant',hans:'zh-Hans'};
function flags(s){var e=String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');return e.replace(/(\\[[^\\]]+\\]|［[^］]+］)/g,'<span class="flag">$1</span>');}
function set(k){if(!D[k])k='en';var d=D[k];document.documentElement.lang=L[k];
document.querySelectorAll('[data-i]').forEach(function(el){var v=d[el.getAttribute('data-i')];if(v!=null)el.innerHTML=flags(v);});
var zk=k==='hans'?'hans':'hant';document.querySelectorAll('[data-z]').forEach(function(el){var v=D[zk][el.getAttribute('data-z')];if(v!=null)el.innerHTML=flags(v);});document.querySelectorAll('[data-zl]').forEach(function(el){el.lang=L[zk];});
document.querySelectorAll('[data-ip]').forEach(function(el){var v=d[el.getAttribute('data-ip')];if(v!=null)el.setAttribute('placeholder',v);});
document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-lang')===k?'true':'false');});
document.querySelectorAll('.ph').forEach(function(f){var c=f.querySelector('figcaption');if(c)f.setAttribute('aria-label',c.textContent);});
if(history.replaceState)history.replaceState(null,'',k==='en'?location.pathname:'#'+(k==='hant'?'zh-hant':'zh-hans'));}
document.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(b){set(b.getAttribute('data-lang'));}});
var h=location.hash;if(h==='#zh-hant')set('hant');else if(h==='#zh-hans')set('hans');
})();
</script>
</body>
</html>`;
}
// Always-Chinese text (follows Traditional/Simplified choice): used by Home-08's parallel hero.
export const Z = (tag, key, attrs = '') => `<${tag} data-z="${key}"${attrs ? ' ' + attrs : ''}>${flags(DICT.hant[key])}</${tag}>`;
