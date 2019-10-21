// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "autoprefixer": {},
    "postcss-plugin-px2rem": {
      mediaQuery: true,
      minPixelValue: 2,
      rootValue: 75
    }
  }
}
