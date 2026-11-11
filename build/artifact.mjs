// Builds dist/index.html (board fragment for claude.ai Artifact hosting) and dist/typography.html.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const { marked } = createRequire(import.meta.url)('/opt/npm-tools/node_modules/marked');
const GF = 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600&family=Noto+Sans+TC:wght@400&display=swap';
let b = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const head = b.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/<meta charset[^>]*>|<meta name="viewport"[^>]*>|<meta name="robots"[^>]*>/g, '').replace(/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr[^>]*>/g, '');
const body = b.match(/<body>([\s\S]*?)<\/body>/)[1];
let frag = `<title>Van Ng Website Concepts</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<link rel="stylesheet" href="${GF}">\n` + head.replace(/<title>[^<]*<\/title>/, '') + body;
frag = frag.replace('.wrap{max-width:84rem;margin:0 auto;padding:0 16px}@media(min-width:900px){.wrap{padding:0 40px}}',
  '.wrap{max-width:84rem;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}@media(min-width:900px){.wrap{padding-left:max(40px,env(safe-area-inset-left,0px));padding-right:max(40px,env(safe-area-inset-right,0px))}}');
fs.writeFileSync(path.join(ROOT, 'dist/index.html'), frag);
const md = marked.parse(fs.readFileSync(path.join(ROOT, 'TYPOGRAPHY.md'), 'utf8'));
const typo = `<!doctype html><html lang="en-NZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Typography system · Van Ng concepts</title>
<link rel="stylesheet" href="${GF}">
<style>body{margin:0;background:#f7f4f2;color:#232022;font:400 17px/1.65 "Source Sans 3","Noto Sans TC",system-ui,sans-serif;font-synthesis:none}
main{max-width:52rem;margin:0 auto;padding:40px max(16px,env(safe-area-inset-right,0px)) 80px max(16px,env(safe-area-inset-left,0px))}
h1{font-size:2.25rem;line-height:1.15;text-wrap:balance}h2{font-size:1.375rem;margin-top:2.5rem}a{color:#7a3e4e}
table{border-collapse:collapse;display:block;overflow-x:auto;font-size:.9375rem}th,td{text-align:left;padding:.45rem .9rem .45rem 0;border-bottom:1px solid #e2dcd9;vertical-align:top}
pre{background:#fff;border:1px solid #e2dcd9;border-radius:6px;padding:1rem;overflow-x:auto;font-size:.8125rem}code{font-size:.875em}
.back{font-size:.9375rem}</style></head><body><main><p class="back"><a href="index.html">← All concepts</a></p>${md}</main></body></html>`;
for (const f of ['dist/typography.html', 'typography.html']) fs.writeFileSync(path.join(ROOT, f), typo);
console.log('artifact board + typography written');
