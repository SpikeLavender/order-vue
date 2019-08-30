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
import Axios from 'axios'
import Http from './service/http';

Vue.use(ElementUI, {enLocale})
//Vue.use(VueI18n)

Vue.config.productionTip = false

//把Http挂载到Vue实例上
Vue.prototype.$Http = Http //全局可用
//Vue.prototype.$Http = Http //全局可用

//Axios.defaults.headers.common['token'] = store.state.token;


// if (!sessionStorage.getItem('token')) {
//     store.commit('set_token', sessionStorage.getItem('token'))
// }

// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//         sessionStorage.removeItem('token')
//     }
//     //let user = JSON.parse(sessionStorage.getItem('Authentication-Token'))
//     let token = sessionStorage.getItem('token')
//     if (!token && to.path !== '/login') {
//         next({ path: '/login' })
//     } else {
//         next()
//     }
// })
// router.beforeEach((to, from, next) => {
//     // if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
//     if (true) {
//         if (store.state.token) {
//             next();
//         }
//         else {
//             next({
//                 path: '/login',
//                 query: {redirect: to.fullPath}
//             })
//         }
//     }
//     else {
//         next();
//     }
// })

// // 添加请求拦截器
// Axios.interceptors.request.use(config => {
// // 在发送请求之前做些什么
// //判断是否存在token，如果存在将每个页面header都添加token
//     if(store.state.token){
//         config.headers.common['token']=store.state.token
//     }
//
//     return config;
// }, error => {
// // 对请求错误做些什么
//     return Promise.reject(error);
// });
//
// // http response 拦截器
// Axios.interceptors.response.use(
//     response => {
//
//         return response;
//     },
//     error => {
//
//         if (error.response) {
//             if (error.response.status === 401) {
//                 this.$store.commit('del_token');
//                 router.replace({
//                     path: '/login',
//                     query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//                 }).then(r => {
//                     console.log(r)
//                 })
//             }
//         }
//         return Promise.reject(error.response.data)
//     })



// const i18n = new VueI18n({
//   locale: Cookies.get('language') || 'en', // 语言标识
//   messages: {
//     en: {
//       ...lang.en,
//       ...enLocale
//     },
//     zh: {
//       ...lang.zh,
//       ...zhLocale
//     }
//   }
// });
//
// Cookies.set('language',i18n.locale);
//
// ElementLocale.i18n((key, value) => i18n.t(key, value))

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
