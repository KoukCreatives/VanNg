// Eight distinct homepage designs -> /Home-01.html … /Home-08.html
// Run: node build/homes.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, T, Z, txt, page, navList, langSwitch, mobileNav, brand, form, incList, chips, ph, faq } from './homes-core.mjs';

const serifTC = { zhHead: 'noto-serif-tc', zhBody: 'noto-sans-tc' };
const sprig = (cls) => `<svg class="${cls}" viewBox="0 0 200 160" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" aria-hidden="true"><path d="M10 150C60 120 100 80 190 10"/><path d="M60 118c-6-18 4-34 22-38-2 18-10 32-22 38z"/><path d="M95 88c14-12 32-12 44-2-14 10-30 12-44 2z"/><path d="M118 62c-4-20 8-36 26-38 0 18-10 32-26 38z"/><path d="M150 36c12-8 26-6 34 2-12 8-24 8-34-2z"/><circle cx="40" cy="132" r="5"/><circle cx="172" cy="16" r="4"/></svg>`;
const gutter = 'padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))';
const gutterD = 'padding-left:max(40px,env(safe-area-inset-left,0px));padding-right:max(40px,env(safe-area-inset-right,0px))';
const head = (cls = '') => `<header class="hd ${cls}"><div class="hd-in">${brand()}<nav class="nav-d" aria-label="Main">${navList()}</nav><div class="hd-r">${langSwitch()}${mobileNav()}</div></div></header>`;
const foot = () => `<footer class="ft"><div class="ft-in"><div><p class="bn" lang="en">Vannarady Ng</p>${T('p', 'footNote')}<p>${T('span', 'footContact')} · <a href="privacy.html" data-i="privacyLink">${txt('privacyLink')}</a></p></div><div>${langSwitch()}${T('p', 'copyright', 'class="note"')}</div></div></footer>`;

const designs = [];

// ───────────────────────── 01 · Petal Invitation ─────────────────────────
designs.push({
  name: 'Petal Invitation', fonts: { head: { pkg: 'cormorant-garamond', weight: 600, zhAdjust: 1.16 }, ...serifTC, zhHeadW: 600, zhBodyW: 400 },
  css: `
:root{--bg:#FBF3F1;--band:#F3DEDA;--ink:#3B2A2E;--rose:#8E4A5A;--rose-d:#733B49;--muted:#5E464C;--champ:#C9AE82;--card:#FFFDFC;--r:4px}
body{background:var(--bg);color:var(--ink)}
.in{max-width:72rem;margin:0 auto;${gutter}}@media(min-width:900px){.in{${gutterD}}}
.hd{background:var(--bg)}.hd-in{max-width:72rem;margin:0 auto;${gutter};display:grid;grid-template-columns:1fr auto;align-items:center;gap:12px;padding-block:18px}
@media(min-width:900px){.hd-in{${gutterD};grid-template-columns:1fr auto 1fr}.hd-in .brand{grid-column:2;text-align:center;justify-items:center}.hd-in .nav-d{grid-column:1/-1;grid-row:2;justify-self:center}.hd-in .hd-r{grid-column:3;grid-row:1;justify-self:end}}
.brand{display:grid;text-decoration:none;color:var(--ink)}.bn{font-family:var(--f-head);font-weight:600;font-size:1.5rem;line-height:1.1;white-space:nowrap}@media(min-width:900px){.brand .bn{font-size:2rem}}
.bs{font-size:.8125rem;letter-spacing:var(--track);color:var(--muted);white-space:nowrap}
.nav-d ul{display:flex;gap:28px;list-style:none;margin:6px 0 0;padding:0}.nav-d a{color:var(--ink);text-decoration:none;font-size:.9375rem}.nav-d a[aria-current]{color:var(--rose);text-decoration:underline}
.hd-r{display:flex;gap:6px;align-items:center}.nav-m ul{background:var(--card)}
.btn{display:inline-flex;align-items:center;min-height:3rem;padding:.7rem 1.6rem;background:var(--rose);color:#fff;border:0;border-radius:999px;font:inherit;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer}.btn:hover{background:var(--rose-d)}
.tl{color:var(--rose);font-weight:600}
.hero{padding-block:24px 72px}
.hero-g{display:grid;gap:28px;align-items:center}
@media(min-width:900px){.hero-g{grid-template-columns:7fr 5fr;gap:0}.arch{margin-left:-48px}}
.card{position:relative;z-index:1;background:var(--card);padding:clamp(28px,5vw,64px);text-align:center;outline:1px solid var(--rose);outline-offset:-10px;box-shadow:0 0 0 1px rgba(142,74,90,.25) inset}
.card .eb{font-size:.875rem;letter-spacing:var(--track);color:var(--muted);margin-bottom:18px}
.card h1{font-size:calc(var(--hs)*clamp(2.5rem,1.6rem + 3.4vw,4.25rem));line-height:var(--lh-h)}
.card p{max-width:32rem;margin-inline:auto}
.card .btns{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 22px;align-items:center;margin-top:22px}
.card hr{width:64px;border:0;height:1px;background:var(--champ);margin:28px auto 0}
.ph{margin:0;position:relative;display:grid;align-content:end;padding:18px;font-size:.8125rem;line-height:1.4;color:var(--muted);background:radial-gradient(120% 80% at 50% 20%,#f8e7e4,#eccdc8)}
.arch{aspect-ratio:4/5;border-radius:999px 999px 6px 6px;max-width:30rem;width:100%;justify-self:center}
section{padding-block:clamp(56px,4vw + 32px,104px)}
.sec-h{text-align:center;font-size:calc(var(--hs)*clamp(2rem,1.5rem + 1.8vw,2.75rem));line-height:var(--lh-h)}
.approach .cols{display:grid;gap:8px 56px;max-width:60rem;margin:0 auto}
@media(min-width:900px){.approach .cols{grid-template-columns:1fr 1fr}.approach blockquote{grid-column:1/-1}}
blockquote{margin:28px 0 0;text-align:center}
blockquote p{font-family:var(--f-head);font-weight:var(--hw);font-size:calc(var(--hs)*clamp(1.75rem,1.3rem + 1.6vw,2.5rem));line-height:1.3;max-width:40rem;margin:0 auto 10px}
blockquote footer{font-size:.9375rem;color:var(--muted)}
.svc{display:grid;gap:20px;max-width:56rem;margin:0 auto}@media(min-width:700px){.svc{grid-template-columns:1fr 1fr}}
.svc article{background:var(--card);text-align:center;padding:36px 28px;outline:1px solid rgba(142,74,90,.4);outline-offset:-8px}
.svc h3{font-size:calc(var(--hs)*1.875rem);line-height:var(--lh-h)}
.band{background:var(--band);text-align:center}
.band p{max-width:38rem;margin-inline:auto}
.rings{display:flex;justify-content:center;flex-wrap:wrap;gap:14px;list-style:none;padding:0;margin:28px 0}
.rings li{width:8.5rem;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;background:var(--card);border:1px solid rgba(142,74,90,.35);font-family:var(--f-head);font-weight:var(--hw);font-size:calc(var(--hs)*1.5rem)}
.two{display:grid;gap:40px;max-width:60rem;margin:0 auto}@media(min-width:800px){.two{grid-template-columns:1fr 1fr;gap:72px}}
.two h3{font-size:calc(var(--hs)*1.75rem)}
.enq-card{background:var(--card);max-width:62rem;margin:0 auto;padding:clamp(24px,4vw,56px);display:grid;gap:40px}
@media(min-width:900px){.enq-card{grid-template-columns:5fr 6fr}}
.enq-card h2{font-size:calc(var(--hs)*clamp(2rem,1.5rem + 1.8vw,2.75rem));line-height:var(--lh-h)}
.inc{padding-left:1.1rem;margin:0 0 18px}.inc li{margin-bottom:6px}
form{display:grid;gap:14px}label{font-size:.9375rem;font-weight:600}
input,textarea{background:#fff;border:1px solid #7D6469}
.note{font-size:.9375rem;color:var(--muted)}
.ft{border-top:1px solid rgba(59,42,46,.15);padding-block:40px 56px;text-align:center}.ft-in{max-width:72rem;margin:0 auto;${gutter};display:grid;gap:16px;justify-items:center}.ft .bn{font-size:1.75rem;margin:0}.ft p{margin:0 0 6px}
`,
  body: () => `${head()}
<main id="main">
<section class="hero"><div class="in hero-g">
  <div class="card">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${T('p', 'intro2')}
  <div class="btns"><a class="btn" href="#enquire" data-i="cta">${txt('cta')}</a><a class="tl" href="#approach" data-i="cta2">${txt('cta2')}</a></div><hr></div>
  ${ph('phPortrait', 'arch', 'peonies', true)}
</div></section>
<section class="approach" id="approach"><div class="in">${T('h2', 'approachH', 'class="sec-h"')}
<div class="cols">${T('p', 'approach1')}${T('p', 'approach2')}<blockquote>${T('p', 'quote')}<footer><span data-i="quoteBy">${txt('quoteBy')}</span> ${T('span', 'quoteFlag', 'class="flag"')}</footer></blockquote></div></div></section>
<section><div class="in">${T('h2', 'servicesH', 'class="sec-h"')}<div class="svc">${[0, 1].map((i) => `<article>${T('h3', `services.${i}.h`)}${T('p', `services.${i}.p`)}</article>`).join('')}</div></div></section>
<section class="band"><div class="in">${T('h2', 'langH', 'class="sec-h"')}${T('p', 'lang1')}${chips('rings')}<a class="tl" href="#faq" data-i="langLink">${txt('langLink')}</a></div></section>
<section><div class="in two"><div>${T('h3', 'credH')}${T('p', 'cred')}<a class="tl" href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener" data-i="credLink">${txt('credLink')}</a></div><div>${T('h3', 'travelH')}${T('p', 'travel')}</div></div></section>
<section><div class="in" style="max-width:58rem">${faq()}</div></section>
<section class="band" id="enquire"><div class="in"><div class="enq-card" style="text-align:left"><div>${T('h2', 'enqH')}${T('p', 'enq1')}${T('h3', 'incH', 'style="font-size:calc(var(--hs)*1.375rem)"')}${incList()}${T('p', 'enq2')}${T('p', 'enqNote', 'class="note"')}</div><div>${form('a')}</div></div></div></section>
</main>${foot()}`,
});

// ───────────────────────── 02 · Red Editorial ─────────────────────────
designs.push({
  name: 'Red Editorial', fonts: { head: { pkg: 'eb-garamond', weight: 600, zhAdjust: 1.12 }, ...serifTC, zhHeadW: 600, zhBodyW: 400 },
  css: `
:root{--bg:#FBF7F2;--alt:#F5EBE6;--ink:#2E2A2B;--bur:#6E1F2E;--red:#8E1B24;--muted:#575052;--gold:#B8924A;--r:0}
body{background:var(--bg);color:var(--ink)}
.in{max-width:80rem;margin:0 auto;${gutter}}@media(min-width:900px){.in{${gutterD}}}
.hd{border-bottom:1px solid var(--ink)}.hd-in{max-width:80rem;margin:0 auto;${gutter};display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:14px}@media(min-width:900px){.hd-in{${gutterD}}}
.brand{display:flex;align-items:baseline;gap:12px;text-decoration:none;color:var(--bur)}.bn{font-family:var(--f-head);font-weight:600;font-size:1.375rem;white-space:nowrap}.bs{color:var(--muted);font-size:.8125rem;white-space:nowrap}@media(max-width:600px){.brand .bs{display:none}}
.nav-d ul{display:flex;gap:24px;list-style:none;margin:0;padding:0}.nav-d a{color:var(--ink);text-decoration:none;font-size:.9375rem}.nav-d a[aria-current]{color:var(--red);box-shadow:0 2px 0 var(--red)}
.hd-r{display:flex;align-items:center;gap:6px}.nav-m ul{background:#fff}
.btn{display:inline-flex;align-items:center;min-height:3rem;padding:.7rem 1.5rem;background:var(--red);color:var(--bg);border:0;font:inherit;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer}.btn:hover{background:var(--bur)}
.tl{color:var(--bur);font-weight:600}
.cover{padding-block:32px 0}
.cover-g{display:grid;gap:28px}
@media(min-width:1000px){.cover-g{grid-template-columns:8fr 4fr;gap:48px;align-items:end}}
.kicker{display:flex;gap:12px;align-items:center;color:var(--red);font-size:.875rem;letter-spacing:var(--track);font-weight:600;margin-bottom:18px}.kicker::before{content:"";width:36px;height:2px;background:var(--red)}
:lang(zh) .kicker{font-weight:400}
.cover h1{color:var(--bur);font-size:calc(var(--hs)*clamp(2.75rem,1.4rem + 5vw,5.75rem));line-height:calc(var(--lh-h) - .06);margin:0}
.ph{margin:0;display:grid;align-content:end;padding:16px;font-size:.8125rem;line-height:1.4;color:var(--muted);background:linear-gradient(170deg,#efe3dc,#e2cfc6)}
.tall{aspect-ratio:3/4}
.deck{display:grid;gap:8px 48px;border-top:2px solid var(--bur);margin-top:36px;padding-top:24px}
@media(min-width:900px){.deck{grid-template-columns:1fr 1fr 18rem}.deck .btns{justify-self:end}}
.deck .lede{font-size:1.1875em;line-height:1.5}:lang(zh) .deck .lede{font-size:1.0625em;line-height:1.8}
.btns{display:flex;flex-direction:column;gap:14px;align-items:flex-start}
.facts{display:grid;border-block:1px solid var(--ink);margin-block:56px 0}
@media(min-width:800px){.facts{grid-template-columns:repeat(3,1fr)}}
.facts>div{padding:20px 0;border-bottom:1px solid rgba(46,42,43,.2)}@media(min-width:800px){.facts>div{padding:24px 28px 24px 0;border-bottom:0;border-right:1px solid rgba(46,42,43,.2)}.facts>div+div{padding-left:28px}.facts>div:last-child{border-right:0}}
.facts h2{font-size:calc(var(--hs)*1.5rem);color:var(--bur);margin-bottom:.35em}
.facts p{margin:0;font-size:.9375rem}
.facts ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px 14px;font-size:.9375rem}
section{padding-block:clamp(56px,5vw + 24px,112px)}
.split{display:grid;gap:28px}@media(min-width:900px){.split{grid-template-columns:5fr 7fr;gap:72px}}
.pull{font-family:var(--f-head);font-weight:var(--hw);color:var(--bur);font-size:calc(var(--hs)*clamp(2rem,1.4rem + 2.4vw,3.25rem));line-height:1.2;margin:0}
.pull+p{margin-top:16px;color:var(--muted);font-size:.9375rem}
.split h2{font-size:calc(var(--hs)*clamp(1.75rem,1.4rem + 1.2vw,2.25rem));color:var(--bur)}
.svc{display:grid;gap:0;border-top:1px solid var(--ink)}@media(min-width:700px){.svc{grid-template-columns:1fr 1fr}}
.svc article{padding:24px 0;border-bottom:1px solid rgba(46,42,43,.2)}@media(min-width:700px){.svc article+article{padding-left:32px;border-left:1px solid rgba(46,42,43,.2)}.svc article{padding-right:32px}}
.svc h3{font-size:calc(var(--hs)*1.75rem);color:var(--bur)}
.band{background:var(--bur);color:var(--bg)}.band h2{color:var(--bg);font-size:calc(var(--hs)*clamp(2rem,1.5rem + 2vw,3rem));line-height:var(--lh-h)}.band .tl{color:var(--bg)}
.band .split p{max-width:36rem}
.band .chips{list-style:none;padding:0;margin:0 0 20px;display:flex;gap:10px;flex-wrap:wrap}.band .chips li{border:1px solid var(--bg);padding:.25rem .9rem}
.band :focus-visible{outline-color:var(--bg)}
.enq{display:grid;gap:40px}@media(min-width:900px){.enq{grid-template-columns:7fr 5fr;gap:80px}}
.enq h2{font-size:calc(var(--hs)*clamp(2rem,1.5rem + 2vw,3rem));color:var(--bur);line-height:var(--lh-h)}
.inc{padding-left:1.1rem}
form{display:grid;gap:18px}label{font-size:.875rem;font-weight:600;letter-spacing:.02em}
input,textarea{background:transparent;border:0;border-bottom:1px solid var(--ink);padding-inline:0}
textarea{border:1px solid var(--ink);padding-inline:.75rem}
.note{font-size:.9375rem;color:var(--muted)}
.ft{border-top:2px solid var(--bur);padding-block:36px 56px}.ft-in{max-width:80rem;margin:0 auto;${gutter};display:grid;gap:16px}@media(min-width:800px){.ft-in{${gutterD};grid-template-columns:2fr 1fr}}.ft .bn{color:var(--bur);font-size:1.5rem;margin:0}.ft p{margin:0 0 6px}
`,
  body: () => `${head()}
<main id="main">
<section class="cover"><div class="in">
  <div class="cover-g"><div><p class="kicker" data-i="heroEyebrow">${txt('heroEyebrow')}</p>${T('h1', 'h1')}</div>${ph('phPortrait', 'tall', 'hold', true)}</div>
  <div class="deck">${T('p', 'intro', 'class="lede"')}${T('p', 'intro2')}<div class="btns"><a class="btn" href="#enquire" data-i="cta">${txt('cta')}</a><a class="tl" href="#approach" data-i="cta2">${txt('cta2')}</a></div></div>
  <div class="facts"><div>${T('h2', 'langH')}${chips('')}</div><div>${T('h2', 'travelH')}${T('p', 'travel')}</div><div>${T('h2', 'credH')}${T('p', 'cred')}</div></div>
</div></section>
<section id="approach"><div class="in split"><div>${T('p', 'quote', 'class="pull"')}<p><span data-i="quoteBy">${txt('quoteBy')}</span> ${T('span', 'quoteFlag', 'class="flag"')}</p></div><div>${T('h2', 'approachH')}${T('p', 'approach1')}${T('p', 'approach2')}
<div class="svc">${[0, 1].map((i) => `<article>${T('h3', `services.${i}.h`)}${T('p', `services.${i}.p`)}</article>`).join('')}</div></div></div></section>
<section class="band"><div class="in split"><div>${T('h2', 'langH')}</div><div>${T('p', 'lang1')}${chips()}<a class="tl" href="#faq" data-i="langLink">${txt('langLink')}</a></div></div></section>
<section><div class="in" style="max-width:58rem">${faq()}</div></section>
<section id="enquire"><div class="in enq"><div>${form('b')}</div><div>${T('h2', 'enqH')}${T('p', 'enq1')}${incList()}${T('p', 'enq2')}${T('p', 'enqNote', 'class="note"')}<p><a class="tl" href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener" data-i="credLink">${txt('credLink')}</a></p></div></div></section>
</main>${foot()}`,
});

// ───────────────────────── 03 · Quiet Letter ─────────────────────────
designs.push({
  name: 'Quiet Letter', fonts: { head: { pkg: 'literata', weight: 500, zhAdjust: 1.0 }, ...serifTC, zhHeadW: 500, zhBodyW: 400 },
  css: `
:root{--bg:#FBF3F1;--paper:#FFFCFB;--ink:#3B2A2E;--rose:#8E4A5A;--rose-d:#733B49;--muted:#5E464C;--line:rgba(59,42,46,.16);--r:3px}
body{background:var(--bg);color:var(--ink)}
.shell{display:grid;min-height:100vh}
@media(min-width:1000px){.shell{grid-template-columns:20rem 1fr}}
.side{background:var(--bg);${gutter};padding-block:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:10}
@media(min-width:1000px){.side{height:100vh;flex-direction:column;align-items:flex-start;justify-content:flex-start;padding:48px 40px;border-bottom:0;border-right:1px solid var(--line);gap:36px}}
.brand{display:grid;text-decoration:none;color:var(--ink)}.bn{font-family:var(--f-head);font-weight:500;font-size:1.375rem;white-space:nowrap}.bs{font-size:.8125rem;color:var(--muted);white-space:nowrap}
.nav-d ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}.nav-d a{color:var(--ink);text-decoration:none}.nav-d a[aria-current]{color:var(--rose);text-decoration:underline}
@media(max-width:999px){.side .nav-d,.side .side-cta{display:none}}
.side .hd-r{display:flex;gap:6px;align-items:center}@media(min-width:1000px){.side .hd-r{flex-direction:column;align-items:flex-start}.side .nav-m{display:none}}
.ls{flex-wrap:wrap}.nav-m ul{background:var(--paper)}
.btn{display:inline-flex;align-items:center;min-height:3rem;padding:.7rem 1.4rem;background:var(--rose);color:#fff;border:0;border-radius:var(--r);font:inherit;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer}.btn:hover{background:var(--rose-d)}
.tl{color:var(--rose);font-weight:600}
.letter{max-width:44rem;margin:0 auto;${gutter};padding-block:48px 96px}@media(min-width:1000px){.letter{padding-block:96px 120px}}
.paper{background:var(--paper);padding:clamp(24px,5vw,72px);box-shadow:0 1px 0 var(--line),0 24px 48px -32px rgba(59,42,46,.25)}
.eb{font-size:.875rem;letter-spacing:var(--track);color:var(--muted)}
h1{font-size:calc(var(--hs)*clamp(2.25rem,1.6rem + 2.4vw,3.5rem));line-height:var(--lh-h)}
.lead-row{display:grid;gap:20px;align-items:start;margin:28px 0}@media(min-width:640px){.lead-row{grid-template-columns:8rem 1fr}}
.ph{margin:0;display:grid;place-items:center;text-align:center;padding:10px;font-size:.6875rem;line-height:1.35;color:var(--muted);background:radial-gradient(circle at 40% 35%,#f6e2de,#e8c9c3)}
.round{width:8rem;aspect-ratio:1;border-radius:50%}.round .badge{display:none}
.lede{font-size:1.1875em;line-height:1.55}:lang(zh) .lede{font-size:1.0625em;line-height:1.8}
.rule{border:0;border-top:1px solid var(--line);margin:48px 0}
h2{font-size:calc(var(--hs)*clamp(1.625rem,1.3rem + 1.1vw,2.125rem));line-height:var(--lh-h)}
blockquote{margin:32px 0;padding:0 0 0 20px;border-left:2px solid var(--rose)}
blockquote p{font-family:var(--f-head);font-weight:var(--hw);font-size:calc(var(--hs)*1.625rem);line-height:1.4;margin-bottom:8px}
blockquote footer{font-size:.9375rem;color:var(--muted)}
.svc{display:grid;gap:24px}@media(min-width:640px){.svc{grid-template-columns:1fr 1fr}}
.svc h3{font-size:calc(var(--hs)*1.375rem);margin-bottom:.3em}.svc p{margin:0}
.chips{list-style:none;padding:0;margin:16px 0;display:flex;gap:8px;flex-wrap:wrap}.chips li{border:1px solid var(--line);border-radius:999px;padding:.25rem .85rem;font-size:.9375rem}
.meta{display:grid;gap:24px;font-size:.9375rem}@media(min-width:640px){.meta{grid-template-columns:1fr 1fr}}.meta h3{font-size:calc(var(--hs)*1.25rem)}
.sign{font-family:var(--f-head);font-size:1.75rem;color:var(--rose);margin:40px 0 0}
.inc{padding-left:1.1rem}
form{display:grid;gap:14px;margin-top:20px}label{font-size:.9375rem;font-weight:600}
input,textarea{background:#fff;border:1px solid #7D6469}
.note{font-size:.9375rem;color:var(--muted)}
.ft{max-width:44rem;margin:0 auto;${gutter};padding-block:0 64px;font-size:.9375rem}.ft-in{display:grid;gap:14px}.ft .bn{font-size:1.25rem;margin:0}.ft p{margin:0 0 6px}
`,
  body: () => `<div class="shell"><aside class="side">${brand()}<nav class="nav-d" aria-label="Main">${navList()}</nav><a class="btn side-cta" href="#enquire" data-i="cta">${txt('cta')}</a><div class="hd-r">${langSwitch()}${mobileNav()}</div></aside>
<div><main id="main" class="letter"><article class="paper">
${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}
<div class="lead-row">${ph('phPortrait', 'round', 'vows', true)}<div>${T('p', 'intro', 'class="lede"')}${T('p', 'intro2')}<p><a class="btn" href="#enquire" data-i="cta">${txt('cta')}</a></p></div></div>
<hr class="rule" id="approach">${T('h2', 'approachH')}${T('p', 'approach1')}${T('p', 'approach2')}
<blockquote>${T('p', 'quote')}<footer><span data-i="quoteBy">${txt('quoteBy')}</span> ${T('span', 'quoteFlag', 'class="flag"')}</footer></blockquote>
<hr class="rule">${T('h2', 'servicesH')}<div class="svc">${[0, 1].map((i) => `<div>${T('h3', `services.${i}.h`)}${T('p', `services.${i}.p`)}</div>`).join('')}</div>
<hr class="rule">${T('h2', 'langH')}${T('p', 'lang1')}${chips()}<a class="tl" href="#faq" data-i="langLink">${txt('langLink')}</a>
<hr class="rule"><div class="meta"><div>${T('h3', 'credH')}${T('p', 'cred')}<a class="tl" href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener" data-i="credLink">${txt('credLink')}</a></div><div>${T('h3', 'travelH')}${T('p', 'travel')}</div></div>
<hr class="rule">${faq()}
<hr class="rule" id="enquire">${T('h2', 'enqH')}${T('p', 'enq1')}${incList()}${T('p', 'enq2')}${T('p', 'enqNote', 'class="note"')}${form('c')}
<p class="sign" lang="en">Van</p>
</article></main>${foot()}</div></div>`,
});

// ───────────────────────── 04 · Soft Bento ─────────────────────────
designs.push({
  name: 'Soft Bento', fonts: { head: { pkg: 'source-sans-3', weight: 600, zhAdjust: 1.0 }, zhHead: 'noto-sans-tc', zhBody: 'noto-sans-tc', zhHeadW: 500, zhBodyW: 400 },
  css: `
:root{--bg:#FFFAF7;--rose-t:#F6E4E4;--sage-t:#E7ECE5;--ink:#2F2A2B;--plum:#7A3E4E;--plum-d:#5F2F3C;--muted:#5A5153;--dusty:#C99AA3;--sage:#8A9A86;--card:#fff;--r:14px}
:root{--f-head:var(--f-hl),var(--zh-h),system-ui,var(--zh-sans-fb),sans-serif}
[lang]{--f-head:var(--f-hl),var(--zh-h),system-ui,var(--zh-sans-fb),sans-serif}
body{background:var(--bg);color:var(--ink)}
.in{max-width:76rem;margin:0 auto;${gutter}}@media(min-width:900px){.in{${gutterD}}}
.hd{position:sticky;top:env(safe-area-inset-top,0px);z-index:10;padding-block:12px}
.hd-in{max-width:76rem;margin:0 auto;${gutter}}@media(min-width:900px){.hd-in{${gutterD}}}
.hd-in{display:flex}.hd-in>*{min-width:0}
.bar{flex:1;display:flex;align-items:center;justify-content:space-between;gap:12px;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-radius:999px;padding:8px 8px 8px 20px;box-shadow:0 4px 18px rgba(47,42,43,.08)}
.brand{display:grid;text-decoration:none;color:var(--ink)}.bn{font-family:var(--f-head);font-weight:600;font-size:1.125rem;line-height:1.1;white-space:nowrap}.bs{font-size:.75rem;color:var(--muted);white-space:nowrap}
.nav-d ul{display:flex;gap:4px;list-style:none;margin:0;padding:0}.nav-d a{display:block;color:var(--ink);text-decoration:none;font-size:.9375rem;padding:.4rem .75rem;border-radius:999px}.nav-d a[aria-current]{background:var(--rose-t);color:var(--plum)}
.hd-r{display:flex;gap:4px;align-items:center}.nav-m ul{background:#fff}
.btn{display:inline-flex;align-items:center;min-height:3rem;padding:.7rem 1.5rem;background:var(--plum);color:#fff;border:0;border-radius:999px;font:inherit;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer}.btn:hover{background:var(--plum-d)}
.tl{color:var(--plum);font-weight:600}
.bento{display:grid;gap:14px;padding-block:20px 40px}
@media(min-width:760px){.bento{grid-template-columns:repeat(4,1fr)}}
.tile{background:var(--card);border-radius:24px;padding:24px;position:relative;overflow:hidden;min-width:0}
.t-hero>*{position:relative;z-index:1}
@media(min-width:760px) and (max-width:1099px){.t-hero{grid-column:1/-1;padding:40px}.t-por{grid-column:span 2;grid-row:span 2}.t-lang,.t-quote{grid-column:span 2}.t-ct{grid-column:1/-1}}
@media(min-width:1100px){.t-hero{grid-column:span 3;padding:44px}.t-por{grid-row:span 2}}
.t-ct{display:grid;gap:4px 24px}
.t-hero{background:var(--rose-t)}
.t-hero h1{font-size:calc(var(--hs)*clamp(2.25rem,1.5rem + 2.8vw,3.75rem));line-height:var(--lh-h);max-width:18ch}
:lang(zh) .t-hero h1{max-width:none}
.t-hero p{max-width:40rem}
.eb{font-size:.8125rem;font-weight:600;letter-spacing:var(--track);color:var(--plum);text-transform:uppercase}:lang(zh) .eb{text-transform:none}
.btns{display:flex;flex-wrap:wrap;gap:12px 20px;align-items:center;margin-top:8px}
.t-hero .blob{position:absolute;z-index:0;right:-70px;bottom:-90px;width:220px;color:var(--dusty);opacity:.35}
.ph{margin:0;display:grid;align-content:end;padding:18px;font-size:.8125rem;line-height:1.4;color:var(--muted);background:linear-gradient(160deg,#efd3d6,#f9ecea)}
.t-por{padding:0}.t-por .ph{height:100%;min-height:22rem}
.t-lang{background:var(--sage-t)}
.tile h2{font-size:calc(var(--hs)*1.5rem);line-height:var(--lh-h)}
.tile h3{font-size:calc(var(--hs)*1.25rem)}
.chips{list-style:none;padding:0;margin:10px 0 14px;display:flex;gap:8px;flex-wrap:wrap}.chips li{background:#fff;border-radius:999px;padding:.3rem .9rem;font-size:.9375rem;border:1px solid rgba(138,154,134,.6)}
.t-quote{background:var(--plum);color:#fff}.t-quote p.q{font-family:var(--f-head);font-weight:var(--hw);font-size:calc(var(--hs)*1.5rem);line-height:1.35}.t-quote .by{font-size:.875rem;opacity:.9}
.t-quote :focus-visible{outline-color:#fff}
.small{font-size:.9375rem}
.sec{padding-block:24px 64px}
.sec-g{display:grid;gap:14px}@media(min-width:760px){.sec-g{grid-template-columns:1fr 1fr}}
.sec-g .tile h2{font-size:calc(var(--hs)*1.75rem)}
.t-enq{display:grid;gap:28px;background:var(--rose-t)}@media(min-width:900px){.t-enq{grid-template-columns:5fr 6fr;padding:44px}}
.t-enq h2{font-size:calc(var(--hs)*clamp(1.75rem,1.4rem + 1.4vw,2.5rem))}
.inc{list-style:none;padding:0;margin:0 0 16px;display:grid;gap:8px}.inc li{background:#fff;border-radius:12px;padding:.6rem .9rem}
form{display:grid;gap:14px;background:#fff;border-radius:20px;padding:22px}label{font-size:.9375rem;font-weight:600}
input,textarea{background:#fff;border:1px solid #7A7073}
.note{font-size:.9375rem;color:var(--muted)}
.ft{padding-block:24px 56px}.ft-in{max-width:76rem;margin:0 auto;${gutter};display:grid;gap:12px}@media(min-width:800px){.ft-in{${gutterD};grid-template-columns:2fr 1fr}}.ft .bn{font-size:1.25rem;margin:0}.ft p{margin:0 0 6px}
`,
  body: () => `<header class="hd"><div class="hd-in"><div class="bar">${brand()}<nav class="nav-d" aria-label="Main">${navList()}</nav><div class="hd-r">${langSwitch()}${mobileNav()}</div></div></div></header>
<main id="main"><div class="in">
<div class="bento">
  <div class="tile t-hero">${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${T('p', 'intro2', 'class="small"')}<div class="btns"><a class="btn" href="#enquire" data-i="cta">${txt('cta')}</a><a class="tl" href="#approach" data-i="cta2">${txt('cta2')}</a></div><svg class="blob" viewBox="0 0 200 200" aria-hidden="true"><path fill="currentColor" d="M44 30c30-28 92-30 122 6s30 96-6 124-104 30-132-6S14 58 44 30z"/></svg></div>
  <div class="tile t-por">${ph('phPortrait', '', 'bouquet', true)}</div>
  <div class="tile t-lang">${T('h2', 'langH')}${chips()}<a class="tl small" href="#faq" data-i="langLink">${txt('langLink')}</a></div>
  <div class="tile t-quote"><p class="q" data-i="quote">${txt('quote')}</p><p class="by"><span data-i="quoteBy">${txt('quoteBy')}</span> ${T('span', 'quoteFlag', 'class="flag"')}</p></div>
  <div class="tile t-ct"><div>${T('h3', 'credH')}${T('p', 'cred', 'class="small"')}<a class="tl small" href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener" data-i="credLink">${txt('credLink')}</a></div><div style="margin-top:16px">${T('h3', 'travelH')}${T('p', 'travel', 'class="small"')}</div></div>
</div>
<div class="sec" id="approach"><div class="sec-g">
  <div class="tile">${T('h2', 'approachH')}${T('p', 'approach1')}${T('p', 'approach2')}</div>
  <div class="tile" style="background:var(--sage-t)">${T('h2', 'servicesH')}${[0, 1].map((i) => `${T('h3', `services.${i}.h`)}${T('p', `services.${i}.p`, 'class="small"')}`).join('')}${T('p', 'lang1', 'class="small"')}</div>
  <div class="tile" style="grid-column:1/-1">${faq()}</div>
  <div class="tile t-enq" id="enquire" style="grid-column:1/-1"><div>${T('h2', 'enqH')}${T('p', 'enq1')}${incList()}${T('p', 'enq2')}${T('p', 'enqNote', 'class="note"')}</div><div>${form('d')}</div></div>
</div></div>
</div></main>${foot()}`,
});

// ───────────────────────── 05 · Ink & Petal ─────────────────────────
designs.push({
  name: 'Ink & Petal', fonts: { head: { pkg: 'cormorant-garamond', weight: 600, zhAdjust: 1.16 }, ...serifTC, zhHeadW: 600, zhBodyW: 400, accent: true },
  css: `
:root{--bg:#FDF6F2;--peony:#F2D4D2;--mocha:#5C4036;--mocha-d:#46302A;--ink:#3A2C27;--muted:#5C4A43;--brass:#B89A6A;--card:#FFFDFB;--r:2px}
body{background:var(--bg);color:var(--ink)}
.in{max-width:76rem;margin:0 auto;${gutter}}@media(min-width:900px){.in{${gutterD}}}
.hd{position:absolute;left:0;right:0;z-index:5}.hd-in{max-width:76rem;margin:0 auto;${gutter};display:flex;justify-content:space-between;align-items:center;gap:12px;padding-block:18px}@media(min-width:900px){.hd-in{${gutterD}}}
.hd .brand,.hd .nav-d a,.hd .ls,.hd .nav-m summary{color:var(--card)}
.brand{display:grid;text-decoration:none}.bn{font-family:var(--f-head);font-weight:600;font-size:1.5rem;line-height:1.05;white-space:nowrap}.bs{font-size:.8125rem;white-space:nowrap;opacity:.95}
.nav-d ul{display:flex;gap:22px;list-style:none;margin:0;padding:0}.nav-d a{text-decoration:none;font-size:.9375rem}.nav-d a[aria-current]{text-decoration:underline}
.hd-r{display:flex;gap:6px;align-items:center}.nav-m ul{background:var(--card);color:var(--ink)}.nav-m ul a{color:var(--ink)!important}
.btn{display:inline-flex;align-items:center;min-height:3rem;padding:.7rem 1.6rem;background:var(--mocha);color:var(--bg);border:0;border-radius:var(--r);font:inherit;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer}.btn:hover{background:var(--mocha-d)}
.tl{color:var(--mocha);font-weight:600}
.ph{margin:0;display:grid;align-content:end;padding:18px;font-size:.8125rem;line-height:1.4;color:var(--muted)}
.bleed{height:clamp(26rem,62vw,40rem);background:linear-gradient(180deg,rgba(58,44,39,.55),rgba(58,44,39,0) 34%),radial-gradient(90% 120% at 70% 40%,#e9c3bf,#c79c92 70%,#9f7469);color:var(--card);padding:0 max(16px,env(safe-area-inset-left,0px)) 120px}
.bleed::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(58,44,39,.6),rgba(58,44,39,0) 38%)}
.panel{position:relative;z-index:2;margin-top:-96px;background:var(--card);padding:clamp(24px,4vw,56px);max-width:46rem;box-shadow:0 30px 60px -40px rgba(58,44,39,.45)}
.accent{display:block;font-family:"LXGW WenKai TC","LXGW WenKai",var(--zh-b),serif;font-weight:400;font-size:clamp(1.625rem,1.3rem + 1.4vw,2.25rem);line-height:1.3;color:var(--mocha);margin:0 0 4px}
.accent-g{display:block;font-size:.8125rem;color:var(--muted);margin-bottom:18px}
.accent::after{content:"";display:block;width:56px;height:1px;background:var(--brass);margin:12px 0 18px}
html:lang(zh) .accent-g{display:none}
.accent{margin:0}
.eb{font-size:.875rem;letter-spacing:var(--track);color:var(--muted)}
.panel h1{font-size:calc(var(--hs)*clamp(2.375rem,1.6rem + 3vw,3.75rem));line-height:var(--lh-h)}
.btns{display:flex;flex-wrap:wrap;gap:12px 22px;align-items:center;margin-top:16px}
section{padding-block:clamp(56px,5vw + 24px,104px)}
.three{display:grid;gap:14px;list-style:none;padding:0;margin:24px 0 0}@media(min-width:800px){.three{grid-template-columns:repeat(3,1fr)}}
.three li{background:var(--peony);padding:22px 22px 26px;border-top:3px solid var(--mocha)}
.sec-h{font-size:calc(var(--hs)*clamp(2rem,1.5rem + 1.8vw,2.75rem));line-height:var(--lh-h)}
.mocha{background:var(--mocha);color:var(--bg)}
.mocha blockquote{margin:0;max-width:52rem}
.mocha blockquote p{font-family:var(--f-head);font-weight:var(--hw);font-size:calc(var(--hs)*clamp(2rem,1.4rem + 2.6vw,3.25rem));line-height:1.25;margin-bottom:12px}
.mocha footer{font-size:.9375rem}
.app{display:grid;gap:32px}@media(min-width:900px){.app{grid-template-columns:5fr 7fr;gap:72px;align-items:start}}
.app .ph{aspect-ratio:4/5;background:linear-gradient(170deg,#f2d4d2,#e2b9b4);border-radius:200px 200px 2px 2px}
.svc{display:grid;gap:20px;margin-top:28px}@media(min-width:700px){.svc{grid-template-columns:1fr 1fr}}
.svc article{border:1px solid rgba(58,44,39,.2);padding:24px;background:var(--card)}
.svc h3{font-size:calc(var(--hs)*1.75rem)}
.peony{background:var(--peony)}
.lang-g{display:grid;gap:28px}@media(min-width:900px){.lang-g{grid-template-columns:1fr 1fr;gap:72px}}
.chips{list-style:none;padding:0;margin:16px 0;display:flex;gap:10px;flex-wrap:wrap}.chips li{background:var(--card);padding:.3rem 1rem;border-radius:999px;font-size:.9375rem}
.two h3{font-size:calc(var(--hs)*1.5rem)}
.enq{display:grid;gap:40px}@media(min-width:900px){.enq{grid-template-columns:5fr 6fr;gap:72px}}
form{display:grid;gap:14px}label{font-size:.9375rem;font-weight:600}
input,textarea{background:#fff;border:1px solid #7E6A62}
.note{font-size:.9375rem;color:var(--muted)}
.ft{border-top:1px solid rgba(58,44,39,.18);padding-block:36px 56px}.ft-in{max-width:76rem;margin:0 auto;${gutter};display:grid;gap:12px}@media(min-width:800px){.ft-in{${gutterD};grid-template-columns:2fr 1fr}}.ft .bn{font-size:1.5rem;margin:0}.ft p{margin:0 0 6px}
`,
  body: () => `${head()}
<main id="main">
${ph('phCeremony', 'bleed', 'arch', true)}
<div class="in"><div class="panel"><span class="accent" data-z="accent" data-zl lang="zh-Hant">言語的力量</span><span class="accent-g" data-i="accent">${txt('accent')}</span>${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${T('p', 'intro2')}<div class="btns"><a class="btn" href="#enquire" data-i="cta">${txt('cta')}</a><a class="tl" href="#approach" data-i="cta2">${txt('cta2')}</a></div></div></div>
<section><div class="in">${T('h2', 'enqH', 'class="sec-h"')}${T('p', 'enq1')}<ul class="three">${[0, 1, 2].map((i) => `<li data-i="inc.${i}">${txt(`inc.${i}`)}</li>`).join('')}</ul></div></section>
<section class="mocha"><div class="in"><blockquote>${T('p', 'quote')}<footer><span data-i="quoteBy">${txt('quoteBy')}</span> ${T('span', 'quoteFlag', 'class="flag"')}</footer></blockquote></div></section>
<section id="approach"><div class="in app">${ph('phPortrait', '', 'bloom')}<div>${T('h2', 'approachH', 'class="sec-h"')}${T('p', 'approach1')}${T('p', 'approach2')}<div class="svc">${[0, 1].map((i) => `<article>${T('h3', `services.${i}.h`)}${T('p', `services.${i}.p`)}</article>`).join('')}</div></div></div></section>
<section class="peony"><div class="in lang-g"><div>${T('h2', 'langH', 'class="sec-h"')}${T('p', 'lang1')}${chips()}<a class="tl" href="#faq" data-i="langLink">${txt('langLink')}</a></div><div class="two">${T('h3', 'credH')}${T('p', 'cred')}<p><a class="tl" href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener" data-i="credLink">${txt('credLink')}</a></p>${T('h3', 'travelH')}${T('p', 'travel')}</div></div></section>
<section><div class="in" style="max-width:58rem">${faq()}</div></section>
<section id="enquire"><div class="in enq"><div>${T('h2', 'enqH', 'class="sec-h"')}${T('p', 'enq2')}${T('p', 'enqNote', 'class="note"')}</div><div>${form('e')}</div></div></section>
</main>${foot()}`,
});

// ───────────────────────── 06 · Red Thread ─────────────────────────
designs.push({
  name: 'Red Thread', fonts: { head: { pkg: 'noto-serif', weight: 600, zhAdjust: 1.0 }, ...serifTC, zhHeadW: 600, zhBodyW: 400 },
  css: `
:root{--bg:#FBF7F2;--alt:#F5EBE6;--ink:#2E2A2B;--bur:#6E1F2E;--red:#8E1B24;--muted:#575052;--r:2px}
body{background:var(--bg);color:var(--ink)}
.in{max-width:74rem;margin:0 auto;${gutter}}@media(min-width:900px){.in{${gutterD}}}
.top{background:var(--bur);color:var(--bg)}
.hd-in{max-width:74rem;margin:0 auto;${gutter};display:flex;align-items:center;justify-content:space-between;gap:12px;padding-block:16px}@media(min-width:900px){.hd-in{${gutterD}}}
.brand{display:grid;text-decoration:none;color:var(--bg)}.bn{font-family:var(--f-head);font-weight:600;font-size:1.375rem;white-space:nowrap}.bs{font-size:.8125rem;opacity:.95;white-space:nowrap}
.nav-d ul{display:flex;gap:22px;list-style:none;margin:0;padding:0}.nav-d a{color:var(--bg);text-decoration:none;font-size:.9375rem}.nav-d a[aria-current]{text-decoration:underline}
.hd-r{display:flex;gap:6px;align-items:center}.nav-m ul{background:var(--bg);color:var(--ink)}
.top :focus-visible{outline-color:var(--bg)}
.btn{display:inline-flex;align-items:center;min-height:3rem;padding:.7rem 1.5rem;background:var(--red);color:var(--bg);border:0;border-radius:var(--r);font:inherit;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer}.btn:hover{background:var(--bur)}
.btn.inv{background:var(--bg);color:var(--bur)}.btn.inv:hover{background:#fff}
.tl{color:var(--bur);font-weight:600}.top .tl{color:var(--bg)}
.hero{padding-block:24px 64px}
.hero-g{display:grid;gap:32px;align-items:center}@media(min-width:950px){.hero-g{grid-template-columns:7fr 5fr;gap:64px}}
.eb{font-size:.875rem;letter-spacing:var(--track);opacity:.95}
.hero h1{color:var(--bg);font-size:calc(var(--hs)*clamp(2.375rem,1.5rem + 3.2vw,4rem));line-height:var(--lh-h)}
.btns{display:flex;flex-wrap:wrap;gap:12px 22px;align-items:center;margin-top:20px}
.ph{margin:0;display:grid;align-content:end;padding:16px;font-size:.8125rem;line-height:1.4;color:var(--muted);background:linear-gradient(170deg,#f6ece6,#e8d7cf)}
.framed{aspect-ratio:4/5;outline:1px solid rgba(251,247,242,.7);outline-offset:10px;max-width:28rem;width:100%;justify-self:center}
/* the thread */
.thread{position:relative}
.thread::before{content:"";position:absolute;top:0;bottom:0;left:max(24px,calc(env(safe-area-inset-left,0px) + 8px));width:2px;background:var(--red)}
@media(min-width:900px){.thread::before{left:calc(50% - 37rem + 40px)}}
@media(min-width:900px) and (max-width:1184px){.thread::before{left:max(40px,env(safe-area-inset-left,0px))}}
.knot{position:relative;padding-left:40px}
.knot::before{content:"";position:absolute;left:-1px;top:.55em;width:14px;height:14px;border-radius:50%;background:var(--bg);border:2px solid var(--red);transform:translateX(calc(-50% + 9px))}
@media(min-width:900px){.knot{padding-left:72px}}
section{padding-block:clamp(48px,4vw + 24px,96px)}
h2{color:var(--bur);font-size:calc(var(--hs)*clamp(1.875rem,1.4rem + 1.8vw,2.625rem));line-height:var(--lh-h)}
.knot p,.knot ul{max-width:var(--measure)}
blockquote{margin:28px 0 0;padding:20px 24px;background:var(--alt);max-width:40rem}
blockquote p{font-family:var(--f-head);font-weight:var(--hw);color:var(--bur);font-size:calc(var(--hs)*1.625rem);line-height:1.4;margin-bottom:8px}
blockquote footer{font-size:.9375rem;color:var(--muted)}
.svc{display:grid;gap:16px;margin-top:8px}@media(min-width:760px){.svc{grid-template-columns:1fr 1fr;max-width:52rem}}
.svc article{border-top:2px solid var(--bur);padding-top:16px}
.svc h3{font-size:calc(var(--hs)*1.5rem);color:var(--bur)}
.chips{list-style:none;padding:0;margin:16px 0;display:flex;gap:10px;flex-wrap:wrap}.chips li{border:1px solid var(--bur);color:var(--bur);padding:.25rem .9rem;border-radius:999px}
.meta{display:grid;gap:24px;max-width:56rem}@media(min-width:760px){.meta{grid-template-columns:1fr 1fr}}.meta h3{font-size:calc(var(--hs)*1.375rem);color:var(--bur)}
.enq{display:grid;gap:36px;max-width:64rem}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:56px}}
.inc{padding-left:1.1rem}
form{display:grid;gap:14px;background:#fff;padding:24px;border:1px solid rgba(46,42,43,.15)}label{font-size:.9375rem;font-weight:600}
input,textarea{background:#fff;border:1px solid #7A7073}
.note{font-size:.9375rem;color:var(--muted)}
.ft{background:var(--bur);color:var(--bg);padding-block:36px 56px}.ft-in{max-width:74rem;margin:0 auto;${gutter};display:grid;gap:12px}@media(min-width:800px){.ft-in{${gutterD};grid-template-columns:2fr 1fr}}.ft .bn{font-size:1.5rem;margin:0}.ft p{margin:0 0 6px}.ft .note{color:var(--bg)}.ft :focus-visible{outline-color:var(--bg)}
`,
  body: () => `<div class="top">${head()}
<section class="hero"><div class="in hero-g"><div>${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${T('p', 'intro2')}<div class="btns"><a class="btn inv" href="#enquire" data-i="cta">${txt('cta')}</a><a class="tl" href="#approach" data-i="cta2">${txt('cta2')}</a></div></div>${ph('phPortrait', 'framed', 'watch', true)}</div></section></div>
<main id="main" class="thread">
<section id="approach"><div class="in"><div class="knot">${T('h2', 'approachH')}${T('p', 'approach1')}${T('p', 'approach2')}<blockquote>${T('p', 'quote')}<footer><span data-i="quoteBy">${txt('quoteBy')}</span> ${T('span', 'quoteFlag', 'class="flag"')}</footer></blockquote></div></div></section>
<section><div class="in"><div class="knot">${T('h2', 'servicesH')}<div class="svc">${[0, 1].map((i) => `<article>${T('h3', `services.${i}.h`)}${T('p', `services.${i}.p`)}</article>`).join('')}</div></div></div></section>
<section><div class="in"><div class="knot">${T('h2', 'langH')}${T('p', 'lang1')}${chips()}<a class="tl" href="#faq" data-i="langLink">${txt('langLink')}</a></div></div></section>
<section><div class="in"><div class="knot"><div class="meta"><div>${T('h3', 'credH')}${T('p', 'cred')}<a class="tl" href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener" data-i="credLink">${txt('credLink')}</a></div><div>${T('h3', 'travelH')}${T('p', 'travel')}</div></div></div></div></section>
<section><div class="in"><div class="knot" style="max-width:58rem">${faq()}</div></div></section>
<section id="enquire"><div class="in"><div class="knot enq"><div>${T('h2', 'enqH')}${T('p', 'enq1')}${incList()}${T('p', 'enq2')}${T('p', 'enqNote', 'class="note"')}</div><div>${form('f')}</div></div></div></section>
</main>${foot()}`,
});

// ───────────────────────── 07 · Garden Collage ─────────────────────────
designs.push({
  name: 'Garden Collage', fonts: { head: { pkg: 'fraunces', weight: 500, zhAdjust: 1.04 }, ...serifTC, zhHeadW: 500, zhBodyW: 400 },
  css: `
:root{--bg:#FBF3F1;--band:#F3DEDA;--ink:#3B2A2E;--rose:#8E4A5A;--rose-d:#733B49;--muted:#5E464C;--card:#FFFDFC;--r:12px}
body{background:var(--bg);color:var(--ink);overflow-x:hidden}
.in{max-width:76rem;margin:0 auto;${gutter}}@media(min-width:900px){.in{${gutterD}}}
.hd-in{max-width:76rem;margin:0 auto;${gutter};display:flex;justify-content:space-between;align-items:center;gap:12px;padding-block:18px}@media(min-width:900px){.hd-in{${gutterD}}}
.brand{display:grid;text-decoration:none;color:var(--ink)}.bn{font-family:var(--f-head);font-weight:500;font-size:1.5rem;line-height:1.1;white-space:nowrap}.bs{font-size:.8125rem;color:var(--muted);white-space:nowrap}
.nav-d ul{display:flex;gap:22px;list-style:none;margin:0;padding:0}.nav-d a{color:var(--ink);text-decoration:none;font-size:.9375rem}.nav-d a[aria-current]{color:var(--rose);text-decoration:underline}
.hd-r{display:flex;gap:6px;align-items:center}.nav-m ul{background:var(--card)}
.btn{display:inline-flex;align-items:center;min-height:3rem;padding:.7rem 1.6rem;background:var(--rose);color:#fff;border:0;border-radius:999px;font:inherit;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer}.btn:hover{background:var(--rose-d)}
.tl{color:var(--rose);font-weight:600}
.hero{padding-block:16px 72px;position:relative}
.hero-g{display:grid;gap:40px;align-items:center}@media(min-width:950px){.hero-g{grid-template-columns:6fr 6fr;gap:56px}}
.eb{font-size:.875rem;letter-spacing:var(--track);color:var(--muted)}
.hero h1{font-size:calc(var(--hs)*clamp(2.5rem,1.6rem + 3.2vw,4.25rem));line-height:var(--lh-h)}
.btns{display:flex;flex-wrap:wrap;gap:12px 22px;align-items:center;margin-top:18px}
.ph{margin:0;display:grid;align-content:end;padding:14px;font-size:.75rem;line-height:1.35;color:var(--muted)}
.collage{position:relative;height:clamp(26rem,52vw,36rem);max-width:36rem;width:100%;justify-self:center}
.collage .p1{position:absolute;left:0;top:0;width:58%;height:78%;border-radius:999px 999px 16px 16px;background:radial-gradient(120% 80% at 50% 20%,#f8e7e4,#e8c6c0)}
.collage .p2{position:absolute;right:0;top:18%;width:52%;height:42%;border-radius:16px;background:linear-gradient(160deg,#efd8d2,#dcb7b0)}
.collage .p3{position:absolute;right:8%;bottom:0;width:34%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 40%,#f6e2de,#e2bdb6)}
.collage .p3 figcaption{text-align:center}
.collage svg{position:absolute;color:var(--rose);opacity:.55}
.collage .s1{width:150px;left:44%;top:-24px}.collage .s2{width:120px;left:-20px;bottom:-10px;transform:scaleX(-1) rotate(10deg)}
.wave{display:block;width:100%;height:56px;color:var(--band)}
.band{background:var(--band)}
section{padding-block:clamp(48px,4vw + 24px,96px)}
.sec-h{font-size:calc(var(--hs)*clamp(2rem,1.5rem + 1.8vw,2.75rem));line-height:var(--lh-h)}
.app{display:grid;gap:24px 64px}@media(min-width:900px){.app{grid-template-columns:5fr 6fr}}
blockquote{margin:0;background:var(--card);border-radius:24px 24px 24px 4px;padding:28px;align-self:start}
blockquote p{font-family:var(--f-head);font-weight:var(--hw);font-size:calc(var(--hs)*1.75rem);line-height:1.35;margin-bottom:10px}
blockquote footer{font-size:.9375rem;color:var(--muted)}
.svc{display:grid;gap:0;max-width:60rem;margin:24px auto 0}@media(min-width:760px){.svc{grid-template-columns:1fr 1fr}.svc article:nth-child(2){margin-top:56px;margin-left:-24px}}
.svc article{background:var(--card);border-radius:24px;padding:32px;box-shadow:0 18px 40px -28px rgba(59,42,46,.35);position:relative}
.svc h3{font-size:calc(var(--hs)*1.875rem)}
.center{text-align:center}.center p{max-width:38rem;margin-inline:auto}
.chips{list-style:none;padding:0;margin:20px 0;display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.chips li{background:var(--card);padding:.35rem 1.1rem;border-radius:999px;font-family:var(--f-head);font-size:calc(var(--hs)*1.25rem)}
.meta{display:grid;gap:24px}@media(min-width:760px){.meta{grid-template-columns:1fr 1fr}}.meta>div{background:var(--card);border-radius:20px;padding:24px}.meta h3{font-size:calc(var(--hs)*1.375rem)}
.enq{display:grid;gap:36px}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:64px}}
.inc{padding-left:1.1rem}
form{display:grid;gap:14px;background:var(--card);border-radius:24px;padding:24px}label{font-size:.9375rem;font-weight:600}
input,textarea{background:#fff;border:1px solid #7D6469}
.note{font-size:.9375rem;color:var(--muted)}
.ft{padding-block:36px 56px}.ft-in{max-width:76rem;margin:0 auto;${gutter};display:grid;gap:12px}@media(min-width:800px){.ft-in{${gutterD};grid-template-columns:2fr 1fr}}.ft .bn{font-size:1.5rem;margin:0}.ft p{margin:0 0 6px}
`,
  body: () => `${head()}
<main id="main">
<section class="hero"><div class="in hero-g"><div>${T('p', 'heroEyebrow', 'class="eb"')}${T('h1', 'h1')}${T('p', 'intro')}${T('p', 'intro2')}<div class="btns"><a class="btn" href="#enquire" data-i="cta">${txt('cta')}</a><a class="tl" href="#approach" data-i="cta2">${txt('cta2')}</a></div></div>
<div class="collage">${ph('phPortrait', 'p1', 'bouquet', true)}${ph('phCeremony', 'p2', 'aisle')}${ph('phDetail', 'p3', 'hands')}${sprig('s1')}${sprig('s2')}</div></div></section>
<svg class="wave" viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true"><path fill="currentColor" d="M0 40C240 0 480 0 720 28s480 28 720-8v36H0z"/></svg>
<div class="band">
<section id="approach" style="padding-top:24px"><div class="in app"><div>${T('h2', 'approachH', 'class="sec-h"')}${T('p', 'approach1')}${T('p', 'approach2')}</div><blockquote>${T('p', 'quote')}<footer><span data-i="quoteBy">${txt('quoteBy')}</span> ${T('span', 'quoteFlag', 'class="flag"')}</footer></blockquote></div></section>
<section style="padding-top:0"><div class="in">${T('h2', 'servicesH', 'class="sec-h" style="text-align:center"')}<div class="svc">${[0, 1].map((i) => `<article>${T('h3', `services.${i}.h`)}${T('p', `services.${i}.p`)}</article>`).join('')}</div></div></section>
</div>
<svg class="wave" viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true" style="transform:scaleY(-1)"><path fill="currentColor" d="M0 40C240 0 480 0 720 28s480 28 720-8v36H0z"/></svg>
<section><div class="in center">${T('h2', 'langH', 'class="sec-h"')}${T('p', 'lang1')}${chips()}<a class="tl" href="#faq" data-i="langLink">${txt('langLink')}</a></div></section>
<section style="padding-top:0"><div class="in meta"><div>${T('h3', 'credH')}${T('p', 'cred')}<a class="tl" href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener" data-i="credLink">${txt('credLink')}</a></div><div>${T('h3', 'travelH')}${T('p', 'travel')}</div></div></section>
<section><div class="in" style="max-width:58rem">${faq()}</div></section>
<section id="enquire" class="band"><div class="in enq"><div>${T('h2', 'enqH', 'class="sec-h"')}${T('p', 'enq1')}${incList()}${T('p', 'enq2')}${T('p', 'enqNote', 'class="note"')}</div><div>${form('g')}</div></div></section>
</main>${foot()}`,
});

// ───────────────────────── 08 · Two Voices ─────────────────────────
designs.push({
  name: 'Two Voices', fonts: { head: { pkg: 'source-serif-4', weight: 600, zhAdjust: 1.03 }, ...serifTC, zhHeadW: 600, zhBodyW: 400 },
  css: `
:root{--bg:#FBF7F2;--alt:#F5EBE6;--ink:#2E2A2B;--bur:#6E1F2E;--red:#8E1B24;--muted:#575052;--r:2px}
body{background:var(--bg);color:var(--ink)}
.in{max-width:80rem;margin:0 auto;${gutter}}@media(min-width:900px){.in{${gutterD}}}
.hd-in{max-width:80rem;margin:0 auto;${gutter};display:flex;justify-content:space-between;align-items:center;gap:12px;padding-block:16px;border-bottom:1px solid var(--bur)}@media(min-width:900px){.hd-in{${gutterD}}}
.brand{display:grid;text-decoration:none;color:var(--bur)}.bn{font-family:var(--f-head);font-weight:600;font-size:1.375rem;white-space:nowrap}.bs{font-size:.8125rem;color:var(--muted);white-space:nowrap}
.nav-d ul{display:flex;gap:22px;list-style:none;margin:0;padding:0}.nav-d a{color:var(--ink);text-decoration:none;font-size:.9375rem}.nav-d a[aria-current]{color:var(--red);text-decoration:underline}
.hd-r{display:flex;gap:6px;align-items:center}.nav-m ul{background:#fff}
.btn{display:inline-flex;align-items:center;min-height:3rem;padding:.7rem 1.5rem;background:var(--red);color:var(--bg);border:0;border-radius:var(--r);font:inherit;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer}.btn:hover{background:var(--bur)}
:lang(zh) .btn{font-weight:400}
.tl{color:var(--bur);font-weight:600}:lang(zh) .tl{font-weight:400}
.duo{display:grid;gap:0;padding-block:28px 0}
@media(min-width:1000px){.duo{grid-template-columns:1fr auto 1fr;gap:0 40px;align-items:stretch}}
.voice{padding-block:12px 32px;min-width:0}
.voice .tag{display:inline-block;font-size:.8125rem;color:var(--red);border:1px solid var(--red);padding:.1rem .6rem;border-radius:999px;margin-bottom:18px}
.voice h1,.voice .h1{font-family:var(--f-head);font-weight:var(--hw);color:var(--bur);font-size:calc(var(--hs)*clamp(2.125rem,1.4rem + 2.4vw,3.25rem));line-height:var(--lh-h);margin:0 0 .5em;text-wrap:balance}
.voice p{max-width:32rem}
.voice+.voice{border-top:1px solid rgba(110,31,46,.3)}
@media(min-width:1000px){.voice+.voice{border-top:0}}
.spine{display:none}
@media(min-width:1000px){.spine{display:flex;flex-direction:column;align-items:center;gap:16px;padding-block:12px}.spine::before,.spine::after{content:"";flex:1;width:1px;background:var(--bur)}
.spine p{writing-mode:vertical-rl;text-orientation:upright;font-family:var(--zh-h),var(--zh-serif-fb),serif;font-weight:600;font-size:1.5rem;letter-spacing:.35em;color:var(--bur);margin:0}}
.ph{margin:0;display:grid;align-content:end;padding:16px;font-size:.8125rem;line-height:1.4;color:var(--muted);background:linear-gradient(170deg,#f3e6df,#e3cfc6)}
.wide{aspect-ratio:4/5;margin-top:8px}@media(min-width:700px){.wide{aspect-ratio:21/8}}
.ctaRow{display:flex;flex-wrap:wrap;gap:14px 24px;align-items:center;justify-content:center;padding-block:28px;border-bottom:1px solid rgba(110,31,46,.3)}
section{padding-block:clamp(48px,4vw + 24px,96px)}
.sec-h{color:var(--bur);font-size:calc(var(--hs)*clamp(1.875rem,1.4rem + 1.8vw,2.625rem));line-height:var(--lh-h)}
.app{display:grid;gap:24px 64px}@media(min-width:900px){.app{grid-template-columns:1fr 1fr}}
.app .ph{aspect-ratio:4/5;max-width:30rem}
.lockup li b{font-size:inherit;line-height:1.3}
blockquote{margin:0;border-left:3px solid var(--red);padding-left:20px}
blockquote p{font-family:var(--f-head);font-weight:var(--hw);color:var(--bur);font-size:calc(var(--hs)*1.75rem);line-height:1.35;margin-bottom:8px}
blockquote footer{font-size:.9375rem;color:var(--muted)}
.svc{display:grid;gap:16px;margin-top:24px}@media(min-width:700px){.svc{grid-template-columns:1fr 1fr}}
.svc article{background:#fff;border:1px solid rgba(46,42,43,.12);border-top:3px solid var(--red);padding:22px}
.svc h3{font-size:calc(var(--hs)*1.5rem);color:var(--bur)}
.alt{background:var(--alt)}
.lang-g{display:grid;gap:28px}@media(min-width:900px){.lang-g{grid-template-columns:5fr 7fr;gap:64px}}
.lockup{list-style:none;padding:0;margin:0;display:grid;gap:0;border-top:1px solid var(--bur)}
.lockup li{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:16px 0;border-bottom:1px solid var(--bur);font-family:var(--f-head);font-weight:var(--hw);color:var(--bur);font-size:calc(var(--hs)*clamp(1.5rem,1.2rem + 1.2vw,2.25rem))}
.lockup li span{font-family:var(--f-body);font-weight:400;font-size:.875rem;color:var(--muted)}
.meta{display:grid;gap:24px}@media(min-width:760px){.meta{grid-template-columns:1fr 1fr}}.meta h3{font-size:calc(var(--hs)*1.375rem);color:var(--bur)}
.enq{display:grid;gap:36px}@media(min-width:950px){.enq{grid-template-columns:5fr 6fr;gap:64px}}
.inc{padding-left:1.1rem}
form{display:grid;gap:14px}label{font-size:.9375rem;font-weight:600}
input,textarea{background:#fff;border:1px solid #7A7073}
.note{font-size:.9375rem;color:var(--muted)}
.ft{border-top:1px solid var(--bur);padding-block:36px 56px}.ft-in{max-width:80rem;margin:0 auto;${gutter};display:grid;gap:12px}@media(min-width:800px){.ft-in{${gutterD};grid-template-columns:2fr 1fr}}.ft .bn{font-size:1.5rem;color:var(--bur);margin:0}.ft p{margin:0 0 6px}
`,
  body: () => `${head()}
<main id="main">
<div class="in"><div class="duo">
  <div class="voice" lang="en"><span class="tag">English</span><h1 class="h1">${txt('h1')}</h1><p>${txt('intro')}</p></div>
  <div class="spine" aria-hidden="true"><p data-z="accent" data-zl lang="zh-Hant">言語的力量</p></div>
  <div class="voice" data-zl lang="zh-Hant"><span class="tag" data-z="langChips.1">粵語</span> <span class="tag" data-z="langChips.2">普通話</span>${Z('p', 'h1', 'class="h1" role="heading" aria-level="2"')}${Z('p', 'intro')}</div>
</div>
${ph('phCeremony', 'wide', 'chairs', true)}
<div class="ctaRow"><a class="btn" href="#enquire" data-i="cta">${txt('cta')}</a><a class="tl" href="#approach" data-i="cta2">${txt('cta2')}</a></div></div>
<section id="approach"><div class="in app"><div>${T('h2', 'approachH', 'class="sec-h"')}${T('p', 'intro2')}${T('p', 'approach1')}${T('p', 'approach2')}</div><div>${ph('phPortrait', '', 'letter')}</div></div>
<div class="in" style="margin-top:40px"><blockquote>${T('p', 'quote')}<footer><span data-i="quoteBy">${txt('quoteBy')}</span> ${T('span', 'quoteFlag', 'class="flag"')}</footer></blockquote>
<div class="svc">${[0, 1].map((i) => `<article>${T('h3', `services.${i}.h`)}${T('p', `services.${i}.p`)}</article>`).join('')}</div></div></section>
<section class="alt"><div class="in lang-g"><div>${T('h2', 'langH', 'class="sec-h"')}${T('p', 'lang1')}<a class="tl" href="#faq" data-i="langLink">${txt('langLink')}</a></div>
<ul class="lockup"><li><span data-i="langChips.0">${txt('langChips.0')}</span><b lang="en" style="font-weight:inherit">English</b></li><li><span data-i="langChips.1">${txt('langChips.1')}</span><b lang="zh-Hant" data-z="langChips.1" data-zl style="font-weight:inherit">粵語</b></li><li><span data-i="langChips.2">${txt('langChips.2')}</span><b lang="zh-Hant" data-z="langChips.2" data-zl style="font-weight:inherit">普通話</b></li></ul></div></section>
<section><div class="in meta"><div>${T('h3', 'credH')}${T('p', 'cred')}<a class="tl" href="https://celebrants.dia.govt.nz/" target="_blank" rel="noopener" data-i="credLink">${txt('credLink')}</a></div><div>${T('h3', 'travelH')}${T('p', 'travel')}</div></div></section>
<section><div class="in" style="max-width:58rem">${faq()}</div></section>
<section id="enquire" class="alt"><div class="in enq"><div>${T('h2', 'enqH', 'class="sec-h"')}${T('p', 'enq1')}${incList()}${T('p', 'enq2')}${T('p', 'enqNote', 'class="note"')}</div><div>${form('h')}</div></div></section>
</main>${foot()}`,
});

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
