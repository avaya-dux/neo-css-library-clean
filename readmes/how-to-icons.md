# how to add new icons and publish the standalone icons package

The "source of truth" for icons is Figma. Thus, we pull icon information from Figma to build them locally, type them, and then publish.

## one time setup

- Ensure your `neo-css-library/figma-API/.env.local` file has a valid [Figma Access Token](https://www.figma.com/developers/api#access-tokens).
- You must also have an NPMJS login and be a part of the [avaya organization](https://www.npmjs.com/settings/avaya/packages).

## how to add icons

- Navigate to the `figma-API` sub-project folder from the repository root
- `yarn build-icons {iconname}`: this will pull information about the specified icon and query you about how to categorize it. Examples:
  - `yarn build-icons after-call-work`
  - `yarn build-icons after-call-work settings`
- `yarn package-icons`: I (Joe) have no idea what this does... packages for publish maybe?
- Go back to root (up one directory).
- `yarn all`: build and test all packages
- Ensure that the following files have been updated appropriately:
  - `/neo-css-library/figma-API/icons-functions/icon-utility-files/icon-unicodes.js`
  - `/neo-css-library/figma-API/icons-functions/icon-utility-files/iconInfo.js`
  - `/neo-css-library/figma-API/icons-functions/icon-utility-files/iconInfo.json`: you will need to manually format this file
  - `/neo-css-library/css-library/neo/neo-scss/icons.scss`
- Verify that the correct `SVG` file(s) have been added/updated in: `neo-css-library/css-library/style-dictionary/properties/assets/icons/svgs`
- Update `css-library/neo/changelog.md`.
- Bump the package version number in the `neo-icons-npm-package/package.json` file (if necessary).

## how to update an icon

- remove the icon from:
  - `/neo-css-library/figma-API/icons-functions/icon-utility-files/icon-unicodes.js`
  - `/neo-css-library/figma-API/icons-functions/icon-utility-files/iconInfo.js`
  - `/neo-css-library/figma-API/icons-functions/icon-utility-files/iconInfo.json`
- remove SVG+PNG file of the old icon from:
  - `css-library/style-dictionary/properties/assets/icons/pngs`
  - `css-library/style-dictionary/properties/assets/icons/svgs`
- Navigate to the `figma-API` sub-project folder from the repository root
- Follow steps in "how to add icons"

## how to publish icons

We do not (currently) do releases for the icons package. Thus, you do not have to merge your PR into `main` before publishing.

*IMPORTANT NOTE*: the icon library is (in effect) only the typings for the icons, not the icons themselves. Thus, if you use _only_ the icon library, the icons will not show.

- Navigate to the `neo-icons-npm-package` sub-project folder from the repository root.
- `npm login`: On the command line, ensure that you are properly logged in to the NPM network.
- `npm publish`: Publish the new version of the `@avaya/neo-icons` package to NPM.

## post publish

- Update all projects that use the icons library.
  - CSS Staging: ensure that it's [Icons page](https://css-staging.netlify.app/icons/) and it's snapshots are updated.
  - Neo React Library: must publish Neo React after updating the icons so that the Design Portal can display the new icons.
  - Design Portal: must be updated _after_ Neo React Library and include updates from Neo Icons, Neo CSS, and Neo React. Ensure that it's [Icons page](https://design.avaya.com/icons) is updated.
