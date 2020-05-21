import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: '/assets/sandbox_logo.png',
    drawer: null,
    user: null,
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
    setUser (state, payload) {
      state.user = payload
    },
  },
  actions: {
    signUserIn ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
            }
            commit('setUser', newUser)
          },
        )
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', { id: payload.uid })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/login')
    },
  },
  getters: {
    user (state) {
      return state.user
    },
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true }),
    }),
  ],
})
