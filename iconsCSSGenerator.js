const fs = require('fs').promises;
const webfontsGenerator = require('webfonts-generator');

// Code to generate .css file for icons -- THIS CODE TO BE RUN AFTER ICONGEN SCRIPT

// This function converts our icon font .woff file to base64

async function convertIconFontToBase64() {
  const base64FileBuffer = await fs.readFile('properties/neo-icon-font.woff');

  const contents_in_base64 = await base64FileBuffer.toString('base64');

  return contents_in_base64.toString();
}

// We call the above function to generate the base64 String that we will be inserting into our css

convertIconFontToBase64().then(async (result) => {
  // We get an array of the file names in our icons folder

  SVGArray = await fs
    .readdir(__dirname + '/properties/assets/icons/')
    .then(async (files) => {
      // this code is used to generate a list of icon name Strings for use in our Design System portal
      // files.forEach((file) => {
      //   console.log(`"${file.replace('.svg', '')}",`);
      // });
      // this code is used to generate a .js file with exportable SVG code so users can copy it on our portal
      await fs.writeFile(
        'svgs.js',
        'import React from "react"; import { renderToString } from "react-dom";'
      );
      files.forEach(async (file) => {
        var imageCode = await fs
          .readFile(`properties/assets/icons/${file}`)
          .then(async (code) => {
            var iconName = file.replace('.svg', '');
            console.log(iconName);
            var codeString = await code
              .toString()
              .replace(/xlink:href/g, 'xlinkHref')
              .replace(/xmlns:xlink/g, 'xmlnsXlink');
            await fs.appendFile(
              'svgs.js',
              `export const ${iconName} = (${codeString});`
            );
          });
      });
      return files.map((file) => {
        return `properties/assets/icons/${file}`;
      });
    });

  // We pass both the above array and the base64 String into the webfontsGenerator function

  webfontsGenerator(
    {
      files: SVGArray,
      dest: 'build/css',
      fontName: 'icons',
      types: [],
      cssTemplate: 'templates/css.hbs',
      templateOptions: {
        src: `url(data:application/font-woff;base64,${result}) format('woff')`,
        classPrefix: 'icon-',
      },
      html: true,
      htmlTemplate: 'templates/html.hbs',
      normalize: true,
      fontHeight: 1000,
    },
    function (error) {
      if (error) {
        console.log('Fail!', error);
      } else {
        console.log('icons.css generated in build/ folder');
      }
    }
  );
});
