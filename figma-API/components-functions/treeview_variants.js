const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

Tree view styles:

icons - tokens
draggable thing?

background-color:
- default - DONE
- hover - DONE

min-height - DONE
padding-y - DONE
padding-x - JS-dependent

text styles:
- default - DONE
- hover - colour only - DONE
- selected - DONE
- disabled - colour only - DONE

item spacing - DONE

selected border colour and size

///chevron -- text w/ icon OR text with checkbox/// -- ///optional components///

optional components should always be flex end?

 */

async function treeviewStyles(value) {
  treeviewJSONObject = {
    treeview: {},
  };

  var treeviewVariants = value.Navigation.children.filter(
    (child) => child.name === "tree-view"
  )[0].children;

  //   var treeViewBase = value.Navigation.children.filter(
  //     (child) => child.name === ".tree-view-base"
  //   )[0];

  //   console.log(treeViewBase.children[1]);
  //   console.log(treeViewBase.children[1].children);
  //   console.log(treeViewBase.children[1].children[0]);

  for (variant of treeviewVariants) {
    if (
      variant.name ===
      "Level=1, Direction=collapsed, Icon=FALSE, Selector=none, Right Side=none, State=default, Selected=FALSE"
    ) {
      //   console.log(variant);
      //   console.log(variant.children);
      //   console.log(variant.children[0].children[2]);
      // item spacing
      treeviewJSONObject.treeview["item-spacing"] = {
        value: `${variant.children[0].children[2].children[0].itemSpacing}px`,
      };
      // background-color
      var defaultBgID = variant.children[0].styles.fills;
      treeviewJSONObject.treeview["default-bg-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultBgID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultBgID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // min-height
      treeviewJSONObject.treeview["min-height"] = {
        value: `${variant.size.y}px`,
      };
      // padding-y - hard-coded for now
      treeviewJSONObject.treeview["padding-y"] = {
        value: "8px",
      };
      // default text styles
      var defaultFontID =
        variant.children[0].children[2].children[0].children[5].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          defaultFontID
        )
        .then((value) => {
          var defaultTokenName = value.nodes[
            defaultFontID
          ].document.name.toLowerCase();
          // font-size
          treeviewJSONObject.treeview["default-font-size"] = {
            value: `{Web-typography.${defaultTokenName}.fontSize.value}`,
          };
          // line-height
          treeviewJSONObject.treeview["default-line-height"] = {
            value: `{Web-typography.${defaultTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          treeviewJSONObject.treeview["default-letter-spacing"] = {
            value: `{Web-typography.${defaultTokenName}.letterSpacing.value}`,
          };
          // font-weight
          treeviewJSONObject.treeview["default-font-weight"] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // font color
      var defaultFontColorID =
        variant.children[0].children[2].children[0].children[5].styles.fill;
      treeviewJSONObject.treeview["default-font-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            defaultFontColorID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                defaultFontColorID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      variant.name ===
      "Level=1, Direction=collapsed, Icon=FALSE, Selector=none, Right Side=none, State=default, Selected=TRUE"
    ) {
      // rectangle style
      treeviewJSONObject.treeview["border-width"] = {
        value: `${variant.children[0].children[0].size.x}px`,
      };
      // selected text styles
      var selectedFontID =
        variant.children[0].children[2].children[0].children[5].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          selectedFontID
        )
        .then((value) => {
          var selectedTokenName = value.nodes[
            selectedFontID
          ].document.name.toLowerCase();
          // font-size
          treeviewJSONObject.treeview["selected-font-size"] = {
            value: `{Web-typography.${selectedTokenName}.fontSize.value}`,
          };
          // line-height
          treeviewJSONObject.treeview["selected-line-height"] = {
            value: `{Web-typography.${selectedTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          treeviewJSONObject.treeview["selected-letter-spacing"] = {
            value: `{Web-typography.${selectedTokenName}.letterSpacing.value}`,
          };
          // font-weight
          treeviewJSONObject.treeview["selected-font-weight"] = {
            value: `{Web-typography.fontweight-semibold.value}`,
          };
        });
      // font color
      var selectedFontColorID =
        variant.children[0].children[2].children[0].children[5].styles.fill;
      treeviewJSONObject.treeview["selected-font-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            selectedFontColorID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                selectedFontColorID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      variant.name ===
      "Level=1, Direction=collapsed, Icon=FALSE, Selector=none, Right Side=none, State=disabled, Selected=FALSE"
    ) {
      // disabled font colour
      var disabledFontColorID =
        variant.children[0].children[2].children[0].children[5].styles.fill;
      treeviewJSONObject.treeview["disabled-font-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            disabledFontColorID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                disabledFontColorID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      variant.name ===
      "Level=1, Direction=collapsed, Icon=FALSE, Selector=none, Right Side=none, State=hover, Selected=FALSE"
    ) {
      // hover background-color
      var hoverBgID = variant.children[0].styles.fills;
      treeviewJSONObject.treeview["hover-bg-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            hoverBgID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                hoverBgID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // hover color
      var hoverFontColorID =
        variant.children[0].children[2].children[0].children[5].styles.fill;
      treeviewJSONObject.treeview["hover-font-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            hoverFontColorID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                hoverFontColorID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
  }

  //   console.log(treeviewJSONObject);
  await fs
    .writeFile(
      "../properties/components/treeview.json",
      JSON.stringify(treeviewJSONObject)
    )
    .then(function () {
      console.log("treeview.json created");
    });
}

exports.treeviewStyles = treeviewStyles;
