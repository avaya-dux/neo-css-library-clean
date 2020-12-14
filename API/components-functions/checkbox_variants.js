const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

Checkbox:

$checkbox-size: DONE
$checkbox-border-radius: DONE
$checkbox-icon-size: DONE
$checkbox-icon-color: DONE
$checkbox-checked-background: DONE
$checkbox-background: DONE
$checkbox-border-color: DONE
$checkbox-border-width: DONE
$checkbox-border-style: DONE
$checkbox-disabled-border: DONE
$checkbox-disabled-background: DONE
$checkbox-font-size: DONE
$checkbox-font-weight: DONE
$checkbox-line-height: DONE
$checkbox-letter-spacing: DONE
$checkbox-label-indent: DONE
$checkbox-disabled-font-color: DONE


*/

async function checkboxStyles(value) {
  // need to check code for cross-browser compatability?

  const checkboxJSONObject = {
    checkbox: {},
  };

  const checkVariants = value.Form.children.filter(
    (comps) => comps.name === 'checkbox'
  );

  // console.log(checkVariants);

  // styles for selected checkbox & general styles

  for (const comp of checkVariants[0].children) {
    // console.log(comp);
    if (comp.name === 'Label=OFF, Selected=ON, State=default') {
      // checkbox size
      // console.log(comp.children);
      // console.log(comp.children[1].children);
      checkboxJSONObject.checkbox['size'] = {
        value: `${comp.size.x}px`,
      };
      // checkbox border radius
      checkboxJSONObject.checkbox['border-radius'] = {
        value: `${comp.children[0].cornerRadius}px`,
      };
      // checkbox icon size
      var averageDim =
        (comp.children[1].children[0].size.x +
          comp.children[1].children[0].size.y) /
        2;
      checkboxJSONObject.checkbox['icon-font-size'] = {
        value: `${Math.round(averageDim)}px`,
      };
      // checkbox icon color
      var iconColorTokenID = comp.children[1].children[0].styles.fill;
      checkboxJSONObject.checkbox['icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            iconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                iconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // checkbox checked background
      var checkboxCheckedColorTokenID = comp.children[0].styles.fill;
      checkboxJSONObject.checkbox['checked-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            checkboxCheckedColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                checkboxCheckedColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (comp.name === 'Label=OFF, Selected=OFF, State=default') {
      // console.log(comp);
      // checkbox unchecked background
      var uncheckedCheckboxBackgroundColorTokenID = comp.styles.fills;
      checkboxJSONObject.checkbox['unchecked-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            uncheckedCheckboxBackgroundColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                uncheckedCheckboxBackgroundColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // checkbox unchecked border styles
      var checkboxBorderColorTokenID =
        comp.children[0].children[0].styles.stroke;
      // console.log(checkboxBorderColorTokenID);
      checkboxJSONObject.checkbox['border-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            checkboxBorderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                checkboxBorderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // checkbox border style & width
      checkboxJSONObject.checkbox['border-width'] = {
        value: `${comp.children[0].children[0].strokeWeight}px`,
      };
      checkboxJSONObject.checkbox['border-style'] = {
        value: comp.children[0].children[0].strokes[0].type.toLowerCase(),
      };
    }
    if (comp.name === 'Label=OFF, Selected=OFF, State=disabled') {
      // disabled border color
      var checkboxDisabledBorderColorTokenID =
        comp.children[0].children[0].children[0].styles.stroke;
      // console.log(checkboxDisabledBorderColorTokenID);
      checkboxJSONObject.checkbox['disabled-border-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            checkboxDisabledBorderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                checkboxDisabledBorderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (comp.name === 'Label=OFF, Selected=ON, State=disabled') {
      var checkboxDisabledBackgroundColorTokenID =
        comp.children[0].children[0].styles.fill;
      checkboxJSONObject.checkbox['disabled-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            checkboxDisabledBackgroundColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                checkboxDisabledBackgroundColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (comp.name === 'Label=ON, Selected=ON, State=default') {
      // console.log(comp.children[1]);
      // checkbox label font color
      var checkboxFontColorTokenID = comp.children[1].styles.fill;
      checkboxJSONObject.checkbox['label-font-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            checkboxFontColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                checkboxFontColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // checkbox label text styles
      var checkboxLabelTextTokenID = comp.children[1].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          checkboxLabelTextTokenID
        )
        .then((value) => {
          var fontTokenName = value.nodes[
            checkboxLabelTextTokenID
          ].document.name.toLowerCase();
          // font-size
          checkboxJSONObject.checkbox['font-size'] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          checkboxJSONObject.checkbox['font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
          // line-height
          checkboxJSONObject.checkbox['line-height'] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          checkboxJSONObject.checkbox['letter-spacing'] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
      // label indent -- CALCULATING VALUE SINCE DID NOT FIND IN API
      var labelIndent =
        comp.size.x - (comp.children[1].size.x + comp.children[0].size.x);
      // console.log(labelIndent);
      checkboxJSONObject.checkbox['label-indent'] = {
        value: `${labelIndent}px`,
      };
    }
    if (comp.name === 'Label=ON, Selected=ON, State=disabled') {
      // disabled font color
      var checkboxDisabledFontColorTokenID =
        comp.children[0].children[1].styles.fill;
      checkboxJSONObject.checkbox['label-disabled-font-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            checkboxDisabledFontColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                checkboxDisabledFontColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
  }
  console.log(checkboxJSONObject);

  await fs
    .writeFile(
      '../properties/components/checkbox.json',
      JSON.stringify(checkboxJSONObject)
    )
    .then(function () {
      console.log('checkbox.json created');
    });
}

exports.checkBoxStyles = checkboxStyles;
