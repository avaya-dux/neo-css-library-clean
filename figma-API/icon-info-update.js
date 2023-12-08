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

  await fs
    .writeFile(
      "./icons-functions/icon-utility-files/iconInfo.json",
      JSON.stringify(iconsArray),
      "utf-8",
    )
    .then(function () {
      console.info("iconInfo.json created");
    })
    .catch((error) => {
      console.error(`Error from iconInfo.json: ${error}`);
    });

  const formattedIcons = await prettier.format(JSON.stringify(iconsArray), {
    parser: "babel",
  });

  await fs
    .writeFile(
      "./icons-functions/icon-utility-files/iconInfo.js",
      `// this file is auto-generated, DO NOT modify it\n export const icons = ${formattedIcons}`,
      "utf-8",
    )
    .then(function () {
      console.info("iconInfo.js created");
    })
    .catch((error) => {
      console.error(`Error from iconInfo.js: ${error}`);
    });

  const formattedIconNames = await prettier.format(JSON.stringify(iconNames), {
    parser: "babel",
  });

  const replacedString = formattedIconNames.replace("]", "] as const");

  fs.writeFile(
    "../neo-icons-npm-package/neo-icon-names-type.ts",
    `// this file is auto-generated, DO NOT modify it\n const iconNames = ${replacedString}
     \n export type IconNamesType = typeof iconNames[number]`,
    "utf-8",
  )
    .then(function () {
      console.info("neo-icon-names-type.ts created");
    })
    .catch((error) => {
      console.error(`Error from neo-icon-names-type.ts: ${error}`);
    });
}

updateIconInfoFile(process.argv.slice(2));
