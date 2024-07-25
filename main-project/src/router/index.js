import Vue from 'vue';
import VueRouter from 'vue-router';
// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import store from '@/store/index';
import { changeDomTitle } from '@/utils/dom';
// 路由数据
import routes from './routes';

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch((err) => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r) => r.meta.auth)) {
    // 检验权限
    if (store.getters.token) {
      next();
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      });
      NProgress.done();
    }
  } else {
    // 不需要身份校验 直接通过
    next();
  }
  NProgress.done();
});

router.afterEach((to) => {
  // 进度条
  NProgress.done();
  // 更改标题
  changeDomTitle(to.meta.title);
});

export default router;
