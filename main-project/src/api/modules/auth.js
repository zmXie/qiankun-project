/**
 * 授权微服务
 */
import request from '@/plugin/axios';
let authServer = 'scp-auth';

export default {
  // 账号密码登录
  loginUsePwd(params) {
    return request({ url: `${authServer}/auth2/loginUsePwd`, method: 'post', data: params });
  },
  // 手机-短信验证码登录
  smsLogin(params) {
    return request({ url: `${authServer}/auth2/loginUseSmsCode`, method: 'post', data: params });
  },
  // 登出
  loginOut(params) {
    return request.get(`${authServer}/auth/loginout`, { params });
  }
};
