const child_process = require('child_process');
const path = require('path');

var timestamp = new Date();
var zipFileName = `neo_zip_${timestamp.getFullYear()}-${
  timestamp.getMonth() + 1
}-${timestamp.getDate()}`;

child_process.execSync(`zip -r ${zipFileName} *`, {
  cwd: path.resolve(__dirname) + '/neo_zip',
});
