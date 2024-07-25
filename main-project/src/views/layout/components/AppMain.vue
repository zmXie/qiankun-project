<template>
  <section class="app-main">
    <template v-if="checkMenuAuth">
      <!-- 主应用路由 -->
      <div v-show="!isShowMicroApp">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view :key="key" v-if="isKeepAlive" />
          </keep-alive>
        </transition>
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" v-if="!isKeepAlive" />
        </transition>
      </div>
      <!-- 子应用容器 -->
      <div class="content-body" v-show="isShowMicroApp">
        <micro-layout></micro-layout>
      </div>
    </template>
    <template v-else>
      <page-no-permission></page-no-permission>
    </template>
  </section>
</template>

<script>
import pageNoPermission from '@/views/system/error/page-no-permission.vue'
import microLayout from '@/views/Micro'
export default {
  name: 'AppMain',
  components: { pageNoPermission, microLayout },
  computed: {
    key() {
      return this.$route.fullPath
    },
    isKeepAlive() {
      return this.$route.meta?.isKeepAlive;
    },
    /*校验权限*/
    checkMenuAuth() {
      return true;
    },
    // 是否显示微应用
    isShowMicroApp() {
      return this.$route.name === 'micro';
    }
  }
}
</script>

<style scoped>
.app-main {
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
  height: 100vh;
}
.app-main > div {
  height: 100%;
  padding: 20px;
  overflow: auto;
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
