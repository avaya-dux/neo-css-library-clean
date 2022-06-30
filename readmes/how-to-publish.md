## how to publish

### pre-publish checks (TEMP)

- ensure that the `neo/changelog.md` is up to date (will be deprecated in future releases)
- - look back through the last few commits into the `main` branch to ensure that the `neo/changelog.md` was updated with every commit (as appropriate)

### publish steps

from the root of the directory

- update `neo-npm-package/package.json` version number
- `npm login`: to ensure that you are properly logged in to the NPM network
- `yarn workspace css-library build:for-publish`: to build a production version of the library in the folder `neo-npm-publish`
- - **TEMP**: duplicate file and rename to `neo.min.css`
- - **TEMP**: format `neo.css`
- - **TEMP**: ensure all supporting files exist (`colors/*`, `fonts/*`, `icons/*`)
- copy-paste the contents of `css-library/neo/changelog.md` to `neo-npm-package/CHANGELOG.md`
- - *DO NOT* check-in this change to `CHANGELOG.md`
- `cd neo-npm-package`: navigate to the root of the packaging sub-project
- `npm pack`: packages the contents of `neo-npm-package` into a tarball
- `npm publish`: creates and publishes a tarball to our registry

### post-publish steps

You can check that the package was properly published by viewing it on NPMJS
- [link to registry](https://registry.npmjs.org/@avaya%2fneo): api call, returns JSON, no cache
- [link to npmjs page](https://www.npmjs.com/package/@avaya/neo): our page on NPMJS, is on a 60min cache

If you made a mistake, you can simply `unpublish` the package via
- `npm unpublish @avaya/neo@<version>`
- - [see NPMJS docs](https://docs.npmjs.com/cli/v8/commands/npm-unpublish) for further details on unpublishing

### add release and tag to github

Once that is complete, the next step is to add the release to our GitHub
- navigate to our [GitHub releases page](https://github.com/avaya-dux/neo-css-library/releases)
- click: "Draft a new release" (top right corner)
- choose tag (or create a new tag on publish), using format `vX.X.X`
- target `main` branch
- add title using format: "v0.2.0 (Jan 18th 2022)"
- click: "Auto-generate release notes"
- from the root of the `neo-npm-package` folder (`neo-css-library/neo-npm-package`), run `npm pack`
- attach the binary generated from the "pack" (tgz file)
- click: "Publish release"

### add documentation to the Design Portal

Once the publishing is completed, we must then update the Design Portal with an updated ZIP file
- TODO: improve these steps as they're... not great...
- navigate to the root of the css-library project
- create (verify existince of) `neo/neo_zip` folder exists
- copy over the contents of the sub-project folder `neo-npm-package` into the `neo/neo_zip` folder
- `node neo/neo-file-archiver.js`: generate the zip file
- `npm view @avaya/neo time --json`: get the timestamp of the latest published package
- - copy the date+hour+min, eg: `2022-06-01T19:20`
- go to the design portal project
- delete the existing zip file (at `static/documents/neo_zip*.zip`)
- add newly created zip file to that same location
- go to `src/site_components/constants/version_number.js`
- - add the next version
- - add the datetime in the same format
- - update the `latest` key
- - update the `neoLatestVersion` variable
- copy over changelog updates from the css-library into the design portal file `neo-design-portal/src/docs/whats-new/css-changes.mdx`
- - be sure to use the same styling as currently exists in this file
- - NOTE: we _will_ be adding scripts to take care of most (hopefully all :crossed_fingers:)
- update `package.json` (and `package-lock.json`) to use the latest version of the css-library (`@avaya/neo`)
- open a PR into `develop`, merge, then open a PR into `main` and merge
- - *IMPORTANT NOTE:* do _not_ skip this step, it is imperitive that we update the Design Portal with the latest changes _at the same time_ as we update the css-library
