const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const site = require("./site.config.json");

module.exports = {
  titleFun: (chunkName, title) => {
    const titleDef = site.title;
    if (chunkName.indexOf("index") !== -1) {
      return titleDef;
    } else {
      return title + "_" + titleDef;
    }
  },
  cssInclude: [path.resolve(__dirname, "../src/public/css/")],
  img: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
  postcss: [require("precss"), require("postcss-preset-env")()],
  uglifyJSPluginConfig: new UglifyJSPlugin({
    uglifyOptions: {
      cache: true,
      parallel: true,
      output: {
        comments: false
      }
    }
  })
};
