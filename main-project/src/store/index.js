import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters: {
    token: (state) => state.user.token,
    sidebar: (state) => state.app.sidebar,
    device: (state) => state.app.device
  }
});

export default store;
