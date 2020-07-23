// function to convert RGB color codes to hex codes

const rgbToHex = (r, g, b) =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);

exports.rgbToHex = rgbToHex;
