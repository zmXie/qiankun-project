<template>
  <div id="subapp-viewport"></div>
</template>

<script>
import start from "@/qiankun/index";
export default {
  mounted() {
    // 启动微前端
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start({
        prefetch: [],
        sandbox: {
          strictStyleIsolation: false, // 不开启沙箱
        },
        singular: true, // 开启单实例，同一时间只会渲染一个微应用
        // 需要排除的资源
        excludeAssetFilter(assetUrl) {
          return [
            'http://localhost:8000/CLodopfuncs.js?priority=1',
            'http://localhost:18000/CLodopfuncs.js?priority=0',
          ].includes(assetUrl);
        }
      });
    }
  }
};
</script>