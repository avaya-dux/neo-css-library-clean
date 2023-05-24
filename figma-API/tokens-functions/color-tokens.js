const utilities = require('./utility-functions.js');
const fs = require('fs').promises;

async function pullColorTokens(styles) {
  // we filter out just the color styles from among all the style nodes
  // this is based on the fact that color style nodes are of type RECTANGLE
  // and they do not have box shadows

  const colorStyles = styles.filter(function (style) {
    return (
      style[0].document.type === 'RECTANGLE' &&
      style[0].document.effects.length == 0
    );
  });

  // from these we create an Array of Arrays
  // each one contains the name of the style and the rgba values
  // we also make the color names lower case

  const minColorStyles = await Promise.all(
    colorStyles.map(async (style) => {
      return await [
        style[0].document.name.toLowerCase(),

        style[0].document.fills[0].color,
      ];
    })
  )
    .then(function (values) {
      // we transform each of these Arrays into objects with the same properties
      // we then write these to a JSON Object

      var colorStylesJSONObject = {
        color: {},
      };

      colorStylesJSONObject.color = values.reduce(
        (acc, curr) => ({
          ...acc,
          [curr[0]]: {
            value: utilities.rgbToHex(
              curr[1].r * 255,
              curr[1].g * 255,
              curr[1].b * 255
            ),
            // here we add a 'type' property in order for StyleDictionary to filter accordingly
            type: 'color',
          },
        }),
        {}
      );
      return colorStylesJSONObject;
    })
    .catch((error) => {
      console.log(error);
    });

  // we write the .json colorStyles file directly in the StyleDictionar 'properties' folder
  // note that the file path is relative to the location in which the function is called

  await fs
    .writeFile('../css-library/style-dictionary/properties/colorStyles.json', JSON.stringify(minColorStyles))
    .then(function () {
      console.log('colorStyles.json created');
    })
    .catch((error) => {
      console.log(error);
    });
}

exports.pullColorTokens = pullColorTokens;
