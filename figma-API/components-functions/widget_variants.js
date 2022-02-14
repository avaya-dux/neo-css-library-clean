const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

///// Widgets /////

:root {
  --widget-shimmer-color: #{$token-color-base-100};
  --widget-border-color: #{$token-color-base-200};
}
.dark {
  --widget-shimmer-color: #{$token-color-base-800};
  --widget-border-color: #{$token-color-base-600};
}

$widget-shimmer-color: var(--widget-shimmer-color);
$widget-border-color: var(--widget-border-color) !default;
$widget-box-shadow: 2px 2px 2px $widget-border-color;
$widget-heading-color: #616161 !default;
$widget-border-radius: $global-radius !default;
$widget-heading-padding: $global-spacer-x-large !default;
$widget-heading-height: 40px !default;
$widget-heading-font-weight: 400 !default;
$widget-heading-font-size: $global-font-size-large !default;
$widget-content-padding: $global-spacer-x-large !default;
$widget-content-min-height: 17vh !default;
$widget-footer-padding: $global-spacer $global-spacer $global-spacer
  $global-spacer-x-large !default;
$widget-disabled-opacity: $global-opacity !default;


Widget Content:

- Padding - DONE

Widget Title:

Alignment?

Font styles

- size - DONE
- font-weight - DONE
- line-height - DONE
- color - DONE

Icon size & color - DONE

Spacing between text and icon - DONE

*/

async function widgetStyles(value) {
  widgetJSONObject = {
    widgets: {},
  };

  const widgetTitleVariants = value.Other.children.filter(
    (comp) => comp.name == '.widget-title'
  )[0].children;

  //   console.log(widgetTitleVariants);

  for (headerVariant of widgetTitleVariants) {
    if (headerVariant.name === 'Icon on Title=FALSE, Right Side=empty') {
      //   console.log(headerVariant);
      // font styles
      var widgetHeaderFontStyleID =
        headerVariant.children[0].children[0].children[1].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          widgetHeaderFontStyleID
        )
        .then((value) => {
          var fontTokenName = value.nodes[
            widgetHeaderFontStyleID
          ].document.name.toLowerCase();
          // font-size
          widgetJSONObject.widgets['header-font-size'] = {
            value: `{Web-typography.${fontTokenName}.fontSize.value}`,
          };
          // default font-weight -- HARD_CODED FOR NOW, NEED TO REVISE TOKENS
          widgetJSONObject.widgets['header-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
          // line-height
          widgetJSONObject.widgets['header-line-height'] = {
            value: `{Web-typography.${fontTokenName}.lineHeight.value}`,
          };
          // letter-spacing
          widgetJSONObject.widgets['header-letter-spacing'] = {
            value: `{Web-typography.${fontTokenName}.letterSpacing.value}`,
          };
        });
      // font color
      var widgetHeaderFontColorID =
        headerVariant.children[0].children[0].children[1].styles.fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          widgetHeaderFontColorID
        )
        .then((value) => {
          widgetJSONObject.widgets['header-font-color'] = {
            value: `{color.${value.nodes[
              widgetHeaderFontColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    if (headerVariant.name === 'Icon on Title=TRUE, Right Side=empty') {
      //   console.log(headerVariant.children[0].children[0]);
      //   console.log(headerVariant.children[0].children[0].children[0]);
      // icon spacing
      widgetJSONObject.widgets['header-icon-spacing'] = {
        value: `${headerVariant.children[0].children[0].itemSpacing}px`,
      };
      // icon size
      widgetJSONObject.widgets['header-icon-size'] = {
        value: `${headerVariant.children[0].children[0].children[0].size.x}px`,
      };
      // icon color
      var widgetHeaderIconColorID =
        headerVariant.children[0].children[0].children[0].children[0].styles
          .fill;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          widgetHeaderIconColorID
        )
        .then((value) => {
          widgetJSONObject.widgets['header-icon-color'] = {
            value: `{color.${value.nodes[
              widgetHeaderIconColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    if (headerVariant.name === 'Icon on Title=FALSE, Right Side=input') {
      widgetJSONObject.widgets['header-min-height'] = {
        value: `${headerVariant.size.y}px`,
      };
    }
  }

  const widgetVariants = value.Other.children.filter(
    (comp) => comp.name == 'widget'
  )[0].children;

  for (widgetVariant of widgetVariants) {
    if (
      widgetVariant.name ===
      'Icon on Title=FALSE, Right Side=empty, Content=placeholder, State=default'
    ) {
      //widget border styles
      //border-radius
      widgetJSONObject.widgets['border-radius'] = {
        value: `${widgetVariant.children[0].cornerRadius}px`,
      };
      //border-width
      //   console.log(variant.children[0].strokes);
      widgetJSONObject.widgets['border-style'] = {
        value: widgetVariant.children[0].strokes[0].type.toLowerCase(),
      };
      //border-style
      widgetJSONObject.widgets['border-width'] = {
        value: `${widgetVariant.children[0].strokeWeight}px`,
      };
      // border color
      // hard coded for now
      widgetJSONObject.widgets['border-color'] = {
        value: `rgba(0, 0, 0, 0.15)`,
      };

      // var widgetBorderColorTokenID = widgetVariant.children[0].styles.strokes;
      // widgetJSONObject.widgets['border-color'] = {
      //   value: await coreFigmaFunctions
      //     .getFigmaTokenNameByID(
      //       coreFigmaFunctions.figmaCredentials.figmaAPIKey,
      //       coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
      //       widgetBorderColorTokenID
      //     )
      //     .then(
      //       (value) =>
      //         `{color.${value.nodes[
      //           widgetBorderColorTokenID
      //         ].document.name.toLowerCase()}.value}`
      //     ),
      // };
      // widget padding
      widgetJSONObject.widgets['padding-x'] = {
        value: `${widgetVariant.children[0].paddingLeft}px`,
      };
      widgetJSONObject.widgets['padding-y'] = {
        value: `${widgetVariant.children[0].paddingTop}px`,
      };
    }
    if (
      widgetVariant.name ===
      'Icon on Title=FALSE, Right Side=icon button, Content=placeholder, State=default'
    ) {
      // widget header button icon size
      widgetJSONObject.widgets['header-button-icon-size'] = {
        value: `${widgetVariant.children[0].children[0].children[0].children[1].children[5].children[0].children[0].size.x}px`,
      };
    }
  }

  // console.log(widgetJSONObject);
  await fs
    .writeFile(
      '../properties/components/widget.json',
      JSON.stringify(widgetJSONObject)
    )
    .then(function () {
      console.log('widget.json created');
    });
}

exports.widgetStyles = widgetStyles;
