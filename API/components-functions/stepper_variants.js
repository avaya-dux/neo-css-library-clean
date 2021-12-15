const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

async function stepperStyles(FigmaObjects) {
  const stepperJSONObject = {
    stepper: {},
  };

  const stepperArray = FigmaObjects.Navigation.children.filter(
    (components) =>
      components.name === "stepper" && components.type === "COMPONENT_SET"
  )[0].children;

  const completedStepperVariant =
    "Orientation=Horizontal, Location=Start, Type=Complete, Label=TRUE, Optional text=TRUE, Bidirectional=FALSE";
  const currentStepperVariant =
    "Orientation=Horizontal, Location=Center, Type=Active, Label=TRUE, Optional text=TRUE, Bidirectional=FALSE";
  const disabledStepperVariant =
    "Orientation=Horizontal, Location=Start, Type=Disabled, Label=TRUE, Optional text=TRUE, Bidirectional=FALSE";

  for (const variant of stepperArray) {
    if (variant.name === completedStepperVariant) {
      const stepperColorID =
        variant.children[0].children[0].children[1].children[0].children[0]
          .styles.fills;
      coreFigmaFunctions
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

      stepperJSONObject.stepper["dash-width"] = {
        value: `${variant.children[0].children[0].children[2].children[0].size.x}px`,
      };

      stepperJSONObject.stepper["dash-border-width"] = {
        value: `${variant.children[0].children[0].children[2].children[0].strokeWeight}px`,
      };

      stepperJSONObject.stepper["dash-border-style"] = {
        value: variant.children[0].children[0].children[2].children[0].strokes[0].type.toLowerCase(),
      };

      stepperJSONObject.stepper["dash-spacing"] = {
        value: `${variant.children[0].children[0].itemSpacing}px`,
      };

      stepperJSONObject.stepper["indicator-size"] = {
        value: `${variant.children[0].children[0].children[1].children[0].children[0].size.x}px`,
      };

      stepperJSONObject.stepper["indicator-border-radius"] = {
        value: `${variant.children[0].children[0].children[1].children[0].children[0].cornerRadius}px`,
      };

      const iconName =
        variant.children[0].children[0].children[1].children[0].children[0]
          .children[0].children[0].name;
      stepperJSONObject.stepper["icon-name"] = {
        value: iconName.slice(iconName.indexOf("/") + 1),
      };

      stepperJSONObject.stepper["text-spacing"] = {
        value: `${variant.children[0].itemSpacing}px`,
      };

      const mainTextFontColor =
        variant.children[0].children[1].children[0].styles.fill;
      coreFigmaFunctions
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

      const optionalTextFontColor =
        variant.children[0].children[1].children[1].styles.fill;
      coreFigmaFunctions
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

      const mainTextFontTokenID =
        variant.children[0].children[1].children[0].styles.text;
      coreFigmaFunctions
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
          stepperJSONObject.stepper["main-text-complete-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
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

      const optionalTextFontTokenID =
        variant.children[0].children[1].children[0].styles.text;
      coreFigmaFunctions
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
          stepperJSONObject.stepper["optional-text-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
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

    if (variant.name === currentStepperVariant) {
      const innerCircleSize =
        variant.children[0].children[0].children[1].children[0].children[0]
          .children[0].size.x;
      stepperJSONObject.stepper["unselected-inner-circle-size"] = {
        value: `${Math.floor(innerCircleSize)}px`,
      };
    }

    if (variant.name === disabledStepperVariant) {
      stepperJSONObject.stepper["disabled-dash-border-width"] = {
        value: `${variant.children[0].children[0].children[2].children[0].strokeWeight}px`,
      };

      const disabledDashColorID =
        variant.children[0].children[0].children[2].children[0].styles.stroke;
      coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          disabledDashColorID
        )
        .then((value) => {
          stepperJSONObject.stepper["disabled-dash-color"] = {
            value: `{color.${value.nodes[
              disabledDashColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });

      const disabledIndicatorColorID =
        variant.children[0].children[0].children[1].children[0].children[0]
          .styles.strokes;
      coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          disabledIndicatorColorID
        )
        .then((value) => {
          stepperJSONObject.stepper["disabled-indicator-color"] = {
            value: `{color.${value.nodes[
              disabledIndicatorColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });

      stepperJSONObject.stepper["disabled-indicator-border-width"] = {
        value: `${variant.children[0].children[0].children[1].children[0].children[0].strokeWeight}px`,
      };

      const disabledMainTextFontColor =
        variant.children[0].children[1].children[0].styles.fill;
      coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          disabledMainTextFontColor
        )
        .then((value) => {
          stepperJSONObject.stepper["disabled-main-text-font-color"] = {
            value: `{color.${value.nodes[
              disabledMainTextFontColor
            ].document.name.toLowerCase()}.value}`,
          };
        });

      const disabledOptionalTextFontColor =
        variant.children[0].children[1].children[1].styles.fill;
      coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          disabledOptionalTextFontColor
        )
        .then((value) => {
          stepperJSONObject.stepper["disabled-optional-text-font-color"] = {
            value: `{color.${value.nodes[
              disabledOptionalTextFontColor
            ].document.name.toLowerCase()}.value}`,
          };
        });

      stepperJSONObject.stepper["main-text-font-weight"] = {
        value: `{Web-typography.fontweight-semibold.value}`,
      };
    }
  }

  fs.writeFile(
    "../properties/components/stepper.json",
    JSON.stringify(stepperJSONObject)
  ).catch((error) => {
    console.log(error);
  });
}

exports.stepperStyles = stepperStyles;
