const fs = require("fs").promises;

const path = require("path");

const webfontsGenerator = require("webfonts-generator");

const Handlebars = require("handlebars");

const replace = require("./icon-utility-files/icon-replacement-string");
const replacelib = require("replace-in-file");

const prettier = require("prettier");

const unicodes = require("./icon-utility-files/icon-unicodes.js").unicodes;

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  var amendedArg = arg1.replace(replace.stringsToReplace, "");

  return amendedArg === arg2 ? options.fn(this) : options.inverse(this);
});

const buildDir = "../css-library/generated-styles/css/";

// Code to generate .css file for icons -- THIS CODE TO BE RUN AFTER ICONGEN SCRIPT

const generateIcons = async () => {
  const styleDictionaryDir = path.resolve(
    __dirname,
    "../../css-library/style-dictionary"
  );

  let iconsSVGDir = [];

  try {
    iconsSVGDir = await fs.readdir(
      `${styleDictionaryDir}/properties/assets/icons/svgs`
    );
  } catch (error) {
    console.log(`Reading icon SVGs file directory failed with error: ${error}`);
  }
  const iconsSVGFiles = iconsSVGDir.map(
    (file) => `${styleDictionaryDir}/properties/assets/icons/svgs/${file}`
  );

  webfontsGenerator(
    {
      files: iconsSVGFiles,
      dest: buildDir,
      fontName: "updated-neo-icons",
      types: ["woff"],
      cssTemplate: `${styleDictionaryDir}/templates/css.hbs`,
      templateOptions: {
        classPrefix: "neo-icon-",
      },
      html: false,
      normalize: true,
      fontHeight: 1000,
      codepoints: unicodes,
    },
    async function (error) {
      if (error) {
        console.log(`webFontsGenerator failed with error: ${error}`);
        return;
      }

      try {
        await fs.unlink(`${buildDir}/updated-neo-icons.svg`);
        await fs.unlink(`${buildDir}/updated-neo-icons.ttf`);

        const CSSFileDir = `${buildDir}/updated-neo-icons.css`;

        const regEx = new RegExp("replaceMe", "g");

        const base64FileBuffer = await fs.readFile(
          `${buildDir}/updated-neo-icons.woff`
        );

        const contentsInBase64 = await base64FileBuffer.toString("base64");

        const replaceSource = {
          files: `${buildDir}/updated-neo-icons.css`,
          from: regEx,
          to: `url(data:application/font-woff;base64,${contentsInBase64.toString()}) format('woff')`,
        };

        const replaceResults = await replacelib(replaceSource);

        console.log("Replacement results:", replaceResults);

        const prettierConfig = await prettier.resolveConfig(CSSFileDir);

        const iconsCSSFile = await fs.readFile(CSSFileDir);

        await fs.writeFile(
          CSSFileDir,
          await prettier.format(iconsCSSFile.toString(), {
            ...prettierConfig,
            filepath: CSSFileDir,
          })
        );

        const iconsScssFile = "../../css-library/neo/neo-scss/icons.scss";
        await fs.writeFile(
          path.resolve(__dirname, iconsScssFile),
          await prettier.format(iconsCSSFile.toString(), {
            ...prettierConfig,
            filepath: path.resolve(__dirname, iconsScssFile),
          })
        );

        await fs.unlink(`${buildDir}/updated-neo-icons.woff`);
        await fs.unlink(`${buildDir}/updated-neo-icons.css`);

        console.log("icons successfully generated");
      } catch (error) {
        console.log(`webFontsGenerator callback failed with error: ${error}`);
      }
    }
  );
};

generateIcons();
