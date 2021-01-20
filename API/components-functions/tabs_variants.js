const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*
  
  ////////
  Tabs
  ///////

  colours:

  - background color - DONE

  - default - DONE
  - hover - DONE
  - active - DONE
  - active-disabled - DONE
  - disabled - DONE

  icon sizings - DONE
  icon offset - DONE

  font styles
    - default - DONE
    - active - DONE

  padding - ASK SHAINA

  max height - DONE

  border styles:
   - width - DONE
   - style - NOT AVAILABLE IN FIGMA

////////////

  Carousel:
  - button width -- DONE
  - butto height -- DONE
  - button padding
  - button color
  - button border radius

       // tabsJSONObject.tabs['carousel-button-height'] = {
        //   value: `${buttons[0].size.y}px`,
        // };
        // tabsJSONObject.tabs['carousel-button-width'] = {
        //   value: `${buttons[0].size.x}px`,
        // };

  icon to use - one for left, right, more
  
  - then need to think about animation?
    - gave tab items opacity transition?

  - actually, it's just a square button with a specific icon in it
    - if so, all we will need is the icon unicode OR use class name
    - if using classname, only thing we will have to define is the icon color
    - color - DONE
    - hover state - DONE
    - background-color - DONE

*/

async function tabStyles(value) {
  tabsJSONObject = {
    tabs: {},
  };

  const tabVariants = value.Navigation.children.filter(
    (comp) => comp.name == 'tab-horizontal'
  )[0];

  // console.log(tabVariants);

  for (horizontalTab of tabVariants.children) {
    // console.log(horizontalTab);
    if (horizontalTab.name === 'Icon=none, Active=FALSE, State=default') {
      // console.log(horizontalTab);
      // max-height
      tabsJSONObject.tabs['max-height'] = {
        value: `${horizontalTab.children[0].size.y}px`,
      };
      // font styles incl. active font-weight
      var textTokenID =
        horizontalTab.children[0].children[0].children[0].children[1].styles
          .text;
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
          tabsJSONObject.tabs['font-size'] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // default font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          tabsJSONObject.tabs['default-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
          // active font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          tabsJSONObject.tabs['active-font-weight'] = {
            value: `{Web-typography.fontweight-semibold.value}`,
          };
          // line-height
          tabsJSONObject.tabs['line-height'] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          tabsJSONObject.tabs['letter-spacing'] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
      // tab background color
      var tabBackgroundColorTokenID = horizontalTab.children[0].styles.fills;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          tabBackgroundColorTokenID
        )
        .then(
          (value) =>
            (tabsJSONObject.tabs['background-color'] = {
              value: `{color.${value.nodes[
                tabBackgroundColorTokenID
              ].document.name.toLowerCase()}.value}`,
            })
        );
      // tab default color
      var tabDefaultColorTokenID =
        horizontalTab.children[0].children[0].children[0].children[1].styles
          .fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          tabDefaultColorTokenID
        )
        .then(
          (value) =>
            (tabsJSONObject.tabs['default-color'] = {
              value: `{color.${value.nodes[
                tabDefaultColorTokenID
              ].document.name.toLowerCase()}.value}`,
            })
        );
    }
    if (horizontalTab.name === 'Icon=none, Active=FALSE, State=hover') {
      // tab hover color
      var tabHoverColorTokenID =
        horizontalTab.children[0].children[0].children[0].children[1].styles
          .fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          tabHoverColorTokenID
        )
        .then(
          (value) =>
            (tabsJSONObject.tabs['hover-color'] = {
              value: `{color.${value.nodes[
                tabHoverColorTokenID
              ].document.name.toLowerCase()}.value}`,
            })
        );
    }
    if (horizontalTab.name === 'Icon=none, Active=FALSE, State=disabled') {
      // tab disabled color
      var tabDisabledColorTokenID =
        horizontalTab.children[0].children[0].children[0].children[1].styles
          .fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          tabDisabledColorTokenID
        )
        .then(
          (value) =>
            (tabsJSONObject.tabs['disabled-color'] = {
              value: `{color.${value.nodes[
                tabDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`,
            })
        );
    }
    if (horizontalTab.name === 'Icon=right, Active=TRUE, State=default') {
      // console.log(horizontalTab.children[0].children[0].children[0]);
      // icon size
      tabsJSONObject.tabs['icon-size'] = {
        value: `${horizontalTab.children[0].children[0].children[0].children[2].size.y}px`,
      };
      // icon offset
      tabsJSONObject.tabs['icon-offset'] = {
        value: `${horizontalTab.children[0].children[0].children[0].itemSpacing}px`,
      };
      // tab active color
      var tabActiveColorTokenID =
        horizontalTab.children[0].children[0].children[0].children[1].styles
          .fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          tabActiveColorTokenID
        )
        .then(
          (value) =>
            (tabsJSONObject.tabs['active-color'] = {
              value: `{color.${value.nodes[
                tabActiveColorTokenID
              ].document.name.toLowerCase()}.value}`,
            })
        );
      // tab active border width
      tabsJSONObject.tabs['border-width'] = {
        value: `${horizontalTab.children[0].children[0].children[1].size.y}px`,
      };
    }
    if (horizontalTab.name === 'Icon=right, Active=TRUE, State=disabled') {
      // tab active disabled color
      var tabActiveDisabledColorTokenID =
        horizontalTab.children[0].children[0].children[0].children[1].styles
          .fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          tabActiveDisabledColorTokenID
        )
        .then(
          (value) =>
            (tabsJSONObject.tabs['active-disabled-color'] = {
              value: `{color.${value.nodes[
                tabActiveDisabledColorTokenID
              ].document.name.toLowerCase()}.value}`,
            })
        );
    }
  }

  // const tabCarouselVariants = value.Navigation.children.filter(
  //   (comp) => comp.name == 'tab-carousel'
  // )[0];

  // for (carouselVariants of tabCarouselVariants) {
  // }

  await Promise.all(
    value.Navigation.children.map(async (child) => {
      // tab-carousel
      if (child.name === 'tab-carousel') {
        // tabs background color
        var tabBackgroundColorId = child.styles.fills;
        var tabBackgroundColorName = await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            tabBackgroundColorId
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                tabBackgroundColorId
              ].document.name.toLowerCase()}.value}`
          );
        // tabs carousel button icon color
        var children = child.children;
        var buttons = children.filter((child) => child.name != 'tabs');
        // console.log(buttons);
        var carouselButtonIconColorId =
          buttons[0].children[0].children[0].styles.fill;
        var buttonIconColorTokenName = await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            carouselButtonIconColorId
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                carouselButtonIconColorId
              ].document.name.toLowerCase()}.value}`
          );
      }
      return [buttonIconColorTokenName, tabBackgroundColorName];
    })
  ).then(async (values) => {
    // console.log(values);
    var definedValues = values.filter((value) => !value.includes(undefined));
    // console.log(definedValues);
    tabsJSONObject.tabs['carousel-button-color'] = {
      value: definedValues[0][0],
    };
    tabsJSONObject.tabs['carousel-background-color'] = {
      value: definedValues[0][1],
    };
    console.log(tabsJSONObject);
    await fs
      .writeFile(
        '../properties/components/tabs.json',
        JSON.stringify(tabsJSONObject)
      )
      .then(function () {
        console.log('tabs.json created');
      });
  });
}

exports.tabStyles = tabStyles;
