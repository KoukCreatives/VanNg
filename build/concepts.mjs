// Eight concept definitions. Palettes are the KC-575 directions and fallbacks;
// none is approved by Van. Fonts are OFL families served via Fontsource.

export const palettes = {
  blush: { name: 'Blush (Van’s preference)', bg: '#FBF3F1', band: '#F3DEDA', text: '#3B2A2E', head: '#3B2A2E', muted: '#5E464C', btn: '#8E4A5A', btnHover: '#733B49', onBtn: '#FFFFFF', link: '#8E4A5A', deco: '#C9AE82', field: '#7D6469', surface: '#FFFFFF' },
  red: { name: 'Chinese lucky red (Simon’s alternative)', bg: '#FBF7F2', band: '#F5EBE6', text: '#2E2A2B', head: '#6E1F2E', muted: '#575052', btn: '#8E1B24', btnHover: '#6E1F2E', onBtn: '#FBF7F2', link: '#6E1F2E', deco: '#B8924A', field: '#7A7073', surface: '#FFFFFF' },
  roseIvory: { name: 'Rose & Ivory (gold-free fallback)', bg: '#FFFAF7', band: '#F6E4E4', text: '#2F2A2B', head: '#2F2A2B', muted: '#5A5153', btn: '#7A3E4E', btnHover: '#5F2F3C', onBtn: '#FFFFFF', link: '#7A3E4E', deco: '#C99AA3', deco2: '#8A9A86', field: '#7A7073', surface: '#FFFFFF' },
  peony: { name: 'Peony & Mocha (warmer fallback)', bg: '#FDF6F2', band: '#F2D4D2', text: '#3A2C27', head: '#3A2C27', muted: '#5C4A43', btn: '#5C4036', btnHover: '#46302A', onBtn: '#FDF6F2', link: '#5C4036', deco: '#B89A6A', field: '#7E6A62', surface: '#FFFFFF' },
};

// head: Latin display face (self-declared @font-face so we can size-adjust it for CJK lines)
// zhHead / zhBody: Fontsource package + weight (TC; SC swapped automatically on zh-Hans pages)
export const concepts = [
  {
    n: 1, slug: '01-petal-letter', name: 'Petal Letter', palette: 'blush', layout: 'center',
    head: { pkg: 'cormorant-garamond', weight: 600, zhAdjust: 1.16, label: 'Cormorant Garamond 600' },
    bodyLatin: { pkg: 'source-sans-3', weights: [400, 600], label: 'Source Sans 3 400 / 600' },
    zhHead: { tc: 'noto-serif-tc', sc: 'noto-serif-sc', weight: 600, label: 'Noto Serif TC 600' },
    zhBody: { tc: 'noto-sans-tc', sc: 'noto-sans-sc', weight: 400, label: 'Noto Sans TC 400' },
    summary: 'The brief’s starting pairing, tuned. Soft, airy and centred, with an arched portrait frame and one champagne hairline under the hero.',
    type: [
      'Cormorant’s x-height is small next to full-em CJK glyphs. English headings therefore run larger (H1 up to 68px). On Chinese pages the same file loads under a second @font-face with size-adjust: 116%, so “Van” and “Vannarady Ng” don’t shrink inside 宋體 headings.',
      'Weight 600 throughout for display. Weight 300 is never used, because it breaks up on blush.',
      'Chinese headings use Noto Serif TC 600 at about 0.7× the English size, with line-height 1.32. They read as the same rank because the CJK glyph fills the em box.',
    ],
    gold: 'One matte champagne hairline under the hero copy. It is decorative, carries no meaning, and appears once per screen.',
    risks: 'Cormorant needs the size boost to work at small sizes, so it is never used under 24px. The quote line has the most contrast. Check it with Van for “too formal”.',
    css: `
.hero { padding-top: clamp(2rem, 1rem + 4vw, 4.5rem); text-align: center; }
.hero-copy { max-width: 46rem; margin: 0 auto; }
.hero-copy p { margin-left: auto; margin-right: auto; }
.hero .btns { justify-content: center; }
.hero .hairline { display: block; width: 64px; margin: 2rem auto 0; }
.hero-fig { margin: 3rem auto 0; max-width: 26rem; border-radius: 999px 999px 6px 6px; }
@media (min-width: 900px) { :root:lang(en) { --h1: clamp(3rem, 1.6rem + 3.4vw, 4.25rem); } .hero-fig { max-width: 64rem; aspect-ratio: 16/8; border-radius: 280px 280px 6px 6px; } }
.approach .wrap, .languages .wrap { text-align: center; }
.approach p, .languages p { margin-left: auto; margin-right: auto; }
.quote { margin: 2.5rem auto 0; }
.chips { justify-content: center; }
.services h2, .enquiry h2 { text-align: center; }
@media (max-width: 699px) { :lang(zh) .hero-copy p:not(.eyebrow), :lang(zh) .approach p, :lang(zh) .languages p { text-align: start; } }
.card { text-align: center; border: 1px solid var(--line); }
.enquiry .two { align-items: start; }
`,
  },
  {
    n: 2, slug: '02-lucky-red-letter', name: 'Lucky Red Letter', palette: 'red', layout: 'center',
    head: { pkg: 'cormorant-garamond', weight: 600, zhAdjust: 1.16, label: 'Cormorant Garamond 600' },
    bodyLatin: { pkg: 'source-sans-3', weights: [400, 600], label: 'Source Sans 3 400 / 600' },
    zhHead: { tc: 'noto-serif-tc', sc: 'noto-serif-sc', weight: 600, label: 'Noto Serif TC 600' },
    zhBody: { tc: 'noto-sans-tc', sc: 'noto-sans-sc', weight: 400, label: 'Noto Sans TC 400' },
    summary: 'The fair A/B partner to Concept 1. It has the same layout, type, crop and wording, so the only variable is the colour direction. Ivory reading surfaces, burgundy headings, a lucky-red button and one short burgundy band.',
    type: [
      'The type system is identical to Concept 1, so Van compares colour only.',
      'Body text stays charcoal Source Sans and Noto Sans. Red is kept for headings, links, buttons and the short enquiry band only.',
      'No small ceremonial serif in red. The smallest burgundy serif is the 24px card heading.',
    ],
    gold: 'Matte gold appears only as the 64px hairline under the hero. There is no gold on the burgundy band.',
    risks: 'Red and gold can read as culturally coded. Do not let this direction imply a tea ceremony or other traditions Van hasn’t confirmed.',
    css: `
.hero { padding-top: clamp(2rem, 1rem + 4vw, 4.5rem); text-align: center; }
.hero-copy { max-width: 46rem; margin: 0 auto; }
.hero-copy p { margin-left: auto; margin-right: auto; }
.hero .btns { justify-content: center; }
.hero .hairline { display: block; width: 64px; margin: 2rem auto 0; }
.hero-fig { margin: 3rem auto 0; max-width: 26rem; border-radius: 999px 999px 6px 6px; }
@media (min-width: 900px) { :root:lang(en) { --h1: clamp(3rem, 1.6rem + 3.4vw, 4.25rem); } .hero-fig { max-width: 64rem; aspect-ratio: 16/8; border-radius: 280px 280px 6px 6px; } }
.approach .wrap, .languages .wrap { text-align: center; }
.approach p, .languages p { margin-left: auto; margin-right: auto; }
.quote { margin: 2.5rem auto 0; }
.chips { justify-content: center; }
.services h2, .enquiry h2 { text-align: center; }
@media (max-width: 699px) { :lang(zh) .hero-copy p:not(.eyebrow), :lang(zh) .approach p, :lang(zh) .languages p { text-align: start; } }
.card { text-align: center; border: 1px solid var(--line); }
.enquiry-intro { background: var(--head); color: var(--bg); padding: 1.75rem; border-radius: var(--radius); margin-bottom: 2rem; }
.enquiry-intro h2 { color: var(--bg); text-align: left; }
.enquiry-intro p { color: var(--bg); }
.enquiry-intro .note { color: var(--bg); opacity: 1; }
`,
  },
  {
    n: 3, slug: '03-quiet-page', name: 'Quiet Page', palette: 'blush', layout: 'split',
    head: { pkg: 'literata', weight: 500, zhAdjust: 1.0, label: 'Literata 500' },
    bodyLatin: { pkg: 'source-sans-3', weights: [400, 600], label: 'Source Sans 3 400 / 600' },
    zhHead: { tc: 'noto-serif-tc', sc: 'noto-serif-sc', weight: 500, label: 'Noto Serif TC 500' },
    zhBody: { tc: 'noto-sans-tc', sc: 'noto-sans-sc', weight: 400, label: 'Noto Sans TC 400' },
    summary: 'A calm, book-like page. Text is left-aligned, headings sit in a left column with reading text on the right, and there’s plenty of blush space. It feels less “wedding stationery” and more personal letter.',
    type: [
      'Literata replaces Cormorant. Its larger x-height and sturdier serifs match Noto Serif TC’s optical size, so mixed lines need no size-adjust (100%).',
      'The heading weight drops to 500 in both scripts. The two serifs then have similar stroke contrast and colour on the page.',
      'This is the most robust option for long Chinese paragraphs. The left-aligned, 34-character measure keeps rhythm without justification gaps.',
    ],
    gold: 'No gold at all. Rose and cocoa-plum do all the work.',
    risks: 'Can feel plain without real photography. It relies on Van’s portrait and ceremony images to carry warmth.',
    css: `
:root { --h-weight: 500; }
.hero { padding-top: clamp(2rem, 1rem + 4vw, 5rem); }
.hero-grid { display: grid; gap: 2.5rem; }
@media (min-width: 900px) { .hero-grid { grid-template-columns: 7fr 5fr; gap: 5rem; align-items: end; } }
.hero-fig { border-radius: 2px; }
.approach .wrap, .languages .wrap, .services .wrap { display: grid; gap: 1rem 4rem; }
@media (min-width: 900px) {
  .approach .wrap, .languages .wrap, .services .wrap { grid-template-columns: 4fr 7fr; }
  .approach h2, .languages h2, .services h2 { grid-row: span 4; }
}
.card { background: transparent; border-top: 1px solid var(--head); border-radius: 0; padding: 1.25rem 0 0; }
.quote { border-left: 2px solid var(--btn); padding-left: 1.25rem; }
`,
  },
  {
    n: 4, slug: '04-soft-sans', name: 'Soft Sans', palette: 'roseIvory', layout: 'cards',
    head: { pkg: 'source-sans-3', weight: 600, zhAdjust: 1.0, label: 'Source Sans 3 600' },
    bodyLatin: { pkg: 'source-sans-3', weights: [400, 600], label: 'Source Sans 3 400 / 600' },
    zhHead: { tc: 'noto-sans-tc', sc: 'noto-sans-sc', weight: 500, label: 'Noto Sans TC 500' },
    zhBody: { tc: 'noto-sans-tc', sc: 'noto-sans-sc', weight: 400, label: 'Noto Sans TC 400' },
    summary: 'All sans serif, gold-free and gentle. Rounded panels, dusty-rose and sage shapes, and an easy mobile rhythm. It’s the most practical, modern and legible direction, and the lightest to load.',
    type: [
      'One family system per script: Source Sans 3 600/400 and Noto Sans TC 500/400. Same family means the two scripts share stroke logic, so mixed lines look even.',
      'Chinese headings use 500, not 700. Noto Sans TC 700 gets dense at H1 size on mobile.',
      'Lowest font weight budget: two Latin files and two CJK weights. Fastest first render on mobile.',
    ],
    gold: 'None (Rose & Ivory fallback). Dusty rose and sage are decorative blobs only (2.35:1 and 2.88:1). They never carry text.',
    risks: 'It could feel too corporate or tech without the soft shapes and real photos. The ceremony warmth has to come from imagery and copy.',
    css: `
:root { --radius: 14px; --h-weight: 600; --h1: clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem); --h2: clamp(1.75rem, 1.4rem + 1.4vw, 2.375rem); }
:root:lang(zh) { --h-weight: 500; }
.hero { padding-top: 1rem; }
.hero-grid { display: grid; gap: 0; background: var(--band); border-radius: 28px; overflow: hidden; position: relative; }
.hero-copy { padding: 2rem 1.5rem 2.25rem; position: relative; z-index: 1; }
.hero-fig { border-radius: 0; aspect-ratio: 4/5; background: linear-gradient(160deg, #efd3d6, #f9ecea); }
@media (min-width: 900px) { .hero-grid { grid-template-columns: 1.1fr 1fr; } .hero-copy { padding: 4rem 3.5rem; align-self: center; } .hero-fig { aspect-ratio: auto; min-height: 36rem; } }
.hero .orn-blob { display: block; position: absolute; width: 220px; right: -60px; bottom: -70px; color: var(--deco); opacity: .55; }
.hero .orn-blob2 { display: block; position: absolute; width: 120px; left: -30px; top: -30px; color: var(--deco2); opacity: .4; }
.btn { border-radius: 999px; }
.card { border-radius: 20px; box-shadow: 0 1px 0 var(--line); }
.languages .wrap > div, .cred-travel .two > div { background: var(--surface); border-radius: 20px; padding: 1.75rem; }
.cred-travel { background: var(--band); }
.enquiry form { background: var(--surface); padding: 1.5rem; border-radius: 20px; }
`,
  },
  {
    n: 5, slug: '05-ink-and-petal', name: 'Ink & Petal', palette: 'peony', layout: 'ink',
    head: { pkg: 'cormorant-garamond', weight: 600, zhAdjust: 1.16, label: 'Cormorant Garamond 600' },
    bodyLatin: { pkg: 'source-sans-3', weights: [400, 600], label: 'Source Sans 3 400 / 600' },
    zhHead: { tc: 'noto-serif-tc', sc: 'noto-serif-sc', weight: 600, label: 'Noto Serif TC 600' },
    zhBody: { tc: 'noto-sans-tc', sc: 'noto-sans-sc', weight: 400, label: 'Noto Sans TC 400' },
    accent: { tc: 'lxgw-wenkai-tc', sc: 'lxgw-wenkai-tc', weight: 400, label: 'LXGW WenKai TC 400 (accent only, needs approval)' },
    summary: 'Warmer and more personal. A mocha anchor, peony band and portrait on the left. One short handwritten-feel Chinese phrase from LXGW WenKai TC opens the hero on both language pages, like a note in Van’s own hand. It isn’t her handwriting, and it isn’t a logo.',
    type: [
      'LXGW WenKai TC appears in one place only: the 4–8 character hero phrase (「言語的力量」). It’s never used for body, headings, nav or buttons. In production it would be subset to just those glyphs (≈10 KB) so it doesn’t break the two-CJK-weight budget.',
      'On English pages the same phrase sits above the H1 with lang="zh-Hant" and an English gloss for screen readers, so the bilingual identity shows on the English site too.',
      'Everything else matches Concept 1, which makes it easy to judge whether the accent adds warmth or clutter.',
    ],
    gold: 'Soft brass appears only as a short underline beneath the accent phrase. It is decorative and appears once.',
    risks: 'Handwriting-style fonts can tip into cute or cliché. Needs Simon’s and Van’s approval. The phrase wording needs fluent review, and the gloss must stay accurate.',
    css: `
.hero { padding-top: clamp(1.5rem, 1rem + 3vw, 4rem); }
.hero-grid { display: grid; gap: 2rem; }
@media (min-width: 900px) { .hero-grid { grid-template-columns: 5fr 6fr; gap: 4.5rem; align-items: center; } .hero-fig { order: -1; } }
.hero-fig { border-radius: 6px 120px 6px 6px; }
.accent { display: block; font-family: "LXGW WenKai TC", var(--f-body-zh), serif; font-size: clamp(1.625rem, 1.3rem + 1.4vw, 2.25rem); line-height: 1.3; color: var(--btn); margin: 0 0 .9rem; font-weight: 400; }
.accent::after { content: ""; display: block; width: 3.5em; height: 1px; background: var(--deco); margin-top: .5rem; }
.band-peony { background: var(--band); }
.approach { background: var(--band); }
.card { border: 1px solid var(--line); }
`,
  },
  {
    n: 6, slug: '06-red-thread', name: 'Red Thread', palette: 'red', layout: 'band',
    head: { pkg: 'noto-serif', weight: 600, zhAdjust: 1.0, label: 'Noto Serif 600' },
    bodyLatin: { pkg: 'source-sans-3', weights: [400, 600], label: 'Source Sans 3 400 / 600' },
    zhHead: { tc: 'noto-serif-tc', sc: 'noto-serif-sc', weight: 600, label: 'Noto Serif TC 600' },
    zhBody: { tc: 'noto-sans-tc', sc: 'noto-sans-sc', weight: 400, label: 'Noto Sans TC 400' },
    summary: 'A confident lucky-red direction. A short burgundy hero band with ivory type sits above the portrait, and a thin burgundy “thread” rule runs down the page, tying sections together. Reading surfaces stay ivory.',
    type: [
      'One-family harmony: Noto Serif (Latin) and Noto Serif TC were designed together, so x-height, stroke contrast and weight 600 match exactly. Mixed lines like “Vannarady Ng（Van）” need no adjustment. This is the most consistent bilingual result.',
      'The ivory H1 on burgundy is 10.37:1. The band holds only eyebrow, H1, two short paragraphs and the CTA, never long reading text.',
      'Body text stays charcoal sans on ivory, per the brief.',
    ],
    gold: 'No gold in the interface. The brief suggests letting real brass or gold objects in authorised photos supply any gold.',
    risks: 'The strongest colour presence of the eight. It may feel too bold for Van’s stated soft, feminine preference. It’s here as the red ceiling.',
    css: `
.hero { padding: 0; }
.hero-band { background: var(--head); color: var(--bg); padding: clamp(2.5rem, 1.5rem + 4vw, 5rem) 0 clamp(6rem, 4rem + 8vw, 10rem); }
.hero-band h1, .hero-band p, .hero-band .eyebrow { color: var(--bg); }
.hero-band .btn { background: var(--bg); color: var(--head); }
.hero-band .btn:hover { background: #fff; }
.hero-band .textlink { color: var(--bg); }
.hero-band :focus-visible { outline-color: var(--bg); }
.hero-figwrap { margin-top: clamp(-8rem, -3rem - 6vw, -4rem); }
.hero-fig { max-width: 60rem; aspect-ratio: 4/5; border-radius: 4px; }
@media (min-width: 900px) { .hero-fig { aspect-ratio: 16/8; } }
main { position: relative; }
@media (min-width: 1100px) { main::before { content: ""; position: absolute; left: calc(50% - 38rem); top: 0; bottom: 0; width: 1px; background: var(--head); opacity: .35; } }
.approach h2::before, .languages h2::before, .services h2::before, .enquiry h2::before { content: ""; display: block; width: 2.5rem; height: 2px; background: var(--btn); margin-bottom: 1rem; }
.card { border-top: 2px solid var(--head); border-radius: 0; }
`,
  },
  {
    n: 7, slug: '07-garden-hour', name: 'Garden Hour', palette: 'blush', layout: 'asym',
    head: { pkg: 'fraunces', weight: 500, zhAdjust: 1.04, label: 'Fraunces 500' },
    bodyLatin: { pkg: 'source-sans-3', weights: [400, 600], label: 'Source Sans 3 400 / 600' },
    zhHead: { tc: 'noto-serif-tc', sc: 'noto-serif-sc', weight: 500, label: 'Noto Serif TC 500' },
    zhBody: { tc: 'noto-sans-tc', sc: 'noto-sans-sc', weight: 400, label: 'Noto Sans TC 400' },
    summary: 'A little celebration. Asymmetric layout, a big softly rounded photo, a fine-line floral sprig in rose (not gold) and generous blush bands. Friendly and contemporary rather than formal.',
    type: [
      'Fraunces 500 has soft, slightly “wonky” serifs that feel warm and human without being script. Its x-height sits close to Noto Serif TC 500, so mixed lines need only +4%.',
      'Chinese headings stay in Noto Serif TC. Fraunces’ personality is a Latin-only feature, and forcing a quirky CJK match would be fake.',
      'Section headings are left-aligned with a short measure, which suits long Chinese headings on mobile.',
    ],
    gold: 'None. The floral line drawing uses rose at reduced opacity and is purely decorative (aria-hidden).',
    risks: 'Fraunces can look trendy if overused. Keep it to H1–H3 and the quote.',
    css: `
:root { --h-weight: 500; --radius: 10px; }
.hero { padding-top: clamp(1.5rem, 1rem + 3vw, 4rem); position: relative; overflow: hidden; }
.hero-grid { display: grid; gap: 2rem; position: relative; }
@media (min-width: 900px) { .hero-grid { grid-template-columns: 6fr 6fr; gap: 3rem; align-items: center; } .hero-copy { padding-right: 2rem; } }
.hero-fig { border-radius: 200px 200px 200px 24px; }
.orn-sprig { display: block; position: absolute; width: 140px; color: var(--btn); opacity: .45; right: 0; top: 0; }
@media (min-width: 900px) { .orn-sprig { width: 200px; right: auto; left: 43%; top: -10px; } }
.approach { background: var(--band); border-radius: 0 120px 0 0; }
.card { border-radius: 24px; }
.quote p { font-style: normal; }
.cred-travel { background: var(--band); }
`,
  },
  {
    n: 8, slug: '08-two-voices', name: 'Two Voices', palette: 'red', layout: 'lockup',
    head: { pkg: 'source-serif-4', weight: 600, zhAdjust: 1.03, label: 'Source Serif 4 600' },
    bodyLatin: { pkg: 'source-sans-3', weights: [400, 600], label: 'Source Sans 3 400 / 600' },
    zhHead: { tc: 'noto-serif-tc', sc: 'noto-serif-sc', weight: 600, label: 'Noto Serif TC 600' },
    zhBody: { tc: 'noto-sans-tc', sc: 'noto-sans-sc', weight: 400, label: 'Noto Sans TC 400' },
    summary: 'Bilingualism as the visual idea. A language lockup (English · 粵語 · 普通話) sits in the hero, and on desktop a vertical Chinese phrase in Noto Serif TC runs beside the portrait, a native CJK typographic device rather than a decoration. Ivory, burgundy and red.',
    type: [
      'Source Serif 4 and Source Sans 3 are a designed superfamily, and both sit naturally beside Noto, which comes from the same Adobe/Google CJK lineage. Sizes need only +3%.',
      'The vertical phrase uses writing-mode: vertical-rl and text-orientation: upright. It is decorative and duplicated (aria-hidden), and hidden on mobile so it can never clip.',
      'The lockup shows each language in its own script with lang attributes, so screen readers switch voice correctly.',
    ],
    gold: 'None. Burgundy fine rules only.',
    risks: 'The vertical phrase wording needs fluent review. It must stay a short, true phrase from Van’s copy, never a slogan.',
    css: `
.hero { padding-top: clamp(1.5rem, 1rem + 3vw, 4rem); }
.hero-grid { display: grid; gap: 2rem; }
@media (min-width: 900px) { .hero-grid { grid-template-columns: 6fr auto 5fr; gap: 0 2.5rem; align-items: stretch; } .hero-copy { grid-column: 1; align-self: center; } }
.hero-copy { max-width: 40rem; }
.lockup { display: flex; flex-wrap: wrap; gap: .25rem .75rem; align-items: baseline; margin: 0 0 1.25rem; padding: 0 0 .9rem; border-bottom: 1px solid var(--head); list-style: none; font-family: var(--font-head); color: var(--head); font-size: 1.125rem; }
.lockup li + li::before { content: "·"; margin-right: .75rem; color: var(--muted); }
.vert { display: none; }
@media (min-width: 900px) { .vert { display: block; writing-mode: vertical-rl; text-orientation: upright; font-family: var(--f-head-zh), var(--zh-serif-fallback), serif; font-weight: 600; font-size: 1.75rem; line-height: 1; letter-spacing: .3em; color: var(--head); border-left: 1px solid var(--head); padding-left: 1rem; margin: 0; } }
.hero-fig { aspect-ratio: 4/5; border-radius: 2px; min-width: 0; align-self: start; width: 100%; }
.hero-grid > * { min-width: 0; }
@media (min-width: 900px) { :root:lang(en) { --h1: clamp(2.5rem, 1.6rem + 2vw, 3.375rem); } }
.card { border: 1px solid var(--line); border-top: 3px solid var(--btn); border-radius: 2px; }
`,
  },
];
