var Fontmin = require('fontmin');

var fontmin = new Fontmin().src('fonts/*.ttf').dest('fonts');

fontmin.run(function (err) {
  if (err) {
    console.log(err);
  }
});

// this is a utility file to help convert .woff files into base64 URLs

// async function convertIconFontToBase64() {
//   const base64FileBuffer = await fs.readFile('properties/neo-icon-font.woff');

//   const contents_in_base64 = await base64FileBuffer.toString('base64');

//   return contents_in_base64.toString();
// }

// async function fontFileConverter() {
//   await fs.readdir(__dirname + '/fonts/').then((files) => {
//     files.forEach(async (file) => {
//       var fontName = file.replace('.ttf', '').toLowerCase();

//       await fs.writeFile(`fonts/${fontName}.css`, '');

//       const base64Buffer = await fs.readFile(`fonts/${file}`);

//       const fonts_in_base64 = await base64Buffer.toString('base64');

//       return await fs.appendFile(
//         `fonts/${fontName}.css`,
//         `@font-face { font-family: ${fontName}, sans-serif; src: url(data:application/font-ttf;base64,${fonts_in_base64}) format('ttf') };`
//       );
//     });
//   });
// }

// fontFileConverter();
