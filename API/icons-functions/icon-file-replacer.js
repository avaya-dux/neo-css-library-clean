const replace = require('replace-in-file');

const replaceString = require('./icon-utility-files/icon-replacement-string');

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

// this is also used in icons-utility-functions to create copyable SVGs, and in our Firebase Functiosn file to change the file name as necessary

const iconReplace = {
  files: '../build/css/updated-neo-icons.css',
  from: replaceString.stringsToReplace,
  to: '',
};

replace(iconReplace).then((results) => {
  console.log('Replacement results:', results);
});
