// functions to save Icons to Firebase storage

// temporarily importing fs

const fs = require('fs').promises;

// importing Firebase in order to upload icons to database

var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://test-ds-portal-db.firebaseio.com',
  storageBucket: 'test-ds-portal-db.appspot.com',
});

async function saveIconsToStorage() {
  // saving PNGs to storage
  var bucket = admin.storage().bucket();
  await fs.readdir('../../properties/assets/icons/pngs').then((files) => {
    files.forEach(async (file) => {
      var stringsToReplace = new RegExp(
        /(?<!email-|info-|error-|warning-|star-)outline|status|communication|(?<!file)file(?!type|:|-xls|-json|-zip)|alert(?!ing)|navigation|(?<!defer-inter|inter)action|(?<!sub-)account|content(?!\:)|editor|social(?!-active)|logo|other/,
        'g'
      );
      var amendedFileName = file.replace(stringsToReplace, '');
      await bucket
        .upload(`../../properties/assets/icons/pngs/${file}`, {
          destination: `PNGs/${amendedFileName}`,
        })
        .then(() => {
          console.log(`${file} uploaded to bucket`);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });

  // saving SVGS to storage

  await fs.readdir('../../properties/assets/icons/svgs').then((files) => {
    files.forEach(async (file) => {
      var stringsToReplace = new RegExp(
        /(?<!email-|info-|error-|warning-|star-)outline|status|communication|(?<!file)file(?!type|:|-xls|-json|-zip)|alert(?!ing)|navigation|(?<!defer-inter|inter)action|(?<!sub-)account|content(?!\:)|editor|social(?!-active)|logo|other/,
        'g'
      );
      var amendedFileName = file.replace(stringsToReplace, '');
      await bucket
        .upload(`../../properties/assets/icons/svgs/${file}`, {
          // need to rename file here
          destination: `SVGs/${amendedFileName}`,
        })
        .then(() => {
          console.log(`${file} uploaded to bucket`);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
}

saveIconsToStorage();

exports.saveIconsToStorage = saveIconsToStorage;
