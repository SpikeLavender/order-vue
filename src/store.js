import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        username: localStorage.getItem('username') ? localStorage.getItem('username') : ''
    },
    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            this.state.username = user.username;
            this.state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
            localStorage.setItem('username', user.username);
            //console.log("ssssss" + this.state.Authorization)
        }
    }
})
