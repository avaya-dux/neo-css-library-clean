/* styles to pull for buttons:

Primary buttons:
- height
- width
- padding
- background color
- text color
- hover background color
- disabled background color
- disabled text color

Secondary buttons:
- height
- width
- padding
- background color
- text color
- text styles - (fontSize, fontWeight, lineHeight)
- hover background color
- border width
- border style
- border color
- disabled background color
- disabled text color

Tertiary buttons:
- height
- width
- padding
- background color
- text color
- hover background color
- border width
- border style
- border color
- disabled background color
- disabled text color

*/

async function getButtonStyles(components) {
  //  building function for button components

  var buttonComponents = [];

  const buttonsJSONObject = {
    button: {},
  };

  //  iterate through children of top-level "button" property
  // remove screenshots, notes and base components from components list

  components.Button.children.forEach((component) => {
    if (component.type === 'COMPONENT' && !component.name.includes('base')) {
      buttonComponents.push(component);
    }

    if (component.name === 'circular/primary/default') {
      buttonsJSONObject.button['circular-width'] = {
        value: `${component.absoluteBoundingBox.width}px`,
      };
      buttonsJSONObject.button['circular-height'] = {
        value: `${component.absoluteBoundingBox.width}px`,
      };
      buttonsJSONObject.button['icon-font-size'] = {
        value: `{Web-typography.web/body - regular.fontSize.value}`,
      };
    }
  });

  // temporarily skip 'action' buttons

  buttonComponents = _.filter(buttonComponents, function (c) {
    return !c.name.includes('action');
  });

  // remove non-visible child elements from each component

  buttonComponents.forEach((component) => {
    component.children = _.filter(component.children, function (c) {
      return c.visible != false;
    });
  });

  // code to filter through and get styles from both types of buttons

  filteredComponents = buttonComponents.forEach((component) => {
    // buttons with 'default' in the name have two levels of nesting

    if (
      component.name.includes('default') &&
      !component.name.includes('hover')
    ) {
      // top level - name, width/height

      var componentName = component.name
        .toLowerCase()
        .replace(/\//g, '-')
        .replace(/\s/g, '-');

      buttonsJSONObject.button[componentName + 'width'] = {
        value: `${component.absoluteBoundingBox.width}px`,
      };

      buttonsJSONObject.button[componentName + 'height'] = {
        value: `${component.absoluteBoundingBox.height}px`,
      };

      // one level deep - flexbox styles, padding, border styles

      if (component.children[0].layoutMode === 'HORIZONTAL') {
        buttonsJSONObject.button[componentName + 'display'] = {
          value: 'flex',
        };

        buttonsJSONObject.button[componentName + 'flex-direction'] = {
          value: 'row',
        };

        buttonsJSONObject.button[componentName + 'justifyContent'] = {
          value: 'center',
        };
      }

      if (component.children[0].strokes.length > 0) {
        buttonsJSONObject.button[componentName + 'borderWeight'] = {
          value: `${component.strokeWeight}px`,
        };
        buttonsJSONObject.button[componentName + 'borderStyle'] = {
          value: `${component.children[0].strokes[0].type.toLowerCase()}`,
        };
      }

      buttonsJSONObject.button[componentName + 'padding-x'] = {
        value: `${component.children[0].horizontalPadding}px`,
      };

      buttonsJSONObject.button[componentName + 'padding-y'] = {
        value: `${component.children[0].verticalPadding}px`,
      };

      // two levels deep - text styles

      component.children[0].children.forEach((child) => {
        if (child.type === 'TEXT') {
          buttonsJSONObject.button[componentName + 'fontWeight'] = {
            value: `${child.style.fontWeight}`,
          };

          buttonsJSONObject.button[componentName + 'fontSize'] = {
            value: `${child.style.fontSize}px`,
          };

          buttonsJSONObject.button[componentName + 'letterSpacing'] = {
            value: `${child.style.letterSpacing}px`,
          };

          buttonsJSONObject.button[componentName + 'lineHeight'] = {
            value: `${child.style.lineHeightPx}px`,
          };
        }
      });

      // tokenizations independent of Figma component levels

      if (componentName.includes('circular')) {
        buttonsJSONObject.button[componentName + 'borderRadius'] = {
          value: '{borderRadius.100%.value}',
        };
      }

      // colours

      if (componentName.includes('disabled')) {
        buttonsJSONObject.button[componentName + 'color'] = {
          value: '{color.base/100.value}',
        };
        buttonsJSONObject.button[componentName + 'bgColor'] = {
          value: '{color.base/400.value}',
        };
        buttonsJSONObject.button[componentName + 'colorOnHover'] = {
          value: '{color.base/400.value}',
        };
        buttonsJSONObject.button[componentName + 'bgColorOnHover'] = {
          value: '{color.base/100.value}',
        };
      }

      if (componentName.includes('primary')) {
        buttonsJSONObject.button[componentName + 'color'] = {
          value: '{color.base/100.value}',
        };
        buttonsJSONObject.button[componentName + 'warningBgColor'] = {
          value: '{color.functional - orange/500.value}',
        };
        buttonsJSONObject.button[componentName + 'warningBgColorOnHover'] = {
          value: '{color.functional - orange/600.value}',
        };
        buttonsJSONObject.button[componentName + 'successBgColor'] = {
          value: '{color.functional - green/500.value}',
        };
        buttonsJSONObject.button[componentName + 'successBgColorOnHover'] = {
          value: '{color.functional - green/600.value}',
        };
        buttonsJSONObject.button[componentName + 'infoBgColor'] = {
          value: '{color.functional - blue/500.value}',
        };
        buttonsJSONObject.button[componentName + 'infoBgColorOnHover'] = {
          value: '{color.functional - blue/600.value}',
        };
        buttonsJSONObject.button[componentName + 'alertBgColor'] = {
          value: '{color.functional - red/500.value}',
        };
        buttonsJSONObject.button[componentName + 'alertBgColorOnHover'] = {
          value: '{color.functional - red/600.value}',
        };
      }

      if (
        componentName.includes('secondary') ||
        componentName.includes('tertiary')
      ) {
        buttonsJSONObject.button[componentName + 'warningColor'] = {
          value: '{color.functional - orange/500.value}',
        };
        buttonsJSONObject.button[componentName + 'warningColorOnHover'] = {
          value: '{color.functional - orange/600.value}',
        };
        buttonsJSONObject.button[componentName + 'successColor'] = {
          value: '{color.functional - green/500.value}',
        };
        buttonsJSONObject.button[componentName + 'successColorOnHover'] = {
          value: '{color.functional - green/600.value}',
        };
        buttonsJSONObject.button[componentName + 'infoColor'] = {
          value: '{color.functional - blue/500.value}',
        };
        buttonsJSONObject.button[componentName + 'infoColorOnHover'] = {
          value: '{color.functional - blue/600.value}',
        };
        buttonsJSONObject.button[componentName + 'alertColor'] = {
          value: '{color.functional - red/500.value}',
        };
        buttonsJSONObject.button[componentName + 'alertColorOnHover'] = {
          value: '{color.functional - red/600.value}',
        };
      }

      // hover state box shadows

      if (
        componentName == 'primary-default' ||
        componentName == 'secondary-default'
      ) {
        buttonsJSONObject.button[componentName + 'hoverShadowGOffset'] = {
          value: '0px ',
        };
        buttonsJSONObject.button[componentName + 'hoverShadowVOffset'] = {
          value: '4px',
        };
        buttonsJSONObject.button[componentName + 'hoverShadowBlur'] = {
          value: '8px',
        };
        buttonsJSONObject.button[componentName + 'hoverShadowColor'] = {
          value: 'rgba(0, 0, 0, 0.25)',
        };
      }
    }
  });

  // writing to button.json

  await fs
    .writeFile(
      './properties/components/button.json',
      JSON.stringify(buttonsJSONObject)
    )
    .then(function () {
      console.log('button.json created');
    });
}
// #endregion
