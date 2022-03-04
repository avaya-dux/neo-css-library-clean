# Changelog

### 3.52.0

### New Features - List of bugs that have been updated

- Added two new colors, `base-150` and `base-850` to [Design Tokens](https://design.avaya.com/components/tokens/#Colors)
- Added new neo-leftnav__category class and selector for NavCategory component for [Leftnav component](https://design.avaya.com/components/web/left-nav-web).

#### Bugs Report - List of bugs that have been updated

- Added text-decoration:none for [Leftnav component](https://design.avaya.com/components/web/left-nav-web) anchor tags to elimate the default css applied by the storybook.

### 3.51.2

### Bugs Report - List of bugs that have been updated

- Added a utility `neo-set-keyboard-focus` class to toggle :focus-visible style properties programatically

### 3.51.1

### Bugs Report - List of bugs that have been updated

- Added appropriate RTL styles on [Tab](https://design.avayacloud.com/components/web/tabs-web) Components with icons

### 3.51.0

### New Features - List of bugs that have been updated

- Added new version of 'info' [Icon](https://design.avayacloud.com/components/icons/)
- Added styles for new [Pagination](https://design.avayacloud.com/components/web/pagination-web) variant Components.

### Bugs Report - List of bugs that have been updated

- Removed minimum width restriction on [Select](https://design.avayacloud.com/components/web/selectbox-web) Components

### 3.50.1

### Bugs Report - List of bugs that have been updated

- Updated focus styles on [Text Input](https://design.avayacloud.com/components/web/input-web) Components to avoid layout shifts
- Updated styles on [Tooltips](https://design.avayacloud.com/components/web/tooltip-web) to fix positioning errors on Checkbox groups
- Made `neo-display-none` important

### 3.50.0

#### New Features - New features that have recently been added

- Added new 'incognito', 'incognito-off' and 'layout-immersive' [Icons](https://design.avayacloud.com/components/icons/)
- Made `neo-display-none` important

### 3.49.0

#### New Features - New features that have recently been added

- Added new utility display class names: `neo-display-none` and `neo-hidden`

### 3.48.1

#### Bugs Report - List of bugs that have been updated

- Fixed typo in filename of minified Neo CSS file

### 3.48.0

#### New Features - New features that have recently been added

- Added new 'calendar-filled' [Icons](https://design.avayacloud.com/components/icons/)

### 3.47.0

#### New Features - New features that have recently been added

- Added new styles for shortcut text to [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Components

### 3.46.0

#### New Features - New features that have recently been added

- Added the following new [Icons](https://design.avayacloud.com/components/icons/)
  - conference-call
  - conference-screen
  - coach-off

#### Bugs Report - List of bugs that have been updated

- Reset display property on [Multiselect](https://design.avayacloud.com/components/web/selectbox-web) Components from 'table' to 'inline-block' in order to avoid text truncation issues.
- Added absolute positioning and the necessary attributes to chevrons in [Multiselect](https://design.avayacloud.com/components/web/selectbox-web) Components to avoid issues on resizing.

### 3.45.2

#### Bugs Report - List of bugs that have been updated

- Fixed Text Overflow to have ellipsis in [LeftNav](https://design.avayacloud.com/components/web/left-nav-web) Components

### 3.45.1

#### Bugs Report - List of bugs that have been updated

- Added necessary style properties to accommodate loading spinner in [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) Components
- Fixed color discrepancy in hover style between default and multiple [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) Components
- Added correct width to [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) content area

### 3.45.0

#### New Features - New features that have recently been added

- Created new CSS class for disabled <li> elements in [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) to avoid erroneous use of disabled HTML attribute

#### Bugs Report - List of bugs that have been updated

- Added RTL styles to [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) to ensure correct placement of chevron in action/link element
- Adjusted alignment and color of helper text in disabled [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) elements
- Updated hover color on [Accordion](https://design.avayacloud.com/components/web/accordion-web), [List](https://design.avayacloud.com/components/web/list-web) and [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Components

### 3.44.0

#### New Features - New features that have recently been added

- Added the following new [Icons](https://design.avayacloud.com/components/icons/)
  - dashboard-filled
  - bridged-line-appearance
  - ic-conference-wifi
  - bounce
  - forward
- Added new Component styles for nested Dropdowns in [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) Components
- Created new '.expanded' CSS class to remove border on [Table](https://design.avayacloud.com/components/web/tables-web) rows that toggle nested ones for correct border styling

#### Bugs Report - List of bugs that have been updated

- Adjusted display property on Neo form control element to avoid issue with Tooltip placement on [Checkbox](https://design.avayacloud.com/components/web/checkbox-web) groups
- Adjusted styling of [Checkbox](https://design.avayacloud.com/components/web/checkbox-web) Components for consistency across states
- Added correct hover color to [Table](https://design.avayacloud.com/components/web/tables-web) header row cells with filters
- Adjusted height of condensed nested[Table](https://design.avayacloud.com/components/web/tables-web) header rows
- Added correct outline styles to [Icons](https://design.avayacloud.com/components/icons/) in 'span' elements when these are made focusable

### 3.43.1

#### Bugs Report - List of bugs that have been updated

- Adjusted padding on [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) sub-items to prevent them coming right up to the border of the sidebar
- Changed whitespace property on [Chips](https://design.avayacloud.com/components/web/chip-web) to avoid unwanted sizing issues

### 3.43.0

#### New Features - New features that have recently been added

- Added the following new [Icons](https://design.avayacloud.com/components/icons/)
  - line-straight
  - text
  - erase
  - shape-circle
  - shape-square
  - shape-circle-filled
  - shape-square-filled
  - select

#### Bugs Report - List of bugs that have been updated

- Adjusted text link style in [Notification](https://design.avayacloud.com/components/web/notifications-web) to be consistent with other Components

### 3.42.0

#### New Features - New features that have recently been added

- Added new classes to permit scroll behaviour in Collapsible [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) Component
- Added example of new 'preferences' dropdown to [Table](https://design.avayacloud.com/components/web/tables-web) Component examples
- Added new classes to toggle between 'default' and 'compact' [Table](https://design.avayacloud.com/components/web/tables-web) row heights

#### Bugs Report - List of bugs that have been updated

- Re-added the necessary global margin and padding resets
- Adjusted styles of Input elements in [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) to accommodate extra long strings
- Updated padding on [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) items with icon
- Adjusted padding of [Badge](https://design.avayacloud.com/components/web/badge-web) Components
- Adjusted the color on [Table](https://design.avayacloud.com/components/web/tables-web) row selected/hover states from blue/100 to base/100
- Adjusted the color on [Table](https://design.avayacloud.com/components/web/tables-web) row disabled states from base/100 to base/0
- Adjusted the color on [Table](https://design.avayacloud.com/components/web/tables-web) inset rows from blue/100 to base/100

### 3.41.1

- Updated package license text in LICENSE.md

#### Breaking Changes - the following Components are broken and need immediate attention

- Updated HTML structure and CSS styling of Collapsible [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) Component

#### Bugs Report - List of bugs that have been updated

- Updated margins/padding on Input elements in [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) to avoid scrollbar cutting off element

### 3.41.0

#### New Features - New features that have recently been added

- Added 'audio-jack' and 'clean' [Icons](https://design.avayacloud.com/components/icons/)
- Added underline text-decoration styles to free [anchor](https://design.avayacloud.com/components/tokens/) elements on hover

#### Breaking Changes - the following Components are broken and need immediate attention

- Updated HTML structure and CSS styling of [Breadcrumb](https://design.avayacloud.com/components/web/breadcrumbs-web) Components

#### Bugs Report - List of bugs that have been updated

- Updated width of Tooltips around [Radio](https://design.avayacloud.com/components/web/radio-web) Button Components
- Tweaked focus states on [Switch](https://design.avayacloud.com/components/web/switch-web) elements to only show on Tab

### 3.40.3

#### Bugs Report - List of bugs that have been updated

- Updated appearance of 'collapse-all' and 'expand-all' [Icons](https://design.avayacloud.com/components/icons/)
- Tweaked padding on checked state of [Checkboxes](https://design.avayacloud.com/components/web/checkbox-web) to avoid unintended position shift
- Added property to prevent unintended margin on read-only text in [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Components
- Added property to expand width of inputs in [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Components

### 3.40.2

#### Bugs Report - List of bugs that have been updated

- Reverted to 'border' property from 'box-shadow' property on focus for [Input](https://design.avayacloud.com/components/web/input-web) Components
- Reverted to 'border' property from 'box-shadow' property on focus for [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) Components

### 3.40.1

#### Bugs Report - List of bugs that have been updated

- Tweaked global focus styles to prevent unwanted focus ring appearing on mouse click
- Added missing RTL styles and spacing to [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) sub-elements
- Tweaked visibility of Clear button in [Inputs](https://design.avayacloud.com/components/web/input-web) to avoid unwanted transparency effect
- Adjusted width of Text [Inputs](https://design.avayacloud.com/components/web/input-web) to take width of container
- Adjusted line height on [Input](https://design.avayacloud.com/components/web/input-web) Group Label elements
- Adjusted colour of [Table](https://design.avayacloud.com/components/web/tables-web) row dividers on hover/select

#### Additional Changes - the following items have been updated. Please make these updates at your earliest convenience.

- Added appropriate 'role' attribute to [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Inputs

### 3.40.0

#### New Features - New features that have recently been added

- Added styles for Inputs without associated button and read-only text to [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Component

### 3.39.1

#### Bugs Report - List of bugs that have been updated

- Changed [Input](https://design.avayacloud.com/components/web/input-web) Component styles on focus from border to box-shadow and disabled transition on Input elements mitigate unwanted visual effects
- Further tightened incorrect spacing between label and text elements in read-only [Input](https://design.avayacloud.com/components/web/input-web) Components
- Updated colours on new Event [Button](https://design.avayacloud.com/components/web/buttons-web) Components
- Removed styling on ‘More’ button in [Tab](https://design.avayacloud.com/components/web/tabs-web) with Carousel Component to allow for correct spacing

### 3.39.0

#### New Features - New features that have recently been added

- Added classes for new Event [Button](https://design.avayacloud.com/components/web/buttons-web) Components
- Added new 'audio-filled', 'audio-on-1', 'audio-on-2', and 'audio-on-3' [Icons](https://design.avayacloud.com/components/icons/)

#### Bugs Report - List of bugs that have been updated

- Restored correct size to close button element in text [Input](https://design.avayacloud.com/components/web/input-web) Components
- Added selector for correct text alignment for RTL text in [Accordion](https://design.avayacloud.com/components/web/accordion-web) Component header elements
- Removed selector which set padding to '0' on Label elements in custom [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) Components
- Fixed incorrect spacing between label and text elements in read-only [Input](https://design.avayacloud.com/components/web/input-web) Components
- Changed the colour on label elements for all [Form](https://design.avayacloud.com/web/form-layout-web) Components to base-800
- Updated appearance of all custom [Icons](https://design.avayacloud.com/components/icons/)
- Added margin to message element in [Notification](https://design.avayacloud.com/components/web/notifications-web) Components to preserve correct spacing

### 3.38.0

#### New Features - New features that have recently been added

- Added new [Toast](https://design.avayacloud.com/components/web/toast-web) Components
- Added new ‘play-filled,’ ‘stop-filled,’ and ‘usb’ [Icons](https://design.avayacloud.com/components/icons/)

#### Bugs Report - List of bugs that have been updated

- Changed global font color back from base-900 to base-1000
- Added updated focus style to border on custom [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) Components
- Added correct focus styles to [Checkbox](https://design.avayacloud.com/components/web/checkboxes-web) Components in Safari browser
- Changed error color on [Form](https://design.avayacloud.com/components/web/form-layout-web) elements from red-500 to red-600
- Removed unintended margin bottom from [Typography](https://design.avayacloud.com/components/tokens/) utility classes
- Added correct focus styles to [Accordion](https://design.avayacloud.com/components/web/accordion-web) header element in Safari browser

### 3.37.0

#### New Features - New features that have recently been added

- Added classes for new [Shimmer](https://design.avayacloud.com/components/web/shimmer-web) Components
- Added the following new [Icons](https://design.avayacloud.com/components/icons/):
  - format-predefined-ja
  - font-highlight-he
  - format-predefined-ar
  - format-collapse-ko
  - font-family-zh
  - format-collapse-ar
  - font-highlight-zh
  - font-family-ko
  - font-family-ja
  - format-predefined-zh
  - format-remove-ko
  - font-family-he
  - font-color-ko
  - font-color-ja
  - font-family-ar
  - font-color-zh
  - format-remove-zh
  - font-color-he
  - format-expand-ko
  - font-color-ar
  - format-expand-zh
  - format-expand-ja
  - format-expand-ar
  - format-predefined-ko
  - format-expand-he
  - format-remove-he
  - format-collapse-ja
  - font-highlight-ja
  - format-collapse-zh
  - font-highlight-ar
  - font-highlight-ko
  - format-predefined-he
  - format-remove-ar
  - format-remove-ja
  - format-collapse-he
  - font-size-ar
  - font-size-ja
  - font-size-ko
  - font-size-zh
  - font-size-he
- Added new '.neo-switch--multine' class to preserve text alignment when a [Switch](https://design.avayacloud.com/components/web/switch-web)'s label extends to more than one line

#### Bugs Report - List of bugs that have been updated

- Changed white-space property on Multiline [Tooltips](https://design.avayacloud.com/components/web/tooltip-web) to re-enable line breaks
- Added word-break property to [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) anchor elements to avoid overflow issue with longer strings
- Changed global [font](https://design.avayacloud.com/components/tokens/) color to base-900 from base-1000
- Exchanged box-shadow with hard outline in [Checkbox](https://design.avayacloud.com/components/web/checkboxes-web), [Switch](https://design.avayacloud.com/components/web/switch-web) and [Radio](https://design.avayacloud.com/components/web/radio-web) focus styles for improved accessibility
- Tweaked focus style on text [Inputs](https://design.avayacloud.com/components/web/input-web) for improved visibility

### 3.36.0

#### New Features - New features that have recently been added

- Added new classes and styles to [Checkboxes](https://design.avayacloud.com/components/web/checkboxes-web) to enable additional functionality while disabled
- Added new styles to [Radios](https://design.avayacloud.com/components/web/radio-web) to enable additional functionality while disabled

### 3.35.0

#### Breaking Changes - the following Components are broken and need immediate attention

- Re-formatted HTML structure of [Accordion](https://design.avayacloud.com/components/web/accordion-web) Components to comply with correct accessibility standards and guidelines

#### Additional Changes - the following items have been updated. Please make these updates at your earliest convenience.

- Removed need for distinct hoverable classes for correct hover styling on [Accordion](https://design.avayacloud.com/components/web/accordion-web) Components

#### New Features - New features that have recently been added

- Added new 'mobile-paired', 'mobile-not-paired', and 'mobile-wireless' [Icons](https://design.avayacloud.com/components/icons/)
- Added example of Chips in Combobox [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) Components

#### Bugs Report - List of bugs that have been updated

- Removed 'width' and 'max-width' properties from [Modal](https://design.avayacloud.com/components/web/modal-web) Components
- Removed universal '\*' selector from global Body styles
- Added missing hover state styles to secondary [Button](https://design.avayacloud.com/components/web/buttons-web) disabled utility class
- Added necessary styles for disabled utility class on the following:
  - [Navbar](https://design.avayacloud.com/components/web/navbar-web) buttons
  - [Tabs](https://design.avayacloud.com/components/web/tabs-web)
  - [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) items
  - [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) items
  - [Pagination](https://design.avayacloud.com/components/web/pagination-web) items

### 3.34.0

#### New Features - New features that have recently been added

- Added separate disabled class to [Buttons](https://design.avayacloud.com/components/web/buttons-web) to enable additional functionality while disabled
- Added a separate ‘.neo-paragraph-spacing’ class for paragraph spacing on [Typography](https://design.avayacloud.com/components/tokens/) elements

#### Additional Changes - the following items have been updated. Please make these updates at your earliest convenience.

- Updated accessibility markup in [Spinner](https://design.avaya.com/components/web/spinner-web) Components

#### Bugs Report - List of bugs that have been updated

- Added missing Data Viz [Colors](https://design.avayacloud.com/components/tokens/) as CSS variables
- Added missing pseudo-element selector to Avatars within Dropdown in [Navbars](https://design.avayacloud.com/components/web/navbar-web) to prevent distortion
- Added CSS media queries to distinguish Safari styles for:
  - [Tooltips](https://design.avayacloud.com/components/web/tooltip-web) width
  - [Avatar](https://design.avayacloud.com/components/web/avatar-web) unneeded background
  - Unnecessary border outline on Tertiary Circle [Buttons](https://design.avayacloud.com/components/web/buttons-web)
- Added explicit height to Arrow pseudo-elements to avoid issues with [Tooltips](https://design.avayacloud.com/components/web/tooltip-web) on Firefox
- Removed text wrap property from [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) Main Links
- Tweaked focus styles on [Chips](https://design.avayacloud.com/components/web/chip-web) to correct for display issue

### 3.33.0

#### New Features - New features that have recently been added

- Added new '.neo-code' class for correct [font](https://design.avayacloud.com/components/tokens) styling on code samples
- Added new 'label' [Icon](https://design.avayacloud.com/components/icons/)

#### Additional Changes - the following items have been updated. Please make these updates at your earliest convenience.

- Added missing disabled attribute to appropriate Buttons in [Navbar](https://design.avayacloud.com/components/web/navbar-web) Components
- Updated accessibility markup in [List](https://design.avaya.com/components/web/list-web) Components
- Updated accessibility markup in [Widget](https://design.avaya.com/components/web/widget-web) Components
- Updated accessibility markup in [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) Components
- Updated accessibility markup in [Table](https://design.avayacloud.com/components/web/tables-web) Component
- Updated accessibility markup in [Tooltip](https://design.avayacloud.com/components/web/tooltip-web) Component

#### Bugs Report - List of bugs that have been updated

- Fixed typos in colors/neo-colors.css file that was rendering base-1000 as base-100, and base-0 as orange-600
- Tweaked focus styles on the following Components:
  - [Buttons](https://design.avayacloud.com/components/web/buttons-web)
  - Buttons in [Navbars](https://design.avayacloud.com/components/web/navbar-web)
  - [Tabs](https://design.avayacloud.com/components/web/tabs-web)
  - [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) links
  - [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) main and sub links
  - Buttons in [Table](https://design.avayacloud.com/components/web/tables-web) Action rows
  - Multiselects in [Table](https://design.avayacloud.com/components/web/tables-web) header rows
  - Expandable [Chips](https://design.avayacloud.com/components/web/chip-web) and Chips with Close
  - [Accordion](https://design.avayacloud.com/components/web/accordion-web) header element
- Tweaked selectors for '.neo-avatar--navbar-nested' class in Dropdown Avatar in [Navbars](https://design.avayacloud.com/components/web/navbar-web) to correct lack of pseudo-element styles
- Adjusted styles to display border correctly on Sticky [Table](https://design.avayacloud.com/components/web/tables-web) header rows

### 3.32.0

#### New Features - New features that have recently been added

- Added new Condensed [Left Navigation](https://design.avayacloud.com/components/web/left-nav-web) Component
- Added separate color files to Neo npm package under neo/dist/css/colors/

#### Additional Changes - the following items have been updated. Please make these updates at your earliest convenience.

- Updated attributes for correct accessibility compliance to [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) Component HTML examples
- Updated attributes for correct accessibility compliance to [Form](https://design.avayacloud.com/components/web/form-layout-web) Component HTML examples
- Updated attributes for correct accessibility compliance to [Navigation](https://design.avayacloud.com/components/web/notifications-web) Component HTML examples
- Updated attributes for correct accessibility compliance to [Checkbox](https://design.avayacloud.com/components/web/checkbox-web) Component HTML examples
- Updated attributes for correct accessibility compliance to [Switch](https://design.avayacloud.com/components/web/switch-web) Component HTML examples
- Added additional '.neo-avatar--navbar-nested' class to Avatar elements within Dropdowns in [Navbar](https://design.avayacloud.com/components/web/navbar-web) Components for additional flexibility when nested
- Updated the accessibility attributes and aria attributes for the [LeftNav](https://design.avayacloud.com/components/web/left-nav-web) Component for screen reader purposes

#### Bugs Report - List of bugs that have been updated

- Removed unintended animation on [Button](https://design.avayacloud.com/components/web/buttons-web) focus/active state
- Added additional padding to Dropdown in [Navbar](https://design.avayacloud.com/components/web/navbar-web) Component
- Changed display property of [Avatar](https://design.avayacloud.com/components/web/avatar-web) Components from 'flex' to 'inline-flex' to avoid alignment issues
- Changed orientation of chevron icons in [Accordion](https://design.avayacloud.com/components/web/accordion-web) Components
- Changed orientation of chevron icons in [Table](https://design.avayacloud.com/components/web/tables-web) Components
- Adjusted background color and padding of nested Widgets in Table Components
- Added missing border-top to header rows in Table Components
- Added provisional support for focus-visible CSS selector

### 3.31.1

#### Bugs Report - List of bugs that have been updated

- Reverted change in pointer-events style that prevented access to [Checkboxes](https://design.avayacloud.com/components/web/checkbox-web) and [Radio](https://design.avayacloud.com/components/web/radio-web) Components

### 3.31.0

#### Additional Changes - the following items have been updated. Please make these updates at your earliest convenience.

- Added role="menu" and for the dropdown divs containing the nested dropdown and added role="menuitem" for each individual dropdown content for the [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Component
- Removed the role="menu" and "menuitem" from the [LeftNav](https://design.avayacloud.com/components/web/left-nav-web) component
- Fixed spacing on the example for the [Badge](https://design.avayacloud.com/components/web/badge-web) with button component
- Added aria attributes (aria-label) for the [Badge](https://design.avayacloud.com/components/web/badge-web) component
- Updated the accessibility attributes, aria attributes and removed role and title for screen reader purpose for the button on [Modal](https://design.avayacloud.com/components/web/modal-web) component
- Updated the aria attributes for screen reader on [Chip](https://design.avayacloud.com/components/web/chip-web) component
- Added aria attributes (role=dialog, aria-labelledby="idOfHeader" and arian-label) on the [Sheet](https://design.avayacloud.com/components/web/sheet-web) component
- Added correct aria-label to [Tabs](https://design.avayacloud.com/components/web/tabs-web) Carousel Dropdown button
- Added 'required' attribute as neccesary to required [Input](https://design.avayacloud.com/components/web/input-web) examples
- Removed redundant accessibility-related attributes from [Radio](https://design.avayacloud.com/components/web/radio-web) buttons

#### New Features - New features that have recently been added

- Added new icon for Camera ext ON / OFF [Icons](https://design.avayacloud.com/components/icons/)
- Removed icon for Camera lens ON / OFF

#### Bugs Report - List of bugs that have been updated

- Removed unnecessary padding from buttons in [Modal](https://design.avayacloud.com/components/web/modal-web) footer
- Added supporting styles to allow for additional icon in Buttons used as [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) headers
- Removed unnecessary inverse global font color style from Dropdown Component
- Added correct RTL styles to brand name h4 element in [Navigation](https://design.avayacloud.com/components/web/navbar-web) Component
- Added correct styles for Avatars without associated images to be used as Dropdowns in Navigation Component
- Decreased value of z-index property on [Checkboxes](https://design.avayacloud.com/components/web/checkbox-web) and Radios to avoid issue where element is unreachable
- Removed explicit cursor style from square [Button](https://design.avayacloud.com/components/web/buttons-web) Components to avoid unintended cursor flickering
- Added 200-series colored borders to [Notification](https://design.avayacloud.com/web/components/web/notifications-web) Components
- Adjusted opacity of Input placeholder text to account for difference when rendered in Firefox
- Added correct styles to display close/clear button when hovered over in Inputs
- Fixed bug where close/clear button was displayed on disabled Inputs
- Removed unintentional pointer events from Label element in Input Groups

### 3.30.1

#### Additional Changes - the following items have been updated. Please make these updates at your earliest convenience.

- Added correct styles to [Modal](https://design.avayacloud.com/components/web/modal-web) button spacing, changed title element from <h4> to <h2> to align with Figma designs
- Changed 'htmlFor' to 'for' in Basic [Input](https://design.avayacloud.com/components/web/input-web) HTML example
- Updated accessibility attributes on Input Combination HTML examples
- Updated aria attributes and ids for hint and counter text on Inputs and [Selectbox](https://design.avayacloud.com/components/web/selectbox-web) pages HTML examples

#### Bugs Report - List of bugs that have been updated

- Amended styles on multi-line [Tooltips](https://design.avayacloud.com/components/web/tooltip-web) to fix overly-aggressive string truncation
- Restored correct font-weight to [Table](https://design.avayacloud.com/components/web/tables-web) header filter options
- Added correct RTL styles to [Breadcrumb](https://design.avayacloud.com/components/web/breadcrumbs-web) Components to amend button spacing
- Added styles to hide Editable Input close button and reveal it on hover/focus
- Amended padding on [Switches](https://design.avayacloud.com/components/web/switch-web) to align with original designs

### 3.30.0

#### Additional Changes - the following items have been updated. Please make these updates at your earliest convenience.

- Added examples of .neo-chip class in [List](https://design.avayacloud.com/components/web/list-web) Sections with Actions Components
- Corrected spelling of tab index attribute in Sticky [Navbar](https://design.avayacloud.com/components/web/navbar-web) HTML example
- Added role=“button” attribute to [Tabs](https://design.avayacloud.com/components/web/tabs-web) with Close HTML examples
- Removed role/title attributes from buttons in [Tab](https://design.avayacloud.com/components/web/tabs-web) Carousels and added appropriate aria-label attributes
- Removed unnecessary tab index attribute from parent div element in [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Components
- Removed unnecessary tab index attribute from Read Only [Inputs](https://design.avayacloud.com/components/web/input-web)
- Added aria-label="open navigation" to collapsable menu button on [Navigation](https://design.avayacloud.com/components/web/navbar-web) component
- Removed Navbar collapsible menu tabindex on disabled items on [Navigation](https://design.avayacloud.com/components/web/navbar-web) component
- Removed role="navigation" from [Pagination](https://design.avayacloud.com/components/web/pagination-web) since its redundant
- Removed role="button" from [Pagination](https://design.avayacloud.com/components/web/pagination-web) since its redundant
- Added aria-label="go to previous/next page" on the [Pagination](https://design.avayacloud.com/components/web/pagination-web) arrows

#### New Features - New features that have recently been added

- Added new icon for Camera lens ON / OFF [Icons](https://design.avayacloud.com/components/icons/)
- Added new .neo-group-list--actions\_\_item--clickable class to [List](https://design.avayacloud.com/components/web/list-web) Sections with Actions Components
- Added new disabled class styles to custom-, multi- and combo- [Selectbox](https://design.avayacloud.com/components/web/selectbox-web)

#### Bugs Report - List of bugs that have been updated

- Removed unintended margin-top on nested .neo-input class within .neo-form--inline class in [Form](https://design.avayacloud.com/components/web/form-layout-web) Components
- Restored correct hover colour to .neo-dropdown\_\_link class in [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Component items
- Restored correct hover colour to [Skipnav](https://design.avayacloud.com/components/web/skipNav) Component
- Edited properties of text in multi-line [Tooltips](https://design.avayacloud.com/components/web/tooltip-web) to resolve issue with long single-word strings overflowing the element
- Removed explicit cursor style declaration on [Buttons](https://design.avayacloud.com/components/web/buttons-web) to avoid cursor flickering on change
- Added new text-indent and padding to [Dropdown](https://design.avayacloud.com/components/web/dropdown-web) Component items with icons to fix text alignment

### 3.29.0

#### New Features - New features that have recently been added

- Added new classes and styles for [Tree View](https://design.avayacloud.com/components/web/treeview-web) Component
- Added new classes and styles for hint text under checkboxes in [Multiselect](https://design.avayacloud.com/components/web/selectbox-web) Components
- Added the following [Icons](https://design.avayacloud.com/components/icons/):
  content/link-remove
  editor/font-color
  editor/font-family
  editor/font-highlight
  editor/format-predefined
  editor/format-remove
  editor/indent-decrease
  editor/indent-increase
  editor/line-break
  editor/special-character
  editor/superscript

#### Bugs Report - List of bugs that have been updated

- Added -2px offset to global focus style outline
- Fixed incorrect disabled state color in [Checkbox](https://design.avayacloud.com/components/web/checkbox-web) Components
- Fixed issue with incorrect hover color on checkboxes in Multiselect Components
- Reset text-wrap property on multiline [Tooltips](https://design.avayacloud.com/components/web/tooltip-web) to resolve issue with cut-off text in different languages

### 3.28.0

#### Breaking Changes - the following Components are broken and need immediate attention

- Reformatted search elements in [Navbar](https://design.avayacloud.com/components/web/form-layout-web) Components for consistency across use cases and correct accessibility guidance
- Reformatted search elements in [Tables](https://design.avayacloud.com/components/web/tables-web) Components for consistency across use cases and correct accessibility guidance

#### Additional Changes - the following items have been updated. Please make these updates at your earliest convenience.

- Added note re: correct use of tabindex attribute in filters on Table Components to avoid unnecessary tabbing.
- Added note re: correct aria-label attribute in Circular and Square [Button](https://design.avayacloud.com/components/web/buttons-web) Components
- Added correct aria-label and tabindex attributes on editable [Input](https://design.avayacloud.com/components/web/input-web) Components
- Added disabled attribute to Buttons in editable Input Components as necessary

#### New Features - New features that have recently been added

- Added new utility display styles: `neo-display-none` and `neo-hidden`
