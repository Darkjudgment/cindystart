const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');

const [, , svgPath, widthArg, outPath, bgArg] = process.argv;
const width = parseInt(widthArg || '4000', 10);
const svg = fs.readFileSync(svgPath, 'utf8');

const r = new Resvg(svg, {
  fitTo: { mode: 'width', value: width },
  font: {
    fontDirs: ['fonts'],
    loadSystemFonts: true,
    defaultFontFamily: 'Fredoka',
  },
  background: bgArg === 'white' ? 'rgb(255,255,255)' : undefined,
});

const png = r.render().asPng();
fs.writeFileSync(outPath, png);
console.log(`OK -> ${outPath} (${(png.length / 1024).toFixed(0)} KB, ${width}px wide)`);
