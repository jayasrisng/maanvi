import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const exists = name => fs.existsSync(path.join(root, name));
const walk = directory => fs.readdirSync(path.join(root, directory), {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]);
const sourceFiles = walk('src');
for (const file of sourceFiles.filter(name => /\.(tsx?|css)$/.test(name))) {
  const text = read(file);
  if (file.endsWith('.css')) {
    for (const [,target] of text.matchAll(/@import\s+['"]([^'"]+)['"]/g)) if (target.startsWith('.')) assert.ok(exists(path.join(path.dirname(file),target)), `${file}: missing ${target}`);
  } else {
    const imports = ts.preProcessFile(text).importedFiles;
    for (const {fileName:target} of imports.filter(item => item.fileName.startsWith('.'))) {
      const base = path.join(path.dirname(file),target);
      assert.ok(['','.ts','.tsx','.json'].some(extension => exists(base+extension)), `${file}: missing import ${target}`);
    }
  }
  for (const [,asset] of text.matchAll(/["'(](\/(?:images|intro|logo)\/[^"')?]+)(?:\?[^"')]+)?["')]/g)) assert.ok(exists(`public${asset}`), `${file}: missing public asset ${asset}`);
}
const catalogue = JSON.parse(read('src/data/photobook.json'));
assert.equal(catalogue.length,20);
const pictures = catalogue.flatMap(chapter => chapter.images);
assert.equal(pictures.length,196);
for (const picture of pictures) {
  for (const key of ['src','thumbnail']) assert.ok(exists(`public${picture[key]}`), `Missing ${picture[key]}`);
  assert.ok(exists(picture.source), `Missing image master ${picture.source}`);
}
const fall = catalogue.find(chapter => chapter.id === '2026-fall');
assert.equal(fall.images.length,10);
const intro = read('src/components/MaanviIntro.tsx');
assert.ok(!intro.includes('Skip intro') && !intro.includes('maanvi-intro-skip'));
assert.ok(intro.includes('ref={homeButton}'));
assert.ok(read('src/App.tsx').includes('const [introSound, setIntroSound] = useState(true)'));
assert.ok(read('src/components/maanvi-intro-assets.ts').includes('/intro/maanvi-supplied-source.mp4'));
assert.ok(!read('src/components/maanvi-intro-assets.ts').includes('localStorage'));
assert.ok(read('src/components/FlowingStory.tsx').includes('const stacked = mobile || reduced || paused'));
assert.ok(read('src/components/FlowingStory.tsx').includes('{!stacked && <TextileFlowScene'));
assert.ok(!read('src/styles/mobile.css').includes('filter:blur'));
assert.ok(read('src/styles/mobile.css').includes('.flow-copy::before,.flow-copy::after { content:none; }'));
const tokens = JSON.parse(read('brand-kit/tokens.json'));
for (const color of Object.values(tokens.colors)) assert.ok(read('brand-kit/tokens.css').includes(color), `CSS missing canonical colour ${color}`);
for (const color of ['sindoor','ivory','maroon']) {
 const originalPaths = [...read('brand-kit/logos/maanvi-original-supplied.svg').matchAll(/\bd="([^"]+)"/g)].map(match=>match[1]);
 const exportPaths = [...read(`brand-kit/logos/maanvi-${color}.svg`).matchAll(/\bd="([^"]+)"/g)].map(match=>match[1]);
 assert.deepEqual(exportPaths,originalPaths, `Changed logo geometry in ${color}`);
}
for (const retired of ['src/pages','src/App.css','src/heritage.css','src/atelier.css','src/woven.css','docs/site-history','public/intro/maanvi-runway-draft.mp4']) assert.ok(!exists(retired), `Retired website file remains: ${retired}`);
console.log(`Site checks passed: ${sourceFiles.length} source files; 20 chapters / 196 pictures and masters; original intro, mobile panels and exact-logo exports verified.`);
