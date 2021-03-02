This is the program that generates the Neo UI Component library

This program is comprised of a collection of related modules that work together in various capacities to pull the UX Team's designs from our design software, Figma.

The salient elements of the source code file structure can be described as follows:

API --> These are the files associated with pulling the information related to our designs from Figma, process them, and converting them to the desired format across platforms. These are the most important files in the project.

components-functions --> This folder contains individual files related to each Component in Figma

figma-functions --> This folder contains information related to Figma's API itself, including authentication and file information. It also includes files generated each time we pull our Design Tokens, which are then processed as necessary.

icons-functions --> This folder contains files related to pulling our icons from Figma, generating the necessary icon font files and converting these into unicode values for use as CSS class name values.

tokens-functions --> This folder contains the individual files associated with pulling each of our Design Tokens.

firebase-functions --> This is a parallel development environment which represents the implementation of our Firebase server. It includes the functions for distributing our icon library as png/svg assets, as well as the code used to sign users up to our automated e-mail notification service.

fonts --> Includes all the relevant font and CSS files for our multi-lingual font support

neo --> This folder includes all the .scss files associated with the web version of our Neo UI Kit.

original-neo-styles --> The original, unaltered .css and .scss files as received by UX team as Neo v.2.x

scss-update --> The current collection of .scss files being used to generate each new iteration of our Neo UI Kit

neo_zip --> These are the files that are compressed and uploaded to our site for download each time a new version of Neo is released. Currently updated and compressed manually.

properties --> This folder contains the raw .json data generated from pulling our design information from Figma before it is run through style-dictionary and translated for each platform.

templates --> This folder contains misc. templates used when generating our design files, including the .css template for our icon library

//////// TO-DO -- address individual files in the project as necessary ////////

Explanation of npm scripts:

The following scripts, located in package.json, are responsible for generating our design system files. The critical ones are as follows:

icongen --> This script pulls and generates .css files from our icon library -- NOTE: there are some necessary files that are run manually and which need to be included in this script for it to be complete.
neo-update-site-fast --> This script generates a .css file from all the .scss files in the neo/scss-update folder and inserts them directly in our website file directory for rapid testing/updates

/////// TO-DO -- continue enumerating and explaining scripts

Draft explanation of order of operations when updating Neo UI library:

When updating to a new version of the Neo UI library, the following steps constitute the usual order of operations:

1. If a new Component is being created, a unique .js file is created in the /API/components-functions directory for the Component in question. This file will contain the code which pulls information from the relavant file in Figma
2. Once the necessary properties are pulled as .json files, add the necessary configuration info to /config.json and run 'node -r esm styleDicExt.js' to generate the necessary .scss files
3. Create the corresponding files and values in the /neo/scss-update folder -- these can be tested if the necessary HTML has been added to the '/updated-components' page on the website after running the 'neo-update-site-fast' script
4. The file created by the above script can be added to an appropriate distribution folder ex. neo/dist/3.18.0
5. Run 'postcss neo.css > neo.min.css' to create a minified version of the neo.css file for deployment
6. The resulting files should also be added to the /neo_zip folder, along with the updated icons .css file, compressed, and then added to the website

/////// TO-DO -- continue expanding on steps to update website

In case icons need to be pulled:

1. Run the 'icongen' script referenced above
   **_ Important note _** save the icon file before running the following commands - this will ensure it is formatted correctly
2. Run 'node -r esm icon-file-reader.js' in the API/icons-functions folder to retrieve the unicode for icons used directly in Neo's .scss files, and save them to a .json file. Note that you will have to run 'node -r esm styleDicExt.js' again to make sure the appropriate .scss file is generated.
3. Run 'node -r esm neo-icon-combine.js' in the root directory to copy the new icons .css file into the appropriate .scss file in the /neo/scss-update folder. Now the icons will be added to the Neo.css file each time this is generated.
4. As a second step, you will need to export the new icons from Figma in svg and png formats. These should be added to the appropriate sub-folder in the /resized-icons folder in the root directory, and then uploaded to the Firebase database along with the relevant .zip folders

//////// TO-DO -- continue writing out steps as necessary
