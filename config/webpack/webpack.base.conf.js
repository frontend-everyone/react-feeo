const path = require('path');
const webpack = require('webpack');//引入webpack
const entry = require("./webpack.entry.conf");
const newEntry = {};
for (let name in entry) {
    newEntry[name] = entry[name][0]
}
let config = {
    entry: newEntry,
    optimization: {
        //包清单
        runtimeChunk: {
            name: "manifest"
        },
        //拆分公共包
        splitChunks: {
            cacheGroups: {
                //项目公共组件
                common: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                //第三方组件
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    'cache-loader',
                    'babel-loader',
                ],
                include: [
                    path.resolve(__dirname, "../../app"),
                    path.resolve(__dirname, "../../entryBuild")
                ],
                exclude: [
                    path.resolve(__dirname, "../../node_modules")
                ],
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ],
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".pcss"],
    }
};
module.exports = config;