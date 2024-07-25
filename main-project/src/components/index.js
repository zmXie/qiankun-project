/*全局组件，命名统一用index.vue，且必须定义name，否则不会自动注册*/
const components = require.context('./', true, /index\.vue$/);
export default {
  install(Vue, option) {
    components.keys().forEach((key) => {
      const value = components(key).default;
      const name = value.name;
      if (name && value) {
        Vue.component(name, value);
      }
    });
  }
};
