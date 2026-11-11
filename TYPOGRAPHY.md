# Van Ng: bilingual typography system (Round 1)

This system is shared by all eight concepts. Each concept changes the display faces and colour, not these rules. Each concept's `-type.html` sheet shows the scale in both scripts, long headings, a long Chinese paragraph, mixed-script lines, punctuation, numerals and calculated contrast.

## 1. Pairings explored

| # | Concept | English display | Chinese display | Body (EN / 中文) | Palette |
|---|---|---|---|---|---|
| 1 | Petal Letter | Cormorant Garamond 600 | Noto Serif TC 600 | Source Sans 3 / Noto Sans TC | Blush |
| 2 | Lucky Red Letter | Cormorant Garamond 600 | Noto Serif TC 600 | Source Sans 3 / Noto Sans TC | Lucky red |
| 3 | Quiet Page | Literata 500 | Noto Serif TC 500 | Source Sans 3 / Noto Sans TC | Blush |
| 4 | Soft Sans | Source Sans 3 600 | Noto Sans TC 500 | Source Sans 3 / Noto Sans TC | Rose & Ivory |
| 5 | Ink & Petal | Cormorant Garamond 600 (+ LXGW WenKai TC phrase) | Noto Serif TC 600 | Source Sans 3 / Noto Sans TC | Peony & Mocha |
| 6 | Red Thread | Noto Serif 600 | Noto Serif TC 600 | Source Sans 3 / Noto Sans TC | Lucky red |
| 7 | Garden Hour | Fraunces 500 | Noto Serif TC 500 | Source Sans 3 / Noto Sans TC | Blush |
| 8 | Two Voices | Source Serif 4 600 | Noto Serif TC 600 | Source Sans 3 / Noto Sans TC | Lucky red |

All of these are SIL OFL 1.1 families. The brief's licence checks cover Cormorant, Source Sans 3, Noto Serif/Sans TC/SC and LXGW WenKai TC. Literata, Fraunces, Noto Serif (Latin) and Source Serif 4 are also OFL 1.1, but Kouk needs to record those checks before any of them is chosen.

## 2. Main finding: Cormorant vs CJK optical size

Cormorant Garamond has a very small x-height (about 0.40 em). CJK ideographs fill most of the em box. At the same font-size, a Latin name inside a Chinese heading looks about two sizes smaller. There are two ways to fix this:

* **Keep Cormorant (Concepts 1, 2, 5).** English headings run larger: H1 is up to 68px and nothing in Cormorant goes below 24px. On Chinese pages the same Latin file is re-declared as `HeadLatinZh` with `size-adjust: 116%`. "Vannarady Ng" and "Van" then sit at the same visual size as 宋體 glyphs. Elements tagged `lang="en"` inside Chinese pages, like the wordmark, reset to the unadjusted face.
* **Choose a Latin serif with CJK-friendly proportions (Concepts 3, 6, 7, 8).** Literata, Noto Serif and Source Serif 4 need 0–4% adjustment. Noto Serif plus Noto Serif TC (Concept 6) is the most consistent pair because they were designed as one system.

My recommendation for Round 2 is to keep both routes until Van reacts. If she loves the soft, luxurious feel of the poster, Concept 1/2's tuned Cormorant is right. If readability and calm matter more, Concept 3 or 6.

## 3. Scale

| Role | English | Chinese |
|---|---|---|
| H1 | 38 → 64px (Cormorant concepts up to 68px), lh 1.08 | 30 → 46px, lh 1.32 |
| H2 | 32 → 44px, lh 1.12 | 24 → 34px, lh 1.38 |
| H3 | 24px, lh 1.3 | 21px, lh 1.3 |
| Body | 17px mobile / 18px desktop, lh 1.6, weight 400 (600 for labels and links) | 16px mobile / 17px desktop, lh 1.8, weight 400 |
| Measure | ~36rem | ~34rem (about 32–34 characters) |

* Chinese display sizes are about 0.7× English. Because the glyph fills the em box, they read as the same rank.
* Chinese `letter-spacing: normal` everywhere, including headings, nav and buttons. The only exception is +0.02em on button labels.
* Headings use `text-wrap: balance`, and paragraphs use `text-wrap: pretty`. Chinese uses `line-break: strict` so closing punctuation never starts a line. Long-heading tests in the type sheets wrap with no single-character orphans at 390px.
* There are no fixed-height boxes. Cards, bands and buttons grow with their text.

## 4. Weights, synthesis and emphasis

* `font-synthesis: none` is set on `html`, so there is no faux bold or faux italic. Chinese has no italics at all.
* Each concept loads two CJK weights (heading + body). Chinese body has one weight, so `<strong>` in Chinese uses the heading colour instead of bold. Labels, buttons and nav links in Chinese use weight 400.
* Cormorant weight 300 is never used, and no Cormorant text appears below 24px.
* LXGW WenKai TC (Concept 5 only) is limited to one short phrase. In production, subset it to just those glyphs (about 10 KB). If it isn't approved, drop it and the concept still works.

## 5. Stacks and fallbacks

```css
--font-head: var(--f-head-latin), var(--f-head-zh), Georgia, "Songti TC", "PMingLiU", "MingLiU", "Noto Serif CJK TC", serif;
--font-body: var(--f-body-latin), var(--f-body-zh), "Segoe UI", system-ui, "PingFang TC", "Microsoft JhengHei", "Noto Sans CJK TC", sans-serif;
/* zh-Hans swaps: Noto Serif SC / Noto Sans SC, "Songti SC", "SimSun", "PingFang SC", "Microsoft YaHei" */
```

Latin comes first, then the CJK web font, then system CJK, then generic. I checked the pages with every web-font request blocked (`screens/fallback/`). The layout holds, nothing clips, and headings re-wrap cleanly. There is a visible but acceptable swap on load.

## 6. Loading plan (mobile)

* Preload only the Latin display face (latin subset, one weight).
* Load Source Sans 3 as latin + latin-ext (for macrons in te reo Māori).
* Load CJK as Fontsource unicode-range slices (around 100 per weight). The browser fetches only the slices for characters on the page. English pages fetch only the few slices needed for the "繁體中文" switch label.
* Use `font-display: swap` throughout.
* For WordPress production, self-host the same WOFF2 slices in the child theme via `theme.json` `fontFace`. The concepts point at jsDelivr only so they can be browsed without a build. Don't install a font plugin without approval.

## 7. Language switch and mixed-script details

* The switch is visibly labelled and always shows both names in their own scripts: "English" and "繁體中文" (or "简体中文"). Each has `lang` and `hreflang`, and the current one is marked with `aria-current`.
* Every Latin run inside Chinese copy has a space on each side (我是 Vannarady Ng，…). That follows Taiwan and Hong Kong web convention. The reviewer should confirm house style. `text-autospace` is set as progressive enhancement.
* Numerals: Arabic numerals with spaces, as in 2027 年 3 月 20 日.
* Chinese text uses full-width punctuation ，。、「」（）, and English uses Latin punctuation. Brackets around Latin terms in Chinese use full-width （Rangitoto Island）.
* The name is "Vannarady Ng" / "Van" in Latin script on every language page. There is no Chinese name (confirmed on KC-576).

## 8. Colour and gold rules applied

* Every text pair has at least 4.5:1 contrast. Each `-type.html` sheet calculates it from the tokens. Field borders are at least 3:1 against white.
* Gold or champagne appears at most once per screen, as a matte hairline (Concepts 1, 2, 5). There's no gold text, gradients, foil, glow, ring clip-art, gold focus rings, gold borders or gold icons. Five of the eight concepts use no gold at all.
* In the red concepts, body text is charcoal sans serif. Red is limited to headings, links, buttons and short bands.
