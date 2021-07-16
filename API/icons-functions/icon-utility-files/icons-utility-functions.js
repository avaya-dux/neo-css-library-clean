const fs = require("fs").promises;
const replace = require("./icon-replacement-string");
// test functions for recording information on icons for inclusion in Design Portal site

// test function to generate a .js file with exportable SVG code so users can copy it on our portal

async function createCopyableSVG(files) {
  await fs.writeFile(
    "./icons-functions/icon-utility-files/copyableSVGs.js",
    'import React from "react"; import { renderToString } from "react-dom";'
  );

  files.forEach(async (file) => {
    await fs
      .readFile(`../properties/assets/icons/svgs/${file}`)
      .then(async (code) => {
        var iconName = file
          .replace(replace.stringsToReplace, "")
          .replace(/-/g, "");
        var codeString = await code
          .toString()
          .replace(/xlink:href/g, "xlinkHref")
          .replace(/xmlns:xlink/g, "xmlnsXlink");
        await fs.appendFile(
          "./icons-functions/icon-utility-files/copyableSVGs.js",
          `export const ${iconName.replace(".svg", "")} = (${codeString});`
        );
      });
  });
}

async function getIconInformation(string, bidirectional) {
  // file to record icon names for DS Portal

  await fs.writeFile(
    "./icons-functions/icon-utility-files/iconInfo.js",
    "export const iconInfo = ["
  );

  // get the full icon name ex. outline/content/worklog

  var fullIconName = string.toLowerCase().replace(/\-|\/|\s+/g, "");

  // get the icon type ex. outline

  var iconOutlineType = string.slice(0, string.indexOf("/"));

  // get the icon category ex. content

  var iconCategory = string.slice(
    string.indexOf("/") + 1,
    string.lastIndexOf("/")
  );

  // get the icon name ex. worklog

  var iconName = string
    .slice(string.lastIndexOf("/") + 1)
    .replace(/\/|\s+/g, "");

  // write this information to iconInfo.js utility file

  await fs.appendFile(
    "./icons-functions/icon-utility-files/iconInfo.js",
    `['${fullIconName}', '${iconName}', '${iconCategory}', ${
      bidirectional && true
    }, '${iconOutlineType}'],`
  );

  // functionality to log icon names to console
  // this line logs the icon names to console for inclusion in the Design Portal
  // TO-DO - create a seperate file to hold this information

  if (iconOutlineType != "fill") {
    // console.log(`"${iconName.replace(/-/g, '')}",`);
    console.log(`"${iconName}",`);
    // console.log(iconCategory);
  }
}

// test function to generate a list of icon names for use in our Design System portal

// async function getIconNames(iconName) {
//   console.log(iconName);
// }

exports.getIconInformation = getIconInformation;
exports.createCopyableSVG = createCopyableSVG;
