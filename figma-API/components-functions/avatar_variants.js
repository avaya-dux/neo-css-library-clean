const fs = require('fs').promises;
const { size } = require('lodash');
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

$avatar-size: $token-avatar-default-width !default;

    - small - DONE
    - medium - DONE
    - large - DONE
$avatar-font-color: $token-avatar-color !default;
$avatar-font-size: $token-avatar-initials-regular-font-size !default;
$avatar-font-weight: $token-avatar-initials-regular-font-weight !default;
$avatar-line-height: $token-avatar-initials-regular-line-height !default;

- ALL FONT STYLES DONE

$avatar-initials-selector: data-initials !default; - UNCHANGED

$avatar-border-style: $token-avatar-avatar-border-style; - DONE
$avatar-border-width: $token-avatar-avatar-border-width; - DONE

$avatar-border-radius: $token-border-radius-100; - TOKEN

$avatar-background: $token-avatar-background-color !default; - DONE
$avatar-border-color: $token-avatar-avatar-border-color; - DONE, FOR ALL COLORS

status styles:

 - colors - DONE
 - sizes - DONE
 - icons - TOKENS

*/

async function avatarStyles(value) {
  const avatarJSONObject = {
    avatar: {},
  };

  var avatarArray = value.Images.children.filter(
    (components) =>
      components.name === 'avatar' && components.type === 'COMPONENT_SET'
  )[0].children;
  //   console.log(avatarArray);

  for (const comp of avatarArray) {
    if (
      comp.name === 'Content=initials, Size=small, Border=none, status=none'
    ) {
      //avatar-small-size
      avatarJSONObject.avatar['small-size'] = {
        value: `${comp.size.x}px`,
      };
    }
    if (
      comp.name === 'Content=initials, Size=medium, Border=none, status=none'
    ) {
      //avatar-medium-size
      avatarJSONObject.avatar['medium-size'] = {
        value: `${comp.size.x}px`,
      };
    }
    if (
      comp.name === 'Content=initials, Size=large, Border=none, status=none'
    ) {
      //avatar-medium-size
      avatarJSONObject.avatar['large-size'] = {
        value: `${comp.size.x}px`,
      };
    }
    // font sizes - hooking up with token - in order to hook up with tokens we need to tap into the tokens naming conventions
    if (
      comp.name === 'Content=initials, Size=small, Border=none, status=none'
    ) {
      // background-color
      var backgroundColorID = comp.children.filter(
        (child) => child.name === '.base-avatar'
      )[0].children[0].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          backgroundColorID
        )
        .then((value) => {
          avatarJSONObject.avatar['background-color'] = {
            value: `{color.${value.nodes[
              backgroundColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
      // font-color
      var fontColorID = comp.children.filter(
        (child) => child.type === 'TEXT'
      )[0].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          fontColorID
        )
        .then((value) => {
          avatarJSONObject.avatar['font-color'] = {
            value: `{color.${value.nodes[
              fontColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
      // font-size
      var fontTokenID = comp.children.filter(
        (child) => child.type === 'TEXT'
      )[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          fontTokenID
        )
        .then((value) => {
          avatarJSONObject.avatar['small-font-size'] = {
            value: `{Web-typography.${value.nodes[
              fontTokenID
            ].document.name.toLowerCase()}.fontSize.value}`,
          };
          // avatarJSONObject.avatar['small-font-weight'] = {
          //   value: `{Web-typography.${value.nodes[
          //     fontTokenID
          //   ].document.name.toLowerCase()}.fontWeight.value}`,
          // };
          avatarJSONObject.avatar['small-letter-spacing'] = {
            value: `{Web-typography.${value.nodes[
              fontTokenID
            ].document.name.toLowerCase()}.letterSpacing.value}`,
          };
          avatarJSONObject.avatar['small-line-height'] = {
            value: `{Web-typography.${value.nodes[
              fontTokenID
            ].document.name.toLowerCase()}.lineHeight.value}`,
          };
        });
    }
    if (
      comp.name === 'Content=initials, Size=medium, Border=none, status=none'
    ) {
      // font-size
      var fontTokenID = comp.children.filter(
        (child) => child.type === 'TEXT'
      )[0].styles.text;

      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          fontTokenID
        )
        .then((value) => {
          avatarJSONObject.avatar['medium-font-size'] = {
            value: `{Web-typography.${value.nodes[
              fontTokenID
            ].document.name.toLowerCase()}.fontSize.value}`,
          };
          // avatarJSONObject.avatar['medium-font-weight'] = {
          //   value: `{Web-typography.${value.nodes[
          //     fontTokenID
          //   ].document.name.toLowerCase()}.fontWeight.value}`,
          // };
          avatarJSONObject.avatar['medium-letter-spacing'] = {
            value: `{Web-typography.${value.nodes[
              fontTokenID
            ].document.name.toLowerCase()}.letterSpacing.value}`,
          };
          avatarJSONObject.avatar['medium-line-height'] = {
            value: `{Web-typography.${value.nodes[
              fontTokenID
            ].document.name.toLowerCase()}.lineHeight.value}`,
          };
        });
    }
    if (
      comp.name === 'Content=initials, Size=large, Border=none, status=none'
    ) {
      // font-size
      var fontTokenID = comp.children.filter(
        (child) => child.type === 'TEXT'
      )[0].styles.text;

      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          fontTokenID
        )
        .then((value) => {
          avatarJSONObject.avatar['large-font-size'] = {
            value: `{Web-typography.${value.nodes[
              fontTokenID
            ].document.name.toLowerCase()}.fontSize.value}`,
          };
          // avatarJSONObject.avatar['large-font-weight'] = {
          //   value: `{Web-typography.${value.nodes[
          //     fontTokenID
          //   ].document.name.toLowerCase()}.fontWeight.value}`,
          // };
          avatarJSONObject.avatar['large-letter-spacing'] = {
            value: `{Web-typography.${value.nodes[
              fontTokenID
            ].document.name.toLowerCase()}.letterSpacing.value}`,
          };
          avatarJSONObject.avatar['large-line-height'] = {
            value: `{Web-typography.${value.nodes[
              fontTokenID
            ].document.name.toLowerCase()}.lineHeight.value}`,
          };
        });
    }
    if (
      comp.name ===
      'Content=image, Size=small, Border=default-info, status=none'
    ) {
      avatarJSONObject.avatar['border-width'] = {
        value: `${
          comp.children[0].children.filter(
            (child) => child.name === '.base-avatar'
          )[0].strokeWeight
        }px`,
      };
      avatarJSONObject.avatar['border-style'] = {
        value: comp.children[0].children
          .filter((child) => child.name === '.base-avatar')[0]
          .strokes[0].type.toLowerCase(),
      };
    }

    // border colors
    if (
      !comp.name.includes('Border=none') &&
      comp.name.includes('Size=small') &&
      comp.name.includes('Content=image')
    ) {
      var fullBorderColor = comp.name.slice(comp.name.indexOf('B'));
      var borderColor = fullBorderColor.slice(
        fullBorderColor.indexOf('=') + 1,
        fullBorderColor.indexOf(',')
      );
      var colorTokenID = comp.children[0].children[0].styles.strokes;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          colorTokenID
        )
        .then((value) => {
          avatarJSONObject.avatar[`border-${borderColor}`] = {
            value: `{color.${value.nodes[
              colorTokenID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    // status styles
    if (
      !comp.name.includes('status=none') &&
      !comp.name.includes('Content=image')
    ) {
      // status colors
      if (comp.name.includes('Size=small')) {
        var status = comp.name.slice(comp.name.lastIndexOf('=') + 1);
        var statusColorID = comp.children
          .filter((child) => child.name === '.status-small')[0]
          .children.filter((child) => child.name.includes('status'))[0]
          .children[0].styles.fill;
        await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            statusColorID
          )
          .then((value) => {
            avatarJSONObject.avatar[`status-${status}-color`] = {
              value: `{color.${value.nodes[
                statusColorID
              ].document.name.toLowerCase()}.value}`,
            };
          });
      }
      // status sizes
      // small
      if (
        comp.name.includes('Size=small') &&
        comp.name.includes('status=available')
      ) {
        console.log(comp.children[1].children[1].relativeTransform);
        avatarJSONObject.avatar['status-size-small'] = {
          value: `${
            comp.children.filter((child) => child.name.includes('status'))[0]
              .size.x
          }px`,
        };
        avatarJSONObject.avatar['status-small-top'] = {
          value: `${comp.children[1].children[1].children[0].relativeTransform[0][2]}px`,
        };
        avatarJSONObject.avatar['status-small-right'] = {
          value: `${comp.children[1].children[1].children[0].relativeTransform[1][2]}px`,
        };
      }
      // medium
      if (
        comp.name.includes('Size=medium') &&
        comp.name.includes('status=available')
      ) {
        avatarJSONObject.avatar['status-size-medium'] = {
          value: `${
            comp.children.filter((child) => child.name.includes('status'))[0]
              .size.x
          }px`,
        };
        avatarJSONObject.avatar['status-medium-top'] = {
          value: `${comp.children[1].children[1].children[0].relativeTransform[0][2]}px`,
        };
        avatarJSONObject.avatar['status-medium-right'] = {
          value: `${comp.children[1].children[1].children[0].relativeTransform[1][2]}px`,
        };
      }
      // large
      if (
        comp.name.includes('Size=large') &&
        comp.name.includes('status=available')
      ) {
        avatarJSONObject.avatar['status-size-large'] = {
          value: `${
            comp.children.filter((child) => child.name.includes('status'))[0]
              .size.x
          }px`,
        };
        avatarJSONObject.avatar['status-large-top'] = {
          value: `${comp.children[1].children[1].children[0].relativeTransform[0][2]}px`,
        };
        avatarJSONObject.avatar['status-large-right'] = {
          value: `${comp.children[1].children[1].children[0].relativeTransform[1][2]}px`,
        };
      }
    }
  }
  // console.log(avatarJSONObject);
  await fs
    .writeFile(
      '../css-library/style-dictionary/properties/components/avatar.json',
      JSON.stringify(avatarJSONObject)
    )
    .then(function () {
      console.log('avatar.json created');
    });
}

exports.avatarStyles = avatarStyles;
