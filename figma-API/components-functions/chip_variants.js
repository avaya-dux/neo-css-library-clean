const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

Chips:

// min-width - DONE
// min-height - DONE

// padding - DONE

alignment: flex

// spacing between items - DONE

// font-styles - DONE

// colors - DONE. hover colors - DONE

// icon colors - DONE

// icon size - DONE

// avatar size - CLASS NAME?

// expandable icon, close icon - TOKENS

// border styles - DONE, border colors - DONE

// border radius - DONE

*/

async function chipStyles(value) {
  const chipJSONObject = {
    chips: {},
  };

  const chipVariants = value.Other.children.filter(
    (comp) => comp.name == 'chip'
  )[0];

  for (variant of chipVariants.children) {
    if (
      variant.name ===
      'Function=default, Left Side=none, Right Side=none, State=default'
    ) {
      //min-height
      chipJSONObject.chips['min-height'] = {
        value: `${variant.size.y}px`,
      };
      //min-width
      chipJSONObject.chips['min-width'] = {
        value: `${variant.size.x}px`,
      };
      //padding-x
      chipJSONObject.chips['padding-x'] = {
        value: `${variant.children[0].paddingLeft}px`,
      };
      //padding-y
      chipJSONObject.chips['padding-y'] = {
        value: `${variant.children[0].paddingTop}px`,
      };
      // item-spacing
      chipJSONObject.chips['item-spacing'] = {
        value: `${variant.children[0].itemSpacing}px`,
      };
      //border-radius
      chipJSONObject.chips['border-radius'] = {
        value: `${variant.children[0].cornerRadius}px`,
      };
      //border-width
      //   console.log(variant.children[0].strokes);
      chipJSONObject.chips['border-style'] = {
        value: variant.children[0].strokes[0].type.toLowerCase(),
      };
      //border-style
      chipJSONObject.chips['border-width'] = {
        value: `${variant.children[0].strokeWeight}px`,
      };
      // font styles
      var textTokenID = variant.children[0].children[2].styles.text;

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
          chipJSONObject.chips['font-size'] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          chipJSONObject.chips['font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
          // line-height
          chipJSONObject.chips['line-height'] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          chipJSONObject.chips['letter-spacing'] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });

      // font color
      var textColorTokenID = variant.children[0].children[2].styles.fill;

      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          textColorTokenID
        )
        .then((value) => {
          chipJSONObject.chips['font-color'] = {
            value: `{color.${value.nodes[
              textColorTokenID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    if (
      variant.name ===
      'Function=default, Left Side=icon, Right Side=none, State=default'
    ) {
      // icon-size
      chipJSONObject.chips['icon-size'] = {
        value: `${variant.children[0].children[0].size.x}px`,
      };
    }
    // colors
    // default colors
    if (
      variant.name ===
      'Function=default, Left Side=none, Right Side=none, State=default'
    ) {
      // bg color
      var defaultColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['default-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // border color
      var defaultBorderColorTokenID = variant.children[0].styles.strokes;
      chipJSONObject.chips['default-border-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultBorderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultBorderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // success color
    if (
      variant.name ===
      'Function=success, Left Side=none, Right Side=none, State=default'
    ) {
      // bg color
      var successColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['success-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            successColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                successColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // border color
      var successBorderColorTokenID = variant.children[0].styles.strokes;
      chipJSONObject.chips['success-border-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            successBorderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                successBorderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // info color
    if (
      variant.name ===
      'Function=info, Left Side=none, Right Side=none, State=default'
    ) {
      // bg color
      var infoColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['info-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            infoColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                infoColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // border color
      var infoBorderColorTokenID = variant.children[0].styles.strokes;
      chipJSONObject.chips['info-border-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            infoBorderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                infoBorderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // alert color
    if (
      variant.name ===
      'Function=alert, Left Side=none, Right Side=none, State=default'
    ) {
      // bg color
      var alertColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['alert-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            alertColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                alertColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // border color
      var alertBorderColorTokenID = variant.children[0].styles.strokes;
      chipJSONObject.chips['alert-border-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            alertBorderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                alertBorderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // warning color
    if (
      variant.name ===
      'Function=warning, Left Side=none, Right Side=none, State=default'
    ) {
      // bg color
      var warningColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['warning-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            warningColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                warningColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // border color
      var warningBorderColorTokenID = variant.children[0].styles.strokes;
      chipJSONObject.chips['warning-border-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            warningBorderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                warningBorderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    //disabled colors
    // default color
    if (
      variant.name ===
      'Function=default, Left Side=icon, Right Side=none, State=disabled'
    ) {
      // disabled font color
      var disabledTextColorTokenID =
        variant.children[0].children[2].styles.fill;

      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          disabledTextColorTokenID
        )
        .then((value) => {
          chipJSONObject.chips['disabled-font-color'] = {
            value: `{color.${value.nodes[
              disabledTextColorTokenID
            ].document.name.toLowerCase()}.value}`,
          };
        });
      // bg color
      var defaultDisabledColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['default-disabled-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultDisabledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // icon color
      var defaultDisabledIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['default-disabled-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultDisabledIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultDisabledIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // success color
    if (
      variant.name ===
      'Function=success, Left Side=icon, Right Side=none, State=disabled'
    ) {
      // bg color
      var successDisabledColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['success-disabled-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            successDisabledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                successDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // icon color
      var successDisabledIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['success-disabled-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            successDisabledIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                successDisabledIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // info color
    if (
      variant.name ===
      'Function=info, Left Side=icon, Right Side=none, State=disabled'
    ) {
      // bg color
      var infoDisabledColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['info-disabled-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            infoDisabledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                infoDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // icon color
      var infoDisabledIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['info-disabled-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            infoDisabledIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                infoDisabledIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // alert color
    if (
      variant.name ===
      'Function=alert, Left Side=icon, Right Side=none, State=disabled'
    ) {
      // bg color
      var alertDisabledColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['alert-disabled-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            alertDisabledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                alertDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // icon color
      var alertDisabledIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['alert-disabled-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            alertDisabledIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                alertDisabledIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // warning color
    if (
      variant.name ===
      'Function=warning, Left Side=icon, Right Side=none, State=disabled'
    ) {
      // bg color
      var warningDisabledColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['warning-disabled-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            warningDisabledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                warningDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // icon color
      var warningDisabledIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['warning-disabled-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            warningDisabledIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                warningDisabledIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }

    // hover colors
    // default color
    if (
      variant.name ===
      'Function=default, Left Side=none, Right Side=none, State=hover'
    ) {
      // bg color
      var defaultHoverColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['default-hover-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultHoverColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultHoverColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // success color
    if (
      variant.name ===
      'Function=success, Left Side=none, Right Side=none, State=hover'
    ) {
      // bg color
      var successHoverColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['success-hover-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            successHoverColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                successHoverColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // info color
    if (
      variant.name ===
      'Function=info, Left Side=none, Right Side=none, State=hover'
    ) {
      // bg color
      var infoHoverColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['info-hover-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            infoHoverColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                infoHoverColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // alert color
    if (
      variant.name ===
      'Function=alert, Left Side=none, Right Side=none, State=hover'
    ) {
      // bg color
      var alertHoverColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['alert-hover-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            alertHoverColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                alertHoverColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // warning color
    if (
      variant.name ===
      'Function=warning, Left Side=none, Right Side=none, State=hover'
    ) {
      // bg color
      var warningHoverColorTokenID = variant.children[0].styles.fills;
      chipJSONObject.chips['warning-hover-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            warningHoverColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                warningHoverColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // icon-colors
    // default
    if (
      variant.name ===
      'Function=default, Left Side=icon, Right Side=none, State=default'
    ) {
      // icon color
      var defaultIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['default-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // success
    if (
      variant.name ===
      'Function=success, Left Side=icon, Right Side=none, State=default'
    ) {
      // icon color
      var successIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['success-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            successIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                successIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // info
    if (
      variant.name ===
      'Function=info, Left Side=icon, Right Side=none, State=default'
    ) {
      // icon color
      var infoIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['info-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            infoIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                infoIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // alert
    if (
      variant.name ===
      'Function=alert, Left Side=icon, Right Side=none, State=default'
    ) {
      // icon color
      var alertIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['alert-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            alertIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                alertIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // warning
    if (
      variant.name ===
      'Function=warning, Left Side=icon, Right Side=none, State=default'
    ) {
      // icon color
      var warningIconColorTokenID =
        variant.children[0].children[0].children[0].styles.fill;
      chipJSONObject.chips['warning-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            warningIconColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                warningIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
  }

  console.log(chipJSONObject);
  await fs
    .writeFile(
      '../properties/components/chipVariants.json',
      JSON.stringify(chipJSONObject)
    )
    .then(function () {
      console.log('chipVariants.json created');
    });
}

exports.chipStyles = chipStyles;
