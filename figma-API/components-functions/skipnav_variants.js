/**
height: 44px;
width: 168px;
left: 7576px;
top: 536px;
border-radius: 2px;
padding: 12px, 16px, 12px, 16px;

A skip navigation link provides a quick way for users to jump into specific areas of a page.
Auto Layout

display: flex;
flex-direction: row;
align-items: flex-start;
padding: 12px 16px;

position: fixed;
width: 168px;
height: 44px;

Blue/500

background: #1473E6;
border-radius: 2px;

---------------------------------------------
height: 20px;
width: 136px;
left: 16px;
top: 12px;
border-radius: nullpx;
*/

const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

async function skipNavStyles(value) {
  skipNavJSONObject = {
    skipNav: {},
  };

  var skipnavigation = value.Navigation.children.filter(
    (child) => child.name === "skip-navigation"
  )[0];

  // padding left/right
  skipNavJSONObject.skipNav["padding-x"] = {
    value: `${skipnavigation.paddingLeft}px`,
  };

  // padding top/bottom
  skipNavJSONObject.skipNav["padding-y"] = {
    value: `${skipnavigation.paddingTop}px`,
  };

  // border radius
  skipNavJSONObject.skipNav["border-radius"] = {
    value: `${skipnavigation.cornerRadius}px`,
  };

  // min-height of the skipNav Wrapper
  skipNavJSONObject.skipNav["min-height"] = {
    value: `${skipnavigation.size.y}px`,
  };

  // min-width of the skipNav Wrapper
  skipNavJSONObject.skipNav["min-width"] = {
    value: `${skipnavigation.size.x}px`,
  };

  // left/right/top/bottom margin
  skipNavJSONObject.skipNav["item-spacer"] = {
    value: `${skipnavigation.itemSpacing}px`,
  };

  // style: fill colour
  var skipNavColorTokenID = skipnavigation.styles.fills;
  skipNavJSONObject.skipNav["background"] = {
    value: await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        skipNavColorTokenID
      )
      .then(
        (value) =>
          //   console.log(
          //     value.nodes[headerFontTokenID].document.name.toLowerCase()
          //   );
          `{color.${value.nodes[
            skipNavColorTokenID
          ].document.name.toLowerCase()}.value}`
      ),
  };

  // text style colour
  var skipNavFontColorTokenID = skipnavigation.children[0].styles.fill;
  skipNavJSONObject.skipNav["font-color"] = {
    value: await coreFigmaFunctions
      .getFigmaTokenNameByID(
        coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        skipNavFontColorTokenID
      )
      .then(
        (value) =>
          //   console.log(JSON.stringify(skipnavigation.children[0].styles))
          `{color.${value.nodes[
            skipNavFontColorTokenID
          ].document.name.toLowerCase()}.value}`
      ),
  };

  var skipNavFontTokenID = skipnavigation.children[0].styles.text;
  await coreFigmaFunctions
    .getFigmaTokenNameByID(
      coreFigmaFunctions.figmaCredentials.figmaAPIKey,
      coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
      skipNavFontTokenID
    )
    .then((value) => {
      var skipNavFontTokenName = value.nodes[
        skipNavFontTokenID
      ].document.name.toLowerCase();
      // font-size
      skipNavJSONObject.skipNav["font-size"] = {
        value: `{Web-typography.${skipNavFontTokenName}.fontSize.value}`,
      };
      // line-height
      skipNavJSONObject.skipNav["line-height"] = {
        value: `{Web-typography.${skipNavFontTokenName}.lineHeight.value}`,
      };
      // letter-spacing
      skipNavJSONObject.skipNav["letter-spacing"] = {
        value: `{Web-typography.${skipNavFontTokenName}.letterSpacing.value}`,
      };
      // font-weight
      skipNavJSONObject.skipNav["font-weight"] = {
        value: `{Web-typography.fontweight-regular.value}`,
      };
    });

  await fs
    .writeFile(
      "../properties/components/skipNav.json",
      JSON.stringify(skipNavJSONObject)
    )
    .then(function () {
      console.log("skipNav.json created");
    });

  console.log(JSON.stringify(skipnavigation.children[0]));
}
exports.skipNavStyles = skipNavStyles;
