//Code to try and replace tokens in Neo

const replace = require('replace-in-file');

// $semantic-green-dark: #08540a;

// change style

const optionsToName = {
  files: './neo/scss/**/*.scss',
  from: /custom-token-name/g,
  to: 'semantic-green-dark',
};

const optionsToValue = {
  files: './neo/scss/**/*.scss',
  from: /#d50000/g,
  to: '#08540a',
};

const optionsFromName = {
  files: './neo/scss/**/*.scss',
  from: /semantic-green-dark/g,
  to: 'custom-token-name',
};

const optionsFromValue = {
  files: './neo/scss/**/*.scss',
  from: /#08540a/g,
  to: '#d50000',
};

replace(optionsToName).then((results) => {
  console.log('Replacement results:', results);

  replace(optionsToValue).then((results) => {
    console.log('******************************\n');

    console.log('Replacement results:', results);
  });
});

// reset style

// replace(optionsFromName).then((results) => {
//   console.log('Replacement results:', results);

//   replace(optionsFromValue).then((results) => {
//     console.log(results);
//   });
// });
