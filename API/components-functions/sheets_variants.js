const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

////// Sheets //////

sheet-background - DONE
sheet-shadow - DONE
sheet-width - NEEDED?
sheet-min-height - NEEDED?
sheet-padding - DONE
sheet-transition-duration: $token-interactivity-motion-fade-slow - TOKEN
sheet-transition-timing-function: $token-interactivity-motion-ease-in TOKEN
$sheet-shadow: $token-shadows-elevation-300-x-offset
  $token-shadows-elevation-300-y-offset $token-shadows-elevation-300-radius
  var(--sheet-shadow) !default;

Font styles
Icon styles and spacing - DONE


*/

async function sheetStyles(value) {
  // need to check code for cross-browser compatability?

  const sheetJSONObject = {
    sheet: {},
  };

  const sheetVariants = value.Overlay.children.filter(
    (comps) => comps.name === 'sheet'
  );

  for (const variant of sheetVariants[0].children) {
    if (variant.name === 'Left=title + back, Right=close') {
      console.log(variant.children[0]);
      // sheet box shadow
      var sheetShadowColorID = variant.children[0].styles.effect;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          sheetShadowColorID
        )
        .then((value) => {
          console.log(value.nodes[sheetShadowColorID].document);
          sheetJSONObject.sheet['sheet-shadow-color'] = {
            value: `{shadows.${value.nodes[sheetShadowColorID].document.name
              .replace('-', '')
              .toLowerCase()}.color.value}`,
          };
        });
      // sheet background color
      var sheetBackgroundColorID = variant.children[0].styles.fills;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          sheetBackgroundColorID
        )
        .then(
          (value) =>
            (sheetJSONObject.sheet['sheet-background-color'] = {
              value: `{color.${value.nodes[
                sheetBackgroundColorID
              ].document.name.toLowerCase()}.value}`,
            })
        );
      // sheet padding
      sheetJSONObject.sheet['padding-y'] = {
        value: `${variant.children[0].paddingTop}px`,
      };
      sheetJSONObject.sheet['padding-x'] = {
        value: `${variant.children[0].paddingRight}px`,
      };
      // header margin top
      sheetJSONObject.sheet['header-margin-top'] = {
        value: `${variant.children[0].itemSpacing}px`,
      };
      // header font styles
      var textTokenID =
        variant.children[0].children[0].children[0].children[1].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          textTokenID
        )
        .then((value) => {
          var fontTokenName = value.nodes[
            textTokenID
          ].document.name.toLowerCase();
          // font-size
          sheetJSONObject.sheet['header-font-size'] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          sheetJSONObject.sheet['header-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
          // line-height
          sheetJSONObject.sheet['header-line-height'] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          sheetJSONObject.sheet['header-letter-spacing'] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
      // header font color
      var headerFontColorID =
        variant.children[0].children[0].children[0].children[1].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          headerFontColorID
        )
        .then(
          (value) =>
            (sheetJSONObject.sheet['header-font-color'] = {
              value: `{color.${value.nodes[
                headerFontColorID
              ].document.name.toLowerCase()}.value}`,
            })
        );
      // header chevron icon styles
      // header chevron icon size
      sheetJSONObject.sheet['chevron-icon-size'] = {
        value: `${variant.children[0].children[0].children[0].children[0].size.x}px`,
      };
      // header chevron icon color
      var chevronIconColorID =
        variant.children[0].children[0].children[0].children[0].children[0]
          .styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          chevronIconColorID
        )
        .then(
          (value) =>
            (sheetJSONObject.sheet['chevron-icon-color'] = {
              value: `{color.${value.nodes[
                chevronIconColorID
              ].document.name.toLowerCase()}.value}`,
            })
        );
      // header chevron icon spacing
      sheetJSONObject.sheet['chevron-icon-size'] = {
        value: `${variant.children[0].children[0].children[0].itemSpacing}px`,
      };
      // header close icon size
      sheetJSONObject.sheet['close-icon-size'] = {
        value: `${variant.children[0].children[0].children[1].size.x}px`,
      };
      // header close color
      var closeIconColorID =
        variant.children[0].children[0].children[1].children[1].children[0]
          .styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          chevronIconColorID
        )
        .then(
          (value) =>
            (sheetJSONObject.sheet['close-icon-color'] = {
              value: `{color.${value.nodes[
                closeIconColorID
              ].document.name.toLowerCase()}.value}`,
            })
        );
    }
  }
  console.log(sheetJSONObject);
  await fs
    .writeFile(
      '../properties/components/sheet.json',
      JSON.stringify(sheetJSONObject)
    )
    .then(function () {
      console.log('sheet.json created');
    });
}

exports.sheetStyles = sheetStyles;
