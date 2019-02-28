/**
 * 截取URL参数
 * @param {string} name 截取的key
 * @param {string} [url] 被截取的url
 * @returns {string} 截取的val
 */
export const urlParam = (name, url) => {
    let reg = new RegExp(".*[&?]" + name + "=([^&]*)(&|$)");
    let r;
    if (!url) {
        r = window.location.search.match(reg);
    } else {
        r = url.match(reg);
    }
    if (r) return decodeURIComponent(r[1]);
    return '';
};
/**
 * 判断是否是手机号
 * @param {string} val 传进来的字符串
 */
export const isMobile = (val) => {
    let reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(val);
};

/**
 * 判断是邮箱
 * @param {string} val 传进来的字符串
 */
export const isEmail = (val) => {
    let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(val);
};