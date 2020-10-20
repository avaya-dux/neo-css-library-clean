const fs = require('fs');

const pngs = fs.readdirSync('./resized-icons/pngs');

const svgs = fs.readdirSync('./resized-icons/svgs');

const replace = require('./API/icons-functions/icon-utility-files/icon-replacement-string');

// for (const file of PNG1) {
//   fs.rename(
//     `./resized-icons/@1PNGs/${file}`,
//     `./resized-icons/@1PNGs/${file.replace(stringsToReplace, '')}`,
//     (err) => {
//       console.log(err);
//     }
//   );
// }

// for (const file of PNG2) {
//   fs.rename(
//     `./resized-icons/@3PNGs/${file}`,
//     `./resized-icons/@3PNGs/${file.replace(stringsToReplace, '')}`,
//     (err) => {
//       console.log(err);
//     }
//   );
// }

for (const file of pngs) {
  fs.rename(
    `./resized-icons/pngs/${file}`,
    `./resized-icons/pngs/${file.replace(replace.stringsToReplace, '')}`,
    (err) => {
      console.log(err);
    }
  );
}

// for (const file of svgs) {
//   fs.rename(
//     `./resized-icons/svgs/${file}`,
//     `./resized-icons/svgs/${file.replace(replace.stringsToReplace, '')}`,
//     (err) => {
//       console.log(err);
//     }
//   );
// }
