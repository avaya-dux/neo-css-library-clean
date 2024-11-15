const fs = require("fs").promises;
const fsdefault = require("fs");
const fetch = require("node-fetch");

const util = require("node:util");

const iconUtilityFunctions = require("./icon-utility-files/icons-utility-functions.js");

const unicodes = require("./icon-utility-files/icon-unicodes.js").unicodes;

const replace = require("./icon-utility-files/icon-replacement-string");

const path = require("path");

async function getIconComponentsFromFigma(figmaId, figmaApiKey) {
  try {
    const result = await fetch(
      "https://api.figma.com/v1/files/" + figmaId + "/components",
      {
        method: "GET",
        headers: {
          "X-Figma-Token": figmaApiKey,
          pragma: "no-cache",
          "cache-control": "no-store, no-cache, must-revalidate",
        },
      }
    );
    const figmaFileComponents = await result.json();

    return figmaFileComponents.meta.components.filter((component) => {
      return component.containing_frame.pageName === "Icons";
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function getIconURLFromFigma(
  figmaApiKey,
  figmaId,
  figmaIconNodeIds,
  fileType
) {
  const imageNodeIds = figmaIconNodeIds.map((nodeId) => Object.values(nodeId));

  try {
    const result = await fetch(
      "https://api.figma.com/v1/images/" +
        figmaId +
        `/?ids=${imageNodeIds}&format=${fileType}`,
      {
        method: "GET",
        headers: {
          "X-Figma-Token": figmaApiKey,
        },
      }
    );

    return await result.json();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function writeIconContentFromURL(URL, imagePath) {
  try {
    const figmaIconContent = await fetch(URL, { responseType: "stream" });

    return new Promise(async (resolve, reject) => {
      figmaIconContent.body
        .pipe(await fsdefault.createWriteStream(imagePath))
        .on("finish", () => resolve())
        .on("error", (e) => reject(e));
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function makeIconFunctionArrays(figmaApiKey, figmaId) {
  try {
    const iconsOnAll = await getIconComponentsFromFigma(figmaId, figmaApiKey);

    const figmaIconNodeIds = [];

    iconsOnAll.forEach(async (component) => {
      const compName = component.name.toLowerCase();
      if (compName === "template") {
        return;
      }

      const iconName = compName
        .replace(replace.stringsToReplace, "")
        .replace("/", "");

      figmaIconNodeIds.push({
        [iconName]: component.node_id,
      });
    });

    return figmaIconNodeIds;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function generateIconFiles(iconIds, URLs, fileType) {
  try {
    iconIds.map(async (tag) => {
      const iconURL = URLs.images[tag[Object.keys(tag)]];

      const iconFileName = path.join(
        __dirname,
        `../../css-library/style-dictionary/properties/assets/icons/${fileType}s/${Object.keys(
          tag
        )[0].replace(replace.stringsToReplace, "")}.${fileType}`
      );

      await writeIconContentFromURL(iconURL, iconFileName);
      console.info(`${iconFileName} created`);
    });
  } catch (error) {
    console.error(`Error generating ${Object.keys(tag)[0]}: $${error}`);
  }
}

async function pullAllIcons(figmaApiKey, figmaId) {
  const styleDicDir = "../css-library/style-dictionary/properties/assets/icons";

  try {
    await fs.mkdir(`${styleDicDir}/svgs`, {
      recursive: true,
    });

    const iconFunctionArrays = await makeIconFunctionArrays(
      figmaApiKey,
      figmaId
    );

    const imageNodeIds = iconFunctionArrays.figmaIconNodeIds.map((nodeId) =>
      Object.values(nodeId)
    );

    const iconSVGContent = await getIconURLFromFigma(
      figmaApiKey,
      figmaId,
      imageNodeIds,
      "svg"
    );

    await generateIconFiles(
      iconFunctionArrays.figmaIconNodeIds,
      iconSVGContent,
      "svg"
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function pullIcons(figmaApiKey, figmaId, iconNames) {
  const styleDicDir =
    "../../css-library/style-dictionary/properties/assets/icons";

  const unicodesFile =
    "../figma-API/icons-functions/icon-utility-files/icon-unicodes.js";

  const formattedIconNames = iconNames.map((iconName) =>
    iconName.replace("/", "")
  );

  try {
    await fs.mkdir(`${styleDicDir}/svgs`, {
      recursive: true,
    });

    formattedIconNames.forEach((iconName) => {
      if (unicodes[iconName]) {
        console.log(iconName, "exists")
        return;
      }

      const lastUnicodeValue = Object.values(unicodes).pop();

      const unicodeValueToAdd = lastUnicodeValue + 1;

      unicodes[iconName] = unicodeValueToAdd;
    });

    await fs.writeFile(
      unicodesFile,
      `const unicodes = ${util.inspect(
        unicodes
      )}; module.exports.unicodes = unicodes`
    );

    const figmaIconNodeIds = await makeIconFunctionArrays(figmaApiKey, figmaId);

    const iconIdsToGen = figmaIconNodeIds
      .map((nodeId) => {
        let foundId;
        formattedIconNames.forEach((iconName) => {
          if (nodeId[iconName]) foundId = nodeId;
        });
        return foundId;
      })
      .filter((id) => id != undefined);

    console.log(iconIdsToGen);
    
    const iconSVGContent = await getIconURLFromFigma(
      figmaApiKey,
      figmaId,
      iconIdsToGen,
      "svg"
    );

    await generateIconFiles(iconIdsToGen, iconSVGContent, "svg");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

exports.pullIcons = pullIcons;

exports.pullAllIcons = pullAllIcons;

exports.getIconComponentsFromFigma = getIconComponentsFromFigma;
