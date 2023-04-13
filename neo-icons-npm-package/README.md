# Neo Icon Library

This package contains the complete set of icons associated with Avaya's Neo Design System.

## Package managers

To download the Neo Icon Library into your project via Node Package Manager (npm), run the following command:

`npm install @avaya/neo-icons`.

## Add Neo Icons to Your Page

Import the `neo-icons` CSS stylesheet in the `<head>` element of your HTML5 document.

```html
<link rel="stylesheet" type="text/css" href="neo-icons.css" />
```

Then, call the desired icon using the appropriate class name, ex.

```html
<span class="neo-icon-settings" aria-label="DESCRIPTION OF ICON/ACTION"></span>
```

## What's included

The icons are available as a CSS stylesheet, `neo-icons.css`

In addition, a Javascript file `neo-icon-info.js` is provided with an array of Objects containing the following properties for each icon

- icon name
- whether the icon can be displayed bidrectionally
- whether the icon can be animated
- which category the icon belongs to

Finally, a Typescript file `neo-icon-types.ts` is provided with useful types for using the icon library with Typescript projects

## Browser support

Neo is set to support the last 2 versions of each browser, with the exception of IE (only IE11 is supported).
