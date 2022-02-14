# This is a document to explain how to contribute to the CSS for Neo

The purpose of this document is to explain, in broad strokes, the process for adding to Neo's base CSS library.

This process is flexible and open to discussion/amendments per consensus.

## Basic information

Neo's CSS is compiled from SCSS

The SCSS files are contained in the **neo/scss-update** folder

The SCSS files import the necessary variables for each Component from the **/build/scss** folder, which contains all the .scss files generated from the information pulled for each Component from Figma

**Note that these files should not be edited directly**

## Particular files of note:

The most important file to note in the **/scss-update folder** is 'variables.scss'

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

Currently, the .scss files are compiled into CSS using 'node-sass', a 3rd-party dep that runs via npm script

In the package.json, you will find the 'neo-update-site-fast' script, which is used to output the Neo.css file directly into the directory for our website on my local machine

The purpose of this is to be able to test changes to the CSS quickly

Once satisfied with the changes, the Neo.css file is copied back from the website into the appropriate release version folder inside the neo/dist/ folder

Then, the 'postcss' command is run in Terminal to minify the Neo.css file, as follows

`postcss neo.css > neo.min.css`

These files are then added to the appropriate branch in the repository for our Neo npm package, located [here](https://github.com/zang-cloud/neo-npm-package)

Afterwards, they are documented as necessary in the Changelog and then published to npm

## Miscellaneous notes

Note that the process for adding icons to Neo is different than what is described here and should be discussed seperately as necessary

Also note that, as mentioned above, this process only involves making changes to CSS properties which are not pulled directly from Figma. The process by which this is done is also different than what is described here and should be discussed seperately as necessary

## Contribution process suggestions/to-dos

1. Discuss in more detail the role of individual .scss files
2. Discuss the process by which code should be committed/tested for review?
3. Discuss how to coordinate changes to the base CSS library with work to do on the React Components
