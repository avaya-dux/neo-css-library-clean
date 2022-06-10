# how to dev

> For unit testing (TODO: add details on how to run/create tests)

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

## development linking

TODO: add

## linting

TODO: add

## before commiting to this repo, please read:

- our [accessibility guidelines](https://github.com/avaya-dux/neo-library-react/tree/main/readmes/accessibility-guidelines.md)
- our [coding guidelines](https://github.com/avaya-dux/neo-library-react/tree/main/readmes/coding-guidelines.md)
- and the team's [PR best practices](https://github.com/avaya-dux/neo-library-react/tree/main/readmes/pr-best-practices.md)

## publishing this repo

see [how to publish readme](./how-to-publish.md)
