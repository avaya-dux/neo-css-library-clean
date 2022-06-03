# Neo CSS Library Development and Testing Repository

This repository is meant to facilitate local development work on the Neo CSS library, as well as provide a way to do visual diff testing when changes are made. It is a work in progress and is meant to be interated on and improved.

In addition, this repository contains an example of visual diff testing using Cypress. The repository contains a screenshot of the `button.html` page, in `cypress/screenshots/buttons/spec.js/`. This screenshot is generated the first time the test in `integration/buttons.spec.js` is run. When the test is re-run, it will fail if the appearance of the buttons has changed.

Cypress tests can be run by using `npx cypress run` from the command line, but do make sure that your local server is running the site.

## useful links

- [how to dev](./readmes/how-to-dev.md)
- [css staging environment](https://css-staging.netlify.app)
