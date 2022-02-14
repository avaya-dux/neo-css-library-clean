var axios = require("axios");

// text of changelog to be inserted here

var breakingchanges = [
  // '<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/left-nav-web">Update to Left Navigation Component</a></li><p style="padding-left: 15px;">Re-formatted HTML structure and CSS of Left Navigation Component</p>',
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/tables-web">Searchable Text Input in Table</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Reformatted search elements in Table Components for consistency across use cases and correct accessibility guidance</p>`,
];

var additionalchanges = [
  // '<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/dropdown-web">Role Attribute in Dropdown Inputs</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Added appropriate "role" attribute to Dropdown Inputs</p>',
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/accordion-web">Accordion Hover Styles</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Removed need for distinct hoverable classes for correct hover styling on Accordion Components</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avaya.com/components/web/widget-web">Widget HTML examples</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Updated accessibility markup in Widget Components</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/left-nav-web">Left Navigation HTML examples</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Updated accessibility markup in Left Navigation Components</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/tables-web">Table HTML examples</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Updated accessibility markup in Table Components</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/tables-web">Tooltip HTML examples</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Updated accessibility markup in Tooltip Components</p>`,
];

var newfeatures = [
  `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/icons">New Icons</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Added 'coach-off', 'conference-screen' and modified 'conference-call' icon</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/selectbox-web">New Styles for Nested Dropdowns in Selectbox</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Added new Component styles for nested Dropdowns in Selectbox Components</p>`,
  // '<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/tables-web">New CSS Class for Table Rows</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Created new ".expanded" CSS class to remove border on Table rows that toggle nested ones for correct border styling</p>',
];

var bugs = [
  `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/selectbox-web">Display Property in Multiselect</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Reset display property on Multiselect Components from 'table' to 'inline-block' in order to avoid text truncation issues</p>`,
  `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/selectbox-web">Multiselect Chevron Positioning</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Added absolute positioning and the necessary attributes to chevrons in Multiselect Components to avoid issues on resizing</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/selectbox-web">Hover Color Updates</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Added correct width to Selectbox content area</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/tables-web/">Nested Condensed Table Header Row Height</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Adjusted height of condensed nested Table header rows</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/tables-web">Table Row Color</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Added correct hover color to Table header row cells with filters</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/tables-web">Table Row Disabled Color</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Adjusted the color on Table row disabled states from base/100 to base/0</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/tables-web/">Table Inset Row Color</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Adjusted the color on Table inset rows from blue/100 to base/100</p>`,
  // `<li><a style="color: #1473e6;" href="https://design.avayacloud.com/components/web/pagination-web">Disabled Pagination Items</a></li><p style="padding-left: 15px;padding-bottom: 24px;">Added necessary styles for disabled utility class on Pagination items</p>`,
];

axios({
  method: "POST",
  url: "https://us-central1-global-ux-ui.cloudfunctions.net/sendNeoUpdate",
  headers: {
    "content-type": "application/json",
  },
  data: {
    versionNumber: "3.46.0",
    breaking: breakingchanges,
    additional: additionalchanges,
    bugs: bugs,
    features: newfeatures,
    date: "November 24, 2021 at 13:56 GMT",
  },
});

/*

### 3.45.0

### Reset display property on Multiselect Components from 'table' to 'inline-block' in order to avoid text truncation issues.

*/
