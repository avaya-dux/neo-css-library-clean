const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

Modals:

Font styles
Icon styles
Border styles

Alignments?

$modal-width?
$modal-padding - padding for whole Modal, 
$modal-shadow: $token-modal-box-shadow-x-offset $token-modal-box-shadow-y-offset
  $token-modal-box-shadow-radius 0 $modal-shadow-color - DONE
$modal-radius - DONE
$modal-border-width
$modal-message-font-size?
$modal-message-margin-bottom - margin top & bottom - DONE
$modal-body-background - background-color - DONE
$modal-body-height?
$modal-border-color?
$modal-border: $token-border-solid-1-px-border-width
  $token-border-solid-1-px-border-style $modal-border-color - DONE
$modal-divider? - NO DIVIDER
$modal-header-padding - JUST USE FLEXBOX
$modal-animation-time - TOKEN?



*/

async function modalStyles(value) {
  const modalJSONObject = {
    modal: {},
  };

  const modalVariants = value.Overlay.children.filter(
    (comps) => comps.name === "modal"
  )[0].children;

  for (variant of modalVariants) {
    if (variant.name === "Type=action") {
      // modal button margin
      modalJSONObject.modal["button-margin"] = {
        value: `${variant.children[2].itemSpacing}px`,
      };
      console.log(variant.children[2]);
      // modal border styles
      // border width
      modalJSONObject.modal["border-width"] = {
        value: `${variant.strokeWeight}px`,
      };
      // border style
      modalJSONObject.modal["border-style"] = {
        value: variant.strokes[0].type.toLowerCase(),
      };
      // border color
      var modalBorderColorID = variant.styles.strokes;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          modalBorderColorID
        )
        .then((value) => {
          modalJSONObject.modal["border-color"] = {
            value: `{color.${value.nodes[
              modalBorderColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
      // modal box shadow offsets
      modalJSONObject.modal["box-shadow-y-offset"] = {
        value: `${variant.effects[0].offset.y}px`,
      };
      modalJSONObject.modal["box-shadow-x-offset"] = {
        value: `${variant.effects[0].offset.x}px`,
      };
      // modal box shadow radius
      modalJSONObject.modal["box-shadow-radius"] = {
        value: `${variant.effects[0].radius}px`,
      };
      // modal box shadow color
      var modalBoxShadowColorID = variant.styles.effect;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          modalBoxShadowColorID
        )
        .then((value) => {
          modalJSONObject.modal["box-shadow-color"] = {
            value: `{shadows.${value.nodes[modalBoxShadowColorID].document.name
              .replace("-", "")
              .toLowerCase()}.color.value}`,
          };
        });
      // modal body margin top
      modalJSONObject.modal["body-margin"] = {
        value: `${variant.itemSpacing}px`,
      };
      // modal padding
      modalJSONObject.modal["padding-y"] = {
        value: `${variant.paddingTop}px`,
      };
      modalJSONObject.modal["padding-x"] = {
        value: `${variant.paddingRight}px`,
      };
      // border-radius
      modalJSONObject.modal["border-radius"] = {
        value: `${variant.cornerRadius}px`,
      };
      // background-color
      var modalBgColorID = variant.styles.fills;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          modalBgColorID
        )
        .then((value) => {
          modalJSONObject.modal["background-color"] = {
            value: `{color.${value.nodes[
              modalBgColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
      // header font styles
      var modalHeaderTextTokenID = variant.children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          modalHeaderTextTokenID
        )
        .then((value) => {
          var fontTokenName =
            value.nodes[modalHeaderTextTokenID].document.name.toLowerCase();
          // font-size
          modalJSONObject.modal["header-font-size"] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          modalJSONObject.modal["header-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
          // line-height
          modalJSONObject.modal["header-line-height"] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          modalJSONObject.modal["header-letter-spacing"] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
      // header font color
      var modalHeaderColorID = variant.children[0].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          modalHeaderColorID
        )
        .then((value) => {
          modalJSONObject.modal["header-font-color"] = {
            value: `{color.${value.nodes[
              modalHeaderColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
  }

  console.log(modalJSONObject);
  await fs
    .writeFile(
      "../properties/components/modal.json",
      JSON.stringify(modalJSONObject)
    )
    .then(function () {
      console.log("modal.json created");
    });
}

exports.modalStyles = modalStyles;
