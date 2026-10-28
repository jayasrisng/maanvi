// Local React rendering checks. These do not open a browser or send site code away.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root=path.resolve(import.meta.dirname,'..');
const nativeRequire=createRequire(import.meta.url),cache=new Map();
function load(file) {
  if(file.endsWith('.css'))return {};
  if(file.endsWith('.json'))return JSON.parse(fs.readFileSync(file,'utf8'));
  if(cache.has(file))return cache.get(file).exports;
  const mod={exports:{}};cache.set(file,mod);
  const source=fs.readFileSync(file,'utf8').replace(/import\.meta\.env/g,'({})');
  const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText;
  const requireLocal=specifier=>{
    if(!specifier.startsWith('.'))return nativeRequire(specifier);
    const base=path.resolve(path.dirname(file),specifier);
    const target=[base,base+'.tsx',base+'.ts',base+'.json'].find(candidate=>fs.existsSync(candidate)&&fs.statSync(candidate).isFile());
    assert.ok(target,`Missing ${specifier}`);return load(target);
  };
  new Function('require','module','exports',code)(requireLocal,mod,mod.exports);
  return mod.exports;
}
let language='en',width=1440,reduced=false;
globalThis.localStorage={getItem:key=>key==='maanvi.language'?language:null};
globalThis.matchMedia=query=>({matches:query.includes('max-width')?width<=760:reduced});
const {default:App}=load(path.join(root,'src/App.tsx'));
const routes=['/','/archive','/book','/bridal','/saree-guide','/private-shopping','/our-story','/visit','/contact','/services','/company','/careers','/shipping','/returns','/privacy','/terms','/cookies'];
let renders=0;
for(width of [320,375,390,430,760,1024,1440])for(language of ['en','te'])for(const route of routes) {
  globalThis.location=new URL('http://localhost'+route+'?intro=0');
  const html=renderToStaticMarkup(React.createElement(App));
  assert.ok(html.includes('main-content'),`${route}: missing content`);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${route}: expected one h1`);
  for(const [,asset]of html.matchAll(/(?:src|href)="(\/(?:images|intro|logo)\/[^"?]+)(?:\?[^\"]*)?"/g))assert.ok(fs.existsSync(path.join(root,'public',asset)),`Missing ${asset}`);
  if(route==='/') {
    if(width<=760) {
      assert.ok(html.includes('data-layout="panels"'));
      assert.equal((html.match(/class="flow-panel-image"/g)||[]).length,3);
      const photos=[...html.matchAll(/class="flow-panel-image" src="([^"]+)"/g)].map(match=>match[1]);
      assert.equal(new Set(photos).size,photos.length,'Repeated homepage photo');
      assert.ok(!html.includes('class="flow-scene"'));
      assert.ok(!html.includes('visibility:hidden'));
      assert.ok(html.includes('id="cloth"')&&html.includes('id="silk"'));
    } else assert.ok(html.includes('data-layout="cinematic"'));
    assert.ok(html.includes('10-living-classics-finale.webp'));
  }
  if(route==='/our-story') { assert.ok(!html.includes('id="meet"')); assert.ok(!html.includes('id="visit"')); }
  if(route==='/private-shopping') assert.ok(!html.includes('/images/story/founders.jpg'));
  if(route==='/archive') assert.ok(!html.includes('book-thumbnails'));
  renders++;
}
reduced=true;width=1440;globalThis.location=new URL('http://localhost/?intro=0');
assert.ok(renderToStaticMarkup(React.createElement(App)).includes('data-layout="panels"'));
console.log(`Local render checks passed: ${renders} bilingual page/width combinations plus reduced motion. Visual browser review is separate.`);
