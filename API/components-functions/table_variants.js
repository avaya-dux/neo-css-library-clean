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


*/

async function tableStyles(value) {
  tableJSONObject = {
    table: {},
  };

  for (component of value.Table.children) {
    // TABLE ACTION ROW
    if (component.name === '')
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
  }

  // const tableVariants = value.Table.children.filter(
  //   (comp) => comp.type == 'COMPONENT_SET'
  // )[0];

  console.log(tableJSONObject);
}

exports.tableStyles = tableStyles;
