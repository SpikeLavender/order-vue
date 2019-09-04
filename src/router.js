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
      name: 'login',
      hidden: true
    },
    {
      path: '/404',
      component: () => import('./views/404.vue'),
      name: '404',
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
      name: 'Order',
      leaf: true,
      //iconCls: 'el-icon-shopping-cart-2',
      children: [
        {
          path: '/order',
          iconCls: 'el-icon-edit-outline',
          component: () => import('./views/details/Order.vue'),
          name: 'Order Manager',
          children: [
            {
              path: '/table',
              component: () => import('./views/details/Table.vue'),
              name: 'table' ,
            },
            {
              path: '/form',
              component: () => import('./views/details/Form.vue'),
              name: 'form' ,
            }
          ]
        },
      ]
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: 'Service Monitor',
      //iconCls: 'fa fa-address-card',
      leaf: true,
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
});
