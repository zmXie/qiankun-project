import store from '@/store'
export default {
  // 获取用户信息
  getUserInfo() {
    let obj = JSON.parse(JSON.stringify(store.state.user.userInfo));
    console.log('getUserInfo', obj);
    return obj;
  },
  // 获取jwt信息
  getUserJwt() {
    let obj = {};
    obj.baseUrl = process.env.VUE_APP_API;
    obj.token = store.state.user.token;
    obj.data = JSON.parse(JSON.stringify(store.state.user.parseTokenData));
    console.log('getUserJwt', obj);
    return obj;
  },
  // 获取国际化配置选项
  getI18nInfo() {
    let obj = {};
    obj.messages = {};
    return obj;
  },
  // 获取路由对象
  getRouter() {
    return window.$rootVue.$router;
  },
  // 主应用页签管理器
  PageManage: {
    // 注册清除页签缓存的方法
    microRegisterClearPageCacheFun: function () {
      return Promise.resolve();
    },
    // 注册刷新页面的方法
    microRegisterRefreshPageFun: function () {
      return Promise.resolve();
    },
    // 微应用更新页面实例
    microUpdateInstanceByRoute: function () {
      return Promise.resolve({ success: true, nowTabInfo: {} });
    },
    // 微应用更新页面实例
    microUpdateCurrentPage: function () {
      return Promise.resolve();
    },
  },
}
