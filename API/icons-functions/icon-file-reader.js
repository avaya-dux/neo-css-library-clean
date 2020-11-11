const fs = require('fs');

fs.readFile('../../build/css/updated-neo-icons.css', function (err, data) {
  var searchStr = '.aoc-icon-accept:before { content:';

  var pattern = new RegExp('\b' + searchStr + '\b');

  var newPattern = new RegExp(/(?<=.aoc-icon-accept:before { content:)(?=\;)/);

  if (err) throw err;

  if (pattern.test(data.toString()) === false) {
    console.log('No String found');
  } else {
    console.log('String found');
  }
});
