const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

Accordion variants:

Font styles - DONE
Border styles - DONE
Padding - DONE

Hover styles - DONE
Disabled styles - DONE

$accordion-body-background - DONE
$accordion-border-width: $token-accordion-border-width - DONE
$accordion-border-color: var(--accordion-border-color) - DONE
$accordion-icon-offset: 10px !default;
$accordion-padding-y: $group-list-padding-y !default;
$accordion-padding-x: $group-list-padding-x !default;

$accordion-icon-transition: all $global-transition-duration ease - TOKEN
$accordion-icon-animation: rotate(0) - HARD-CODED
$accordion-active-icon-animation: rotate(-180deg) - HARD-CODED
$accordion-expanded-icon: $token-icons-neo-icon-chevron-down - TOKEN
$accordion-contracted-icon: $token-icons-neo-icon-chevron-up - TOKEN

*/

async function accordionStyles(value) {
  accordionJSONObject = {
    accordion: {},
  };

  var accordionVariants = value.Other.children.filter(
    (child) => child.name === 'accordion'
  )[0].children;
  //   console.log(accordionVariants);

  for (variant of accordionVariants) {
    if (variant.name === 'Open=FALSE, State=default') {
      //   console.log(variant.children[0]);
      // padding
      accordionJSONObject.accordion['padding-x'] = {
        value: `${variant.children[0].paddingRight}px`,
      };
      accordionJSONObject.accordion['padding-y'] = {
        value: `${variant.children[0].paddingTop}px`,
      };
      // background-color
      var accordionColorTokenID = variant.children[0].styles.fills;
      accordionJSONObject.accordion['background-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            accordionColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                accordionColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // border styles
      // border width
      accordionJSONObject.accordion['border-width'] = {
        value: `${variant.children[0].strokeWeight}px`,
      };
      // border style
      accordionJSONObject.accordion['border-solid'] = {
        value: variant.children[0].strokes[0].type.toLowerCase(),
      };
      // border color
      var accordionBorderColorTokenID = variant.children[0].styles.strokes;
      accordionJSONObject.accordion['border-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            accordionBorderColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                accordionBorderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // font styles
      var accordionFontTokenID =
        variant.children[0].children[0].children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          accordionFontTokenID
        )
        .then((value) => {
          var accordionFontTokenName = value.nodes[
            accordionFontTokenID
          ].document.name.toLowerCase();
          // accordion-font-size
          accordionJSONObject.accordion['accordion-font-size'] = {
            value: `{Web-typography.${accordionFontTokenName}.fontSize.value}`,
          };
          // accordion-line-height
          accordionJSONObject.accordion['accordion-line-height'] = {
            value: `{Web-typography.${accordionFontTokenName}.lineHeight.value}`,
          };
          // accordion-letter-spacing
          accordionJSONObject.accordion['accordion-letter-spacing'] = {
            value: `{Web-typography.${accordionFontTokenName}.letterSpacing.value}`,
          };
          // accordion-font-weight
          accordionJSONObject.accordion['accordion-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // font color
      var accordionFontColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      accordionJSONObject.accordion['default-font-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            accordionFontColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                accordionFontColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (variant.name === 'Open=FALSE, State=hover') {
      // hover background-color
      var accordionHoverColorTokenID = variant.children[0].styles.fills;
      accordionJSONObject.accordion['hover-background-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            accordionHoverColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                accordionHoverColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (variant.name === 'Open=FALSE, State=disabled') {
      // disabled background color
      var accordionDisabledColorTokenID = variant.children[0].styles.fills;
      accordionJSONObject.accordion['disabled-background-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            accordionDisabledColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                accordionDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // disabled font color
      var accordionDisabledFontColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      accordionJSONObject.accordion['disabled-font-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            accordionDisabledFontColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                accordionDisabledFontColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (variant.name === 'Open=TRUE, State=hover') {
      // accordion body padding
      accordionJSONObject.accordion['body-padding-x'] = {
        value: `${variant.children[0].paddingRight}px`,
      };
      accordionJSONObject.accordion['body-padding-y-bottom'] = {
        value: `${variant.children[0].paddingBottom}px`,
      };
    }
  }
  console.log(accordionJSONObject);
  await fs
    .writeFile(
      '../properties/components/accordion.json',
      JSON.stringify(accordionJSONObject)
    )
    .then(function () {
      console.log('accordion.json created');
    });
}

exports.accordionStyles = accordionStyles;
