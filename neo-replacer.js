//Code to edit NEO .css files as necessary AFTER RUNNING SCRIPT TO COMBINE .CSS FILES

// import replace-in-file module

const replace = require('replace-in-file');

// create variable for ':root' RegEx

var rootRegEx = new RegExp(':root', 'g');

// create Object to use as function parameter

const deleteRoot = {
  files: './neo/dist/3.0.0/neo.css',
  from: rootRegEx,
  to: '',
};

// run replace function to delete the ':root' string

replace(deleteRoot).then((results) => {
  console.log('Replacement results:', results);
});
