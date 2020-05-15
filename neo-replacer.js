//Code to try and replace tokens in Neo

const replace = require('replace-in-file');

const tokens = require('./build/js/tokens');

// $semantic-green-dark: #08540a;

var semGreenDark = Object.keys(tokens)[11];

console.log(semGreenDark);

console.log(tokens[semGreenDark]);

// var fromSemGreenDark = `/${semGreenDark}/g`;

// change style To

const optionsToName = {
  files: './neo/scss/**/*.scss',
  from: /neo-presence-red/g,
  to: semGreenDark,
};

const optionsToValue = {
  files: './neo/scss/**/*.scss',
  from: /#d50000/g,
  to: tokens[semGreenDark],
};

// change style From

const optionsFromName = {
  files: './neo/scss/**/*.scss',
  from: /SemanticGreenDark/g,
  to: 'neo-presence-red',
};

const optionsFromValue = {
  files: './neo/scss/**/*.scss',
  from: /#08540a/g,
  to: '#d50000',
};

replace(optionsFromName).then((results) => {
  console.log('Replacement results:', results);

  replace(optionsFromValue).then((results) => {
    console.log('******************************\n');

    console.log('Replacement results:', results);
  });
});
