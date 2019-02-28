const browser = () => {
    /*let is360 = false;
    let isIE = false;
    let isFirefox = false;
    let isChrome = false;
    let isEdge = false;*/
    let broName = 'Runing';
    let strStart = 0;
    let strStop = 0;
    let temp = '';
    let userAgent = window.navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform

//FireFox
    if (userAgent.indexOf('Firefox') !== -1) {
        /*isFirefox = true;*/
        strStart = userAgent.indexOf('Firefox');
        temp = userAgent.substring(strStart);
        broName = temp.replace('/', '版本号')

    }

//Edge
    if (userAgent.indexOf('Edge') !== -1) {
        /*isEdge = true;*/
        /*broName = 'Edge浏览器';*/
        strStart = userAgent.indexOf('Edge');
        temp = userAgent.substring(strStart);
        broName = temp.replace('/', '版本号');
    }

//IE浏览器
    if (userAgent.indexOf('NET') !== -1 && userAgent.indexOf("rv") !== -1) {
        /*isIE = true;*/
        /*broName = 'IE浏览器'; */
        strStart = userAgent.indexOf('rv');
        strStop = userAgent.indexOf(')');
        temp = userAgent.substring(strStart, strStop);
        broName = temp.replace('rv', 'IE').replace(':', '版本号');
    }

//360极速模式可以区分360安全浏览器和360极速浏览器
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf("NET") < 0 && userAgent.indexOf("Firefox") < 0) {
        if (navigator.javaEnabled()) {
            /*is360 = true;*/
            broName = '360安全浏览器-极速模式';
        } else {
            /*is360 = true;*/
            broName = '360极速浏览器-极速模式';
        }
    }

//360兼容
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf("NET") !== -1 && userAgent.indexOf("MSIE") !== -1 && userAgent.indexOf("rv") < 0) {
        /*is360 = true;*/
        broName = '360兼容模式';
    }

//Chrome浏览器
    if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf("Edge") < 0) {
        /*isChrome = true;*/
        strStart = userAgent.indexOf('Chrome');
        strStop = userAgent.indexOf(' Safari');
        temp = userAgent.substring(strStart, strStop);
        broName = temp.replace('/', '版本号');
    }
    return broName
}

export default browser;