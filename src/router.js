import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: () => import('./views/404.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: 'Home',
      //iconCls: 'el-icon-message', // 图标样式class
      leaf: true,
      children: [
        { path: '/main', component: () => import('./views/Main.vue'), name: 'Home' },
        // { path: '/user', component: () => import('./views/details/user.vue'), name: '列表' }
      ]
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: 'Order Manager',
      //iconCls: 'el-icon-shopping-cart-2',
      children: [
        { path: '/form', iconCls: 'el-icon-edit-outline', component: () => import('./views/details/Form.vue'), name: 'New Order' },
        { path: '/table', iconCls: 'el-icon-edit-outline', component: () => import('./views/details/Table.vue'), name: 'History Order' },
      ]
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: 'Service Monitor',
      //iconCls: 'fa fa-address-card',
      leaf: false,
      children: [
          { path: '/monitor', component: () => import('./views/details/Monitor.vue'), name: 'Monitor' },
      ]
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})