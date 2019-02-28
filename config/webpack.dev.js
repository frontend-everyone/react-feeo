const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const apiMocker = require("webpack-api-mocker");
const webpackCommon = require("./webpack.common.js");

const mode = "development";

module.exports = merge(webpackCommon(mode), {
  mode,
  devtool: "eval",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  devServer: {
    port: 9001,
    contentBase: "./dist",
    hot: true,
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: [
      {
        context: ["/api/**"],
        target: "http://192.168.1.21:8090",
        secure: false
      }
    ],
    before: app => {
      apiMocker(app, path.resolve("./mock/api.js"));
    }
  }
});
