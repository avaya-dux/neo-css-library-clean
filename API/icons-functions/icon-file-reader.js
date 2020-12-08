const fs = require('fs');

fs.readFile('../../build/css/updated-neo-icons.css', function (err, data) {
  var CSSFileString = data.toString();

  // var searchStr = '.neo-icon-available:before ';
  // var pattern = new RegExp(searchStr);

  if (err) throw err;

  var stringsToSearch = [
    '.neo-icon-accept:before ',
    '.neo-icon-available:before ',
  ];

  for (const string of stringsToSearch) {
    var pattern = new RegExp(string);
    if (pattern.test(CSSFileString) === false) {
      console.log('No String found');
    } else {
      console.log('String found');
      var firstChar =
        CSSFileString[pattern.exec(CSSFileString).index + string.length + 14];
      var secondChar =
        CSSFileString[pattern.exec(CSSFileString).index + string.length + 15];
      var thirdChar =
        CSSFileString[pattern.exec(CSSFileString).index + string.length + 16];
      var fourthChar =
        CSSFileString[pattern.exec(CSSFileString).index + string.length + 17];
      var fifthChar =
        CSSFileString[pattern.exec(CSSFileString).index + string.length + 18];
      // var sixthChar =
      //   CSSFileString[pattern.exec(CSSFileString).index + searchStr.length + 19];
      // console.log(
      //   firstChar,
      //   secondChar,
      //   thirdChar,
      //   fourthChar,
      //   fifthChar,
      //   sixthChar
      // );
      var unicode = firstChar + secondChar + thirdChar + fourthChar + fifthChar;
      console.log(unicode);
    }
  }
});
