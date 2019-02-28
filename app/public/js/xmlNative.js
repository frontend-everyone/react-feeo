import site from '../../../config/site.config.json'
const xmlNative = (opt, type) => {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {
    };
    let xmlHttp = new XMLHttpRequest();
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        if(!site.token){
            xmlHttp.withCredentials = true; //cookies
        }
        if(opt.data.data && opt.data.data.uploadPic){
            //如果是图片上传
            xmlHttp.send(opt.data.data.data);
        }else{
            xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xmlHttp.send(JSON.stringify(opt.data));
        }
    } else if (opt.method.toUpperCase() === 'GET') {
        let params = [];
        for (let key in opt.data) {
            params.push(key + '=' + opt.data[key]);
        }
        let postData = params.join('&');
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    window.Loading.open();
    if (type === 1) {
        return new Promise((resolve, reject) => {
            xmlHttp.onreadystatechange = () => {
                window.Loading.close();
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        let responseText = JSON.parse(xmlHttp.responseText);
                        if (responseText.code === 0) {
                            resolve(responseText.data)
                        } else {
                            window.Toast.show(responseText.message);
                            reject(responseText.data, responseText.message)
                        }
                    } else {
                        window.Toast.show(xmlHttp.responseText.msg);
                        reject(JSON.parse(xmlHttp.responseText), xmlHttp.status)
                    }
                }
            };
        })
    } else {
        xmlHttp.onreadystatechange = () => {
            window.Loading.close()
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    opt.success(JSON.parse(xmlHttp.responseText), xmlHttp.status)
                } else {
                    opt.error(JSON.parse(xmlHttp.responseText), xmlHttp.status)
                }
            }
        };
    }

};
export default xmlNative