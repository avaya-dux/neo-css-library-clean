const replace = require('replace-in-file');

// code to format icon name for .css file
// hard-coded for now in the interest of time
// TO-DO: need to add RegEx for:
/* 


- sub-accounts - DONE
- defer-interaction - DONE
- email-outline - DONE
- info-outline - DONE
- warning-outline - DONE
- star-outline - DONE
- error-outline - DONE
- social-active - DONE
- file - DONE
- file-xls - DONE
- file-json - DONE
- file-zip - DONE
- voice-alerting - DONE
- sms-alerting - DONE
- video-alerting - DONE

*/

// this is also used in icons-utility-functions to create copyable SVGs
var stringsToReplace = new RegExp(
  /(?<!email-|info-|error-|warning-|star-)outline|status|communication|(?<!file-)file(?!type|:|-xls|-json|-zip)|alert(?!ing)|navigation|(?<!defer-inter)action|(?<!sub-)account|content(?!\:)|editor|social(?!-active)|logo|other/,
  'g'
);

const iconReplace = {
  files: '../build/css/NEO-icon-update.css',
  from: stringsToReplace,
  to: '',
};

replace(iconReplace).then((results) => {
  console.log('Replacement results:', results);
});
