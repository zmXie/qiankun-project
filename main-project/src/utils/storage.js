const PROJECT = 'my-template-pc';

/**
 * @description 存储数据
 * @param key
 * @param value
 */
export function setStorage(key, value = '') {
  let new_key = PROJECT + '-' + key;
  let data = JSON.stringify(value);
  localStorage.setItem(new_key, data);
}
/**
 * @description 获取本地数据
 * @param key
 */
export function getStorage(key) {
  let new_key = PROJECT + '-' + key;
  let json = localStorage.getItem(new_key);
  return safeJsonParse(json);
}
/**
 * @description 移除本地数据
 * @param key
 */
export function removeStorage(key) {
  let new_key = PROJECT + '-' + key;
  localStorage.removeItem(new_key);
}
// 安全解析json
function safeJsonParse(data) {
  if (data && data !== 'undefined') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
}
