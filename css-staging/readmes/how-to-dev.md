# how to dev

**_IMPORTANT NOTE_**:

> This environment is meant to test CSS. You should _only_ use HTML/JS when you _absolutely have to_.

## to run locally

### initial one time setup

> You must first add a symlink to the css-library (the root project), and then connecting it to the `css-staging` project. You only need to run these two commands **_once_** to setup the symlink.

`yarn link`: run this in the repo root (`/neo-css-library`)

`yarn link "css-library"`: run the provided command in the `/neo-css-library/css-staging` folder

### run w/ hot-module reloading

> Once the symlink is in place on your local machine, you only need to run the commands to "watch" for updates to the CSS Library and the Staging project.

`yarn watch`: from the repo root (`/neo-css-library`)

`yarn start`: from the css-staging root (`/neo-css-library/css-staging`)

## running tests

TODO: add
