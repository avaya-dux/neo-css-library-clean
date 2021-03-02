const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

///// TABLES /////

$table-background: - DONE
$table-button-margin: $global-spacer;
$table-padding: $token-table-padding !default;
$table-condensed-padding: $table-padding / 2 !default;
$table-color-scale: 5% !default;
$table-head-background: $token-table-header-default-background-color !default;
$table-head-hover: $table-head-background !default;
$table-row-hover: $token-table-row-hover-color !default;
$table-head-font-color: $global-text-color !default;
$table-border-width: $token-table-row-border-bottom-width !default;
$table-border: $table-border-width $token-table-row-border-bottom-style #c9c9c9 !default;
$table-striped-background: lighten($table-row-hover, 20%) !default;
$table-stripe: even !default;
$table-foot-background: $table-head-background !default;
$table-foot-row-hover: $table-head-hover !default;
$table-foot-font-color: $global-text-color !default;
$table-sortable-background-active: darken(
  $table-head-background,
  $table-color-scale
) !default;
$table-sortable-background-hover: $table-sortable-background-active !default;
$table-sortable-icon-size: $global-font-size-x-small !default;
$table-sortable-icon-margin-x: $global-spacer-large !default;
$table-sortable-icon-line-height: 24px !default;
// $table-editable-border: 3px solid $neo-active-green;
// $table-editable-bg-color: lighten($neo-presence-green, 45%);
$table-disabled-bg-color: $token-table-row-disabled-background-color !default;
$table-disabled-text-color: $token-table-row-disabled-default-color !default;
$table-disabled-clickable-color: $token-table-row-disabled-clickable-color !default;
$table-page-select-height: $token-table-pagination-count-height !default;
$table-page-select-width: $token-table-pagination-count-width !default;
$table-filter-button-color: $token-table-filter-button-color !default;
$table-date-picker-background-color: $token-table-datepicker-background-color !default;
$table-date-picker-font-color: $token-color-base-600 !default;
$table-sortable-ascending-icon: $token-icons-neo-icon-chevron-up !default;
$table-sortable-descending-icon: $token-icons-neo-icon-chevron-down !default;

 // th background color - table.background-color - DONE
 // th padding - DONE
 // th font styles - DONE
 // th min height - DONE
 // th border styles - DONE
 // th hover color - DONE

 // th filter multiselect font styles - DONE
 // th filter multiselect spacing - DONE
// th filter multiselect icon sizing & spacing - DONE

// tr disabled color
// tr border styles
// tr hover/active color
// tr active font weight

// td padding
// td link color

// nested table padding
// nested table border style
// nested table row background color
// nasted table inside row max height
// nested table row cell padding

// filters sheet header spacing
// filters sheet form padding
// filters sheet border style

// actions spacing

*/

async function tableStyles(value) {
  tableJSONObject = {
    table: {},
  };

  for (component of value.Table.children) {
    // TABLE ACTION ROW
    if (component.name === '.row-text-base') {
      // console.log(component);
      // table background
      var tableBackgroundColorTokenID = component.styles.fills;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          tableBackgroundColorTokenID
        )
        .then(
          (value) =>
            (tableJSONObject.table['background-color'] = {
              value: `{color.${value.nodes[
                tableBackgroundColorTokenID
              ].document.name.toLowerCase()}.value}`,
            })
        );
    }
    if (component.name === '.header-base') {
      // console.log(component.children[1]);
      // console.log(component.children[0]);
      // header cell padding
      tableJSONObject.table['header-cell-padding-x'] = {
        value: `${component.children[0].relativeTransform[0][2]}px`,
      };
      tableJSONObject.table['header-cell-padding-y '] = {
        value: `${component.children[0].relativeTransform[1][2]}px`,
      };
      // header cell font styles
      var headerFontTokenID = component.children[0].children[0].styles.text;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          headerFontTokenID
        )
        .then((value) => {
          var headerFontTokenName = value.nodes[
            headerFontTokenID
          ].document.name.toLowerCase();
          // header-font-size
          tableJSONObject.table['header-cell-font-size'] = {
            value: `{Web-typography.${headerFontTokenName}.fontSize.value}`,
          };
          // header-line-height
          tableJSONObject.table['header-cell-line-height'] = {
            value: `{Web-typography.${headerFontTokenName}.lineHeight.value}`,
          };
          // header-letter-spacing
          tableJSONObject.table['header-cell-letter-spacing'] = {
            value: `{Web-typography.${headerFontTokenName}.letterSpacing.value}`,
          };
          // header-font-weight
          tableJSONObject.table['header-cell-font-weight'] = {
            value: `{Web-typography.fontweight-regular.value}`,
          };
        });
      // header cell min height
      tableJSONObject.table['header-cell-min-height'] = {
        value: `${component.size.y}px`,
      };
      // header border styles
      // border width
      tableJSONObject.table['header-cell-border-width'] = {
        value: `${component.children[1].strokeWeight}px`,
      };
      // border style
      tableJSONObject.table['header-cell-border-style'] = {
        value: component.children[1].strokes[0].type.toLowerCase(),
      };
      // border color
      var headerCellBorderColorID = component.children[1].styles.stroke;
      await coreFigmaFunctions
        .getFigmaTokenNameByID(
          coreFigmaFunctions.figmaCredentials.figmaAPIKey,
          coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
          headerCellBorderColorID
        )
        .then((value) => {
          tableJSONObject.table['header-cell-border-color'] = {
            value: `{color.${value.nodes[
              headerCellBorderColorID
            ].document.name.toLowerCase()}.value}`,
          };
        });
    }
    if (component.name === 'column-header') {
      // console.log(component);
      for (variant of component.children) {
        if (
          variant.name ===
          'Type=text, Can Sort/Filter=TRUE, Filter Applied=FALSE, Sorting Applied=none, State=hover, Location=main'
        ) {
          // console.log(variant.children[0]);
          var headerCellHoverColorID = variant.children[0].styles.fills;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              headerCellHoverColorID
            )
            .then((value) => {
              tableJSONObject.table['header-cell-hover-color'] = {
                value: `{color.${value.nodes[
                  headerCellHoverColorID
                ].document.name.toLowerCase()}.value}`,
              };
            });
        }
      }
    }
    if (component.name === 'column-filter') {
      // console.log(component);
      for (variant of component.children) {
        if (variant.name === 'Type=alphabetical, Active=none') {
          // filter text styles
          var textElement =
            variant.children[0].children[0].children[1].children[1];
          // console.log(textElement);
          var filterFontTokenID = textElement.styles.text;
          await coreFigmaFunctions
            .getFigmaTokenNameByID(
              coreFigmaFunctions.figmaCredentials.figmaAPIKey,
              coreFigmaFunctions.figmaCredentials.varaintComponentsFileID,
              filterFontTokenID
            )
            .then((value) => {
              var filterFontTokenName = value.nodes[
                filterFontTokenID
              ].document.name.toLowerCase();
              // header-font-size
              tableJSONObject.table['filter-font-size'] = {
                value: `{Web-typography.${filterFontTokenName}.fontSize.value}`,
              };
              // header-line-height
              tableJSONObject.table['filter-line-height'] = {
                value: `{Web-typography.${filterFontTokenName}.lineHeight.value}`,
              };
              // header-letter-spacing
              tableJSONObject.table['filter-letter-spacing'] = {
                value: `{Web-typography.${filterFontTokenName}.letterSpacing.value}`,
              };
              // header-font-weight
              tableJSONObject.table['filter-font-weight'] = {
                value: `{Web-typography.fontweight-regular.value}`,
              };
            });
          // filter text spacing
          tableJSONObject.table['filter-padding-vertical'] = {
            value: `${textElement.relativeTransform[1][2]}px`,
          };
          // filter text margin
          const filterTextMarginBottom =
            textElement.relativeTransform[1][2] * 2;
          tableJSONObject.table['filter-text-margin-bottom'] = {
            value: `${filterTextMarginBottom}px`,
          };
        }
        if (variant.name === 'Type=alphabetical, Active=first') {
          // filter icon spacing
          const filterIconSpacing =
            variant.children[0].children[0].children[0].children[0]
              .relativeTransform[0][2] +
            variant.children[0].children[0].children[0].relativeTransform[0][2];
          tableJSONObject.table['filter-icon-spacing'] = {
            value: `${filterIconSpacing}px`,
          };
          // filter icon size
          tableJSONObject.table['filter-icon-size'] = {
            value: `${variant.children[0].children[0].children[0].children[0].size.x}px`,
          };
        }
      }
    }
  }

  // const tableVariants = value.Table.children.filter(
  //   (comp) => comp.type == 'COMPONENT_SET'
  // )[0];

  console.log(tableJSONObject);
}

exports.tableStyles = tableStyles;
