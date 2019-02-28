const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { uglifyJSPluginConfig } = require("./webpack.utils.conf");

module.exports = {
  mode: "production",
  entry: {
    antd: [
      "antd/es/message",
      "antd/es/spin",
      "antd/es/modal",
      "antd/es/button",
      "antd/es/icon",
      "antd/es/input",
      "antd/es/input-number",
      "antd/es/list",
      "antd/es/tooltip",
      "antd/es/radio",
      "antd/es/switch",
      "antd/es/checkbox",
      "antd/es/select",
      "antd/es/tag"
    ]
  },
  output: {
    path: path.join(__dirname, "dll"),
    filename: "[name].[contenthash:8].dll.js",
    library: "[name]_lib"
  },
  plugins: [
    new CleanWebpackPlugin(["config/dll/antd*"], {
      root: path.join(__dirname, "../")
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, ".", "dll/[name]-manifest.json"),
      name: "[name]_lib"
    }),
    uglifyJSPluginConfig
  ]
};
