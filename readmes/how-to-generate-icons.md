# how to generate icons

- Navigate to the `figma-API` sub-project folder from the repository root
- Make sure that you have a `.env` file with the necessary environment variables correctly defined, in this case:
  - FIGMA should be your individual Figma API key
- From the command line, run the following: `npm run build-icons <<icon names here>>`, inserting the name of the icon you want to add, for example:
  - `npm run build-icons after-call-work`
  - `npm run build-icons after-call-work settings`

# how to rename icons

- rename the icons in icons-unicode.js
- run build-icons script above to create SVG file
- remove SVG file of the old icon
- rename the icon entry in iconInfo.tsx

## verifying that icons have been pulled and added successfully

- Verify that the correct icon name and unicode value have been added to `neo-css-library/figma-api/icons-functions/icon-utility-files/icon-unicodes.js`
- Verify that the correct `SVG` file has been added to `neo-css-library/css-library/style-dictionary/properties/assets/icons/svgs` folder
- Verify that `neo-css-library/css-library/neo/neo-scss/icons.scss` has been generated with the new icon names added
