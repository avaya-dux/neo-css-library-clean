const fs = require('fs').promises;

// Code to generate .css file for fonts

// #region convert Noto Sans .woff files to base64 and add to CSS file
// NOT CURRENTLY IN USE

async function createNotoSansCSS() {
  await fs.readdir('../fonts/NotoSans/woff/').then(async (fonts) => {
    if (fonts.indexOf('noto_sans.css') < 0) {
      await fs.writeFile('./noto_sans.css', '');
    }
  });
  await fs.readdir('../fonts/NotoSans/').then(async (fonts) => {
    const base64FileArray = await fonts.map(async (font) => {
      // code to toggle converting fonts one by one to avoid overwrites
      if (font === 'notosans-regular.woff') {
        await fs
          .readFile(`../fonts/NotoSans/woff/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff');font-weight:400;font-style:normal;} `;
            await fs.appendFile('./noto_sans.css', importStatement);
          });
      }
      if (font === 'notosans-italic.woff') {
        await fs
          .readFile(`../fonts/NotoSans/woff/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff');font-weight:400;font-style:italic;} `;
            await fs.appendFile('./noto_sans.css', importStatement);
          });
      }
      if (font === 'notosans-bolditalic.woff') {
        await fs
          .readFile(`../fonts/NotoSans/woff/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff');font-weight:700;font-style:italic;} `;
            await fs.appendFile('./noto_sans.css', importStatement);
          });
      }
      if (font === 'notosans-lightitalic.woff') {
        await fs
          .readFile(`../fonts/NotoSans/woff/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff');font-weight:300;font-style:italic;} `;
            await fs.appendFile('./noto_sans.css', importStatement);
          });
      }
      if (font === 'notosans-semibold.woff') {
        await fs
          .readFile(`../fonts/NotoSans/woff/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff');font-weight:600;font-style:normal;} `;
            await fs.appendFile('./noto_sans.css', importStatement);
          });
      }
      if (font === 'notosans-semibolditalic.woff') {
        await fs
          .readFile(`../fonts/NotoSans/woff/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff');font-weight:600;font-style:italic;} `;
            await fs.appendFile('./noto_sans.css', importStatement);
          });
      }
      if (font === 'notosans-bold.woff') {
        await fs
          .readFile(`../fonts/NotoSans/woff/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff');font-weight:700;font-style:normal;} `;
            await fs.appendFile('./noto_sans.css', importStatement);
          });
      }
      if (font === 'notosans-light.woff') {
        await fs
          .readFile(`../fonts/NotoSans/woff/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans';src: url(data:application/font-woff;base64,${fontToBase64}) format('woff');font-weight:300;font-style:normal;} `;
            await fs.appendFile('./noto_sans.css', importStatement);
          });
      }
    });
  });
}

// #endregion

// #region convert Noto Sans Arabiuc .ttf files to base64 and add to CSS file

async function createNotoSansArabicCSS() {
  await fs.readdir('../fonts/').then(async (fonts) => {
    if (fonts.indexOf('noto_sans_arabic.css') < 0) {
      await fs.writeFile('./noto_sans_arabic.css', '');
    }
  });
  await fs.readdir('../fonts/NotoSansArabic/ttf/').then(async (fonts) => {
    const base64FileArray = await fonts.map(async (font) => {
      // code to toggle converting fonts one by one to avoid overwrites
      if (font === 'NotoSansArabic-Regular.ttf') {
        await fs
          .readFile(`../fonts/NotoSansArabic/ttf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-arabic';src: url(data:application/font-woff;base64,${fontToBase64}) format('truetype');font-weight:400;font-style:normal;} `;
            await fs.appendFile('./noto_sans_arabic.css', importStatement);
          });
      }
      if (font === 'NotoSansArabic-Light.ttf') {
        await fs
          .readFile(`../fonts/NotoSansArabic/ttf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-arabic';src: url(data:application/font-woff;base64,${fontToBase64}) format('truetype');font-weight:300;font-style:normal;} `;
            await fs.appendFile('./noto_sans_arabic.css', importStatement);
          });
      }
      if (font === 'NotoSansArabic-Bold.ttf') {
        await fs
          .readFile(`../fonts/NotoSansArabic/ttf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-arabic';src: url(data:application/font-woff;base64,${fontToBase64}) format('truetype');font-weight:700;font-style:normal;} `;
            await fs.appendFile('./noto_sans_arabic.css', importStatement);
          });
      }
      if (font === 'NotoSansArabic-SemiBold.ttf') {
        await fs
          .readFile(`../fonts/NotoSansArabic/ttf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-arabic';src: url(data:application/font-woff;base64,${fontToBase64}) format('truetype');font-weight:600;font-style:normal;} `;
            await fs.appendFile('./noto_sans_arabic.css', importStatement);
          });
      }
    });
  });
}

// #endregion

// #region convert Noto Sans Hebrew .ttf files to base64 and add to CSS file

async function createNotoSansHebrewCSS() {
  await fs.readdir('../fonts/').then(async (fonts) => {
    if (!fonts.includes('noto_sans_hebrew.css')) {
      await fs.writeFile('./noto_sans_hebrew.css', '');
    }
  });
  await fs.readdir('../fonts/NotoSansHebrew/ttf/').then(async (fonts) => {
    const base64FileArray = await fonts.map(async (font) => {
      // code to toggle converting fonts one by one to avoid overwrites
      if (font === 'NotoSansHebrew-Regular.ttf') {
        await fs
          .readFile(`../fonts/NotoSansHebrew/ttf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-hebrew';src: url(data:application/font-woff;base64,${fontToBase64}) format('truetype');font-weight:400;font-style:normal;} `;
            await fs.appendFile('./noto_sans_hebrew.css', importStatement);
          });
      }
      if (font === 'NotoSansHebrew-Light.ttf') {
        await fs
          .readFile(`../fonts/NotoSansHebrew/ttf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-hebrew';src: url(data:application/font-woff;base64,${fontToBase64}) format('truetype');font-weight:300;font-style:normal;} `;
            await fs.appendFile('./noto_sans_hebrew.css', importStatement);
          });
      }
      if (font === 'NotoSansHebrew-Bold.ttf') {
        await fs
          .readFile(`../fonts/NotoSansHebrew/ttf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-hebrew';src: url(data:application/font-woff;base64,${fontToBase64}) format('truetype');font-weight:700;font-style:normal;} `;
            await fs.appendFile('./noto_sans_hebrew.css', importStatement);
          });
      }
      if (font === 'NotoSansHebrew-SemiBold.ttf') {
        await fs
          .readFile(`../fonts/NotoSansHebrew/ttf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-hebrew';src: url(data:application/font-woff;base64,${fontToBase64}) format('truetype');font-weight:600;font-style:normal;} `;
            await fs.appendFile('./noto_sans_hebrew.css', importStatement);
          });
      }
    });
  });
}

// #endregion

// #region convert Noto Sans Japanese .otf files to base64 and add to CSS file
// WARNING -- DOES NOT LOAD

async function createNotoSansJapaneseCSS() {
  await fs.readdir('../fonts/').then(async (fonts) => {
    if (!fonts.includes('noto_sans_jp.css')) {
      await fs.writeFile('./noto_sans_jp.css', '');
    }
  });
  await fs.readdir('../fonts/NotoSansJapanese/otf/').then(async (fonts) => {
    const base64FileArray = await fonts.map(async (font) => {
      // code to toggle converting fonts one by one to avoid overwrites
      if (font === 'NotoSansCJKjp-Regular.otf') {
        await fs
          .readFile(`../fonts/NotoSansJapanese/otf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-jp';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:400;font-style:normal;} `;
            await fs.appendFile('./noto_sans_jp.css', importStatement);
          });
      }
      if (font === 'NotoSansCJKjp-Light.otf') {
        await fs
          .readFile(`../fonts/NotoSansJapanese/otf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-jp';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:300;font-style:normal;} `;
            await fs.appendFile('./noto_sans_jp.css', importStatement);
          });
      }
      if (font === 'NotoSansCJKjp-Bold.otf') {
        await fs
          .readFile(`../fonts/NotoSansJapanese/otf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-jp';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:700;font-style:normal;} `;
            await fs.appendFile('./noto_sans_jp.css', importStatement);
          });
      }
      if (font === 'NotoSansCJKjp-Medium.otf') {
        await fs
          .readFile(`../fonts/NotoSansJapanese/otf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-jp';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:500;font-style:normal;} `;
            await fs.appendFile('./noto_sans_jp.css', importStatement);
          });
      }
    });
  });
}

// #endregion

// #region convert Noto Sans Korean .otf files into base64 and add to .CSS file
// WARNING -- DOES NOT LOAD CORRECTLY

async function createNotoSansKoreanCSS() {
  await fs.readdir('../fonts/').then(async (fonts) => {
    if (!fonts.includes('noto_sans_kr.css')) {
      await fs.writeFile('./noto_sans_kr.css', '');
    }
  });
  await fs.readdir('../fonts/NotoSansKorean/otf/').then(async (fonts) => {
    const base64FileArray = await fonts.map(async (font) => {
      // code to toggle converting fonts one by one to avoid overwrites
      if (font === 'NotoSansCJKkr-Regular.otf') {
        await fs
          .readFile(`../fonts/NotoSansKorean/otf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-kr';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:400;font-style:normal;} `;
            await fs.appendFile('./noto_sans_kr.css', importStatement);
          });
      }
      // if (font === 'NotoSansCJKkr-Light.otf') {
      //   await fs
      //     .readFile(`../fonts/NotoSansKorean/otf/${font}`)
      //     .then(async (value) => {
      //       const fontToBase64 = await value.toString('base64');
      //       const importStatement = `@font-face { font-family: 'noto-sans-kr';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:300;font-style:normal;} `;
      //       await fs.appendFile('./noto_sans_kr.css', importStatement);
      //     });
      // }
      // if (font === 'NotoSansCJKkr-Bold.otf') {
      //   await fs
      //     .readFile(`../fonts/NotoSansKorean/otf/${font}`)
      //     .then(async (value) => {
      //       const fontToBase64 = await value.toString('base64');
      //       const importStatement = `@font-face { font-family: 'noto-sans-kr';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:700;font-style:normal;} `;
      //       await fs.appendFile('./noto_sans_kr.css', importStatement);
      //     });
      // }
      // if (font === 'NotoSansCJKkr-Medium.otf') {
      //   await fs
      //     .readFile(`../fonts/NotoSansKorean/otf/${font}`)
      //     .then(async (value) => {
      //       const fontToBase64 = await value.toString('base64');
      //       const importStatement = `@font-face { font-family: 'noto-sans-kr';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:500;font-style:normal;} `;
      //       await fs.appendFile('./noto_sans_kr.css', importStatement);
      //     });
      // }
    });
  });
}

// #endregion

// #region convert Noto Sans Chinese .otf files into base64 and add to .CSS file
// WARNING - DOES NOT WORK

async function createNotoSansChineseCSS() {
  await fs.readdir('../fonts/').then(async (fonts) => {
    if (!fonts.includes('noto_sans_sc.css')) {
      await fs.writeFile('./noto_sans_sc.css', '');
    }
  });
  await fs.readdir('../fonts/NotoSansChinese/otf/').then(async (fonts) => {
    const base64FileArray = await fonts.map(async (font) => {
      // code to toggle converting fonts one by one to avoid overwrites
      if (font === 'NotoSansCJKsc-Regular.otf') {
        await fs
          .readFile(`../fonts/NotoSansChinese/otf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-sc';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:400;font-style:normal;} `;
            await fs.appendFile('./noto_sans_sc.css', importStatement);
          });
      }
      if (font === 'NotoSansCJKsc-Light.otf') {
        await fs
          .readFile(`../fonts/NotoSansChinese/otf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-sc';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:300;font-style:normal;} `;
            await fs.appendFile('./noto_sans_sc.css', importStatement);
          });
      }
      if (font === 'NotoSansCJKsc-Bold.otf') {
        await fs
          .readFile(`../fonts/NotoSansChinese/otf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-sc';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:700;font-style:normal;} `;
            await fs.appendFile('./noto_sans_sc.css', importStatement);
          });
      }
      if (font === 'NotoSansCJKsc-Medium.otf') {
        await fs
          .readFile(`../fonts/NotoSansChinese/otf/${font}`)
          .then(async (value) => {
            const fontToBase64 = await value.toString('base64');
            const importStatement = `@font-face { font-family: 'noto-sans-sc';src: url(data:font/opentype;base64,${fontToBase64}) format('opentype');font-weight:500;font-style:normal;} `;
            await fs.appendFile('./noto_sans_sc.css', importStatement);
          });
      }
    });
  });
}

// #endregion

// createNotoSansCSS();
// createNotoSansArabicCSS();
// createNotoSansHebrewCSS();
// createNotoSansJapaneseCSS();
// createNotoSansKoreanCSS();
// createNotoSansChineseCSS();
