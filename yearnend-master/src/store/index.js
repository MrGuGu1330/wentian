import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  // 存储到localStorage中
  plugins: [createPersistedState({
    reducer (state) {
      return {
        // 直接存入到了localStorage到
        globalUsername: state.globalUsername,
        globalAvatarUrl: state.globalAvatarUrl
      }
    }
  })],
  state: {
    globalUsername: '未获取到',
    globalAvatarUrl: 'images/3.jpg',
  },
  getters: {
  },
  mutations: {
    // 改变上面那个小用户名
    ChangeUsername (state, value) {
      state.globalUsername = value
    },
    // 改变上面那个小用户名头像
    Changeavatar (state, value) {
      state.globalAvatarUrl = value
    },
  },
  actions: {
  },
  modules: {
  }
})
