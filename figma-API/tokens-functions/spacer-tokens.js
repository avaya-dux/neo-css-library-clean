const fs = require('fs').promises;

/*
// these are to create global spacer tokens
// NOTE: these are hard-coded for now - they are current NEO spacers as shown below, rounded to 'four'

$global-spacer: 6px
$global-spacer-small: 3px
$global-spacer-large: 10px
$global-spacer-x-large: 15px

*/

async function pullSpacerTokens() {
  const spacerJSONObject = {
    'global-spacer': {
      small: { value: '4px' },
      regular: { value: '8px' },
      large: { value: '12px' },
      'x-large': { value: '16px' },
    },
  };

  await fs
    .writeFile(
      '../properties/spacerStyles.json',
      JSON.stringify(spacerJSONObject)
    )
    .then(() => {
      console.log('spacerStyles.json created');
    })
    .catch((error) => {
      console.log(error);
    });
}

exports.pullSpacerTokens = pullSpacerTokens;
