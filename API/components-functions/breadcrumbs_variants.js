const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

///// Breadcrumbs styles /////

// font styles
// subtext font styles
// default / active colours
// padding

async function breadcrumbStyles(value) {
  const breadcrumbJSONObject = {
    breadcrumb: {},
  };

  // bradcrumb links
  var breadcrumbLinks = value.Navigation.children.filter(
    (child) => child.name === ".breadcrumbs-title-base"
  )[0].children;

  //   console.log(breadcrumbLinks);
  //   console.log(breadcrumbLinks[1]);

  // breadcrumb links font styles
  var breadcrumbFontTokenID = breadcrumbLinks[1].children[0].styles.text;
  await coreFigmaFunctions
    .getFigmaTokenNameByID(
      coreFigmaFunctions.figmaCredentials.figmaAPIKey,
      coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
      breadcrumbFontTokenID
    )
    .then((value) => {
      //   console.log(
      //     value.nodes[headerFontTokenID].document.name.toLowerCase()
      //   );
      var breadcrumbFontTokenName = value.nodes[
        breadcrumbFontTokenID
      ].document.name.toLowerCase();
      // breadcrumb-font-size
      breadcrumbJSONObject.breadcrumb["breadcrumb-font-size"] = {
        value: `{Web-typography.${breadcrumbFontTokenName}.fontSize.value}`,
      };
      // breadcrumb-line-height
      breadcrumbJSONObject.breadcrumb["breadcrumb-line-height"] = {
        value: `{Web-typography.${breadcrumbFontTokenName}.lineHeight.value}`,
      };
      // breadcrumb-letter-spacing
      breadcrumbJSONObject.breadcrumb["breadcrumb-letter-spacing"] = {
        value: `{Web-typography.${breadcrumbFontTokenName}.letterSpacing.value}`,
      };
      // breadcrumb-font-weight
      breadcrumbJSONObject.breadcrumb["breadcrumb-font-weight"] = {
        value: `{Web-typography.fontweight-regular.value}`,
      };
    });
  // breadcrumb slash spacing
  breadcrumbJSONObject.breadcrumb["breadcrumb-slash-spacing"] = {
    value: `${breadcrumbLinks[1].itemSpacing}px`,
  };
  // breadcrumbs default colour
  var defaultColorId = breadcrumbLinks[1].children[2].styles.fill;
  breadcrumbJSONObject.breadcrumb["default-color"] = {
    value: await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        defaultColorId
      )
      .then(
        (value) =>
          `{color.${value.nodes[
            defaultColorId
          ].document.name.toLowerCase()}.value}`
      ),
  };
  // breadcrumbs active colour
  var activeColorId = breadcrumbLinks[1].children[0].styles.fill;
  breadcrumbJSONObject.breadcrumb["active-color"] = {
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

  // breadcrumb subtext
  var breadcrumbSubtext = value.Navigation.children.filter(
    (child) => child.name === ".breadcrumbs-base"
  )[0].children;

  // breadcrumb subtext spacing
  breadcrumbJSONObject.breadcrumb["breadcrumb-subtext-spacing"] = {
    value: `${breadcrumbSubtext[1].itemSpacing}px`,
  };
  // breadcrumb subtext font styles
  var breadcrumbSubtextFontTokenID =
    breadcrumbSubtext[0].children[1].styles.text;
  await coreFigmaFunctions
    .getFigmaTokenNameByID(
      coreFigmaFunctions.figmaCredentials.figmaAPIKey,
      coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
      breadcrumbSubtextFontTokenID
    )
    .then((value) => {
      //   console.log(
      //     value.nodes[headerFontTokenID].document.name.toLowerCase()
      //   );
      var breadcrumbSubtextFontTokenName = value.nodes[
        breadcrumbSubtextFontTokenID
      ].document.name.toLowerCase();
      // breadcrumb-subtext-font-size
      breadcrumbJSONObject.breadcrumb["breadcrumb-subtext-font-size"] = {
        value: `{Web-typography.${breadcrumbSubtextFontTokenName}.fontSize.value}`,
      };
      // breadcrumb-subtext-line-height
      breadcrumbJSONObject.breadcrumb["breadcrumb-subtext-line-height"] = {
        value: `{Web-typography.${breadcrumbSubtextFontTokenName}.lineHeight.value}`,
      };
      // breadcrumb-subtext-letter-spacing
      breadcrumbJSONObject.breadcrumb["breadcrumb-subtext-letter-spacing"] = {
        value: `{Web-typography.${breadcrumbSubtextFontTokenName}.letterSpacing.value}`,
      };
      // breadcrumb-subtext-font-weight
      breadcrumbJSONObject.breadcrumb["breadcrumb-subtext-font-weight"] = {
        value: `{Web-typography.fontweight-regular.value}`,
      };
    });
  // breadcrumb subtext
  var breadcrumbButtons = value.Navigation.children.filter(
    (child) => child.name === ".breadcrumbs-buttons-base"
  )[0].children;
  //   console.log(breadcrumbButtons);

  // breadcrumb button spacing
  breadcrumbJSONObject.breadcrumb["breadcrumb-button-spacing"] = {
    value: `${breadcrumbButtons[1].itemSpacing}px`,
  };

  //   console.log(breadcrumbJSONObject);
  await fs
    .writeFile(
      "../properties/components/breadcrumbs.json",
      JSON.stringify(breadcrumbJSONObject)
    )
    .then(function () {
      console.log("breadcrumbs.json created");
    });
}

exports.breadcrumbStyles = breadcrumbStyles;
