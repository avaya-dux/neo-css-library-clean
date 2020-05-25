//Code to try and replace tokens in Neo

const replace = require('replace-in-file');

// we import all tokens as a js =bject

// const tokens = require('./build/js/tokens');

// we import all icons as a js object;

const icons = require('./build/js/icons');

var testIconName = Object.keys(icons)[0];

var testIconBase64 = icons[testIconName];

// console.log(testIconBase64);

var utf8encoded = new Buffer(testIconBase64, 'base64').toString('utf8');

console.log(utf8encoded);

// #region Code to replace colors

// we get the name of a particular token, in this case semGreenDark

// var semGreenDark = Object.keys(tokens)[11];

// // we save the token's name and value in a Regular Expression

// var tokenRegExName = new RegExp(semGreenDark, 'g');

// var tokenRegExValue = new RegExp(tokens[semGreenDark], 'g');

// // change style To -- we write functions that change the style from what it is in current Neo
// // to what we want it to be

// // TODO -- replace scss directly with css file

// const optionsToName = {
//   files: './neo/scss/**/*.scss',
//   from: /neo-presence-red/g,
//   to: semGreenDark,
// };

// const optionsToValue = {
//   files: './neo/scss/**/*.scss',
//   from: /#d50000/g,
//   to: tokens[semGreenDark],
// };

// // change style From -- we write functions that revert the style back to current Neo

// const optionsFromName = {
//   files: './neo/scss/**/*.scss',
//   from: tokenRegExName,
//   to: 'neo-presence-red',
// };

// const optionsFromValue = {
//   files: './neo/scss/**/*.scss',
//   from: tokenRegExValue,
//   to: '#d50000',
// };

// we call the function as necessary

// replace(optionsToName).then((results) => {
//   console.log('Replacement results:', results);

//   replace(optionsToValue).then((results) => {
//     console.log('******************************\n');

//     console.log('Replacement results:', results);
//   });
// });

// #endregion

// #region Code to replace tokens
