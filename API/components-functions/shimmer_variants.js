const fs = require("fs").promises;
const coreFigmaFunctions = require("../figma-functions/core-figma-functions.js");

/*

shimmer component dimensions

4 components

1 rectangle

 - width


3 circles

- width/ height?

*/

async function shimmerStyles(value) {
  shimmerJSONObject = {
    shimmer: {},
  };

  const shimmerVariants = value.Indicator.children.filter(
    (child) => child.name === "shimmer"
  )[0].children;

  for (variant of shimmerVariants) {
    // rectangle shimmer component height
    if (variant.name === "Shape=rectangle, Circle Size=medium") {
      shimmerJSONObject.shimmer["rectangle-shimmer-height"] = {
        value: `${variant.size.y}px`,
      };
    }
    // small circle shimmer component size
    if (variant.name === "Shape=circle, Circle Size=small") {
      shimmerJSONObject.shimmer["small-circle-shimmer-height"] = {
        value: `${variant.size.y}px`,
      };
      shimmerJSONObject.shimmer["small-circle-shimmer-width"] = {
        value: `${variant.size.x}px`,
      };
    }
    // medium circle shimmer component size
    if (variant.name === "Shape=circle, Circle Size=medium") {
      shimmerJSONObject.shimmer["medium-circle-shimmer-height"] = {
        value: `${variant.size.y}px`,
      };
      shimmerJSONObject.shimmer["medium-circle-shimmer-width"] = {
        value: `${variant.size.x}px`,
      };
    }
    // large circle shimmer component size
    if (variant.name === "Shape=circle, Circle Size=large") {
      shimmerJSONObject.shimmer["large-circle-shimmer-height"] = {
        value: `${variant.size.y}px`,
      };
      shimmerJSONObject.shimmer["large-circle-shimmer-width"] = {
        value: `${variant.size.x}px`,
      };
    }
  }

  //   console.log(shimmerVariants);
  //   console.log(shimmerJSONObject);
  await fs
    .writeFile(
      "../properties/components/shimmerVariants.json",
      JSON.stringify(shimmerJSONObject)
    )
    .then(function () {
      console.log("shimmerVariants.json created");
    });
}

exports.shimmerStyles = shimmerStyles;
