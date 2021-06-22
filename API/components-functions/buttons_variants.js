const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*
/////////////////
Button
////////////////

- button height - DONE
- button minimum width - DONE
- button padding - DONE
- button font token - DONE
- button font weight - DONE
- button icon font size - DONE
- button border radius - DONE
- space between button icon and text - DONE

- circle button icon size - DONE
- circle button size - DONE
- circle button border radius - TOKEN

- square button icon size
- square button size 

- primary button box shadow - DONE

- secondary button border width - DONE
- secondary button border style - DONE
- secondary button box shadow - DONE

- tertiary button hover background - DONE

- button transition - TOKEN

- button colors:
  - primary - DONE
  - success - DONE
  - warning - DONE
  - alert - DONE
  - info - DONE
  - secondary background color - DONE

- compact buttons:
  - height
  - padding

*/

async function buttonStyles(value) {
  const buttonsJSONObject = {
    button: {},
  };

  // need to re-format all this code to use for..of loop
  // WARNING -- this will slow it down

  // capture all Components on Button page in this array

  var buttonsArray = value.Button.children;
  // console.log(buttonsArray);

  // loop - level 1

  for (const comp of buttonsArray) {
    // compact button font styles
    if (comp.name === ".button-compact-base") {
      var children = comp.children;
      for (const child of children) {
        if (child.name === "Label") {
          // TO-DO: fetch all other styles associated with font?
          var textID = child.styles.text;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              textID
            )
            .then((value) => {
              var fontTokenName =
                value.nodes[textID].document.name.toLowerCase();
              // font-size
              buttonsJSONObject.button["compact-font-size"] = {
                value: `{Web-typography.${fontTokenName}.fontSize.value}`,
              };
              // default font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
              buttonsJSONObject.button["compact-font-weight"] = {
                value: `{Web-typography.fontweight-regular.value}`,
              };
              // line-height
              buttonsJSONObject.button["compact-line-height"] = {
                value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
              };
              // letter-spacing
              buttonsJSONObject.button["compact-letter-spacing"] = {
                value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
              };
            });
        }
      }
    }
    if (comp.name === ".base-primary") {
      // button-height
      buttonsJSONObject.button["button-height"] = {
        value: `${comp.size.y}px`,
      };
      // button padding
      buttonsJSONObject.button["padding"] = {
        value: `${comp.paddingTop}px ${comp.paddingLeft}px`,
      };
      // border radius
      buttonsJSONObject.button["border-radius"] = {
        value: `${comp.cornerRadius}px`,
      };
      // spacing between icon and text
      buttonsJSONObject.button["icon-margin"] = {
        value: `${comp.itemSpacing}px`,
      };
      // loop - level 2 - children of '.base-primary' Component
      var children = comp.children;

      for (const child of children) {
        if (child.name === "Label") {
          // TO-DO: fetch all other styles associated with font?
          var textID = child.styles.text;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              textID
            )
            .then((value) => {
              var fontTokenName =
                value.nodes[textID].document.name.toLowerCase();
              // font-size
              buttonsJSONObject.button["font-size"] = {
                value: `{Web-typography.${fontTokenName}.fontSize.value}`,
              };
              // default font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
              buttonsJSONObject.button["font-weight"] = {
                value: `{Web-typography.fontweight-regular.value}`,
              };
              // line-height
              buttonsJSONObject.button["line-height"] = {
                value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
              };
              // letter-spacing
              buttonsJSONObject.button["letter-spacing"] = {
                value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
              };
            });
          // //font-weight;
          // buttonsJSONObject.button["font-weight"] = {
          //   value: child.style.fontWeight,
          // };
          // font-color - FIRST ASYNC FUNCTION HERE
          var fontColorStyleID = child.styles.fill;
          buttonsJSONObject.button["font-color"] = {
            value: await coreFigmaFunctions
              .getFigmaTokenNameByID(
                coreFigmaFunctions.figmaCredentials.figmaAPIKey,
                coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
                fontColorStyleID
              )
              .then(
                (value) =>
                  `{color.${value.nodes[
                    fontColorStyleID
                  ].document.name.toLowerCase()}.value}`
              ),
          };
        }
        if (child.name === "icon") {
          // console.log(child);
          buttonsJSONObject.button["icon-size"] = {
            value: `${child.size.x}px`,
          };
        }
      }
    }

    // getting styles from button variants w/o icons
    // $button-box-shadow
    // $button secondary-border-style
    // $button colors
    // $button background colors

    if (comp.name === "Button") {
      // loop - level 2 - SECOND ASYNC FUNCTION HERE
      var buttonVariants = comp.children;
      for (const variant of buttonVariants) {
        // compact buttons
        if (
          variant.name ===
          "Type=secondary, Function=default-info, Icon=none, State=default, Size=small"
        ) {
          // compact button height
          buttonsJSONObject.button["compact-height"] = {
            value: `${variant.size.y}px`,
          };
          // compact button padding
          buttonsJSONObject.button["compact-padding"] = {
            value: `${variant.children[0].paddingTop}px ${variant.children[0].paddingLeft}px`,
          };
        }
        if (
          variant.name.includes("Type=primary") &&
          variant.name.includes("Icon=none, State=default, Size=default")
        ) {
          // primary buttons without icons in default state
          // code to filter out the button state according to the text in
          // the 'name' property
          var fullButtonState = variant.name.slice(
            variant.name.indexOf(",") + 1,
            variant.name.indexOf("I") - 2
          );
          var buttonState = fullButtonState.slice(
            fullButtonState.indexOf("=") + 1
          );
          // getting color ID, then token name -- ASYNC function here
          // default colors
          var colorID = variant.styles.fills;
          // console.log(colorID);
          buttonsJSONObject.button[`${buttonState}-color`] = {
            value: await coreFigmaFunctions
              .getFigmaTokenNameByID(
                coreFigmaFunctions.figmaCredentials.figmaAPIKey,
                coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
                colorID
              )
              .then(
                (value) =>
                  `{color.${value.nodes[
                    colorID
                  ].document.name.toLowerCase()}.value}`
              ),
          };
        }
        // primary buttons without icons in hover state
        if (
          variant.name.includes("Type=primary") &&
          variant.name.includes("Icon=none") &&
          variant.name.includes("State=hover")
        ) {
          var fullButtonState = variant.name.slice(
            variant.name.indexOf(",") + 1,
            variant.name.indexOf("I") - 2
          );
          var buttonState = fullButtonState.slice(
            fullButtonState.indexOf("=") + 1
          );
          // getting color ID, then token name -- ASYNC function here
          // hover colors
          // var colorID = variant.styles.fills;
          // buttonsJSONObject.button[`${buttonState}-hover-color`] = {
          //   value: await coreFigmaFunctions
          //     .getFigmaTokenNameByID(
          //       coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          //       coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          //       colorID
          //     )
          //     .then(
          //       (value) =>
          //         `{color.${value.nodes[
          //           colorID
          //         ].document.name.toLowerCase()}.value}`
          //     ),
          // };
        }
        // primary hover box shadow
        // TO-DO: fetch all other styles associated with box shadow?
        if (
          variant.name.includes("Type=primary") &&
          variant.name.includes("Icon=none") &&
          variant.name.includes("Function=default-info") &&
          variant.name.includes("State=hover")
        ) {
          // button-min-width
          buttonsJSONObject.button["min-width"] = {
            value: `${variant.size.x}px`,
          };
          // var elevationID = variant.styles.effect;
          // buttonsJSONObject.button['primary-box-shadow'] = {
          //   value: await coreFigmaFunctions
          //     .getFigmaTokenNameByID(
          //       coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          //       coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          //       elevationID
          //     )
          //     .then((value) =>
          //       value.nodes[elevationID].document.name.toLowerCase()
          //     ),
          // };
        }
        if (
          variant.name.includes("Type=primary") &&
          variant.name.includes("Icon=none, State=pressed, Size=default")
        ) {
          var fullButtonState = variant.name.slice(
            variant.name.indexOf(",") + 1,
            variant.name.indexOf("I") - 2
          );
          var buttonState = fullButtonState.slice(
            fullButtonState.indexOf("=") + 1
          );
          // getting color ID, then token name -- ASYNC function here
          // hover colors
          var colorID = variant.styles.fills;
          buttonsJSONObject.button[`${buttonState}-pressed-color`] = {
            value: await coreFigmaFunctions
              .getFigmaTokenNameByID(
                coreFigmaFunctions.figmaCredentials.figmaAPIKey,
                coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
                colorID
              )
              .then(
                (value) =>
                  `{color.${value.nodes[
                    colorID
                  ].document.name.toLowerCase()}.value}`
              ),
          };
        }
        // primary buttons without icons in disabled state
        if (
          variant.name.includes("Type=primary") &&
          variant.name.includes("Icon=none, State=disabled, Size=default")
        ) {
          var fullButtonState = variant.name.slice(
            variant.name.indexOf(",") + 1,
            variant.name.indexOf("I") - 2
          );
          var buttonState = fullButtonState.slice(
            fullButtonState.indexOf("=") + 1
          );
          // getting color ID, then token name -- ASYNC function here
          // hover colors
          var colorID = variant.styles.fills;
          buttonsJSONObject.button[`${buttonState}-disabled-color`] = {
            value: await coreFigmaFunctions
              .getFigmaTokenNameByID(
                coreFigmaFunctions.figmaCredentials.figmaAPIKey,
                coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
                colorID
              )
              .then(
                (value) =>
                  `{color.${value.nodes[
                    colorID
                  ].document.name.toLowerCase()}.value}`
              ),
          };
        }
        if (
          variant.name ==
          "Type=secondary, Function=default-info, Icon=none, State=default, Size=default"
        ) {
          // console.log(variant);
          // secondary button background color
          var colorID = variant.styles.fills;
          buttonsJSONObject.button["secondary-background-color"] = {
            value: await coreFigmaFunctions
              .getFigmaTokenNameByID(
                coreFigmaFunctions.figmaCredentials.figmaAPIKey,
                coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
                colorID
              )
              .then(
                (value) =>
                  `{color.${value.nodes[
                    colorID
                  ].document.name.toLowerCase()}.value}`
              ),
          };
          // secondary button border width
          buttonsJSONObject.button["border-width"] = {
            value: `${variant.strokeWeight}px`,
          };
          // secondary button border style
          buttonsJSONObject.button["border-style"] = {
            value: variant.strokes[0].type.toLowerCase(),
          };
        }
        // secondary hover box shadow
        // if (
        //   variant.name.includes('Type=secondary') &&
        //   variant.name.includes('Icon=none') &&
        //   variant.name.includes('Function=default-info') &&
        //   variant.name.includes('State=hover')
        // ) {
        //   var elevationID = variant.styles.effect;
        //   buttonsJSONObject.button['secondary-box-shadow'] = {
        //     value: await coreFigmaFunctions
        //       .getFigmaTokenNameByID(
        //         coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        //         coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        //         elevationID
        //       )
        //       .then((value) =>
        //         value.nodes[elevationID].document.name.toLowerCase()
        //       ),
        //   };
        // }
        // tertiary hover background color
        // if (
        //   variant.name.includes('Type=tertiary') &&
        //   variant.name.includes('Icon=none') &&
        //   variant.name.includes('Function=default-info') &&
        //   variant.name.includes('State=hover')
        // ) {
        //   var colorID = variant.styles.fills;
        //   buttonsJSONObject.button['tertiary-hover-background-color'] = {
        //     value: await coreFigmaFunctions
        //       .getFigmaTokenNameByID(
        //         coreFigmaFunctions.figmaCredentials.figmaAPIKey,
        //         coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
        //         colorID
        //       )
        //       .then(
        //         (value) =>
        //           `{color.${value.nodes[
        //             colorID
        //           ].document.name.toLowerCase()}.value}`
        //       ),
        //   };
        // }
      }
    }
    // compact circle buttons
    if (comp.name === ".base-icon-oval-compact-primary/default") {
      // compact circle button size
      buttonsJSONObject.button["compact-circle-button-size"] = {
        value: `${comp.size.x}px`,
      };
      // compact circle button icon size
      buttonsJSONObject.button["compact-circle-icon-size"] = {
        value: `${comp.children[0].size.x}px`,
      };
    }
    // compact square buttons
    if (comp.name === ".base-icon-square-compact-primary/default") {
      // compact square button size
      buttonsJSONObject.button["compact-square-button-size"] = {
        value: `${comp.size.x}px`,
      };
      // compact square button icon size
      buttonsJSONObject.button["compact-square-icon-size"] = {
        value: `${comp.children[0].size.x}px`,
      };
    }
    // circle buttons
    if (comp.name === ".base-icon-oval-primary/default") {
      // console.log(comp);
      // circle button size
      buttonsJSONObject.button["circle-button-size"] = {
        value: `${comp.size.x}px`,
      };
      // circle button icon size
      buttonsJSONObject.button["circle-icon-size"] = {
        value: `${comp.children[0].size.x}px`,
      };
    }
    // square buttons
    if (comp.name === ".base-icon-square-primary/default") {
      // console.log(comp);
      // square button style
      buttonsJSONObject.button["square-button-size"] = {
        value: `${comp.size.x}px`,
      };
      // circle button icon size
      buttonsJSONObject.button["square-icon-size"] = {
        value: `${comp.children[0].size.x}px`,
      };
    }
  }
  console.log(buttonsJSONObject);
  await fs
    .writeFile(
      "../properties/components/button.json",
      JSON.stringify(buttonsJSONObject)
    )
    .then(function () {
      console.log("button.json created");
    });
}

exports.buttonStyles = buttonStyles;
