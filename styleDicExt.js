const StyleDictionary = require('style-dictionary').extend(
  __dirname + '/config.json'
);
const fs = require('fs');
const _ = require('lodash');

console.log('Build started.....\n');
console.log('=======================================');

const fileHeader =
  '// Mo generated this file automatically on ' + new Date().toUTCString + '\n';

// code for all our custom templates

// this custom template creates classes
const template = _.template(
  fs.readFileSync(__dirname + '/templates/scss-classes.template')
);

// this is where we register our custom Format and Filter to create classes

StyleDictionary.registerFormat({
  name: 'custom/format/scss-classes',
  formatter: template,
});

StyleDictionary.registerFilter({
  name: 'isClass',
  matcher: function (prop) {
    return prop.attributes.category === 'class';
  },
});

StyleDictionary.buildPlatform('web');

console.log('=======================================\n');
console.log('Build completed....');
