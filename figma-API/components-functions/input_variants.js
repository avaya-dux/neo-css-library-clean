const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*
/////////////////
Inputs
////////////////

- height and width?
  - minimum height

- padding - DONE?

- vertical spacing - DONE?
    - horizontal space between label and icon - DONE
    - space between label and required star - no, it's just a regular space
    - space between label and error - DONE

- icon styles - sizes - regular - DONE, error - DONE
    - icons - TOKENS (close, error)

- label font styles & colors - DONE?
- input font styles & colors - DONE?
    - placeholder styles?
- helper font styles & colors - DONE?
- error font styles - icon size - DONE?

- required color - SAME AS ERROR COLOR
- disabled color - DONE
    - background color - DONE

- border styles - DONE
    - how many border colors are there? - regular - DONE, hover - DONE, active - DONE, error - DONE, disabled - DONE
- border radius - DONE

// what about styles for inputs with icons/buttons
    -- these are 'input groups' and should be named as such
    -- we are getting rid of buttons
    Style:
        - font styles - just font color
        - icon size - it's not an icon, just text
        - padding - same as larger input

    - what about alignment?


*/

async function inputStyles(value) {
  const inputJSONObject = {
    input: {},
  };

  const inputVariants = value.Form.children.filter(
    (comps) => comps.name === "input"
  )[0].children;

  const readOnlyInputComp = value.Form.children.filter(
    (comps) => comps.name === "input-read-only"
  )[0];

  inputJSONObject.input["read-only-label-padding"] = {
    value: `${readOnlyInputComp.itemSpacing}px`,
  };

  for (variant of inputVariants) {
    if (
      variant.name ===
      "Label=optional, Left Side=none, Right Side=none, Helper Text=TRUE, State=default, Text=filled"
    ) {
      // input minimum height
      inputJSONObject.input["min-height"] = {
        value: `${variant.children[0].children[1].children[0].size.y}px`,
      };
      // input padding-y
      inputJSONObject.input["padding-y"] = {
        value: `${variant.children[0].children[1].children[0].paddingTop}px`,
      };
      // input padding-x
      inputJSONObject.input["padding-x"] = {
        value: `${variant.children[0].children[1].children[0].paddingRight}px`,
      };
      // vertical item spacing
      inputJSONObject.input["vertical-margin"] = {
        value: `${variant.children[0].itemSpacing}px`,
      };
      // label font styles
      var labelFontTokenID =
        variant.children[0].children[0].children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          labelFontTokenID
        )
        .then((value) => {
          var labelFontTokenName =
            value.nodes[labelFontTokenID].document.name.toLowerCase();
          // label-font-size
          inputJSONObject.input["label-font-size"] = {
            value: `{Web-typography.${labelFontTokenName}.fontSize.value}`,
          };
          // label-line-height
          inputJSONObject.input["label-line-height"] = {
            value: `{Web-typography.${labelFontTokenName}.lineHeight.value}`,
          };
          // label-letter-spacing
          inputJSONObject.input["label-letter-spacing"] = {
            value: `{Web-typography.${labelFontTokenName}.letterSpacing.value}`,
          };
          // label-font-weight
          inputJSONObject.input["label-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // label color
      var labelColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      inputJSONObject.input["label-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            labelColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                labelColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // helper font styles
      var helperFontTokenID =
        variant.children[0].children[2].children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          helperFontTokenID
        )
        .then((value) => {
          var helperFontTokenName =
            value.nodes[helperFontTokenID].document.name.toLowerCase();
          // helper-font-size
          inputJSONObject.input["helper-font-size"] = {
            value: `{Web-typography.${helperFontTokenName}.fontSize.value}`,
          };
          // helper-line-height
          inputJSONObject.input["helper-line-height"] = {
            value: `{Web-typography.${helperFontTokenName}.lineHeight.value}`,
          };
          // helper-letter-spacing
          inputJSONObject.input["helper-letter-spacing"] = {
            value: `{Web-typography.${helperFontTokenName}.letterSpacing.value}`,
          };
          // helper-font-weight
          inputJSONObject.input["helper-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // helper color
      var helperColorTokenID =
        variant.children[0].children[2].children[0].styles.fill;
      inputJSONObject.input["helper-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            helperColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                helperColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // filled input font styles
      var filledFontTokenID =
        variant.children[0].children[1].children[0].children[0].children[2]
          .children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          filledFontTokenID
        )
        .then((value) => {
          var filledFontTokenName =
            value.nodes[filledFontTokenID].document.name.toLowerCase();
          // filled-font-size
          inputJSONObject.input["filled-font-size"] = {
            value: `{Web-typography.${filledFontTokenName}.fontSize.value}`,
          };
          // filled-line-height
          inputJSONObject.input["filled-line-height"] = {
            value: `{Web-typography.${filledFontTokenName}.lineHeight.value}`,
          };
          // filled-letter-spacing
          inputJSONObject.input["filled-letter-spacing"] = {
            value: `{Web-typography.${filledFontTokenName}.letterSpacing.value}`,
          };
          // filled-font-weight
          inputJSONObject.input["filled-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // filled color
      var filledColorTokenID =
        variant.children[0].children[1].children[0].children[0].children[2]
          .children[0].styles.fill;
      inputJSONObject.input["filled-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            filledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                filledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // border width
      inputJSONObject.input["border-width"] = {
        value: `${variant.children[0].children[1].children[0].strokeWeight}px`,
      };
      // border style
      inputJSONObject.input["border-style"] = {
        value:
          variant.children[0].children[1].children[0].strokes[0].type.toLowerCase(),
      };
      // border-color
      var borderColorTokenID =
        variant.children[0].children[1].children[0].styles.strokes;
      inputJSONObject.input["border-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            borderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                borderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // border radius
      inputJSONObject.input["border-radius"] = {
        value: `${variant.children[0].children[1].children[0].cornerRadius}px`,
      };
    }
    if (
      variant.name ===
      "Label=none, Left Side=icon, Right Side=none, Helper Text=TRUE, State=default, Text=filled"
    ) {
      // icon size
      inputJSONObject.input["label-icon-size"] = {
        value: `${variant.children[0].children[1].children[0].children[0].children[0].size.x}px`,
      };
      // label/icon spacing
      inputJSONObject.input["label-icon-spacing"] = {
        value: `${variant.children[0].children[1].children[0].itemSpacing}px`,
      };
    }
    if (
      variant.name ===
      "Label=none, Left Side=none, Right Side=none, Helper Text=TRUE, State=hover, Text=filled"
    ) {
      // close button
      inputJSONObject.input["input-close-button-size"] = {
        value: `${variant.children[0].children[1].children[0].children[1].size.x}px`,
      };
      // border-hover-color
      var borderColorTokenID =
        variant.children[0].children[1].children[0].styles.strokes;
      inputJSONObject.input["border-hover-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            borderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                borderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      variant.name ===
      "Label=none, Left Side=none, Right Side=none, Helper Text=TRUE, State=active, Text=filled"
    ) {
      // border-active-color
      var borderColorTokenID =
        variant.children[0].children[1].children[0].styles.strokes;
      inputJSONObject.input["border-active-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            borderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                borderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      variant.name ===
      "Label=none, Left Side=none, Right Side=none, Helper Text=TRUE, State=error, Text=filled"
    ) {
      // border-error-color
      var borderColorTokenID =
        variant.children[0].children[1].children[0].styles.strokes;
      inputJSONObject.input["border-error-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            borderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                borderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // error helper color
      var helperColorTokenID =
        variant.children[0].children[2].children[1].styles.fill;
      inputJSONObject.input["error-helper-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            helperColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                helperColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // icon/helper spacing
      inputJSONObject.input["error-helper-spacing"] = {
        value: `${variant.children[0].children[2].itemSpacing}px`,
      };
      // error icon size
      inputJSONObject.input["error-icon-size"] = {
        value: `${variant.children[0].children[2].children[0].size.x}px`,
      };
    }
    if (
      variant.name ===
      "Label=none, Left Side=none, Right Side=none, Helper Text=TRUE, State=disabled, Text=filled"
    ) {
      // disabled border color
      var borderColorTokenID =
        variant.children[0].children[1].children[0].styles.strokes;
      inputJSONObject.input["border-disabled-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            borderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                borderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // disabled background color
      var disabledBackgroundColorTokenID =
        variant.children[0].children[1].children[0].styles.fills;
      inputJSONObject.input["disabled-bg-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            disabledBackgroundColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                disabledBackgroundColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // disabled text color
      var disabledTextColorTokenID =
        variant.children[0].children[1].children[0].children[0].children[2]
          .children[0].styles.fill;
      inputJSONObject.input["disabled-text-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            disabledTextColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                disabledTextColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      variant.name ===
      "Label=none, Left Side=none, Right Side=none, Helper Text=TRUE, State=default, Text=placeholder"
    ) {
      // placeholder styles
      // placeholder text style
      if (
        variant.children[0].children[1].children[0].children[0].children[2]
          .children[0].style.italic
      ) {
        inputJSONObject.input["placeholder-font-style"] = {
          value: "italic",
        };
      }
      var placeholderFontTokenID =
        variant.children[0].children[1].children[0].children[0].children[2]
          .children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          placeholderFontTokenID
        )
        .then((value) => {
          var placeholderFontTokenName =
            value.nodes[placeholderFontTokenID].document.name.toLowerCase();
          // placeholder-font-size
          inputJSONObject.input["placeholder-font-size"] = {
            value: `{Web-typography.${placeholderFontTokenName}.fontSize.value}`,
          };
          // placeholder-line-height
          inputJSONObject.input["placeholder-line-height"] = {
            value: `{Web-typography.${placeholderFontTokenName}.lineHeight.value}`,
          };
          // placeholder-letter-spacing
          inputJSONObject.input["placeholder-letter-spacing"] = {
            value: `{Web-typography.${placeholderFontTokenName}.letterSpacing.value}`,
          };
          // placeholder-font-weight
          inputJSONObject.input["placeholder-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // placeholder color
      var placeholderColorTokenID =
        variant.children[0].children[1].children[0].children[0].children[2]
          .children[0].styles.fill;
      inputJSONObject.input["placeholder-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            placeholderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                placeholderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    /////////////// Input Groups /////////////////
    if (
      variant.name ===
      "Label=none, Left Side=prefix, Right Side=suffix, Helper Text=TRUE, State=default, Text=filled"
    ) {
      var addonTextColorTokenID =
        variant.children[0].children[1].children[0].children[0].children[1]
          .children[0].styles.fill;
      inputJSONObject.input["addon-text-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            addonTextColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                addonTextColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // suffix font color
    }
  }

  await fs
    .writeFile(
      "../style-dictionary/properties/components/inputs.json",
      JSON.stringify(inputJSONObject)
    )
    .then(function () {
      console.log("inputs.json created");
    });
}

exports.inputStyles = inputStyles;
