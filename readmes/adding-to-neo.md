# This is a guide on how best to add to Neo's SCSS/CSS files

## Class names

Names are written in lowercase Latin letters.
Words are separated by a hyphen (-).
The class name starts with neo-.
It's all about [BEM](http://getbem.com/naming/). Neo uses the BEM class name convention, which consists of three parts: Block, Element, and Modifier.

### Block

Encapsulates a standalone entity that is meaningful on its own.

The block name defines the namespace for its elements and modifiers.

```css
.neo-block
```

### Element

Parts of a block and have no standalone meaning. Any element is semantically tied to its block.

The element name is separated from the block name by a double underscore (__).

```css
.neo-block__elem
```

### Modifier

Flags on blocks or elements. Use them to change appearance, behavior or state.

The modifier name is separated from the block or element name by a double hyphen (--).

```css
.neo-block--modifier
.neo-block__elem--modifier
```

Example:

```html
<div class="neo-btn">
  <span class="neo-btn__price">$13,99</span>
  <span class="neo-btn__price neo-btn__price--on-sale">$11,99</span>
</div>
```

```scss
$btn-height: 24px;

@mixin btn-price-on-sale {
  &--on-sale {
    // on-sale styles
  }
}

@mixin btn-price {
  &__price {
    // price styles

    @include btn-price-on-sale;
  }
}

.neo-btn {
  height: $btn-height;

  @include btn-price;
}
```

## Changelog

Note that all the changes you make to Neo's CSS should be documented in the CHANGELOG.md file in the root of this project, according to the format exemplified therein.

There are three types or categories of change to be recorded:

### New Features

This is when something substantial is added to the library, for example, a new Component, a new icon, or even a new class name

### Bugs Report

This is when a smaller change is made to an existing Component, class name or icon

### Additional Changes

This is for when changes are made to the HTML structure of a given Component that developers have to manually pick up, but not in a way that breaks the existing Component or prevents its continued use. Typically used with accessibility changes such as to aria-label, etc.

### Breaking Changes

This is for when changes are made to the HTML structure of a given Component that do result in the Component not working correctly, and require a developer to go in and manually make these changes. For example, changing an HTML element from a 'span' to a 'div'. Such changes should be made only when absolutely necessary

#### Note: If in doubt about how to categorize a change, bring it up with the team for consensus