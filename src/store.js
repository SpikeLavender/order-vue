import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        serviceType: localStorage.getItem('serviceType') ? localStorage.getItem('serviceType') : 'PRIVATE',
        orderType: localStorage.getItem('orderType') ? localStorage.getItem('orderType') : '5G Private',
    },
    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            this.state.username = user.username;
            this.state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
            localStorage.setItem('username', user.username);
        },
        setServiceType(state, data) {
            this.state.serviceType = data.serviceType;
            this.state.orderType = data.orderType;
            localStorage.setItem('serviceType', data.serviceType);
            localStorage.setItem('orderType', data.orderType);
        }
    }
})
