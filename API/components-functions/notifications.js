const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*
  
  ////////
  Notifications:
  ///////

- width - DONE
- height - DONE
- padding - DONE
- background color - DONE
- icon-color - DONE
- border radius - DONE
- font styles
    - header - DONE
    - description - DONE
    - counter - DONE
- margin bottom - DONE
- btn-offset - test
- icon-offset - test
- icon font sizes - DONE
- icon styles - ADD ICONS TO ICON FILE READER
- box-shadow - DONE

notification layout

//-icon //-text        //-right

- use neo-close btn?

*/

async function notificationStyles(value) {
  notificationJSONObject = {
    notification: {},
  };
  var notificationVariants = value.Indicator.children.filter(
    (child) => child.name === 'notification'
  )[0].children;
  //   console.log(notificationVariants);
  for (const variant of notificationVariants) {
    if (
      variant.name ===
      'Function=alert, Lines of Text=2, Right Side=buttons, Elevation=FALSE'
    ) {
      notificationJSONObject.notification['option-spacing'] = {
        value: `${variant.children[0].children[1].itemSpacing}px`,
      };
      // console.log(variant.children[0].children[1]);
    }
    if (
      variant.name ===
      'Function=alert, Lines of Text=2, Right Side=close, Elevation=FALSE'
    ) {
      // console.log(variant);
      // console.log(variant.children[0]);
      console.log(variant.children[0].children[0]);
      // text-spacing-y
      notificationJSONObject.notification['text-spacing-y'] = {
        value: `${variant.children[0].children[0].children[1].itemSpacing}px`,
      };
      // icon offset
      notificationJSONObject.notification['icon-offset'] = {
        value: `${variant.children[0].children[0].itemSpacing}px`,
      };
      // close-icon-size
      notificationJSONObject.notification['close-icon-size'] = {
        value: `${variant.children[0].children[1].size.x}px`,
      };
      // margin-bottom
      notificationJSONObject.notification['margin-bottom'] = {
        value: `${variant.relativeTransform[0][2]}px`,
      };
      // min-width
      notificationJSONObject.notification['min-width'] = {
        value: `${variant.size.x}px`,
      };
      //padding-x
      notificationJSONObject.notification['padding-x'] = {
        value: `${variant.children[0].paddingLeft}px`,
      };
      //padding-y
      notificationJSONObject.notification['padding-y'] = {
        value: `${variant.children[0].paddingTop}px`,
      };
      // border-radius
      notificationJSONObject.notification['border-radius'] = {
        value: `${variant.children[0].cornerRadius}px`,
      };
      // notification font color
      var notificationFontColorTokenID =
        variant.children[0].children[0].children[1].children[0].styles.fill;
      notificationJSONObject.notification['font-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            notificationFontColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                notificationFontColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // header font styles
      var headerFontTokenID =
        variant.children[0].children[0].children[1].children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          headerFontTokenID
        )
        .then((value) => {
          //   console.log(
          //     value.nodes[headerFontTokenID].document.name.toLowerCase()
          //   );
          var headerFontTokenName = value.nodes[
            headerFontTokenID
          ].document.name.toLowerCase();
          // header-font-size
          notificationJSONObject.notification['header-font-size'] = {
            value: `{Web-typography.${headerFontTokenName}.fontSize.value}`,
          };
          // header-line-height
          notificationJSONObject.notification['header-line-height'] = {
            value: `{Web-typography.${headerFontTokenName}.lineHeight.value}`,
          };
          // header-letter-spacing
          notificationJSONObject.notification['header-letter-spacing'] = {
            value: `{Web-typography.${headerFontTokenName}.letterSpacing.value}`,
          };
          // header-font-weight
          notificationJSONObject.notification['header-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // description font styles
      var descriptionFontTokenID =
        variant.children[0].children[0].children[1].children[1].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          descriptionFontTokenID
        )
        .then((value) => {
          //   console.log(
          //     value.nodes[headerFontTokenID].document.name.toLowerCase()
          //   );
          var descriptionFontTokenName = value.nodes[
            descriptionFontTokenID
          ].document.name.toLowerCase();
          // description-font-size
          notificationJSONObject.notification['description-font-size'] = {
            value: `{Web-typography.${descriptionFontTokenName}.fontSize.value}`,
          };
          // description-line-height
          notificationJSONObject.notification['description-line-height'] = {
            value: `{Web-typography.${descriptionFontTokenName}.lineHeight.value}`,
          };
          // description-letter-spacing
          notificationJSONObject.notification['description-letter-spacing'] = {
            value: `{Web-typography.${descriptionFontTokenName}.letterSpacing.value}`,
          };
          // description-font-weight
          notificationJSONObject.notification['description-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // alert background color
      var alertNotificationColorTokenID = variant.children[0].styles.fills;
      notificationJSONObject.notification['alert-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            alertNotificationColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                alertNotificationColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // alert icon color
      var alertNotificationIconColorTokenID =
        variant.children[0].children[0].children[0].children[0].styles.fill;
      notificationJSONObject.notification['alert-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            alertNotificationIconColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                alertNotificationIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // large icon size
      notificationJSONObject.notification['large-icon-size'] = {
        value: `${variant.children[0].children[0].children[0].size.x}px`,
      };
    }
    if (
      variant.name ===
      'Function=success, Lines of Text=2, Right Side=close, Elevation=FALSE'
    ) {
      // success background color
      var successNotificationColorTokenID = variant.children[0].styles.fills;
      notificationJSONObject.notification['success-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            successNotificationColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                successNotificationColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // success icon color
      var successNotificationIconColorTokenID =
        variant.children[0].children[0].children[0].children[0].styles.fill;
      notificationJSONObject.notification['success-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            successNotificationIconColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                successNotificationIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      variant.name ===
      'Function=warning, Lines of Text=2, Right Side=close, Elevation=FALSE'
    ) {
      // warning background color
      var warningNotificationColorTokenID = variant.children[0].styles.fills;
      notificationJSONObject.notification['warning-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            warningNotificationColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                warningNotificationColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // warning icon color
      var warningNotificationIconColorTokenID =
        variant.children[0].children[0].children[0].children[0].styles.fill;
      notificationJSONObject.notification['warning-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            warningNotificationIconColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                warningNotificationIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // info color
    if (
      variant.name ===
      'Function=info, Lines of Text=2, Right Side=close, Elevation=FALSE'
    ) {
      // info background color
      var infoNotificationColorTokenID = variant.children[0].styles.fills;
      notificationJSONObject.notification['info-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            infoNotificationColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                infoNotificationColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // info icon color
      var infoNotificationIconColorTokenID =
        variant.children[0].children[0].children[0].children[0].styles.fill;
      notificationJSONObject.notification['info-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            infoNotificationIconColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                infoNotificationIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    // event color
    if (
      variant.name ===
      'Function=event, Lines of Text=2, Right Side=close, Elevation=FALSE'
    ) {
      // event background color
      var eventNotificationColorTokenID = variant.children[0].styles.fills;
      notificationJSONObject.notification['event-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            eventNotificationColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                eventNotificationColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // event icon color
      var eventNotificationIconColorTokenID =
        variant.children[0].children[0].children[0].children[0].styles.fill;
      notificationJSONObject.notification['event-icon-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            eventNotificationIconColorTokenID
          )
          .then(
            (value) =>
              //   console.log(
              //     value.nodes[headerFontTokenID].document.name.toLowerCase()
              //   );
              `{color.${value.nodes[
                eventNotificationIconColorTokenID
              ].document.name.toLowerCase()}.value}`
          ),
      };
    }
    if (
      variant.name ===
      'Function=alert, Lines of Text=1, Right Side=timer, Elevation=FALSE'
    ) {
      // // smaller icon size
      // notificationJSONObject.notification['small-icon-color'] = {
      //   value: `${variant.children[0].children[0].children[0].size.x}px`,
      // };
      // counter font styles
      var counterFontTokenID =
        variant.children[0].children[1].children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          counterFontTokenID
        )
        .then((value) => {
          //   console.log(
          //     value.nodes[headerFontTokenID].document.name.toLowerCase()
          //   );
          var counterFontTokenName = value.nodes[
            counterFontTokenID
          ].document.name.toLowerCase();
          // description-font-size
          notificationJSONObject.notification['counter-font-size'] = {
            value: `{Web-typography.${counterFontTokenName}.fontSize.value}`,
          };
          // description-line-height
          notificationJSONObject.notification['counter-line-height'] = {
            value: `{Web-typography.${counterFontTokenName}.lineHeight.value}`,
          };
          // description-letter-spacing
          notificationJSONObject.notification['counter-letter-spacing'] = {
            value: `{Web-typography.${counterFontTokenName}.letterSpacing.value}`,
          };
          // description-font-weight
          notificationJSONObject.notification['counter-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
    }
    if (
      variant.name ===
      'Function=alert, Lines of Text=1, Right Side=close, Elevation=TRUE'
    ) {
      // min-height
      notificationJSONObject.notification['min-height'] = {
        value: `${variant.size.y}px`,
      };
      // box-shadow styles
      // console.log(variant.children[0]);
      var elevationTokenID = variant.children[0].styles.effect;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          elevationTokenID
        )
        .then((value) => {
          //   console.log(
          //     value.nodes[headerFontTokenID].document.name.toLowerCase()
          //   );
          var elevationTokenName = value.nodes[elevationTokenID].document.name
            .toLowerCase()
            .replace('-', '');
          // elevation-x-offset
          notificationJSONObject.notification['elevation-x-offset'] = {
            value: `{shadows.${elevationTokenName}.xOffset.value}`,
          };
          // elevation-y-offset
          notificationJSONObject.notification['elevation-y-offset'] = {
            value: `{shadows.${elevationTokenName}.yOffset.value}`,
          };
          // elevation-radius
          notificationJSONObject.notification['elevation-radius'] = {
            value: `{shadows.${elevationTokenName}.radius.value}`,
          };
          // elevation-color
          notificationJSONObject.notification['elevation-color'] = {
            value: `{shadows.${elevationTokenName}.color.value}`,
          };
        });
    }
  }

  // console.log(notificationJSONObject);
  await fs
    .writeFile(
      '../properties/components/notification.json',
      JSON.stringify(notificationJSONObject)
    )
    .then(function () {
      console.log('notification.json created');
    })
    .catch((err) => {
      console.log(`Error creating notification.json: ${err}`);
    });
}

exports.notificationStyles = notificationStyles;
