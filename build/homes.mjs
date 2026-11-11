// Round 2: eight bolder, original homepage designs -> /Home-01.html … /Home-08.html
// Each borrows ONE general design pattern from a leading NZ wedding site (see REFS).
// Layout, copy, images and branding are original to Van; nothing is copied from the reference sites.
// Run: node build/homes.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, T, txt, page, navList, langSwitch, mobileNav, brand, form, incList, chips, ph, faq } from './homes-core.mjs';

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
const foot = () => `<footer class="ft"><div class="ft-in"><div><p class="bn" lang="en">Vannarady Ng</p>${T('p', 'footNote')}<p>${T('span', 'footContact')} · <a href="privacy.html" data-i="privacyLink">${txt('privacyLink')}</a></p></div><div>${langSwitch()}${T('p', 'copyright', 'class="note"')}</div></div></footer>`;
const DIA = 'href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener"';
const B = {
  approach: () => `${T('h2', 'approachH')}${T('p', 'approach1')}${T('p', 'approach2')}`,
  quote: () => `<blockquote class="q">${T('p', 'quote')}<footer data-i="quoteBy">${txt('quoteBy')}</footer></blockquote>`,
  services: () => [0, 1].map((i) => `<article class="svc rv">${T('h3', `services.${i}.h`)}${T('p', `services.${i}.p`)}</article>`).join(''),
  langs: () => `${T('h2', 'langH')}${T('p', 'lang1')}${chips()}`,
  cred: () => `<div class="rv">${T('h3', 'credH')}${T('p', 'cred')}<a class="tl" ${DIA} data-i="credLink">${txt('credLink')}</a></div>`,
  travel: () => `<div class="rv">${T('h3', 'travelH')}${T('p', 'travel')}</div>`,
  enq: () => `${T('h2', 'enqH')}${T('p', 'enq1')}${incList()}${T('p', 'enq2')}${T('p', 'enqNote', 'class="note"')}`,
  ctas: () => `<div class="btns"><a class="btn" href="#enquire" data-i="cta">${txt('cta')}</a><a class="tl" href="#approach" data-i="cta2">${txt('cta2')}</a></div>`,
  langLink: () => `<a class="tl" href="#faq" data-i="langLink">${txt('langLink')}</a>`,
};
const base = (o = {}) => `
:root{--r:${o.r || '4px'}}
body{background:var(--bg);color:var(--ink)}
.in{max-width:${o.w || '76rem'};margin:0 auto;${G}}@media(min-width:900px){.in{${GD}}}
.hd-in{max-width:${o.w || '76rem'};margin:0 auto;${G};display:flex;align-items:center;justify-content:space-between;gap:14px;padding-block:18px}@media(min-width:900px){.hd-in{${GD}}}
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
.ft{padding-block:48px 64px;border-top:1px solid color-mix(in srgb,currentColor 15%,transparent)}.ft-in{max-width:${o.w || '76rem'};margin:0 auto;${G};display:grid;gap:16px}@media(min-width:800px){.ft-in{${GD};grid-template-columns:2fr 1fr}}.ft .bn{font-size:1.75rem;margin:0 0 8px}.ft p{margin:0 0 6px}
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
.hero>.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(30,20,22,.6) 0%,rgba(30,20,22,0) 30%,rgba(30,20,22,0) 42%,rgba(30,20,22,.75) 100%)}
.hero>.ph .badge{left:auto;right:12px;bottom:12px}
.hero .hd{position:absolute;top:0;left:0;right:0;z-index:3;color:#fff}
.btn-q{display:none!important}@media(min-width:900px){.btn-q{display:inline-flex!important;min-height:2.5rem!important;padding:.4rem 1.2rem!important;background:#fff!important;color:var(--cocoa)!important;border-radius:999px!important;margin-left:8px}}
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
<div class="hero">${ph('phCeremony', '', 'lawn', true)}
<header class="hd"><div class="hd-in">${brand()}<nav class="nav-d" aria-label="Main">${navList()}</nav><div class="hd-r">${langSwitch()}<a class="btn btn-q" href="#enquire" data-i="cta">${txt('cta')}</a>${mobileNav()}</div></div></header>
<div class="in hero-c">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${B.ctas()}</div></div>
<main id="main">
<div class="in"><div class="pillars"><div class="rv">${T('h3', 'langH')}${chips()}</div>${B.travel()}${B.cred()}</div></div>
<section id="approach"><div class="in split"><div class="rv">${B.approach()}${T('p', 'intro2')}</div>${ph('phPortrait', 'rv', 'peonies')}</div></section>
<section class="qwrap">${ph('phDetail', '', 'candles', false, '100vw')}<div class="in">${B.quote()}</div></section>
<section class="band"><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div><div style="margin-top:56px;max-width:40rem" class="rv">${T('p', 'lang1')}${B.langLink()}</div></div></section>
<section><div class="in" style="max-width:60rem">${faq()}</div></section>
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
${ph('phCeremony', 'pano', 'lake', true)}
<div class="in lead">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${B.ctas()}</div>
<div class="strip" role="region" aria-label="Gallery" tabindex="0">${ph('phDetail', '', 'hands')}${ph('phDetail', '', 'park')}${ph('phDetail', '', 'bouquet')}${ph('phDetail', '', 'vows')}${ph('phDetail', '', 'alps')}${ph('phDetail', '', 'table')}</div>
<section id="approach"><div class="in cols"><div class="rv">${B.approach()}</div><div class="rv">${B.langs()}${B.langLink()}</div><div>${B.cred()}<div style="height:28px"></div>${B.travel()}</div></div></section>
<section class="soft qc"><div class="in">${B.quote()}</div></section>
<section><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div></div></section>
<section class="soft"><div class="in" style="max-width:60rem">${faq()}</div></section>
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
<div class="card">${ph('phCeremony', '', 'pier', true)}<p class="big" aria-hidden="true"><span data-i="big1">${txt('big1')}</span><span data-i="big2">${txt('big2')}</span></p></div>
<main id="main">
<div class="in intro">${T('h1', 'h1')}<div>${T('p', 'intro')}${B.ctas()}</div></div>
<div class="marq" aria-hidden="true"><div>${Array(8).fill([0, 1, 2].map((i) => `<span data-i="langChips.${i}">${txt(`langChips.${i}`)}</span>`).join('')).join('')}</div></div>
<section id="approach"><div class="in split"><div class="rv">${B.approach()}${T('p', 'intro2')}</div>${ph('phPortrait', 'rv', 'bouquet')}</div></section>
<section style="padding-top:0"><div class="in"><div class="qb rv">${B.quote()}</div></div></section>
<section style="padding-top:0"><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div></div></section>
<section style="padding-top:0"><div class="in two"><div class="rv">${B.langs()}${B.langLink()}</div><div>${B.cred()}<div style="height:24px"></div>${B.travel()}</div></div></section>
<section style="padding-top:0"><div class="in" style="max-width:60rem">${faq()}</div></section>
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
  body: () => `<div class="hero">${ph('phCeremony', '', 'officiant', true)}${head()}
<div class="in hero-c">${T('h1', 'h1')}${T('p', 'intro', 'class="lede"')}
<form class="chooser" id="chooser" onsubmit="return false" aria-labelledby="ch-h"><p id="ch-h" class="ch-h" data-i="chooseH">${txt('chooseH')}</p>
<fieldset><legend data-i="chooseLang">${txt('chooseLang')}</legend><div class="pills">${[0, 1, 2].map((i) => `<label><input type="checkbox" name="lg" value="${i}"${i === 0 ? ' checked' : ''}><span data-i="langChips.${i}">${txt(`langChips.${i}`)}</span></label>`).join('')}</div></fieldset>
<div><label class="lb" for="area" data-i="chooseArea">${txt('chooseArea')}</label><select id="area">${[0, 1, 2, 3, 4, 5].map((i) => `<option value="${i}" data-i="areas.${i}">${txt(`areas.${i}`)}</option>`).join('')}</select></div>
<button class="btn" type="button" id="go" data-i="chooseBtn">${txt('chooseBtn')}</button>
<p class="cn" data-i="chooseNote">${txt('chooseNote')}</p></form></div></div>
<main id="main">
<section><div class="in cards">
<article class="rv">${ph('phDetail', '', 'hands')}<div class="tx">${T('h3', 'services.0.h')}${T('p', 'services.0.p')}</div></article>
<article class="rv">${ph('phDetail', '', 'parkback')}<div class="tx">${T('h3', 'services.1.h')}${T('p', 'services.1.p')}</div></article>
<article class="rv">${ph('phDetail', '', 'vows')}<div class="tx">${T('h3', 'nav.3')}${T('p', 'lang1')}</div></article>
</div></section>
<section class="band" id="approach"><div class="in split">${ph('phPortrait', 'rv', 'peonies')}<div class="rv">${B.approach()}${B.quote()}</div></div></section>
<section><div class="in two">${B.cred()}${B.travel()}</div></section>
<section style="padding-top:0"><div class="in" style="max-width:60rem">${faq()}</div></section>
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
  body: () => `<div class="hero">${ph('phCeremony', '', 'veil', true)}${head()}
<div class="in hero-c"><p class="cine it" data-i="approachH">${txt('approachH')}</p>${T('h1', 'h1')}${B.ctas()}</div><span class="cue" aria-hidden="true" data-i="scroll">${txt('scroll')}</span></div>
<main id="main">
<section class="intro"><div class="in rv"><span class="it" lang="en">Vannarady Ng</span>${T('p', 'intro')}${T('p', 'intro2')}</div></section>
<section id="approach" style="padding-top:0"><div class="in">
<div class="zig">${ph('phPortrait', 'rv', 'bloom')}<div class="rv"><h2><span class="it" data-i="services.0.h">${txt('services.0.h')}</span></h2>${T('p', 'approach1')}${T('p', 'approach2')}</div></div>
<div class="zig rev">${ph('phDetail', 'rv', 'table')}<div class="rv"><h2><span class="it" data-i="nav.3">${txt('nav.3')}</span></h2>${T('p', 'lang1')}${chips()}${B.langLink()}</div></div>
</div></section>
<section class="mocha"><div class="in">${B.quote()}</div></section>
<section><div class="in">${T('h2', 'servicesH', 'style="text-align:center"')}<div class="svcs">${B.services()}</div><div class="two" style="margin-top:56px">${B.cred()}${B.travel()}</div></div></section>
<section class="peony"><div class="in" style="max-width:60rem">${faq()}</div></section>
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
<p class="disp" aria-hidden="true"><span data-i="big1">${txt('big1')}</span><em data-i="big2">${txt('big2')}</em></p>
<div class="in stage">${ph('phCeremony', 'land', 'alps', true)}${ph('phDetail', 'inset', 'hands', false, '(min-width: 900px) 22rem, 40vw')}</div>
<div class="in lead">${T('h1', 'h1')}<div>${T('p', 'intro', 'class="lede"')}${T('p', 'intro2')}${B.ctas()}</div></div>
<section id="approach"><div class="in split">${ph('phPortrait', 'rv', 'bouquet')}<div class="rv">${B.approach()}${B.langs()}${B.langLink()}</div></div></section>
<section class="soft"><div class="in">${B.quote()}</div></section>
<section><div class="in">${T('h2', 'servicesH', 'style="text-align:center"')}<div class="svcs">${B.services()}</div><div class="two" style="margin-top:56px">${B.cred()}${B.travel()}</div></div></section>
<section class="soft"><div class="in" style="max-width:60rem">${faq()}</div></section>
<section id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('f')}</div></div></section>
</main>${foot()}`,
});

// ── 07 · Gallery — centred wordmark, split nav, crossfading slideshow ──
designs.push({
  name: 'Gallery', ref: 6, fonts: { head: { pkg: 'cormorant-garamond', weight: 600, zhAdjust: 1.16 }, ...serifTC, zhHeadW: 600, zhBodyW: 400 },
  css: base({ w: '80rem', r: '0' }) + `
:root{--bg:#FFFFFF;--ink:#2F2A2B;--soft:#FAF3F2;--acc:#7A3E4E;--acc-d:#5F2F3C;--on-acc:#fff;--rose:#7A3E4E}
.hd-c{max-width:80rem;margin:0 auto;${G};display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;padding-block:22px 8px}
@media(min-width:900px){.hd-c{${GD}}}
.hd-c .brand{grid-column:2;text-align:center;justify-items:center}.hd-c .bn{font-size:2.25rem;letter-spacing:.04em;color:var(--rose)}
.hd-c .bs{text-transform:uppercase;letter-spacing:.24em;font-size:.6875rem}:lang(zh) .hd-c .bs{letter-spacing:.1em;font-size:.8125rem}
.nl,.nr{list-style:none;margin:0;padding:0;display:none;gap:24px}.nr{justify-content:flex-end}
@media(min-width:1000px){.nl,.nr{display:flex}.hd-c .nav-m{display:none!important}}
.nl a,.nr a{color:inherit;text-decoration:none;font-size:.75rem;letter-spacing:.18em;text-transform:uppercase}:lang(zh) .nl a,:lang(zh) .nr a{letter-spacing:.08em;font-size:.875rem}
.nl a:hover,.nr a:hover{color:var(--rose)}
.lsrow{display:flex;justify-content:center;padding-bottom:14px}
@media(max-width:999px){.hd-c{grid-template-columns:1fr auto}.hd-c .brand{grid-column:1;text-align:left;justify-items:start}.lsrow{justify-content:flex-start;${G}}.hd-c .bn{font-size:1.75rem}}
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
<div class="show">${ph('phCeremony', '', 'arch', true)}${ph('phCeremony', '', 'lawn', false, '100vw')}${ph('phCeremony', '', 'table', false, '100vw')}</div>
<div class="in tag">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${B.ctas()}</div>
<div class="in trio">${ph('phDetail', 'rv', 'peonies')}${ph('phDetail', 'rv', 'hands')}${ph('phDetail', 'rv', 'vows')}</div>
<section id="approach"><div class="in cent rv" style="max-width:56rem">${B.approach()}${T('p', 'intro2')}</div></section>
<section class="soft cent"><div class="in">${B.quote()}</div></section>
<section><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div></div></section>
<section class="soft"><div class="in cent rv" style="max-width:56rem">${B.langs()}${B.langLink()}<div class="two" style="margin-top:48px;text-align:left">${B.cred()}${B.travel()}</div></div></section>
<section><div class="in" style="max-width:60rem">${faq()}</div></section>
<section class="soft" id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('g')}</div></div></section>
</main>${foot()}`;
  },
});

// ── 08 · Journal — magazine masthead and image tiles ──
designs.push({
  name: 'Journal', ref: 7, fonts: { head: { pkg: 'source-serif-4', weight: 600, zhAdjust: 1.03 }, ...serifTC, zhHeadW: 600, zhBodyW: 400 },
  css: base({ w: '84rem', r: '0' }) + `
:root{--bg:#F6EEEC;--ink:#2E2A2B;--bur:#6E1F2E;--acc:#8E1B24;--acc-d:#6E1F2E;--on-acc:#FBF7F2;--paper:#FBF7F2}
.util{max-width:84rem;margin:0 auto;${G};display:flex;justify-content:space-between;align-items:center;gap:12px;padding-block:12px;font-size:.8125rem}
@media(min-width:900px){.util{${GD}}}
@media(max-width:899px){.util>span{display:none}}
.mast{text-align:center;padding-block:4px 16px}
.mast .brand{color:var(--bur);justify-items:center}
.mast .bn{font-weight:600;font-size:clamp(2.75rem,.8rem + 8vw,8.5rem);line-height:.95;letter-spacing:-.02em}
.mast .bs{font-size:.8125rem;letter-spacing:.24em;text-transform:uppercase;margin-top:10px;color:var(--ink)}:lang(zh) .mast .bs{letter-spacing:.1em;font-size:.9375rem}
.navrow{border-block:1px solid var(--ink);max-width:calc(84rem - 96px);margin:0 auto}
.navrow ul{display:flex;justify-content:center;flex-wrap:wrap;gap:4px 32px;list-style:none;margin:0;padding:12px 16px}
.navrow a{color:inherit;text-decoration:none;font-size:.8125rem;text-transform:uppercase;letter-spacing:.16em}:lang(zh) .navrow a{letter-spacing:.06em;font-size:.9375rem}
.navrow a:hover{color:var(--bur)}
@media(max-width:899px){.navrow{display:block!important;margin-inline:16px}.navrow ul{justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;gap:24px}.util .nav-m{display:none}}
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
<div class="mast">${brand()}</div><nav class="navrow nav-d" aria-label="Main">${navList()}</nav></header>
<main id="main"><div class="in">
<div class="tiles">
<div class="tile t-feat">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${B.ctas()}</div>
<a class="tile t-a" href="#approach">${ph('phPortrait', '', 'bouquet', true)}<span class="lab" data-i="nav.1">${txt('nav.1')}</span></a>
<a class="tile" href="#ceremonies">${ph('phDetail', '', 'hands', true)}<span class="lab" data-i="services.0.h">${txt('services.0.h')}</span></a>
<a class="tile" href="#ceremonies">${ph('phDetail', '', 'pier')}<span class="lab" data-i="services.1.h">${txt('services.1.h')}</span></a>
<a class="tile" href="#languages">${ph('phDetail', '', 'vows')}<span class="lab" data-i="nav.3">${txt('nav.3')}</span></a>
<a class="tile" href="#faq">${ph('phDetail', '', 'candles')}<span class="lab" data-i="nav.4">${txt('nav.4')}</span></a>
</div></div>
<section id="approach"><div class="in">${T('h2', 'approachH')}<div class="cols rv">${T('p', 'approach1', 'class="dropcap"')}${T('p', 'approach2')}${T('p', 'intro2')}${T('p', 'lang1')}</div></div></section>
<section style="padding-top:0"><div class="in"><div class="pull rv">${B.quote()}</div></div></section>
<section style="padding-top:0"><div class="in">${T('h2', 'servicesH')}<div class="svcs">${B.services()}</div><div class="two" style="margin-top:48px"><div class="rv">${T('h3', 'langH')}${chips()}${B.langLink()}</div><div>${B.cred()}<div style="height:24px"></div>${B.travel()}</div></div></div></section>
<section class="paper"><div class="in" style="max-width:60rem">${faq()}</div></section>
<section id="enquire"><div class="in enq"><div>${B.enq()}</div><div>${form('h')}</div></div></section>
</main>${foot()}`,
});

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
  fs.writeFileSync(path.join(ROOT, `Home-${String(n).padStart(2, '0')}.html`), page({ n, name: d.name, fonts: d.fonts, css: d.css, body: d.body() }));
});
export { designs };
console.log('wrote', designs.length, 'homes');
