# how to dev

***IMPORTANT NOTE***:
> This environment is meant to test CSS. You should _only_ use HTML/JS when you _absolutely have to_.

## to run locally
Open the HTML file in your browser of choice. Or create it if it does not already exist.

## to view css-library changes
From the root of the css-library, you have two options:
- you can run `npm run build:to neo-css-library-staging/src` to manualy replace the existing `neo.css` file
- you can point the appropriate testing file (eg, `src/components/buttons/buttons.html`) at the "watched" file
- - eg, update `buttons.html` neo css source to: `href="../../../../dist/neo.css"`

## using cypress
To run cypress locally to see your test output
- open the HTML file you want to test in the browser
- `npx cypress open`: from this projects root (`neo-css-library/neo-css-library-staging/`)

To run cypress:
- `npx cypress run`
