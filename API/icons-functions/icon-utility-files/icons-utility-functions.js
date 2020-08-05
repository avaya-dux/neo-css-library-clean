const fs = require('fs').promises;

// test functions for recording information on icons for inclusion in Design Portal site

async function getIconInformation(string) {
  // file to record icon names for DS Portal

  await fs.writeFile(
    './icons-functions/icon-utility-files/iconInfo.js',
    'export const iconInfo = ['
  );

  // get the full icon name ex. outline/content/worklog

  var fullIconName = string.toLowerCase().replace(/\-|\/|\s+/g, '');

  // get the icon type ex. outline

  var iconOutlineType = string.slice(0, string.indexOf('/'));

  // get the icon category ex. content

  var iconCategory = string.slice(
    string.indexOf('/') + 1,
    string.lastIndexOf('/')
  );

  // get the icon name ex. worklog

  var iconName = string.slice(string.lastIndexOf('/') + 1);

  // write this information to iconInfo.js utility file

  await fs.appendFile(
    './icons-functions/icon-utility-files/iconInfo.js',
    `['${fullIconName}', '${iconName}', '${iconCategory}', '${iconOutlineType}'],`
  );
}

// test function to generate a list of icon names for use in our Design System portal

// async function getIconNames(iconFiles) {

//   files.forEach((file) => {
//     console.log(`"${file.replace('.svg', '')}",`);
//   });
// }

// test function to generate a .js file with exportable SVG code so users can copy it on our portal

async function createCopyableSVG(files) {
  await fs.writeFile(
    './icons-functions/icon-utility-files/copyableSVGs.js',
    'import React from "react"; import { renderToString } from "react-dom";'
  );

  files.forEach(async (file) => {
    await fs
      .readFile(`../properties/assets/icons/svgs/${file}`)
      .then(async (code) => {
        var iconName = file.replace('.svg', '');
        var codeString = await code
          .toString()
          .replace(/xlink:href/g, 'xlinkHref')
          .replace(/xmlns:xlink/g, 'xmlnsXlink');
        await fs.appendFile(
          './icons-functions/icon-utility-files/copyableSVGs.js',
          `export const ${iconName} = (${codeString});`
        );
      });
  });
}

exports.getIconInformation = getIconInformation;
exports.createCopyableSVG = createCopyableSVG;
