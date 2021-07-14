const colorTokens = require("./tokens-functions/color-tokens.js");
const typographyTokens = require("./tokens-functions/typography-tokens.js");
const effectTokens = require("./tokens-functions/effect-tokens.js");
const borderTokens = require("./tokens-functions/border-tokens.js");
const interactivityTokens = require("./tokens-functions/interactivity-tokens");
const spacerTokens = require("./tokens-functions/spacer-tokens");
const coreFigmaFunctions = require("./figma-functions/core-figma-functions.js");
const expandedFigmaFunctions = require("./figma-functions/expanded-figma-functions.js");
const iconFunctions = require("./icons-functions/icons-functions.js");

// this is where we create our design tokens

async function pullAllDesignTokens() {
  const stylesToParse = await expandedFigmaFunctions.createStylesFile();

  const figmaObjectTree = await coreFigmaFunctions.getFigmaObjTree(
    coreFigmaFunctions.figmaCredentials.figmaAPIKey,
    coreFigmaFunctions.figmaCredentials.designTokensFileID
  );

  await borderTokens.pullBorderRadiusTokens(figmaObjectTree);
  await borderTokens.pullBorderTokens(figmaObjectTree);

  await typographyTokens.pullTypographyTokens(stylesToParse);
  await effectTokens.pullEffectTokens(stylesToParse);
  await colorTokens.pullColorTokens(stylesToParse);
  await interactivityTokens.pullInteractivityTokens();
  await spacerTokens.pullSpacerTokens();
}

pullAllDesignTokens()
  .then(() =>
    iconFunctions.pullIcons(
      coreFigmaFunctions.figmaCredentials.figmaAPIKey,
      coreFigmaFunctions.figmaCredentials.iconsFileID,
      [
        "editor/font-family-ar",
        "editor/font-family-he",
        "editor/font-family-zh",
        "editor/font-family-ja",
        "editor/font-family-ko",
        "editor/font-color-ar",
        "editor/font-color-he",
        "editor/font-color-zh",
        "editor/font-color-ja",
        "editor/font-color-ko",
        "editor/format-expand-ar",
        "editor/format-expand-he",
        "editor/format-expand-zh",
        "editor/format-expand-ja",
        "editor/format-expand-ko",
        "editor/format-collapse-ar",
        "editor/format-collapse-he",
        "editor/format-collapse-zh",
        "editor/format-collapse-ja",
        "editor/format-collapse-ko",
        "editor/font-highlight-ar",
        "editor/font-highlight-he",
        "editor/font-highlight-zh",
        "editor/font-highlight-ja",
        "editor/font-highlight-ko",
        "editor/format-predefined-ar",
        "editor/format-predefined-he",
        "editor/format-predefined-zh",
        "editor/format-predefined-ja",
        "editor/format-predefined-ko",
        "editor/format-remove-ar",
        "editor/format-remove-he",
        "editor/format-remove-zh",
        "editor/format-remove-ja",
        "editor/format-remove-ko",
        "editor/font-size-ar",
        "editor/font-size-he",
        "editor/font-size-zh",
        "editor/font-size-ja",
        "editor/font-size-ko",
      ]
    )
  )
  .catch((error) => console.log(error));

// code to debug stale data from API

// iconFunctions.getIconsComponents(
//   coreFigmaFunctions.figmaCredentials.iconsFileID,
//   coreFigmaFunctions.figmaCredentials.figmaAPIKey
// );

// coreFigmaFunctions.getFigmaNodeStyleByID(
//   coreFigmaFunctions.figmaCredentials.figmaAPIKey,
//   coreFigmaFunctions.figmaCredentials.iconsFileID,
//   '849:87'
// );

// exports.createAllStyles = createAllStyles;

// exports.getFigmaObjTree = getFigmaObjTree;

// exports.getFigmaFileNodeById = getFigmaFileNodeByID;
