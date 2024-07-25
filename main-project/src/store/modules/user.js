import Api from '@/api';
import { setStorage, getStorage, removeStorage } from '@/utils/storage';
import { parseJwtToken } from '@/utils/jwt'

const state = {
  token: getStorage('token'),
  parseTokenData: getStorage('parseTokenData'),
  userInfo: getStorage('userInfo'),
  roles: []
};

const mutations = {
  SET_VALUE_BY_KEY(state, { key, value, cache = true }) {
    state[key] = value;
    if (cache) {
      setStorage(key, value);
    }
  },
  REMOVE_STATE_BY_KEY(state, key) {
    const value = state[key];
    if (value instanceof String) {
      state[key] = '';
    } else if (value instanceof Array) {
      state[key] = [];
    } else if (value instanceof Object) {
      state[key] = {};
    } else {
      state[key] = undefined;
    }
    removeStorage(key);
  }
};

const actions = {
  // 密码登录
  loginUsePwd({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { value } = await Api.auth.loginUsePwd(params);
        const parseTokenData = parseJwtToken(value.token);
        commit('SET_VALUE_BY_KEY', { key: 'token', value: value.token });
        commit('SET_VALUE_BY_KEY', { key: 'parseTokenData', value: parseTokenData });
        await dispatch('getUserInfo');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  // 验证码登录
  smsLogin({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { value } = await Api.auth.smsLogin(params);
        const parseTokenData = parseJwtToken(value.token);
        commit('SET_VALUE_BY_KEY', { key: 'token', value: value.token });
        commit('SET_VALUE_BY_KEY', { key: 'parseTokenData', value: parseTokenData });
        await dispatch('getUserInfo');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  // 获取用户信息
  getUserInfo({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Api.basic.getUserInfo();
        commit('SET_VALUE_BY_KEY', { key: 'userInfo', value: data });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  // 退出登录
  logout({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      try {
        await Api.auth.logout();
        dispatch('clearUserData');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  // 清除用户数据
  clearUserData({ commit }) {
    commit('REMOVE_STATE_BY_KEY', 'token');
    commit('REMOVE_STATE_BY_KEY', 'parseTokenData');
    commit('REMOVE_STATE_BY_KEY', 'userInfo');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
