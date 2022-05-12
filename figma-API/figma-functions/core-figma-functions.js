const fs = require("fs").promises;
const fetch = require("node-fetch");
require("dotenv").config();

// Figma API credentials Object

var figmaCredentials = {
  figmaAPIKey: process.env.FIGMA,
  designTokensFileID: process.env.TOKENS,
  iconsFileID: process.env.ICONS,
  varaintComponentsFileID: process.env.COMPONENTS,
};

// this function returns all the nodes in a Figma file

async function getFigmaObjTree(figmaApiKey, figmaId) {
  let result = await fetch(
    "https://api.figma.com/v1/files/" + figmaId + "?geometry=paths",
    {
      method: "GET",
      headers: {
        "X-Figma-Token": figmaApiKey,
      },
    }
  ).catch((error) => {
    console.error(error);
  });

  try {
    return await result.json();
  } catch (e) {
    return null;
  }
}

// this function pulls the style node IDs from a given file

async function getFigmaFileNodeIDs(figmaApiKey, figmaId) {
  let result = await fetch(
    "https://api.figma.com/v1/files/" + figmaId + "/styles",
    { method: "GET", headers: { "X-Figma-Token": figmaApiKey } }
  ).catch((error) => {
    console.log(error);
  });

  let figmaFileStyles = await result.json().catch((error) => {
    console.log(error);
  });

  let figmaFileStyleObjects = figmaFileStyles.meta.styles;

  let figmaFileStyleNodeIds = [];

  figmaFileStyleObjects.forEach((object) => {
    figmaFileStyleNodeIds.push(`"${object.node_id}"`);
  });

  const fileInfo = `const styleNodeIds = [ ${figmaFileStyleNodeIds}]; exports.styleNodeIds = styleNodeIds`;

  await fs
    .writeFile("./figma-functions/styleNodeIds.js", fileInfo)
    .then(function () {
      console.log("styleNodeIds.js created");
    })
    .catch((error) => {
      console.log(error);
    });

  return fileInfo;
}

// this code pulls information about a particular style according to its node ID

async function getFigmaNodeStyleByID(figmaApiKey, figmaId, nodeIds) {
  let result = await fetch(
    "https://api.figma.com/v1/files/" +
      figmaId +
      `/nodes?ids=${nodeIds}&geometry=paths`,
    {
      method: "GET",
      headers: {
        "X-Figma-Token": figmaApiKey,
      },
    }
  ).catch((error) => {
    console.log(error);
  });

  let figmaTreeStructure = await result.json().catch((error) => {
    console.log(error);
  });

  // we grab each Object from result and convert it to an Array

  const styleArray = Object.keys(figmaTreeStructure.nodes).map((node) => {
    var stringify = JSON.stringify(figmaTreeStructure.nodes[node]);

    var writtenStringify = stringify.slice(1, stringify.length - 1);
    return `[{${writtenStringify}}]`;
  });

  return styleArray;
}

// test function to retrieve token names based on nodeID

async function getFigmaTokenNameByID(figmaApiKey, figmaId, nodeIds) {
  let result = await fetch(
    "https://api.figma.com/v1/files/" +
      figmaId +
      `/nodes?ids=${nodeIds}&geometry=paths`,
    {
      method: "GET",
      headers: {
        "X-Figma-Token": figmaApiKey,
      },
    }
  ).catch((error) => {
    console.log(error);
  });

  let figmaTreeStructure = await result.json().catch((error) => {
    console.log(error);
  });

  return figmaTreeStructure;
}

// this code creates an Object from our Web Components page

async function getComponentPages(figmaApiKey, figmaId) {
  const coreComponentsPages = await getFigmaObjTree(figmaApiKey, figmaId)
    .then((value) => {
      const coreComponents = [];

      value.document.children.forEach((page) => {
        if (page.name !== "Cover page") {
          coreComponents.push(page);
        }
      });

      const coreComponentPagesSorted = coreComponents.reduce(
        (acc, curr) => ({ ...acc, [curr.name]: curr }),
        {}
      );
      return coreComponentPagesSorted;
    })
    .catch((error) => {
      console.log(error);
    });
  return coreComponentsPages;
}

exports.figmaCredentials = figmaCredentials;
exports.getFigmaObjTree = getFigmaObjTree;
exports.getFigmaFileNodeIDs = getFigmaFileNodeIDs;
exports.getFigmaNodeStyleByID = getFigmaNodeStyleByID;
exports.getComponentPages = getComponentPages;
exports.getFigmaTokenNameByID = getFigmaTokenNameByID;
