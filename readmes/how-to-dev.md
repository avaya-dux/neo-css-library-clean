# how to dev

> For unit testing (TODO: add details on how to run/create tests)

> For visual testing, run `yarn test:visual`

> If snapshots need to be updated, refer to this [howto](../playwright/how-to-update-snapshots.md)

> For linting we use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).

> You can see an overview of [the libraries structure here](https://app.codesee.io/maps/public/267b4490-d552-11ec-bab4-dbed0529e43a). Generated via [CodeSee](https://www.codesee.io/).

## first steps

- install [NodeJS LTS](https://nodejs.org/) (preferably via nvm, [mac nvm](https://tecadmin.net/install-nvm-macos-with-homebrew/) | [windows nvm](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows))
- `npm install -g yarn`: install yarn "classic" (v1.29.19 at the time of writing)
- `yarn` from the root of this project: to install all dependancies and setup the [yarn workspace](https://classic.yarnpkg.com/en/docs/workspaces)

## to run in 'develop' mode (includes hot module reloading)

- `yarn dev:css`: will startup and "watch" the `css-library` project
- `yarn dev:staging`: will startup and "watch" the `css-staging` project
- `yarn dev`: will startup and "watch" both projects
- - NOTE: this starts two parallel processes, so you will have to `ctrl+c` twice to exit them both

## linting

- `yarn workspace staging lint`: runs linting in the "staging" project
- TODO: setup other workspaces/projects/folders for linting

## helpful commands

- `yarn workspace staging _command_`: run a command/script in the "staging" project (eg, `yarn workspace staging add prettier -D`)
- `yarn workspace css-library _command_`: run a command/script in the "css-library" project (eg, `yarn workspace css-library build`)

## before commiting to this repo, please read:

- our [accessibility guidelines](https://github.com/avaya-dux/neo-library-react/tree/main/readmes/accessibility-guidelines.md)
- our [coding guidelines](https://github.com/avaya-dux/neo-library-react/tree/main/readmes/coding-guidelines.md)
- and the team's [PR best practices](https://github.com/avaya-dux/neo-library-react/tree/main/readmes/pr-best-practices.md)

## publishing this repo

see [how to publish readme](./how-to-publish.md)

## a note on Yarn Workspaces

We use Yarn Workspaces in this repo. Specifically, we use Yarn v1 as v2+v3 are not supported by Netlify. Yarn v2+v3 are better at supporting a mono-repo with workspaces, but as it's not currently supported in our CICD pipeline, we're stuck on v1 for now. With that, if you want to share one project/workspace output with another one, you simply add that project as a "workspace" in the root `package.json`, run `yarn` at root, and then you import where necessary.

For example, the folder/project `css-library` is marked as a "workspace" in the root `package.json`, and the folder/project `staging` (also a "workspace") _does not_ import `css-library` in it's `package.json`, but does `import "css-library/dist/neo.css";` in its `src/layouts/NeoLayout.astro` file.

Note: playwright project is not a workspace because Docker can not find node modules if it is a yarn workspace.

## a note on visual testing

Snapshots are very sensitive to OS (e.g. fonts), browser diffrences.  Thus the baseline snapshots upload to github must be generated using the same docker image as the one used in CI pipeline. Do not generate snapshots using browsers on your dev machine.

