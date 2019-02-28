const path = require("path");
const webpack = require("webpack");
const { uglifyJSPluginConfig } = require("./webpack.utils.conf");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router-dom",
      "redux",
      "redux-thunk",
      "react-loadable"
    ]
  },
  output: {
    path: path.join(__dirname, "dll"),
    filename: "[name].[contenthash:8].dll.js",
    library: "[name]_lib"
  },
  plugins: [
    new CleanWebpackPlugin(["config/dll/vendor*"], {
      root: path.join(__dirname, "../")
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, ".", "dll/[name]-manifest.json"),
      name: "[name]_lib"
    }),
    uglifyJSPluginConfig
  ]
};
