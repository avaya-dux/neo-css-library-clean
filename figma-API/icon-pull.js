const coreFigmaFunctions = require("./figma-functions/core-figma-functions.js");
const iconFunctions = require("./icons-functions/icons-functions.js");

iconFunctions.pullIcons(
  coreFigmaFunctions.figmaCredentials.figmaAPIKey,
  coreFigmaFunctions.figmaCredentials.iconsFileID,
  process.argv.slice(2)
);
