import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  // 存储到localStorage中
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (state) {
      return {
        // 直接存入到了localStorage到
        userBase: state.userBase
      }
    }
  })],
  state: {
    urlBase: 'http://47.122.16.71:9999/',
    // urlBase: 'http://192.168.2.141:9999/',
    routerName: '',
    userBase: {},
    RegisteredLogin: {},
    Login: {},
  },
  getters: {
  },
  mutations: {
    SetRouterName (state, value) {
      state.routerName = value
    },
    SetRegisteredLogin (state, value) {
      state.RegisteredLogin = value
    },
    SetLogin (state, value) {
      state.Login = value
    },
    SetUserBase (state, value) {
      state.userBase = value
    },

  },
  actions: {
  },
  modules: {
  }
})
