import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
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
    homeList: {},
    userBase: {},
    showLogin:false
  },
  getters: {

  },
  mutations: {
    HomeList (state, value) {
      state.homeList = value
    },
    SetUserBase (state, value) {
      state.userBase = value
    },
    ChangeShowLogin(state,value){

      state.showLogin = value
    }
  },
  actions: {

  },
  modules: {
  }
})
