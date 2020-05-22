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
    }
  },
  modules: {
  }
})
