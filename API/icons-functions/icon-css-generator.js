const fs = require("fs").promises;
const webfontsGenerator = require("webfonts-generator");

const iconUtilityFunctions = require("./icon-utility-files/icons-utility-functions.js");

// const iconInfo = require('./icon-utility-files/iconInfo.js');
const { includes } = require("lodash");

const Handlebars = require("handlebars");

const replace = require("./icon-utility-files/icon-replacement-string");

const replacelib = require("replace-in-file");

const prettier = require("prettier");

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  var amendedArg = arg1.replace(replace.stringsToReplace, "");

  return amendedArg === arg2 ? options.fn(this) : options.inverse(this);
});

// Code to generate .css file for icons -- THIS CODE TO BE RUN AFTER ICONGEN SCRIPT

// This function converts our icon font .woff file to base64

async function convertIconFontToBase64() {
  const base64FileBuffer = await fs.readFile(
    "../properties/neo-icon-font.woff"
  );

  const contents_in_base64 = await base64FileBuffer.toString("base64");

  return contents_in_base64.toString();
}

const unicodes = {
  "add-circle": 0xf101,
  add: 0xf102,
  "address-book": 0xf103,
  address: 0xf104,
  agents: 0xf105,
  "align-bottom": 0xf106,
  "align-center-horizontal": 0xf107,
  "align-center-vertical": 0xf108,
  "align-distribute-horizontal": 0xf109,
  "align-distribute-vertical": 0xf10a,
  "align-left": 0xf10b,
  "align-right": 0xf10c,
  "align-top": 0xf10d,
  "alignment-center": 0xf10e,
  "alignment-left": 0xf10f,
  "alignment-right": 0xf110,
  analytics: 0xf111,
  "app-grid": 0xf112,
  archive: 0xf113,
  "arrow-down": 0xf114,
  "arrow-fill-down": 0xf115,
  "arrow-fill-left": 0xf116,
  "arrow-fill-right": 0xf117,
  "arrow-fill-up": 0xf118,
  "arrow-left": 0xf119,
  "arrow-right": 0xf11a,
  "arrow-up": 0xf11b,
  "at-symbol": 0xf11c,
  attach: 0xf11d,
  "audio-lock": 0xf11e,
  "audio-off": 0xf11f,
  "audio-on": 0xf120,
  "audio-warning": 0xf121,
  "audit-rtl": 0xf122,
  audit: 0xf123,
  "auto-answer": 0xf124,
  "av-block": 0xf125,
  "av-settings": 0xf126,
  "available-filled": 0xf127,
  available: 0xf128,
  "away-filled": 0xf129,
  away: 0xf12a,
  "awfos-rtl": 0xf12b,
  awfos: 0xf12c,
  backspace: 0xf12d,
  "backward-fast": 0xf12e,
  "backward-skip": 0xf12f,
  "bar-chart": 0xf130,
  "barge-in": 0xf131,
  "billboard-chart": 0xf132,
  billboard: 0xf133,
  bold: 0xf134,
  bot: 0xf135,
  broadcast: 0xf136,
  business: 0xf137,
  "busy-filled": 0xf138,
  busy: 0xf139,
  calculator: 0xf13a,
  calendar: 0xf13b,
  "call-add": 0xf13c,
  "call-alerting": 0xf13d,
  "call-connected": 0xf13e,
  "call-dial-in": 0xf13f,
  "call-end": 0xf140,
  "call-inbound": 0xf141,
  "call-logs-rtl": 0xf142,
  "call-logs": 0xf143,
  "call-make": 0xf144,
  "call-missed": 0xf145,
  "call-mute": 0xf146,
  "call-not-ready": 0xf147,
  "call-outbound": 0xf148,
  "call-pending": 0xf149,
  "call-ready": 0xf14a,
  "call-split": 0xf14b,
  "call-transfer": 0xf14c,
  call: 0xf14d,
  callback: 0xf14e,
  "camera-control": 0xf14f,
  "camera-flip": 0xf150,
  camera: 0xf151,
  "caps-lock": 0xf152,
  cart: 0xf153,
  "center-focus": 0xf154,
  "change-password": 0xf155,
  "chart-area": 0xf156,
  "chart-bubbles": 0xf157,
  "chart-donut": 0xf158,
  "chart-gauge": 0xf159,
  "chart-lines": 0xf15a,
  "chat-alerting": 0xf15b,
  "chat-connected": 0xf15c,
  "chat-filled": 0xf15d,
  "chat-inbound": 0xf15e,
  "chat-missed": 0xf15f,
  "chat-not-ready": 0xf160,
  "chat-outbound": 0xf161,
  "chat-pending": 0xf162,
  "chat-ready": 0xf163,
  chat: 0xf164,
  check: 0xf165,
  "chevron-down": 0xf166,
  "chevron-left": 0xf167,
  "chevron-right": 0xf168,
  "chevron-up": 0xf169,
  "clear-day": 0xf16a,
  "clear-night": 0xf16b,
  clipboard: 0xf16c,
  "clone-preview": 0xf16d,
  close: 0xf16e,
  "closed-caption": 0xf16f,
  "cloudy-few": 0xf170,
  "cloudy-scattered": 0xf171,
  cloudy: 0xf172,
  "co-browse": 0xf173,
  coach: 0xf174,
  "code-cloud": 0xf175,
  code: 0xf176,
  comments: 0xf177,
  computer: 0xf178,
  "conference-call": 0xf179,
  configure: 0xf17a,
  "connected-filled": 0xf17b,
  "contact-filled": 0xf17c,
  contact: 0xf17d,
  "control-release": 0xf17e,
  "control-request": 0xf17f,
  copy: 0xf180,
  "credit-card": 0xf181,
  crm: 0xf182,
  crown: 0xf183,
  "custom-alerting": 0xf184,
  "custom-connected": 0xf185,
  "custom-inbound": 0xf186,
  "custom-missed": 0xf187,
  "custom-not-ready": 0xf188,
  "custom-outbound": 0xf189,
  "custom-pending": 0xf18a,
  "custom-ready": 0xf18b,
  custom: 0xf18c,
  "customer-journey": 0xf18d,
  dashboard: 0xf18e,
  "defer-in": 0xf18f,
  "defer-inbox": 0xf190,
  "defer-out": 0xf191,
  dialpad: 0xf192,
  digital: 0xf193,
  disconnected: 0xf194,
  "disposition-code": 0xf195,
  "do-not-disturb-filled": 0xf196,
  "do-not-disturb": 0xf197,
  download: 0xf198,
  drag: 0xf199,
  dtmf: 0xf19a,
  edit: 0xf19b,
  "ellipses-horizontal": 0xf19c,
  "ellipses-vertical": 0xf19d,
  "email-alerting": 0xf19e,
  "email-connected": 0xf19f,
  "email-forwarded-rtl": 0xf1a0,
  "email-forwarded": 0xf1a1,
  "email-inbound": 0xf1a2,
  "email-missed": 0xf1a3,
  "email-not-ready": 0xf1a4,
  "email-open": 0xf1a5,
  "email-outbound": 0xf1a6,
  "email-pending": 0xf1a7,
  "email-ready": 0xf1a8,
  email: 0xf1a9,
  emergency: 0xf1aa,
  "error-filled": 0xf1ab,
  error: 0xf1ac,
  "exit-left": 0xf1ad,
  "export-logs": 0xf1ae,
  "file-avi": 0xf1af,
  "file-doc": 0xf1b0,
  "file-html": 0xf1b1,
  "file-jpg": 0xf1b2,
  "file-json": 0xf1b3,
  "file-mp4": 0xf1b4,
  "file-pdf": 0xf1b5,
  "file-png": 0xf1b6,
  "file-ppt": 0xf1b7,
  "file-rtl": 0xf1b8,
  "file-txt": 0xf1b9,
  "file-xls": 0xf1ba,
  "file-zip": 0xf1bb,
  file: 0xf1bc,
  "filter-filled": 0xf1bd,
  filter: 0xf1be,
  folder: 0xf1bf,
  "font-size": 0xf1c0,
  "format-collapse": 0xf1c1,
  "format-expand": 0xf1c2,
  "forward-fast": 0xf1c3,
  "forward-skip": 0xf1c4,
  "fullscreen-off": 0xf1c5,
  "fullscreen-on": 0xf1c6,
  "generic-avatar": 0xf1c7,
  gif: 0xf1c7,
  global: 0xf1c8,
  graph: 0xf1c9,
  "heading-1": 0xf1ca,
  "heading-2": 0xf1cb,
  "headphones-wireless": 0xf1cc,
  headphones: 0xf1cd,
  help: 0xf1ce,
  "history-reports": 0xf1cf,
  "history-search": 0xf1d0,
  history: 0xf1d1,
  "hold-off": 0xf1d2,
  "hold-on": 0xf1d3,
  home: 0xf1d4,
  "ic-conference-wifi": 0xf1d5,
  idea: 0xf1d6,
  "image-broken": 0xf1d7,
  image: 0xf1d8,
  "inbound-filled": 0xf1d9,
  info: 0xf1da,
  integrations: 0xf1db,
  "interaction-details": 0xf1dc,
  invoice: 0xf1dd,
  italics: 0xf1de,
  key: 0xf1df,
  "layout-active-speaker": 0xf1e0,
  "layout-automatic": 0xf1e1,
  "layout-concert": 0xf1e2,
  "layout-custom": 0xf1e3,
  "layout-grid": 0xf1e4,
  "layout-thumbnail-horizontal": 0xf1e5,
  "layout-thumbnail-vertical": 0xf1e6,
  layout: 0xf1e7,
  legal: 0xf1e8,
  link: 0xf1e9,
  "list-bullet": 0xf1ea,
  "list-number-rtl": 0xf1eb,
  "list-number": 0xf1ec,
  listen: 0xf1ed,
  "lock-filled": 0xf1ee,
  lock: 0xf1ef,
  "meeting-controls": 0xf1f0,
  menu: 0xf1f1,
  merge: 0xf1f2,
  "message-read": 0xf1f3,
  "messaging-alerting": 0xf1f4,
  "messaging-connected": 0xf1f5,
  "messaging-inbound": 0xf1f6,
  "messaging-missed": 0xf1f7,
  "messaging-not-ready": 0xf1f8,
  "messaging-outbound": 0xf1f9,
  "messaging-pending": 0xf1fa,
  "messaging-ready": 0xf1fb,
  messaging: 0xf1fc,
  minus: 0xf1fd,
  "missed-filled": 0xf1fe,
  mist: 0xf1ff,
  mobile: 0xf200,
  music: 0xf201,
  "network-quality-0": 0xf202,
  "network-quality-1": 0xf203,
  "network-quality-2": 0xf204,
  "network-quality-3": 0xf205,
  "network-quality": 0xf206,
  "noise-1": 0xf207,
  "noise-2": 0xf208,
  "noise-3": 0xf209,
  "noise-off": 0xf20a,
  noise: 0xf20b,
  "not-available": 0xf20c,
  "notifications-alerting": 0xf20d,
  "notifications-off": 0xf20e,
  "notifications-on-filled": 0xf20f,
  "notifications-on": 0xf210,
  "offline-filled": 0xf211,
  offline: 0xf212,
  "outbound-filled": 0xf213,
  "page-first": 0xf214,
  "page-last": 0xf215,
  paragraph: 0xf216,
  "phone-hard": 0xf217,
  "picture-in-picture": 0xf218,
  "pie-chart": 0xf219,
  "pin-off": 0xf21a,
  "pin-on": 0xf21b,
  play: 0xf21c,
  playback: 0xf21d,
  pom: 0xf21e,
  posts: 0xf21f,
  preferences: 0xf220,
  "presentation-only": 0xf221,
  print: 0xf222,
  "qr-code": 0xf223,
  "queue-external-call": 0xf224,
  "queue-internal-call": 0xf225,
  "queue-recall": 0xf226,
  "queue-send-to": 0xf227,
  queue: 0xf228,
  quote: 0xf229,
  "raise-hand": 0xf22a,
  "reason-codes": 0xf22b,
  "recall-missed": 0xf22c,
  "recording-off": 0xf22d,
  "recording-on": 0xf22e,
  redirect: 0xf22f,
  redo: 0xf230,
  refresh: 0xf231,
  "reply-all": 0xf232,
  reply: 0xf233,
  save: 0xf234,
  "screen-max": 0xf235,
  "screen-min": 0xf236,
  "screen-swap": 0xf237,
  "screenpop-off": 0xf238,
  "screenpop-on": 0xf239,
  "screenshare-off": 0xf23a,
  "screenshare-on": 0xf23b,
  search: 0xf23c,
  send: 0xf23d,
  "sentiment-happy": 0xf23e,
  "sentiment-neutral": 0xf23f,
  "sentiment-sad": 0xf240,
  "sentiment-very-happy": 0xf241,
  "sentiment-very-sad": 0xf242,
  settings: 0xf243,
  share: 0xf244,
  shield: 0xf245,
  showers: 0xf246,
  "sign-in": 0xf247,
  signature: 0xf248,
  sip: 0xf249,
  skills: 0xf24a,
  "sms-alerting": 0xf24b,
  "sms-connected": 0xf24c,
  "sms-inbound": 0xf24d,
  "sms-missed": 0xf24e,
  "sms-not-ready": 0xf24f,
  "sms-outbound": 0xf250,
  "sms-pending": 0xf251,
  "sms-ready": 0xf252,
  sms: 0xf253,
  snow: 0xf254,
  "social-alerting": 0xf255,
  "social-connected": 0xf256,
  "social-inbound": 0xf257,
  "social-integrations": 0xf258,
  "social-missed": 0xf259,
  "social-not-ready": 0xf25a,
  "social-outbound": 0xf25b,
  "social-pending": 0xf25c,
  "social-ready": 0xf25d,
  social: 0xf25e,
  "socket-connected": 0xf25f,
  "socket-disconnected": 0xf260,
  sort: 0xf261,
  "spaces-filled": 0xf262,
  spaces: 0xf263,
  "speaker-high": 0xf264,
  "speaker-low": 0xf265,
  "speaker-medium": 0xf266,
  "speaker-none": 0xf267,
  "speaker-off": 0xf268,
  "speaker-wireless": 0xf269,
  spinner: 0xf26a,
  "star-filled": 0xf26b,
  "star-half-filled": 0xf26c,
  star: 0xf26d,
  strikethrough: 0xf26e,
  "sub-accounts": 0xf26f,
  suggested: 0xf270,
  supervisor: 0xf271,
  "support-ticket": 0xf272,
  support: 0xf273,
  table: 0xf274,
  "task-incomplete": 0xf275,
  thresholds: 0xf276,
  "thumbs-down": 0xf277,
  "thumbs-up": 0xf278,
  thunderstorm: 0xf279,
  "time-extend": 0xf27a,
  timeline: 0xf27b,
  "transfer-forward": 0xf27c,
  trash: 0xf27d,
  "tv-screen": 0xf27e,
  "typing-1": 0xf27f,
  "typing-2": 0xf280,
  "typing-3": 0xf281,
  typing: 0xf282,
  underline: 0xf283,
  undo: 0xf284,
  upload: 0xf285,
  "user-add": 0xf286,
  "user-conference": 0xf287,
  "user-details-rtl": 0xf288,
  "user-details": 0xf289,
  "user-group": 0xf28a,
  "user-waiting": 0xf28b,
  "video-alerting": 0xf28c,
  "video-connected": 0xf28d,
  "video-inbound": 0xf28e,
  "video-missed": 0xf28f,
  "video-not-ready": 0xf290,
  "video-off": 0xf291,
  "video-on": 0xf292,
  "video-outbound": 0xf293,
  "video-pending": 0xf294,
  "video-ready": 0xf295,
  "video-warning": 0xf296,
  "view-off": 0xf297,
  "view-on": 0xf298,
  "view-tiles": 0xf299,
  "voicemail-private": 0xf29a,
  voicemail: 0xf29b,
  "warning-filled": 0xf29c,
  warning: 0xf29d,
  whisper: 0xf29e,
  "widget-layout": 0xf29f,
  "widget-overview": 0xf2a0,
  wifi: 0xf2a1,
  "window-attach": 0xf2a2,
  "window-detach": 0xf2a3,
  "work-code": 0xf2a4,
  "work-end": 0xf2a5,
  "work-start": 0xf2a6,
  workflow: 0xf2a7,
  "zoom-in": 0xf2a8,
  "zoom-out": 0xf2a9,
  "expand-all": 0xf2b1,
  "collapse-all": 0xf2b2,
  "font-color": 0xf2b3,
  "font-family": 0xf2b4,
  "font-highlight": 0xf2b5,
  "format-predefined": 0xf2b6,
  "format-remove": 0xf2b7,
  "indent-decrease": 0xf2b8,
  "indent-increase": 0xf2b9,
  "line-break": 0xf2c1,
  "special-character": 0xf2c2,
  superscript: 0xf2c3,
  "link-remove": 0xf2c4,
  "camera-ext-off": 0xf2c5,
  "camera-ext-on": 0xf2c6,
  label: 0xf2c7,
  "mobile-not-paired": 0xf2c8,
  "mobile-paired": 0xf2c9,
  "mobile-wireless": 0xf2d1,
  "font-family-ar": 0xf2d2,
  "font-family-he": 0xf2d3,
  "font-family-zh": 0xf2d4,
  "font-family-ja": 0xf2d5,
  "font-family-ko": 0xf2d6,
  "font-color-ar": 0xf2d7,
  "font-color-ar": 0xf2d8,
  "font-color-ar": 0xf2d9,
  "font-color-he": 0xf2e1,
  "font-color-zh": 0xf2e2,
  "font-color-ja": 0xf2e3,
  "font-color-ko": 0xf2e4,
  "format-expand-ar": 0xf2e5,
  "format-expand-he": 0xf2e6,
  "format-expand-zh": 0xf2e7,
  "format-expand-ja": 0xf2e8,
  "format-expand-ko": 0xf2e9,
  "format-collapse-ar": 0xf2f1,
  "format-collapse-he": 0xf2f2,
  "format-collapse-zh": 0xf2f3,
  "format-collapse-ja": 0xf2f4,
  "format-collapse-ko": 0xf2f5,
  "font-highlight-ar": 0xf2f6,
  "font-highlight-he": 0xf2f7,
  "font-highlight-zh": 0xf2f8,
  "font-highlight-ja": 0xf2f9,
  "font-highlight-ko": 0xf3a1,
  "format-predefined-ar": 0xf3a2,
  "format-predefined-he": 0xf3a3,
  "format-predefined-zh": 0xf3a4,
  "format-predefined-ja": 0xf3a5,
  "format-predefined-ko": 0xf3a6,
  "format-remove-ar": 0xf3a7,
  "format-remove-he": 0xf3a8,
  "format-remove-zh": 0xf3a9,
  "format-remove-ja": 0xf3b1,
  "format-remove-ko": 0xf3b2,
  "font-size-ar": 0xf3b3,
  "font-size-he": 0xf3b4,
  "font-size-zh": 0xf3b5,
  "font-size-ja": 0xf3b6,
  "font-size-ko": 0xf3b7,
  "play-filled": 0xf3b8,
  "stop-filled": 0xf3b9,
  usb: 0xf3c1,
  "audio-filled": 0xf3c2,
  "audio-on-1": 0xf3c3,
  "audio-on-2": 0xf3c4,
  "audio-on-3": 0xf3c5,
  "audio-jack": 0xf3c6,
  clean: 0xf3c7,
  "line-straight": 0xf3c8,
  text: 0xf3c9,
  "shape-circle": 0xf3d1,
  "shape-square": 0xf3d2,
  "shape-circle-filled": 0xf3d3,
  "shape-square-filled": 0xf3d4,
  select: 0xf3d5,
  erase: 0xf3d6,
  "dashboard-filled": 0xf3d7,
  "bridged-line-appearance": 0xf3d8,
  "ic-conference-wifi": 0xf3d9,
  "bounce": 0xf3e1,
  "forward": 0xf3e2
};

// .neo-icon-legal:before {
//   content: "\f1e8";
// }

// We call the above function to generate the base64 String that we will be inserting into our css

// convertIconFontToBase64().then(async (result) => {
// We get an array of the file names in our icons folder

const generateIcons = async () => {
  var IconsArray = await fs
    .readdir("../properties/assets/icons/svgs")
    .then(async (files) => {
      // utility function to create file with copyable SVG code

      await iconUtilityFunctions.createCopyableSVG(files);

      // we temporarily filter out 'fill' type icons

      var unfilteredArray = files.map((file) => {
        // if (
        //   file.includes('fill') &&
        //   !file.includes('star') &&
        //   !file.includes('arrow')
        // ) {
        //   return;
        // } else {
        return `../properties/assets/icons/svgs/${file}`;
        // }
      });

      return unfilteredArray.filter((icon) => {
        return icon != undefined;
      });
    });

  /*// NOTE:

    -- Icon unicode needs to be manually updated when specified in Neo code. This is the case for the following components:
    * Accordions
    * Checkboxes
    * Dropdown
    * Selectbox
    * Expandable Chip
    //*/

  // We pass both the above array and the base64 String into the webfontsGenerator function

  webfontsGenerator(
    {
      // files: ["../properties/assets/images/generic-avatar.svg"],
      files: IconsArray,
      dest: "../build/css",
      fontName: "updated-neo-icons",
      types: ["woff"],
      cssTemplate: "../templates/css.hbs",
      templateOptions: {
        // src: `url(data:application/font-woff;base64,${result}) format('woff')`,
        // temporary class prefix for the purposes of side-by-side demo
        // TO-DO: replace this with universal class name when using namespaces
        classPrefix: "neo-icon-",
        // codepoints: unicodes,
      },
      html: false,
      // htmlTemplate: '../templates/html.hbs',
      normalize: true,
      fontHeight: 1000,
      codepoints: unicodes,
    },
    async function (error, result) {
      if (error) {
        console.log("Fail!", error);
      } else {
        // console.log(result);

        const base64FileBuffer = await fs.readFile(
          "../build/css/updated-neo-icons.woff"
        );

        const contents_in_base64 = await base64FileBuffer.toString("base64");
        // console.log(contents_in_base64.toString());

        // create variable for ':root' RegEx

        var regEx = new RegExp("replaceMe", "g");

        // create Object to use as function parameter

        const replaceSource = {
          files: "../build/css/updated-neo-icons.css",
          from: regEx,
          to: `url(data:application/font-woff;base64,${contents_in_base64.toString()}) format('woff')`,
        };

        replacelib(replaceSource).then(async (results) => {
          console.log("Replacement results:", results);
          const prettierConfig = await prettier.resolveConfig(
            "../build/css/updated-neo-icons.css"
          );
          await fs
            .readFile("../build/css/updated-neo-icons.css")
            .then(async (fileContent) => {
              await fs
                .writeFile(
                  "../build/css/updated-neo-icons.css",
                  prettier.format(fileContent.toString(), {
                    ...prettierConfig,
                    filepath: "../build/css/updated-neo-icons.css",
                  })
                )
                .then(async () => {
                  await fs
                    .readFile("../build/css/updated-neo-icons.css")
                    .then(async (result) => {
                      //   console.log(result.toString());
                      await fs.writeFile(
                        "../neo/scss-update/icons.scss",
                        result.toString()
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
            });
          console.log("updated-neo-icons.css generated in build/ folder");
        });
      }
    }
  );
};
// });

generateIcons();
