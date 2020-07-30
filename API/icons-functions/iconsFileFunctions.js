const fs = require('fs').promises;
const fsdefault = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');

const iconUtilityFunctions = require('./icon-utility-files/icons-utility-functions.js');

// functions to pull icons from Icon file
// TODO - check why API call is sometimes failing -- probably to do with several calls at once
// see get IconContentFromURL function

// #region getIconsComponents

// get all icons as components

async function getIconsComponents(figmaId, figmaApiKey) {
  let result = await fetch(
    'https://api.figma.com/v1/files/' + figmaId + '/components',
    {
      method: 'GET',
      headers: {
        'X-Figma-Token': figmaApiKey,
      },
    }
  );
  let figmaFileComponents = await result.json();

  const iconsOnAll = figmaFileComponents.meta.components.filter((component) => {
    return component.containing_frame.pageName === 'Icons';
  });

  return iconsOnAll;
}

// #endregion getIconsComponents

// #region getSVGIconURL

// function to get particular icon URL from nodeID in SVG format

async function getSVGIconURL(figmaApiKey, figmaId, imageNodeId) {
  let result = await fetch(
    'https://api.figma.com/v1/images/' +
      figmaId +
      `/?ids=${imageNodeId}&format=svg`,
    {
      method: 'GET',
      headers: {
        'X-Figma-Token': figmaApiKey,
      },
    }
  );
  let figmaSVGIconURL = await result.json();

  return figmaSVGIconURL;
}

// #endregion

// #region getPNGIconURL

// function to get particular icon URL from nodeID in PNG format

async function getPNGIconURL(figmaApiKey, figmaId, imageNodeId) {
  let result = await fetch(
    'https://api.figma.com/v1/images/' +
      figmaId +
      `/?ids=${imageNodeId}&format=png`,
    {
      method: 'GET',
      headers: {
        'X-Figma-Token': figmaApiKey,
      },
    }
  );
  let figmaPNGIconURL = await result.json();

  return figmaPNGIconURL;
}

// #region getIconContentFromURL

// function to get Icon image content data from URL and write to directory
// TO-DO this might be why API call is failing
// We are calling each URL seperately instead of batching the call in one

async function getIconContentFromURL(URL, imagePath) {
  await axios({
    url: URL,
    responseType: 'stream',
  })
    .then(
      (response) =>
        new Promise(async (resolve, reject) => {
          response.data
            .pipe(await fsdefault.createWriteStream(imagePath))
            .on('finish', () => resolve())
            .on('error', (e) => reject(e));
        })
    )
    .catch((error) => {
      console.log(error);
    });
}

// #endregion

// #region createIconFiles

// this function gets all icon URLs, then gets data from each of them, and writes .svg files to directory

async function createIconFiles(figmaApiKey, figmaId) {
  // make directories for both svgs and pngs

  await fs.mkdir('../../properties/assets/icons/svgs', {
    recursive: true,
  });

  await fs.mkdir('../../properties/assets/icons/pngs', {
    recursive: true,
  });

  // we get all icon Components

  var iconsOnAll = await getIconsComponents(figmaId, figmaApiKey);

  // we initialize variables to hold the information required to make the API calls

  let figmaIconTags = [];
  let figmaFileNodes = [];

  let figmaIconNames = [];

  iconsOnAll.forEach(async (component) => {
    // we create an object to associate particular icon names with their node id

    var compName = component.name.toLowerCase();
    // we skip over the template icon
    if (compName === 'template') {
      return;
    }

    // we seperate out '-' and '/' from icon name

    var iconName = component.name.toLowerCase().replace(/\-|\/|\s+/g, '');

    // we check to see whether any names in the Figma file are duplicated

    if (figmaIconNames.includes(iconName)) {
      console.log(`${iconName} exists more than once in the Figma file`);
    } else {
      figmaIconNames.push(iconName);
    }

    // we create an array of objects, with the icon name as key and the node id as value

    figmaIconTags.push({
      [iconName]: component.node_id,
    });

    // then we get and store all individual icon component node ids in a seperate array
    // this is to make it easier to insert these directly in the below function calls

    figmaFileNodes.push(component.node_id);

    // this is function to get icon information for design system portal

    iconUtilityFunctions
      .getIconInformation(compName)
      .then(async () => {
        if (iconsOnAll.indexOf(component) == iconsOnAll.length - 1) {
          await fs.appendFile('./icon-utility-files/iconInfo.js', ']');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // we get the iconSVG URLs

  const iconSVGURLs = await getSVGIconURL(
    figmaAPIKey,
    iconsFileID,
    figmaFileNodes.toString()
  ).catch((error) => {
    console.log(error);
  });

  // we get the iconPNG URLs

  const iconPNGURLs = await getPNGIconURL(
    figmaAPIKey,
    iconsFileID,
    figmaFileNodes.toString()
  ).catch((error) => {
    console.log(error);
  });

  await Promise.all(
    figmaIconTags.map(async (tag) => {
      // SVGs

      // the code below gets the component id by pulling via the icon name-as-Object key

      var iconSVGURL = iconSVGURLs.images[tag[Object.keys(tag)]];

      var iconSVGFileName = `./properties/assets/icons/svgs/${
        Object.keys(tag)[0]
      }.svg`;

      await getIconContentFromURL(iconSVGURL, iconSVGFileName).catch(
        (error) => {
          console.log(error);
        }
      );

      // PNGs

      var iconPNGURL = iconPNGURLs.images[tag[Object.keys(tag)]];

      var iconPNGFileName = `./properties/assets/icons/pngs/${
        Object.keys(tag)[0]
      }.png`;

      await getIconContentFromURL(iconPNGURL, iconPNGFileName).catch(
        (error) => {
          console.log(error);
        }
      );
    })
  ).then(() => {
    console.log('icon .svgs and .pngs created');
  });
}

exports.pullIcons = pullIcons;
