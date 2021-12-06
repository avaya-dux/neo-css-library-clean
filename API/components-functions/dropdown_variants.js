const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

/ Dropdown colour variables

$dropdown-expand-icon: $token-icons-neo-icon-chevron-down TOKEN
$dropdown-expand-left-icon: $token-icons-neo-icon-chevron-left TOKEN
$dropdown-expand-right-icon: $token-icons-neo-icon-chevron-right TOKEN
$dropdown-animation-duration: $global-transition-duration TOKEN

$dropdown-color: var(--dropdown-color) - DONE
$dropdown-item-color: var(--dropdown-item-color) !default;
$dropdown-input-icon-color: $dropdown-item-color !default;
$dropdown-content-arrow-color: var(--dropdown-content-arrow-color) !default;
$dropdown-subcontent-arrow-color: $dropdown-content-arrow-color !default;
$dropdown-line-height: $input-line-height - DONE
$dropdown-font-size: $input-font-size - DONE
$dropdown-padding-x: 16px - DONE
$dropdown-padding-y: $global-spacer-large - DONE
$dropdown-radius: $global-radius - DONE
$dropdown-min-width: 150px !default - DONE
$dropdown-icon-margin-x: $global-spacer !default; - item-spacer
$dropdown-icon-margin-y: $global-spacer-small !default; - item-spacer
$dropdown-content-background-color: var(
  --dropdown-content-background-color
) !default; - NOT NEEDED/global background
$dropdown-content-padding: $global-spacer !default; - NOT NEEDED?
$dropdown-avatar-sm-margin-x: $global-spacer !default; - item-spacer
$dropdown-content-border-width: $token-menu-separator-border-bottom-width - DONE
$dropdown-content-border: $token-menu-separator-border-bottom-width
  $token-menu-separator-border-bottom-style var(--dropdown-content-border) - DONE
$dropdown-content-shadow: none - DONE
$dropdown-item-hover-color: var(--dropdown-item-hover-color) !default; - NOT NEEDED?
$dropdown-item-hover-background-color: var(
  --dropdown-item-hover-background-color
) - DONE
$dropdown-divider-border: 1px solid var-color-name(dropdown-divider) !default; - DONE

$dropdown-input-offset: 6px !default; - NOT NEEDED?
$dropdown-input-border: 2px solid var-color-name(dropdown-input-border) !default; - NOT NEEDED?
$dropdown-input-bg: transparent !default; - NOT NEEDED?
$dropdown-box-shadow: $token-menu-box-shadow-x-offset
  $token-menu-box-shadow-y-offset $token-menu-box-shadow-radius
  $token-menu-box-shadow-color !default; - DONE?


*/

async function dropdownStyles(value) {
  dropdownJSONObject = {
    dropdown: {},
  };
  var dropDownItemVariants = value.Navigation.children.filter(
    (child) => child.name === "dropdown-item"
  )[0].children;

  var dropDownComponent = value.Navigation.children.filter(
    (child) => child.name === "dropdown"
  )[0];

  // console.log(dropDownComponent);
  // console.log(dropDownComponent.children);
  // border styles
  //border-style
  dropdownJSONObject.dropdown["border-style"] = {
    value: dropDownComponent.strokes[0].type.toLowerCase(),
  };
  // border-width
  dropdownJSONObject.dropdown["border-width"] = {
    value: `${dropDownComponent.strokeWeight}px`,
  };
  // border color
  // hard coded for now
  dropdownJSONObject.dropdown["border-color"] = {
    value: `rgba(0, 0, 0, 0.15)`,
  };

  // divider styles
  // console.log(dropDownComponent.children[1].children[0].styles);
  var dividerColorTokenID =
    dropDownComponent.children[1].children[0].styles.stroke;
  dropdownJSONObject.dropdown["divider-color"] = {
    value: await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        dividerColorTokenID
      )
      .then(
        (value) =>
          //   console.log(
          //     value.nodes[headerFontTokenID].document.name.toLowerCase()
          //   );
          `{color.${value.nodes[
            dividerColorTokenID
          ].document.name.toLowerCase()}.value}`
      ),
  };

  // box shadow
  var dropdownShadowTokenID = dropDownComponent.styles.effect;
  await coreFigmaFunctions
    .getFigmaTokenNameByID(
      coreFigmaFunctions.figmaCredentials.figmaAPIKey,
      coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
      dropdownShadowTokenID
    )
    .then((value) => {
      var dropdownShadowTokenName = value.nodes[
        dropdownShadowTokenID
      ].document.name
        .toLowerCase()
        .replace("-", "");

      // x-offset
      dropdownJSONObject.dropdown["shadow-x-offset"] = {
        value: `{shadows.${dropdownShadowTokenName}.xOffset.value}`,
      };
      // y-offset
      dropdownJSONObject.dropdown["shadow-y-offset"] = {
        value: `{shadows.${dropdownShadowTokenName}.yOffset.value}`,
      };
      // radius
      dropdownJSONObject.dropdown["shadow-radius"] = {
        value: `{shadows.${dropdownShadowTokenName}.radius.value}`,
      };
      // color
      dropdownJSONObject.dropdown["shadow-color"] = {
        value: `{shadows.${dropdownShadowTokenName}.color.value}`,
      };
    });

  // border radius
  dropdownJSONObject.dropdown["border-radius"] = {
    value: `${dropDownComponent.cornerRadius}px`,
  };

  for (variant of dropDownItemVariants) {
    // read-only text styles
    if (
      variant.name ===
      "Left Side=none-read-only, Expandable=FALSE, State=default, Shortcut Text=FALSE"
    ) {
      var dropdownReadOnlyColorTokenID =
        variant.children[0].children[0].children[2].styles.fill;
      dropdownJSONObject.dropdown["readonly-font-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            dropdownReadOnlyColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                dropdownReadOnlyColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      var readOnlyFontTokenID =
        variant.children[0].children[0].children[2].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          readOnlyFontTokenID
        )
        .then((value) => {
          var readOnyFontTokenName = value.nodes[
            readOnlyFontTokenID
          ].document.name.toLowerCase();
          // font-size
          dropdownJSONObject.dropdown["readonly-font-size"] = {
            value: `{Web-typography.${readOnyFontTokenName}.fontSize.value}`,
          };
          // line-height
          dropdownJSONObject.dropdown["readonly-line-height"] = {
            value: `{Web-typography.${readOnyFontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          dropdownJSONObject.dropdown["readonly-letter-spacing"] = {
            value: `{Web-typography.${readOnyFontTokenName}.letterSpacing.value}`,
          };
          // font-weight
          dropdownJSONObject.dropdown["readonly-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
    }
    if (variant.name === "Left Side=none, Expandable=FALSE, State=default, Shortcut Text=FALSE") {
      // padding-x
      dropdownJSONObject.dropdown["padding-x"] = {
        value: `${variant.children[0].paddingRight}px`,
      };
      dropdownJSONObject.dropdown["padding-y"] = {
        value: `${variant.children[0].paddingTop}px`,
      };
      // min-width
      dropdownJSONObject.dropdown["min-width"] = {
        value: `${variant.size.x}px`,
      };
      // default font colour
      var dropdownDefaultColorTokenID =
        variant.children[0].children[0].children[2].styles.fill;
      dropdownJSONObject.dropdown["default-font-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            dropdownDefaultColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                dropdownDefaultColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // font styles
      var dropdownFontTokenID =
        variant.children[0].children[0].children[2].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          dropdownFontTokenID
        )
        .then((value) => {
          var dropdownFontTokenName = value.nodes[
            dropdownFontTokenID
          ].document.name.toLowerCase();
          // font-size
          dropdownJSONObject.dropdown["font-size"] = {
            value: `{Web-typography.${dropdownFontTokenName}.fontSize.value}`,
          };
          // line-height
          dropdownJSONObject.dropdown["line-height"] = {
            value: `{Web-typography.${dropdownFontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          dropdownJSONObject.dropdown["letter-spacing"] = {
            value: `{Web-typography.${dropdownFontTokenName}.letterSpacing.value}`,
          };
          // font-weight
          dropdownJSONObject.dropdown["font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
    }
    if (variant.name === "Left Side=none, Expandable=FALSE, State=disabled, Shortcut Text=FALSE") {
      // disabled font color
      var dropdownDisabledColorTokenID =
        variant.children[0].children[0].children[2].styles.fill;
      dropdownJSONObject.dropdown["disabled-font-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            dropdownDisabledColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                dropdownDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (variant.name === "Left Side=icon, Expandable=FALSE, State=default, Shortcut Text=FALSE") {
      // variant.children.forEach((child) => {
      //   console.log(child);
      // });
      // icon spacer
      dropdownJSONObject.dropdown["item-spacer"] = {
        value: `${variant.children[0].children[0].itemSpacing}px`,
      };
    }
    if (variant.name === "Left Side=none, Expandable=FALSE, State=default, Shortcut Text=TRUE") {
      var dropdownShortcutTextTokenID = variant.children[0].children[1].children[1].styles.fill;
      // console.log(dropdownShortcutTextTokenID)
      dropdownJSONObject.dropdown["shortcut-text-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            dropdownShortcutTextTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                dropdownShortcutTextTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // shortcut text styles
      var dropdownShortcutFontTokenID =
      variant.children[0].children[1].children[1].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          dropdownShortcutFontTokenID
        )
        .then((value) => {
          var dropdownShortcutFontTokenName = value.nodes[
            dropdownShortcutFontTokenID
          ].document.name.toLowerCase();
          // font-size
          dropdownJSONObject.dropdown["shortcut-font-size"] = {
            value: `{Web-typography.${dropdownShortcutFontTokenName}.fontSize.value}`,
          };
          // line-height
          dropdownJSONObject.dropdown["shortcut-line-height"] = {
            value: `{Web-typography.${dropdownShortcutFontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          dropdownJSONObject.dropdown["shortcut-letter-spacing"] = {
            value: `{Web-typography.${dropdownShortcutFontTokenName}.letterSpacing.value}`,
          };
          // font-weight
          dropdownJSONObject.dropdown["shortcut-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
    }
    if (variant.name === "Left Side=none, Expandable=FALSE, State=hover, Shortcut Text=FALSE") {
      // hover colour
      var dropdownHoverColorTokenID = variant.children[0].styles.fills;
      dropdownJSONObject.dropdown["hover-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            dropdownHoverColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                dropdownHoverColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
  }

  // console.log(dropDownItemVariants);

  console.log(dropdownJSONObject);

  await fs
    .writeFile(
      "../properties/components/dropdown.json",
      JSON.stringify(dropdownJSONObject)
    )
    .then(function () {
      console.log("dropdown.json created");
    });
}

exports.dropdownStyles = dropdownStyles;
