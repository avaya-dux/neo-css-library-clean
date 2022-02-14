const fs = require('fs').promises;

// effect tokens means box-shadows

async function pullEffectTokens(styles) {
  // we filter for just the effect styles
  const effectStyles = styles.filter(function (style) {
    return style[0].document.effects.length > 0;
  });

  var effectStylesJSONObject = {
    shadows: {},
  };

  effectStyles.forEach((style) => {
    // we declare each of the required values as variables

    // we pull the token name and make it lower case
    var name = style[0].document.name.toLowerCase().replace(/\-/g, '');

    // xOffset
    var xOffset = `${style[0].document.effects[0].offset.x}px`;

    // yOffset
    var yOffset = `${style[0].document.effects[0].offset.y}px`;

    // radius
    var radius = `${style[0].document.effects[0].radius}px`;

    // we insert the values as necessary

    effectStylesJSONObject.shadows[name] = {};

    effectStylesJSONObject.shadows[name]['xOffset'] = {
      value: xOffset,
    };

    effectStylesJSONObject.shadows[name]['yOffset'] = {
      value: yOffset,
    };

    effectStylesJSONObject.shadows[name]['radius'] = {
      value: radius,
    };

    // here we preserve the color as RGB values to include opacity, which is not the case in Hex

    effectStylesJSONObject.shadows[name]['color'] = {
      value: `rgba(${style[0].document.effects[0].color.r},${style[0].document.effects[0].color.g},${style[0].document.effects[0].color.b},${style[0].document.effects[0].color.a})`,
    };
  });

  await fs
    .writeFile(
      '../properties/effectStyles.json',
      JSON.stringify(effectStylesJSONObject)
    )
    .then(function () {
      console.log('effectStyles.json created');
    })
    .catch((error) => {
      console.log(error);
    });
}

exports.pullEffectTokens = pullEffectTokens;
