const fs = require('fs');
const sharp = require('/Users/jayasrisainikithaguthula/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const original = fs.readFileSync('public/intro/maanvi-original-saffron.svg','utf8').replace('<svg ', '<svg x="420" y="115" width="440" height="311" ');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"><rect width="1280" height="720" fill="#FFF8ED"/>${original}<g fill="#FF6A00" font-family="Kohinoor Telugu" font-size="36" font-weight="400" text-anchor="middle"><text x="640" y="500">మన మాన్వి. మన వేడుక.</text></g></svg>`;
fs.writeFileSync('public/intro/maanvi-endcard.svg',svg);
sharp(Buffer.from(svg)).png().toFile('public/intro/maanvi-endcard.png').catch(e=>{console.error(e);process.exit(1)});
