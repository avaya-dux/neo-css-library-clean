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
    .then((files) => {
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
