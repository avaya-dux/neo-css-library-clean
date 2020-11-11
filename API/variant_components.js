const fs = require('fs').promises;
const coreFigmaFunctions = require('./figma-functions/core-figma-functions.js');

const switchStyles = require('./components-functions/switch_variants.js');
const radioStyles = require('./components-functions/radio_variants.js');

// coreFigmaFunctions
//   .getComponentPages(
//     coreFigmaFunctions.figmaCredentials.figmaAPIKey,
//     coreFigmaFunctions.figmaCredentials.varaintComponentsFileID
//   )
//   .then(async (value) => {
//     await switchStyles.switchStyles(value);
//     await radioStyles.radioStyles(value);
//   });

coreFigmaFunctions
  .getComponentPages(
    coreFigmaFunctions.figmaCredentials.figmaAPIKey,
    coreFigmaFunctions.figmaCredentials.varaintComponentsFileID
  )
  .then(async (value) => {
    checkboxJSONObject = {
      checkbox: {},
    };
    value.Form.children.forEach(async (child) => {
      if (child.name === 'checkbox') {
        // console.log(radioJSONObject);
      }
    });
  });

/*

Checkbox:

$checkbox-size: 16px !default;
$checkbox-background: $global-background !default;
$checkbox-checked-background: $token-checkbox-selected-background-color !default;
$checkbox-disabled-background: $token-checkbox-disabled-background-color !default;
$checkbox-icon-width: 6px !default;
$checkbox-icon-height: 9px !default;
$checkbox-icon-color: $global-background !default;
$checkbox-label-indent: $global-spacer-large !default;
$checkbox-font-size: $token-web-typography-web-tiny-body-font-size !default;
$checkbox-color: $token-color-base-100 !default;

$checkbox-border
$checkbox-border-radius

*/
