## how to publish

### pre-publish checks (TEMP)

1. ensure that you have pulled the latest from the `main` branch and are working from it
2. ensure that the `neo/changelog.md` is up to date (will be deprecated in future releases)

- - look back through the last few commits into the `main` branch to ensure that the `neo/changelog.md` was updated with every commit (as appropriate)

### publish steps

from the root of the directory

1. update `neo-npm-package/package.json` version number in main branch
2. `npm login`: to ensure that you are properly logged in to the NPM network
3. run the following command `yarn workspace css-library build:for-publish` to build a production version of neo.css in the folder `neo-npm-package`

- - **TEMP**: duplicate `neo.css` file and rename to `neo.min.css`
- - **TEMP**: format `neo.css` to unminify it
- - **TEMP**: move `neo.css`, `neo.min.css` and `neo.css.map` to neo/dist/css/neo (will ovewrite neo.css and neo.css.map)
- - **TEMP**: ensure all supporting files exist (`colors/*`, `fonts/*`, `icons/*`) inside neo/dist/css (get files from Mo)

4. copy-paste the contents of `css-library/neo/changelog.md` to `neo-npm-package/CHANGELOG.md`

- - _DO NOT_ check-in this change to `neo-npm-package/CHANGELOG.md`

5. `cd neo-npm-package`: navigate to the root of the packaging sub-project
6. `npm pack`: packages the contents of `neo-npm-package` into a tarball
7. `npm publish`: creates and publishes a tarball to our registry

### post-publish steps

You can check that the package was properly published by viewing it on NPMJS

- [link to registry](https://registry.npmjs.org/@avaya%2fneo): api call, returns JSON, no cache
- [link to npmjs page](https://www.npmjs.com/package/@avaya/neo): our page on NPMJS, is on a 60min cache

If you made a mistake, you can simply `unpublish` the package via

- `npm unpublish @avaya/neo@<version>`
- - [see NPMJS docs](https://docs.npmjs.com/cli/v8/commands/npm-unpublish) for further details on unpublishing

### add release and tag to github

Once that is complete, the next step is to add the release to our GitHub

1. navigate to our [GitHub releases page](https://github.com/avaya-dux/neo-css-library/releases)
2. make sure that you have merged any changes resulting from all previous steps into `main`
3. click: "Draft a new release" (top right corner)
4. choose tag (or create a new tag on publish), using format `vX.X.X`
5. target `main` branch
6. add title using format: "v0.2.0 (Jan 18th 2022)"
7. click: "Auto-generate release notes"
8. attach the binary generated from when you ran `npm pack` above (tgz file)
9. click: "Publish release"

### add documentation to the Design Portal

Once the publishing is completed, we must then update the Design Portal with an updated ZIP file

- TODO: improve these steps as they're... not great...

1. navigate to the root of the css-library project
2. create (verify existince of) `neo/neo_zip` folder exists
3. copy over the contents of the sub-project folder `neo-npm-package` into the `neo/neo_zip` folder
4. `node neo/neo-file-archiver.js`: generate the zip file

- - **TEMP**: on MacOS, you can right click on the `neo-npm-package` folder in Finder, and choose 'Compress "neo-npm-package"' from the contextual menu for the same result
- - **TEMP**: if you do this, make sure you rename the .zip file to `neo.zip` before proceeding

5. `npm view @avaya/neo time --json`: get the timestamp of the latest published package

- - copy the date+hour+min, eg: `2022-06-01T19:20`

6. go to the design portal project
7. in this project, make sure you pull latest from `develop` branch and are working from it
8. delete the existing zip file (at `static/documents/neo_zip*.zip`)
9. add newly created zip file to that same location
10. go to `src/site_components/constants/version_number.js`

- - add the next version
- - add the datetime in the same format
- - update the `latest` key
- - update the `neoLatestVersion` variable

10. copy over changelog updates from the css-library into the design portal file `neo-design-portal/src/docs/whats-new/css-changes.mdx`

- - be sure to use the same styling as currently exists in this file
- - make sure you remove the `latestVersion` prop from the previous `ChangelogMarkdownComponent` and add it to the newest
- - because .mdx files require very specific spacing, make sure there is a space after the opening `ChangelogMarkdownComponent` tag and before the closing tag
- - NOTE: we _will_ be adding scripts to take care of most (hopefully all :crossed_fingers:)

11. update `package.json` to use the latest version of the css-library (`@avaya/neo`); run `npm install --force` in design portal to update `package-lock.json`
12. open a PR into `develop`, merge, then open a PR into `main` and merge. When this second PR is merged the site will be deployed to production.

- - _IMPORTANT NOTE:_ do _not_ skip this step, it is imperitive that we update the Design Portal with the latest changes _at the same time_ as we update the css-library
