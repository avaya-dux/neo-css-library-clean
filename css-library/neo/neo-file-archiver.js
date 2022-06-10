// code to generate the neo.zip file for upload to the design portal site

const child_process = require("child_process");
const path = require("path");

child_process.execSync(`zip -r neo *`, {
  cwd: path.resolve(__dirname) + "/neo_zip",
});
