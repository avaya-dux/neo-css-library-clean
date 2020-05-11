const StyleDictionary = require('style-dictionary').extend(
  __dirname + '/config.json'
);

const fs = require('fs');

const _ = require('lodash');

console.log('Build started.....');
console.log('\n=======================================');

// this is where we create a Format to create classes

const fileHeader =
  '// Mo generated this file automatically on ' + new Date().toUTCString + '\n';

const template = _.template(
  fs.readFileSync(__dirname + '/templates/web-scss.template')
);

StyleDictionary.registerFormat({
  name: 'custom/format/scss',
  formatter: template,
});

StyleDictionary.registerFilter({
  name: 'isClass',
  matcher: function (prop) {
    return prop.attributes.category === 'class';
  },
});

StyleDictionary.buildAllPlatforms();

console.log('Build completed....');
