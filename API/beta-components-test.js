const coreFigmaFunctions = require('./figma-functions/core-figma-functions.js');

// coreFigmaFunctions.getBetaComponentPages(
//   coreFigmaFunctions.figmaCredentials.figmaAPIKey,
//   coreFigmaFunctions.figmaCredentials.betaComponentsFileID
// );

coreFigmaFunctions.getFigmaTokenNameByID(
  coreFigmaFunctions.figmaCredentials.figmaAPIKey,
  coreFigmaFunctions.figmaCredentials.betaComponentsFileID,
  '406:672'
);

// "styles": { "fills": "406:672" },
