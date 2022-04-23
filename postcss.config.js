const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const atImport = require("postcss-import");

module.exports = {
  plugins: [
    atImport,
    autoprefixer,
    csso({
      restructure: false,
    }),
  ],
};
