const fs = require('fs').promises;

// interactivity styles include motions, animations etc.
// NOTE: all these styles are hard-coded for now as there is no way to include them in Figma
// these are currently taken from Sprout Social's design system

async function pullInteractivityTokens() {
  const interactivityJSONOBject = {
    interactivity: {
      // all hard-coded for now
      motionFast: { value: '.15s' },
      motionMedium: { value: '.4s' },
      motionSlow: { value: '.9s' },
      motionEaseIn: { value: 'cubic-bezier(.4, 0, .7, .2)' },
      motionEase: { value: 'cubic-bezier(0.25, 0.1, 0.25, 1)' },
      motionEaseOut: { value: 'cubic-bezier(0, 0, .2, 1)' },
      motionFadeFast: { value: 'all .15s' },
      motionFadeSlow: { value: 'all .6s' },
      motionComboFastShort: { value: 'transform .15s, background .15s' },
      motionComboFastMedium: { value: 'transform .3s, background .15s' },
      motionComboSlowLong: { value: 'transform .6s, background .6s' },
    },
  };

  await fs
    .writeFile(
      '../properties/interactivityStyles.json',
      JSON.stringify(interactivityJSONOBject)
    )
    .then(() => {
      console.log('interactivityStyles.json created');
    })
    .catch((error) => {
      console.log(error);
    });
}

exports.pullInteractivityTokens = pullInteractivityTokens;
