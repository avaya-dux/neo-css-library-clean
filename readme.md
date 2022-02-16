# This is a document to explain how to contribute to the CSS for Neo

The purpose of this document is to explain, in broad strokes, the process for adding to Neo's base CSS library.

This process is flexible and open to discussion/amendments per consensus.

## Basic information

Neo's CSS is compiled from SCSS

The SCSS files are contained in the **neo/neo-scss** folder

The SCSS files import the necessary variables for each Component from the **/generated-styles/scss** folder, which contains all the .scss files generated from the information pulled for each Component from Figma

**Note that these files should not be edited directly**

## Particular files of note:

The most important file to note in the **/neo-scss folder** is 'variables.scss'

This file contains all the variables that are used throughout the rest of the .scss files for each Component

These are then referenced in each separate .scss file as necessary

the **/themes** folder contains alternate versions of the colour variables for use with light, dark, and dynamic colour modes

the **/tokens** folder contains code to expose individual design tokens as CSS variables

## A note regarding CSS class names

We try as much as possible to stick with B.E.M. notation for our CSS files

[Block Element Modifier](http://getbem.com/) is a syntax in which to write CSS classes, which generally functions as follows:

```CSS
.block {}
.block__element {}
.block--modifier {}`
```

## Compiling the SCSS to CSS

Currently, the .scss files are compiled into CSS using `node-sass`, a 3rd-party dep that runs via npm script

In the package.json, you will find the `update-site` script, which is used to output the Neo.css file directly into the directory for our website on your local machine

The script should be called as follows: `PATHTOPORTAL=<<path to root directory of site on your local machine/src/global-styles/neo.css>> npm run update-site` ex. `PATHTOPORTAL=../Avaya_Portal_Nxt_Gen/src/global_styles/neo.css npm run update-site`

The purpose of this is to be able to test changes to the CSS quickly

Once satisfied with the changes, copy the Neo.css file back from the website and run the 'postcss' command in Terminal to minify the Neo.css file, as follows

`postcss neo.css > neo.min.css`

Both the original and minified files are then added to the appropriate branch in the repository for our Neo npm package, located [here](https://github.com/zang-cloud/neo-npm-package)

Afterwards, they are documented as necessary in the Changelog and then published to npm

## Adding icons to the CSS library

Although icons are included in the Neo CSS library as a font-family, the process to add them is slightly different and includes several manual steps, as follows:

In the **figma-API/** folder in **design-system-functions.js**, input the name of the icons to be pulled from Figma ex. `layout-immersive`,

Then, in **figma-API/icons-functions/icon-css-generator.js**, add a unique value for the unicode to be associated with the icon in question in the `unicodes` cost ex. `"layout-immersive": 0xf3e9`

Afterwards, run the `pull-icons` script from terminal as follows: `npm run pull-icons`

Then, once the script completes, you should be able to run the `update-site` script following the instructions above to have the icons added to Neo.css

## Contribution process suggestions/to-dos

1. Discuss in more detail the role of individual .scss files
2. Discuss the process by which code should be committed/tested for review?
3. Discuss how to coordinate changes to the base CSS library with work to do on the React Components
