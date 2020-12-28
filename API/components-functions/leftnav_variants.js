const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

Left Nav Styles:

Width - DONE - Component max-width

MAIN:

Height - DONE
Padding - DONE - vertically center items with flex

Left icon size - DONE
Spacing between icon and text - DONE

Active left border width - DONE
Active left border style - DONE

Text styles - regular/active - DONE
- font-weight
- font-size
- line-height
- letter-spacing

Colors - text, icon, border, background:
Default color - DONE
Active color - DONE
Hover state colors - DONE
Disabled state colors - active/default - DONE

Chevron icon -- DONE, icon token, take animation from Accordion Component

SUB:

Height - DONE
Padding - DONE

Active left border width - DONE
Active left border style - DONE

Text styles - regular/active - DONE
- font-weight
- font-size
- line-height
- letter-spacing

Colors - text, icon, border:
Default color - DONE
Active color - DONE
Hover state colors - DONE
Disabled state colors - active/default - DONE

LINKS - external links, no active state

Height - DONE
Padding - DONE
Text styles

Colors taken from Neo link color?

TITLES

*/

async function leftnavStyles(value) {
  const leftnavJSONObject = {
    leftnav: {},
  };

  const leftnavs = value.Navigation.children.filter(
    (comps) => comps.name.includes('left-nav') && !comps.name.includes('.base')
  );
  //   console.log(leftnavs);

  // leftnav main variants

  const leftnavMainVariants = leftnavs[0].children;

  const leftnavSubVariants = leftnavs[1].children;

  const leftnavLink = leftnavs.filter(
    (comps) => comps.name === 'left-nav/link'
  );

  const leftnavTitle = leftnavs.filter(
    (comps) => comps.name === 'left-nav/title'
  );

  for (const titleComp of leftnavTitle) {
    //title height
    leftnavJSONObject.leftnav['title-height'] = {
      value: `${titleComp.size.y}px`,
    };
    // title padding
    leftnavJSONObject.leftnav['title-padding-horizontal'] = {
      value: `${titleComp.children[0].relativeTransform[0][2]}px`,
    };
    leftnavJSONObject.leftnav['title-padding-vertical'] = {
      value: `${titleComp.children[0].relativeTransform[1][2]}px`,
    };
    // title font style
    var titlefontStyleTokenID = titleComp.children[0].styles.text;
    await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        titlefontStyleTokenID
      )
      .then((value) => {
        var fontTokenName = value.nodes[
          titlefontStyleTokenID
        ].document.name.toLowerCase();
        // font-size
        leftnavJSONObject.leftnav['title-font-size'] = {
          value: `{Web-typography.${fontTokenName}.fontSize.value}`,
        };
        // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
        leftnavJSONObject.leftnav['title-font-weight'] = {
          value: `{Web-typography.fontweight-regular.value}`,
        };
        // line-height
        leftnavJSONObject.leftnav['title-line-height'] = {
          value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
        };
        // letter-spacing
        leftnavJSONObject.leftnav['title-letter-spacing'] = {
          value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
        };
      });
    // title font color
    var titlefontColorTokenID = titleComp.children[0].styles.fill;

    await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        titlefontColorTokenID
      )
      .then((value) => {
        leftnavJSONObject.leftnav['title-font-color'] = {
          value: `{color.${value.nodes[
            titlefontColorTokenID
          ].document.name.toLowerCase()}.value}`,
        };
      });
  }

  for (const linkComp of leftnavLink) {
    // links height
    leftnavJSONObject.leftnav['link-height'] = {
      value: `${linkComp.size.y}px`,
    };
    // links padding
    leftnavJSONObject.leftnav['link-padding-horizontal'] = {
      value: `${linkComp.children[0].relativeTransform[0][2]}px`,
    };
    // links font style
    var linkfontStyleTokenID = linkComp.children[0].styles.text;
    await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        linkfontStyleTokenID
      )
      .then((value) => {
        var fontTokenName = value.nodes[
          linkfontStyleTokenID
        ].document.name.toLowerCase();
        // font-size
        leftnavJSONObject.leftnav['link-font-size'] = {
          value: `{Web-typography.${fontTokenName}.fontSize.value}`,
        };
        // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
        leftnavJSONObject.leftnav['link-font-weight'] = {
          value: `{Web-typography.fontweight-regular.value}`,
        };
        // line-height
        leftnavJSONObject.leftnav['link-line-height'] = {
          value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
        };
        // letter-spacing
        leftnavJSONObject.leftnav['link-letter-spacing'] = {
          value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
        };
      });
  }

  for (const mainVariant of leftnavMainVariants) {
    // console.log(mainVariant);
    if (
      mainVariant.name ===
      'active=TRUE, expandable=TRUE, icon=TRUE, state=default'
    ) {
      // collapse icon size
      leftnavJSONObject.leftnav['collapse-icon-font-size'] = {
        value: `${mainVariant.children[0].children[1].size.x}px`,
      };
      // background-color
      var backgroundColorTokenID = mainVariant.children[0].styles.fills;
      leftnavJSONObject.leftnav['background-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            backgroundColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                backgroundColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // leftnav max-width
      leftnavJSONObject.leftnav['max-width'] = {
        value: `${mainVariant.size.x}px`,
      };
      // leftnav Main max-height
      leftnavJSONObject.leftnav['main-max-height'] = {
        value: `${mainVariant.size.y}px`,
      };
      // leftnav Main icon-spacing
      leftnavJSONObject.leftnav['icon-spacing'] = {
        value: `${mainVariant.children[0].children[0].itemSpacing}px`,
      };
      // leftnav Main padding
      leftnavJSONObject.leftnav['main-padding-horizontal'] = {
        value: `${mainVariant.children[0].children[0].relativeTransform[0][2]}px`,
      };
      // leftnav Main icon font size
      leftnavJSONObject.leftnav['main-icon-font-size'] = {
        value: `${mainVariant.children[0].children[0].children[0].children[0].size.x}px`,
      };
      // leftnav active border width
      leftnavJSONObject.leftnav['main-active-border-width'] = {
        value: `${mainVariant.children[0].children[2].size.x}px`,
      };
      // leftnav active border style
      leftnavJSONObject.leftnav['main-active-border-style'] = {
        value: mainVariant.children[0].children[2].fills[0].type.toLowerCase(),
      };
      // leftnav active color
      var activeColorTokenID = mainVariant.children[0].children[2].styles.fill;
      leftnavJSONObject.leftnav['main-active-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            activeColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                activeColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      mainVariant.name ===
      'active=TRUE, expandable=TRUE, icon=TRUE, state=hover'
    ) {
      // leftnav hover background color
      var hoverBGColorTokenID = mainVariant.children[0].styles.fills;
      leftnavJSONObject.leftnav['leftnav-hover-bg-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            hoverBGColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                hoverBGColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // leftnav hover color
      var hoverColorTokenID = mainVariant.children[0].children[2].styles.fill;
      leftnavJSONObject.leftnav['main-hover-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            hoverColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                hoverColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      mainVariant.name ===
      'active=TRUE, expandable=TRUE, icon=TRUE, state=disabled'
    ) {
      // leftnav active disabled color
      var activeDisabledColorTokenID =
        mainVariant.children[0].children[2].styles.fill;
      leftnavJSONObject.leftnav['main-active-disabled-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            activeDisabledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                activeDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // active font styles
      var textTokenID =
        mainVariant.children[0].children[0].children[1].styles.text;

      value: await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          textTokenID
        )
        .then((value) => {
          var fontTokenName = value.nodes[
            textTokenID
          ].document.name.toLowerCase();
          // font-size
          leftnavJSONObject.leftnav['active-font-size'] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          leftnavJSONObject.leftnav['active-font-weight'] = {
            value: `{Web-typography.fontweight-semibold.value}`,
          };
          // line-height
          leftnavJSONObject.leftnav['active-line-height'] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          leftnavJSONObject.leftnav['active-letter-spacing'] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
    }
    if (
      mainVariant.name ===
      'active=FALSE, expandable=TRUE, icon=TRUE, state=default'
    ) {
      // leftnav default color
      var defaultColorTokenID =
        mainVariant.children[0].children[0].children[1].styles.fill;
      leftnavJSONObject.leftnav['default-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // default font-styles
      var textTokenID =
        mainVariant.children[0].children[0].children[1].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          textTokenID
        )
        .then((value) => {
          var fontTokenName = value.nodes[
            textTokenID
          ].document.name.toLowerCase();
          // font-size
          leftnavJSONObject.leftnav['default-font-size'] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          leftnavJSONObject.leftnav['default-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
          // line-height
          leftnavJSONObject.leftnav['default-line-height'] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          leftnavJSONObject.leftnav['default-letter-spacing'] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
    }
    if (
      mainVariant.name ===
      'active=FALSE, expandable=TRUE, icon=TRUE, state=disabled'
    ) {
      // leftnav default disabled color
      var defaultDisabledColorTokenID =
        mainVariant.children[0].children[0].children[1].styles.fill;
      leftnavJSONObject.leftnav['main-default-disabled-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultDisabledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
  }

  for (const subVariant of leftnavSubVariants) {
    // console.log(mainVariant);
    if (subVariant.name === 'active=TRUE, state=default') {
      //   console.log(mainVariant);
      //   console.log(mainVariant.children[0].children[2]);
      // leftnav Sub max-height
      leftnavJSONObject.leftnav['sub-max-height'] = {
        value: `${subVariant.size.y}px`,
      };
      // leftnav Sub padding
      leftnavJSONObject.leftnav['sub-padding-horizontal'] = {
        value: `${subVariant.children[0].children[0].relativeTransform[0][2]}px`,
      };
      // leftnav Sub active border width
      leftnavJSONObject.leftnav['sub-active-border-width'] = {
        value: `${subVariant.children[0].children[1].size.x}px`,
      };
      // leftnav Sub active border style
      leftnavJSONObject.leftnav['sub-active-border-style'] = {
        value: subVariant.children[0].children[1].fills[0].type.toLowerCase(),
      };
      // leftnav Sub active color
      var activeColorTokenID = subVariant.children[0].children[1].styles.fill;
      leftnavJSONObject.leftnav['sub-active-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            activeColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                activeColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (subVariant.name === 'active=TRUE, state=hover') {
      // leftnav Sub hover color
      var hoverColorTokenID = subVariant.children[0].children[1].styles.fill;
      leftnavJSONObject.leftnav['sub-hover-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            hoverColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                hoverColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (subVariant.name === 'active=TRUE, state=disabled') {
      // leftnav Sub active disabled color
      var activeDisabledColorTokenID =
        subVariant.children[0].children[1].styles.fill;
      leftnavJSONObject.leftnav['sub-active-disabled-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            activeDisabledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                activeDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // Sub active font styles
      var textTokenID = subVariant.children[0].children[0].styles.text;

      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          textTokenID
        )
        .then((value) => {
          var fontTokenName = value.nodes[
            textTokenID
          ].document.name.toLowerCase();
          // font-size
          leftnavJSONObject.leftnav['sub-active-font-size'] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          leftnavJSONObject.leftnav['sub-active-font-weight'] = {
            value: `{Web-typography.fontweight-semibold.value}`,
          };
          // line-height
          leftnavJSONObject.leftnav['sub-active-line-height'] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          leftnavJSONObject.leftnav['sub-active-letter-spacing'] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
    }
    if (subVariant.name === 'active=FALSE, state=default') {
      // leftnav default color
      var defaultColorTokenID = subVariant.children[0].children[0].styles.fill;
      leftnavJSONObject.leftnav['sub-default-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // default font-styles
      var textTokenID = subVariant.children[0].children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          textTokenID
        )
        .then((value) => {
          var fontTokenName = value.nodes[
            textTokenID
          ].document.name.toLowerCase();
          // font-size
          leftnavJSONObject.leftnav['sub-default-font-size'] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          leftnavJSONObject.leftnav['sub-default-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
          // line-height
          leftnavJSONObject.leftnav['sub-default-line-height'] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          leftnavJSONObject.leftnav['sub-default-letter-spacing'] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
    }
    if (subVariant.name === 'active=FALSE, state=disabled') {
      // leftnav default disabled color
      var defaultDisabledColorTokenID =
        subVariant.children[0].children[0].styles.fill;
      leftnavJSONObject.leftnav['sub-default-disabled-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultDisabledColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
  }

  // console.log(leftnavJSONObject);

  await fs
    .writeFile(
      '../properties/components/leftnav.json',
      JSON.stringify(leftnavJSONObject)
    )
    .then(function () {
      console.log('leftnav.json created');
    });
}

exports.leftnavStyles = leftnavStyles;
