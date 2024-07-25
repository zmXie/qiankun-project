/**
 * 汇总其他插件
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import components from '@/components';
import ddpz from '@ddpz/components'
import Api from '@/api/index';
import '@/utils/array.js';
import '@/filters';

export default {
  install(Vue, options) {
    Vue.prototype.$Api = Api;
    Vue.use(ElementUI);
    Vue.use(components);
    Vue.use(ddpz);
  }
};
