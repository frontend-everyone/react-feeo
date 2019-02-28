const path = require('path');
const merge = require('webpack-merge');//webpack配置文件合并
const baseWebpackConfig = require('./webpack.base.conf');//基础配置
const webpackFile = require('./webpack.file.conf');//一些路径配置
const webpackComConf = require('./webpack.com.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const entry = require("./webpack.entry.conf");
const webpackCom = require("./webpack.com.conf");

let config = merge(baseWebpackConfig, {
    /*设置生产环境*/
    mode: 'production',
    output: {
        path: path.resolve(webpackFile.proDirectory),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: "js/[name]-[id].[chunkhash:8].js"
    },
    plugins: [
        // extract css into its own file
        new ExtractTextPlugin('css/[name].[md5:contenthash:hex:8].css'),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {removeAll: true},
                // 避免 cssnano 重新计算 z-index
                safe: true
            },
            canPrint: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(css|pcss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader', options: {importLoaders: 1 } },
                        { loader: 'postcss-loader', options: {
                            ident: 'postcss',
                            plugins: () => webpackComConf.postcss
                        }}
                    ],
                }),
                include: webpackComConf.cssInclude,
            },
            {
                test: webpackComConf.img,
                loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=/' + webpackFile.resourcePrefix + '&outputPath=' + webpackFile.resource + '/'
            }
        ]
    }
});
let pages = entry;
for (let chunkName in pages) {
    let conf = {
        filename: chunkName + '.html',
        template: 'index.html',
        inject: true,
        title: webpackCom.titleFun(chunkName,pages[chunkName][1]),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunks: ['manifest', 'vendor', 'common', chunkName],
        hash: false,
        chunksSortMode: 'dependency'
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
}
/* 清除 dist */
config.plugins.push(new CleanWebpackPlugin([webpackFile.proDirectory], {root: path.resolve(__dirname, '../../'), verbose: true, dry: false}));

let copyObj = [
    {from: './app/public/img/favicon.ico', to: './'},//网站favicon.ico
    // {from: './app/public/plugin', to: './plugin'},//一些不需要走webpack的插件
    // {from: './app/public/versionTips', to: './versionTips'},//固定不变的浏览器版本提示文件
    // {from: './app/public/file', to: './resource'},//一些固定的文件，如下载文件*/
    // {from: './app/public/resource', to: './resource'},//网站资源
];

let copyArr = [];
copyObj.map((data) => {
    copyArr.push(
        new CopyWebpackPlugin([{from: data.from, to: data.to, ignore: ['.*']}])
    )
});

/* 拷贝静态资源  */
copyArr.map(function (data) {
    return config.plugins.push(data)
});


module.exports = config;
