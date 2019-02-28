const path = require('path');
const site = require('../site.config.json');

module.exports = {
    titleFun:function(chunkName,title){
        let titleDef = site.title;
        if(chunkName.indexOf('index') !==-1){
            return titleDef;
        }else{
            return title + '_' + titleDef;
        }
    },
    cssInclude : [
        // path.resolve(__dirname, "../../node_modules/bootstrap/dist/css/"),
        path.resolve(__dirname, "../../app/public/css/"),
    ],
    img:/\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
    postcss:[
        require('precss'),
        require('postcss-preset-env')(),
        require('postcss-pxtorem')({
            rootValue: 100,//rootValue为75，说是对根元素大小进行设置。可能类似px2rem中的remUnit参数吧
            unitPrecision: 5,//原来是转换成rem后保留的小数点位数
            propList: ['*'],//假设需要仅对边框进行设置，可以写['*', '!border*']意思是排除带有border的属性
            selectorBlackList: [],//置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法
            replace: true,
            mediaQuery: false,
            minPixelValue: site.pxToRem ? 12 : 10000//所有小于12px的样式都不被转换
        })
    ]
};