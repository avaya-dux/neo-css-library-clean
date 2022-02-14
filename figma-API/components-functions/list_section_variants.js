const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

////////
List Items
////////

$token-list-section-width: 304px; - DONE    
$token-list-section-padding: 8px; - DONE - hard-coded
$token-list-section-action-padding: 0px; DONE - hard-coded

background-color - DONE
hover-color - DONE


*/

async function listSectionStyles(value) {
  listSectionJSONObject = {
    listSection: {},
  };
  const listSectionVariants = value.Other.children.filter(
    (comps) => comps.name === "list-section"
  )[0].children;

  //   console.log(listSectionVariants[0].children);

  for (variant of listSectionVariants) {
    if (variant.name === "Right side=toggle, Left side=icon, State=default") {
      // list section width
      listSectionJSONObject.listSection["width"] = {
        value: `${variant.size.x}px`,
      };
      // list section padding
      // hard-coded for now to match exisiting token names/.scss file
      // TO-DO: request update to Figma variant to expose these variables via API
      listSectionJSONObject.listSection["padding"] = {
        value: "8px",
      };
      listSectionJSONObject.listSection["action-padding"] = {
        value: "0px",
      };
      // list section default background colour
      var listSectionDefaultBGColorID = variant.children[0].styles.fills;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          listSectionDefaultBGColorID
        )
        .then((value) => {
          listSectionJSONObject.listSection["default-bg-color"] = {
            value: `{color.${value.nodes[
              listSectionDefaultBGColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    if (variant.name === "Right side=expandable, Left side=icon, State=hover") {
      // hover background color
      var listSectionHoverBGColorID = variant.children[0].styles.fills;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          listSectionHoverBGColorID
        )
        .then((value) => {
          listSectionJSONObject.listSection["hover-bg-color"] = {
            value: `{color.${value.nodes[
              listSectionHoverBGColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
  }

  //   console.log(listSectionJSONObject);
  await fs
    .writeFile(
      "../properties/components/listSection.json",
      JSON.stringify(listSectionJSONObject)
    )
    .then(function () {
      console.log("listSection.json created");
    });
}

exports.listSectionStyles = listSectionStyles;
