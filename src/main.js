import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false


Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('Authentication-Token')
  }
  //let user = JSON.parse(sessionStorage.getItem('Authentication-Token'))
  let token = sessionStorage.getItem('Authentication-Token')
  if (!token && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
