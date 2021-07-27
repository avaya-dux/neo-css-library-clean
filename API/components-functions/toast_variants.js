const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

Toast variants:

Font styles - DONE
Font Colour - DONE

Icon size - DONE
Icon spacing - DONE

Padding - DONE
Background colour - dark mode? - DONE

Border radius - DONE

Elevation?

*/

async function toastStyles(value) {
  toastJSONObject = {
    toast: {},
  };

  var toastVariants = value.Indicator.children.filter(
    (child) => child.name === "toast"
  )[0];

  //   console.log(toastVariants);

  for (const toast of toastVariants.children) {
    if (toast.name === "Icon=TRUE") {
      //   console.log(toast);
      //   console.log(toast.children);
      // padding
      toastJSONObject.toast["padding-y"] = {
        value: `${toast.paddingTop}px`,
      };
      toastJSONObject.toast["padding-x"] = {
        value: `${toast.paddingRight}px`,
      };
      // icon size
      toastJSONObject.toast["icon-size"] = {
        value: `${toast.children[0].size.x}px`,
      };
      // icon spacing
      toastJSONObject.toast["icon-spacing"] = {
        value: `${toast.itemSpacing}px`,
      };
      // border radius
      toastJSONObject.toast["border-radius"] = {
        value: `${toast.cornerRadius}px`,
      };
      // font styles
      var toastFontTokenID = toast.children[1].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          toastFontTokenID
        )
        .then((value) => {
          var fontTokenName =
            value.nodes[toastFontTokenID].document.name.toLowerCase();
          // font-size
          toastJSONObject.toast["font-size"] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // default font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          toastJSONObject.toast["default-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
          // line-height
          toastJSONObject.toast["line-height"] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          toastJSONObject.toast["letter-spacing"] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
      // font color
      var toastFontColorTokenID = toast.children[1].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          toastFontColorTokenID
        )
        .then(
          (value) =>
            (toastJSONObject.toast["font-color"] = {
              value: `{color.${value.nodes[
                toastFontColorTokenID
              ].document.name.toLowerCase()}.value}`,
            })
        );
      // background color
      var toastBackgroundColorTokenID = toast.styles.fills;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          toastBackgroundColorTokenID
        )
        .then(
          (value) =>
            (toastJSONObject.toast["background-color"] = {
              value: `{color.${value.nodes[
                toastBackgroundColorTokenID
              ].document.name.toLowerCase()}.value}`,
            })
        );
      // elevation
      var toastElevationTokenID = toast.styles.effect;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          toastElevationTokenID
        )
        .then((value) => {
          var elevationTokenName = value.nodes[
            toastElevationTokenID
          ].document.name
            .toLowerCase()
            .replace("-", "");
          // elevation-x-offset
          toastJSONObject.toast["elevation-x-offset"] = {
            value: `{shadows.${elevationTokenName}.xOffset.value}`,
          };
          // elevation-y-offset
          toastJSONObject.toast["elevation-y-offset"] = {
            value: `{shadows.${elevationTokenName}.yOffset.value}`,
          };
          // elevation-radius
          toastJSONObject.toast["elevation-radius"] = {
            value: `{shadows.${elevationTokenName}.radius.value}`,
          };
          // elevation-color
          toastJSONObject.toast["elevation-color"] = {
            value: `{shadows.${elevationTokenName}.color.value}`,
          };
        });
    }
  }

  //   console.log(toastJSONObject);

  await fs
    .writeFile(
      "../properties/components/toast.json",
      JSON.stringify(toastJSONObject)
    )
    .then(function () {
      console.log("toast.json created");
    })
    .catch((err) => {
      console.log(`Error creating toast.json: ${err}`);
    });
}

exports.toastStyles = toastStyles;
