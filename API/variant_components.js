const fs = require('fs').promises;
const coreFigmaFunctions = require('./figma-functions/core-figma-functions.js');

const switchStyles = require('./components-functions/switch_variants.js');
const radioStyles = require('./components-functions/radio_variants.js');
const tabStyles = require('./components-functions/tabs_variants.js');
const navbarStyles = require('./components-functions/navbar_variants.js');
const buttonStyles = require('./components-functions/buttons_variants.js');
const avatarStyles = require('./components-functions/avatar_variants.js');

coreFigmaFunctions
  .getComponentPages(
    coreFigmaFunctions.figmaCredentials.figmaAPIKey,
    coreFigmaFunctions.figmaCredentials.varaintComponentsFileID
  )
  .then(async (value) => {
    // const varFunctions = [
    //   switchStyles.switchStyles,
    //   radioStyles.radioStyles,
    //   navbarStyles.navbarStyles,
    //   buttonStyles.buttonStyles,
    // ];
    // for (const functions of varFunctions) {
    //   await functions(value);
    // }
    // await switchStyles.switchStyles(value);
    // await radioStyles.radioStyles(value);
    // await tabStyles.tabStyles(value);
    // await navbarStyles.navbarStyles(value);
    // await buttonStyles.buttonStyles(value);
    await avatarStyles.avatarStyles(value);
  });

// coreFigmaFunctions
//   .getComponentPages(
//     coreFigmaFunctions.figmaCredentials.figmaAPIKey,
//     coreFigmaFunctions.figmaCredentials.varaintComponentsFileID
//   )
//   .then(async (value) => {});
