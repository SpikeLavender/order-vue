//import VueI18n from 'vue-i18n'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import enLocale from 'element-ui/lib/locale/lang/en'
//import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
//import lang from '@/common/lang' // 中英文翻译
import Http from './service/http';

Vue.use(ElementUI, {enLocale})
//Vue.use(VueI18n)

Vue.config.productionTip = false

//把Http挂载到Vue实例上
Vue.prototype.$Http = Http //全局可用
//Vue.prototype.$Http = Http //全局可用

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
