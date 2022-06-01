## how to publish

### pre-publish checks (TEMP)

- ensure that the `neo/changelog.md` is up to date (will be deprecated in future releases)
- - look back through the last few commits into the `main` branch to ensure that the `neo/changelog.md` was updated with every commit (as appropriate)

### publish steps

from the root of the directory

- update `neo-npm-package/package.json` version number
- `npm login`: to ensure that you are properly logged in to the NPM network
- - **TEMP**: see Joe or Mo about login creds
- `npm run build:for-publish`: to build a production version of the library in the folder `neo-npm-publish`
- - **TEMP**: duplicate file and rename to `neo.min.css`
- - **TEMP**: format `neo.css`
- - **TEMP**: ensure all supporting files exist (`colors/*`, `fonts/*`, `icons/*`)
- `cd neo-npm-package`: navigate to the root of the packaging sub-project
- - **TODO**: add a "pack" method here (eventually)
- `npm publish`: publishes the generated tarball to our registry

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
