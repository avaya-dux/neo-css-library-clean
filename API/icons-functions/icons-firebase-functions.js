// functions to save Icons to Firebase storage

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
      await bucket
        .upload(`properties/assets/icons/pngs/${file}`, {
          destination: `PNGs/${file}`,
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

  await fs
    .readdir(__dirname + '/properties/assets/icons/svgs')
    .then((files) => {
      files.forEach(async (file) => {
        await bucket
          .upload(`properties/assets/icons/svgs/${file}`, {
            destination: `SVGs/${file}`,
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

exports.saveIconsToStorage = saveIconsToStorage;
