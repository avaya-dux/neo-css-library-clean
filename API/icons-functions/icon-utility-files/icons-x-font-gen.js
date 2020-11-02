const fs = require('fs').promises;
const webfontsGenerator = require('webfonts-generator');

const Handlebars = require('handlebars');

const stringsToReplace = new RegExp(
  /(?<!email-|info-|error-|warning-|star-)outline|outine|status|weather|communication|(?<!file)file(?!type|:|-xls|-json|-zip|-rtl)|alert(?!ing)|navigation|(?<!defer-inter|inter)action|(?<!sub-)account|(?<!suggested-)content(?!\:)|editor|(?<!icon-)social(?!-active|-integrations)|logo|other/,
  'g'
);

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  var amendedArg = arg1.replace(stringsToReplace, '');

  return amendedArg === arg2 ? options.fn(this) : options.inverse(this);
});

async function convertXIconFontToBase64() {
  const base64FileBuffer = await fs.readFile(
    '../../../x-icons/x-icon-font.woff'
  );

  const contents_in_base64 = await base64FileBuffer.toString('base64');

  return contents_in_base64.toString();
}

convertXIconFontToBase64().then(async (result) => {
  // We get an array of the file names in our icons folder

  var IconsArray = await fs
    .readdir('../../../x-icons/svgs')
    .then(async (files) => {
      // we temporarily filter out 'fill' type icons

      var unfilteredArray = files.map((file) => {
        if (
          file.includes('fill') &&
          !file.includes('star') &&
          !file.includes('arrow')
        ) {
          return;
        } else {
          return `../../../x-icons/svgs/${file}`;
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
      dest: '../../../x-icon/css',
      fontName: 'x-icons',
      types: [],
      cssTemplate: '../../../templates/css.hbs',
      templateOptions: {
        src: `url(data:application/font-woff;base64,${result}) format('woff')`,
        // temporary class prefix for the purposes of side-by-side demo
        // TO-DO: replace this with universal class name when using namespaces
        classPrefix: 'x-icon-',
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
        console.log('x-icons.css generated in x-icon/ folder');
      }
    }
  );
});
