const fs = require("fs").promises;
const fsdefault = require("fs");
const fetch = require("node-fetch");
const axios = require("axios");

const iconUtilityFunctions = require("./icon-utility-files/icons-utility-functions.js");

const replace = require("./icon-utility-files/icon-replacement-string");

// functions to pull icons from Icon file
// TODO - check why API call is sometimes failing -- probably to do with several calls at once
// see get IconContentFromURL function

// #region getIconsComponents

// get all icons as components from Figma file

async function getIconsComponents(figmaId, figmaApiKey) {
  let result = await fetch(
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
  let figmaFileComponents = await result.json();

  // code to help debug stale API data

  // figmaFileComponents.meta.components.forEach((component) => {
  //   if (component.name === 'outline/content/billboard-chart') {
  //     console.log(component);
  //   }
  //   if (component.name === 'outline/content/chart-billboard') {
  //     console.log(component);
  //   }
  //   if (component.node_id === '849:87') {
  //     console.log(component);
  //   }
  // });

  const iconsOnAll = figmaFileComponents.meta.components.filter((component) => {
    return component.containing_frame.pageName === "Icons";
  });

  return iconsOnAll;
}

// #endregion getIconsComponents

// #region getIconURLs

// function to get particular icon URL from nodeID in required format

async function getIconURL(figmaApiKey, figmaId, imageNodeId, fileType) {
  let result = await fetch(
    "https://api.figma.com/v1/images/" +
      figmaId +
      `/?ids=${imageNodeId}&format=${fileType}`,
    {
      method: "GET",
      headers: {
        "X-Figma-Token": figmaApiKey,
      },
    }
  );
  let figmaIconURL = await result.json();

  return figmaIconURL;
}

// #endregion

// #region writeIconContentFromURL

// function to get Icon image content data from URL and write to directory
// TO-DO this might be why API call is failing
// We are calling each URL seperately instead of batching the call in one

async function writeIconContentFromURL(URL, imagePath) {
  await axios({
    url: URL,
    responseType: "stream",
  }).then((response) => {
    new Promise(async (resolve, reject) => {
      response.data
        .pipe(await fsdefault.createWriteStream(imagePath))
        .on("finish", () => resolve())
        .on("error", (e) => reject(e));
    });
  });
}

// #endregion

// #region makeIconFunctionArrays

// this function is to seperate out the functionality that generates the Arrays of information necessary to pull icon content from Figma

async function makeIconFunctionArrays(figmaApiKey, figmaId, iconNames) {
  // we get all icon Components
  var iconsOnAll = await getIconsComponents(figmaId, figmaApiKey);

  // we initialize variables to hold the information required to make the API calls

  let iconsArrays = {
    totalIcons: 0,
    figmaIconTags: [],
    figmaFileNodes: [],
    figmaIconNames: [],
  };

  iconsOnAll.forEach(async (component) => {
    // we create an object to associate particular icon names with their node id

    iconsArrays.totalIcons++;

    var compName = component.name.toLowerCase();
    // we skip over the template icon
    // TO-DO: Make it so that function requests only new or updated icons
    if (compName === "template" || !iconNames.includes(compName)) {
      return;
    }

    // we seperate out '-' and '/' from icon name

    var iconName = component.name.toLowerCase().replace(/\/|\s+/g, "");

    // temporarily skip over 'fill' icons
    // TO-DO: separate this out

    // if (
    //   iconName.includes('fill') &&
    //   !iconName.includes('star') &&
    //   !iconName.includes('arrow')
    // ) {
    //   return;
    // }

    // we check to see whether any names in the Figma file are duplicated

    if (iconsArrays.figmaIconNames.includes(iconName)) {
      console.log(`${iconName} exists more than once in the Figma file`);
    } else {
      iconsArrays.figmaIconNames.push(iconName);
    }

    // we create an array of objects, with the icon name as key and the node id as value

    iconsArrays.figmaIconTags.push({
      [iconName]: component.node_id,
    });

    // then we get and store all individual icon component node ids in a seperate array
    // this is to make it easier to insert these directly in the below function calls

    iconsArrays.figmaFileNodes.push(component.node_id);

    // this is function to get icon information for design system portal

    iconUtilityFunctions
      .getIconInformation(compName)
      .then(async () => {
        if (iconsOnAll.indexOf(component) == iconsOnAll.length - 1) {
          await fs.appendFile(
            "./icons-functions/icon-utility-files/iconInfo.js",
            "]"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  console.log(`Total number of icons is: ${iconsArrays.totalIcons}`);

  return iconsArrays;
}

// #endregion

// #region generateIconFiles

// this code allows us to pull icon content from an Array of URLs while dealing with potential errors

async function generateIconFiles(iconArrays, URLs, fileType) {
  await Promise.all(
    iconArrays.figmaIconTags.map(async (tag) => {
      // this is code meant to allow us to loop over icons that were not pulled correctly from Figma
      // we create a variable that will toggle to false if any of the API calls does not succeed
      var success = true;

      // the code below gets the component id by pulling via the icon name-as-Object key

      var iconURL = URLs.images[tag[Object.keys(tag)]];

      var iconFileName = `../properties/assets/icons/${fileType}s/${Object.keys(
        tag
      )[0].replace(replace.stringsToReplace, "")}.${fileType}`;

      var iconName = Object.keys(tag)[0]
        .slice(Object.keys(tag)[0].lastIndexOf("/") + 1)
        .replace(/\-|\/|\s+/g, "");

      await writeIconContentFromURL(iconURL, iconFileName).catch((error) => {
        // if there was an error pulling icon content from the URL, we switch success to false
        if (error) {
          success = false;
        }
        // we then log that there was an error on our first attempt to pull the icon content from this URL
        console.log(
          `!!!!!THIS WAS AN ERROR ON FIRST ATTEMPT TO PULL ${
            Object.keys(tag)[0]
          } as ${fileType}: $${error}`
        );
      });

      // we return an array that contains a nested array with the name and URL of each icon and whether we had successfully pulled it
      return [success, iconURL, iconFileName];
    })
  )
    .then((values) => {
      values.forEach(async (value) => {
        // we set a similar variable to see whether our second attempt at pulling the icon content is successful
        // NOTE -- assumes a probable error threshold of two attemps
        var retry = true;

        var successfulPull = value[0];
        var iconURL = value[1];
        var iconFileName = value[2];

        // if first attempt was unsuccessful, we re-try the API call here
        if (successfulPull == false) {
          await writeIconContentFromURL(iconURL, iconFileName)
            // if successful, we switch our retry variable to false
            .then(() => (retry = false))
            .catch((error) => {
              // in the unlikely event of a third error, we log it to console
              console.log(`!!!!!ERROR ON RETRY for ${iconFileName}: ${error}`);
            });
          if (retry == false) {
            // if we were successful, log that the icon file has been created
            console.log(`${iconFileName} created ON SECOND ATTEMPT`);
          }
        } else {
          // if we were successful, log that the icon file has been created
          console.log(`${iconFileName} created`);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// #endregion

// #region pullIcons

// this function combines all the above functionality to get icon URLs, pull data from them and write that data to file

async function pullIcons(figmaApiKey, figmaId, iconNames) {
  // make directories for both svgs and pngs

  await fs.mkdir("../properties/assets/icons/svgs", {
    recursive: true,
  });

  await fs.mkdir("../properties/assets/icons/pngs", {
    recursive: true,
  });

  const iconFunctionArrays = await makeIconFunctionArrays(
    figmaApiKey,
    figmaId,
    iconNames
  );

  // we get the iconSVG URLs and pull content from them

  await getIconURL(
    figmaApiKey,
    figmaId,
    iconFunctionArrays.figmaFileNodes.toString(),
    "svg"
  ).then(async (iconSVGURLs) => {
    await generateIconFiles(iconFunctionArrays, iconSVGURLs, "svg");
  });

  // we get the iconPNG URLs and pull content from them

  await getIconURL(
    figmaApiKey,
    figmaId,
    iconFunctionArrays.figmaFileNodes.toString(),
    "png"
  ).then(async (iconPNGURLs) => {
    await generateIconFiles(iconFunctionArrays, iconPNGURLs, "png");
  });
}

exports.pullIcons = pullIcons;

exports.getIconsComponents = getIconsComponents;
