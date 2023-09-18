## how to publish
​
### pre-publish checks (TEMP)
​
1. ensure that you have pulled the latest from the `main` branch and are working from it
2. ensure that you have all necessary dependencies installed -- run `yarn all` if necessary
3. ensure that the `neo/changelog.md` is up to date (will be deprecated in future releases)
​
- - look back through the last few commits into the `main` branch to ensure that the `neo/changelog.md` was updated with every commit (as appropriate)
​
### publish steps
​
from the root of the directory
​
1. update `neo-npm-package/package.json` version number in main branch
2. `npm login`: to ensure that you are properly logged in to the NPM network
3. run the following command `yarn build:for-publish` to build a production version of neo.css in the folder `neo-npm-package`, as well as all supporting files
4. Ensure all supporting files exist (`colors/*`, `fonts/*`, `icons/*`) inside neo-npm-package/neo/dist/css
5. copy-paste the contents of `css-library/neo/changelog.md` to `neo-npm-package/CHANGELOG.md`
6. `cd neo-npm-package`: navigate to the root of the packaging sub-project
7. `npm pack`: packages the contents of `neo-npm-package` into a .tgz (delete previous .tgz files)
8. `npm publish`: creates and publishes a tarball (.tgz) to our registry
​
### post-publish steps
​
You can check that the package was properly published by viewing it on NPMJS
​
- [link to registry](https://registry.npmjs.org/@avaya%2fneo): api call, returns JSON, no cache
- [link to npmjs page](https://www.npmjs.com/package/@avaya/neo): our page on NPMJS, is on a 60min cache
​
If you made a mistake, you can simply `unpublish` the package via
​
- `npm unpublish @avaya/neo@<version>`
- - [see NPMJS docs](https://docs.npmjs.com/cli/v8/commands/npm-unpublish) for further details on unpublishing
​
### add release and tag to github
​
Once that is complete, the next step is to add the release to our GitHub
​
1. navigate to our [GitHub releases page](https://github.com/avaya-dux/neo-css-library/releases)
2. make sure that you have merged any changes resulting from all previous steps into `main`
3. click: "Draft a new release" (top right corner)
4. choose tag (or create a new tag on publish), using format `vX.X.X`
5. target `main` branch
6. add title using format: "v0.2.0 (Jan 18th 2022)"
7. Copy Paste contents from appropriate version in `neo-npm-package/CHANGELOG.md` to release notes
​
-- **IMPORTANT**:  For the step above please make sure you go through and manually add the correct formatting( notes, backticks for code/class names, and JIRA tickets), following the examples from [previous releases](https://github.com/avaya-dux/neo-css-library/releases/tag/v3.66.0) as necessary.
​
8. attach the binary generated from when you ran `npm pack` above (tgz file)
9. click: "Publish release"
​
### add documentation to the Design Portal
​
Once the publishing is completed, we must then update the Design Portal with an updated ZIP file
​
- TODO: improve these steps as they're... not great...
​
1. navigate to the root of the css-library project
2. create (verify existince of) `neo/neo_zip` folder exists
3. copy over the contents of the sub-project folder `neo-npm-package` into the `neo/neo_zip` folder
4. `node neo/neo-file-archiver.js`: generate the zip file
​
- - **TEMP**: on MacOS, you can right click on the `neo-npm-package` folder in Finder, and choose 'Compress "neo-npm-package"' from the contextual menu for the same result; then remove extraneous files and folders added by MacOS:

``` 
        zip -d neo-npm-package.zip __MACOSX/\*
        zip -d neo-npm-package.zip \*/.DS_Store
```
- - **TEMP**: if you do this, make sure you rename the .zip file to `neo.zip` before proceeding
​
5. go to the design portal project
6. in this project, make sure you pull latest from `develop` branch and are working from it
7. delete the existing zip file (at `static/documents/neo.zip`)
8. add newly created zip file to that same location
​
9. go to `src/site_components/constants/version_number.js`
10. update the `neoLatestVersion` variable to the latest version number and update the `lastest` field of the `timestamps` variable

​
11. update `package.json` to use the latest version of the css-library (`@avaya/neo`); run `npm install --force` in design portal to update `package-lock.json`
12. open a PR into `develop`, merge, then open a PR into `main` and merge. When this second PR is merged the site will be deployed to production.
​
- - _IMPORTANT NOTE:_ do _not_ skip this step, it is imperitive that we update the Design Portal with the latest changes _at the same time_ as we update the css-library
​
### make "Post" in Avaya Spaces Space "[Neo Releases](https://spaces.avayacloud.com/spaces/63dc43746489f073ae069fca)"
​
- Navigate to [Neo Releases](https://spaces.avayacloud.com/spaces/63dc43746489f073ae069fca)
- Click "New Post"
- Title: Changelog Updates
- Description: add version and link to Design Portal Changelog page
​
### make sure version is marked as 'released' in JIRA
​
- **TEMP**: Navigate to the [NEO CSS Framework JIRA project versions page](https://jira.forge.avaya.com/projects/NEO/versions/), find and click into the version you are publishing, mark it as 'Released' and date the release as necessary.
​
- - Note: If you do not find the version that you are publishing among those listed, or if you have any other issues with the above step, please ping Mo or Jim
