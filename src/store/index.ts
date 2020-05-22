import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/api/auth"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // auth
    user: null,
    isLogin: false,
  },
  mutations: {
    // auth
    setUser(state, payload) {
      state.user = payload.user
    },

    setLogin(state, payload) {
      state.isLogin = payload.isLogin
    }
  },
  actions: {
    // auth
    login({ commit }, { username, password }) {
      return auth.login({ username, password }).then((res: any) => {
        commit('setUser', { user: res.data })
        commit('setLogin', { isLogin: true })
      })
    },
    async register({ commit }, { username, password }) {
      let res: any = await auth.register({ username, password })
      commit('setUser', { user: res.data })
      commit('setLogin', { isLogin: true })
      return res.data
    },
    async logout({ commit }) {
      await auth.logout()
      commit('setUser', { user: null })
      commit('setLogin', { isLogin: false })
    },
    async checkLogin({ commit, state }) {
      if (state.isLogin) return true
      let res: any = await auth.getInfo()
      commit('setLogin', { isLogin: res.isLogin })
      if (!res.isLogin) return false
      commit('setUser', { user: res.data })
      return true
    }
  },
  modules: {
  }
})
