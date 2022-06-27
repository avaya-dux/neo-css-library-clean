# how to dev

**_IMPORTANT NOTE_**:

> This environment is meant to test CSS. You should _only_ use HTML/JS when you _absolutely have to_.

## to run locally

To start the staging environment by itself, run:
`yarn start`: from the css-staging root (`/neo-css-library/css-staging`)

Note that unless you are "watching" the CSS Library, the above command will _only_ pickup the staging environment changes. To have CSS changes reflected in staging, you can run:
`yarn watch`: from the CSS Library project root (`/neo-css-library/css-library`)

Alternatively, you can run both/either commands from the repo root. See the repo roots [how-to-dev.md](../../readmes/how-to-dev.md) for how to do this.

## other useful commands

- `yarn build`: builds a production version of the site
- `yarn preview`: runs the files in the `dist` folder (_does not_ use hot reloading)
- `yarn lint`: runs linting on `src`
- `yarn all`: installs deps, cleans temp files, runs linting, runs build

## running tests

TODO: add
