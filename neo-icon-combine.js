const fs = require('fs').promises;

const iconsFile = async () =>
  await fs
    .readFile('./build/css/updated-neo-icons.css')
    .then(async (result) => {
      //   console.log(result.toString());
      await fs.writeFile('./neo/scss-update/icons.scss', result.toString());
    })
    .catch((error) => {
      console.log(error);
    });

iconsFile();
