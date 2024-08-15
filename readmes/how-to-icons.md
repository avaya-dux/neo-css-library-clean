# how to add new icons and publish the standalone icons package

The "source of truth" for icons is Figma. Thus, we pull icon information from Figma to build them locally, type them, and then publish.

## one time setup

- Ensure your `neo-css-library/figma-API/.env.local` file has a valid [Figma Access Token](https://www.figma.com/developers/api#access-tokens). The entry should be:
  - FIGMA=your-token-string-goes-here
- You must also have an NPMJS login and be a part of the [avaya organization](https://www.npmjs.com/settings/avaya/packages).

## how to add icons

- Make sure you are synced up to latest main branch and create a new branch
- In `staging/src/components/icons/Icons.tsx` add the new icons names to the newIcons string array.
  - Example: `const newIcons = ["cherry-pick", "global-variables", "select-single-condition"];`
- `cd figma-API`: Navigate to the `figma-API` sub-project folder from the repository root
- `yarn build-icons {iconname}`: this will pull information about the specified icon and query you about how to categorize it. Examples:
  - `yarn build-icons after-call-work`
  - `yarn build-icons after-call-work settings`
- `yarn package-icons`: This generates the icon data for the neo-css and neo-icons
- `yarn update-icon-info`: This generates/updates the TS icons file `neo-icons-npm-package/neo-icon-names-type.ts`
- Format file: `~/figma-API/icons-functions/icon-utility-files/iconInfo.json`
- `cd ../`: Go back to root (up one directory)
- `yarn all`: build and test all packages
- Ensure that the following files have been updated appropriately:
  - `/neo-css-library/figma-API/icons-functions/icon-utility-files/icon-unicodes.js`
  - `/neo-css-library/figma-API/icons-functions/icon-utility-files/iconInfo.js`
  - `/neo-css-library/figma-API/icons-functions/icon-utility-files/iconInfo.json`: this is the file you need to manually format (shirt + cmd + f)
  - `/neo-css-library/css-library/neo/neo-scss/icons.scss`
- Verify that the correct `SVG` file(s) have been added/updated in: `neo-css-library/css-library/style-dictionary/properties/assets/icons/svgs`
- Update `css-library/neo/changelog.md`.
- Bump the package version number in the `neo-icons-npm-package/package.json` file (if necessary).
- Update CSS Staging with new icons package version (`staging/package.json`).
- Open CSS Staging in localhost and confirm that the new icon is displayed correctly.
- Update Playwright's Icon page snapshots.

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

*IMPORTANT NOTE*: the icon library is (in effect) only the typings for the icons, not the icons themselves. Thus, if you use *only* the icon library, the icons will not show.

### build steps

> If you have just completed the "how to add icons" instructions, you can skip these "build steps" directions (as they are also done as part of the "how to add icons" instructions) and go straight to the "publish steps" directions.

- Navigate to the root of the project
- `yarn all`: build all the things
- `cd ./figma-API`: Navigate to Figma API sub-project
- `yarn package-icons`: This generates the icon data for the neo-css and neo-icons
- `yarn update-icon-info`: This generates/updates the TS icons file `neo-icons-npm-package/neo-icon-names-type.ts`

### publish steps

- Navigate to the `neo-icons-npm-package` sub-project folder from the repository root.
- `npm publish`: Publish the new version of the `@avaya/neo-icons` package to NPM.

## post publish

- Update all projects that use the icons library.
  - CSS Staging: ensure that it's [Icons page](https://css-staging.netlify.app/icons/) and it's snapshots are updated.
  - In `staging/package.json` update the @avaya/neo-icons devDependency so it matches the version that you just published.
  - CD to staging subfolder and run yarn install to get the latest icons. Then follow the steps on the how-to-publish.md document to publish the neo-css-library.
  - Neo React Library: must publish Neo React after updating the icons so that the Design Portal can display the new icons.
    - IMPORTANT: note that `neo-icons` is only the type definitions, and `neo-css` is the actual icons. Thus, if you want `neo-react` to have both the new types and icons, you must publish and import both libraries.
  - Design Portal: must be updated *after* Neo React Library and include updates from Neo Icons, Neo CSS, and Neo React. Ensure that it's [Icons page](https://design.avaya.com/icons) is updated.
    - You'll also need to update the Design Portal's `neo-icons.zip`, which is the file served when the user chooses to manually download the icons. Here are the steps:
      - In the Neo CSS Library, compress the `icons` folder: `css-library/style-dictionary/properties/assets/icons`
      - Rename the compressed file to: `neo-icons.zip`
      - Move that file to the Design Portal by replacing the file with the same name in the `public` folder.
      - Ensure that your PR with this update includes the information about what was updated as the file update alone will not inform the reviewer.
