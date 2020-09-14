const fs = require('fs');

const PNG1 = fs.readdirSync('./resized-icons/@1PNGs');

const PNG2 = fs.readdirSync('./resized-icons/@3PNGs');

var stringsToReplace = new RegExp(
  /(?<!email-|info-|error-|warning-|star-)outline|status|communication|(?<!file)file(?!type|:|-xls|-json|-zip)|alert(?!ing)|navigation|(?<!defer-inter|inter)action|(?<!sub-)account|content(?!\:)|editor|social(?!-active)|logo|other/,
  'g'
);

// for (const file of PNG1) {
//   fs.rename(
//     `./resized-icons/@1PNGs/${file}`,
//     `./resized-icons/@1PNGs/${file.replace(stringsToReplace, '')}`,
//     (err) => {
//       console.log(err);
//     }
//   );
// }

for (const file of PNG2) {
  fs.rename(
    `./resized-icons/@3PNGs/${file}`,
    `./resized-icons/@3PNGs/${file.replace(stringsToReplace, '')}`,
    (err) => {
      console.log(err);
    }
  );
}
