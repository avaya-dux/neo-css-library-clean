const fs = require('fs').promises;

const iconsFile = await fs.readFile('./build/css/updated-neo-icons.css');
