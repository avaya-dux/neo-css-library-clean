const fs = require("fs").promises;
const webfontsGenerator = require("webfonts-generator");

const iconUtilityFunctions = require("./icon-utility-files/icons-utility-functions.js");

// const iconInfo = require('./icon-utility-files/iconInfo.js');
const { includes } = require("lodash");

const Handlebars = require("handlebars");

const replace = require("./icon-utility-files/icon-replacement-string");

const replacelib = require("replace-in-file");

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
  "add-circle": "f101",
  add: "f102",
  "address-book": "f103",
  address: "f104",
  agents: "f105",
  "align-bottom": "f106",
  "align-center-horizontal": "f107",
  "align-center-vertical": "f108",
  "align-distribute-horizontal": "f109",
  "align-distribute-vertical": "f10a",
  "align-left": "f10b",
  "align-right": "f10c",
  "align-top": "f10d",
  "alignment-center": "f10e",
  "alignment-left": "f10f",
  "alignment-right": "f110",
  analytics: "f111",
  "app-grid": "f112",
  archive: "f113",
  "arrow-down": "f114",
  "arrow-fill-down": "f115",
  "arrow-fill-left": "f116",
  "arrow-fill-right": "f117",
  "arrow-fill-up": "f118",
  "arrow-left": "f119",
  "arrow-right": "f11a",
  "arrow-up": "f11b",
  "at-symbol": "f11c",
  attach: "f11d",
  "audio-lock": "f11e",
  "audio-off": "f11f",
  "audio-on": "f120",
  "audio-warning": "f121",
  "audit-rtl": "f122",
  audit: "f123",
  "auto-answer": "f124",
  "av-block": "f125",
  "av-settings": "f126",
  "available-filled": "f127",
  available: "f128",
  "away-filled": "f129",
  away: "f12a",
  "awfos-rtl": "f12b",
  awfos: "f12c",
  backspace: "f12d",
  "backward-fast": "f12e",
  "backward-skip": "f12f",
  "bar-chart": "f130",
  "barge-in": "f131",
  "billboard-chart": "f132",
  billboard: "f133",
  bold: "f134",
  bot: "f135",
  broadcast: "f136",
  business: "f137",
  "busy-filled": "f138",
  busy: "f139",
  calculator: "f13a",
  calendar: "f13b",
  "call-add": "f13c",
  "call-alerting": "f13d",
  "call-connected": "f13e",
  "call-dial-in": "f13f",
  "call-end": "f140",
  "call-inbound": "f141",
  "call-logs-rtl": "f142",
  "call-logs": "f143",
  "call-make": "f144",
  "call-missed": "f145",
  "call-mute": "f146",
  "call-not-ready": "f147",
  "call-outbound": "f148",
  "call-pending": "f149",
  "call-ready": "f14a",
  "call-split": "f14b",
  "call-transfer": "f14c",
  call: "f14d",
  callback: "f14e",
  "camera-control": "f14f",
  "camera-flip": "f150",
  camera: "f151",
  "caps-lock": "f152",
  cart: "f153",
  "center-focus": "f154",
  "change-password": "f155",
  "chart-area": "f156",
  "chart-bubbles": "f157",
  "chart-donut": "f158",
  "chart-gauge": "f159",
  "chart-lines": "f15a",
  "chat-alerting": "f15b",
  "chat-connected": "f15c",
  "chat-filled": "f15d",
  "chat-inbound": "f15e",
  "chat-missed": "f15f",
  "chat-not-ready": "f160",
  "chat-outbound": "f161",
  "chat-pending": "f162",
  "chat-ready": "f163",
  chat: "f164",
  check: "f165",
  "chevron-down": "f166",
  "chevron-left": "f167",
  "chevron-right": "f168",
  "chevron-up": "f169",
  "clear-day": "f16a",
  "clear-night": "f16b",
  clipboard: "f16c",
  "clone-preview": "f16d",
  close: "f16e",
  "closed-caption": "f16f",
  "cloudy-few": "f170",
  "cloudy-scattered": "f171",
  cloudy: "f172",
  "co-browse": "f173",
  coach: "f174",
  "code-cloud": "f175",
  code: "f176",
  comments: "f177",
  computer: "f178",
  "conference-call": "f179",
  configure: "f17a",
  "connected-filled": "f17b",
  "contact-filled": "f17c",
  contact: "f17d",
  "control-release": "f17e",
  "control-request": "f17f",
  copy: "f180",
  "credit-card": "f181",
  crm: "f182",
  crown: "f183",
  "custom-alerting": "f184",
  "custom-connected": "f185",
  "custom-inbound": "f186",
  "custom-missed": "f187",
  "custom-not-ready": "f188",
  "custom-outbound": "f189",
  "custom-pending": "f18a",
  "custom-ready": "f18b",
  custom: "f18c",
  "customer-journey": "f18d",
  dashboard: "f18e",
  "defer-in": "f18f",
  "defer-inbox": "f190",
  "defer-out": "f191",
  dialpad: "f192",
  digital: "f193",
  disconnected: "f194",
  "disposition-code": "f195",
  "do-not-disturb-filled": "f196",
  "do-not-disturb": "f197",
  download: "f198",
  drag: "f199",
  dtmf: "f19a",
  edit: "f19b",
  "ellipses-horizontal": "f19c",
  "ellipses-vertical": "f19d",
  "email-alerting": "f19e",
  "email-connected": "f19f",
  "email-forwarded-rtl": "f1a0",
  "email-forwarded": "f1a1",
  "email-inbound": "f1a2",
  "email-missed": "f1a3",
  "email-not-ready": "f1a4",
  "email-open": "f1a5",
  "email-outbound": "f1a6",
  "email-pending": "f1a7",
  "email-ready": "f1a8",
  email: "f1a9",
  emergency: "f1aa",
  "error-filled": "f1ab",
  error: "f1ac",
  "exit-left": "f1ad",
  "export-logs": "f1ae",
  "file-avi": "f1af",
  "file-doc": "f1b0",
  "file-html": "f1b1",
  "file-jpg": "f1b2",
  "file-json": "f1b3",
  "file-mp4": "f1b4",
  "file-pdf": "f1b5",
  "file-png": "f1b6",
  "file-ppt": "f1b7",
  "file-rtl": "f1b8",
  "file-txt": "f1b9",
  "file-xls": "f1ba",
  "file-zip": "f1bb",
  file: "f1bc",
  "filter-filled": "f1bd",
  filter: "f1be",
  folder: "f1bf",
  "font-size": "f1c0",
  "format-collapse": "f1c1",
  "format-expand": "f1c2",
  "forward-fast": "f1c3",
  "forward-skip": "f1c4",
  "fullscreen-off": "f1c5",
  "fullscreen-on": "f1c6",
  "generic-avatar": "f1c7",
  gif: "f1c7",
  global: "f1c8",
  graph: "f1c9",
  "heading-1": "f1ca",
  "heading-2": "f1cb",
  "headphones-wireless": "f1cc",
  headphones: "f1cd",
  help: "f1ce",
  "history-reports": "f1cf",
  "history-search": "f1d0",
  history: "f1d1",
  "hold-off": "f1d2",
  "hold-on": "f1d3",
  home: "f1d4",
  "ic-conference-wifi": "f1d5",
  idea: "f1d6",
  "image-broken": "f1d7",
  image: "f1d8",
  "inbound-filled": "f1d9",
  info: "f1da",
  integrations: "f1db",
  "interaction-details": "f1dc",
  invoice: "f1dd",
  italics: "f1de",
  key: "f1df",
  "layout-active-speaker": "f1e0",
  "layout-automatic": "f1e1",
  "layout-concert": "f1e2",
  "layout-custom": "f1e3",
  "layout-grid": "f1e4",
  "layout-thumbnail-horizontal": "f1e5",
  "layout-thumbnail-vertical": "f1e6",
  layout: "f1e7",
  legal: "f1e8",
  link: "f1e9",
  "list-bullet": "f1ea",
  "list-number-rtl": "f1eb",
  "list-number": "f1ec",
  listen: "f1ed",
  "lock-filled": "f1ee",
  lock: "f1ef",
  "meeting-controls": "f1f0",
  menu: "f1f1",
  merge: "f1f2",
  "message-read": "f1f3",
  "messaging-alerting": "f1f4",
  "messaging-connected": "f1f5",
  "messaging-inbound": "f1f6",
  "messaging-missed": "f1f7",
  "messaging-not-ready": "f1f8",
  "messaging-outbound": "f1f9",
  "messaging-pending": "f1fa",
  "messaging-ready": "f1fb",
  messaging: "f1fc",
  minus: "f1fd",
  "missed-filled": "f1fe",
  mist: "f1ff",
  mobile: "f200",
  music: "f201",
  "network-quality-0": "f202",
  "network-quality-1": "f203",
  "network-quality-2": "f204",
  "network-quality-3": "f205",
  "network-quality": "f206",
  "noise-1": "f207",
  "noise-2": "f208",
  "noise-3": "f209",
  "noise-off": "f20a",
  noise: "f20b",
  "not-available": "f20c",
  "notifications-alerting": "f20d",
  "notifications-off": "f20e",
  "notifications-on-filled": "f20f",
  "notifications-on": "f210",
  "offline-filled": "f211",
  offline: "f212",
  "outbound-filled": "f213",
  "page-first": "f214",
  "page-last": "f215",
  paragraph: "f216",
  "phone-hard": "f217",
  "picture-in-picture": "f218",
  "pie-chart": "f219",
  "pin-off": "f21a",
  "pin-on": "f21b",
  play: "f21c",
  playback: "f21d",
  pom: "f21e",
  posts: "f21f",
  preferences: "f220",
  "presentation-only": "f221",
  print: "f222",
  "qr-code": "f223",
  "queue-external-call": "f224",
  "queue-internal-call": "f225",
  "queue-recall": "f226",
  "queue-send-to": "f227",
  queue: "f228",
  quote: "f229",
  "raise-hand": "f22a",
  "reason-codes": "f22b",
  "recall-missed": "f22c",
  "recording-off": "f22d",
  "recording-on": "f22e",
  redirect: "f22f",
  redo: "f230",
  refresh: "f231",
  "reply-all": "f232",
  reply: "f233",
  save: "f234",
  "screen-max": "f235",
  "screen-min": "f236",
  "screen-swap": "f237",
  "screenpop-off": "f238",
  "screenpop-on": "f239",
  "screenshare-off": "f23a",
  "screenshare-on": "f23b",
  search: "f23c",
  send: "f23d",
  "sentiment-happy": "f23e",
  "sentiment-neutral": "f23f",
  "sentiment-sad": "f240",
  "sentiment-very-happy": "f241",
  "sentiment-very-sad": "f242",
  settings: "f243",
  share: "f244",
  shield: "f245",
  showers: "f246",
  "sign-in": "f247",
  signature: "f248",
  sip: "f249",
  skills: "f24a",
  "sms-alerting": "f24b",
  "sms-connected": "f24c",
  "sms-inbound": "f24d",
  "sms-missed": "f24e",
  "sms-not-ready": "f24f",
  "sms-outbound": "f250",
  "sms-pending": "f251",
  "sms-ready": "f252",
  sms: "f253",
  snow: "f254",
  "social-alerting": "f255",
  "social-connected": "f256",
  "social-inbound": "f257",
  "social-integrations": "f258",
  "social-missed": "f259",
  "social-not-ready": "f25a",
  "social-outbound": "f25b",
  "social-pending": "f25c",
  "social-ready": "f25d",
  social: "f25e",
  "socket-connected": "f25f",
  "socket-disconnected": "f260",
  sort: "f261",
  "spaces-filled": "f262",
  spaces: "f263",
  "speaker-high": "f264",
  "speaker-low": "f265",
  "speaker-medium": "f266",
  "speaker-none": "f267",
  "speaker-off": "f268",
  "speaker-wireless": "f269",
  spinner: "f26a",
  "star-filled": "f26b",
  "star-half-filled": "f26c",
  star: "f26d",
  strikethrough: "f26e",
  "sub-accounts": "f26f",
  suggested: "f270",
  supervisor: "f271",
  "support-ticket": "f272",
  support: "f273",
  table: "f274",
  "task-incomplete": "f275",
  thresholds: "f276",
  "thumbs-down": "f277",
  "thumbs-up": "f278",
  thunderstorm: "f279",
  "time-extend": "f27a",
  timeline: "f27b",
  "transfer-forward": "f27c",
  trash: "f27d",
  "tv-screen": "f27e",
  "typing-1": "f27f",
  "typing-2": "f280",
  "typing-3": "f281",
  typing: "f282",
  underline: "f283",
  undo: "f284",
  upload: "f285",
  "user-add": "f286",
  "user-conference": "f287",
  "user-details-rtl": "f288",
  "user-details": "f289",
  "user-group": "f28a",
  "user-waiting": "f28b",
  "video-alerting": "f28c",
  "video-connected": "f28d",
  "video-inbound": "f28e",
  "video-missed": "f28f",
  "video-not-ready": "f290",
  "video-off": "f291",
  "video-on": "f292",
  "video-outbound": "f293",
  "video-pending": "f294",
  "video-ready": "f295",
  "video-warning": "f296",
  "view-off": "f297",
  "view-on": "f298",
  "view-tiles": "f299",
  "voicemail-private": "f29a",
  voicemail: "f29b",
  "warning-filled": "f29c",
  warning: "f29d",
  whisper: "f29e",
  "widget-layout": "f29f",
  "widget-overview": "f2a0",
  wifi: "f2a1",
  "window-attach": "f2a2",
  "window-detach": "f2a3",
  "work-code": "f2a4",
  "work-end": "f2a5",
  "work-start": "f2a6",
  workflow: "f2a7",
  "zoom-in": "f2a8",
  "zoom-out": "f2a9",
};

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
      },
      html: false,
      // htmlTemplate: '../templates/html.hbs',
      normalize: true,
      fontHeight: 1000,
      // codepoints: unicodes,
    },
    async function (error, result) {
      if (error) {
        console.log("Fail!", error);
      } else {
        // console.log(result);

        const contents_in_base64 = await result.woff.toString("base64");
        // console.log(contents_in_base64.toString());

        // create variable for ':root' RegEx

        var regEx = new RegExp("replaceMe", "g");

        // create Object to use as function parameter

        const replaceSource = {
          files: "../build/css/updated-neo-icons.css",
          from: regEx,
          to: `url(data:application/font-woff;base64,${contents_in_base64.toString()}) format('woff')`,
        };

        replacelib(replaceSource).then((results) => {
          console.log("Replacement results:", results);
          console.log("updated-neo-icons.css generated in build/ folder");
        });
      }
    }
  );
};
// });

generateIcons();
