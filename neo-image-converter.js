// file to convert images to be supplied with Neo into base64 strings

const fs = require('fs').promises;

// this function accepts as parameters the file path of the image, as well as the name of the variable to be created

async function convertImageFileToBase64() {
  var imageJSONObject = {
    imageContent: {},
  };

  var imagesArray = await fs
    .readdir('properties/assets/images')
    .then(async (files) => {
      for (file of files) {
        const imageName = file.replace('.svg', '');
        const base64FileBuffer = await fs.readFile(
          `properties/assets/images/${file}`
        );
        const contents_in_base64 = await base64FileBuffer.toString('base64');
        imageJSONObject.imageContent[imageName] = {
          value: `'data:image/svg+xml;base64,${contents_in_base64}'`,
        };
        // console.log(imageName);
      }
      //   console.log(files);
    });
  console.log(imageJSONObject);

  await fs
    .writeFile(
      'properties/components/images.json',
      JSON.stringify(imageJSONObject)
    )
    .then(function () {
      console.log('image.json created');
    });
}

convertImageFileToBase64();
