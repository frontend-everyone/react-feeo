import xmlNative from './xmlNative'
import apiManager from './apiManager'
import apiClientType from './apiClientType'

const ajax = (url, method, data) => {
    let dataJson = {
        ...apiClientType,
        data: data
    };
    return xmlNative({
        method: method,
        url: url,
        data: dataJson
    }, 1);
};
const apiRequestAsync = {
    get: (apiName, data) => ajax(apiManager[apiName], "get", data),
    post: (apiName, data) => ajax(apiManager[apiName], "post", data)
};
export default apiRequestAsync;