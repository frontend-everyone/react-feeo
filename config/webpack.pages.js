const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackUtils = require("./webpack.utils.conf");

const pages = [];
const pagesHtml = [];
const files = fs.readdirSync("./src/pages");
files.forEach(item => {
  const stat = fs.lstatSync("./src/pages/" + item);
  if (stat.isDirectory() === true) {
    let seo = false;
    try {
      seo = JSON.parse(
        fs.readFileSync("./src/pages/" + item + "/seo.json", "utf-8")
      );
    } catch (error) {
      console.error(
        "\u001b[31m The missing seo.json file in the directory , ./src/pages/" +
          item +
          "/seo.json \u001b[39m"
      );
    }
    const fileName = item.toLowerCase();
    pages.push({
      name: fileName,
      path: "./src/pages/" + item + "/Index.jsx",
      title: (seo && seo.title) || fileName,
      keywords: (seo && seo.keywords) || fileName,
      description: (seo && seo.description) || fileName
    });
  }
});

const entry = {};
pages.map(data => {
  entry[data.name] = data.path;
  const conf = {
    filename: data.name + ".html",
    template: "index.html",
    inject: true,
    title: webpackUtils.titleFun(data.name, data.title),
    keywords: data.keywords,
    description: data.description,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunks: ["manifest", "vendor", "common", "antd", data.name],
    hash: false,
    chunksSortMode: "dependency"
  };
  pagesHtml.push(new HtmlWebpackPlugin(conf));
});

module.exports = {
  entry,
  pagesHtml
};
