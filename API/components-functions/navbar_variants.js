const fs = require('fs').promises;
const coreFigmaFunctions = require('../figma-functions/core-figma-functions.js');

/*

////////
Navbar
////////

for now, just pulling updated icon sizing and padding

- icon size (font size) - DONE
- icon padding - no need to specify, given height/width/centered icon?
- button width?

- also, hard-coded the button height and width as 100% for now
- need to pull correct navbar height eventually

*/

async function navbarStyles(value) {
  navbarJSONObject = {
    navbar: {},
  };
  await Promise.all(
    value.Navigation.children.map(async (child) => {
      if (child.name === 'nav-bar/action/unselected/default') {
        // console.log(child);
        // icon size (font size)
        var navbarIconSize = `${child.children[0].children[0].size.x}px`;
        // icon button width
        var iconButtonWidth = `${child.size.x}px`;
        return [navbarIconSize, iconButtonWidth];
      }
    })
  ).then(async (values) => {
    // console.log(values);
    var definedValues = values.filter((value) => value != undefined);
    // console.log(definedValues);
    navbarJSONObject.navbar['icon-size'] = { value: definedValues[0][0] };
    navbarJSONObject.navbar['button-width'] = { value: definedValues[0][1] };
  });
  // console.log(navbarJSONObject);
  await fs
    .writeFile(
      '../properties/components/navbar.json',
      JSON.stringify(navbarJSONObject)
    )
    .then(function () {
      console.log('navbar.json created');
    });
}

exports.navbarStyles = navbarStyles;
