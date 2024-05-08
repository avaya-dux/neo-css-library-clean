## how to publish neo-css

### pre-publish checks (TEMP)

1. ensure that you have pulled the latest from the `main` branch and are working from it
2. ensure that you have all necessary dependencies installed -- run `yarn all` if necessary
3. ensure that the `neo/changelog.md` is up to date (will be deprecated in future releases)
  - look back through the last few commits into the `main` branch to ensure that the `neo/changelog.md` was updated with every commit (as appropriate)


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
7. `npm publish`: creates and publishes a tarball (.tgz) to our registry


### post-publish steps
​
You can check that the package was properly published by viewing it on NPMJS
​
- [link to registry](https://registry.npmjs.org/@avaya%2fneo): api call, returns JSON, no cache
- [link to npmjs page](https://www.npmjs.com/package/@avaya/neo): our page on NPMJS, is on a 60min cache

If you made a mistake, you can simply `unpublish` the package via  ​
- `npm unpublish @avaya/neo@<version>`
  - [see NPMJS docs](https://docs.npmjs.com/cli/v8/commands/npm-unpublish) for further details on unpublishing


### add release and tag to github
​
Once that is complete, the next step is to add the release to our GitHub

1. navigate to our [GitHub releases page](https://github.com/avaya-dux/neo-css-library/releases)
2. make sure that you have merged any changes resulting from all previous steps into `main`
3. click: "Draft a new release" (top right corner)
4. choose tag (or create a new tag on publish), using format `vX.X.X`
5. target `main` branch
6. add title using format: "v0.2.0 (Jan 18th 2022)"
7. Copy Paste contents from appropriate version in `neo-npm-package/CHANGELOG.md` to release notes
   ​
   -- **IMPORTANT**: For the step above please make sure you go through and manually add the correct formatting (notes, backticks for code/class names, and JIRA tickets), following the examples from [previous releases](https://github.com/avaya-dux/neo-css-library/releases/) as necessary.
   ​
8. attach the binary generated from when you ran `npm pack` above (tgz file)
9. click: "Publish release"
