const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*
  
  ////////
  Tabs
  ///////

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
  await Promise.all(
    value.Navigation.children.map(async (child) => {
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
        var carouselButtonIconColorId =
          buttons[0].children[0].children[0].children[0].styles.fill;
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
    tabsJSONObject.tabs['background-color'] = {
      value: definedValues[0][1],
    };
    await fs
      .writeFile(
        '../properties/components/tabCarousel.json',
        JSON.stringify(tabsJSONObject)
      )
      .then(function () {
        console.log('tabCarousel.json created');
      });
  });
}

exports.tabStyles = tabStyles;
