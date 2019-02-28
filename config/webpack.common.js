const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { entry, pagesHtml } = require("./webpack.pages");
const webpackUtils = require("./webpack.utils.conf");

module.exports = argv => {
  const devMode = argv === "development";
  return {
    entry,
    output: {
      filename: "js/[name].js",
      path: path.resolve("dist"),
      chunkFilename: "[name].js"
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "./css/[name].[contenthash:8].css",
        chunkFilename: devMode
          ? "[name].css"
          : "./css/[name].[contenthash:8].css"
      }),
      ...pagesHtml
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                plugins: devMode ? ["react-hot-loader/babel"] : []
              }
            }
          ]
        },
        {
          test: /\.(css|pcss)$/,
          use: [
            devMode
              ? { loader: "style-loader", options: { sourceMap: true } }
              : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { sourceMap: true, importLoaders: 1 }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                ident: "postcss",
                plugins: () => webpackUtils.postcss
              }
            }
          ]
        },
        {
          test: webpackUtils.img,
          loader: devMode
            ? "file-loader?name=[name].[ext]&outputPath=assets"
            : "url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=../assets&outputPath=assets/"
        }
      ]
    },
    resolve: {
      extensions: [".jsx", ".js", "json", ".pcss", ".css"],
      alias: {
        "@": path.resolve(__dirname, "../src")
      }
    }
  };
};
