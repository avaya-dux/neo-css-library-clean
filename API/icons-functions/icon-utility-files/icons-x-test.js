const fs = require('fs').promises;
const fsdefault = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');

async function getXIconsComponents(figmaId, figmaApiKey) {
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

  const allXIcons = figmaFileComponents.meta.components;

  return allXIcons;
}

async function getXIconURL(figmaApiKey, figmaId, imageNodeId, fileType) {
  let result = await fetch(
    'https://api.figma.com/v1/images/' +
      figmaId +
      `/?ids=${imageNodeId}&format=${fileType}`,
    {
      method: 'GET',
      headers: {
        'X-Figma-Token': figmaApiKey,
      },
    }
  );
  let figmaIconURL = await result.json();

  return figmaIconURL;
}

async function makeXIconFunctionArrays(figmaApiKey, figmaId) {
  // we get all icon Components
  var iconsOnAll = await getXIconsComponents(figmaId, figmaApiKey);

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

    // we seperate out '-' and '/' from icon name

    var iconName = component.name.toLowerCase().replace(/\/|\s+/g, '');

    const stringsToReplace = new RegExp(
      /(?<!email-|info-|error-|warning-|star-)outline|outine|status|weather|communication|(?<!file)file(?!type|:|-xls|-json|-zip|-rtl)|alert(?!ing)|navigation|(?<!defer-inter|inter)action|(?<!sub-)account|(?<!suggested-)content(?!\:)|editor|(?<!icon-)social(?!-active|-integrations)|logo|other/,
      'g'
    );

    console.log(iconName.replace(stringsToReplace, ''));

    // temporarily skip over 'fill' icons
    // TO-DO: separate this out

    if (
      iconName.includes('fill') &&
      !iconName.includes('star') &&
      !iconName.includes('arrow')
    ) {
      return;
    }

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
  });

  console.log(`Total number of icons is: ${iconsArrays.totalIcons}`);

  return iconsArrays;
}

async function writeXIconContentFromURL(URL, imagePath) {
  await axios({
    url: URL,
    responseType: 'stream',
  }).then((response) => {
    new Promise(async (resolve, reject) => {
      response.data
        .pipe(await fsdefault.createWriteStream(imagePath))
        .on('finish', () => resolve())
        .on('error', (e) => reject(e));
    });
  });
}

async function generateXIconFiles(iconArrays, URLs, fileType) {
  await Promise.all(
    iconArrays.figmaIconTags.map(async (tag) => {
      // this is code meant to allow us to loop over icons that were not pulled correctly from Figma
      // we create a variable that will toggle to false if any of the API calls does not succeed
      var success = true;

      // the code below gets the component id by pulling via the icon name-as-Object key

      var iconURL = URLs.images[tag[Object.keys(tag)]];

      var iconFileName = `../../../x-icons/${fileType}s/${
        Object.keys(tag)[0]
      }.${fileType}`;

      var iconName = Object.keys(tag)[0]
        .slice(Object.keys(tag)[0].lastIndexOf('/') + 1)
        .replace(/\-|\/|\s+/g, '');

      await writeXIconContentFromURL(iconURL, iconFileName).catch((error) => {
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
          await writeXIconContentFromURL(iconURL, iconFileName)
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

async function pullXIcons(figmaApiKey, figmaId) {
  // make directories for both svgs and pngs

  await fs.mkdir('../../../x-icons/svgs', {
    recursive: true,
  });

  await fs.mkdir('../../../x-icons/pngs', {
    recursive: true,
  });

  const iconFunctionArrays = await makeXIconFunctionArrays(
    figmaApiKey,
    figmaId
  );

  // we get the iconSVG URLs and pull content from them

  await getXIconURL(
    figmaApiKey,
    figmaId,
    iconFunctionArrays.figmaFileNodes.toString(),
    'svg'
  ).then(async (iconSVGURLs) => {
    await generateXIconFiles(iconFunctionArrays, iconSVGURLs, 'svg');
  });

  // we get the iconPNG URLs and pull content from them

  await getXIconURL(
    figmaApiKey,
    figmaId,
    iconFunctionArrays.figmaFileNodes.toString(),
    'png'
  ).then(async (iconPNGURLs) => {
    await generateXIconFiles(iconFunctionArrays, iconPNGURLs, 'png');
  });
}

pullXIcons(
  '43138-68bb2ba3-f03a-47f2-b121-bad1ed291d5b',
  '95HBZA0Sdc9eINDh8phJHg'
);
