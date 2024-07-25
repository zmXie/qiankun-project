import { registerMicroApps, start } from 'qiankun'
import request from '@/plugin/axios'
import microUtils from './microUtils'

registerMicroApps([
  {
    name: 'sub-app',
    entry: 'http://localhost:7663', // 微应用入口
    container: '#subapp-viewport', // 微应用挂载的div
    activeRule: '/micro-sub-app',
    props: {
      request,
      microUtils
    }
  },
  {
    name: 'xg-scp-patient-manage',
    entry: 'http://localhost:9081', // 微应用入口
    container: '#subapp-viewport', // 微应用挂载的div
    activeRule: '/micro-patient',
    props: {
      request,
      microUtils
    }
  },
  {
    name: 'xg-scp-scrm',
    entry: 'http://test.szyun.info/sub_project/xg-scp-scrm/', // 微应用入口
    container: '#subapp-viewport', // 微应用挂载的div
    activeRule: '/micro-scrm',
    props: {
      request,
      microUtils
    }
  },
  {
    name: 'xg-scp-purchase-store',
    entry: 'http://test.szyun.info/sub_project/xg-scp-purchase-store/', // 微应用入口
    appTag: 'xg_purchase_store', // 应用标记
    container: '#subapp-viewport',
    activeRule: '/micro-purchase-store',
    props: {
      request,
      microUtils
    }
  },
])

export default start
