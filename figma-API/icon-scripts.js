const execSync = require("child_process").execSync;

const arg = process.argv.slice(2) || "";

const combinedArgs = arg.join(" ");

execSync("npm run pull-icons " + combinedArgs, { stdio: [0, 1, 2] });
execSync("npm run write-icons", { stdio: [0, 1, 2] });
