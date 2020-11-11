const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

Radio:

// $radio-border: $token-radio-border-width $token-radio-border-style - DONE
// $token-radio-border-color !default; - DONE
// $radio-text-offset: 22px !default; - SHOULD BE WIDTH OF RADIO PLUS TEXT MARGIN
// $radio-label-offset-x: $global-spacer-x-large !default; - DELETED
// $radio-disabled-opacity: $global-opacity !default; - SET TO GLOBAL DISABLED TEXT COLOR
// $radio-background-active-color: $token-radio-selected-target-background - DONE
// $radio-background: $global-background - DONE
// $radio-size - DONE
// $radio-active-ellipse-size? - DONE
// $radio-border-radius? - hard-coded value associated with Ellipse Component type in Figma
// $radio-positioning? - DONE
// $radio-ellipse-positioning? - DONE

*/

function radioStyles(value) {
  radioJSONObject = {
    radio: {},
  };
  value.Form.children.forEach(async (child) => {
    if (child.name === 'radio') {
      var children = child.children;
      // $radio-size
      radioJSONObject.radio['size'] = {
        value: `${children[0].size.x}px`,
      };

      // $radio-active-ellipse-size
      radioJSONObject.radio['active-ellipse-size'] = {
        value: `${children[0].children[1].size.x}px`,
      };

      //$radio-positioning

      radioJSONObject.radio['position-top'] = {
        value: `${children[4].children[0].relativeTransform[1][2]}px`,
      };

      //$radio-ellipse-positioning
      var ellipsePositionTop =
        children[4].children[0].relativeTransform[1][2] +
        children[4].children[0].children[1].relativeTransform[1][2];
      var ellipsePositionLeft =
        children[4].children[0].children[1].relativeTransform[0][2];

      radioJSONObject.radio['ellipse-position-top'] = {
        value: `${ellipsePositionTop}px`,
      };

      radioJSONObject.radio['ellipse-position-left'] = {
        value: `${ellipsePositionLeft}px`,
      };

      // $radio-background
      var backgroundColorId = children[0].children[0].styles.fill;
      radioJSONObject.radio['background-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            backgroundColorId
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                backgroundColorId
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // $radio-active-color
      var activeColorId = children[0].children[1].styles.fill;
      radioJSONObject.radio['active-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            activeColorId
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                activeColorId
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // $radio-disabled-border
      var disabledBorderColorId =
        children[1].children[0].children[0].styles.stroke;
      var disabledBorderColor = await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          disabledBorderColorId
        )
        .then(
          (value) =>
            `{color.${value.nodes[
              disabledBorderColorId
            ].document.name.toLowerCase()}.value}`
        );

      radioJSONObject.radio['disabled-border'] = {
        value: `${
          children[1].children[0].children[0].strokeWeight
        }px ${children[1].children[0].children[0].strokes[0].type.toLowerCase()} ${disabledBorderColor}`,
      };

      // radio-border
      var borderColorId = children[0].children[0].styles.stroke;
      var borderColor = await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          borderColorId
        )
        .then((value) =>
          value.nodes[borderColorId].document.name.toLowerCase()
        );

      radioJSONObject.radio['border'] = {
        value: `${
          children[0].children[0].strokeWeight
        }px ${children[0].children[0].strokes[0].type.toLowerCase()} {color.${borderColor}.value}`,
      };

      // $radio-text-offset
      radioJSONObject.radio['text-offset'] = {
        value: `${children[4].children[1].relativeTransform[0][2]}px`,
      };
      // console.log(radioJSONObject);
      await fs
        .writeFile(
          '../properties/components/radio.json',
          JSON.stringify(radioJSONObject)
        )
        .then(function () {
          console.log('radio.json created');
        });
    }
  });
}

exports.radioStyles = radioStyles;
