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
  conceptTag: 'Concept preview · draft copy · sample images',
  phPortrait: 'Sample image', phCeremony: 'Sample image', phDetail: 'Sample image',
  quoteFlag: '', formFlag: '',
  services: [EN0.services[0], { h: 'Civil unions', p: 'Personalised civil union ceremonies, prepared with the same care for your story and your words.' }],
  privacy: 'Your details are only used to reply to your enquiry and prepare a quote.',
  privacyLink: 'Privacy notice',
  footContact: 'Auckland, New Zealand · Enquiries via the form',
  credLink: 'Find my listing on Celebrants Online',
  faqH: 'Questions before enquiring',
  faq: [
    ['Which languages do you offer?', 'I offer personalised wedding ceremonies in English, Cantonese and Mandarin. For a ceremony in more than one language, tell me what you have in mind and we can talk it through.'],
    ['Where do you hold ceremonies?', 'East, central and west Auckland, the North Shore, Rangitoto Island, Hamilton and the South Island. Travel costs apply outside Auckland.'],
    ['How much does a ceremony cost?', 'Every ceremony is different, so I’ll put together a quote for yours once I know your date, location and plans.'],
    ['Do you offer civil union ceremonies?', 'Yes. I’m registered as a marriage and civil union celebrant, and civil union ceremonies are personalised in the same way.'],
    ['Does an enquiry hold our date?', 'No. Sending an enquiry doesn’t reserve your date. Availability and booking arrangements are confirmed separately.'],
    ['Does a ceremony include legal advice?', 'No. When I’m your celebrant, I’m there as your celebrant only, so a ceremony booking doesn’t include legal advice.'],
  ],
  ribbon: 'Personalised ceremonies in English, Cantonese and Mandarin · Auckland, Hamilton and the South Island',
  big1: 'Your story,', big2: 'in your words.',
  chooseH: 'Plan your ceremony', chooseLang: 'Which languages will your guests speak?', chooseArea: 'Where are you getting married?',
  areas: ['Auckland', 'North Shore', 'Rangitoto Island', 'Hamilton', 'South Island', 'Not sure yet'],
  chooseBtn: 'Request a quote', chooseNote: 'Your choices are added to the enquiry form below.',
  more: 'Read more', scroll: 'Scroll',
  pv: {
    title: 'Privacy notice', note: 'Draft for review · not legal advice',
    intro: 'This notice explains how Vannarady Ng (“Van”) collects and uses personal information through this website, in line with the New Zealand Privacy Act 2020.',
    s: [
      ['What I collect', 'Only the details you choose to send through the enquiry form: your name, email address, preferred date, venue or area, ceremony languages and your message.'],
      ['Why I collect it', 'To reply to your enquiry, prepare a quote and, if you go ahead, plan your ceremony with you. I don’t use your details for marketing, and I never sell them.'],
      ['Who can see it', 'Only me. The website’s hosting and email providers store and deliver enquiries on my behalf and can’t use them for anything else.'],
      ['How long I keep it', 'Only for as long as it’s needed for the purposes above, or as the law requires. You can ask me to delete it sooner.'],
      ['Your rights', 'You can ask to see or correct the information I hold about you at any time through the enquiry form. If you’re not satisfied with my response, you can contact the Office of the Privacy Commissioner at privacy.org.nz.'],
      ['Cookies', 'This website doesn’t use advertising or tracking cookies.'],
    ],
    updated: 'Last updated: November 2026 (draft)', back: '← Back to home',
  },
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
  conceptTag: '概念預覽 · 中文為排版測試草稿 · 示意圖片',
  phPortrait: '示意圖片', phCeremony: '示意圖片', phDetail: '示意圖片',
  quoteFlag: '', formFlag: '',
  services: [ZH0.services[0], { h: '民事結合', p: '同樣用心、以你們的故事和言語為中心的個人化民事結合儀式。' }],
  privacy: '你提供的資料只會用於回覆查詢及準備報價。',
  privacyLink: '私隱聲明',
  footContact: '紐西蘭奧克蘭 · 歡迎透過表格查詢',
  faqH: '查詢前的常見問題',
  faq: [
    ['你提供哪些語言的儀式？', '我以英語、粵語及普通話主持個人化婚禮儀式。如果儀式需要使用多於一種語言，請告訴我你們的想法，我們可以一起商量。'],
    ['你在哪些地區主持儀式？', '奧克蘭東區、中區及西區、北岸、朗伊托托島（Rangitoto Island）、漢密爾頓及南島。奧克蘭以外地區需另收交通費用。'],
    ['儀式收費是多少？', '每場儀式都不一樣。了解你們的日期、地點和計劃後，我會為你們準備一份報價。'],
    ['你主持民事結合儀式嗎？', '是的。我是已登記的婚姻及民事結合證婚人，民事結合儀式同樣會度身設計。'],
    ['提出查詢會預留日期嗎？', '不會。提出查詢並不代表已預留日期，檔期及預約安排須另行確認。'],
    ['儀式包括法律意見嗎？', '不包括。擔任你們的證婚人時，我的角色只是證婚人，因此預約儀式並不包括法律意見。'],
  ],
  ribbon: '以英語、粵語及普通話主持個人化儀式 · 奧克蘭、漢密爾頓及南島',
  big1: '你們的故事，', big2: '用你們的言語。',
  chooseH: '籌劃你們的儀式', chooseLang: '你們的賓客使用哪些語言？', chooseArea: '你們在哪裡舉行婚禮？',
  areas: ['奧克蘭', '北岸', '朗伊托托島', '漢密爾頓', '南島', '尚未決定'],
  chooseBtn: '索取報價', chooseNote: '你的選擇會自動填入下方的查詢表格。',
  more: '了解更多', scroll: '向下瀏覽',
  pv: {
    title: '私隱聲明', note: '草稿 · 待審閱 · 並非法律意見',
    intro: '本聲明說明 Vannarady Ng（Van）如何根據紐西蘭《2020 年私隱法》透過本網站收集及使用個人資料。',
    s: [
      ['我收集甚麼資料', '只限你透過查詢表格提供的資料：姓名、電郵地址、心儀日期、場地或地區、儀式語言及留言。'],
      ['收集資料的目的', '用於回覆你的查詢、準備報價，以及在你決定預約後與你一起籌劃儀式。我不會把你的資料用於推廣，也絕不會出售。'],
      ['誰可以看到資料', '只有我本人。網站的寄存及電郵服務供應商代我儲存及傳送查詢，不能作其他用途。'],
      ['資料保存多久', '只會在上述用途所需期間或法律要求的期間內保存。你亦可以要求我提早刪除。'],
      ['你的權利', '你可隨時透過查詢表格要求查閱或更正我所持有的個人資料。如對我的回覆不滿意，可聯絡私隱專員辦公室（privacy.org.nz）。'],
      ['Cookies', '本網站不使用廣告或追蹤 cookies。'],
    ],
    updated: '最後更新：2026 年 11 月（草稿）', back: '← 返回首頁',
  },
};
const en = { ...EN0, ...extraEN };
const zhHant = { ...ZH0, ...extraZH };
const t2s = OpenCC.Converter({ from: 'tw', to: 'cn' });
const deep = (o) => typeof o === 'string' ? t2s(o) : Array.isArray(o) ? o.map(deep) : (o && typeof o === 'object') ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, deep(v)])) : o;
const zhHans = { ...deep(zhHant), conceptTag: '概念预览 · 简体为字体测试（由繁体自动转换）· 示意图片' };

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
  for (const [pkg, file] of f.extra || []) tags.push(`<link rel="stylesheet" href="${cdn(pkg, file)}">`);
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
.flag:empty{display:none}
.rv.pre{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s ease}.rv.pre.in{opacity:1;transform:none}
.ph{position:relative;overflow:hidden;margin:0;background:#e9dedb}
.ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.ph .badge{position:absolute;left:10px;bottom:10px;z-index:1;font:500 11px/1.3 "Source Sans 3","Noto Sans TC",system-ui,sans-serif;letter-spacing:.04em;color:#2e2a2b;background:rgba(255,255,255,.82);padding:3px 8px;border-radius:999px}
.faq h2{font-size:calc(var(--hs)*clamp(1.875rem,1.4rem + 1.6vw,2.5rem));line-height:var(--lh-h);margin-bottom:.8em}
.faq details{border-bottom:1px solid color-mix(in srgb,currentColor 18%,transparent);padding:2px 0}
.faq details:first-of-type{border-top:1px solid color-mix(in srgb,currentColor 18%,transparent)}
.faq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:16px;align-items:baseline;padding:16px 0;font-weight:600}
:lang(zh) .faq summary{font-weight:400}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";font-size:1.25rem;line-height:1;opacity:.7}
.faq details[open] summary::after{content:"–"}
.faq details p{margin:0 0 18px;max-width:46rem}
.ft a,.note a{color:inherit}
input,textarea{font:inherit;font-size:1rem;width:100%;min-height:3rem;padding:.7rem .85rem;border-radius:var(--r,4px);color:inherit}
textarea{min-height:7rem;resize:vertical}
`;
}

// ---------- partials ----------
export const navList = (cls = '') => `<ul class="${cls}">${DICT.en['nav.0'] ? [0, 1, 2, 3, 4, 5].map((i) => `<li><a href="${['#main', '#approach', '#ceremonies', '#languages', '#faq', '#enquire'][i]}" data-i="nav.${i}"${i === 0 ? ' aria-current="page"' : ''}>${txt(`nav.${i}`)}</a></li>`).join('') : ''}</ul>`;
export const langSwitch = () => `<div class="ls" role="group" aria-label="Language"><span class="ls-l" data-i="langSwitch">${txt('langSwitch')}</span><button type="button" data-lang="en" lang="en" aria-pressed="true">English</button><button type="button" data-lang="hant" lang="zh-Hant" aria-pressed="false">繁體中文</button><button type="button" data-lang="hans" lang="zh-Hans" aria-pressed="false">简体<span class="t" lang="en"> test</span></button></div>`;
export const mobileNav = () => `<details class="nav-m"><summary data-i="menu">${txt('menu')}</summary>${navList()}</details>`;
export const brand = (cls = 'brand') => `<a class="${cls}" href="#"><span class="bn" lang="en">Vannarady Ng</span><span class="bs" data-i="brandSub">${txt('brandSub')}</span></a>`;
export const form = (idp = 'f') => `<p><span class="flag" data-i="formFlag">${txt('formFlag')}</span></p>
<form onsubmit="event.preventDefault()" aria-describedby="${idp}-priv">
${[0, 1, 2, 3, 4].map((i) => `<div class="field"><label for="${idp}${i}" data-i="fields.${i}.0">${txt(`fields.${i}.0`)}</label><input id="${idp}${i}" type="${DICT.en[`fields.${i}.1`]}"${DICT.en[`fields.${i}.2`] ? ` placeholder="${esc(DICT.en[`fields.${i}.2`])}" data-ip="fields.${i}.2"` : ''}></div>`).join('\n')}
<div class="field"><label for="${idp}m" data-i="msg">${txt('msg')}</label><textarea id="${idp}m"></textarea></div>
<div><button class="btn" type="submit" data-i="submit">${txt('submit')}</button></div>
<p class="note" id="${idp}-priv">${T('span', 'privacy')} <a href="privacy.html" data-i="privacyLink">${txt('privacyLink')}</a></p>
</form>`;
export const incList = (cls = 'inc') => `<ul class="${cls}">${[0, 1, 2].map((i) => `<li data-i="inc.${i}">${txt(`inc.${i}`)}</li>`).join('')}</ul>`;
export const chips = (cls = 'chips') => `<ul class="${cls}">${[0, 1, 2].map((i) => `<li data-i="langChips.${i}">${txt(`langChips.${i}`)}</li>`).join('')}</ul>`;
// Sample images: Unsplash License (free to use), hotlinked from images.unsplash.com. Replace with Van's authorised photos.
export const IMG = {
  arch: ['1763560836989-d3636e2f82d8', 'Floral wedding arch and white chairs with hills behind'],
  aisle: ['1769812344081-92b3e2ac39c0', 'Garden aisle lined with flowers and chairs for an outdoor ceremony'],
  chairs: ['1759954644836-a57275881ded', 'White chairs and an arch set up on a lawn for a ceremony'],
  peonies: ['1616148037989-4c3a9946a514', 'Soft pink peonies in a glass vase'],
  bouquet: ['1563241527-3004b7be0ffd', 'Blush roses and greenery in a wrapped bouquet'],
  bloom: ['1482715091246-822e47d61e1c', 'Close-up of pink peonies and greenery'],
  hands: ['1684244276932-6ae853774c4d', 'A couple’s hands with wedding rings resting on a bouquet'],
  hold: ['1519657502999-ab785d28a1f6', 'A couple holding hands during a ceremony'],
  watch: ['1465495976277-4387d4b0b4c6', 'A couple holding hands over a bouquet'],
  lake: ['1556878516-61356c874f03', 'A calm alpine lake framed by hills and mountains'],
  alps: ['1571503929253-cc2ca9c4f27c', 'A blue lake between tussock hills and mountain ranges'],
  lawn: ['1597906320579-c52635ac2b32', 'Rows of white chairs on a lakeside lawn set for a ceremony'],
  pier: ['1637966072667-cecba8076231', 'A long aisle of white chairs leading to a small pavilion by the water'],
  officiant: ['1781686765618-1d4e4e8cece7', 'A couple exchanging vows with a celebrant, seen from above'],
  table: ['1750735677308-34756dc5e821', 'A long reception table with candles and flowers'],
  candles: ['1751257567128-a90534b263e6', 'A table glowing with candles and warm flowers'],
  veil: ['1781355480278-b2ce53e5dae1', 'A long veil spreading across the floor, seen from above, in black and white'],
  vows: ['1694432268173-012872750de3', 'A fountain pen resting on a handwritten note'],
  letter: ['1529066576253-91dff6dbeba3', 'A handwritten envelope beside dried flowers'],
};
const u = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
export const ph = (key, cls = '', img = 'peonies', eager = false, sizes) => { const [id, alt] = IMG[img]; const sz = sizes || (eager ? '100vw' : '(min-width: 900px) 60vw, 100vw'); const ws = [640, 1080, 1600, 2400, 3200]; return `<figure class="ph ${cls}"><img src="${u(id, 1600)}" srcset="${ws.map((w) => `${u(id, w)} ${w}w`).join(', ')}" sizes="${sz}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"><figcaption class="badge" data-i="${key}">${txt(key)}</figcaption></figure>`; };
export const faq = (cls = 'faq') => `<div class="${cls}" id="faq">${T('h2', 'faqH')}${[0, 1, 2, 3, 4, 5].map((i) => `<details${i === 0 ? ' open' : ''}><summary data-i="faq.${i}.0">${txt(`faq.${i}.0`)}</summary>${T('p', `faq.${i}.1`)}</details>`).join('')}</div>`;

// ---------- page shell ----------
export function page({ n, name, fonts, css, body }) {
  return `<!doctype html>
<html lang="en-NZ">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${n ? `Home ${String(n).padStart(2, '0')} · ` : ''}${name} · Van Ng concepts</title>
<meta name="robots" content="noindex, nofollow">
${fontHead(fonts)}
<style>${core(fonts)}${css}</style>
</head>
<body>
<a class="skip" href="#main" data-i="skip">${txt('skip')}</a>
<div class="ctag" lang="en"><span>${n ? `Home ${String(n).padStart(2, '0')} · ` : ''}${name} — <span data-i="conceptTag">${txt('conceptTag')}</span></span><span><a href="index.html">All 8 designs</a> · ${n === 0 ? '' : n > 1 ? `<a href="Home-${String(n - 1).padStart(2, '0')}.html">← Prev</a> · ` : ''}${n > 0 && n < 8 ? `<a href="Home-${String(n + 1).padStart(2, '0')}.html">Next →</a>` : ''}</span></div>
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
if(history.replaceState)history.replaceState(null,'',k==='en'?location.pathname:'#'+(k==='hant'?'zh-hant':'zh-hans'));document.querySelectorAll('a[href$=".html"]').forEach(function(a){a.href=a.getAttribute('href').split('#')[0]+(k==='en'?'':'#'+(k==='hant'?'zh-hant':'zh-hans'));});}
document.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(b){set(b.getAttribute('data-lang'));}});
document.documentElement.classList.add('js');if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});document.querySelectorAll('.rv').forEach(function(el){if(el.getBoundingClientRect().top<innerHeight)el.classList.add('in');else{el.classList.add('pre');io.observe(el);}});}
[['servicesH','ceremonies'],['langH','languages']].forEach(function(p){var el=document.querySelector('[data-i="'+p[0]+'"]');if(el&&!document.getElementById(p[1]))el.id=p[1];});
var h=location.hash;if(h==='#zh-hant')set('hant');else if(h==='#zh-hans')set('hans');
})();
</script>
</body>
</html>`;
}
// Always-Chinese text (follows Traditional/Simplified choice): used by Home-08's parallel hero.
export const Z = (tag, key, attrs = '') => `<${tag} data-z="${key}"${attrs ? ' ' + attrs : ''}>${flags(DICT.hant[key])}</${tag}>`;
