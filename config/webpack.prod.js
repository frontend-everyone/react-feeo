const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const webpackCommon = require("./webpack.common.js");
const { uglifyJSPluginConfig } = require("./webpack.utils.conf");

module.exports = merge(webpackCommon(), {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve("dist"),
    chunkFilename: "js/[name].[contenthash:8].js"
  },
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 9,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.join(__dirname, "../")
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin(
      chunk =>
        chunk.name || Array.from(chunk.modulesIterable, m => m.id).join("_")
    ),
    new OptimizeCSSAssetsPlugin({}),
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(zh-cn|en-gb)$/
    ),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, ".."),
      manifest: require("./dll/vendor-manifest.json")
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, ".."),
      manifest: require("./dll/antd-manifest.json")
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, "../config/dll/*.dll.js"),
        outputPath: "js",
        publicPath: "js"
      }
    ]),
    uglifyJSPluginConfig
  ]
});
