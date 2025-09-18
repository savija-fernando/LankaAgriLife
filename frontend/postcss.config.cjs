const { default: autoprefixer } = require("autoprefixer");

// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer:{},
  },
};
