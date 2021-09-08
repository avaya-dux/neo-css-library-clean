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
      ["clean", "audio-jack"]
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
