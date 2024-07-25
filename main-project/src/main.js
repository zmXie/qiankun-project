import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import frame from './plugin/frame';
import '@/assets/icons';

Vue.config.productionTip = false;
Vue.use(frame);

window.$rootVue = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#MainApp');
