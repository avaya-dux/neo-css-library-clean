# how to generate icons

- Navigate to the `figma-API` sub-project folder from the repository root
- Make sure that you have a `.env` file with the necessary environment variables correctly defined, in this case:
  - FIGMA should be your individual [Figma Access Token](https://www.figma.com/developers/api#access-tokens)
  - eg: `FIGMA=figd_randomstringoflettersandnumbers`
- add new icon with unique ID in `./figma-API/icons-functions/icon-utility-files/icon-unicodes.js`
- From the command line, run the following: `yarn build-icons <<icon names here>>`, inserting the name of the icon you want to add, for example:
  - `yarn build-icons after-call-work`
  - `yarn build-icons after-call-work settings`
  - _NOTE_: this will pull the SVG file from Figma, you do not need to manually place the file on your machine
- go back to root (up one directory) and run `yarn all` to ensure all files are updated
- add new icon to: `staging/src/components/Icons/iconInfo.tsx`
- update [`neo-react` lib icons file](https://github.com/avaya-dux/neo-react-library/blob/main/src/utils/icons.ts)

## verifying that icons have been pulled and added successfully

- Verify that the correct `SVG` file has been added to `neo-css-library/css-library/style-dictionary/properties/assets/icons/svgs` folder
- Verify that `neo-css-library/css-library/neo/neo-scss/icons.scss` has been generated with the new icon names added
- run css-staging and view the Icons page to ensure that the proper icon was added

# how to update icons

- rename the icons in icons-unicode.js
- run build-icons script above to create SVG file
- remove SVG file of the old icon
- rename the icon entry in iconInfo.tsx
- update icon in: `staging/src/components/Icons/iconInfo.tsx`
