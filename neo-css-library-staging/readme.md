# Neo CSS Library Development and Testing Repository

## This repository is meant to facilitate local development work on the Neo CSS library, as well as provide a way to do visual diff testing when changes are made. It is a work in progress and is meant to be interated on and improved

## Changes to the CSS library are to be done using the `update-site` script in the [Neo CSS library repo](https://github.com/avaya-dux/neo-css-library), and the resulting CSS file copied into this repository at `/src/neo.css`

## This will allow for visual verification of whether changes to the CSS file have the desired result, while making sure these are only consumed once/without duplicate stylesheet imports

## In addition, this repository contains an example of visual diff testing using Cypress. The repository contains a screenshot of the `button.html` page, in `cypress/screenshots/buttons/spec.js/`. This screenshot is generated the first time the test in `integration/buttons.spec.js` is run. When the test is re-run, it will fail if the appearance of the buttons has changed

## Cypress tests can be run by using `npx cypress run` from the command line, but do make sure that your local server is running the site

## If the changes are purposeful, these can be dismissed as false positives, or and the screenshot can be re-generated for subsequent use by other developers

## Mainly, this will help in avoiding regressions, where a change to one Component may have an unintended effect on another
