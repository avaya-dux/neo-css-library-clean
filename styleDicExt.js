const StyleDictionary = require('style-dictionary').extend(
  __dirname + '/config.json'
);

const fs = require('fs');

const _ = require('lodash');

console.log('Build started.....');
console.log('\n=======================================');

StyleDictionary.registerFormat({
  name: 'custom/format/scss',
  formatter: _.template(
    fs.readFileSync(__dirname + '/templates/web-scss.template')
  ),
});

StyleDictionary.registerFilter({
  name: 'isClass',
  matcher: function (prop) {
    return prop.attributes.category === 'class';
  },
});

StyleDictionary.buildAllPlatforms();

console.log('Build completed....');
