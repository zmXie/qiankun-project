/*
public-path：用于在运行时修改publicPath。
当在主应用中运行时，修改publicPath为注册时的entry（比如：https://test.szyun.info/sub_project/xg-scp-patient-manage/）
*/
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
console.log('window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__：', window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__);