import Layout from '../views/layout/index';
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/utils/import.' + process.env.NODE_ENV);

/**
 * hidden: true                   如果设置为true，则隐藏菜单
 * redirect: noRedirect           面包屑不重定向
 * meta : {
    title: 'title'               标题
    icon: 'svg-name'/'el-icon-x' 图标
    isKeepAlive: false           如果设置为true，则缓存页面（默认值为false）
    affix: true                  如果设置为true，则标签将粘贴在标签视图中
    breadcrumb: false            如果设置为false，则该项将在breadcrumb中隐藏（默认值为true）
    activeMenu: '/example/list'  自定义菜单activePath
  }
 */

/**
 * 业务路由
 */
const framePage = [
  {
    path: '/',
    name: 'layout',
    redirect: { name: 'home' },
    component: Layout,
    meta: {
      auth: true, // 是否需要登录
      title: '首页',
      icon: 'dashboard'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: _import('Home'),
        meta: {
          auth: true, // 是否需要登录
          title: '首页',
          icon: 'dashboard'
        }
      },
      {
        path: '/micro-*', // 微应用容器路由
        name: 'micro',
        hidden: true,
      },
      {
        path: '/micro-sub-app',
        name: 'micro',
        meta: {
          isKeepAlive: false, // 是否需要缓存
          title: '子应用',
          icon: 'dashboard'
        },
      },
      {
        path: '/micro-patient',
        name: 'micro',
        meta: {
          isKeepAlive: false, // 是否需要缓存
          title: '患者',
          icon: 'dashboard'
        },
      }
    ]
  }
];
/**
 * 系统路由
 */
const frameSys = [
  // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    hidden: true,
    component: _import('system/function/refresh')
  },
  // 页面重定向 必须保留
  {
    path: '/redirect/:route*',
    name: 'redirect',
    hidden: true,
    component: _import('system/function/redirect')
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: _import('system/login')
  }
];
/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    hidden: true,
    component: _import('system/error/404')
  }
];

// 重新组织后导出
export default [...framePage, ...frameSys, ...errorPage];
