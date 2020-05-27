// // Fontagon
// // Code to generate font kit from SVGs

// const Fontagon = require('fontagon');

// Fontagon({
//   files: ['properties/assets/icons/*.svg'],
//   dist: 'fontagon-test-2/',
//   fontName: 'test-icons',
//   style: 'css',
// })
//   .then((opts) => {
//     console.log('done! ', opts);
//   })
//   .catch((err) => {
//     console.log('fail! ', err);
//   });

// // SVGIcons2SVGFont
// // Code to generate individual unicode values OR font kit more granularly

// const SVGIcons2SVGFontStream = require('svgicons2svgfont');

const fs = require('fs').promises;
const fsdefault = require('fs');

// const fontStream = new SVGIcons2SVGFontStream({
//   fontName: 'neo-icons',
// });

// // Setting the font destination

// fontStream
//   .pipe(fs.createWriteStream('svg2font-test/neo-icons.svg'))
//   .on('finish', function () {
//     console.log('Font successfully created!');
//   })
//   .on('error', function (err) {
//     console.log(err);
//   });

// // Writing glyphs

// const glyph1 = fs.createReadStream('properties/assets/icons/accounts.svg');

// glyph1.metadata = {
//   unicode: ['\f001'],
//   name: 'accounts',
// };

// fontStream.write(glyph1);

// fontStream.end();

// icon-font-generator (npx icon-font-generator)

// CLI tool to generator icon fonts
// -o, --out        Output icon font set files to <out> directory
// -n, --name       Name to use for generated fonts and files (Default: icons)
// -s, --silent     Do not produce output logs other than errors (Default: false)
// -f, --fontspath  Relative path to fonts directory to use in output files (Default: ./)
// -c, --css        Generate CSS file if true (Default: true)
// --types          Comma delimited list of font types (Defaults to svg,ttf,woff,eot)
// --csspath        CSS output path (Defaults to <out>/<name>.css)
// --cssfontsurl    CSS fonts directory url (Defaults to relative path)
// --csstp          CSS handlebars template path (Optional)
// --html           Generate HTML preview file if true (Default: true)
// --htmlpath       HTML output path (Defaults to <out>/<name>.html)
// --htmltp         HTML handlebars template path (Optional)
// --codepoint      The starting character code to count up from (Optional)
// --codepoints     Path to explicit character code mapping JSON file (Optional)
// -j, --json       Generate JSON map file if true (Default: true)
// --jsonpath       JSON output path (Defaults to <out>/<name>.json)
// -p, --prefix     CSS classname prefix for icons (Default: icon)
// -t, --tag        CSS base selector for icons (Default: i)
// --selector       Use a selector instead of 'tag + prefix' (Default: null)
// --normalize      Normalize icons sizes (Default: false)
// --round          Setup SVG rounding (Default: 10e12)
// --descent        Offset applied to the baseline (Default: 0)
// --mono           Make font monospace (Default: false)
// --height         Fixed font height value
// --center         Center font horizontally

// npx icon-font-generator properties/assets/icons/*.svg -o icon-font-gen-test/ --name "neo-icon-font"

// webfontsGenerator

const webfontsGenerator = require('webfonts-generator');

async function convertToBase64() {
  const base64FileBuffer = await fs.readFile(
    'icon-font-gen-test/neo-icon-font.woff'
  );

  const contents_in_base64 = await base64FileBuffer.toString('base64');

  return contents_in_base64.toString();
}

convertToBase64().then(async (result) => {
  SVGArray = await fs
    .readdir(__dirname + '/properties/assets/icons/')
    .then((files) => {
      return files.map((file) => {
        return `properties/assets/icons/${file}`;
      });
    });

  console.log(SVGArray);

  webfontsGenerator(
    {
      files: SVGArray,
      dest: 'webfonts-gen-test/',
      fontName: 'neo-iconfont',
      cssTemplate: 'css.hbs',
      templateOptions: {
        src: `url(data:application/font-woff;base64,${result}) format('woff')`,
        classPrefix: 'icon-',
      },
    },
    function (error) {
      if (error) {
        console.log('Fail!', error);
      } else {
        console.log('Done!');
      }
    }
  );
});
