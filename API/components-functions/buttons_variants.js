const buttonsJSONObject = {
  button: {},
};
value.Button.children.forEach(async (child) => {
  // getting styles from base Component

  if (child.name === '.base-primary') {
    child.children.forEach(async (child) => {
      if (child.name === 'Label') {
        // font-weight
        buttonsJSONObject.button['font-weight'] = {
          value: child.style.fontWeight,
        };
        // color
        var colorNodeId = child.styles.fill;
        var colorTokenName = await coreFigmaFunctions
          .getFigmaTokenNameByID(
            coreFigmaFunctions.figmaCredentials.figmaAPIKey,
            coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
            colorNodeId
          )
          .then((value) => {
            var formattedColorTokenName = value.nodes[
              colorNodeId
            ].document.name.toLowerCase();
            return `color.${formattedColorTokenName}.value`;
          });
        buttonsJSONObject.button['color'] = {
          value: colorTokenName,
        };
      }
    });
    // $button-height
    buttonsJSONObject.button['height'] = {
      value: `${child.size.y}px`,
    };
    // $button-min-width
    buttonsJSONObject.button['min-width'] = {
      value: `${child.size.x}px`,
    };
    // $button-padding-x
    // $button-padding-y
    buttonsJSONObject.button['padding'] = {
      value: `${child.verticalPadding}px ${child.horizontalPadding}px`,
    };
    // $button-border-radius
    buttonsJSONObject.button['border-radius'] = {
      value: `${child.cornerRadius}px`,
    };
  }
  // getting styles from button variants w/o icons
  // $button-box-shadow
  // $button-secondary-border-style
  // $button-colors

  if (child.name === 'Button') {
    var statesArray = [];
    buttonsJSONObject.buttonColors = await child.children.map(
      async (variant) => {
        var namesArray = variant.name.split(',');
        var buttonType = namesArray[0].split('=')[1];
        var buttonFunction = namesArray[1].split('=')[1];
        var buttonIcon = namesArray[2].split('=')[1];
        var buttonState = namesArray[3].split('=')[1];
        // $button-colors
        if (
          variant.children[0].styles &&
          buttonType != 'disabled' &&
          buttonIcon === 'none' &&
          buttonState === 'default'
        ) {
          var tokenId = variant.children[0].styles.fills;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              tokenId
            )
            .then((token) => {
              if (!statesArray.includes(buttonFunction)) {
                statesArray.push(buttonFunction);
                console.log(statesArray);
                return (buttonsJSONObject.buttonColors[buttonFunction] = {
                  value: token.name,
                });
              }
            });
        }
      }
    );
  }
  console.log(buttonsJSONObject);
});

// $button-icon-padding: $global-spacer-small !default;
// $button-circle-icon-size: 22px !default;
// $button-secondary-border-width: $token-button-secondary-defaultborder-weight !default
// $button-box-shadow: $token-button-primary-defaulthover-shadow-g-offset
//   $token-button-primary-defaulthover-shadow-v-offset
//   $token-button-primary-defaulthover-shadow-blur
//   $token-button-primary-defaulthover-shadow-color !default;
// $button-secondary-border-style: $token-button-secondary-defaultborder-style !default;
// $button-circular-height: $token-button-circular-height !default;
// $button-circular-width: $token-button-circular-width !default;
// $button-icon-font-size: $token-button-icon-font-size !default;

// $button-font-weight: $token-button-primary-defaultfont-weight !default; - DONE
// $button-height: $token-button-primary-defaultheight !default; - DONE
// $button-padding-x: $token-button-primary-default-padding-x !default; - DONE
// $button-padding-y: $token-button-primary-default-padding-y !default; - DONE
// $button-min-width: $token-button-primary-defaultwidth !default; -DONE
// $button-border-radius: $token-button-circular-primary-defaultborder-radius !default; - DONE
// $button-inverse-text-color: $token-button-primary-defaultcolor !default; - DONE
// $button-transition: all $global-transition-duration ease-in-out !default; - DONE
