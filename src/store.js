import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    count: 10
  },
  mutations: {
    // set_token(state, token) {
    //   state.token = token
    //   sessionStorage.token = token
    // },
    // del_token(state) {
    //   state.token = ''
    //   sessionStorage.removeItem('token')
    // },
    INCREMENT (state) {
      state.count++
    },
    DECREMENT (state) {
      state.count--
    }
  },
  actions: {
    INCREMENT (commit) {
      commit('INCREMENT')
    },
    DECREMENT (commit) {
      commit('DECREMENT')
    }
  }
})
