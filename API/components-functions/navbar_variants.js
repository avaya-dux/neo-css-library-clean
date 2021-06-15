const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

////////
Navbar
////////

- navbar-action

  - icon size
  - spacing
  - default/hover/active color
  - border styles
  - badge styles?

- navbar-agent

  - colors
  - size
  - spacing
  - font styles
      - token missing on status text?
  - avatar styles

- navbar-tab - use tabs
  - font
  - spacing

- navbar-container
  - max height

*/

async function navbarStyles(value) {
  navbarJSONObject = {
    navbar: {},
  };

  for (component of value.Navigation.children) {
    if (component.name === "navbar/action") {
      // console.log(component);
      for (variant of component.children) {
        if (variant.name === "Icon=custom, Active=FALSE, State=default") {
          // action default color
          var actionDefaultColorID =
            variant.children[0].children[0].children[0].styles.fill;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              actionDefaultColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["action-default-color"] = {
                  value: `{color.${value.nodes[
                    actionDefaultColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
          // action size
          navbarJSONObject.navbar["action-size"] = {
            value: `${variant.children[0].size.x}px`,
          };
          // action icon font size
          navbarJSONObject.navbar["action-icon-font-size"] = {
            value: `${variant.children[0].children[0].size.x}px`,
          };
        }
        if (variant.name === "Icon=custom, Active=FALSE, State=hover") {
          // action hover colour
          var actionHoverColorID =
            variant.children[0].children[0].children[0].styles.fill;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              actionHoverColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["action-hover-color"] = {
                  value: `{color.${value.nodes[
                    actionHoverColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
          // action hover background color
          var actionHoverBackgroundColorID = variant.children[0].styles.fills;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              actionHoverBackgroundColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["action-hover-background-color"] = {
                  value: `{color.${value.nodes[
                    actionHoverBackgroundColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
        }
        if (variant.name === "Icon=custom, Active=TRUE, State=default") {
          // console.log(variant.children[0].children[1]);
          // border styles
          // border width
          navbarJSONObject.navbar["action-border-width"] = {
            value: `${variant.children[0].children[1].absoluteBoundingBox.height}px`,
          };
          // border style
          navbarJSONObject.navbar["action-border-style"] = {
            value: variant.children[0].children[1].fills[0].type.toLowerCase(),
          };
          // active colour
          var actionActiveColorID =
            variant.children[0].children[0].children[0].styles.fill;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              actionActiveColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["action-active-color"] = {
                  value: `{color.${value.nodes[
                    actionActiveColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
        }
        if (variant.name === "Icon=custom, Active=FALSE, State=disabled") {
          // action disabled colour
          var actionDisabledColorID =
            variant.children[0].children[0].children[0].styles.fill;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              actionDisabledColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["action-disabled-color"] = {
                  value: `{color.${value.nodes[
                    actionDisabledColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
        }
        if (variant.name === "Icon=custom, Active=TRUE, State=disabled") {
          // action active disabled colour
          var actionActiveDisabledColorID =
            variant.children[0].children[0].children[0].styles.fill;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              actionActiveDisabledColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["action-active-disabled-color"] = {
                  value: `{color.${value.nodes[
                    actionActiveDisabledColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
        }
      }
    }
    if (component.name === "navbar/agent-card") {
      for (variant of component.children) {
        if (variant.name === "State=ready") {
          // avatar border style
          // border width
          navbarJSONObject.navbar["avatar-border-width"] = {
            value: `${variant.children[0].children[0].children[1].children[0].children[0].strokeWeight}px`,
          };
          // border style
          navbarJSONObject.navbar["avatar-border-style"] = {
            value:
              variant.children[0].children[0].children[1].children[0].children[0].strokes[0].type.toLowerCase(),
          };
          // border-color
          var borderColorTokenID =
            variant.children[0].children[0].children[1].children[0].children[0]
              .styles.strokes;
          navbarJSONObject.navbar["avatar-border-color"] = {
            value: await coreFigmaFunctions
              .getFigmaTokenNameByID(
                coreFigmaFunctions.figmaCredentials.figmaAPIKey,
                coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
                borderColorTokenID
              )
              .then(
                (value) =>
                  `{color.${value.nodes[
                    borderColorTokenID
                  ].document.name.toLowerCase()}.value}`
              ),
          };
          // agent card padding
          navbarJSONObject.navbar["agent-card-padding-y"] = {
            value: `${variant.children[0].children[0].relativeTransform[1][2]}px`,
          };
          navbarJSONObject.navbar["agent-card-padding-x"] = {
            value: `${variant.children[0].children[0].relativeTransform[0][2]}px`,
          };
          // agent card left side margin
          navbarJSONObject.navbar["agent-card-left-margin-left"] = {
            value: `${variant.children[0].children[0].itemSpacing}px`,
          };
          // agent card left side text margin
          navbarJSONObject.navbar["agent-card-left-text-margin"] = {
            value: `${variant.children[0].children[0].children[0].itemSpacing}px`,
          };
          // font styles
          // agent card name font colour
          // console.log(variant.children[0].children[0].children[0].children[0]);
          var agentCardNameFontColorID =
            variant.children[0].children[0].children[0].children[0].styles.fill;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              agentCardNameFontColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["agent-card-name-font-color"] = {
                  value: `{color.${value.nodes[
                    agentCardNameFontColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
          // agent card name font styles
          var agentCardNameFontTokenID =
            variant.children[0].children[0].children[0].children[0].styles.text;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              agentCardNameFontTokenID
            )
            .then((value) => {
              var agentCardNameFontTokenName =
                value.nodes[
                  agentCardNameFontTokenID
                ].document.name.toLowerCase();
              // font-size
              navbarJSONObject.navbar["agent-card-name-font-size"] = {
                value: `{Web-typography.${agentCardNameFontTokenName}.fontSize.value}`,
              };
              // ine-height
              navbarJSONObject.navbar["agent-card-name-line-height"] = {
                value: `{Web-typography.${agentCardNameFontTokenName}.lineHeight.value}`,
              };
              // letter-spacing
              navbarJSONObject.navbar["agent-card-name-letter-spacing"] = {
                value: `{Web-typography.${agentCardNameFontTokenName}.letterSpacing.value}`,
              };
              // font-weight
              navbarJSONObject.navbar["agent-card-name-font-weight"] = {
                value: `{Web-typography.fontweight-regular.value}`,
              };
            });
          // agent card status font styles
          // console.log(
          //   variant.children[0].children[0].children[0].children[1].children[0]
          // );
          var agentCardStatusFontTokenID =
            variant.children[0].children[0].children[0].children[1].children[0]
              .styles.text;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              agentCardStatusFontTokenID
            )
            .then((value) => {
              var agentCardStatusFontTokenName =
                value.nodes[
                  agentCardStatusFontTokenID
                ].document.name.toLowerCase();
              // font-size
              navbarJSONObject.navbar["agent-card-status-font-size"] = {
                value: `{Web-typography.${agentCardStatusFontTokenName}.fontSize.value}`,
              };
              // ine-height
              navbarJSONObject.navbar["agent-card-status-line-height"] = {
                value: `{Web-typography.${agentCardStatusFontTokenName}.lineHeight.value}`,
              };
              // letter-spacing
              navbarJSONObject.navbar["agent-card-status-letter-spacing"] = {
                value: `{Web-typography.${agentCardStatusFontTokenName}.letterSpacing.value}`,
              };
              // font-weight
              navbarJSONObject.navbar["agent-card-status-font-weight"] = {
                value: `{Web-typography.fontweight-regular.value}`,
              };
            });
          // agent card status font colour
          var agentCardStatusFontColorID =
            variant.children[0].children[0].children[0].children[1].children[0]
              .styles.fill;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              agentCardStatusFontColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["agent-card-name-font-color"] = {
                  value: `{color.${value.nodes[
                    agentCardStatusFontColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
          // ready card status color
          var readyCardStatusColorID =
            variant.children[0].children[0].children[0].children[1].styles
              .fills;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              readyCardStatusColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["ready-card-status-color"] = {
                  value: `{color.${value.nodes[
                    readyCardStatusColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
          // ready card background colour
          var readyCardBackgroundColorID = variant.children[0].styles.fills;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              readyCardBackgroundColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["ready-card-background-color"] = {
                  value: `{color.${value.nodes[
                    readyCardBackgroundColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
        }
        if (variant.name === "State=not-ready") {
          // not ready card status colour
          var notReadyCardStatusColorID =
            variant.children[0].children[0].children[0].children[1].styles
              .fills;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              notReadyCardStatusColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["not-ready-card-status-color"] = {
                  value: `{color.${value.nodes[
                    notReadyCardStatusColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
          // not ready card background colour
          var notReadyCardBackgroundColorID = variant.children[0].styles.fills;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              notReadyCardBackgroundColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["not-ready-card-background-color"] = {
                  value: `{color.${value.nodes[
                    notReadyCardBackgroundColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
        }
        if (variant.name === "State=connected") {
          // connected card status colour
          var connectedCardStatusColorID =
            variant.children[0].children[0].children[0].children[1].styles
              .fills;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              connectedCardStatusColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["connected-card-status-color"] = {
                  value: `{color.${value.nodes[
                    connectedCardStatusColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
          // connected card background colour
          var connectedCardBackgroundColorID = variant.children[0].styles.fills;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              connectedCardBackgroundColorID
            )
            .then(
              (value) =>
                (navbarJSONObject.navbar["connected-card-background-color"] = {
                  value: `{color.${value.nodes[
                    connectedCardBackgroundColorID
                  ].document.name.toLowerCase()}.value}`,
                })
            );
        }
      }
    }
    if (component.name === "navbar/tab") {
      // console.log(component.children[0].children[0]);
      // navbar tab padding
      navbarJSONObject.navbar["navbar-tab-padding-y"] = {
        value: `${component.children[0].children[0].paddingTop}px`,
      };
      navbarJSONObject.navbar["navbar-tab-padding-x"] = {
        value: `${component.children[0].children[0].paddingLeft}px`,
      };
      // navbar tab font size
      var navbarTabFontTokenID =
        component.children[0].children[0].children[0].children[0].children[0]
          .styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          navbarTabFontTokenID
        )
        .then((value) => {
          var navbarTabFontTokenName =
            value.nodes[navbarTabFontTokenID].document.name.toLowerCase();
          // font-size
          navbarJSONObject.navbar["navbar-tab-font-size"] = {
            value: `{Web-typography.${navbarTabFontTokenName}.fontSize.value}`,
          };
        });
    }
    if (component.name === ".navbar-container-base") {
      console.log(component.children[1]);
      // navbar max height
      navbarJSONObject.navbar["max-height"] = {
        value: `${component.size.y}px`,
      };
      // console.log(component.children[0]);
      // // navbar bottom border style
      // border width
      navbarJSONObject.navbar["bottom-border-width"] = {
        value: `${component.children[1].strokeWeight}px`,
      };
      // border style
      navbarJSONObject.navbar["bottom-border-style"] = {
        value: component.children[1].strokes[0].type.toLowerCase(),
      };
      // border-color
      var navbarBorderColorTokenID = component.children[1].styles.stroke;
      navbarJSONObject.navbar["bottom-border-color"] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            navbarBorderColorTokenID
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                navbarBorderColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
  }

  // console.log(navbarJSONObject);
  await fs
    .writeFile(
      "../properties/components/navbar.json",
      JSON.stringify(navbarJSONObject)
    )
    .then(function () {
      console.log("navbar.json created");
    });
}

exports.navbarStyles = navbarStyles;
