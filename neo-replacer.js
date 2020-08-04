//Code to edit NEO .css file as necessary after creation

// import replace-in-file module

const replace = require('replace-in-file');

// create variable for ':root' RegEx

var rootRegEx = new RegExp(':root', 'g');

// create Object to use as function parameter

const deleteRoot = {
  files: '../Avaya_Design_Portal_proto/DT_gen_files/combined.css',
  from: rootRegEx,
  to: '',
};

// run replace function to delete the ':root' string

replace(deleteRoot).then((results) => {
  console.log('Replacement results:', results);
});
