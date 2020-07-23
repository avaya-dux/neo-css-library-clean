const fs = require('fs').promises;
const coreFigmaFunctions = require('./core-figma-functions.js');

// this function creates the styles.js file
// this file contains all the styles from which we then filter as necessary

async function createStylesFile() {
  // we create the styles.js file and prepare it to export our stylesObject
  await fs
    .writeFile('./figma-functions/styles.js', 'const stylesObject = [')
    .catch((error) => {
      console.log(error);
    });

  // we pull and create a file to contain our style node IDs
  await coreFigmaFunctions.getFigmaFileNodeIDs(
    coreFigmaFunctions.figmaCredentials.figmaAPIKey,
    coreFigmaFunctions.figmaCredentials.designTokensFileID
  );

  // we dynamically import the node IDs file created above
  const styles = await import('./styleNodeIds.js')
    .then((styleNodes) => {
      return styleNodes.styleNodeIds;
    })
    .catch((error) => {
      console.log(error);
    });

  const writeableStyles = await coreFigmaFunctions
    .getFigmaNodeStyleByID(
      coreFigmaFunctions.figmaCredentials.figmaAPIKey,
      coreFigmaFunctions.figmaCredentials.designTokensFileID,
      styles
    )
    .catch((error) => {
      console.log(error);
    });

  const writeableValues =
    writeableStyles + ']; exports.stylesObject = stylesObject';

  await fs
    .appendFile('./figma-functions/styles.js', writeableValues)
    .then(function () {
      console.log('styles.js created');
    })
    .catch((error) => {
      console.log(error);
    });

  const writtenStylesFile = await import('./styles.js')
    .then((stylesFile) => {
      return stylesFile.stylesObject;
    })
    .catch((error) => {
      console.log(error);
    });

  return writtenStylesFile;
}

exports.createStylesFile = createStylesFile;
