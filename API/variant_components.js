const fs = require('fs').promises;
const coreFigmaFunctions = require('./figma-functions/core-figma-functions.js');

const switchStyles = require('./components-functions/switch_variants.js');
const radioStyles = require('./components-functions/radio_variants.js');
const tabStyles = require('./components-functions/tabs_variants.js');
const navbarStyles = require('./components-functions/navbar_variants.js');
const buttonStyles = require('./components-functions/buttons_variants.js');
const avatarStyles = require('./components-functions/avatar_variants.js');
const checkboxStyles = require('./components-functions/checkbox_variants.js');
const leftnavStyles = require('./components-functions/leftnav_variants.js');
const notificationStyles = require('./components-functions/notifications.js');
const listStyles = require('./components-functions/list_variants.js');
const chipStyles = require('./components-functions/chip_variants.js');
const inputStyles = require('./components-functions/input_variants.js');
const widgetStyles = require('./components-functions/widget_variants.js');
const tooltipStyles = require('./components-functions/tooltips_variants.js');
const accordionStyles = require('./components-functions/accordion_variants.js');
const sheetStyles = require('./components-functions/sheets_variants.js');
const modalStyles = require('./components-functions/modal_variants.js');
const tableStyles = require('./components-functions/table_variants.js');

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
    // avatarStyles.avatarStyles(value),
    // ];
    // for (const functions of varFunctions) {
    //   await functions(value);
    // }
    // await switchStyles.switchStyles(value);
    // await radioStyles.radioStyles(value);
    // await tabStyles.tabStyles(value);
    await navbarStyles.navbarStyles(value);
    // await buttonStyles.buttonStyles(value);
    // await avatarStyles.avatarStyles(value);
    // await checkboxStyles.checkBoxStyles(value);
    // await leftnavStyles.leftnavStyles(value);
    // await notificationStyles.notificationStyles(value);
    // await listStyles.listItemStyles(value);
    // await chipStyles.chipStyles(value);
    // await inputStyles.inputStyles(value);
    // await widgetStyles.widgetStyles(value);
    // await tooltipStyles.tooltipStyles(value);
    // await accordionStyles.accordionStyles(value);
    // await sheetStyles.sheetStyles(value);
    // await modalStyles.modalStyles(value);
    // await tableStyles.tableStyles(value);
  });

// coreFigmaFunctions
//   .getComponentPages(
//     coreFigmaFunctions.figmaCredentials.figmaAPIKey,
//     coreFigmaFunctions.figmaCredentials.varaintComponentsFileID
//   )
//   .then(async (value) => {});
