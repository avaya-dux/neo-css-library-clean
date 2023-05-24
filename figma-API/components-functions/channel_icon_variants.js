const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

small size - DONE
large size - DONE

icon unicodes -- from icon-file-reader.js

background color - DONE
icon status colors - DONE

these will need to go in one map

*/

async function channelIconVariants(value) {
  channelIconJSONObject = {
    channelIcon: {},
  };

  const channelIconStatus = value.Images.children.filter(
    (child) => child.name === ".status"
  )[0].children;

  channelIconJSONObject.channelIcon["small-icon-font-size"] = {
    value: `${
      value.Images.children.filter(
        (child) => child.name === ".icon-state-small"
      )[0].size.x
    }px`,
  };

  channelIconJSONObject.channelIcon["large-icon-font-size"] = {
    value: `${
      value.Images.children.filter(
        (child) => child.name === ".icon-state-large"
      )[0].size.x
    }px`,
  };

  //   console.log(channelIconStatus);

  // icon colours

  for (status of channelIconStatus) {
    // available color
    if (status.name === "Type=available, Size=small") {
      // small size
      channelIconJSONObject.channelIcon["small-size"] = {
        value: `${status.size.x}px`,
      };
      var statusColorTokenID =
        status.children[0].children[1].children[0].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          statusColorTokenID
        )
        .then((value) => {
          channelIconJSONObject.channelIcon["available-color"] = {
            value: `{color.${value.nodes[
              statusColorTokenID
            ].document.name.toLowerCase()}.value}`,
          };
        });
      var backgroundColorTokenID = status.children[0].children[0].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          backgroundColorTokenID
        )
        .then((value) => {
          channelIconJSONObject.channelIcon["bg-color"] = {
            value: `{color.${value.nodes[
              backgroundColorTokenID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    // busy/away colour
    if (status.name === "Type=away, Size=small") {
      var statusColorTokenID =
        status.children[0].children[1].children[0].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          statusColorTokenID
        )
        .then((value) => {
          channelIconJSONObject.channelIcon["busy-away-color"] = {
            value: `{color.${value.nodes[
              statusColorTokenID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    if (status.name === "Type=do-not-disturb, Size=small") {
      var statusColorTokenID =
        status.children[0].children[1].children[0].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          statusColorTokenID
        )
        .then((value) => {
          channelIconJSONObject.channelIcon["dnd-color"] = {
            value: `{color.${value.nodes[
              statusColorTokenID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    if (status.name === "Type=offline, Size=small") {
      var statusColorTokenID =
        status.children[0].children[1].children[0].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          statusColorTokenID
        )
        .then((value) => {
          channelIconJSONObject.channelIcon["offline-color"] = {
            value: `{color.${value.nodes[
              statusColorTokenID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    if (status.name === "Type=lock, Size=small") {
      var statusColorTokenID =
        status.children[0].children[1].children[0].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          statusColorTokenID
        )
        .then((value) => {
          channelIconJSONObject.channelIcon["generic-color"] = {
            value: `{color.${value.nodes[
              statusColorTokenID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    if (status.name === "Type=available, Size=large") {
      // large size
      channelIconJSONObject.channelIcon["large-size"] = {
        value: `${status.size.x}px`,
      };
    }
  }

  console.log(channelIconJSONObject);
  await fs
    .writeFile(
      "../css-library/style-dictionary/properties/components/channelIcons.json",
      JSON.stringify(channelIconJSONObject)
    )
    .then(function () {
      console.log("channelIcons.json created");
    });
}

exports.channelIconVariants = channelIconVariants;
