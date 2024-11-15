const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

////////
List Sections
////////

- list wrapper - flexbox?
  - bottom-divider: border - DONE
- three main list components
  - padding top/bottom: 12px - DONE
  - padding left/right: 8px - DONE
  - min-height: height of component with single line of text (smallest) - DONE
  - min-width: width of component with single line of text (thinnest) - DONE
  - margin-right (w/ exception of last child): 16px? 8px?
  - vertical flex styles?
  - child margin-bottom
  
*/
async function listItemStyles(value) {
  listJSONObject = {
    listItems: {},
  };

  await Promise.all(
    value.Other.children.map(async (child) => {
      if (child.name === ".base-list-item/left") {
        // console.log(child);
        // padding top/bottom
        var listItemVerticalPadding = `${child.paddingTop}px`;
        // padding left/right
        var listItemHorizontalPadding = `${child.paddingRight}px`;
        // margin-right
        var listItemMargin = `${child.itemSpacing}px`;
        return [
          listItemVerticalPadding,
          listItemHorizontalPadding,
          listItemMargin,
        ];
      }
      if (child.name === "list-item") {
        var comp = child.children.filter(
          (child) =>
            child.name ===
            "Left Side=1) empty, Middle=1) one line, Right Side=1) empty"
        );
        var listItemMinWidth = `${comp[0].absoluteBoundingBox.width}px`;
        var listItemMinHeight = `${comp[0].absoluteBoundingBox.height}px`;
        return [listItemMinWidth, listItemMinHeight];
      }
      if (child.name === "divider") {
        // console.log(child.children[0]);
        var divider = child.children[0];
        var listItemDividerWidth = `${divider.strokeWeight}px`;
        var listItemDividerStyle = divider.strokes[0].type.toLowerCase();
        var listItemDividerTokenId = divider.styles.stroke;
        var listItemDividerColor = await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            listItemDividerTokenId
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                listItemDividerTokenId
              ].document.name.toLowerCase()}.value}`
          );
        return [
          listItemDividerWidth,
          listItemDividerStyle,
          listItemDividerColor,
        ];
      }
    })
  ).then(async (values) => {
    // console.log(values);
    var definedValues = values.filter((value) => value != undefined);
    // console.log(definedValues);
    listJSONObject.listItems["vertical-padding"] = {
      value: definedValues[0][0],
    };
    listJSONObject.listItems["horizontal-padding"] = {
      value: definedValues[0][1],
    };
    listJSONObject.listItems["margin-right"] = { value: definedValues[0][2] };
    listJSONObject.listItems["min-width"] = { value: definedValues[1][0] };
    listJSONObject.listItems["min-height"] = { value: definedValues[1][1] };
    listJSONObject.listItems["divider"] = {
      value: `${definedValues[2][0]} ${definedValues[2][1]} ${definedValues[2][2]}`,
    };
  });

  await fs
    .writeFile(
      "../properties/components/listItems.json",
      JSON.stringify(listJSONObject)
    )
    .then(function () {
      console.log("listItems.json created");
    });
}

exports.listItemStyles = listItemStyles;
