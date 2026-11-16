// Round 2: eight bolder, original homepage designs -> /Home-01.html … /Home-08.html
// Each borrows ONE general design pattern from a leading NZ wedding site (see REFS).
// Layout, copy, images and branding are original to Van; nothing is copied from the reference sites.
// Run: node build/homes.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { ROOT, T, Z, txt, page, navList, langSwitch, mobileNav, brand, form, incList, chips, ph, faq, DICT } from './homes-core.mjs';
const SI = createRequire(import.meta.url)('simple-icons'); // CC0 brand glyphs for the social links (Home-09)
const DICT_TESTI = () => Object.keys(DICT.en).filter((k) => /^testi\.\d+\.by$/.test(k));
const testiQ9 = (i) => { const ks = Object.keys(DICT.en).filter((k) => k.startsWith(`testi.${i}.q.`)); return ks.map((k, j) => T('p', k, `class="${[j === 0 ? 'q0' : '', j === ks.length - 1 ? 'qz' : ''].join(' ').trim()}"`)).join(''); };
const testiQ = (i) => Object.keys(DICT.en).filter((k) => k.startsWith(`testi.${i}.q.`)).map((k) => T('p', k)).join('');

export const REFS = [
  ['Markovina Estate', 'https://www.markovina.co.nz/', 'Immersive full-screen ceremony photo with a slim announcement ribbon'],
  ['Felix Image', 'https://www.feliximage.co.nz/', 'Panoramic landscape first, quiet type and an easy-to-find 中文 switch'],
  ['Fallon Photography', 'https://www.fallon.co.nz/', 'A short, very large statement on a rounded photo card'],
  ['OneThreeOneFour', 'https://www.onethreeonefour.com/', 'An interactive chooser in the hero'],
  ['Abel Estate', 'https://abelestate.co.nz/', 'Cinematic photo with an elegant italic headline'],
  ['Queenstown Elopements', 'https://queenstownelopements.squarespace.com/', 'Oversized serif with one italic phrase, over a landscape with a round inset'],
  ['Roy Byrne Photography', 'https://roybyrne.mypixieset.com/queenstown-wedding-photographer/', 'Centred wordmark, split navigation and a full-width slideshow'],
  ['Together Journal', 'https://togetherjournal.com/', 'Magazine masthead with large image tiles'],
];

const serifTC = { zhHead: 'noto-serif-tc', zhBody: 'noto-sans-tc' };
const G = 'padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))';
const GD = 'padding-left:max(48px,env(safe-area-inset-left,0px));padding-right:max(48px,env(safe-area-inset-right,0px))';
const head = () => `<header class="hd"><div class="hd-in">${brand()}<nav class="nav-d" aria-label="Main">${navList()}</nav><div class="hd-r">${langSwitch()}${mobileNav()}</div></div></header>`;
const foot = () => `<footer class="ft"><div class="ft-in"><div class="ft-a"><p class="bn ft-wm" lang="en">Vannarady Ng</p>${T('p', 'brandSub', 'class="ft-sub"')}${T('p', 'footNote', 'class="note"')}<a class="btn ft-btn" href="#enquire" data-i="cta">${txt('cta')}</a></div><nav class="ft-col" aria-label="Footer">${T('p', 'ftExplore', 'class="ft-h"')}<ul>${['#main', '#approach', '#ceremonies', '#languages', '#faq', '#enquire'].map((h, i) => `<li><a href="${h}" data-i="nav.${i}">${txt(`nav.${i}`)}</a></li>`).join('')}</ul></nav><div class="ft-col">${T('p', 'ftContact', 'class="ft-h"')}${T('p', 'footContact')}<p><a ${DIA} data-i="ftDia">${txt('ftDia')}</a></p><p><a href="privacy.html" data-i="privacyLink">${txt('privacyLink')}</a></p>${langSwitch()}</div></div><div class="ft-base">${T('span', 'copyright')}</div></footer>`;
const DIA = 'href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener"';
const pin = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
const seal = '<svg class="seal" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="32" cy="32" r="23" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/><path d="M22 33l7 7 14-15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const NATIVE = [['English', 'en', null], ['粵語', 'zh-Hant', 'langChips.1'], ['普通話', 'zh-Hant', 'langChips.2']];
const B = {
  eb: (k) => `<p class="sec-eb" data-i="${k}">${txt(k)}</p>`,
  approach: () => `<p class="sec-eb" data-i="secApproach">${txt('secApproach')}</p>${T('h2', 'approachH')}${T('p', 'approach1')}${T('p', 'approach2')}`,
  quote: () => `<blockquote class="q"><span class="qm" aria-hidden="true">“</span>${T('p', 'quote')}<footer data-i="quoteBy">${txt('quoteBy')}</footer></blockquote>`,
  // KC-576 v3: weddings lead; civil unions get a one-line mention on Home.
  services: () => `<article class="svc svc-main rv">${ph('phDetail', 'svc-ph', 'lake')}<div class="svc-b">${T('h3', 'services.0.h')}${T('p', 'services.0.p')}${T('p', 'enq2')}<a class="svc-l" href="#enquire"><span data-i="quoteCta">${txt('quoteCta')}</span> →</a></div></article><p class="svc-cu rv"><span class="fd" aria-hidden="true"></span><span data-i="cuLine">${txt('cuLine')}</span></p>`,
  tiles: () => `<ul class="ltiles">${NATIVE.map(([n, l, z], i) => `<li class="rv"><span class="ln" lang="${l}"${z ? ` data-z="${z}" data-zl` : ''}>${n}</span><span class="ls2" data-i="langNote.${i}">${txt(`langNote.${i}`)}</span></li>`).join('')}</ul>`,
  langs: () => `<p class="sec-eb" data-i="secLanguages">${txt('secLanguages')}</p>${T('h2', 'langH')}${T('p', 'lang1')}${B.tiles()}`,
  cred: () => `<div class="cred rv">${seal}<div>${T('h3', 'credH')}${T('p', 'cred')}<a class="tl" ${DIA} data-i="credLink">${txt('credLink')}</a></div></div>`,
  travel: () => `<div class="travel rv" id="travel">${T('h3', 'travelH')}<ul class="places">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<li>${pin}<span data-i="places.${i}">${txt(`places.${i}`)}</span></li>`).join('')}</ul>${T('p', 'travelNote', 'class="note"')}</div>`,
  enq: () => `<p class="sec-eb" data-i="secEnquire">${txt('secEnquire')}</p>${T('h2', 'enqH')}${T('p', 'enq1')}${incList()}${T('p', 'enq2')}${ph('phDetail', 'enq-ph', 'bouquet')}${T('p', 'enqNote', 'class="note"')}`,
  ctas: () => `<div class="btns"><a class="btn" href="#enquire" data-i="cta">${txt('cta')}</a><a class="tl" href="#approach" data-i="cta2">${txt('cta2')}</a></div>`,
  facts: (cls = '') => `<ul class="facts ${cls}">${[0, 1, 2].map((i) => `<li><span class="fd" aria-hidden="true"></span><span data-i="heroFacts.${i}">${txt(`heroFacts.${i}`)}</span></li>`).join('')}</ul>`,
  langLink: () => `<a class="tl" href="#faq" data-i="langLink">${txt('langLink')}</a>`,
};
const faqBlock = (img = 'vows') => `<div class="faqx" id="faq"><div class="faqx-l"><p class="sec-eb" data-i="secQuestions">${txt('secQuestions')}</p>${T('h2', 'faqH')}${T('p', 'faqIntro')}${ph('phDetail', 'faqx-ph rv', img)}</div><div class="faq">${[0, 1, 2, 3, 4, 5].map((i) => `<details${i === 0 ? ' open' : ''}><summary data-i="faq.${i}.0">${txt(`faq.${i}.0`)}</summary>${T('p', `faq.${i}.1`)}</details>`).join('')}</div></div>`;
const base = (o = {}) => `
:root{--r:${o.r || '4px'};--wrap:calc(1440px + 96px)}
@media(min-width:1976px){:root{--wrap:calc(1880px + 96px)}}
body{background:var(--bg);color:var(--ink)}
.in{max-width:var(--wrap);margin:0 auto;${G}}@media(min-width:900px){.in{${GD}}}
.hd-in{max-width:var(--wrap);margin:0 auto;${G};display:flex;align-items:center;justify-content:space-between;gap:14px;padding-block:18px}@media(min-width:900px){.hd-in{${GD}}}
.brand{display:grid;text-decoration:none;color:inherit}.bn{font-family:var(--f-head);font-weight:var(--hw);font-size:1.5rem;line-height:1.1;white-space:nowrap}.bs{font-size:.8125rem;opacity:.85;white-space:nowrap}
.nav-d ul{display:flex;gap:26px;list-style:none;margin:0;padding:0}.nav-d a{color:inherit;text-decoration:none;font-size:.9375rem}.nav-d a:hover,.nav-d a[aria-current]{text-decoration:underline;text-underline-offset:.35em}
.hd-r{display:flex;align-items:center;gap:6px}.nav-m ul{background:#fff;color:#2e2a2b}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:3rem;padding:.75rem 1.6rem;background:var(--acc);color:var(--on-acc);border:0;border-radius:var(--r);font:inherit;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer;transition:transform .2s ease,background .2s ease}
.btn:hover{background:var(--acc-d);transform:translateY(-1px)}
.btns{display:flex;flex-wrap:wrap;gap:14px 24px;align-items:center;margin-top:24px}
.tl{color:inherit;font-weight:600;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:.3em}
section{padding-block:clamp(64px,6vw + 24px,128px)}
h1{line-height:var(--lh-h)}
h2{font-size:calc(var(--hs)*clamp(2.125rem,1.5rem + 2.2vw,3.25rem));line-height:var(--lh-h)}
h3{font-size:calc(var(--hs)*1.625rem);line-height:1.25}
.svc p{margin:0}
.q{margin:0}.q p{font-family:var(--f-head);font-weight:var(--hw);line-height:1.25;margin:0 0 14px}.q footer{font-size:.9375rem;opacity:.85}
:lang(zh) .q p{line-height:1.5}
.chips{list-style:none;padding:0;margin:18px 0;display:flex;flex-wrap:wrap;gap:10px}.chips li{border:1px solid currentColor;border-radius:999px;padding:.3rem 1rem;font-size:.9375rem}
.inc{padding-left:1.15rem;margin:0 0 18px}.inc li{margin-bottom:6px}
form{display:grid;gap:14px}label{font-size:.9375rem;font-weight:600}
input,textarea{background:#fff;border:1px solid #7a7073;color:#2e2a2b}
.note{font-size:.9375rem;opacity:.9}
.split{display:grid;gap:32px}@media(min-width:900px){.split{grid-template-columns:1fr 1fr;gap:72px;align-items:center}}
.split .ph{aspect-ratio:4/5}
.two{display:grid;gap:32px}@media(min-width:760px){.two{grid-template-columns:1fr 1fr;gap:56px}}
.kb img{animation:kb 22s cubic-bezier(.2,.6,.2,1) both;transform-origin:50% 60%}
@keyframes kb{from{transform:scale(1.14)}to{transform:scale(1)}}
.rise>*{animation:rise 1s cubic-bezier(.2,.7,.2,1) both}
.rise>*:nth-child(2){animation-delay:.12s}.rise>*:nth-child(3){animation-delay:.24s}.rise>*:nth-child(4){animation-delay:.36s}.rise>*:nth-child(5){animation-delay:.48s}.rise>*:nth-child(6){animation-delay:.6s}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.kb img,.rise>*{animation:none}}
.facts{list-style:none;padding:0;margin:28px 0 0;display:flex;flex-wrap:wrap;gap:10px}
.facts li{display:inline-flex;align-items:center;gap:8px;font-size:.875rem;line-height:1.3;padding:.5rem .95rem;border-radius:999px;border:1px solid color-mix(in srgb,currentColor 28%,transparent)}
.facts .fd{width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.75;flex:none}
.facts.glass li{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.38);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:#fff}
.facts.centre{justify-content:center}
.hero-c{width:100%}

/* equal-height columns */
.enq,.two,.svcs,.cards,.pillars{align-items:stretch}
.enq>div{display:flex;flex-direction:column;min-width:0}
.enq>div:last-child>form{flex:1;align-content:start}
@media(min-width:950px){.enq .enq-ph{flex:1 1 auto;aspect-ratio:auto!important;min-height:220px;margin-bottom:20px!important}}
.two>div{display:flex;flex-direction:column}
.two>.cred,.two>.travel,.two>div>.cred,.two>div>.travel{flex:1}
.travel{background:var(--card,#fff);border-radius:var(--tile-r,16px);padding:24px;border:1px solid color-mix(in srgb,var(--ink) 10%,transparent)}
.pillars .travel,.pillars .cred{background:transparent;border:0;padding:0}
.svcs{grid-template-columns:1fr!important}
@media(min-width:900px){.svc-main{display:grid!important;grid-template-columns:1.15fr 1fr;align-items:stretch}.svc-main .svc-ph{aspect-ratio:auto;min-height:360px;height:100%}.svc-main .svc-b{padding:clamp(28px,3vw,48px);justify-content:center}}
.svc-main{border-radius:var(--tile-r,20px)!important}
.svc-main h3{font-size:calc(var(--hs)*clamp(1.75rem,1.3rem + 1.2vw,2.5rem))}
.svc-cu{display:flex;align-items:center;gap:12px;margin:18px 0 0;font-size:1.0625em}
.svc-cu .fd{width:8px;height:8px;border-radius:50%;background:var(--acc);flex:none}
.sec-eb{display:flex;align-items:center;gap:12px;font-family:var(--f-body);font-size:.75rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--acc);margin:0 0 16px}
.sec-eb::before{content:"";width:28px;height:1px;background:currentColor}
:lang(zh) .sec-eb{letter-spacing:.08em;font-size:.875rem;font-weight:400}
[style*="text-align:center"] .sec-eb,.cent .sec-eb,.qc .sec-eb{justify-content:center}
.q{position:relative}.qm{display:block;font-family:Georgia,"Times New Roman",serif;font-size:6rem;line-height:.6;height:.45em;color:var(--acc);opacity:.35;margin-bottom:8px}
.svc{display:flex;flex-direction:column;overflow:hidden;padding:0!important;text-align:left!important}
.svc .svc-ph{aspect-ratio:16/10;border-radius:0!important}
.svc-b{padding:24px 28px 28px;display:flex;flex-direction:column;gap:6px;flex:1}
.svc-b p{flex:1}
.svc-l{margin-top:14px;font-weight:600;color:var(--acc);text-decoration:none;align-self:flex-start;border-bottom:1px solid currentColor;padding-bottom:2px}
:lang(zh) .svc-l{font-weight:400}
.svc-l:hover{opacity:.75}
.ltiles{list-style:none;padding:0;margin:28px 0 20px;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(6.5rem,1fr))}
.ltiles li{background:color-mix(in srgb,var(--acc) 7%,var(--card,#fff));border:1px solid color-mix(in srgb,var(--acc) 22%,transparent);border-radius:var(--tile-r,16px);padding:22px 16px 18px;display:grid;gap:8px;justify-items:center;text-align:center;transition:transform .25s ease,box-shadow .25s ease}
.ltiles li:hover{transform:translateY(-3px);box-shadow:0 14px 30px -18px color-mix(in srgb,var(--acc) 60%,transparent)}
.ltiles .ln{font-family:var(--f-head);font-weight:var(--hw);font-size:clamp(1.375rem,1.1rem + .9vw,2rem);line-height:1.15;color:var(--acc);white-space:nowrap;word-break:keep-all}
.ltiles .ln:lang(zh){font-family:var(--zh-h),var(--zh-serif-fb),serif;font-weight:600}
.ltiles .ls2{font-size:.8125rem;opacity:.8;line-height:1.35}
@media(max-width:480px){.ltiles{gap:8px}.ltiles li{padding:16px 8px 14px}}
.cred{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:start;background:var(--card,#fff);border-radius:var(--tile-r,16px);padding:24px;border:1px solid color-mix(in srgb,var(--ink) 10%,transparent)}
.cred .seal{width:56px;height:56px;color:var(--acc)}
.cred h3{margin-bottom:.3em}.cred p{margin:0 0 10px}
.places{list-style:none;padding:0;margin:14px 0 12px;display:flex;flex-wrap:wrap;gap:8px}
.places li{display:inline-flex;align-items:center;gap:6px;background:var(--card,#fff);border:1px solid color-mix(in srgb,var(--ink) 14%,transparent);border-radius:999px;padding:.35rem .85rem .35rem .65rem;font-size:.9375rem}
.places svg{color:var(--acc);flex:none}
.enq-ph{aspect-ratio:16/9;border-radius:var(--tile-r,16px);margin:8px 0 20px!important}
.faqx{display:grid;gap:40px}@media(min-width:950px){.faqx{grid-template-columns:5fr 7fr;gap:72px;align-items:start}.faqx-l{position:sticky;top:96px}}
.faqx-l p{max-width:30rem}
.faqx-ph{aspect-ratio:4/3;border-radius:var(--tile-r,16px);margin-top:24px!important}
@media(max-width:949px){.faqx-ph{display:none}}
.faq summary{transition:color .2s ease}.faq summary:hover{color:var(--acc)}
.ft{padding-block:0;border-top:1px solid color-mix(in srgb,currentColor 15%,transparent)}
.ft-in{max-width:var(--wrap);margin:0 auto;${G};display:grid;gap:36px;padding-block:64px 40px}@media(min-width:800px){.ft-in{${GD};grid-template-columns:2fr 1fr 1fr}}
.ft-wm{font-size:clamp(2rem,1.5rem + 2vw,3rem)!important;margin:0!important;line-height:1}
.ft-sub{opacity:.8;margin:6px 0 16px!important}
.ft .ft-btn{margin-top:16px;color:var(--on-acc);text-decoration:none}
.ft-h{font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;font-weight:600;opacity:.7;margin:0 0 14px!important}:lang(zh) .ft-h{letter-spacing:.08em;font-size:.875rem;font-weight:400}
.ft-col ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.ft-col a{color:inherit;text-decoration:none}.ft-col a:hover{text-decoration:underline}
.ft-col p{margin:0 0 10px}
.ft-col .ls{margin-top:14px;flex-wrap:wrap}
.ft-base{max-width:var(--wrap);margin:0 auto;${G};padding-block:18px 28px;font-size:.8125rem;opacity:.7;border-top:1px solid color-mix(in srgb,currentColor 12%,transparent)}@media(min-width:900px){.ft-base{${GD}}}
`;
const designs = [];

// ── 01 · Estate — immersive ceremony photo + ribbon ──
designs.push({
  name: 'Estate', ref: 0, fonts: { head: { pkg: 'cormorant-garamond', weight: 600, zhAdjust: 1.16 }, ...serifTC, zhHeadW: 600, zhBodyW: 400 },
  css: base() + `
:root{--bg:#FBF3F1;--ink:#3B2A2E;--band:#F3DEDA;--acc:#8E4A5A;--acc-d:#733B49;--on-acc:#fff;--cocoa:#3B2A2E}
.ribbon{background:var(--cocoa);color:#FBF3F1;text-align:center;font-size:.8125rem;letter-spacing:.04em;margin:0;padding:9px max(16px,env(safe-area-inset-left,0px))}
.hero{position:relative;min-height:min(92vh,880px);display:grid;align-items:end;color:#fff}
.hero>.ph{position:absolute;inset:0}
.hero>.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(30,20,22,.6) 0%,rgba(30,20,22,.35) 35%,rgba(30,20,22,.5) 60%,rgba(30,20,22,.8) 100%)}
.hero>.ph .badge{left:auto;right:12px;bottom:12px}
.hero .hd{position:absolute;top:0;left:0;right:0;z-index:3;color:#fff}
.btn-q{display:none!important}@media(min-width:1280px){.btn-q{display:inline-flex!important;min-height:2.5rem!important;padding:.4rem 1.2rem!important;background:#fff!important;color:var(--cocoa)!important;border-radius:999px!important;margin-left:8px}}
.hero-c{position:relative;z-index:2;padding-block:150px 72px}
.hero h1{color:#fff;font-size:calc(var(--hs)*clamp(2.75rem,1.6rem + 4.6vw,5.5rem));max-width:16ch;margin-bottom:.35em}
:lang(zh) .hero h1{max-width:20ch}
.hero .eb{font-size:.875rem;letter-spacing:var(--track);text-transform:uppercase;margin-bottom:14px}:lang(zh) .hero .eb{text-transform:none}
.hero p{max-width:38rem;font-size:1.125em}:lang(zh) .hero p{font-size:1.0625em}
.hero .btn{background:#fff;color:var(--cocoa)}.hero .btn:hover{background:#f6e7e3}
.hero :focus-visible{outline-color:#fff}
.pillars{display:grid;border-bottom:1px solid rgba(59,42,46,.15)}@media(min-width:900px){.pillars{grid-template-columns:repeat(3,1fr)}}
.pillars>div{padding:36px 0;border-top:1px solid rgba(59,42,46,.15)}@media(min-width:900px){.pillars>div{padding:44px 40px 44px 0;border-top:0}.pillars>div+div{padding-left:40px;border-left:1px solid rgba(59,42,46,.15)}}
.pillars h3{font-size:calc(var(--hs)*1.75rem)}.pillars p{margin:0 0 10px}.pillars .chips{margin:8px 0 0}
.split .ph{border-radius:240px 240px 4px 4px}
.qwrap{position:relative;color:#fff;padding:0}
.qwrap>.ph{position:absolute;inset:0}.qwrap>.ph::after{content:"";position:absolute;inset:0;background:rgba(40,24,28,.6)}
.qwrap .in{position:relative;z-index:1;padding-block:clamp(96px,10vw,160px);text-align:center}
.qwrap .q p{font-size:calc(var(--hs)*clamp(2.25rem,1.5rem + 3vw,4rem));max-width:22ch;margin-inline:auto}
.svcs{display:grid;gap:20px;margin-top:28px}@media(min-width:760px){.svcs{grid-template-columns:1fr 1fr}}
.svc{background:#fff;padding:36px;border-radius:4px}
.band{background:var(--band)}
.enq{display:grid;gap:40px}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:80px}}
.enq form{background:#fff;padding:28px;border-radius:4px}
`,
  body: () => `<p class="ribbon" data-i="ribbon">${txt('ribbon')}</p>
<div class="hero">${ph('phCeremony', 'kb', 'lawn', true)}
<header class="hd"><div class="hd-in">${brand()}<nav class="nav-d" aria-label="Main">${navList()}</nav><div class="hd-r">${langSwitch()}<a class="btn btn-q" href="#enquire" data-i="cta">${txt('cta')}</a>${mobileNav()}</div></div></header>
<div class="in hero-c rise">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${B.ctas()}${B.facts('glass')}</div></div>
<main id="main">
<div class="in"><div class="pillars"><div class="rv">${T('h3', 'langH')}${chips()}</div>${B.travel()}${B.cred()}</div></div>
<section id="approach"><div class="in split"><div class="rv">${B.approach()}${T('p', 'intro2')}</div>${ph('phPortrait', 'rv', 'peonies')}</div></section>
<section class="qwrap">${ph('phDetail', '', 'candles', false, '100vw')}<div class="in">${B.quote()}</div></section>
<section class="band"><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div><div style="margin-top:56px;max-width:40rem" class="rv">${T('p', 'lang1')}${B.langLink()}</div></div></section>
<section><div class="in">${faqBlock()}</div></section>
<section class="band" id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('a')}</div></div></section>
</main>${foot()}`,
});

// ── 02 · Panorama — landscape first, quiet type, visible 中文 ──
designs.push({
  name: 'Panorama', ref: 1, fonts: { head: { pkg: 'eb-garamond', weight: 500, zhAdjust: 1.12 }, ...serifTC, zhHeadW: 500, zhBodyW: 400 },
  css: base({ w: '84rem', r: '0' }) + `
:root{--bg:#FFFFFF;--ink:#2F2A2B;--soft:#F6EFEE;--acc:#7A3E4E;--acc-d:#5F2F3C;--on-acc:#fff}
.hd{position:sticky;top:env(safe-area-inset-top,0px);z-index:10;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);border-bottom:1px solid #eee}
.hd .bn{letter-spacing:.14em;text-transform:uppercase;font-size:1.125rem}
.nav-d a{text-transform:uppercase;letter-spacing:.14em;font-size:.75rem}:lang(zh) .nav-d a{letter-spacing:.08em;font-size:.875rem}
.ls button[data-lang=hant]{font-size:1rem}
.pano{height:clamp(22rem,58vw,46rem)}
.lead{text-align:center;padding-block:clamp(56px,6vw,104px) 24px}
.lead .eb{text-transform:uppercase;letter-spacing:.24em;font-size:.75rem;color:var(--acc)}:lang(zh) .lead .eb{letter-spacing:.12em;font-size:.875rem}
.lead h1{font-size:calc(var(--hs)*clamp(2.5rem,1.6rem + 3.4vw,4.75rem));line-height:1.08;max-width:20ch;margin:.3em auto}
:lang(zh) .lead h1{line-height:1.36}
.lead p{max-width:40rem;margin-inline:auto;font-size:1.125em}
.lead .btns{justify-content:center}
.strip{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding:24px max(16px,env(safe-area-inset-left,0px)) 12px;scrollbar-width:thin}
.strip .ph{flex:0 0 min(78vw,24rem);aspect-ratio:4/5;scroll-snap-align:start}
.strip .ph:nth-child(2n){aspect-ratio:1;align-self:center}
.cols{display:grid;gap:48px}@media(min-width:900px){.cols{grid-template-columns:repeat(3,1fr);gap:56px}}
.cols h2{font-size:calc(var(--hs)*clamp(1.75rem,1.3rem + 1.2vw,2.25rem))}
.soft{background:var(--soft)}
.qc{text-align:center}.qc .q p{font-size:calc(var(--hs)*clamp(2rem,1.4rem + 2.4vw,3.25rem));max-width:24ch;margin-inline:auto}
.svcs{display:grid;gap:40px;margin-top:24px}@media(min-width:760px){.svcs{grid-template-columns:1fr 1fr}}
.svc{border-top:1px solid #2F2A2B;padding-top:20px}
.enq{display:grid;gap:40px}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:96px}}
input{border-width:0 0 1px;padding-inline:0;background:transparent}
`,
  body: () => `${head()}
<main id="main">
<div class="in pano-w">${ph('phCeremony', 'pano kb', 'lake', true)}</div>
<div class="in lead rise">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${B.ctas()}${B.facts('centre')}</div>
<div class="strip" role="region" aria-label="Gallery" tabindex="0">${ph('phDetail', '', 'hands')}${ph('phDetail', '', 'park')}${ph('phDetail', '', 'bouquet')}${ph('phDetail', '', 'vows')}${ph('phDetail', '', 'alps')}${ph('phDetail', '', 'table')}</div>
<section id="approach"><div class="in cols"><div class="rv">${B.approach()}</div><div class="rv">${B.langs()}${B.langLink()}</div><div>${B.cred()}<div style="height:28px"></div>${B.travel()}</div></div></section>
<section class="soft qc"><div class="in">${B.quote()}</div></section>
<section><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div></div></section>
<section class="soft"><div class="in">${faqBlock()}</div></section>
<section id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('b')}</div></div></section>
</main>${foot()}`,
});

// ── 03 · Statement — a giant short line on a rounded photo card ──
designs.push({
  name: 'Statement', ref: 2, fonts: { head: { pkg: 'source-sans-3', weight: 800, zhAdjust: 1.0 }, zhHead: 'noto-sans-tc', zhBody: 'noto-sans-tc', zhHeadW: 700, zhBodyW: 400 },
  css: base({ w: '84rem', r: '999px' }) + `
:root,[lang]{--f-head:var(--f-hl),var(--zh-h),system-ui,var(--zh-sans-fb),sans-serif}
:root{--bg:#FBF7F2;--ink:#2E2A2B;--bur:#6E1F2E;--acc:#8E1B24;--acc-d:#6E1F2E;--on-acc:#FBF7F2;--alt:#F5EBE6}
h1,h2,h3{letter-spacing:-.01em}:lang(zh) h1,:lang(zh) h2,:lang(zh) h3{letter-spacing:normal}
.card{position:relative;margin:4px max(12px,env(safe-area-inset-left,0px)) 0;border-radius:28px;overflow:hidden;min-height:min(84vh,800px);display:grid;align-items:start;justify-items:center;text-align:center;color:#fff}
@media(min-width:900px){.card{margin-inline:24px;border-radius:40px}}
.card>.ph{position:absolute;inset:0}.card>.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,10,12,.5),rgba(20,10,12,0) 55%,rgba(20,10,12,.3))}
.big{position:relative;z-index:1;margin:clamp(48px,7vw,96px) 0 0;padding-inline:16px;font-family:var(--f-head);font-weight:800;font-size:clamp(3.25rem,1rem + 9vw,9.5rem);line-height:.92;letter-spacing:-.03em}
:lang(zh) .big{font-weight:700;font-size:clamp(2.5rem,1rem + 6vw,6.5rem);line-height:1.15;letter-spacing:normal}
.big span{display:block}
.intro{display:grid;gap:24px;padding-block:56px 24px}@media(min-width:900px){.intro{grid-template-columns:7fr 5fr;gap:72px;align-items:end}}
.intro h1{font-size:calc(var(--hs)*clamp(2rem,1.4rem + 2.2vw,3.25rem));color:var(--bur);margin:0}
.intro p{font-size:1.125em}
.marq{background:var(--bur);color:var(--bg);overflow:hidden;white-space:nowrap;padding-block:16px;margin-top:40px;font-family:var(--f-head);font-weight:800;font-size:clamp(1.5rem,1rem + 2vw,2.5rem)}
:lang(zh) .marq{font-weight:700}
.marq div{display:inline-block;animation:mq 40s linear infinite}.marq span{margin-right:56px}
@keyframes mq{to{transform:translateX(-50%)}}
h2{color:var(--bur);font-size:calc(var(--hs)*clamp(2.5rem,1.6rem + 3vw,4.25rem))}
.svcs{display:grid;gap:16px;margin-top:28px}@media(min-width:760px){.svcs{grid-template-columns:1fr 1fr}}
.svc{background:var(--alt);border-radius:28px;padding:36px}.svc h3{color:var(--bur);font-size:calc(var(--hs)*2rem)}
.split .ph{border-radius:28px}
.qb{background:var(--acc);color:var(--bg);border-radius:28px;padding:clamp(28px,5vw,64px)}
.qb .q p{font-size:calc(var(--hs)*clamp(2rem,1.4rem + 2.4vw,3.5rem));font-weight:800}:lang(zh) .qb .q p{font-weight:700}
.chips li{border-color:var(--bur);color:var(--bur)}
.enq{display:grid;gap:40px;background:var(--alt);border-radius:28px;padding:clamp(24px,4vw,56px)}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:64px}}
input,textarea{border-radius:14px}
.faq summary{font-size:1.125rem}
`,
  body: () => `${head()}
<div class="in card-w"><div class="card">${ph('phCeremony', 'kb', 'pier', true)}<p class="big rise" aria-hidden="true"><span data-i="big1">${txt('big1')}</span><span data-i="big2">${txt('big2')}</span></p>${B.facts('glass card-f')}</div></div>
<main id="main">
<div class="in intro">${T('h1', 'h1')}<div>${T('p', 'intro')}${B.ctas()}</div></div>
<div class="marq" aria-hidden="true"><div>${Array(8).fill([0, 1, 2].map((i) => `<span data-i="langChips.${i}">${txt(`langChips.${i}`)}</span>`).join('')).join('')}</div></div>
<section id="approach"><div class="in split"><div class="rv">${B.approach()}${T('p', 'intro2')}</div>${ph('phPortrait', 'rv', 'bouquet')}</div></section>
<section style="padding-top:0"><div class="in"><div class="qb rv">${B.quote()}</div></div></section>
<section style="padding-top:0"><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div></div></section>
<section style="padding-top:0"><div class="in two"><div class="rv">${B.langs()}${B.langLink()}</div><div>${B.cred()}<div style="height:24px"></div>${B.travel()}</div></div></section>
<section style="padding-top:0"><div class="in">${faqBlock()}</div></section>
<section style="padding-top:0" id="enquire"><div class="in"><div class="enq"><div>${B.enq()}</div><div>${form('c')}</div></div></div></section>
</main>${foot()}`,
});

// ── 04 · Planner — interactive chooser in the hero ──
designs.push({
  name: 'Planner', ref: 3, fonts: { head: { pkg: 'literata', weight: 500, zhAdjust: 1.0 }, ...serifTC, zhHeadW: 500, zhBodyW: 400 },
  css: base({ r: '6px' }) + `
:root{--bg:#FBF3F1;--ink:#3B2A2E;--band:#F3DEDA;--acc:#8E4A5A;--acc-d:#733B49;--on-acc:#fff}
.hero{position:relative;color:#fff}
.hero>.ph{position:absolute;inset:0}.hero>.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(40,24,28,.65),rgba(40,24,28,.4) 50%,rgba(40,24,28,.7))}
.hero .hd{position:relative;z-index:3}
.hero-c{position:relative;z-index:2;text-align:center;padding-block:48px 64px}
.hero h1{color:#fff;font-size:calc(var(--hs)*clamp(2.5rem,1.5rem + 4vw,4.75rem));max-width:18ch;margin:0 auto .3em}
.hero .lede{max-width:40rem;margin:0 auto 32px;font-size:1.125em}
.hero :focus-visible{outline-color:#fff}
.chooser{background:#fff;color:var(--ink);border-radius:18px;max-width:60rem;margin:0 auto;padding:clamp(20px,3vw,32px);text-align:left;box-shadow:0 30px 60px -30px rgba(0,0,0,.5);display:grid;gap:20px}
@media(min-width:900px){.chooser{grid-template-columns:1.4fr 1fr auto;align-items:end;gap:24px}}
.chooser :focus-visible{outline-color:var(--ink)}
.chooser fieldset{border:0;margin:0;padding:0;min-width:0}
.chooser legend,.chooser .lb{font-weight:600;font-size:.9375rem;margin-bottom:10px;display:block;padding:0}
:lang(zh) .chooser legend,:lang(zh) .chooser .lb{font-weight:400}
.ch-h{grid-column:1/-1;margin:0;font-family:var(--f-head);font-weight:var(--hw);font-size:calc(var(--hs)*1.5rem)}
.pills{display:flex;flex-wrap:wrap;gap:8px}
.pills label{position:relative;font-weight:400}
.pills input{position:absolute;opacity:0;width:1px;height:1px;min-height:0;padding:0}
.pills span{display:inline-block;border:1px solid #7D6469;border-radius:999px;padding:.5rem 1rem;cursor:pointer;user-select:none}
.pills input:checked+span{background:var(--acc);border-color:var(--acc);color:#fff}
.pills input:focus-visible+span{outline:3px solid var(--ink);outline-offset:2px}
.chooser select{font:inherit;width:100%;min-height:3rem;border:1px solid #7D6469;border-radius:6px;padding:.6rem .8rem;background:#fff;color:var(--ink)}
.cn{grid-column:1/-1;font-size:.8125rem;color:#5E464C;margin:0}
.cards{display:grid;gap:20px}@media(min-width:900px){.cards{grid-template-columns:repeat(3,1fr)}}
.cards article{background:#fff;border-radius:14px;overflow:hidden}
.cards .ph{aspect-ratio:4/3}.cards .tx{padding:24px}.cards p{margin:0}
.band{background:var(--band)}
.split .ph{aspect-ratio:1;border-radius:50%}
.q{margin-top:32px;border-left:2px solid var(--acc);padding-left:20px}.q p{font-size:calc(var(--hs)*clamp(1.5rem,1.2rem + 1.2vw,2.125rem))}
.enq{display:grid;gap:40px}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:72px}}
.enq form{background:#fff;padding:28px;border-radius:14px}
.flash{animation:fl 1.4s ease}@keyframes fl{0%{box-shadow:0 0 0 4px rgba(142,74,90,.55)}100%{box-shadow:0 0 0 0 rgba(142,74,90,0)}}
`,
  body: () => `<div class="hero">${ph('phCeremony', 'kb', 'officiant', true)}${head()}
<div class="in hero-c"><div class="rise">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro', 'class="lede"')}</div>
<form class="chooser" id="chooser" onsubmit="return false" aria-labelledby="ch-h"><p id="ch-h" class="ch-h" data-i="chooseH">${txt('chooseH')}</p>
<fieldset><legend data-i="chooseLang">${txt('chooseLang')}</legend><div class="pills">${[0, 1, 2].map((i) => `<label><input type="checkbox" name="lg" value="${i}"${i === 0 ? ' checked' : ''}><span data-i="langChips.${i}">${txt(`langChips.${i}`)}</span></label>`).join('')}</div></fieldset>
<div><label class="lb" for="area" data-i="chooseArea">${txt('chooseArea')}</label><select id="area">${[0, 1, 2, 3, 4, 5].map((i) => `<option value="${i}" data-i="areas.${i}">${txt(`areas.${i}`)}</option>`).join('')}</select></div>
<button class="btn" type="button" id="go" data-i="chooseBtn">${txt('chooseBtn')}</button>
<p class="cn" data-i="chooseNote">${txt('chooseNote')}</p></form></div></div>
<main id="main">
<section><div class="in cards">
<article class="rv">${ph('phDetail', '', 'hands')}<div class="tx">${T('h3', 'services.0.h')}${T('p', 'services.0.p')}</div></article>
<article class="rv">${ph('phDetail', '', 'parkback')}<div class="tx">${T('h3', 'travelH')}${T('p', 'travel')}</div></article>
<article class="rv">${ph('phDetail', '', 'vows')}<div class="tx">${T('h3', 'nav.3')}${T('p', 'lang1')}</div></article>
</div></section>
<section class="band" id="approach"><div class="in split">${ph('phPortrait', 'rv', 'peonies')}<div class="rv">${B.approach()}${B.quote()}</div></div></section>
<section><div class="in two">${B.cred()}${B.travel()}</div></section>
<section style="padding-top:0"><div class="in">${faqBlock()}</div></section>
<section class="band" id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('d')}</div></div></section>
</main>${foot()}
<script>
document.getElementById('go').addEventListener('click',function(){
  var names=[].map.call(document.querySelectorAll('#chooser input[name=lg]:checked'),function(i){return i.nextElementSibling.textContent;});
  var sep=document.documentElement.lang.indexOf('zh')===0?'、':', ';
  var a=document.getElementById('area');
  var l=document.getElementById('d4'),v=document.getElementById('d3');
  if(names.length)l.value=names.join(sep);if(a.selectedIndex<5)v.value=a.options[a.selectedIndex].textContent;
  document.getElementById('enquire').scrollIntoView({behavior:'smooth'});
  setTimeout(function(){document.getElementById('d0').focus({preventScroll:true});[l,v].forEach(function(x){x.classList.remove('flash');void x.offsetWidth;x.classList.add('flash');});},600);
});
</script>`,
});

// ── 05 · Cinematic — elegant italic over a film-like photo ──
designs.push({
  name: 'Cinematic', ref: 4, fonts: { head: { pkg: 'cormorant-garamond', weight: 600, zhAdjust: 1.16 }, ...serifTC, zhHeadW: 600, zhBodyW: 400, extra: [['cormorant-garamond', '500-italic.css']] },
  css: base({ r: '2px' }) + `
:root{--bg:#FDF6F2;--ink:#3A2C27;--peony:#F2D4D2;--mocha:#5C4036;--acc:#5C4036;--acc-d:#46302A;--on-acc:#FDF6F2}
.it{font-family:"Cormorant Garamond",var(--zh-h),serif;font-style:italic;font-weight:500}
:lang(zh) .it{font-family:var(--zh-h),var(--zh-serif-fb),serif;font-style:normal;font-weight:600}
.hero{position:relative;min-height:min(100vh,900px);display:grid;place-items:center;text-align:center;color:#fff}
.hero>.ph{position:absolute;inset:0}.hero>.ph::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(30,20,16,.35),rgba(30,20,16,.75))}
.hero .hd{position:absolute;top:0;left:0;right:0;z-index:3;color:#fff}
.hero-c{position:relative;z-index:2;padding-block:130px 90px}
.cine{font-size:calc(var(--hs)*clamp(3rem,1.6rem + 6vw,7rem));line-height:1.02;margin:0 auto .35em;max-width:14ch;text-wrap:balance}
:lang(zh) .cine{line-height:1.3;max-width:12ch}
.hero h1{color:#fff;font-family:var(--f-body);font-weight:400;font-size:clamp(.875rem,.8rem + .3vw,1rem);letter-spacing:.2em;text-transform:uppercase;margin:0 auto 28px;max-width:40rem}
:lang(zh) .hero h1{letter-spacing:.12em;text-transform:none;font-size:1.0625rem}
.hero .btns{justify-content:center}.hero .btn{background:transparent;border:1px solid #fff;color:#fff}.hero .btn:hover{background:#fff;color:var(--mocha)}
.hero :focus-visible{outline-color:#fff}
.cue{position:absolute;z-index:2;bottom:22px;left:50%;transform:translateX(-50%);font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;opacity:.85}
.cue::after{content:"";display:block;width:1px;height:28px;background:#fff;margin:8px auto 0;animation:cu 2s ease-in-out infinite}
@keyframes cu{0%,100%{transform:scaleY(.4);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}}
.intro{text-align:center}.intro p{max-width:42rem;margin-inline:auto;font-size:1.1875em;line-height:1.7}:lang(zh) .intro p{font-size:1.0625em;line-height:1.9}
.intro .it{font-size:clamp(2rem,1.4rem + 2vw,3rem);color:var(--mocha);display:block;margin-bottom:.5em}
.zig{display:grid;gap:32px;align-items:center}@media(min-width:900px){.zig{grid-template-columns:1fr 1fr;gap:88px}.zig.rev>:first-child{order:2}}
.zig .ph{aspect-ratio:4/5}
.zig h2 .it{font-size:1.15em}
.zig+.zig{margin-top:clamp(64px,8vw,120px)}
.mocha{background:var(--mocha);color:var(--bg);text-align:center}
.mocha .q p{font-family:"Cormorant Garamond",var(--zh-h),serif;font-style:italic;font-weight:500;font-size:calc(var(--hs)*clamp(2.25rem,1.5rem + 3vw,4rem));max-width:22ch;margin-inline:auto}
:lang(zh) .mocha .q p{font-family:var(--zh-h),serif;font-style:normal;font-weight:600}
.svcs{display:grid;gap:24px;margin-top:16px}@media(min-width:760px){.svcs{grid-template-columns:1fr 1fr}}
.svc{border:1px solid rgba(58,44,39,.25);padding:32px;text-align:center}.svc h3{font-family:"Cormorant Garamond",var(--zh-h),serif;font-style:italic;font-weight:500;font-size:calc(var(--hs)*2.25rem)}
:lang(zh) .svc h3{font-family:var(--zh-h),serif;font-style:normal;font-weight:600}
.peony{background:var(--peony)}
.enq{display:grid;gap:40px}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:80px}}
`,
  body: () => `<div class="hero">${ph('phCeremony', 'kb', 'veil', true)}${head()}
<div class="in hero-c rise"><p class="cine it" data-i="approachH">${txt('approachH')}</p>${T('h1', 'h1')}${B.ctas()}${B.facts('glass centre')}</div><span class="cue" aria-hidden="true" data-i="scroll">${txt('scroll')}</span></div>
<main id="main">
<section class="intro"><div class="in rv"><span class="it" lang="en">Vannarady Ng</span>${T('p', 'intro')}${T('p', 'intro2')}</div></section>
<section id="approach" style="padding-top:0"><div class="in">
<div class="zig">${ph('phPortrait', 'rv', 'bloom')}<div class="rv"><h2><span class="it" data-i="services.0.h">${txt('services.0.h')}</span></h2>${T('p', 'approach1')}${T('p', 'approach2')}</div></div>
<div class="zig rev">${ph('phDetail', 'rv', 'table')}<div class="rv"><h2><span class="it" data-i="nav.3">${txt('nav.3')}</span></h2>${T('p', 'lang1')}${chips()}${B.langLink()}</div></div>
</div></section>
<section class="mocha"><div class="in">${B.quote()}</div></section>
<section><div class="in">${T('h2', 'servicesH', 'style="text-align:center"')}<div class="svcs">${B.services()}</div><div class="two" style="margin-top:56px">${B.cred()}${B.travel()}</div></div></section>
<section class="peony"><div class="in">${faqBlock()}</div></section>
<section id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('e')}</div></div></section>
</main>${foot()}`,
});

// ── 06 · Horizon — oversized serif with one italic phrase, landscape with round inset ──
designs.push({
  name: 'Horizon', ref: 5, fonts: { head: { pkg: 'eb-garamond', weight: 500, zhAdjust: 1.12 }, ...serifTC, zhHeadW: 500, zhBodyW: 400, extra: [['eb-garamond', '500-italic.css']] },
  css: base({ w: '82rem', r: '999px' }) + `
:root{--bg:#F8F2EE;--ink:#2F2A2B;--soft:#EFE3DE;--acc:#2F2A2B;--acc-d:#000;--on-acc:#F8F2EE;--rose:#8E4A5A}
.disp{text-align:center;font-family:var(--f-head);font-weight:500;font-size:calc(var(--hs)*clamp(3.25rem,1.6rem + 6.4vw,8rem));line-height:.98;letter-spacing:-.015em;margin:clamp(24px,4vw,56px) auto 0;max-width:13ch;position:relative;z-index:2}
:lang(zh) .disp{line-height:1.25;letter-spacing:normal;max-width:10ch}
.disp em{font-family:"EB Garamond",serif;font-style:italic;font-weight:500;color:var(--rose)}
:lang(zh) .disp em{font-family:var(--zh-h),serif;font-style:normal}
.disp span,.disp em{display:block}
.stage{position:relative;margin-top:clamp(-36px,-3vw,-12px);padding-bottom:clamp(64px,7vw,104px)}
.land{aspect-ratio:4/3;width:100%}@media(min-width:900px){.land{aspect-ratio:21/9}}
.inset{position:absolute!important;width:clamp(8.5rem,24vw,21rem);aspect-ratio:1;border-radius:50%;left:clamp(24px,6vw,104px);bottom:0;border:8px solid var(--bg);box-shadow:0 20px 40px -20px rgba(0,0,0,.4)}
.inset .badge{display:none}
.lead{display:grid;gap:24px}@media(min-width:900px){.lead{grid-template-columns:5fr 6fr;gap:80px;align-items:start}}
.lead h1{font-size:calc(var(--hs)*clamp(1.75rem,1.3rem + 1.4vw,2.5rem))}
.lead .lede{font-size:1.1875em}:lang(zh) .lead .lede{font-size:1.0625em}
.soft{background:var(--soft)}
.q p{font-size:calc(var(--hs)*clamp(2rem,1.4rem + 2.6vw,3.75rem));text-align:center;max-width:24ch;margin-inline:auto}.q footer{text-align:center}
.svcs{display:grid;gap:24px;margin-top:24px}@media(min-width:760px){.svcs{grid-template-columns:1fr 1fr}}
.svc{background:#fff;border-radius:200px 200px 16px 16px;padding:64px 32px 40px;text-align:center}
.split .ph{border-radius:999px 999px 8px 8px;aspect-ratio:3/4}
.enq{display:grid;gap:40px}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:80px}}
.enq form{background:#fff;padding:28px;border-radius:24px}input,textarea{border-radius:12px}
`,
  body: () => `${head()}
<main id="main">
<p class="disp rise" aria-hidden="true"><span data-i="big1">${txt('big1')}</span><em data-i="big2">${txt('big2')}</em></p>
<div class="in stage">${ph('phCeremony', 'land kb', 'alps', true)}${ph('phDetail', 'inset', 'hands', false, '(min-width: 900px) 22rem, 40vw')}</div>
<div class="in lead">${T('h1', 'h1')}<div>${T('p', 'intro', 'class="lede"')}${T('p', 'intro2')}${B.ctas()}${B.facts()}</div></div>
<section id="approach"><div class="in split">${ph('phPortrait', 'rv', 'bouquet')}<div class="rv">${B.approach()}${B.langs()}${B.langLink()}</div></div></section>
<section class="soft"><div class="in">${B.quote()}</div></section>
<section><div class="in">${T('h2', 'servicesH', 'style="text-align:center"')}<div class="svcs">${B.services()}</div><div class="two" style="margin-top:56px">${B.cred()}${B.travel()}</div></div></section>
<section class="soft"><div class="in">${faqBlock()}</div></section>
<section id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('f')}</div></div></section>
</main>${foot()}`,
});

// ── 07 · Gallery — centred wordmark, split nav, crossfading slideshow ──
designs.push({
  name: 'Gallery', ref: 6, fonts: { head: { pkg: 'cormorant-garamond', weight: 600, zhAdjust: 1.16 }, ...serifTC, zhHeadW: 600, zhBodyW: 400 },
  css: base({ w: '80rem', r: '0' }) + `
:root{--bg:#FFFFFF;--ink:#2F2A2B;--soft:#FAF3F2;--acc:#7A3E4E;--acc-d:#5F2F3C;--on-acc:#fff;--rose:#7A3E4E}
.hd-c{max-width:var(--wrap);margin:0 auto;${G};display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;padding-block:22px 8px}
@media(min-width:900px){.hd-c{${GD}}}
.hd-c .brand{grid-column:2;text-align:center;justify-items:center}.hd-c .bn{font-size:2.25rem;letter-spacing:.04em;color:var(--rose)}
.hd-c .bs{text-transform:uppercase;letter-spacing:.24em;font-size:.6875rem}:lang(zh) .hd-c .bs{letter-spacing:.1em;font-size:.8125rem}
.nl,.nr{list-style:none;margin:0;padding:0;display:none;gap:24px}.nr{justify-content:flex-end}
@media(min-width:1280px){.nl,.nr{display:flex}.hd-c .nav-m{display:none!important}}
.nl a,.nr a{color:inherit;text-decoration:none;font-size:.75rem;letter-spacing:.18em;text-transform:uppercase}:lang(zh) .nl a,:lang(zh) .nr a{letter-spacing:.08em;font-size:.875rem}
.nl a:hover,.nr a:hover{color:var(--rose)}
.lsrow{display:flex;justify-content:center;padding-bottom:14px}
@media(max-width:1279px){.hd-c{grid-template-columns:1fr auto}.hd-c .brand{grid-column:1;text-align:left;justify-items:start}.lsrow{justify-content:flex-start;${G}}.hd-c .bn{font-size:1.75rem}}
.show{position:relative;height:clamp(24rem,62vw,48rem);overflow:hidden;background:#eee}
.show .ph{position:absolute!important;inset:0;opacity:0;animation:xf 18s infinite}
.show .ph:nth-child(2){animation-delay:6s}.show .ph:nth-child(3){animation-delay:12s}
@keyframes xf{0%{opacity:0}4%{opacity:1}33%{opacity:1}38%{opacity:0}100%{opacity:0}}
@media(prefers-reduced-motion:reduce){.show .ph{animation:none}.show .ph:first-child{opacity:1}}
.tag{text-align:center;padding-block:clamp(48px,5vw,88px) 0}
.tag .eb{text-transform:uppercase;letter-spacing:.32em;font-size:.8125rem;font-weight:600;margin-bottom:18px}:lang(zh) .tag .eb{letter-spacing:.14em;font-weight:400;font-size:.9375rem}
.tag h1{font-size:calc(var(--hs)*clamp(2.25rem,1.5rem + 2.6vw,3.75rem));max-width:22ch;margin:0 auto .4em}
.tag p{max-width:42rem;margin-inline:auto}.tag .btns{justify-content:center}
.trio{display:grid;gap:12px;margin-top:clamp(48px,5vw,88px)}@media(min-width:760px){.trio{grid-template-columns:repeat(3,1fr)}}.trio .ph{aspect-ratio:1}
.soft{background:var(--soft)}
h2{text-align:center}
.cent{text-align:center}.cent p{max-width:42rem;margin-inline:auto}.cent .chips{justify-content:center}
.q p{font-size:calc(var(--hs)*clamp(1.875rem,1.4rem + 2vw,3rem));color:var(--rose)}
.svcs{display:grid;gap:40px;margin-top:24px}@media(min-width:760px){.svcs{grid-template-columns:1fr 1fr}}.svc{text-align:center}
.svc h3{text-transform:uppercase;letter-spacing:.2em;font-family:var(--f-body);font-weight:600;font-size:.9375rem}:lang(zh) .svc h3{letter-spacing:.1em;font-weight:400;font-size:1.0625rem}
.enq{display:grid;gap:40px}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:80px}}
.enq h2{text-align:left}
`,
  body: () => {
    const items = [0, 1, 2, 3, 4, 5].map((i) => `<li><a href="${['#main', '#approach', '#ceremonies', '#languages', '#faq', '#enquire'][i]}" data-i="nav.${i}">${txt(`nav.${i}`)}</a></li>`);
    return `<header class="hd"><div class="hd-c"><ul class="nl">${items.slice(0, 3).join('')}</ul>${brand()}<ul class="nr">${items.slice(3).join('')}</ul>${mobileNav()}</div><div class="lsrow">${langSwitch()}</div></header>
<main id="main">
<div class="in"><div class="show">${ph('phCeremony', 'kb', 'arch', true)}${ph('phCeremony', '', 'lawn', false, '100vw')}${ph('phCeremony', '', 'table', false, '100vw')}<div class="show-cap">${B.facts('glass')}</div></div></div>
<div class="in tag rise">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${B.ctas()}</div>
<div class="in trio">${ph('phDetail', 'rv', 'peonies')}${ph('phDetail', 'rv', 'hands')}${ph('phDetail', 'rv', 'vows')}</div>
<section id="approach"><div class="in cent rv" style="max-width:56rem">${B.approach()}${T('p', 'intro2')}</div></section>
<section class="soft cent"><div class="in">${B.quote()}</div></section>
<section><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div></div></section>
<section class="soft"><div class="in cent rv" style="max-width:56rem">${B.langs()}${B.langLink()}<div class="two" style="margin-top:48px;text-align:left">${B.cred()}${B.travel()}</div></div></section>
<section><div class="in">${faqBlock()}</div></section>
<section class="soft" id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('g')}</div></div></section>
</main>${foot()}`;
  },
});

// ── 08 · Journal — magazine masthead and image tiles ──
designs.push({
  name: 'Journal', ref: 7, fonts: { head: { pkg: 'source-serif-4', weight: 600, zhAdjust: 1.03 }, ...serifTC, zhHeadW: 600, zhBodyW: 400 },
  css: base({ w: '84rem', r: '0' }) + `
:root{--bg:#F6EEEC;--ink:#2E2A2B;--bur:#6E1F2E;--acc:#8E1B24;--acc-d:#6E1F2E;--on-acc:#FBF7F2;--paper:#FBF7F2}
.util{max-width:var(--wrap);margin:0 auto;${G};display:flex;justify-content:space-between;align-items:center;gap:12px;padding-block:12px;font-size:.8125rem}
@media(min-width:900px){.util{${GD}}}
@media(max-width:899px){.util>span{display:none}}
.mast{text-align:center;padding-block:4px 16px}
.mast .brand{color:var(--bur);justify-items:center}
.mast .bn{font-weight:600;font-size:clamp(2.75rem,.8rem + 8vw,8.5rem);line-height:.95;letter-spacing:-.02em}
.mast .bs{font-size:.8125rem;letter-spacing:.24em;text-transform:uppercase;margin-top:10px;color:var(--ink)}:lang(zh) .mast .bs{letter-spacing:.1em;font-size:.9375rem}
.navrow{border-block:1px solid var(--ink);max-width:calc(var(--wrap) - 96px);margin:0 auto}
.navrow ul{display:flex;justify-content:center;flex-wrap:wrap;gap:4px 32px;list-style:none;margin:0;padding:12px 16px}
.navrow li{flex:none}.navrow a{white-space:nowrap;color:inherit;text-decoration:none;font-size:.8125rem;text-transform:uppercase;letter-spacing:.16em}:lang(zh) .navrow a{letter-spacing:.06em;font-size:.9375rem}
.navrow a:hover{color:var(--bur)}
@media(max-width:899px){.navrow{display:block!important;margin-inline:16px}.navrow ul{justify-content:center;flex-wrap:wrap;gap:6px 20px;padding:10px 0}.util .nav-m{display:none}}
.tiles{display:grid;gap:14px;padding-block:28px 0}
@media(min-width:900px){.tiles{grid-template-columns:repeat(4,1fr);grid-auto-rows:17rem}.t-feat{grid-column:span 2;grid-row:span 2}.t-a{grid-row:span 2}}
.tile{position:relative;overflow:hidden;min-height:15rem;display:grid;align-content:end;color:#fff;text-decoration:none}
.tile>.ph{position:absolute;inset:0;transition:transform .8s ease}.tile:hover>.ph{transform:scale(1.04)}
.tile>.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(30,10,14,.72))}
.tile .lab{position:relative;z-index:1;padding:20px;font-family:var(--f-head);font-weight:var(--hw);font-size:calc(var(--hs)*1.875rem);line-height:1.2}
.tile .ph .badge{left:auto;right:10px;bottom:auto;top:10px}
.t-feat{background:var(--paper);color:var(--ink);padding:clamp(24px,3vw,44px);align-content:center}
.t-feat .eb{font-size:.8125rem;letter-spacing:.2em;text-transform:uppercase;color:var(--acc);font-weight:600}:lang(zh) .t-feat .eb{letter-spacing:.08em;font-weight:400}
.t-feat h1{color:var(--bur);font-size:calc(var(--hs)*clamp(2.25rem,1.5rem + 2.4vw,3.5rem))}
.cols{columns:1;column-gap:48px}@media(min-width:900px){.cols{columns:2}}
.cols p{break-inside:avoid}
.dropcap::first-letter{float:left;font-family:var(--f-head);font-weight:600;color:var(--bur);font-size:4.2em;line-height:.85;margin:.06em .1em 0 0}
:lang(zh) .dropcap::first-letter{font-size:1em;float:none;margin:0;color:inherit}
h2{color:var(--bur)}
.pull{border-block:2px solid var(--bur);padding-block:32px;text-align:center}
.pull .q p{color:var(--bur);font-size:calc(var(--hs)*clamp(2rem,1.4rem + 2.4vw,3.5rem));max-width:24ch;margin-inline:auto}
.svcs{display:grid;border-top:1px solid var(--ink);margin-top:24px}@media(min-width:760px){.svcs{grid-template-columns:1fr 1fr}}
.svc{padding:24px 0;border-bottom:1px solid rgba(46,42,43,.2)}@media(min-width:760px){.svc+.svc{padding-left:32px;border-left:1px solid rgba(46,42,43,.2)}.svc{padding-right:32px}}
.svc h3{color:var(--bur)}
.chips li{border-color:var(--bur);color:var(--bur);border-radius:0}
.paper{background:var(--paper)}
.enq{display:grid;gap:40px}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:80px}}
`,
  body: () => `<header class="hd"><div class="util"><span data-i="footContact">${txt('footContact')}</span><div class="hd-r">${langSwitch()}</div></div>
<div class="mast">${brand()}</div><nav class="navrow" aria-label="Main">${navList()}</nav></header>
<main id="main"><div class="in">
<div class="tiles">
<div class="tile t-feat rise">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${B.ctas()}${B.facts()}</div>
<a class="tile t-a" href="#approach">${ph('phPortrait', '', 'bouquet', true)}<span class="lab" data-i="nav.1">${txt('nav.1')}</span></a>
<a class="tile" href="#ceremonies">${ph('phDetail', '', 'hands', true)}<span class="lab" data-i="services.0.h">${txt('services.0.h')}</span></a>
<a class="tile" href="#travel">${ph('phDetail', '', 'pier')}<span class="lab" data-i="travelH">${txt('travelH')}</span></a>
<a class="tile" href="#languages">${ph('phDetail', '', 'vows')}<span class="lab" data-i="nav.3">${txt('nav.3')}</span></a>
<a class="tile" href="#faq">${ph('phDetail', '', 'candles')}<span class="lab" data-i="nav.4">${txt('nav.4')}</span></a>
</div></div>
<section id="approach"><div class="in">${T('h2', 'approachH')}<div class="cols rv">${T('p', 'approach1', 'class="dropcap"')}${T('p', 'approach2')}${T('p', 'intro2')}${T('p', 'lang1')}</div></div></section>
<section style="padding-top:0"><div class="in"><div class="pull rv">${B.quote()}</div></div></section>
<section style="padding-top:0"><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div><div class="two" style="margin-top:48px"><div class="rv">${T('h3', 'langH')}${chips()}${B.langLink()}</div><div>${B.cred()}<div style="height:24px"></div>${B.travel()}</div></div></div></section>
<section class="paper"><div class="in">${faqBlock()}</div></section>
<section id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('h')}</div></div></section>
</main>${foot()}`,
});

// ── 09 · Planner × Cinematic — Round 2 merge from Van's feedback (14 Nov 2026) ──
// Concept 04 layout + Concept 05 hero photo (brightened, Ken Burns kept), signature wordmark,
// About Van, testimonials, social links, Celebrants Aotearoa and registration number.
const SOC = {
  // Instagram handle: Simon has it from KC-575 — replace the placeholder URL before sending.
  fb: { href: 'https://www.facebook.com/profile.php?id=61593286401022', label: 'Facebook', icon: 'siFacebook' },
  ig: { href: '#instagram-url-to-add', label: 'Instagram', icon: 'siInstagram' },
  red: { id: '63625534159', label: 'Xiaohongshu (RedNote)', key: 'socRed', icon: 'siXiaohongshu' },
  wx: { id: 'Van_Celebrant', label: 'WeChat', key: 'socWechat', icon: 'siWechat' },
};
const CANZ = 'href="https://celebrantsaotearoa.co.nz/celebrants/vannarady-ng/" target="_blank" rel="noopener"';
const svgIcon = (name) => { const i = SI[name]; return `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="${i.path}"/></svg>`; };
const socials = (cls = 'soc') => `<ul class="${cls}" aria-label="${SOC.fb.label}, ${SOC.ig.label}, ${SOC.red.label}, ${SOC.wx.label}">${Object.entries(SOC).map(([k, s]) => s.href
  ? `<li><a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${svgIcon(s.icon)}</a></li>`
  : `<li><button type="button" popovertarget="pop-${k}" aria-label="${s.label}" title="${s.label}">${svgIcon(s.icon)}</button></li>`).join('')}</ul>`;
const socPops = () => ['red', 'wx'].map((k) => { const s = SOC[k]; return `<div class="pop" id="pop-${k}" popover><div class="pop-h">${svgIcon(s.icon)}<p data-i="${s.key}">${txt(s.key)}</p></div><p class="pop-id" lang="en">${s.id}</p><p class="pop-n" data-i="socHint">${txt('socHint')}</p><p><span class="flag" data-i="socQr">${txt('socQr')}</span></p><div class="pop-b"><button type="button" class="btn" data-copy="${s.id}" data-i="socCopy">${txt('socCopy')}</button><button type="button" class="tl" popovertarget="pop-${k}" popovertargetaction="hide" data-i="socClose">${txt('socClose')}</button></div></div>`; }).join('');
const IC = {
  rings: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="14" r="5.5"/><circle cx="15" cy="14" r="5.5"/><path d="M10.5 4.5l1.5-2 1.5 2-1.5 2z" stroke-linejoin="round"/></g></svg>',
  talk: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3.5 5.5h11a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H8l-3.5 3v-3h-1A1.5 1.5 0 0 1 2 13V7a1.5 1.5 0 0 1 1.5-1.5z"/><path d="M16 9.5h4.5A1.5 1.5 0 0 1 22 11v5.5a1.5 1.5 0 0 1-1.5 1.5h-1v2.5L16.5 18H12a1.5 1.5 0 0 1-1.5-1.5V15"/></g></svg>',
  map: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M3 6.5l5.5-2.5 7 2.5L21 4v13.5L15.5 20l-7-2.5L3 20z"/><path d="M8.5 4v13.5M15.5 6.5V20"/></g></svg>',
  arrow: '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M4 10h11m-4-4.5L15.5 10 11 14.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  plus: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  minus: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
};
const sigBrand = () => `<a class="brand" href="#"><span class="sig" lang="en">Vannarady Ng</span><span class="bs" data-i="brandSub">${txt('brandSub')}</span></a>`;
const head9 = () => `<header class="hd"><div class="hd-in">${sigBrand()}<nav class="nav-d" aria-label="Main">${navList()}</nav><div class="hd-r">${socials()}${langSwitch(false)}${mobileNav()}</div></div></header>`;
const cred9 = () => `<div class="cred rv">${seal}<div>${T('h3', 'credH')}${T('p', 'cred')}<p class="reg"><a class="tl" ${DIA} data-i="credLink">${txt('credLink')}</a> <span class="reg-n" data-i="regNo">${txt('regNo')}</span></p><div class="canz"><span class="flag" data-i="canzLogo">${txt('canzLogo')}</span><p><span data-i="canz">${txt('canz')}</span> · <a class="tl" ${CANZ} data-i="canzLink">${txt('canzLink')}</a></p></div></div></div>`;
const travel9 = () => `<div class="travel rv" id="travel"><span class="t-ic">${IC.map}</span>${T('h3', 'travelH')}${T('p', 'travelLede', 'class="t-lede"')}<ul class="places">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<li>${pin}<span data-i="places.${i}">${txt(`places.${i}`)}</span></li>`).join('')}</ul><p class="t-foot"><span data-i="travelNote">${txt('travelNote')}</span> <a class="tl" href="#enquire"><span data-i="travelAsk">${txt('travelAsk')}</span></a></p></div>`;
const foot9 = () => `<footer class="ft ft9"><div class="ft-in"><div class="ft-a"><p class="sig ft-wm" lang="en">Vannarady Ng</p>${T('p', 'brandSub', 'class="ft-sub"')}${T('p', 'footNote', 'class="note"')}${socials('soc ft-soc')}<a class="btn ft-btn" href="#enquire" data-i="cta">${txt('cta')}</a></div><nav class="ft-col" aria-label="Footer">${T('p', 'ftExplore', 'class="ft-h"')}<ul>${['#main', '#approach', '#ceremonies', '#languages', '#faq', '#enquire'].map((h, i) => `<li><a href="${h}" data-i="nav.${i}">${txt(`nav.${i}`)}</a></li>`).join('')}</ul></nav><div class="ft-col">${T('p', 'ftContact', 'class="ft-h"')}${T('p', 'footContact')}<p><a ${DIA} data-i="ftDia">${txt('ftDia')}</a> · <span data-i="regNo">${txt('regNo')}</span></p><p><a ${CANZ} data-i="canz">${txt('canz')}</a></p><p><a href="privacy.html" data-i="privacyLink">${txt('privacyLink')}</a></p>${langSwitch(false)}</div></div><div class="ft-base">${T('span', 'copyright')}</div></footer>`;
// Signature options for Van to compare (all SIL OFL 1.1, Latin subset only). Review switch: ?sig=a|b|c|d
const SIGS = [['a', 'Corinthia', 'corinthia'], ['b', 'Pinyon Script', 'pinyon-script'], ['c', 'Great Vibes', 'great-vibes'], ['d', 'Allura', 'allura']];
designs.push({
  name: 'Planner × Cinematic', ref: 3,
  fonts: { head: { pkg: 'literata', weight: 500, zhAdjust: 1.0 }, ...serifTC, zhHeadW: 500, zhBodyW: 400, extra: SIGS.map(([, , p]) => [p, 'latin-400.css']) },
  css: designs[3].css + `
/* signature wordmark */
:root{--sig:"Corinthia";--sig-s:1}
:root[data-sig=b]{--sig:"Pinyon Script";--sig-s:.62}
:root[data-sig=c]{--sig:"Great Vibes";--sig-s:.7}
:root[data-sig=d]{--sig:"Allura";--sig-s:.74}
.sig{font-family:var(--sig),"Literata",Georgia,serif;font-weight:400;font-style:normal;line-height:1;white-space:nowrap;letter-spacing:0}
.hd .sig{font-size:calc(var(--sig-s)*2.85rem);margin:-.12em 0 -.02em}
.ft .sig.ft-wm{font-size:calc(var(--sig-s)*clamp(3.25rem,2.6rem + 2vw,4.5rem))!important;margin:0 0 .1em!important;line-height:1.05}
.hd .bs{letter-spacing:.14em;text-transform:uppercase;font-size:.6875rem;opacity:.9}
:lang(zh) .hd .bs{letter-spacing:.06em;text-transform:none;font-size:.8125rem}
/* hero: warm plum veil so the type always reads, photo still bright at the edges */
.hero>.ph img{object-position:50% 58%;filter:saturate(1.05) contrast(1.02)}
.hero>.ph::after{background:linear-gradient(180deg,rgba(46,22,30,.62) 0,rgba(46,22,30,.28) 18%,rgba(46,22,30,.34) 55%,rgba(46,22,30,.72) 100%),radial-gradient(ellipse 62% 48% at 50% 40%,rgba(46,22,30,.5),rgba(46,22,30,0) 72%),linear-gradient(0deg,rgba(142,74,90,.16),rgba(142,74,90,.16))}
.hero{min-height:min(100svh,980px);display:flex;flex-direction:column}
.hero-c{flex:1;display:flex;flex-direction:column;justify-content:center;gap:clamp(28px,4vw,48px);padding-block:clamp(40px,6vw,72px) clamp(40px,5vw,64px)!important}
.hero .eb{display:block;margin:0 0 18px!important;opacity:1!important;color:#F6DCE0}
.hero-acc{font-family:var(--sig),"Literata",Georgia,serif;font-size:calc(var(--sig-s)*clamp(3rem,2rem + 4vw,5.75rem));line-height:1;color:#FBE6E8;margin:0 auto .22em;font-weight:400;text-shadow:0 2px 30px rgba(30,14,20,.55)}
:lang(zh) .hero-acc{font-family:var(--f-head);font-size:calc(var(--hs)*clamp(2.4rem,1.7rem + 2.6vw,3.75rem));line-height:1.3;letter-spacing:normal;margin-bottom:.3em}
.hero-acc span{display:inline}
.hero h1{font-size:calc(var(--hs)*clamp(1.75rem,1.2rem + 2.1vw,3.125rem))!important;max-width:22ch!important;font-weight:500;letter-spacing:-.005em;margin-bottom:.5em!important}
.hero .lede{max-width:36rem!important;font-size:1.0625em!important;opacity:.95;margin-bottom:0!important}
.hero h1,.hero .lede,.hero .eb{text-shadow:0 1px 2px rgba(30,14,20,.5),0 2px 24px rgba(30,14,20,.45)}
.hero .hd{text-shadow:0 1px 10px rgba(30,14,20,.45);border-bottom:1px solid rgba(255,255,255,.16)}
.chooser{width:100%;background:rgba(255,253,252,.94);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);border:1px solid rgba(255,255,255,.6);box-shadow:0 40px 80px -36px rgba(20,8,12,.7)}
@media(max-width:599px){.hero .eb{font-size:.6875rem;letter-spacing:.18em}}
/* header: floating frosted bar over the photo, turns blush once you scroll */
.hero .hd{position:relative;z-index:10;padding:14px max(12px,env(safe-area-inset-left,0px)) 0;border-bottom:0;text-shadow:none}
.hero .hd-in{max-width:1560px;background:rgba(44,20,28,.34);backdrop-filter:blur(16px) saturate(1.3);-webkit-backdrop-filter:blur(16px) saturate(1.3);border:1px solid rgba(255,255,255,.24);border-radius:999px;padding:14px 14px 12px 30px;box-shadow:0 18px 40px -24px rgba(20,8,12,.6);transition:background .3s ease,color .3s ease,box-shadow .3s ease,border-color .3s ease}
@media(min-width:900px){.hero .hd{position:fixed;top:0;left:0;right:0}.hero-c{padding-top:clamp(120px,10vw,150px)!important}}
.hd.stuck .hd-in{background:rgba(251,243,241,.92);color:var(--ink);border-color:rgba(142,74,90,.18);box-shadow:0 18px 40px -22px rgba(59,42,46,.45)}
.hd .sig{font-size:calc(var(--sig-s)*3.1rem);margin:.14em 0 .02em!important;padding-top:.04em}
.hd .bs{color:#F6DCE0}.hd.stuck .bs{color:var(--acc)}
.nav-d ul{gap:4px!important}
.nav-d a{display:block;padding:.5rem 1rem;border-radius:999px;font-size:1.0625rem;font-weight:600;letter-spacing:.01em;text-decoration:none!important;transition:background .2s ease,color .2s ease}
:lang(zh) .nav-d a{font-weight:400}
.nav-d a:hover{background:rgba(255,255,255,.16)}
.nav-d a[aria-current]{background:rgba(255,255,255,.22);box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)}
.hd.stuck .nav-d a:hover{background:color-mix(in srgb,var(--acc) 10%,transparent)}
.hd.stuck .nav-d a[aria-current]{background:color-mix(in srgb,var(--acc) 12%,#fff);color:var(--acc);box-shadow:none}
.hd-r{gap:10px!important}
.hd .soc{gap:6px;margin:0}
.hd .soc a,.hd .soc button{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28)}
.hd .soc a:hover,.hd .soc button:hover{background:#fff;color:var(--acc);border-color:#fff}
.hd.stuck .soc a,.hd.stuck .soc button{background:color-mix(in srgb,var(--acc) 8%,#fff);border-color:color-mix(in srgb,var(--acc) 22%,transparent);color:var(--acc)}
.hd.stuck .soc a:hover,.hd.stuck .soc button:hover{background:var(--acc);color:#fff}
.hd .ls{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:3px;gap:0}
.hd .ls .ls-l{display:none}
.hd .ls button{border:0!important;padding:.38rem .8rem;font-weight:600}
:lang(zh) .hd .ls button{font-weight:400}
.hd .ls button[aria-pressed=true]{background:#fff;color:var(--acc)}
.hd.stuck .ls{background:color-mix(in srgb,var(--acc) 8%,#fff);border-color:color-mix(in srgb,var(--acc) 22%,transparent)}
.hd.stuck .ls button[aria-pressed=true]{background:var(--acc);color:#fff}
.hd-cta{min-height:44px!important;padding:.55rem 1.3rem!important;border-radius:999px!important;font-size:.9375rem!important;box-shadow:0 10px 24px -12px rgba(115,59,73,.9);white-space:nowrap}
.hero .hd-cta{background:#fff;color:var(--acc)}.hero .hd-cta:hover{background:#FBE6E8}
.hd.stuck .hd-cta{background:var(--acc);color:#fff}
@media(min-width:1280px) and (max-width:1439px){.nav-d ul{gap:0!important}.nav-d a{padding:.5rem .7rem}.hd .soc{gap:4px}.hd-r{gap:8px!important}.hero .hd-in{padding-left:24px}}
@media(max-width:1099px){.hd-cta{display:none!important}}
.nav-m summary{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.4)!important;font-weight:600}
@media(max-width:899px){.hero .hd-in{border-radius:26px;padding:12px 14px 12px 18px}.hd .sig{font-size:calc(var(--sig-s)*2.6rem)}.hd .ls button{padding:.32rem .6rem}}
@media(max-width:599px){.hero .hd-in{column-gap:6px;padding:12px 10px 12px 16px}.hd .soc{gap:3px}.hd .soc a,.hd .soc button{width:30px;height:30px}.hd .soc svg{width:15px;height:15px}.hd .ls button{padding:.28rem .5rem;font-size:.8125rem}:lang(zh) .hero-acc span{display:block}}
@media(max-width:359px){.hd .ls button{padding:.28rem .38rem}}
/* no dash-style rules on this page: eyebrows get a small rose dot instead */
.sec-eb::before{width:6px;height:6px;border-radius:50%;background:currentColor}
/* Plan your ceremony card */
.ch9{max-width:64rem;padding:clamp(22px,3vw,36px);border-radius:24px;gap:22px 28px;text-align:left}
@media(min-width:900px){.ch9{grid-template-columns:1.25fr 1fr auto;align-items:end}}
.ch-top{grid-column:1/-1;display:grid;gap:6px;justify-items:center;text-align:center;padding-bottom:18px;border-bottom:1px solid color-mix(in srgb,var(--acc) 16%,transparent)}
.ch9 .ch-h{font-size:calc(var(--hs)*clamp(1.375rem,1.1rem + .8vw,1.75rem));margin:0}
.ch9 .cn{grid-column:auto;margin:0;font-size:.9375rem;color:#6E5459}
.ch-f{border:0;margin:0;padding:0;min-width:0}
.ch9 legend,.ch9 .lb{display:flex;align-items:center;gap:10px;font-weight:600;font-size:.9375rem;margin-bottom:12px;padding:0}
:lang(zh) .ch9 legend,:lang(zh) .ch9 .lb{font-weight:400}
.ch-n{display:inline-grid;place-items:center;width:24px;height:24px;border-radius:50%;background:color-mix(in srgb,var(--acc) 12%,#fff);color:var(--acc);font-size:.8125rem;font-weight:600;flex:none}
.ch9 .pills{gap:10px}
.ch9 .pills span{display:inline-flex;align-items:center;gap:6px;min-height:48px;padding:.55rem 1.15rem;border:1px solid color-mix(in srgb,var(--ink) 24%,transparent);background:#fff;border-radius:999px;transition:background .2s ease,border-color .2s ease,color .2s ease,box-shadow .2s ease}
.ch9 .pills span:hover{border-color:var(--acc);box-shadow:0 6px 16px -10px rgba(142,74,90,.6)}
.ch9 .pills b{font-weight:400}
.ch9 .ck{width:0;height:16px;opacity:0;transition:width .2s ease,opacity .2s ease}
.ch9 .pills input:checked+span{background:var(--acc);border-color:var(--acc);color:#fff;box-shadow:0 8px 20px -10px rgba(142,74,90,.8)}
.ch9 .pills input:checked+span .ck{width:16px;opacity:1}
.sel{position:relative;color:var(--acc)}
.sel>svg{position:absolute;left:16px;top:50%;transform:translateY(-50%);pointer-events:none}
.sel::after{content:"";position:absolute;right:18px;top:50%;width:8px;height:8px;border-right:1.6px solid var(--ink);border-bottom:1.6px solid var(--ink);transform:translateY(-70%) rotate(45deg);pointer-events:none;opacity:.7}
.ch9 select{appearance:none;-webkit-appearance:none;min-height:48px;padding:.6rem 2.75rem .6rem 2.75rem;border-radius:999px;border:1px solid color-mix(in srgb,var(--ink) 24%,transparent);background:#fff;color:var(--ink);cursor:pointer;transition:border-color .2s ease}
.ch9 select:hover{border-color:var(--acc)}
.ch-go{min-height:52px;border-radius:999px;padding:.75rem 1.6rem;gap:10px;white-space:nowrap;box-shadow:0 14px 28px -14px rgba(115,59,73,.9)}
.ch-go svg{transition:transform .2s ease}.ch-go:hover svg{transform:translateX(3px)}
@media(max-width:899px){.ch-go{width:100%}}
@media(max-width:480px){.ch9 .pills{gap:6px}.ch9 .pills span{padding:.5rem .75rem;gap:4px}}
/* socials */
.soc{list-style:none;margin:0 6px 0 0;padding:0;display:flex;gap:2px;align-items:center}
.soc a,.soc button{display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;color:inherit;background:none;border:1px solid transparent;cursor:pointer;padding:0;transition:background .2s ease,border-color .2s ease}
.soc a:hover,.soc button:hover{border-color:currentColor}
.hero .soc svg{filter:drop-shadow(0 1px 6px rgba(30,16,20,.35))}
.ft-soc{margin:18px 0 0 -8px}
@media(max-width:899px){.hd-r .nav-m{order:2}.hd-r .ls{order:3;width:auto}.hd-r .soc{order:4;margin:0 -6px 0 auto}.soc a,.soc button{width:34px;height:34px}}
.pop{border:0;border-radius:16px;padding:24px;width:min(22rem,calc(100vw - 32px));background:#fff;color:var(--ink);box-shadow:0 30px 60px -20px rgba(0,0,0,.45)}
.pop::backdrop{background:rgba(40,24,28,.35)}
.pop-h{display:flex;align-items:center;gap:10px;color:var(--acc)}.pop-h p{margin:0;font-weight:600;color:var(--ink)}
:lang(zh) .pop-h p{font-weight:400}
.pop-id{font-family:"Source Sans 3",system-ui,sans-serif;font-size:1.5rem;font-weight:600;letter-spacing:.02em;margin:14px 0 4px;user-select:all}
.pop-n{font-size:.9375rem;opacity:.85}
.pop-b{display:flex;gap:16px;align-items:center;margin-top:8px}.pop-b .tl{background:none;border:0;font:inherit;cursor:pointer;color:inherit}
/* about */
.about{align-items:start}
@media(min-width:900px){.about{grid-template-columns:5fr 7fr}.about>.ph{position:sticky;top:32px}}
.about h2{margin-bottom:.4em}
.about h3{font-size:calc(var(--hs)*1.5rem);margin-top:1.4em}
.about p{max-width:38rem}
.more{margin-top:8px}
.more summary{display:inline-flex;gap:8px;align-items:center;cursor:pointer;list-style:none;font-weight:600;color:var(--acc);border-bottom:1px solid currentColor;padding-bottom:2px}
:lang(zh) .more summary{font-weight:400}
.more summary::-webkit-details-marker{display:none}
.more summary::after{content:"+";font-size:1.1em;line-height:1}.more[open] summary{display:none}
/* testimonials: one featured card now; becomes a swipeable row as more arrive */
.testi-h{text-align:center;margin-bottom:clamp(28px,4vw,48px)}.testi-h .sec-eb{justify-content:center}
.tq{list-style:none;margin:0 auto;padding:0;display:grid;grid-auto-flow:column;grid-auto-columns:min(100%,46rem);gap:24px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:thin;padding-bottom:8px}
.tq:has(>li:only-child){justify-content:center;overflow:visible}
.tq>li{scroll-snap-align:center}
.tq blockquote{margin:0;height:100%;background:#fff;border-radius:18px;padding:clamp(28px,4vw,48px);box-shadow:0 24px 48px -36px rgba(59,42,46,.45);display:flex;flex-direction:column}
.tq .qm{font-family:Georgia,serif;font-size:5rem;line-height:.6;height:.42em;color:var(--acc);opacity:.35}
.tq p{font-size:1.0625em;line-height:1.75;margin:0 0 14px}.tq p:empty{display:none}.tq p:last-of-type{margin-bottom:22px}
:lang(zh) .tq p{line-height:1.9}
.tq footer{margin-top:auto;font-size:.9375rem;opacity:.85}
/* credentials */
.reg{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline}.reg-n{font-size:.9375rem;font-variant-numeric:tabular-nums;border:1px solid color-mix(in srgb,var(--ink) 22%,transparent);border-radius:999px;padding:.05rem .65rem}
.canz{margin-top:16px;padding-top:14px;border-top:1px solid color-mix(in srgb,var(--ink) 12%,transparent)}.canz p{margin:6px 0 0;font-size:.9375rem}

/* ───────── sections ───────── */
:root{--plum:#3B2A2E;--plum-2:#4C3138;--blush:#F3DEDA;--cream:#FFFCFB}
main section{position:relative}
@media(min-width:900px){[id]{scroll-margin-top:110px}}
.sec-h{text-align:center;max-width:46rem;margin:0 auto clamp(36px,5vw,64px)}
.sec-h .sec-eb{justify-content:center}
.sec-l{font-size:1.125em;line-height:1.7;opacity:.88;margin:0 auto}
:lang(zh) .sec-l{font-size:1.0625em;line-height:1.9}
/* offer cards */
.offer9{background:linear-gradient(180deg,var(--bg) 0,#fff 100%)}
.cards9{display:grid;gap:clamp(20px,2.4vw,32px)}@media(min-width:900px){.cards9{grid-template-columns:repeat(3,1fr)}}
.c9{background:#fff;border-radius:26px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 0 rgba(59,42,46,.06),0 30px 60px -40px rgba(59,42,46,.45);transition:transform .35s ease,box-shadow .35s ease}
.c9:hover{transform:translateY(-6px);box-shadow:0 1px 0 rgba(59,42,46,.06),0 40px 70px -40px rgba(59,42,46,.6)}
.c9-img{position:relative;display:block;overflow:hidden;margin:12px 12px 0;border-radius:18px}
.c9 .ph{aspect-ratio:4/3.4;border-radius:18px;background:#eadad7}
.c9 .ph img{transition:transform .8s cubic-bezier(.2,.7,.2,1)}
.c9:hover .ph img{transform:scale(1.06)}
.c9-img::after{content:"";position:absolute;inset:0;border-radius:18px;background:linear-gradient(180deg,rgba(40,20,26,0) 55%,rgba(40,20,26,.35))}
.c9-n{position:absolute;z-index:2;left:14px;top:14px;font:600 .8125rem/1 "Source Sans 3",system-ui,sans-serif;letter-spacing:.12em;color:#fff;background:rgba(40,20,26,.35);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:.45rem .7rem}
.c9-b{position:relative;padding:38px clamp(22px,2.2vw,30px) 28px;display:flex;flex-direction:column;gap:10px;flex:1}
.c9-ic{position:absolute;top:-26px;left:clamp(22px,2.2vw,30px);display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:var(--acc);color:#fff;box-shadow:0 0 0 6px #fff,0 12px 24px -10px rgba(142,74,90,.9)}
.c9 h3{margin:0;font-size:calc(var(--hs)*clamp(1.5rem,1.25rem + .6vw,1.875rem))}
.c9 p{margin:0;flex:1;opacity:.88}
.c9-l{display:inline-flex;align-items:center;gap:8px;margin-top:10px;align-self:flex-start;color:var(--acc);font-weight:600;text-decoration:none;border-bottom:1px solid color-mix(in srgb,var(--acc) 35%,transparent);padding-bottom:3px}
:lang(zh) .c9-l{font-weight:400}
.c9-l svg{transition:transform .2s ease}.c9-l:hover svg{transform:translateX(4px)}
/* about */
.about9{background:radial-gradient(ellipse 60% 70% at 15% 30%,#F7E5E2 0,rgba(247,229,226,0) 70%),var(--blush)}
.ab-g{display:grid;gap:clamp(40px,6vw,96px);align-items:start}@media(min-width:900px){.ab-g{grid-template-columns:5fr 7fr}.ab-pic{position:sticky;top:120px}}
.ab-pic{position:relative;max-width:30rem;margin-inline:auto;width:100%}
.ab-frame{position:relative}
.ab-frame::before{content:"";position:absolute;inset:-14px 14px 14px -14px;border:1px solid color-mix(in srgb,var(--acc) 45%,transparent);border-radius:28px}
.ab-frame .ph{aspect-ratio:4/5;border-radius:28px;box-shadow:0 40px 80px -40px rgba(59,42,46,.6)}
.ab-badge{position:absolute;left:50%;bottom:-20px;transform:translateX(-50%);margin:0;white-space:nowrap;background:#fff;color:var(--acc);font-family:var(--f-head);font-size:1.0625rem;padding:.65rem 1.4rem;border-radius:999px;box-shadow:0 18px 36px -18px rgba(59,42,46,.55)}
.ab-h{font-family:var(--sig),"Literata",serif!important;font-weight:400!important;font-size:calc(var(--sig-s)*clamp(3.5rem,2.6rem + 3vw,5.5rem))!important;line-height:1!important;color:var(--acc);margin:0 0 .3em!important}
:lang(zh) .ab-h{font-family:var(--f-head)!important;font-size:calc(var(--hs)*clamp(2.125rem,1.5rem + 2.2vw,3.25rem))!important;color:var(--ink)}
.ab-lede{font-family:var(--f-head);font-size:calc(var(--hs)*clamp(1.125rem,1.05rem + .3vw,1.3125rem));line-height:1.55!important;color:var(--ink)}
:lang(zh) .ab-lede{line-height:1.8!important}
.ab-t p{max-width:40rem}
.ab-t h3{font-size:calc(var(--hs)*1.5rem);margin-top:1.4em}
.more summary,.less{display:inline-flex;align-items:center;gap:10px;cursor:pointer;list-style:none;font:inherit;font-weight:600;color:var(--acc);background:#fff;border:1px solid color-mix(in srgb,var(--acc) 30%,transparent);border-radius:999px;padding:.65rem 1.3rem;margin-top:10px;transition:background .2s ease,color .2s ease;border-bottom:1px solid color-mix(in srgb,var(--acc) 30%,transparent)}
.more summary::after{content:none!important}
:lang(zh) .more summary,:lang(zh) .less{font-weight:400}
.more summary:hover,.less:hover{background:var(--acc);color:#fff}
.more[open] summary{display:none}
.more-b{animation:rise .5s ease both}
.ab-sig{font-family:var(--sig),serif;font-size:calc(var(--sig-s)*3.75rem);line-height:1;color:var(--acc);margin:28px 0 0;opacity:.9}
@media(max-width:899px){.ab-badge{font-size:.9375rem}}
/* testimonials */
.testi9{background:radial-gradient(ellipse 70% 60% at 50% 0,var(--plum-2),var(--plum));color:#FBEFF0;overflow:hidden}
.testi9::before{content:"“";position:absolute;left:50%;top:-.18em;transform:translateX(-50%);font-family:Georgia,serif;font-size:clamp(16rem,30vw,28rem);line-height:1;color:rgba(255,255,255,.04);pointer-events:none}
.testi9 .sec-eb{color:#F2C9D0}
.testi9 h2{color:#fff}
.testi9 .tq blockquote{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(6px);box-shadow:0 40px 80px -40px rgba(0,0,0,.6);color:#FBEFF0}
.testi9 .tq .qm{color:#F2C9D0;opacity:.8}
.tq{grid-auto-columns:min(100%,52rem)}
/* reviews: one column, one text size, full width with edges aligned to the menu bar */
.testi9 .in{max-width:1560px;padding-left:max(12px,env(safe-area-inset-left,0px));padding-right:max(12px,env(safe-area-inset-right,0px))}
.testi9 .tq:has(>li:only-child){grid-auto-columns:100%;justify-content:stretch}
@property --ang{syntax:"<angle>";inherits:false;initial-value:0deg}
.testi9 .tq blockquote{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding:clamp(36px,5vw,80px) clamp(22px,6vw,120px);border-radius:28px;background:linear-gradient(160deg,rgba(255,255,255,.09),rgba(255,255,255,.03));border:1px solid transparent;box-shadow:0 50px 100px -50px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.12);isolation:isolate;backdrop-filter:none}
.testi9 .tq blockquote::before{content:"";position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:conic-gradient(from var(--ang),rgba(242,201,208,.15),rgba(242,201,208,.9),rgba(255,255,255,.2),rgba(242,201,208,.15) 60%,rgba(242,201,208,.7),rgba(242,201,208,.15));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:ring 9s linear infinite;z-index:-1}
.testi9 .tq blockquote::after{content:"";position:absolute;left:50%;top:0;width:min(70%,640px);height:220px;transform:translate(-50%,-40%);background:radial-gradient(closest-side,rgba(242,201,208,.28),rgba(242,201,208,0));pointer-events:none;z-index:-1}
@keyframes ring{to{--ang:360deg}}
.stars{display:flex;gap:clamp(6px,1vw,12px);margin:0 0 18px;color:#F6CBD3}
.stars svg{width:clamp(26px,2.4vw,34px);height:auto;filter:drop-shadow(0 0 14px rgba(246,203,211,.55));animation:star .6s cubic-bezier(.3,1.6,.5,1) both}
.tq li.pre:not(.shown) .stars svg{animation:none;opacity:0}
.stars svg:nth-child(2){animation-delay:.1s}.stars svg:nth-child(3){animation-delay:.2s}.stars svg:nth-child(4){animation-delay:.3s}.stars svg:nth-child(5){animation-delay:.4s}
@keyframes star{from{opacity:0;transform:scale(.3) rotate(-30deg)}to{opacity:1;transform:none}}
.testi9 .tq p.rate{margin:0 0 28px;font:600 .75rem/1 "Source Sans 3",system-ui,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#F2C9D0}
:lang(zh) .testi9 .tq p.rate{letter-spacing:.08em;font-size:.875rem;font-weight:400}
.testi9 .tq .qm{display:none}
.testi9 .tq p:not(.rate){font-family:var(--f-head);font-size:calc(var(--hs)*clamp(1.125rem,1rem + .45vw,1.375rem));line-height:1.75;max-width:60rem;margin:0 0 1em;color:#FBEFF0}
:lang(zh) .testi9 .tq p:not(.rate){line-height:1.95}
.testi9 .tq p.q0::before{content:"“"}
.testi9 .tq p.qz::after{content:"”"}
.testi9 .tq p.qz{margin-bottom:0}
.testi9 .tq footer{display:flex;align-items:center;gap:12px;margin-top:32px;padding-top:24px;border-top:1px solid rgba(242,201,208,.25);font-size:.9375rem;color:#F2C9D0;opacity:1}
.testi9 .tq footer::before{content:"";width:34px;height:34px;border-radius:50%;flex:none;background:rgba(242,201,208,.16) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z' fill='%23F6CBD3'/%3E%3C/svg%3E") center/16px no-repeat}
@media(prefers-reduced-motion:reduce){.testi9 .tq blockquote::before{animation:none}}
/* credentials + travel */
.trust9{background:#fff}
.trust9 .two{align-items:stretch}.trust9 .two>*{height:100%;margin:0}
.trust9 .cred,.trust9 .travel{border-radius:26px;padding:clamp(26px,3vw,40px);border:0;box-shadow:0 30px 60px -44px rgba(59,42,46,.55)}
.trust9 .cred{background:linear-gradient(140deg,#FFF 0,#FBEDEB 100%);border:1px solid color-mix(in srgb,var(--acc) 14%,transparent)}
.trust9 .travel{background:linear-gradient(140deg,#FFF 0,#F7EEF0 100%);border:1px solid color-mix(in srgb,var(--acc) 14%,transparent)}
.trust9 .cred .seal{width:64px;height:64px}
.trust9 h3{font-size:calc(var(--hs)*clamp(1.5rem,1.25rem + .6vw,1.875rem))}
.trust9 .reg-n{background:var(--acc);color:#fff;border:0;padding:.25rem .85rem;font-weight:600}
.trust9 .places li{background:#fff;border-color:color-mix(in srgb,var(--acc) 22%,transparent);padding:.45rem .95rem .45rem .75rem;transition:background .2s ease,color .2s ease}
.trust9 .places li:hover{background:var(--acc);color:#fff}.trust9 .places li:hover svg{color:#fff}
/* faq */
.faq9{background:linear-gradient(180deg,#fff 0,var(--bg) 100%)}
.faq9 .faqx-ph{border-radius:24px;aspect-ratio:4/3}
@media(min-width:950px) and (max-width:1199px){.faq9 .faqx{grid-template-columns:1fr}.faq9 .faqx-l{position:static}}
@media(min-width:1200px){.faq9 .faqx{align-items:start}.faq9 .faqx-l{position:sticky;top:124px;align-self:start}}
.faq9 .faq details{background:#fff;border:1px solid color-mix(in srgb,var(--acc) 14%,transparent)!important;border-radius:18px;padding:0 22px;margin-bottom:12px;transition:box-shadow .25s ease,background .25s ease}
.faq9 .faq details[open]{background:#FFF8F7;box-shadow:0 24px 48px -36px rgba(59,42,46,.6)}
.faq9 .faq summary{padding:20px 0;font-size:1.0625em}
.faq9 .faq summary::after{content:"+";display:grid;place-items:center;flex:none;width:32px;height:32px;border-radius:50%;background:color-mix(in srgb,var(--acc) 10%,#fff);color:var(--acc);font-size:1.25rem;opacity:1;transition:transform .25s ease,background .25s ease}
.faq9 .faq details[open] summary::after{content:"+";transform:rotate(45deg);background:var(--acc);color:#fff}
.faq9 .faq details p{padding-bottom:4px}
.faq-cta{display:flex;align-items:center;justify-content:space-between;gap:12px 16px;margin-top:28px;padding:14px 14px 14px 24px;border-radius:999px;background:#fff;box-shadow:0 24px 48px -36px rgba(59,42,46,.55);max-width:34rem}
.faq-cta .btn{flex:none;min-height:46px;padding:.6rem 1.25rem;white-space:nowrap}
@media(max-width:599px){.faq-cta{gap:8px;padding:6px 6px 6px 16px}.faq-cta p{font-size:.875rem;white-space:nowrap}.faq-cta .btn{min-height:42px;padding:.5rem .85rem;font-size:.875rem;gap:6px}}
@media(max-width:374px){.faq-cta{flex-wrap:wrap;border-radius:22px;padding:14px}.faq-cta p{white-space:normal}}
.faq-cta p{margin:0;font-family:var(--f-head);font-size:1.0625rem;line-height:1.3}
.faq-cta .btn{border-radius:999px;gap:8px}

/* enquire */
#enquire.band{background:radial-gradient(ellipse 60% 70% at 85% 20%,#F7E5E2 0,rgba(247,229,226,0) 70%),var(--blush)}
#enquire .enq-ph{border-radius:24px;aspect-ratio:4/3!important}
#enquire .inc{list-style:none;padding:0}
#enquire .inc li{position:relative;padding-left:34px;margin-bottom:12px}
#enquire .inc li::before{content:"";position:absolute;left:0;top:.2em;width:22px;height:22px;border-radius:50%;background:var(--acc) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8.5l2.5 2.5 5.5-6' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/14px no-repeat}
#enquire .enq{align-items:start}#enquire .enq>div:last-child>form{flex:none}@media(min-width:950px){#enquire .enq>div:last-child{position:sticky;top:110px}}
#enquire form{background:#fff;border-radius:28px;padding:clamp(24px,3vw,40px);box-shadow:0 40px 80px -48px rgba(59,42,46,.6);gap:18px}
@media(min-width:700px){#enquire form{grid-template-columns:1fr 1fr}#enquire form>*{grid-column:1/-1}#enquire form>.field:nth-child(n+2):nth-child(-n+5){grid-column:auto}}
#enquire input,#enquire textarea{border-radius:14px;border:1px solid color-mix(in srgb,var(--ink) 22%,transparent);background:#FFFCFB;transition:border-color .2s ease,box-shadow .2s ease}
#enquire input:focus,#enquire textarea:focus{outline:none;border-color:var(--acc);box-shadow:0 0 0 4px color-mix(in srgb,var(--acc) 16%,transparent)}
#enquire form .btn{width:100%;border-radius:999px;min-height:54px;font-size:1.0625rem;box-shadow:0 14px 28px -14px rgba(115,59,73,.9)}
/* footer */
.ft9{background:var(--plum);color:#F6E6E8;border-top:0}
.ft9 .ft-wm{color:#fff}
.ft9 .ft-h{color:#F2C9D0;opacity:1}
.ft9 .ft-sub,.ft9 .note{opacity:.85}
.ft9 .ft-btn{background:#fff!important;color:var(--acc)!important;border-radius:999px}
.ft9 .soc a,.ft9 .soc button{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2)}
.ft9 .soc a:hover,.ft9 .soc button:hover{background:#fff;color:var(--plum)}
.ft9 .ls{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:3px;display:inline-flex}
.ft9 .ls .ls-l{display:none}.ft9 .ls button{border:0}
.ft9 .ls button[aria-pressed=true]{background:#fff;color:var(--plum)}
.ft9 .ft-base{border-top-color:rgba(255,255,255,.12)}


.trust9 .t-ic{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;border:1.5px solid var(--acc);color:var(--acc);margin-bottom:18px}
.trust9 .travel h3{margin-bottom:.3em}
.trust9 .t-lede{margin:0 0 6px}
.trust9 .t-foot{margin:auto 0 0;padding-top:16px;border-top:1px solid color-mix(in srgb,var(--ink) 12%,transparent);font-size:.9375rem;display:flex;flex-wrap:wrap;gap:4px 12px;justify-content:space-between}
.trust9 .travel{display:flex;flex-direction:column}
.trust9 .cred{align-content:start}
.fm-h{grid-column:1/-1;padding-bottom:18px;margin-bottom:4px;border-bottom:1px solid color-mix(in srgb,var(--acc) 16%,transparent)}
.fm-h h3{font-size:calc(var(--hs)*clamp(1.5rem,1.25rem + .6vw,1.875rem));margin:0 0 .3em}
.fm-h p{margin:0;font-size:.9375rem;opacity:.85}
/* polished build: pending-content flags stay in the source but are not shown */
.flag{display:none!important}
/* review-only signature switch */
.sigpick{position:fixed;z-index:30;right:12px;bottom:12px;display:flex;gap:4px;align-items:center;font:500 12px/1.2 "Source Sans 3",system-ui,sans-serif;background:#1d1b1c;color:#f4f1ee;padding:6px 8px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.25)}
.sigpick button{font:inherit;color:inherit;background:none;border:1px solid transparent;border-radius:999px;padding:4px 9px;cursor:pointer}
.sigpick button[aria-pressed=true]{border-color:#f4f1ee}
`,
  body: () => `<div class="hero">${ph('phCeremony', 'kb', 'sunbright', true)}${head9()}
<div class="in hero-c"><div class="rise">${T('p', 'heroEyebrow', 'class="eb"')}<p class="hero-acc" aria-hidden="true"><span data-i="big1">${txt('big1')}</span> <span data-i="big2">${txt('big2')}</span></p>${T('h1', 'h1t')}${T('p', 'intro', 'class="lede"')}</div>
<form class="chooser ch9" id="chooser" onsubmit="return false" aria-labelledby="ch-h"><div class="ch-top"><p id="ch-h" class="ch-h" data-i="chooseH">${txt('chooseH')}</p><p class="cn" data-i="chooseNote">${txt('chooseNote')}</p></div><fieldset class="ch-f"><legend><span class="ch-n" aria-hidden="true">1</span><span data-i="chooseLang">${txt('chooseLang')}</span></legend><div class="pills">${[0, 1, 2].map((i) => `<label><input type="checkbox" name="lg" value="${i}"${i === 0 ? ' checked' : ''}><span><svg class="ck" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><b data-i="langChips.${i}">${txt(`langChips.${i}`)}</b></span></label>`).join('')}</div></fieldset><div class="ch-f"><label class="lb" for="area"><span class="ch-n" aria-hidden="true">2</span><span data-i="chooseArea">${txt('chooseArea')}</span></label><div class="sel">${pin}<select id="area">${[0, 1, 2, 3, 4, 5].map((i) => `<option value="${i}" data-i="areas.${i}">${txt(`areas.${i}`)}</option>`).join('')}</select></div></div><button class="btn ch-go" type="button" id="go"><span data-i="chGo">${txt('chGo')}</span><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 10h11m-4-4.5L15.5 10 11 14.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></form></div></div>
${socPops()}
<main id="main">
<section class="offer9" id="ceremonies"><div class="in"><div class="sec-h rv">${B.eb('svcEb')}${T('h2', 'svcH')}${T('p', 'intro2', 'class="sec-l"')}</div>
<div class="cards9">${[['hands', IC.rings, 'services.0.h', 'cardP.0', '#enquire', ''], ['parkback', pin.replace('width="16" height="16"', 'width="20" height="20"'), 'travelH', 'cardP.1', '#travel', ''], ['vows', IC.talk, 'nav.3', 'cardP.2', '#faq', ' id="languages"']].map(([img, ic, h, p, href, id], i) => `<article class="c9 rv"${id}><a class="c9-img" href="${href}" tabindex="-1" aria-hidden="true">${ph('phDetail', '', img)}<span class="c9-n">0${i + 1}</span></a><div class="c9-b"><span class="c9-ic">${ic}</span>${T('h3', h)}${T('p', p)}<a class="c9-l" href="${href}"><span data-i="cardLink.${i}">${txt(`cardLink.${i}`)}</span>${IC.arrow}</a></div></article>`).join('')}</div></div></section>
<section class="about9" id="approach"><div class="in ab-g"><div class="ab-pic rv"><div class="ab-frame">${ph('phPortrait', '', 'peonies')}</div>${T('p', 'heroFacts.0', 'class="ab-badge"')}</div>
<div class="ab-t rv">${B.eb('aboutEb')}${T('h2', 'aboutH', 'class="ab-h"')}${T('p', 'about.0', 'class="ab-lede"')}${[1, 2].map((i) => T('p', `about.${i}`)).join('')}
<details class="more" id="about-more"><summary><span data-i="aboutMore">${txt('aboutMore')}</span>${IC.plus}</summary><div class="more-b">${T('h3', 'aboutWhyH')}${[0, 1].map((i) => T('p', `aboutWhy.${i}`)).join('')}${T('h3', 'aboutYoursH')}${[0, 1].map((i) => T('p', `aboutYours.${i}`)).join('')}<button type="button" class="less" onclick="var d=this.closest('details');d.open=false;d.scrollIntoView({block:'center',behavior:'smooth'})"><span data-i="aboutLess">${txt('aboutLess')}</span>${IC.minus}</button></div></details>
<p class="ab-sig" lang="en" aria-hidden="true">Van</p></div></div></section>
<section class="testi9" id="kind-words"><div class="in"><div class="testi-h rv">${B.eb('testiEb')}${T('h2', 'testiH')}</div>
<ul class="tq">${DICT_TESTI().map((_, i) => `<li class="rv"><blockquote><div class="stars" role="img" aria-label="5 out of 5"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg></div><p class="rate" data-i="testiRate">${txt('testiRate')}</p>${testiQ9(i)}<footer data-i="testiAttr">${txt('testiAttr')}</footer></blockquote></li>`).join('')}</ul></div></section>
<section class="trust9"><div class="in two">${cred9()}${travel9()}</div></section>
<section class="faq9"><div class="in"><div class="faqx" id="faq"><div class="faqx-l"><p class="sec-eb" data-i="secQuestions">${txt('secQuestions')}</p>${T('h2', 'faqH')}${T('p', 'faqIntro')}<div class="faq-cta"><p data-i="faqMore">${txt('faqMore')}</p><a class="btn" href="#enquire"><span data-i="faqCta">${txt('faqCta')}</span>${IC.arrow}</a></div></div><div class="faq">${[0, 1, 2, 3, 4, 5].map((i) => `<details${i === 0 ? ' open' : ''}><summary data-i="faq.${i}.0">${txt(`faq.${i}.0`)}</summary>${T('p', `faq.${i}.1`)}</details>`).join('')}</div></div></div></section>
<section class="band" id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('d').replace('aria-describedby="d-priv">', `aria-describedby="d-priv" aria-labelledby="fm-h"><div class="fm-h"><h3 id="fm-h" data-i="formH">${txt('formH')}</h3>${T('p', 'formP')}</div>`)}</div></div></section>
</main>${foot9()}
<!-- signature styles: preview with ?sig=b|c|d (a = Corinthia, default) -->
<script>
document.getElementById('go').addEventListener('click',function(){
  var names=[].map.call(document.querySelectorAll('#chooser input[name=lg]:checked'),function(i){return i.nextElementSibling.textContent;});
  var sep=document.documentElement.lang.indexOf('zh')===0?'、':', ';
  var a=document.getElementById('area');
  var l=document.getElementById('d4'),v=document.getElementById('d3');
  if(names.length)l.value=names.join(sep);if(a.selectedIndex<5)v.value=a.options[a.selectedIndex].textContent;
  document.getElementById('enquire').scrollIntoView({behavior:'smooth'});
  setTimeout(function(){document.getElementById('d0').focus({preventScroll:true});[l,v].forEach(function(x){x.classList.remove('flash');void x.offsetWidth;x.classList.add('flash');});},600);
});
document.addEventListener('click',function(e){var c=e.target.closest('[data-copy]');if(!c)return;var t=c.textContent;
  (navigator.clipboard?navigator.clipboard.writeText(c.getAttribute('data-copy')):Promise.reject()).then(function(){var d=document.documentElement.lang.indexOf('zh')===0?(document.documentElement.lang==='zh-Hans'?'已复制':'已複製'):'Copied';c.textContent=d;setTimeout(function(){c.textContent=t;},1600);},function(){});});
(function(){var r=document.documentElement,q=new URLSearchParams(location.search).get('sig');
function s(k){if(!/^[abcd]$/.test(k))k='a';if(k==='a')r.removeAttribute('data-sig');else r.setAttribute('data-sig',k);document.querySelectorAll('.sigpick [data-sig]').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-sig')===k?'true':'false');});
var u=new URL(location.href);if(k==='a')u.searchParams.delete('sig');else u.searchParams.set('sig',k);history.replaceState(null,'',u);}
if(q)s(q);})();
(function(){var h=document.querySelector('.hero .hd');if(!h)return;function f(){h.classList.toggle('stuck',scrollY>60);}addEventListener('scroll',f,{passive:true});f();})();
</script>`,
});

const EXTRA = {
  Estate: `@media(max-width:599px){.ribbon{font-size:.75rem;line-height:1.45}}.hero h1{text-shadow:0 2px 40px rgba(0,0,0,.28)}.hero .eb{display:flex;align-items:center;gap:12px}.hero .eb::before{content:"";width:36px;height:1px;background:#fff}`,
  Panorama: `.pano-w{padding-top:24px}.pano{border-radius:6px;height:clamp(20rem,50vw,40rem)}.lead .facts li{border-color:rgba(122,62,78,.3)}.lead .fd{background:var(--acc)}`,
  Statement: `.card-w{padding-top:8px}.card{margin:0!important}.card-f{position:absolute;z-index:1;left:clamp(16px,3vw,40px);right:clamp(16px,3vw,40px);bottom:clamp(16px,3vw,40px);margin:0}`,
  Planner: `.hero .eb{font-size:.8125rem;font-weight:600;letter-spacing:.24em;text-transform:uppercase;margin:0 0 16px;opacity:.95}:lang(zh) .hero .eb{letter-spacing:.1em;text-transform:none;font-weight:400;font-size:.9375rem}.hero-c{padding-block:72px 96px}.hero h1{text-shadow:0 2px 30px rgba(0,0,0,.3)}`,
  Cinematic: `.hero .facts{margin-top:36px}`,
  Horizon: `.land{border-radius:4px}@media(max-width:600px){.disp{font-size:calc(var(--hs)*2.9rem);padding-inline:16px}}.lead .fd{background:var(--rose)}`,
  Gallery: `.show{border-radius:4px}.show-cap{position:absolute;z-index:3;left:clamp(16px,2.5vw,32px);right:clamp(16px,2.5vw,32px);bottom:clamp(16px,2.5vw,32px)}.show-cap .facts{margin:0}.show::after{content:"";position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(0,0,0,0) 55%,rgba(0,0,0,.45));pointer-events:none}`,
  Journal: `@media(max-width:599px){.mast .bn{font-size:clamp(2.25rem,1rem + 7vw,3rem)}.mast{padding-block:0 10px}.util{padding-block:8px}}.tile .lab{overflow-wrap:anywhere}.t-feat .facts li{border-color:rgba(110,31,46,.3)}.t-feat .fd{background:var(--acc)}`,
};
EXTRA['Planner × Cinematic'] = EXTRA.Planner; // Home-09 inherits Concept 04's finishing rules
const gutter = G;
// ───────────────────────── Privacy notice (shared) ─────────────────────────
const privacy = page({
  n: 0, name: 'Privacy notice',
  fonts: { head: { pkg: 'literata', weight: 500, zhAdjust: 1.0 }, ...serifTC, zhHeadW: 500, zhBodyW: 400 },
  css: `
:root{--bg:#FBF3F1;--paper:#FFFCFB;--ink:#3B2A2E;--rose:#8E4A5A;--muted:#5E464C;--line:rgba(59,42,46,.16)}
body{background:var(--bg);color:var(--ink)}
.hd-in{max-width:52rem;margin:0 auto;${gutter};display:flex;justify-content:space-between;align-items:center;gap:12px;padding-block:20px}
.brand{display:grid;text-decoration:none;color:var(--ink)}.bn{font-family:var(--f-head);font-weight:500;font-size:1.375rem;white-space:nowrap}.bs{font-size:.8125rem;color:var(--muted);white-space:nowrap}
.hd-r{display:flex;align-items:center;gap:6px}.nav-m{display:none!important}
main{max-width:52rem;margin:0 auto;${gutter};padding-block:16px 96px}
.paper{background:var(--paper);padding:clamp(24px,5vw,64px);box-shadow:0 1px 0 var(--line),0 24px 48px -32px rgba(59,42,46,.25)}
.note{display:inline-block;font-size:.8125rem;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:.15rem .7rem;margin-bottom:18px}
h1{font-size:calc(var(--hs)*clamp(2.25rem,1.6rem + 2vw,3rem));line-height:var(--lh-h)}
.lede{font-size:1.125em;line-height:1.6}:lang(zh) .lede{font-size:1.0625em;line-height:1.8}
h2{font-size:calc(var(--hs)*1.5rem);margin-top:1.8em}
.upd{color:var(--muted);font-size:.9375rem;margin-top:40px;border-top:1px solid var(--line);padding-top:16px}
a{color:var(--rose)}
`,
  body: `<header class="hd"><div class="hd-in">${brand()}<div class="hd-r">${langSwitch()}</div></div></header>
<main id="main"><p><a href="index.html" onclick="if(document.referrer&&history.length>1){history.back();return false}" data-i="pv.back">${txt('pv.back')}</a></p><article class="paper">
${T('p', 'pv.note', 'class="note"')}${T('h1', 'pv.title')}${T('p', 'pv.intro', 'class="lede"')}
${[0, 1, 2, 3, 4, 5].map((i) => `${T('h2', `pv.s.${i}.0`)}${T('p', `pv.s.${i}.1`)}`).join('\n')}
${T('p', 'pv.updated', 'class="upd"')}</article></main>`,
});
fs.writeFileSync(path.join(ROOT, 'privacy.html'), privacy);

designs.forEach((d, i) => {
  const n = i + 1;
  const html = page({ n, name: d.name, fonts: d.fonts, css: d.css + (EXTRA[d.name] || ''), body: d.body(), ...(n === 9 ? { title: 'docTitle', bare: true } : {}) });
  fs.writeFileSync(path.join(ROOT, `Home-${String(n).padStart(2, '0')}.html`), html);
  if (n === 9) fs.writeFileSync(path.join(ROOT, 'index.html'), html); // site root = Van's chosen direction (Round 2)
});
export { designs };
console.log('wrote', designs.length, 'homes');
