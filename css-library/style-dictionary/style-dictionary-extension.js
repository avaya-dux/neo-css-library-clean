const StyleDictionary = require("style-dictionary").extend("./config.json");

console.log("Build started.....\n");
console.log("=======================================");

StyleDictionary.buildAllPlatforms();

console.log("=======================================\n");
console.log("Build completed....");
