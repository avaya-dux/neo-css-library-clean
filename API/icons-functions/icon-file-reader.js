const fs = require('fs');

fs.readFile('../../build/css/updated-neo-icons.css', function (err, data) {
  var CSSFileString = data.toString();

  if (err) throw err;

  // need to pull these from Figma as well?

  var stringsToSearch = [
    '.neo-icon-accept:before ',
    '.neo-icon-close:before ',
    '.neo-icon-chevron-up:before ',
    '.neo-icon-chevron-down:before ',
    '.neo-icon-chevron-left:before ',
    '.neo-icon-chevron-right:before ',
    // avatar status icons
    '.neo-icon-available-filled:before ',
    '.neo-icon-away-filled:before ',
    '.neo-icon-busy-filled:before ',
    '.neo-icon-do-not-disturb-filled:before ',
    '.neo-icon-offline-filled:before ',
    // notification icons
    '.neo-icon-error:before ',
    '.neo-icon-warning:before ',
    '.neo-icon-available:before ',
    '.neo-icon-info:before ',
    // indeterminate checkbox
    '.neo-icon-minus:before ',
    // spinner
    '.neo-icon-spinner:before ',
    // Avatars
    // bot icon
    '.neo-icon-bot:before ',
    // generic icon
    '.neo-icon-contact-filled:before ',
  ];

  var iconJSONObject = {
    icons: {},
  };

  for (const string of stringsToSearch) {
    var iconName = string.slice(string.indexOf('.') + 1, string.indexOf(':'));
    console.log(iconName);
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
      var unicode = firstChar + secondChar + thirdChar + fourthChar + fifthChar;
      iconJSONObject.icons[`${iconName}`] = {
        value: `'${unicode}'`,
      };
    }
  }
  console.log(iconJSONObject);
  fs.writeFile(
    '../../properties/components/iconUnicodes.json',
    JSON.stringify(iconJSONObject),
    () => {
      if (err) {
        console.log(err);
      } else {
        console.log('iconUnicodes.json created');
      }
    }
  );
});
