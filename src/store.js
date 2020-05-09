import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: '/assets/sandbox_logo.png',
    drawer: null,
    authenticated: null,
    config: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    logout: (state) => {
      state.authenticated = false
      Cookies.set('authenticated', 'false')
    },
    login: (state) => {
      state.authenticated = true
    },
  },
  actions: {
    logout ({ commit }) {
      localStorage.removeItem('accessToken')
      commit('logout')
      router.push('/login')
    },
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true }),
    }),
  ],
})
