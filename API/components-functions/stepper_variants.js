const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

Stepper Component styles:

Color
Icon
Font styles - title and subtext
Spacing
Lines?


*/

async function stepperStyles(value) {
  const stepperJSONObject = {
    stepper: {},
  };

  var stepperArray = value.Navigation.children.filter(
    (components) =>
      components.name === "stepper" && components.type === "COMPONENT_SET"
  )[0].children;

  for (const variant of stepperArray) {
    if (
      variant.name ===
      "Orientation=Horizontal, Location=Start, Type=Complete, Label=TRUE, Optional text=TRUE, Bidirectional=FALSE"
    ) {
      // color
      var stepperColorID =
        variant.children[0].children[0].children[1].children[0].children[0]
          .styles.fills;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          stepperColorID
        )
        .then((value) => {
          stepperJSONObject.stepper["background-color"] = {
            value: `{color.${value.nodes[
              stepperColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
      // dash/line
      stepperJSONObject.stepper["dash-width"] = {
        value: `${variant.children[0].children[0].children[2].children[0].size.x}px`,
      };
      // dash border width
      stepperJSONObject.stepper["border-width"] = {
        value: `${variant.children[0].children[0].children[2].children[0].strokeWeight}px`,
      };
      // dash border style
      stepperJSONObject.stepper["border-style"] = {
        value: variant.children[0].children[0].children[2].children[0].strokes[0].type.toLowerCase(),
      };
      // dash spacing
      stepperJSONObject.stepper["dash-spacing"] = {
        value: `${variant.children[0].children[0].itemSpacing}px`,
      };
      // button/indicator size
      stepperJSONObject.stepper["indicator-size"] = {
        value: `${variant.children[0].children[0].children[1].children[0].children[0].size.x}px`,
      };
      // button/indicator border-radius
      stepperJSONObject.stepper["indicator-border-radius"] = {
        value: `${variant.children[0].children[0].children[1].children[0].children[0].cornerRadius}px`,
      };
      // button icon name
      var iconName =
        variant.children[0].children[0].children[1].children[0].children[0]
          .children[0].children[0].name;
      stepperJSONObject.stepper["icon-name"] = {
        value: iconName.slice(iconName.indexOf("/") + 1),
      };
      // text spacing
      stepperJSONObject.stepper["text-spacing"] = {
        value: `${variant.children[0].itemSpacing}px`,
      };
      // main text font color
      var mainTextFontColor = variant.children[0].children[1].children[0].styles.fill
      await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        mainTextFontColor
      )
      .then((value) => {
        stepperJSONObject.stepper["main-text-font-color"] = {
          value: `{color.${value.nodes[
            mainTextFontColor
          ].document.name.toLowerCase()}.value}`,
        };
      });
       // optional text font color
       var optionalTextFontColor = variant.children[0].children[1].children[1].styles.fill
       await coreFigmaFunctions
       .getFigmaTokenNameByID(
         coreFigmaFunctions.figmaCredentials.figmaAPIKey,
         coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
         optionalTextFontColor
       )
       .then((value) => {
         stepperJSONObject.stepper["optional-text-font-color"] = {
           value: `{color.${value.nodes[
            optionalTextFontColor
           ].document.name.toLowerCase()}.value}`,
         };
       });
        // main text styles
    var mainTextFontTokenID = variant.children[0].children[1].children[0].styles.text;
    await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        mainTextFontTokenID
      )
      .then((value) => {
        stepperJSONObject.stepper["main-text-font-size"] = {
          value: `{Web-typography.${value.nodes[
            mainTextFontTokenID
          ].document.name.toLowerCase()}.fontSize.value}`,
        };
        stepperJSONObject.stepper['main-text-font-weight'] = {
          value: `{Web-typography.${value.nodes[
            mainTextFontTokenID
          ].document.name.toLowerCase()}.fontWeight.value}`,
        };
        stepperJSONObject.stepper["main-text-letter-spacing"] = {
          value: `{Web-typography.${value.nodes[
            mainTextFontTokenID
          ].document.name.toLowerCase()}.letterSpacing.value}`,
        };
        stepperJSONObject.stepper["main-text-line-height"] = {
          value: `{Web-typography.${value.nodes[
            mainTextFontTokenID
          ].document.name.toLowerCase()}.lineHeight.value}`,
        };
      });
              // optional text styles
    var optionalTextFontTokenID = variant.children[0].children[1].children[0].styles.text;
    await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        optionalTextFontTokenID
      )
      .then((value) => {
        stepperJSONObject.stepper["optional-text-font-size"] = {
          value: `{Web-typography.${value.nodes[
            optionalTextFontTokenID
          ].document.name.toLowerCase()}.fontSize.value}`,
        };
        stepperJSONObject.stepper['optional-text-font-weight'] = {
          value: `{Web-typography.${value.nodes[
            optionalTextFontTokenID
          ].document.name.toLowerCase()}.fontWeight.value}`,
        };
        stepperJSONObject.stepper["optional-text-letter-spacing"] = {
          value: `{Web-typography.${value.nodes[
            optionalTextFontTokenID
          ].document.name.toLowerCase()}.letterSpacing.value}`,
        };
        stepperJSONObject.stepper["optional-text-line-height"] = {
          value: `{Web-typography.${value.nodes[
            optionalTextFontTokenID
          ].document.name.toLowerCase()}.lineHeight.value}`,
        };
      });
    }
  }

  console.log(stepperJSONObject);
  // await fs
  //   .writeFile(
  //     '../properties/components/avatar.json',
  //     JSON.stringify(avatarJSONObject)
  //   )
  //   .then(function () {
  //     console.log('avatar.json created');
  //   });
}

exports.stepperStyles = stepperStyles
