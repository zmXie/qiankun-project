import { setStorage, getStorage } from '@/utils/storage';

const state = {
  sidebar: {
    opened: !getStorage('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop'
};
const mutations = {
  toggleSideBar: (state) => {
    if (state.sidebar.opened) {
      setStorage('sidebarStatus', 1);
    } else {
      setStorage('sidebarStatus', 0);
    }
    state.sidebar.opened = !state.sidebar.opened;
  },
  closeSideBar: (state, withoutAnimation) => {
    setStorage('sidebarStatus', 1);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  toggleDevice: (state, device) => {
    state.device = device;
  }
};
const actions = {
  toggleSideBar: ({ commit }) => {
    commit('toggleSideBar');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('closeSideBar', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('toggleDevice', device);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
