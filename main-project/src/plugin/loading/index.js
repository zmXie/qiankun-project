/**
 * 页面loading 统一组件
 * 会自动处理堆叠关系
 */
import {Loading} from 'element-ui';

let loadingInstance = null;
const loadingConfig = {
  fullscreen: true,
  lock: true,
  body: true,
  customClass: 'global-loading-box',
  background: 'rgba(0, 0, 0, 0.01)',
  text: '请求中...'
}
let loadingList = [];
/*关闭加载*/
const closeLoading = (timeStr) => {
  for (let i = 0; i < loadingList.length; i++) {
    if (timeStr === loadingList[i]) {
      loadingList.splice(i, 1);
    }
  }
  if (loadingList.length === 0) {
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null;
    }
  }
}
/*打开加载*/
const openLoading = () => {
  let timeStr = new Date().getTime();
  loadingList.push(timeStr);
  if (!loadingInstance) {
    loadingInstance = Loading.service(loadingConfig);
  }
  return timeStr;
}

export {openLoading, closeLoading}
