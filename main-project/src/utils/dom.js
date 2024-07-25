
/**
 * 添加class
 * @param el
 * @param cln 类名
 */
export function addClass(el, cln) {
    setTimeout(function () {
        let reg = new RegExp(cln, 'ig');
        if (!reg.test(el.className)) {
            el.className = el.className + ' ' + cln;
        }
    }, 0);
}
/**
 * 移除class
 * @param el
 * @param cln 类名
 */
export function removeClass(el, cln) {
    let reg = new RegExp(cln, 'ig');
    if (reg.test(el.className)) {
        el.className = el.className.replace(cln, '');
    }
}

/**
* 动态加载css文件
* @param {*} url
*/
export function loadCSS(url) {
    let element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', url + '?t=' + new Date().getTime());
    document.head.appendChild(element);
}

/**
 * 动态加载js文件
 * @param {*} src
 * @param {*} callback
 */
export function loadJS(jsUrl, callback) {
    var script = document.createElement('script');
    var head = document.head;
    script.type = 'text/JavaScript';
    script.src = jsUrl + '?t=' + new Date().getTime();
    if (callback && script.addEventListener) {
        script.addEventListener('load', callback, false);
    }
    head.appendChild(script);
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
export function changeDomTitle(titleText) {
    const processTitle = process.env.VUE_APP_TITLE || '数智云';
    window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`;
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
export function openUrl(url) {
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', 'xg-link-temp');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(document.getElementById('xg-link-temp'));
}
