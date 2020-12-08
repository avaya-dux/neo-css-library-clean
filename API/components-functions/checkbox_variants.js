/*

Checkbox:

$checkbox-size: 16px !default;
$checkbox-background: $global-background !default;
$checkbox-checked-background: $token-checkbox-selected-background-color !default;
$checkbox-disabled-background: $token-checkbox-disabled-background-color !default;
$checkbox-icon-width: 6px !default;
$checkbox-icon-height: 9px !default;
$checkbox-icon-color: $global-background !default;
$checkbox-label-indent: $global-spacer-large !default;
$checkbox-font-size: $token-web-typography-web-tiny-body-font-size !default;
$checkbox-color: $token-color-base-100 !default;

$checkbox-border
$checkbox-border-radius

$checkbox-disabled-border?

*/

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
