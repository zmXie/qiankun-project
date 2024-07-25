<!--登录页面-->
<template>
  <el-container class="page-login">
    <el-aside width="auto" class="left-bg">
    </el-aside>
    <el-main class="main-box">
      <div class="login-form">
        <div class="logo-box">
          <div class="title">{{ $store.state.projectName }}</div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleTabsClick" class="tabs-box">
          <el-tab-pane label="快捷登录" name="login-fast">
            <el-form :model="fastInfo" ref="refFastForm" class="form-core">
              <el-form-item prop="account" :rules="inputRules">
                <el-input placeholder="请输入正确的手机号" v-model.trim="fastInfo.account" class="input-box">
                  <template slot="prepend">+86</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="smsCode" :rules="inputRules">
                <el-input placeholder="请验证码" v-model.trim="fastInfo.smsCode" @keyup.enter.native="submitFastLoginClick"
                          :class="{disabled: sendDisabled}" class="input-box sms-code">
                  <template slot="append">
                    <el-button type="primary" :londing="reqLoading" :disabled="sendDisabled" @click="sendSmsCodeClick">
                      {{ sendBtnText }}</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-button type="primary" @click="submitFastLoginClick" class="login-submit-btn">登录</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="密码登录" name="login-password">
            <el-form :model="userInfo" ref="refPasswordForm" class="form-core">
              <el-form-item prop="account" :rules="inputRules">
                <el-input placeholder="请输入手机号 / 邮箱" v-model.trim="userInfo.account" class="input-box">
                </el-input>
              </el-form-item>
              <el-form-item prop="password" :rules="inputRules">
                <el-input placeholder="请输入密码" type="password" v-model="userInfo.password" @keyup.enter.native="submitPasswordLoginClick"
                          class="input-box">
                </el-input>
              </el-form-item>
              <el-button type="primary" @click="submitPasswordLoginClick" class="login-submit-btn" :londing="reqLoading">登录</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Api from '@/api'
export default {
  data() {
    return {
      activeName: 'login-fast',
      smsType: 'CODE_LOGIN',
      loginType: 'PC',
      loginClientType: 'PC',
      bizType: 'SCP_OSS',
      reqLoading: false,
      fastInfo: {
        account: '',
        smsCode: ''
      },
      inputRules: [
        { required: true, message: '请输入', trigger: 'change' }
      ],
      userInfo: {
        account: '',
        password: ''
      },
      deviceInfo: '',
      smsTimeCount: 0,
      smsTimeMaxCount: 60,
      countTimer: null
    }
  },
  computed: {
    sendDisabled() {
      return this.smsTimeCount > 0;
    },
    /*发送按钮文本*/
    sendBtnText() {
      if (this.smsTimeCount <= 0) {
        return '发送验证码';
      } else {
        return `发送验证码(${this.smsTimeCount})`;
      }
    }
  },
  created() {
    this.deviceInfo = navigator && navigator.userAgent;
    this.$store.dispatch('user/clearUserData');
  },
  methods: {
    /*切换登录方式*/
    handleTabsClick(tab) {
      if (tab.name === 'login-fast') {
        this.fastInfo.account = '';
        this.fastInfo.smsCode = '';
      }
      if (tab.name === 'login-password') {
        this.userInfo.account = '';
        this.userInfo.password = '';
      }
    },
    /*快捷登录*/
    submitFastLoginClick() {
      let fastInfo = this.fastInfo;
      this.$refs.refFastForm.validate((valid) => {
        if (valid) {
          let params = {};
          params.mobile = fastInfo.account;
          params.smsCode = fastInfo.smsCode;
          params.loginClientType = this.loginClientType;
          params.bizType = this.bizType;
          params.deviceInfo = this.deviceInfo;
          params.userTag = 'EMP';
          this.$store.dispatch('user/smsLogin', params).then(() => {
            this.redirectPath();
          });
        }
      });
    },
    /*密码登录*/
    submitPasswordLoginClick() {
      let userInfo = this.userInfo;
      this.$refs.refPasswordForm.validate((valid) => {
        if (valid) {
          let params = {};
          params.account = userInfo.account;
          params.password = userInfo.password;
          params.loginClientType = this.loginClientType;
          params.bizType = this.bizType;
          params.deviceInfo = this.deviceInfo;
          params.userTag = 'EMP';
          this.$store.dispatch('user/loginUsePwd', params).then(() => {
            this.redirectPath();
          });
        }
      });
    },
    /*发送验证码*/
    sendSmsCodeClick() {
      let account = this.fastInfo.account;
      if (!account || account.length !== 11) {
        this.$alert('请输入正确的手机号');
        return;
      }
      let params = {};
      params.type = this.smsType;
      params.mobile = account;
      Api.basic.sendSmsCode(params).then((data) => {
        if (data.success) {
          this.$message.success('验证码已发送');
          this.startTimeCount();
        }
      });
    },
    /*启动倒计时*/
    startTimeCount() {
      this.smsTimeCount = this.smsTimeMaxCount;
      this.countTimer = setInterval(() => {
        if (this.smsTimeCount <= 0) {
          clearInterval(this.countTimer);
          this.countTimer = null;
        }
        this.smsTimeCount--;
      }, 1000);
    },
    //登陆成功后跳转原来的页面
    redirectPath() {
      this.$router.push({
        path: this.redirect || '/'
      })
    }
  },
  beforeDestroy() {
    if (this.countTimer) {
      clearInterval(this.countTimer);
      this.countTimer = null;
    }
  },
}
</script>
<style lang="scss" scoped>
.page-login {
  height: 100%;
  background-image: url("./images/login-bg.jpg");
  background-size: auto 100%;
  height: 100vh;
  .left-bg {
    flex: 1;
  }
  .main-box {
    flex: 1;
    background-color: #ffffff;
    width: 50%;
    min-width: 500px;
    position: relative;
    .footer-copyright {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 30px;
      color: #999999;
      font-size: 14px;
    }
  }
  .login-form {
    max-width: 100%;
    width: 360px;
    margin: 25% auto 0 auto;
    .logo-box {
      .logo-icon {
        width: 80px;
      }
      .title {
        font-size: 30px;
        color: #0089fe;
        line-height: 40px;
        margin-top: 10px;
      }
      margin-bottom: 30px;
    }
    .login-submit-btn {
      width: 100%;
      height: 46px;
    }
    .tabs-box {
      .form-core {
        margin-top: 15px;
      }
    }
  }
}
</style>
<style lang="scss">
.page-login {
  .main-box {
    .input-box {
      &.el-input {
        .el-input__inner {
          line-height: 46px;
          height: 46px;
        }
      }
      &.sms-code.el-input {
        .el-input-group__append {
          background-color: #409eff;
          color: #ffffff;
          border: 1px solid #409eff;
        }
        &.disabled {
          .el-input-group__append {
            background-color: #a2d0fd;
            border: 1px solid #a2d0fd;
          }
        }
      }
    }
  }
}
</style>