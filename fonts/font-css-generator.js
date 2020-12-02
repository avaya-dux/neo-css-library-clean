// const fs = require('fs').promises;

// Code to generate .css file for fonts

// async function createNotoSansCSS() {
//   await fs.readdir('../fonts/NotoSans/woff/').then(async (fonts) => {
//     await fs.readdir('../fonts/NotoSans/').then(async (fonts) => {
//       if (fonts.indexOf('noto_sans.css') < 0) {
//         await fs.writeFile('./noto_sans.css', '');
//       }
//     });

//     const base64FileArray = await fonts.map(async (font) => {
// code to toggle converting fonts one by one to avoid overwrites
// if (font === 'notosans-regular.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
// if (font === 'notosans-italic.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
// if (font === 'notosans-bolditalic.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
// if (font === 'notosans-lightitalic.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
// if (font === 'notosans-medium.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
// if (font === 'notosans-mediumitalic.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
// if (font === 'notosans-semibold.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
// if (font === 'notosans-semibolditalic.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
// if (font === 'notosans-bold.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
// if (font === 'notosans-light.woff') {
//   await fs
//     .readFile(`../fonts/NotoSans/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans.css', importStatement);
//     });
// }
//     });
//   });
// }

// async function createNotoSansArabicCSS() {
//   await fs.readdir('../fonts/NotoSansArabic/woff/').then(async (fonts) => {
//     await fs.readdir('../fonts/NotoSansArabic/').then(async (fonts) => {
//       if (fonts.indexOf('noto_sans_arabic.css') < 0) {
//         await fs.writeFile('./noto_sans_arabic.css', '');
//       }
//     });

//     const base64FileArray = await fonts.map(async (font) => {
//       // code to toggle converting fonts one by one to avoid overwrites
//       // if (font === 'notosansarabic-regular.woff') {
//       //   await fs
//       //     .readFile(`../fonts/NotoSansArabic/woff/${font}`)
//       //     .then(async (value) => {
//       //       const fontToBase64 = await value.toString('base64');
//       //       const importStatement = `@font-face { font-family: 'noto-sans-arabic';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       //       await fs.appendFile('./noto_sans_arabic.css', importStatement);
//       //     });
//       // }
//       // if (font === 'notosansarabic-light.woff') {
//       //   await fs
//       //     .readFile(`../fonts/NotoSansArabic/woff/${font}`)
//       //     .then(async (value) => {
//       //       const fontToBase64 = await value.toString('base64');
//       //       const importStatement = `@font-face { font-family: 'noto-sans-arabic';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       //       await fs.appendFile('./noto_sans_arabic.css', importStatement);
//       //     });
//       // }
//       // if (font === 'notosansarabic-bold.woff') {
//       //   await fs
//       //     .readFile(`../fonts/NotoSansArabic/woff/${font}`)
//       //     .then(async (value) => {
//       //       const fontToBase64 = await value.toString('base64');
//       //       const importStatement = `@font-face { font-family: 'noto-sans-arabic';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       //       await fs.appendFile('./noto_sans_arabic.css', importStatement);
//       //     });
//       // }
//       if (font === 'notosansarabic-medium.woff') {
//         await fs
//           .readFile(`../fonts/NotoSansArabic/woff/${font}`)
//           .then(async (value) => {
//             const fontToBase64 = await value.toString('base64');
//             const importStatement = `@font-face { font-family: 'noto-sans-arabic';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//             await fs.appendFile('./noto_sans_arabic.css', importStatement);
//           });
//       }
//     });
//   });
// }

// async function createNotoSansHebrewCSS() {
//   await fs.readdir('../fonts/').then(async (fonts) => {
//     if (!fonts.includes('noto_sans_hebrew.css')) {
//       await fs.writeFile('./noto_sans_hebrew.css', '');
//     }
//   });
//   await fs.readdir('../fonts/NotoSansHebrew/woff/').then(async (fonts) => {
//     const base64FileArray = await fonts.map(async (font) => {
//       // code to toggle converting fonts one by one to avoid overwrites
//       if (font === 'notosanshebrew-regular.woff') {
//         await fs
//           .readFile(`../fonts/NotoSansHebrew/woff/${font}`)
//           .then(async (value) => {
//             const fontToBase64 = await value.toString('base64');
//             const importStatement = `@font-face { font-family: 'noto-sans-hebrew';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//             await fs.appendFile('./noto_sans_hebrew.css', importStatement);
//           });
//       }
// if (font === 'notosanshebrew-light.woff') {
//   await fs
//     .readFile(`../fonts/NotoSansHebrew/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans-hebrew';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans_hebrew.css', importStatement);
//     });
// }
// if (font === 'notosanshebrew-bold.woff') {
//   await fs
//     .readFile(`../fonts/NotoSansHebrew/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans-hebrew';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans_hebrew.css', importStatement);
//     });
// }
// if (font === 'notosanshebrew-medium.woff') {
//   await fs
//     .readFile(`../fonts/NotoSansHebrew/woff/${font}`)
//     .then(async (value) => {
//       const fontToBase64 = await value.toString('base64');
//       const importStatement = `@font-face { font-family: 'noto-sans-hebrew';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff')} `;
//       await fs.appendFile('./noto_sans_hebrew.css', importStatement);
//     });
// }
//     });
//   });
// }

// createNotoSansCSS();
// createNotoSansArabicCSS();
// createNotoSansHebrewCSS();
