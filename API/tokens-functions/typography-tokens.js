const fs = require('fs').promises;

async function pullTypographyTokens(styles) {
  // we filter out just the text styles from among all the style nodes

  const textStyles = styles.filter(function (style) {
    return style[0].document.type === 'TEXT';
  });

  // we then need to parse by by platform

  const platforms = ['Web', 'Android', 'iOS'];

  platforms.forEach(async (platform) => {
    const platformTextStyles = textStyles.filter((style) => {
      return style[0].document.name.includes(platform);
    });

    // we create a seperate JSON file for each platform
    var textStylesJSONObject = {};

    // we add a single, hard-coded value for the font family, in this case 'noto-sans'
    textStylesJSONObject[`${platform}-typography`] = {
      fontFamily: {
        value: `"noto-sans", sans-serif`,
      },
    };

    platformTextStyles.forEach((style) => {
      // this is specific functionality for typography tokens
      // it limits duplication and makes it easier to import the tokens into Neo

      if (platform === 'Web') {
        // console.log(style[0]);
        var styleName = style[0].document.name.toLowerCase();

        // console.log(style[0].document);

        // hard-coded font-weights for noto-sans
        textStylesJSONObject[`${platform}-typography`]['fontweight-light'] = {
          value: '300',
        };
        textStylesJSONObject[`${platform}-typography`]['fontweight-regular'] = {
          value: '400',
        };
        textStylesJSONObject[`${platform}-typography`][
          'fontweight-semibold'
        ] = {
          value: '600',
        };
        textStylesJSONObject[`${platform}-typography`]['fontweight-bold'] = {
          value: '700',
        };

        textStylesJSONObject[`${platform}-typography`][`${styleName}`] = {};

        // line-height
        textStylesJSONObject[`${platform}-typography`][styleName][
          'lineHeight'
        ] = {
          value: `${style[0].document.style.lineHeightPx}px`,
        };
        // letter-spacing
        textStylesJSONObject[`${platform}-typography`][styleName][
          'letterSpacing'
        ] = {
          value: `${style[0].document.style.letterSpacing}px`,
        };
        // font-size
        textStylesJSONObject[`${platform}-typography`][styleName][
          'fontSize'
        ] = {
          value: `${style[0].document.style.fontSize}px`,
        };
        // paragraph spacing
        textStylesJSONObject[`${platform}-typography`][styleName][
          'paragraphSpacing'
        ] = {
          value: `${style[0].document.style.paragraphSpacing}px`,
        };
        // // font-weight
        // textStylesJSONObject[`${platform}-typography`][styleName][
        //   'fontWeight'
        // ] = {
        //   value: style[0].document.style.fontWeight,
        // };
        // text-style
        if (style[0].document.style.italic) {
          textStylesJSONObject[`${platform}-typography`][styleName][
            'textStyle'
          ] = {
            value: 'italic',
          };
        }
        // text-decoration
        if (style[0].document.style.textDecoration === 'UNDERLINE') {
          textStylesJSONObject[`${platform}-typography`][styleName][
            'textDecoration'
          ] = {
            value: 'underline',
          };
        }
      } else {
        // we grab the name of each text style and convert it to lower case
        var styleName = style[0].document.name.toLowerCase();

        textStylesJSONObject[`${platform}-typography`][`${styleName}`] = {};

        // line-height
        textStylesJSONObject[`${platform}-typography`][styleName][
          'lineHeight'
        ] = {
          value: `${style[0].document.style.lineHeightPx}px`,
        };
        // letter-spacing
        textStylesJSONObject[`${platform}-typography`][styleName][
          'letterSpacing'
        ] = {
          value: `${style[0].document.style.letterSpacing}px`,
        };
        // font-size
        textStylesJSONObject[`${platform}-typography`][styleName][
          'fontSize'
        ] = {
          value: `${style[0].document.style.fontSize}px`,
        };
        // font-weight
        textStylesJSONObject[`${platform}-typography`][styleName][
          'fontWeight'
        ] = {
          value: style[0].document.style.fontWeight,
        };
        // text-style
        if (style[0].document.style.italic) {
          textStylesJSONObject[`${platform}-typography`][styleName][
            'textStyle'
          ] = {
            value: 'italic',
          };
        }
        // text-decoration
        if (style[0].document.style.textDecoration === 'UNDERLINE') {
          textStylesJSONObject[`${platform}-typography`][styleName][
            'textDecoration'
          ] = {
            value: 'underline',
          };
        }
      }
    });
    await fs
      .writeFile(
        `../properties/${platform}/${platform}TextStyles.json`,
        JSON.stringify(textStylesJSONObject)
      )
      .then(function () {
        console.log(`${platform}TextStyles.json created`);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

exports.pullTypographyTokens = pullTypographyTokens;
