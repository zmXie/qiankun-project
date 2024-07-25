<template>
  <div class="home">
    <h1>{{title}}</h1>
    <el-button v-for="item in appList" :key="item.path" type="primary" @click="onAppClick(item.path)">
      {{item.title}}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      title: 'MAIN',
      appList: [
        { title: '测试子应用', path: '/micro-sub-app' },
        { title: '患者管理', path: '/micro-patient' },
        { title: 'SCRM', path: '/micro-scrm' },
        { title: '直采商城', path: '/micro-purchase-store' },
      ]
    };
  },
  mounted() {

  },
  methods: {
    onAppClick(path) {
      this.$router.push(path)
    }
  }
}
</script>
