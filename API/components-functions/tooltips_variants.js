const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

//// Tooltip /////

font styles, color - DONE

$tooltip-background - DONE
$tooltip-color - DONE, see above
$tooltip-width - DON'T NEED?
$tooltip-offset - DON'T NEED?
$tooltip-animation-duration - TOKEN
$tooltip-font-size - DONE, see above
$tooltip-border-radius - DONE
$tooltip-padding - DONE
$tooltip-z: 999 !default; - HARD-CODED
$tooltip-height - DON'T NEED?


*/

async function tooltipStyles(value) {
  tooltipJSONObject = {
    tooltip: {},
  };
  var tooltipVariants = value.Overlay.children.filter(
    (child) => child.name === 'tooltip'
  )[0].children;

  for (variant of tooltipVariants) {
    if (variant.name === 'Direction=right') {
      console.log(variant);
      console.log(variant.children[0]);
      console.log(variant.children[1]);
      // padding
      tooltipJSONObject.tooltip['padding-x'] = {
        value: `${variant.children[1].paddingRight}px`,
      };
      tooltipJSONObject.tooltip['padding-y'] = {
        value: `${variant.children[1].paddingTop}px`,
      };
      // border radius
      tooltipJSONObject.tooltip['border-radius'] = {
        value: `${variant.children[1].cornerRadius}px`,
      };
      // background-color
      var tooltipBgColorTokenID = variant.children[1].styles.fills;
      tooltipJSONObject.tooltip['background-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            tooltipBgColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                tooltipBgColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // font styles
      var tooltipFontTokenID = variant.children[1].children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          tooltipFontTokenID
        )
        .then((value) => {
          var tooltipFontTokenName = value.nodes[
            tooltipFontTokenID
          ].document.name.toLowerCase();
          // tooltip-font-size
          tooltipJSONObject.tooltip['tooltip-font-size'] = {
            value: `{Web-typography.${tooltipFontTokenName}.fontSize.value}`,
          };
          // tooltip-line-height
          tooltipJSONObject.tooltip['tooltip-line-height'] = {
            value: `{Web-typography.${tooltipFontTokenName}.lineHeight.value}`,
          };
          // tooltip-letter-spacing
          tooltipJSONObject.tooltip['tooltip-letter-spacing'] = {
            value: `{Web-typography.${tooltipFontTokenName}.letterSpacing.value}`,
          };
          // tooltip-font-weight
          tooltipJSONObject.tooltip['tooltip-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // font color
      var tooltipFontColorTokenID = variant.children[1].children[0].styles.fill;
      tooltipJSONObject.tooltip['font-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            tooltipFontColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                tooltipFontColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
  }
  console.log(tooltipJSONObject);
  // await fs
  //   .writeFile(
  //     '../properties/components/tooltip.json',
  //     JSON.stringify(tooltipJSONObject)
  //   )
  //   .then(function () {
  //     console.log('tooltip.json created');
  //   });
}

exports.tooltipStyles = tooltipStyles;
