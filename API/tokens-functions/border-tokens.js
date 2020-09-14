const fs = require('fs').promises;

// function to grab border radius styles

async function pullBorderRadiusTokens(objectTree) {
  // we initialize a JSON Object to hold our styles

  const borderRadiiJSONObj = {
    borderRadius: {},
  };

  // we parse through the Figma file tree and filter for border radius styles

  const borderRadius = objectTree.document.children.filter((child) => {
    return child.name === 'Border Radius';
  });

  // the border radius styles are located as children of the Figma Border Radius document page

  borderRadius[0].children.forEach((child) => {
    // we grab the style name
    var name = child.name;

    // we skip over Notes
    if (name === 'Note') {
      return;
    }

    // we check whether the radius value is 100 as we need to append the '%' sign manually
    if (child.cornerRadius == 100) {
      // we also replace the 'border-radius-' from the name as it is already included in the JSON Object
      borderRadiiJSONObj.borderRadius[name.replace('border-radius-', '')] = {
        value: `${child.cornerRadius}%`,
      };
    } else {
      borderRadiiJSONObj.borderRadius[name.replace('border-radius-', '')] = {
        value: `${child.cornerRadius}px`,
      };
    }
  });

  await fs
    .writeFile(
      '../properties/borderRadiusStyles.json',
      JSON.stringify(borderRadiiJSONObj)
    )
    .then(() => {
      console.log('borderRadius.json created');
    })
    .catch((error) => {
      console.log(error);
    });
}

// function to grab border width, style and color

async function pullBorderTokens(objectTree) {
  // we initialize a JSON Object to hold our styles
  const borderJSONObj = {
    border: {},
  };

  // we parse through the Figma file tree and filter for border styles
  const borders = objectTree.document.children.filter((child) => {
    return child.name === 'Border';
  });

  // the border styles are located as children of the Figma Border Radius document page

  borders[0].children.forEach((child) => {
    // we grab the style name
    var name = child.name;

    // we skip over Notes
    if (name === 'Note') {
      return;
    }

    // we check for the border style as this has to be inputed manually
    // we also connect the border color to the appropriate token -- in this case base/1000
    if (name.includes('dotted')) {
      // we also replace the 'border-' from the name as it is already included in the JSON Object
      borderJSONObj.border[name.replace('border-', '')] = {
        borderWidth: { value: `${child.strokeWeight}px` },
        borderStyle: { value: 'dotted' },
        borderColor: { value: '{color.base/1000.value}' },
      };
    } else {
      borderJSONObj.border[name.replace('border-', '')] = {
        borderWidth: { value: `${child.strokeWeight}px` },
        borderStyle: { value: 'solid' },
        borderColor: { value: '{color.base/1000.value}' },
      };
    }
  });

  await fs
    .writeFile('../properties/borderStyles.json', JSON.stringify(borderJSONObj))
    .then(() => {
      console.log('borderStyles.json created');
    })
    .catch((error) => {
      console.log(error);
    });
}

exports.pullBorderRadiusTokens = pullBorderRadiusTokens;
exports.pullBorderTokens = pullBorderTokens;
