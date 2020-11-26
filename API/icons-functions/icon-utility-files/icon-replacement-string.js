const stringsToReplace = new RegExp(
  /(?<!email-|info-|error-|warning-|star-)outline|status|weather|communication|(?<!file)file(?!type|:|-xls|-json|-zip|-rtl)|alert(?!ing)|navigation|(?<!defer-inter|inter)action|(?<!sub-)account|(?<!suggested-)content(?!\:)|editor|(?<!social)social(?!-active|-integrations)|logo|other/,
  'g'
);

/*
Used in:
- icons-utility-functions.js
- icon-css-generator.js
- icon-file-replacer.js
- icons-firebase-functions.js
*/

exports.stringsToReplace = stringsToReplace;
