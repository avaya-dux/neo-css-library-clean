const StyleDictionary = require('style-dictionary').extend(
  __dirname + '/config.json'
);
const fs = require('fs');
const _ = require('lodash');

console.log('Build started.....\n');
console.log('=======================================');

// this is an attempt to insert comments at top of file

const fileHeader =
  '// Mo generated this file automatically on ' + new Date().toUTCString + '\n';

// code for all our custom templates

// this custom template creates scss classes
const scssTemplate = _.template(
  fs.readFileSync(__dirname + '/templates/scss-classes.template')
);

// this custom template creates css classes

const cssTemplate = _.template(
  fs.readFileSync(__dirname + '/templates/css-classes.template')
);

// this is where we register our custom Format and Filter to create classes in scss

StyleDictionary.registerFormat({
  name: 'custom/format/scss-classes',
  formatter: scssTemplate,
});

StyleDictionary.registerFilter({
  name: 'isClass',
  matcher: function (prop) {
    return prop.attributes.category === 'class';
  },
});

// this is where we register our custom Format to create classes in css

StyleDictionary.registerFormat({
  name: 'custom/format/css-classes',
  formatter: cssTemplate,
});

// this is where we register our custom filter for just atomic design tokens

StyleDictionary.registerFilter({
  name: 'isDesignToken',
  matcher: function (prop) {
    return (
      prop.attributes.category !== 'class' &&
      prop.attributes.category !== 'content'
    );
  },
});

// this is where we create a custom filter and Format to create Swift text styles

StyleDictionary.registerFilter({
  name: 'isTextStyle',
  matcher: function (prop) {
    if (prop.attributes.category == 'textStyles') {
      if (
        typeof prop.original.value == 'number' &&
        prop.attributes.item != 'fontWeight'
      ) {
        prop.value = `${prop.original.value * 0.75}pt`;
      }
    }
    return prop.attributes.category == 'textStyles';
  },
});

StyleDictionary.registerFilter({
  name: 'isColorStyle',
  matcher: function (prop) {
    if (
      prop.attributes.category !== 'class' &&
      prop.attributes.category !== 'content' &&
      prop.attributes.category !== 'textStyles' &&
      prop.attributes.category !== 'effectStyles'
    ) {
      return prop;
    }
  },
});

// test code to register Transforms from github.com/didoo/style-dictionary-demo

const iOSTemplate = _.template(
  fs.readFileSync(__dirname + '/templates/ios-plist.template')
);

const androidTemplate = _.template(
  fs.readFileSync(__dirname + '/templates/android-xml.template')
);

StyleDictionary.registerTransform({
  name: 'size/pxToPt',
  type: 'value',
  matcher: function (prop) {
    if (typeof prop.value === 'string') return prop.value.match(/^[\d.]+px$/);
  },
  transformer: function (prop) {
    return prop.value.replace(/px$/, 'pt');
  },
});

StyleDictionary.registerTransform({
  name: 'size/pxToDp',
  type: 'value',
  matcher: function (prop) {
    if (typeof prop === 'string') return prop.value.match(/^[\d.]+px$/);
  },
  transformer: function (prop) {
    return prop.value.replace(/px$/, 'dp');
  },
});

StyleDictionary.registerTransformGroup({
  name: 'tokens-ios',
  transforms: ['attribute/cti', 'name/cti/camel', 'size/pxToPt'],
});

StyleDictionary.registerFormat({
  name: 'ios/plist',
  formatter: iOSTemplate,
});

StyleDictionary.registerTransformGroup({
  name: 'tokens-android',
  transforms: ['attribute/cti', 'name/cti/camel', 'size/pxToDp'],
});

StyleDictionary.registerFormat({
  name: 'android/xml',
  formatter: androidTemplate,
});

StyleDictionary.buildAllPlatforms();

console.log('=======================================\n');
console.log('Build completed....');
