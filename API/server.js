const fs = require('fs').promises;
const fetch = require('node-fetch');
const _ = require('lodash');

const coreFigmaFunctions = require('./figma-functions/core-figma-functions.js');

// #region utilityFunctions

const rgbToHex = (r, g, b) =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);

// #endregion

// Functions to build classes from Core Components

// #region getCoreComponentInfo

// function to get Component nodeids

async function getCoreComponentInfo(figmaApiKey, figmaId) {
  let result = await fetch(
    'https://api.figma.com/v1/files/' + figmaId + '/components',
    {
      method: 'GET',
      headers: {
        'X-Figma-Token': figmaApiKey,
      },
    }
  );
  let figmaFileComponents = await result.json();

  const nodeIds = [];

  figmaFileComponents.meta.components.forEach((component) => {
    nodeIds.push(component.node_id);
  });
}

// #endregion

// #region getButtonStyles

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

      if (component.strokes.length > 0) {
        buttonsJSONObject.button[componentName + 'borderWeight'] = {
          value: `${component.strokeWeight}px`,
        };
        buttonsJSONObject.button[componentName + 'borderStyle'] = {
          value: `${component.strokes[0].type.toLowerCase()}`,
        };
      }

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

      // temporary fix for updated properties in Figma for Neo 3.2.0

      if (
        componentName === 'square-secondary-default' ||
        componentName === 'square-primary-default' ||
        componentName === 'square-tertiary-default' ||
        componentName === 'square-disabled-default'
      ) {
        buttonsJSONObject.button[componentName + '-padding-x'] = {
          value: `7px`,
        };
        buttonsJSONObject.button[componentName + '-padding-y'] = {
          value: `7px`,
        };
      } else if (
        componentName === 'circular-primary-default' ||
        componentName === 'circular-secondary-default' ||
        componentName === 'circular-disabled-default'
      ) {
        buttonsJSONObject.button[componentName + '-padding-x'] = {
          value: `7px`,
        };
        buttonsJSONObject.button[componentName + '-padding-y'] = {
          value: `7px`,
        };
      } else {
        buttonsJSONObject.button[componentName + '-padding-x'] = {
          value: `${component.children[0].horizontalPadding}px`,
        };
        buttonsJSONObject.button[componentName + '-padding-y'] = {
          value: `${component.children[0].verticalPadding}px`,
        };
      }
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
          value: '{color.base/0.value}',
        };
        buttonsJSONObject.button[componentName + 'warningBgColor'] = {
          value: '{color.orange/500.value}',
        };
        buttonsJSONObject.button[componentName + 'warningBgColorOnHover'] = {
          value: '{color.orange/600.value}',
        };
        buttonsJSONObject.button[componentName + 'successBgColor'] = {
          value: '{color.green/500.value}',
        };
        buttonsJSONObject.button[componentName + 'successBgColorOnHover'] = {
          value: '{color.green/600.value}',
        };
        buttonsJSONObject.button[componentName + 'infoBgColor'] = {
          value: '{color.blue/500.value}',
        };
        buttonsJSONObject.button[componentName + 'infoBgColorOnHover'] = {
          value: '{color.blue/600.value}',
        };
        buttonsJSONObject.button[componentName + 'alertBgColor'] = {
          value: '{color.red/500.value}',
        };
        buttonsJSONObject.button[componentName + 'alertBgColorOnHover'] = {
          value: '{color.red/600.value}',
        };
      }

      if (
        componentName.includes('secondary') ||
        componentName.includes('tertiary')
      ) {
        buttonsJSONObject.button[componentName + 'warningColor'] = {
          value: '{color.orange/500.value}',
        };
        buttonsJSONObject.button[componentName + 'warningColorOnHover'] = {
          value: '{color.orange/600.value}',
        };
        buttonsJSONObject.button[componentName + 'successColor'] = {
          value: '{color.green/500.value}',
        };
        buttonsJSONObject.button[componentName + 'successColorOnHover'] = {
          value: '{color.green/600.value}',
        };
        buttonsJSONObject.button[componentName + 'infoColor'] = {
          value: '{color.blue/500.value}',
        };
        buttonsJSONObject.button[componentName + 'infoColorOnHover'] = {
          value: '{color.blue/600.value}',
        };
        buttonsJSONObject.button[componentName + 'alertColor'] = {
          value: '{color.red/500.value}',
        };
        buttonsJSONObject.button[componentName + 'alertColorOnHover'] = {
          value: '{color.red/600.value}',
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
      '../properties/components/button.json',
      JSON.stringify(buttonsJSONObject)
    )
    .then(function () {
      console.log('button.json created');
    });
}
// #endregion

// #region getAvatarStyles

async function getAvatarStyles(components) {
  const avatarComponents = [];

  components.Images.children.forEach((child) => {
    // code to grab just avatar components, ignoring .base component and all Notes in file

    if (
      child.name.includes('avatar') &&
      !child.name.includes('.base') &&
      !child.type !== 'NOTE' &&
      // extra code to remove extra avatars - to be removed later
      child.name !== 'avatar/default' &&
      child.name !== 'avatar/anonymous' &&
      child.name !== 'avatar/default-device' &&
      child.name !== 'avatar/user'
    ) {
      avatarComponents.push(child);
    }
  });

  // console.log(avatarComponents);

  var avatarJSONObject = {
    avatar: {},
  };

  // adding common Avatar styles

  avatarJSONObject.avatar['background-color'] = {
    value: '{color.blue/800.value}',
  };

  avatarJSONObject.avatar['border-radius'] = {
    value: '{borderRadius.100%.value}',
  };

  avatarJSONObject.avatar['color'] = { value: '{color.base/100.value}' };

  avatarComponents.forEach((avatarComp) => {
    var componentName = avatarComp.name;

    // grabbing sizes for each avatar size from one instance of each

    if (componentName == 'avatar/image/small') {
      avatarJSONObject.avatar['small-height'] = {
        // value: `${avatarComp.absoluteBoundingBox.height}px`,
        value: '28px',
      };
      avatarJSONObject.avatar['small-width'] = {
        // value: `${avatarComp.absoluteBoundingBox.width}px`,
        value: '28px',
      };
    } else if (componentName == 'avatar/image/medium') {
      avatarJSONObject.avatar['default-height'] = {
        // value: `${avatarComp.absoluteBoundingBox.height}px`,
        value: '36px',
      };
      avatarJSONObject.avatar['default-width'] = {
        // value: `${avatarComp.absoluteBoundingBox.width}px`,
        value: '36px',
      };
    } else if (componentName == 'avatar/image/large') {
      avatarJSONObject.avatar['large-height'] = {
        // value: `${avatarComp.absoluteBoundingBox.height}px`,
        value: '48px',
      };
      avatarJSONObject.avatar['large-width'] = {
        // value: `${avatarComp.absoluteBoundingBox.width}px`,
        value: '48px',
      };
    }
  });

  // avatarJSONObject.avatar['initials-xsmall'] = {
  //   'font-weight': {
  //     value: '{Web-typography.fontweight-regular.value}',
  //   },
  //   'font-size': { value: '{Web-typography.web/tiny body.fontSize.value}' },
  //   'letter-spacing': {
  //     value: '{Web-typography.web/tiny body.letterSpacing.value}',
  //   },
  //   'line-height': {
  //     value: '{Web-typography.web/tiny body.lineHeight.value}',
  //   },
  // };

  avatarJSONObject.avatar['initials-small'] = {
    'font-weight': {
      value: '{Web-typography.fontweight-regular.value}',
    },
    'font-size': {
      value: '{Web-typography.web/body - regular.fontSize.value}',
    },
    'letter-spacing': {
      value: '{Web-typography.web/body - regular.letterSpacing.value}',
    },
    'line-height': {
      value: '{Web-typography.web/body - regular.lineHeight.value}',
    },
  };

  avatarJSONObject.avatar['initials-regular'] = {
    'font-weight': {
      value: '{Web-typography.fontweight-regular.value}',
    },
    'font-size': { value: '{Web-typography.web/heading 4.fontSize.value}' },
    'line-height': {
      value: '{Web-typography.web/heading 4.lineHeight.value}',
    },
  };

  avatarJSONObject.avatar['initials-large'] = {
    'font-weight': {
      value: '{Web-typography.fontweight-regular.value}',
    },
    'font-size': {
      value: '{Web-typography.web/heading 2 - regular.fontSize.value}',
    },
    'line-height': {
      value: '{Web-typography.web/heading 2 - regular.lineHeight.value}',
    },
  };

  avatarJSONObject.avatar[`avatar-border`] = {
    width: { value: `{border.solid-2px.borderWidth.value}` },
    style: { value: `{border.solid-2px.borderStyle.value}` },
    color: { value: `{color.blue/500.value}` },
  };

  // const states = ['success', 'warning', 'alert', 'info'];

  // states.forEach((state) => {
  //   if (state == 'success') {
  //     avatarJSONObject.avatar[
  //       `avatar-${state}-border`
  //     ] = `{color.green/500.value}`;
  //   } else if (state == 'warning') {
  //     avatarJSONObject.avatar[
  //       `avatar-${state}-border`
  //     ] = `{color.orange/500.value}`;
  //   } else if (state == 'alert') {
  //     avatarJSONObject.avatar[
  //       `avatar-${state}-border`
  //     ] = `{color.red/500.value}`;
  //   } else if (state == 'info') {
  //     avatarJSONObject.avatar[
  //       `avatar-${state}-border`
  //     ] = `{color.blue/500.value}`;
  //   }
  // });

  // console.log(avatarJSONObject);

  await fs
    .writeFile(
      '../properties/components/avatar.json',
      JSON.stringify(avatarJSONObject)
    )
    .then(function () {
      console.log('avatar.json created');
    });
}

// #region getBadgeStyles

async function getBadgeStyles(components) {
  const badgeComponents = [];

  components.Indicator.children.forEach((child) => {
    if (child.name == 'badge') {
      badgeComponents.push(child);
    }
  });

  // console.log(badgeComponents);

  const badgeJSONObject = {
    badge: {},
  };

  badgeJSONObject.badge[`background-color`] = {
    value: `{color.red/500.value}`,
  };

  badgeJSONObject.badge[`border-radius`] = {
    value: `{borderRadius.100%.value}`,
  };

  badgeJSONObject.badge[`color`] = {
    value: `{color.base/100.value}`,
  };

  badgeJSONObject.badge[`fontSize`] = {
    value: `{Web-typography.web/small body.fontSize.value}`,
  };

  badgeJSONObject.badge[`lineHeight`] = {
    value: `{Web-typography.web/small body.lineHeight.value}`,
  };

  badgeJSONObject.badge[`padding`] = {
    value: `0px 4px`,
  };

  // height and width are equal, but not in Figma, so we base the width value on the height

  badgeJSONObject.badge[`width`] = {
    value: `${badgeComponents[0].absoluteBoundingBox.height}px`,
  };

  badgeJSONObject.badge[`height`] = {
    value: `${badgeComponents[0].absoluteBoundingBox.height}px`,
  };

  // code not picked up from Figma

  // box-sizing: border-box;
  // content: attr(data-badge);
  // display: flex;
  // justify-content: center;
  // position: absolute;
  // right: 0;
  // top: 0;
  // transform: translate(65%, -65%);

  // console.log(badgeJSONObject);

  await fs
    .writeFile(
      '../properties/components/badge.json',
      JSON.stringify(badgeJSONObject)
    )
    .then(function () {
      console.log('badge.json created');
    });
}

// #endregion

// #endregion

// #region getChipStyles

async function getChipStyles(components) {
  const chipComponents = [];

  components.Other.children.forEach((child) => {
    if (child.name.includes('chip') && child.type !== 'TEXT') {
      chipComponents.push(child);
    }
  });

  const chipJSONObject = {
    chip: {},
  };

  // focusing on styles that are in Figma as opposed to completely changing each property in current Neo

  chipComponents.forEach((chip) => {
    if (chip.name === 'chip/view/default') {
      // console.log(chip);
      chipJSONObject.chip[`padding`] = {
        horizontal: { value: `${chip.horizontalPadding}px` },
        vertical: { value: `${chip.verticalPadding}px` },
      };
    }
    if (chip.name === 'chip/editable/success') {
      // console.log(chip);
      chipJSONObject.chip[`editable-width`] = {
        value: `${chip.absoluteBoundingBox.width}px`,
      };
      chipJSONObject.chip[`editable-height`] = {
        value: `${chip.absoluteBoundingBox.height}px`,
      };
    }
  });

  // text color

  chipJSONObject.chip[`default-color`] = {
    value: `{color.base/1000.value}`,
  };

  chipJSONObject.chip[`stateful-color`] = {
    value: `{color.base/100.value}`,
  };

  // text styles

  chipJSONObject.chip[`fontWeight`] = {
    value: `{Web-typography.fontweight-regular.value}`,
  };

  chipJSONObject.chip[`fontSize`] = {
    value: `{Web-typography.web/small body.fontSize.value}`,
  };

  chipJSONObject.chip[`lineHeight`] = {
    value: `{Web-typography.web/small body.lineHeight.value}`,
  };

  // border radius

  chipJSONObject.chip[`borderRadius`] = {
    value: `{borderRadius.4px.value}`,
  };

  // color for default chips

  chipJSONObject.chip[`default-background`] = {
    value: `{color.base/100.value}`,
  };

  chipJSONObject.chip[`default-background-hover`] = {
    value: `{color.base/400.value}`,
  };

  chipJSONObject.chip[`default-closeButton-color`] = {
    value: `{color.base/600.value}`,
  };

  // color for alert chips

  chipJSONObject.chip[`alert-background`] = {
    value: `{color.red/100.value}`,
  };

  chipJSONObject.chip[`alert-background-hover`] = {
    value: `{color.red/200.value}`,
  };

  chipJSONObject.chip[`alert-closeButton-color`] = {
    value: `{color.red/600.value}`,
  };

  // color for warning chips

  chipJSONObject.chip[`warning-background`] = {
    value: `{color.orange/100.value}`,
  };

  chipJSONObject.chip[`warning-background-hover`] = {
    value: `{color.orange/200.value}`,
  };

  chipJSONObject.chip[`warning-closeButton-color`] = {
    value: `{color.orange/600.value}`,
  };

  // color for success chips

  chipJSONObject.chip[`success-background`] = {
    value: `{color.green/100.value}`,
  };

  chipJSONObject.chip[`success-background-hover`] = {
    value: `{color.green/200.value}`,
  };

  chipJSONObject.chip[`success-closeButton-color`] = {
    value: `{color.green/600.value}`,
  };

  // color for info chips

  chipJSONObject.chip[`info-background`] = {
    value: `{color.blue/100.value}`,
  };

  chipJSONObject.chip[`info-background-hover`] = {
    value: `{color.blue/200.value}`,
  };

  chipJSONObject.chip[`info-closeButton-color`] = {
    value: `{color.blue/600.value}`,
  };

  // console.log(chipJSONObject);

  await fs
    .writeFile(
      '../properties/components/chip.json',
      JSON.stringify(chipJSONObject)
    )
    .then(function () {
      console.log('chip.json created');
    });
}

// #endregion

// #region getLabelStyles

async function getLabelStyles(components) {
  const labelComponents = [];

  components.Other.children.forEach((child) => {
    if (child.name.includes('chip') && child.type !== 'TEXT') {
      labelComponents.push(child);
    }
  });

  const labelJSONObject = {
    label: {},
  };

  // focusing on styles that are in Figma as opposed to completely changing each property in current Neo

  labelComponents.forEach((label) => {
    if (label.name == 'chip/view') {
      labelJSONObject.label[`padding`] = {
        horizontal: { value: `${label.horizontalPadding}px` },
        vertical: { value: `${label.verticalPadding}px` },
      };
    }
  });

  // text color

  labelJSONObject.label[`default-color`] = {
    value: `{color.base/1000.value}`,
  };

  labelJSONObject.label[`stateful-color`] = {
    value: `{color.base/100.value}`,
  };

  // text styles

  labelJSONObject.label[`fontWeight`] = {
    value: `{Web-typography.fontweight-regular.value}`,
  };

  labelJSONObject.label[`fontSize`] = {
    value: `{Web-typography.web/small body.fontSize.value}`,
  };

  labelJSONObject.label[`lineHeight`] = {
    value: `{Web-typography.web/small body.lineHeight.value}`,
  };

  // border radius

  labelJSONObject.label[`borderRadius`] = {
    value: `{borderRadius.4px.value}`,
  };

  // color for default labels

  labelJSONObject.label[`default-background`] = {
    value: `{color.base/100.value}`,
  };

  labelJSONObject.label[`default-background-hover`] = {
    value: `{color.base/400.value}`,
  };

  // color for alert labels

  labelJSONObject.label[`alert-background`] = {
    value: `{color.red/500.value}`,
  };

  labelJSONObject.label[`alert-background-hover`] = {
    value: `{color.red/600.value}`,
  };

  // color for warning labels

  labelJSONObject.label[`warning-background`] = {
    value: `{color.orange/500.value}`,
  };

  labelJSONObject.label[`warning-background-hover`] = {
    value: `{color.orange/600.value}`,
  };

  // color for success labels

  labelJSONObject.label[`success-background`] = {
    value: `{color.green/500.value}`,
  };

  labelJSONObject.label[`success-background-hover`] = {
    value: `{color.green/600.value}`,
  };

  // color for info labels

  labelJSONObject.label[`info-background`] = {
    value: `{color.blue/500.value}`,
  };

  labelJSONObject.label[`info-background-hover`] = {
    value: `{color.blue/600.value}`,
  };

  // color for label icons

  labelJSONObject.label[`icon-color`] = {
    value: `{color.base/900.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/label.json',
      JSON.stringify(labelJSONObject)
    )
    .then(function () {
      console.log('label.json created');
    });
}

// #endregion

// #region getSpinnerStyles

async function getSpinnerStyles() {
  // the code in this function is not pulled from Figma

  const spinnerJSONObject = {
    spinner: {},
  };

  spinnerJSONObject.spinner[`color`] = {
    value: '#5a646e',
  };

  spinnerJSONObject.spinner[`height`] = {
    value: '20px',
  };

  spinnerJSONObject.spinner[`width`] = {
    value: '20px',
  };

  spinnerJSONObject.spinner[`animation-function`] = {
    value: `cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
  };

  spinnerJSONObject.spinner[`animation-speed`] = {
    value: '500ms',
  };

  spinnerJSONObject.spinner[`animation-duration`] = {
    value: `infinite`,
  };

  await fs
    .writeFile(
      '../properties/components/spinner.json',
      JSON.stringify(spinnerJSONObject)
    )
    .then(function () {
      console.log('spinner.json created');
    });
}

// #endregion

// #region getToolTipStyles

async function getTooltipStyles(components) {
  const tooltipComponents = [];

  const toolTipJSONObject = {
    tooltip: {},
  };

  components.Overlay.children.forEach((child) => {
    if (child.name.includes('tooltip-base') && child.type !== 'TEXT') {
      tooltipComponents.push(child);
    }

    if (child.name === '.tooltip-base') {
      toolTipJSONObject.tooltip['width'] = {
        value: `${child.absoluteBoundingBox.width}px`,
      };
      toolTipJSONObject.tooltip['height'] = {
        value: `${child.absoluteBoundingBox.height}px`,
      };
    }
  });

  toolTipJSONObject.tooltip[`background-color`] = {
    value: `{color.base/900.value}`,
  };

  toolTipJSONObject.tooltip[`color`] = {
    value: `{color.base/100.value}`,
  };

  toolTipJSONObject.tooltip[`arrow-color`] = {
    value: `{color.base/900.value}`,
  };

  toolTipJSONObject.tooltip[`fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  toolTipJSONObject.tooltip[`lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  toolTipJSONObject.tooltip[`letterSpacing`] = {
    value: `{Web-typography.web/body - regular.letterSpacing.value}`,
  };

  toolTipJSONObject.tooltip[`fontWeight`] = {
    value: `{Web-typography.fontweight-regular.value}`,
  };

  // toolTipJSONObject.tooltip[`width`] = {
  //   value: `${tooltipComponents[0].absoluteBoundingBox.width}px`,
  // };

  // toolTipJSONObject.tooltip['height'] = {
  //   value: `${tooltipComponents[0].absoluteBoundingBox.height}px`,
  // };

  toolTipJSONObject.tooltip[`horizontal-padding`] = {
    value: `${tooltipComponents[0].horizontalPadding}px`,
  };

  toolTipJSONObject.tooltip[`vertical-padding`] = {
    value: `${tooltipComponents[0].verticalPadding}px`,
  };

  await fs
    .writeFile(
      '../properties/components/tooltip.json',
      JSON.stringify(toolTipJSONObject)
    )
    .then(function () {
      console.log('tooltip.json created');
    });
}

// #endregion

// #region getCheckboxStyles

async function getCheckboxStyles(components) {
  // need to check code for cross-browser compatability

  const checkboxComponents = [];

  components.Form.children.forEach((child) => {
    if (child.name.includes('checkbox') && child.type !== 'TEXT') {
      checkboxComponents.push(child);
    }
  });

  // console.log(checkboxComponents[0].children);

  const checkboxJSONObject = {
    checkbox: {},
  };

  // styles for unselected checkbox

  checkboxJSONObject.checkbox[`unselected-background-color`] = {
    value: `{color.base/100.value}`,
  };

  checkboxJSONObject.checkbox[`unselected-border-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  checkboxJSONObject.checkbox[`unselected-border-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  checkboxJSONObject.checkbox[`unselected-border-color`] = {
    value: `{color.blue/500.value}`,
  };

  // styles for selected checkbox

  checkboxJSONObject.checkbox[`selected-background-color`] = {
    value: `{color.blue/500.value}`,
  };

  // this unicode needs to be taken directly from generated icons.css file

  checkboxJSONObject.checkbox[`selected-icon`] = {
    value: `\f1bc`,
  };

  // styles for disabled checkboxes

  checkboxJSONObject.checkbox[`disabled-background-color`] = {
    value: `{color.base/100.value}`,
  };

  checkboxJSONObject.checkbox[`disabled-border-color`] = {
    value: `{color.blue/200.value}`,
  };

  // styles for checkbox labels

  checkboxJSONObject.checkbox[`label-font-color`] = {
    value: `{color.base/1000.value}`,
  };

  checkboxJSONObject.checkbox[`label-font-size`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  checkboxJSONObject.checkbox[`label-lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  // styles for disabled checkbox labels

  checkboxJSONObject.checkbox[`disabled-label-font-color`] = {
    value: `{color.base/500.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/checkbox.json',
      JSON.stringify(checkboxJSONObject)
    )
    .then(function () {
      console.log('checkbox.json created');
    });
}

// #endregion

// #region getRadioStyles

async function getRadioStyles(components) {
  const radioComponents = [];

  components.Form.children.forEach((child) => {
    if (child.name.includes('radio') && child.type !== 'TEXT') {
      radioComponents.push(child);
    }
  });

  const radioJSONObject = {
    radio: {},
  };

  // need to confirm that this code will work across browsers, etc.

  // styles for radio button border

  radioJSONObject.radio[`border-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  radioJSONObject.radio[`border-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  radioJSONObject.radio[`border-color`] = {
    value: `{color.blue/500.value}`,
  };

  // disabled radio button border style

  radioJSONObject.radio[`disabled-border-color`] = {
    value: `{color.blue/200.value}`,
  };

  // styles for radio button color

  radioJSONObject.radio[`background-color`] = {
    value: `{color.base/100.value}`,
  };

  // styles for custom selected radio button target

  radioJSONObject.radio[`selected-target-background`] = {
    value: `{color.blue/500.value}`,
  };

  // disabled radio button target colour

  radioJSONObject.radio[`disabled-target-background`] = {
    value: `{color.blue/200.value}`,
  };

  radioJSONObject.radio[`selected-borderRadius`] = {
    value: `{borderRadius.100%.value}`,
  };

  // double check the positioning of this element

  radioJSONObject.radio[`selected-target-left`] = {
    value: '18.75%',
  };

  radioJSONObject.radio[`selected-target-right`] = {
    value: '18.75%',
  };

  radioJSONObject.radio[`selected-target-top`] = {
    value: '18.75%',
  };

  radioJSONObject.radio[`selected-target-bottom`] = {
    value: '18.75%',
  };

  // styles for radio labels

  radioJSONObject.radio[`label-font-color`] = {
    value: `{color.base/1000.value}`,
  };

  radioJSONObject.radio[`label-font-size`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  radioJSONObject.radio[`label-lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  // styles for disabled checkbox labels

  radioJSONObject.radio[`disabled-label-font-color`] = {
    value: `{color.base/500.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/radio.json',
      JSON.stringify(radioJSONObject)
    )
    .then(function () {
      console.log('radio.json created');
    });
}

// #endregion

// #region getSwitchStyles

async function getSwitchStyles(components) {
  const switchComponents = [];

  components.Form.children.forEach((child) => {
    if (child.name.includes('switch') && child.type !== 'TEXT') {
      switchComponents.push(child);
    }
  });

  const switchJSONObject = {
    switch: {},
  };

  // switch 'on' background colour

  switchJSONObject.switch[`on-background-color`] = {
    value: `{color.blue/500.value}`,
  };

  // switch 'off' background color

  switchJSONObject.switch[`off-background-color`] = {
    value: `{color.base/100.value}`,
  };

  // switch 'on' disabled colour

  switchJSONObject.switch[`on-disabled-background-color`] = {
    value: `{color.blue/200.value}`,
  };

  // switch 'off' disabled color

  switchJSONObject.switch[`off-disabled-background-color`] = {
    value: `{color.base/200.value}`,
  };

  // slider box shadow style

  switchJSONObject.switch[`box-shadow-xOffset`] = {
    value: `{shadows.elevation100.xOffset.value}`,
  };

  switchJSONObject.switch[`box-shadow-yOffset`] = {
    value: `{shadows.elevation100.yOffset.value}`,
  };

  switchJSONObject.switch[`box-shadow-radius`] = {
    value: `{shadows.elevation100.radius.value}`,
  };

  switchJSONObject.switch[`box-shadow-color`] = {
    value: `{shadows.elevation100.color.value}`,
  };

  // styles for switch labels

  switchJSONObject.switch[`label-font-color`] = {
    value: `{color.base/1000.value}`,
  };

  switchJSONObject.switch[`label-font-size`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  switchJSONObject.switch[`label-lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  // styles for disabled switch labels

  switchJSONObject.switch[`disabled-label-font-color`] = {
    value: `{color.base/100.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/switch.json',
      JSON.stringify(switchJSONObject)
    )
    .then(function () {
      console.log('switch.json created');
    });
}

// #endregion

// #region getInputGroupStyles

async function getInputGroupStyles(components) {
  const inputGroupComponents = [];

  components.Form.children.forEach((child) => {
    if (
      child.name.includes('input-group') ||
      (child.name.includes('add-on') && child.type !== 'TEXT')
    ) {
      inputGroupComponents.push(child);
    }
  });

  const inputGroupJSONObject = {
    inputGroup: {},
  };

  // add-on styles

  inputGroupJSONObject.inputGroup[`addon-text-background-color`] = {
    value: `{color.base/100.value}`,
  };

  inputGroupJSONObject.inputGroup[`addon-icon-color`] = {
    value: `{color.base/800.value}`,
  };

  inputGroupJSONObject.inputGroup[`addon-border-color`] = {
    value: `{color.base/400.value}`,
  };

  inputGroupJSONObject.inputGroup[`addon-border-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  inputGroupJSONObject.inputGroup[`addon-border-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  // input field styles

  inputGroupJSONObject.inputGroup[`input-background-color`] = {
    value: `{color.base/100.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-border-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-border-color`] = {
    value: `{color.base/400.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-border-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  // placeholder text styles

  inputGroupJSONObject.inputGroup[`input-placeholder-fontSize`] = {
    value: `{Web-typography.web/body - italic.fontSize.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-placeholder-lineHeight`] = {
    value: `{Web-typography.web/body - italic.lineHeight.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-placeholder-fontStyle`] = {
    value: `{Web-typography.web/body - italic.textStyle.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-placeholder-color`] = {
    value: `{color.base/600.value}`,
  };

  // label text styles

  inputGroupJSONObject.inputGroup[`input-label-fontSize`] = {
    value: `{Web-typography.web/small body.fontSize.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-placeholder-lineHeight`] = {
    value: `{Web-typography.web/small body.lineHeight.value}`,
  };

  // button add-on styles

  inputGroupJSONObject.inputGroup[`input-addon-button-color`] = {
    value: `{color.base/100.value}`,
  };

  inputGroupJSONObject.inputGroup[
    `input-addon-button-icon-background-color`
  ] = {
    value: `{color.blue/500.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-addon-button-icon-borderRadius`] = {
    value: `{borderRadius.2px.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-addon-button-fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  inputGroupJSONObject.inputGroup[`input-addon-button-lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/inputGroup.json',
      JSON.stringify(inputGroupJSONObject)
    )
    .then(function () {
      console.log('inputGroup.json created');
    });
}

// #endregion

// #region getInputStyles

async function getInputStyles(components) {
  // styles also applicable to Text Area components

  const inputComponents = [];

  const inputJSONObject = {
    input: {},
  };

  components.Form.children.forEach((child) => {
    if (child.name.includes('input-field') && child.type !== 'TEXT') {
      inputComponents.push(child);
    }

    if (child.name === 'input-field/filled') {
      inputJSONObject.input['width'] = {
        value: `${child.absoluteBoundingBox.width}px`,
      };
    }

    if (child.name === 'input-field/default') {
      var inputFieldHeight = child.size.y - child.children[0].size.y;
      inputJSONObject.input['height'] = {
        value: `${inputFieldHeight}px`,
      };
      inputJSONObject.input['height'] = {
        value: `${inputFieldHeight}px`,
      };
    }

    if (child.name === 'input-field/read-only') {
      inputJSONObject.input['readonly-padding'] = {
        value: `${child.children[0].relativeTransform[0][2]}px`,
      };
      inputJSONObject.input['label-spacing'] = {
        value: `${child.itemSpacing}px`,
      };
    }
  });

  // console.log(inputComponents);

  // label text styles

  inputJSONObject.input[`label-fontSize`] = {
    value: `{Web-typography.web/small body.fontSize.value}`,
  };

  inputJSONObject.input[`label-lineHeight`] = {
    value: `{Web-typography.web/small body.lineHeight.value}`,
  };

  inputJSONObject.input[`label-required-asterix-color`] = {
    value: `{color.red/500.value}`,
  };

  // read-only input styles

  inputJSONObject.input[`readOnly-input-bacgkround-opacity`] = {
    value: 0,
  };

  inputJSONObject.input[`readOnly-input-border`] = {
    value: 'none',
  };

  // filled input text styles

  inputJSONObject.input[`filled-input-fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  inputJSONObject.input[`disabled-filled-color`] = {
    value: `{color.base/400.value}`,
  };

  inputJSONObject.input[`filled-closeButton-color`] = {
    value: `{color.base/1000.value}`,
  };

  inputJSONObject.input[`filled-closeButton-icon`] = {
    value: `\f1bd`,
  };

  inputJSONObject.input[`disabled-filled-closeButton-color`] = {
    value: `{color.base/1000.value}`,
  };

  // input placeholder text styles

  inputJSONObject.input[`placeholder-color`] = {
    value: `{color.base/500.value}`,
  };

  inputJSONObject.input[`placeholder-fontSize`] = {
    value: `{Web-typography.web/body - italic.fontSize.value}`,
  };

  inputJSONObject.input[`placeholder-lineHeight`] = {
    value: `{Web-typography.web/body - italic.lineHeight.value}`,
  };

  inputJSONObject.input[`placeholder-fontStyle`] = {
    value: `{Web-typography.web/body - italic.textStyle.value}`,
  };

  // input border styles

  inputJSONObject.input[`borderWidth`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  inputJSONObject.input[`borderStyle`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  inputJSONObject.input[`border-color`] = {
    value: `{color.base/400.value}`,
  };

  // disabled input background color

  inputJSONObject.input[`disabled-background-color`] = {
    value: `{color.base/100.value}`,
  };

  // helper text styles

  inputJSONObject.input[`helper-fontSize`] = {
    value: `{Web-typography.web/tiny body.fontSize.value}`,
  };

  inputJSONObject.input[`helper-lineHeight`] = {
    value: `{Web-typography.web/tiny body.lineHeight.value}`,
  };

  inputJSONObject.input[`helper-color`] = {
    value: `{color.base/500.value}`,
  };

  // error validation styles

  inputJSONObject.input[`errorText-color`] = {
    value: `{color.red/500.value}`,
  };

  inputJSONObject.input[`error-border-color`] = {
    value: `{color.base/400.value}`,
  };

  inputJSONObject.input[`error-icon`] = {
    value: '\f166',
  };

  inputJSONObject.input[`error-icon-color`] = {
    value: `{color.red/500.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/input.json',
      JSON.stringify(inputJSONObject)
    )
    .then(function () {
      console.log('input.json created');
    });
}

// #endregion

// #region getTextAreaStyles

// async function getTextAreaStyles(components) {
//   const textAreaComponents = [];

//   components.Form.children.forEach((child) => {
//     if (child.name.includes('text-area') && child.type !== 'TEXT') {
//       textAreaComponents.push(child);
//     }
//   });

//   const textAreaJSONObject = {
//     textArea: {}
//   };

// }

// #endregion

// #region getDropdownStyles

async function getDropdownStyles(components) {
  // using some of the values from input style?

  const dropdownComponents = [];

  const dropdownJSONObject = {
    dropdown: {},
  };

  components.Form.children.forEach((child) => {
    if (child.name.includes('dropdown') && child.type !== 'TEXT') {
      if (child.name === 'dropdown/no-label') {
        dropdownJSONObject.dropdown['width'] = {
          value: `${child.absoluteBoundingBox.width}px`,
        };
        dropdownJSONObject.dropdown['height'] = {
          value: `${child.absoluteBoundingBox.height}px`,
        };
        // experimental code to grab padding
        dropdownJSONObject.dropdown['padding-left'] = {
          value: `${child.children[0].relativeTransform[0][2]}px`,
        };

        var paddingRight =
          child.absoluteBoundingBox.width -
          (child.children[1].relativeTransform[0][2] +
            child.children[1].absoluteBoundingBox.width);

        dropdownJSONObject.dropdown['padding-right'] = {
          value: `${paddingRight}px`,
        };
        console.log(child.children[0].relativeTransform);
        console.log(child.children[1].relativeTransform);
      }
      dropdownComponents.push(child);
    }
  });

  dropdownJSONObject.dropdown[`label-fontSize`] = {
    value: `{Web-typography.web/small body.fontSize.value}`,
  };

  dropdownJSONObject.dropdown[`label-lineHeight`] = {
    value: `{Web-typography.web/small body.lineHeight.value}`,
  };

  dropdownJSONObject.dropdown[`text-fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  dropdownJSONObject.dropdown[`text-lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  dropdownJSONObject.dropdown[`border-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  dropdownJSONObject.dropdown[`border-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  dropdownJSONObject.dropdown[`border-color`] = {
    value: `{color.base/400.value}`,
  };

  dropdownJSONObject.dropdown[`icon`] = {
    value: '\\f126',
  };

  dropdownJSONObject.dropdown[`disabled-background-color`] = {
    value: `{color.base/100.value}`,
  };

  dropdownJSONObject.dropdown[`disabled-color`] = {
    value: `{color.base/500.value}`,
  };

  // use checkbox styles for checkboxes

  dropdownJSONObject.dropdown[`hover`] = {
    value: `{color.base/200.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/dropdown.json',
      JSON.stringify(dropdownJSONObject)
    )
    .then(function () {
      console.log('dropdown.json created');
    });
}

// #endregion

// #region getTableStyles

async function getTableStyles(components) {
  const tableJSONObject = {
    table: {},
  };
  const tableComponents = [];

  components.Table.children.forEach((child) => {
    if (child.type !== 'TEXT') {
      tableComponents.push(child);
    }
    if (child.name === 'row/default/default') {
      tableJSONObject.table['padding'] = {
        value: `${child.horizontalPadding}px`,
      };
    }
    if (child.name === 'pagination-count') {
      tableJSONObject.table['pagination-count-width'] = {
        value: `${child.absoluteBoundingBox.width}px`,
      };
      tableJSONObject.table['pagination-count-height'] = {
        value: `${child.absoluteBoundingBox.height}px`,
      };
      // get width of page select box
      tableJSONObject.table['pagination-count-select-width'] = {
        value: `${child.children[1].absoluteBoundingBox.width}px`,
      };
    }
    if (child.name === 'search-date-range') {
      tableJSONObject.table[`date-picker-width`] = {
        value: `${child.absoluteBoundingBox.width}px`,
      };
      tableJSONObject.table[`date-picker-horizontal-padding`] = {
        value: `${child.absoluteBoundingBox.width}px`,
      };
    }
    if (child.name === 'pagination') {
      tableJSONObject.table[`pagination-item-horizontal-margin`] = {
        value: `${child.itemSpacing}px`,
      };
    }
  });

  // console.log(tableComponents);

  tableJSONObject.table[`fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  tableJSONObject.table[`lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  tableJSONObject.table[`header-default-background-color`] = {
    value: `{color.base/100.value}`,
  };

  tableJSONObject.table[`sort-default-icon`] = {
    value: `\f158`,
  };

  // box-shadow as border bottom

  tableJSONObject.table[`row-border-bottom-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  tableJSONObject.table[`row-border-bottom-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  tableJSONObject.table[`row-border-bottom-color`] = {
    value: `{color.base/400.value}`,
  };

  tableJSONObject.table[`row-clickable-color`] = {
    value: `{color.blue/500.value}`,
  };

  tableJSONObject.table[`row-more-icon`] = {
    value: `\f20e`,
  };

  tableJSONObject.table[`row-hover-color`] = {
    value: `{color.blue/100.value}`,
  };

  tableJSONObject.table[`row-disabled-background-color`] = {
    value: `{color.base/100.value}`,
  };

  tableJSONObject.table[`row-disabled-default-color`] = {
    value: `{color.base/500.value}`,
  };

  tableJSONObject.table[`row-disabled-clickable-color`] = {
    value: `{color.base/100.value}`,
  };

  // use input group styles for filter

  tableJSONObject.table[`filter-icon`] = {
    value: `\f1c6`,
  };

  tableJSONObject.table[`filter-button-color`] = {
    value: `{color.base/400.value}`,
  };

  // use checkmark styles for header checkmarks

  // pagination

  tableJSONObject.table[`pagination-arrow-left`] = {
    value: `\f209`,
  };

  tableJSONObject.table[`pagination-arrow-right`] = {
    value: `\f20a`,
  };

  tableJSONObject.table[`pagination-color`] = {
    value: `{color.blue/500.value}`,
  };

  tableJSONObject.table[`pagination-active-color`] = {
    value: `{color.base/100.value}`,
  };

  tableJSONObject.table[`pagination-active-background-color`] = {
    value: `{color.blue/500.value}`,
  };

  // tableJSONObject.table[`pagination-disabled-color`] = {
  //   value: `{color.disabled/text.value}`,
  // };

  tableJSONObject.table[`pagination-active-div-borderStyle`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  tableJSONObject.table[`pagination-active-div-borderWidth`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  tableJSONObject.table[`pagination-active-div-borderColor`] = {
    value: `{color.blue/500.value}`,
  };

  tableJSONObject.table[`pagination-active-div-borderRadius`] = {
    value: `{borderRadius.100%.value}`,
  };

  tableJSONObject.table[`pagination-more-icon`] = {
    value: `\f20e`,
  };

  // date range picker

  tableJSONObject.table[`datepicker-background-color`] = {
    value: `{color.base/100.value}`,
  };

  tableJSONObject.table[`datepicker-fontStyle`] = {
    value: `{Web-typography.web/body - italic.textStyle.value}`,
  };

  tableJSONObject.table[`datepicker-font-color`] = {
    value: `{color.base/500.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/table.json',
      JSON.stringify(tableJSONObject)
    )
    .then(function () {
      console.log('table.json created');
    });
}

// #endregion

// #region getAccordionStyles

async function getAccordionStyles(components) {
  const accordionComponents = [];

  components.Other.children.forEach((child) => {
    if (child.name.includes('accordian') && child.type !== 'TEXT') {
      accordionComponents.push(child);
    }
  });

  const accordionJSONObject = {
    accordion: {},
  };

  accordionJSONObject.accordion[`fontSize`] = {
    value: `{Web-typography.web/large body.fontSize.value}`,
  };

  accordionJSONObject.accordion[`lineHeight`] = {
    value: `{Web-typography.web/large body.lineHeight.value}`,
  };

  accordionJSONObject.accordion[`border-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  accordionJSONObject.accordion[`border-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  accordionJSONObject.accordion[`border-color`] = {
    value: `{color.base/400.value}`,
  };

  accordionJSONObject.accordion[`down-arrow-icon`] = {
    value: `\f206`,
  };

  accordionJSONObject.accordion[`up-arrow-icon`] = {
    value: `\f20d`,
  };

  accordionJSONObject.accordion[`hover-background-color`] = {
    value: `{color.blue/100.value}`,
  };

  accordionJSONObject.accordion[`hover-disabled-color`] = {
    value: `{color.base/500.value}`,
  };

  accordionJSONObject.accordion[`hover-disabled-background-color`] = {
    value: `{color.base/100.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/accordion.json',
      JSON.stringify(accordionJSONObject)
    )
    .then(function () {
      console.log('accordion.json created');
    });
}

// #endregion

// #region getMenuStyles

async function getMenuStyles(components) {
  const menuComponents = [];

  components.Navigation.children.forEach((child) => {
    if (child.name.includes('menu') && child.type !== 'TEXT') {
      menuComponents.push(child);
    }
  });

  const menuJSONObject = {
    menu: {},
  };

  // box-shadow styles

  menuJSONObject.menu[`box-shadow-x-offset`] = {
    value: `{shadows.elevation100.xOffset.value}`,
  };

  menuJSONObject.menu[`box-shadow-y-offset`] = {
    value: `{shadows.elevation100.yOffset.value}`,
  };

  menuJSONObject.menu[`box-shadow-radius`] = {
    value: `{shadows.elevation100.radius.value}`,
  };

  menuJSONObject.menu[`box-shadow-color`] = {
    value: `{shadows.elevation100.color.value}`,
  };

  menuJSONObject.menu[`default-background-color`] = {
    value: `{color.blue/500.value}`,
  };

  menuJSONObject.menu[`default-active-color`] = {
    value: `{color.blue/600.value}`,
  };

  // icons

  menuJSONObject.menu[`arrow-down`] = {
    value: `\f126`,
  };

  menuJSONObject.menu[`arrow-left`] = {
    value: `\f127`,
  };

  menuJSONObject.menu[`icon-color`] = {
    value: `{color.base/600.value}`,
  };

  // font styles

  menuJSONObject.menu[`font-color`] = {
    value: `{color.base/100.value}`,
  };

  // hover styles

  menuJSONObject.menu[`hover`] = {
    value: `{color.blue/100.value}`,
  };

  // separator bottom border

  menuJSONObject.menu[`separator-border-bottom-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  menuJSONObject.menu[`separator-border-bottom-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  menuJSONObject.menu[`separator-border-bottom-color`] = {
    value: `{color.base/100.value}`,
  };

  // use avatar image small value for avatar menu

  await fs
    .writeFile(
      '../properties/components/menu.json',
      JSON.stringify(menuJSONObject)
    )
    .then(function () {
      console.log('menu.json created');
    });
}

// #endregion

// #region getListGroupStyles

async function getListGroupStyles(components) {
  const listComponents = [];

  // pulling styles from specific objects

  components.Other.children.forEach((child) => {
    if (child.name.includes('list') && child.type !== 'TEXT') {
      if (child.name === 'list/item/text/default') {
        var opacity = child.effects[0].color.a;

        listComponents.push({
          'border-color': `rgba(0, 0, 0, ${opacity})`,
        });
      }

      // listComponents.push(child);
    }
  });

  const listJSONObject = {
    list: {},
  };

  listJSONObject.list[`border-bottom-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  listJSONObject.list[`border-bottom-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  listJSONObject.list[`border-bottom-color`] = {
    value: `${listComponents[0]['border-color']}`,
  };

  listJSONObject.list[`fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  listJSONObject.list[`lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  listJSONObject.list[`lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  listJSONObject.list[`hover`] = {
    value: `{color.blue/100.value}`,
  };

  listJSONObject.list[`disabled-background-color`] = {
    value: `{color.base/100.value}`,
  };

  listJSONObject.list[`disabled-color`] = {
    value: `{color.base/500.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/listgroup.json',
      JSON.stringify(listJSONObject)
    )
    .then(function () {
      console.log('listgroup.json created');
    });
}

// #endregion

// #region getModalStyles

async function getModalStyles(components) {
  const modalComponents = [];

  const modalJSONObject = {
    modal: {},
  };

  // pulling styles from specific objects

  components.Overlay.children.forEach((child) => {
    if (child.name.includes('modal') && child.type !== 'TEXT') {
      if (child.name.includes('scrim')) {
        modalComponents.push({
          'scrim-color': `rgba(0, 0, 0, ${child.opacity})`,
        });
      }

      if (child.name === 'modal/menu') {
        modalJSONObject.modal[`menu-modal-width`] = {
          value: `${child.absoluteBoundingBox.width}px`,
        };
      }

      // modalComponents.push(child);
    }
  });

  modalJSONObject.modal[`scrim-color`] = {
    value: `${modalComponents[0]['scrim-color']}`,
  };

  // modal title

  modalJSONObject.modal[`title-fontSize`] = {
    value: `{Web-typography.web/heading 4.fontSize.value}`,
  };

  modalJSONObject.modal[`title-lineHeight`] = {
    value: `{Web-typography.web/heading 4.lineHeight.value}`,
  };

  // modal description

  modalJSONObject.modal[`description-fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  modalJSONObject.modal[`title-lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  // modal box-shadow

  modalJSONObject.modal[`box-shadow-xOffset`] = {
    value: `{shadows.elevation300.xOffset.value}`,
  };

  modalJSONObject.modal[`box-shadow-yOffset`] = {
    value: `{shadows.elevation300.yOffset.value}`,
  };

  modalJSONObject.modal[`box-shadow-radius`] = {
    value: `{shadows.elevation300.radius.value}`,
  };

  modalJSONObject.modal[`box-shadow-color`] = {
    value: `{shadows.elevation300.color.value}`,
  };

  // modal buttons are primary for confirm, secondary for cancel

  // close button icon

  modalJSONObject.modal[`close-button-icon`] = {
    value: `\f1bd`,
  };

  // building a whole new Component for modal menu

  modalJSONObject.modal[`menu-grid`] = {
    value: `"head head"
    "nav  main"
    "nav  foot";`,
  };

  await fs
    .writeFile(
      '../properties/components/modal.json',
      JSON.stringify(modalJSONObject)
    )
    .then(function () {
      console.log('modal.json created');
    });
}

// #endregion

// #region getNavbarStyles

async function getNavbarStyles(components) {
  // TODO - this function is a work in progress

  const navBarComponents = [];

  // pulling styles from specific objects

  components.Navigation.children.forEach((child) => {
    if (child.name.includes('nav-bar') && child.type !== 'TEXT') {
      // if (child.name.includes('scrim')) {
      //   modalComponents.push({
      //     'scrim-color': `rgba(0, 0, 0, ${child.opacity})`,
      //   });
      // }

      navBarComponents.push(child);
    }
  });

  const navBarJSONObject = {
    navBar: {},
  };

  navBarJSONObject.navBar[`background-color`] = {
    value: `{color.base/100.value}`,
  };

  // console.log(navBarComponents);
}

// #endregion

// #region getNotificationStyles

async function getNotificationStyles(components) {
  const notificationComponents = [];

  components.Indicator.children.forEach((child) => {
    if (child.name.includes('notification') && child.type !== 'TEXT') {
      // if (child.name.includes('scrim')) {
      //   modalComponents.push({
      //     'scrim-color': `rgba(0, 0, 0, ${child.opacity})`,
      //   });
      // }

      notificationComponents.push(child);
    }
  });

  const notificationJSONObject = {
    notification: {},
  };

  // close button

  notificationJSONObject.notification[`close-button`] = {
    value: '\f11b',
  };

  // font styles

  notificationJSONObject.notification[`title-fontSize`] = {
    value: `{Web-typography.web/heading 4.fontSize.value}`,
  };

  notificationJSONObject.notification[`title-lineHeight`] = {
    value: `{Web-typography.web/heading 4.lineHeight.value}`,
  };

  notificationJSONObject.notification[`message-fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  notificationJSONObject.notification[`message-lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  // error

  notificationJSONObject.notification[`error-background-color`] = {
    value: `{color.red/100.value}`,
  };

  notificationJSONObject.notification[`error-button-color`] = {
    value: `{color.red/800.value}`,
  };

  notificationJSONObject.notification[`error-icon`] = {
    value: '\f10c',
  };

  notificationJSONObject.notification[`error-icon-color`] = {
    value: `{color.red/600.value}`,
  };

  // warning

  notificationJSONObject.notification[`warning-background-color`] = {
    value: `{color.orange/100.value}`,
  };

  notificationJSONObject.notification[`warning-button-color`] = {
    value: `{color.orange/800.value}`,
  };

  notificationJSONObject.notification[`warning-icon`] = {
    value: '\f166',
  };

  notificationJSONObject.notification[`warning-icon-color`] = {
    value: `{color.orange/600.value}`,
  };

  // info

  notificationJSONObject.notification[`info-background-color`] = {
    value: `{color.blue/100.value}`,
  };

  notificationJSONObject.notification[`info-button-color`] = {
    value: `{color.blue/800.value}`,
  };

  notificationJSONObject.notification[`info-icon`] = {
    value: '\f164',
  };

  notificationJSONObject.notification[`info-icon-color`] = {
    value: `{color.blue/600.value}`,
  };

  // success

  notificationJSONObject.notification[`success-background-color`] = {
    value: `{color.green/100.value}`,
  };

  notificationJSONObject.notification[`success-button-color`] = {
    value: `{color.green/800.value}`,
  };

  notificationJSONObject.notification[`success-icon`] = {
    value: '\f11d',
  };

  notificationJSONObject.notification[`success-icon-color`] = {
    value: `{color.green/600.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/notification.json',
      JSON.stringify(notificationJSONObject)
    )
    .then(function () {
      console.log('notification.json created');
    });

  // console.log(notificationComponents);
}

// #region getListSectionStyles

async function getListSectionStyles(components) {
  const listSectionJSONObject = {
    listSection: {},
  };

  listSectionJSONObject.listSection[`width`] = {
    value: `304px`,
  };

  listSectionJSONObject.listSection[`padding`] = {
    value: `12px`,
  };

  listSectionJSONObject.listSection[`action-padding`] = {
    value: `0px`,
  };

  await fs
    .writeFile(
      '../properties/components/listSection.json',
      JSON.stringify(listSectionJSONObject)
    )
    .then(function () {
      console.log('listSection.json created');
    });
}

// //#endregion

// #endregion

// #region

async function getSheetStyles(components) {
  const sheetJSONObject = {
    sheet: {},
  };

  sheetJSONObject.sheet[`width`] = {
    value: `352px`,
  };
  sheetJSONObject.sheet[`padding`] = {
    value: `24px`,
  };
  sheetJSONObject.sheet[`min-height`] = {
    value: `744px`,
  };

  await fs
    .writeFile(
      '../properties/components/sheet.json',
      JSON.stringify(sheetJSONObject)
    )
    .then(function () {
      console.log('sheet.json created');
    });
}

// #endregion

// #region getPopoverStyles

// popovers no longer supported in Figma but we need them in the code

async function getPopoverStyles(components) {
  const popoverComponents = [];

  const popoverJSONObject = {
    popover: {},
  };

  // components.Overlay.children.forEach((child) => {
  //   if (child.name.includes('popover') && child.type !== 'TEXT') {
  //     // if (child.name.includes('scrim')) {
  //     //   modalComponents.push({
  //     //     'scrim-color': `rgba(0, 0, 0, ${child.opacity})`,
  //     //   });
  //     // }
  //     popoverJSONObject.popover['header-height'] = {
  //       value: `${child.children[0].absoluteBoundingBox.height}px`,
  //     };

  //     popoverComponents.push(child);
  //   }
  // });

  // popover header height

  popoverJSONObject.popover[`headerHeight`] = {
    value: `35px`,
  };

  // border

  popoverJSONObject.popover[`borderWidth`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  popoverJSONObject.popover[`borderStyle`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  popoverJSONObject.popover[`borderColor`] = {
    value: `{color.base/500.value}`,
  };

  // title

  popoverJSONObject.popover[`title-fontSize`] = {
    value: `{Web-typography.web/body - semibold.fontSize.value}`,
  };

  popoverJSONObject.popover[`title-lineHeight`] = {
    value: `{Web-typography.web/body - semibold.lineHeight.value}`,
  };

  popoverJSONObject.popover[`title-fontWeight`] = {
    value: `{Web-typography.fontweight-semibold.value}`,
  };

  popoverJSONObject.popover[`title-background-color`] = {
    value: `{color.base/100.value}`,
  };

  popoverJSONObject.popover[`title-border-bottom-width`] = {
    value: `{border.solid-1px.borderWidth.value}`,
  };

  popoverJSONObject.popover[`title-border-bottom-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  popoverJSONObject.popover[`title-border-bottom-color`] = {
    value: `{color.base/500.value}`,
  };

  // body

  popoverJSONObject.popover[`body-background-color`] = {
    value: `{color.base/100.value}`,
  };

  popoverJSONObject.popover[`body-fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  popoverJSONObject.popover[`body-lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/popover.json',
      JSON.stringify(popoverJSONObject)
    )
    .then(function () {
      console.log('popover.json created');
    });
}

// #endregion

// #region getTabStyles

async function getTabStyles(components) {
  const tabComponents = [];

  components.Navigation.children.forEach((child) => {
    if (child.name.includes('tab') && child.type !== 'TEXT') {
      // if (child.name.includes('scrim')) {
      //   modalComponents.push({
      //     'scrim-color': `rgba(0, 0, 0, ${child.opacity})`,
      //   });
      // }

      tabComponents.push(child);
    }
  });

  const tabJSONObject = {
    tabs: {},
  };

  tabJSONObject.tabs[`fontSize`] = {
    value: `{Web-typography.web/body - regular.fontSize.value}`,
  };

  tabJSONObject.tabs[`lineHeight`] = {
    value: `{Web-typography.web/body - regular.lineHeight.value}`,
  };

  tabJSONObject.tabs[`color`] = {
    value: `{color.blue/500.value}`,
  };

  tabJSONObject.tabs[`border-bottom-width`] = {
    value: `{border.solid-2px.borderWidth.value}`,
  };

  tabJSONObject.tabs[`border-bottom-style`] = {
    value: `{border.solid-1px.borderStyle.value}`,
  };

  tabJSONObject.tabs[`border-bottom-color`] = {
    value: `{color.blue/500.value}`,
  };

  tabJSONObject.tabs[`unselected-background-color`] = {
    value: `{color.base/200.value}`,
  };

  tabJSONObject.tabs[`unselected--color`] = {
    value: `{color.base/500.value}`,
  };

  tabJSONObject.tabs[`disabled-background-color`] = {
    value: `{color.base/100.value}`,
  };

  await fs
    .writeFile(
      '../properties/components/tabs.json',
      JSON.stringify(tabJSONObject)
    )
    .then(function () {
      console.log('tab.json created');
    });
}

// #endregion

// #region getWidgetStyles

async function getWidgetStyles(components) {
  const widgetComponents = [];

  components.Other.children.forEach((child) => {
    if (child.name.includes('widget') && child.type !== 'TEXT') {
      // if (child.name.includes('scrim')) {
      //   modalComponents.push({
      //     'scrim-color': `rgba(0, 0, 0, ${child.opacity})`,
      //   });
      // }

      widgetComponents.push(child);
    }
  });

  const widgetJSONObject = {
    widgets: {},
  };
}

// #endregion

// #region this is where we pull component styles

coreFigmaFunctions
  .getComponentPages(
    coreFigmaFunctions.figmaCredentials.figmaAPIKey,
    coreFigmaFunctions.figmaCredentials.coreComponentsFileID
  )
  .then(async (value) => {
    await fs.mkdir('../properties/components/', {
      recursive: true,
    });
    getButtonStyles(value);
    getAvatarStyles(value);
    getBadgeStyles(value);
    getChipStyles(value);
    getLabelStyles(value);
    getSpinnerStyles();
    getTooltipStyles(value);
    getCheckboxStyles(value);
    getRadioStyles(value);
    getSwitchStyles(value);
    getInputGroupStyles(value);
    getInputStyles(value);
    getDropdownStyles(value);
    getTableStyles(value);
    getAccordionStyles(value);
    getListGroupStyles(value);
    getModalStyles(value);
    getMenuStyles(value);
    getNavbarStyles(value);
    getNotificationStyles(value);
    getPopoverStyles(value);
    getTabStyles(value);
    getWidgetStyles(value);
    getListSectionStyles(value);
    getSheetStyles(value);
  });

// #endregion
