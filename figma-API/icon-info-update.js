const fs = require("fs").promises;

const { Confirm, Select } = require("enquirer");

const prettier = require("prettier");

const iconsArray = require("./icons-functions/icon-utility-files/iconInfo.json");

const iconCategories = [
  "navigation",
  "action",
  "account",
  "status",
  "communication",
  "alert",
  "content",
  "other",
  "editor",
  "file",
  "weather",
  "social",
];

async function updateIconInfoFile(icons) {
  const iconNames = iconsArray.map((icon) => icon.name);

  for (const icon of icons) {
    const bidirectional = new Confirm({
      name: "bidirectional",
      message: `Is ${icon} bidirectional?`,
    });

    const animated = new Confirm({
      name: "animated",
      message: `Is ${icon} animated?`,
    });

    const categories = new Select({
      name: "category",
      message: `What is the category of ${icon}?`,
      choices: iconCategories,
    });

    const isBidirectional = await bidirectional
      .run()
      .then((answer) => answer)
      .catch(console.error);

    const isAnimated = await animated
      .run()
      .then((answer) => answer)
      .catch(console.error);

    const category = await categories
      .run()
      .then((answer) => answer)
      .catch(console.error);

    const newIconInfoObject = {
      name: icon,
      bidirectional: isBidirectional,
      category: category,
      animated: isAnimated,
    };

    iconNames.push(icon);

    iconsArray.push(newIconInfoObject);
  }

  fs.writeFile(
    "./icons-functions/icon-utility-files/iconInfo.json",
    JSON.stringify(iconsArray),
    "utf-8"
  )
    .then(function () {
      console.info("iconInfo.json created");
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });

  fs.writeFile(
    "./icons-functions/icon-utility-files/iconInfo.js",
    `// this file is auto-generated, DO NOT modify it\n export const icons = ${prettier.format(
      JSON.stringify(iconsArray),
      { parser: "babel" }
    )}`,
    "utf-8"
  )
    .then(function () {
      console.info("iconInfo.js created");
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });

  fs.writeFile(
    "../neo-icons-npm-package/neo-icon-names-type.ts",
    prettier.format(
      `// this file is auto-generated, DO NOT modify it\n const iconNames = ${JSON.stringify(iconNames)} as const;
     \n export type IconNamesType = typeof iconNames[number]`,
      { parser: "babel-ts" }
    ),
    "utf-8"
  )
    .then(function () {
      console.info("neo-icon-names-type.ts created");
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}

updateIconInfoFile(process.argv.slice(2));
