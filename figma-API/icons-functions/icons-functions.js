const fs = require("fs").promises;
const fsdefault = require("fs");
const fetch = require("node-fetch");
const axios = require("axios");

const iconUtilityFunctions = require("./icon-utility-files/icons-utility-functions.js");

const replace = require("./icon-utility-files/icon-replacement-string");

async function getIconsComponentsFromFigma(figmaId, figmaApiKey) {
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
    console.log(`Error: ${error}`);
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
    const figmaIconURL = await result.json();

    return figmaIconURL;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function writeIconContentFromURL(URL, imagePath) {
  try {
    const figmaIconContent = await axios({
      url: URL,
      responseType: "stream",
    });

    return new Promise(async (resolve, reject) => {
      figmaIconContent.data
        .pipe(await fsdefault.createWriteStream(imagePath))
        .on("finish", () => resolve())
        .on("error", (e) => reject(e));
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function makeIconFunctionArrays(figmaApiKey, figmaId) {
  try {
    const iconsOnAll = await getIconsComponentsFromFigma(figmaId, figmaApiKey);

    let iconsArrays = {
      totalIcons: 0,
      figmaIconNodeIds: [],
    };

    iconsOnAll.forEach(async (component) => {
      iconsArrays.totalIcons++;

      const compName = component.name.toLowerCase();
      if (compName === "template") {
        return;
      }

      let bidirectional = false;

      if (component.description.includes("RTL")) {
        bidirectional = true;
      }

      const iconName = compName.replace(/\/|\s+/g, "");

      iconsArrays.figmaIconNodeIds.push({
        [iconName]: component.node_id,
      });

      await iconUtilityFunctions.getIconInformationForDesignPortal(
        compName,
        bidirectional
      );

      if (iconsOnAll.indexOf(component) === iconsOnAll.length - 1) {
        await fs.appendFile(
          "./icons-functions/icon-utility-files/iconInfoNextGen.js",
          "]"
        );
      }
    });

    console.log(`Total number of icons is: ${iconsArrays.totalIcons}`);

    return iconsArrays;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function generateIconFiles(iconIds, URLs, fileType) {
  try {
    iconIds.map(async (tag) => {
      const iconURL = URLs.images[tag[Object.keys(tag)]];

      const iconFileName = `../style-dictionary/properties/assets/icons/${fileType}s/${Object.keys(
        tag
      )[0].replace(replace.stringsToReplace, "")}.${fileType}`;

      await writeIconContentFromURL(iconURL, iconFileName);
      console.log(`${iconFileName} created`);
    });
  } catch (error) {
    console.log(`Error generating ${Object.keys(tag)[0]}: $${error}`);
  }
}

async function pullAllIcons(figmaApiKey, figmaId) {
  const styleDicDir = "../style-dictionary/properties/assets/icons";

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
    console.log(`Error: ${error}`);
  }
}

async function pullIcons(figmaApiKey, figmaId, iconNames) {
  const styleDicDir = "../style-dictionary/properties/assets/icons";

  const formattedIconNames = iconNames.map((iconName) =>
    iconName.replace("/", "")
  );

  try {
    await fs.mkdir(`${styleDicDir}/svgs`, {
      recursive: true,
    });

    const iconFunctionArrays = await makeIconFunctionArrays(
      figmaApiKey,
      figmaId
    );

    const iconIdsToGen = iconFunctionArrays.figmaIconNodeIds
      .map((nodeId) => {
        let foundId;
        formattedIconNames.forEach((iconName) => {
          if (nodeId[iconName]) foundId = nodeId;
        });
        return foundId;
      })
      .filter((id) => id != undefined);

    const iconSVGContent = await getIconURLFromFigma(
      figmaApiKey,
      figmaId,
      iconIdsToGen,
      "svg"
    );

    await generateIconFiles(iconIdsToGen, iconSVGContent, "svg");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

exports.pullIcons = pullIcons;

exports.pullAllIcons = pullAllIcons;

exports.getIconsComponentsFromFigma = getIconsComponentsFromFigma;
