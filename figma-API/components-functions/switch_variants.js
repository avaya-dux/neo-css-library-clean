const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/* 
  
Switch:

$switch-inactive-color: $token-switch-off-background-color !default; - DONE
$switch-active-color: $token-switch-on-background-color !default; - DONE
$switch-height: 20px !default; - DONE
$switch-width: $switch-height * 2 !default; - DONE
$switch-knob-indent: 2px !default; - DONE
$switch-knob-size: $switch-height - $switch-knob-indent * 2 !default; - DONE
$switch-translate-distance: $switch-width/2 !default; - DONE
$switch-outline: 0 !default; - DELETE?
$switch-border-radius: $switch-height / 2 !default; - DONE
$switch-transition: all 0.25s ease-in-out !default; - MANUAL TOKEN LINK
$switch-disabled-opacity: $global-opacity !default; - REPLACE WITH SPECIFIC COLORS - DONE
$switch-ellipse-color - DONE
$switch-box-shadow - DONE
$switch-disabled-text-color - DONE
$switch-label-height: - DONE

*/

const switchStyles = (value) => {
  switchJSONObject = {
    switch: {},
  };
  value.Form.children.forEach(async (child) => {
    if (child.name === 'switch') {
      var children = child.children;
      //$label-height
      var labeledSwitch = children.find(
        (child) => child.name === 'Label=ON, Selected=ON, State=default'
      );
      switchJSONObject.switch['label-height'] = {
        value: `${labeledSwitch.size.y}px`,
      };
      // $height
      switchJSONObject.switch['height'] = {
        value: `${children[0].size.y}px`,
      };
      // $width
      switchJSONObject.switch['width'] = {
        value: `${children[0].size.x}px`,
      };
      // $ellipse-color
      switchJSONObject.switch['ellipse-color'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            children[0].children[1].styles.fill
          )
          .then(
            (value) =>
              `{color.${value.nodes[
                children[0].children[1].styles.fill
              ].document.name.toLowerCase()}.value}`
          ),
      };
      // $ellipse-box-shadow
      switchJSONObject.switch['ellipse-box-shadow'] = {
        value: await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            children[0].children[1].styles.effect
          )
          .then(
            (value) =>
              `$token-shadows-${value.nodes[
                children[0].children[1].styles.effect
              ].document.name.toLowerCase()}-x-offset $token-shadows-${value.nodes[
                children[0].children[1].styles.effect
              ].document.name.toLowerCase()}-y-offset $token-shadows-${value.nodes[
                children[0].children[1].styles.effect
              ].document.name.toLowerCase()}-radius $token-shadows-${value.nodes[
                children[0].children[1].styles.effect
              ].document.name.toLowerCase()}-color`
          ),
      };
      // $knob-indent-top
      switchJSONObject.switch['knob-indent-top'] = {
        value: `${children[0].children[1].relativeTransform[1][2]}px`,
      };
      //$knob-indent-left
      switchJSONObject.switch['knob-indent-left'] = {
        value: `${children[0].children[1].relativeTransform[0][2]}px`,
      };
      //$knob-size
      switchJSONObject.switch['knob-size'] = {
        value: `${children[0].children[1].size.x}px`,
      };
      //$border-radius
      switchJSONObject.switch['border-radius'] = {
        value: `${children[0].children[0].cornerRadius}px`,
      };

      for (const child of children) {
        var namesArray = child.name.split(',');
        var switchLabel = namesArray[0].split('=')[1];
        var switchState = namesArray[1].split('=')[1];
        var switchAccess = namesArray[2].split('=')[1];
        if (
          switchLabel === 'OFF' &&
          switchState === 'ON' &&
          switchAccess === 'default'
        ) {
          // $on-color:
          var rect = child.children.find((child) => child.type === 'RECTANGLE');
          var fillId = rect.styles.fill;
          var fillName = await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              fillId
            )
            .then((value) => {
              return value.nodes[fillId].document.name;
            });
          switchJSONObject.switch['on-background-color'] = {
            value: `{color.${fillName.toLowerCase()}.value}`,
          };
        }
        if (
          switchLabel === 'OFF' &&
          switchState === 'OFF' &&
          switchAccess === 'default'
        ) {
          // $off-color:
          var rect = child.children.find((child) => child.type === 'RECTANGLE');
          var fillId = rect.styles.fill;
          var fillName = await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              fillId
            )
            .then((value) => {
              return value.nodes[fillId].document.name;
            });
          switchJSONObject.switch['off-background-color'] = {
            value: `{color.${fillName.toLowerCase()}.value}`,
          };
        }
        if (
          switchLabel === 'OFF' &&
          switchState === 'OFF' &&
          switchAccess === 'disabled'
        ) {
          // $disabled-off-color:
          var fillId = child.children[0].children[0].styles.fill;
          var fillName = await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              fillId
            )
            .then((value) => {
              return value.nodes[fillId].document.name;
            });
          switchJSONObject.switch['disabled-off-background-color'] = {
            value: `{color.${fillName.toLowerCase()}.value}`,
          };
        }
        if (
          switchLabel === 'OFF' &&
          switchState === 'ON' &&
          switchAccess === 'disabled'
        ) {
          // $disabled-on-color:
          var fillId = child.children[0].children[0].styles.fill;
          var fillName = await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              fillId
            )
            .then((value) => {
              return value.nodes[fillId].document.name;
            });
          switchJSONObject.switch['disabled-on-background-color'] = {
            value: `{color.${fillName.toLowerCase()}.value}`,
          };
        }
      }
      await fs
        .writeFile(
          '../properties/components/switch.json',
          JSON.stringify(switchJSONObject)
        )
        .then(function () {
          console.log('switch.json created');
        });
    }
  });
};

exports.switchStyles = switchStyles;
