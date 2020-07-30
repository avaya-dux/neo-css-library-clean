const fs = require('fs').promises;

// test functions for recording information on icons for inclusion in Design Portal site

async function getIconInformation(string) {
  // file to record icon names for DS Portal

  await fs.writeFile('./iconInfo.js', 'export const iconInfo = [');

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
    './iconInfo.js',
    `['${fullIconName}', '${iconName}', '${iconCategory}', '${iconOutlineType}'],`
  );
}

exports.getIconInformation = getIconInformation;
