const fs = require("fs").promises;
const coreFigmaFunctions = require("./figma-functions/core-figma-functions.js");

const switchStyles = require("./components-functions/switch_variants.js");
const radioStyles = require("./components-functions/radio_variants.js");
const tabStyles = require("./components-functions/tabs_variants.js");
const navbarStyles = require("./components-functions/navbar_variants.js");
const buttonStyles = require("./components-functions/buttons_variants.js");
const avatarStyles = require("./components-functions/avatar_variants.js");
const checkboxStyles = require("./components-functions/checkbox_variants.js");
const leftnavStyles = require("./components-functions/leftnav_variants.js");
const notificationStyles = require("./components-functions/notifications.js");
const listItemStyles = require("./components-functions/list_item_variants.js");
const listSectionStyles = require("./components-functions/list_section_variants.js");
const chipStyles = require("./components-functions/chip_variants.js");
const inputStyles = require("./components-functions/input_variants.js");
const widgetStyles = require("./components-functions/widget_variants.js");
const tooltipStyles = require("./components-functions/tooltips_variants.js");
const accordionStyles = require("./components-functions/accordion_variants.js");
const sheetStyles = require("./components-functions/sheets_variants.js");
const modalStyles = require("./components-functions/modal_variants.js");
const tableStyles = require("./components-functions/table_variants.js");
const dropdownStyles = require("./components-functions/dropdown_variants.js");
const channelIconVariants = require("./components-functions/channel_icon_variants.js");
const breadcrumbStyles = require("./components-functions/breadcrumbs_variants.js");
const skipNavStyles = require("./components-functions/skipnav_variants.js");
const treeviewStyles = require("./components-functions/treeview_variants.js");
const shimmerStyles = require("./components-functions/shimmer_variants.js");
const toastStyles = require("./components-functions/toast_variants.js");
import * as stepperStyles from './components-functions/stepper_variants.js'

coreFigmaFunctions
  .getComponentPages(
    coreFigmaFunctions.figmaCredentials.figmaAPIKey,
    coreFigmaFunctions.figmaCredentials.varaintComponentsFileID
  )
  .then(value => {
    stepperStyles.stepperStyles(value)
  });
