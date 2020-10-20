const fs = require('fs').promises;
const webfontsGenerator = require('webfonts-generator');

const iconUtilityFunctions = require('./icon-utility-files/icons-utility-functions.js');

const iconInfo = require('./icon-utility-files/iconInfo.js');
const { includes } = require('lodash');

const Handlebars = require('handlebars');

const replace = require('./icon-utility-files/icon-replacement-string');

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  var amendedArg = arg1.replace(replace.stringsToReplace, '');

  return amendedArg === arg2 ? options.fn(this) : options.inverse(this);
});

// Code to generate .css file for icons -- THIS CODE TO BE RUN AFTER ICONGEN SCRIPT

// This function converts our icon font .woff file to base64

async function convertIconFontToBase64() {
  const base64FileBuffer = await fs.readFile(
    '../properties/neo-icon-font.woff'
  );

  const contents_in_base64 = await base64FileBuffer.toString('base64');

  return contents_in_base64.toString();
}

// We call the above function to generate the base64 String that we will be inserting into our css

convertIconFontToBase64().then(async (result) => {
  // We get an array of the file names in our icons folder

  var IconsArray = await fs
    .readdir('../properties/assets/icons/svgs')
    .then(async (files) => {
      // utility function to create file with copyable SVG code

      await iconUtilityFunctions.createCopyableSVG(files);

      // we temporarily filter out 'fill' type icons

      var unfilteredArray = files.map((file) => {
        if (
          file.includes('fill') &&
          !file.includes('star') &&
          !file.includes('arrow')
        ) {
          return;
        } else {
          return `../properties/assets/icons/svgs/${file}`;
        }
      });

      return unfilteredArray.filter((icon) => {
        return icon != undefined;
      });
    });

  /*// NOTE:

    -- Icon unicode needs to be manually updated when specified in Neo code. This is the case for the following components:
    * Accordions
    * Checkboxes
    * Dropdown
    * Selectbox
    * Expandable Chip
    //*/

  // We pass both the above array and the base64 String into the webfontsGenerator function

  webfontsGenerator(
    {
      files: IconsArray,
      dest: '../build/css',
      fontName: 'updated-neo-icons',
      types: [],
      cssTemplate: '../templates/css.hbs',
      templateOptions: {
        src: `url(data:application/font-woff;base64,${result}) format('woff')`,
        // temporary class prefix for the purposes of side-by-side demo
        // TO-DO: replace this with universal class name when using namespaces
        classPrefix: 'neo-icon-',
      },
      html: false,
      // htmlTemplate: '../templates/html.hbs',
      normalize: true,
      fontHeight: 1000,
    },
    function (error) {
      if (error) {
        console.log('Fail!', error);
      } else {
        console.log('updated-neo-icons.css generated in build/ folder');
      }
    }
  );
});
