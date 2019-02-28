const path = require('path');
const webpack = require('webpack');//引入webpack
const merge = require('webpack-merge');//webpack配置文件合并
const baseWebpackConfig = require('./webpack.base.conf');//基础配置
const webpackFile = require('./webpack.file.conf');//一些路径配置
const webpackComConf = require('./webpack.com.conf');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const opn = require('opn');//打开浏览器
let config = merge(baseWebpackConfig, {
    /*设置开发环境*/
    mode: 'development',
    output: {
        path: path.resolve(webpackFile.devDirectory),
        filename: 'js/[name].js',
        chunkFilename: "js/[name].js"
    },
    plugins: [
        /*设置热更新*/
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,
                            eslintPath: require.resolve('eslint'),
                            // @remove-on-eject-begin
                            baseConfig: {
                                extends: [require.resolve('eslint-config-react-app')],
                            },
                            //ignore: false,
                            useEslintrc: false,
                            // @remove-on-eject-end
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: [
                    path.resolve(__dirname, "../../app")
                ],
                exclude: [
                    path.resolve(__dirname, "../../node_modules")
                ],
            },
            {
                test: /\.(css|pcss)$/,
                use: [
                    { loader: "style-loader", options: {sourceMap: true}},
                    { loader: 'css-loader', options: {sourceMap: true, importLoaders: 1 } },
                    { loader: 'postcss-loader', options: {
                        sourceMap: true,
                        ident: 'postcss',
                        plugins: () => webpackComConf.postcss
                    }}
                ],
                include: webpackComConf.cssInclude,
            },
            {
                test: webpackComConf.img,
                loader: 'file-loader?name=[name].[ext]&outputPath=' + webpackFile.resource + '/'
            }
        ]
    },
    /*设置api转发*/
    devServer: {
        host: '0.0.0.0',
        port: 9000,
        hot: true,
        inline: true,
        contentBase: path.resolve(webpackFile.devDirectory),
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: [
            {
                context: ['/girlx/**', '/u/**'],
                //target: 'http://192.168.1.100:8080',
                target: 'http://172.16.21.39:10086',
                secure: false
            }
        ],
        /*打开浏览器 并打开本项目网址*/
        after() {
            opn('http://localhost:' + this.port);
        }
    }
});
module.exports = config;