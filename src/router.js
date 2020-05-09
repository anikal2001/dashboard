import Vue from 'vue'
import Router from 'vue-router'
import * as Cookies from 'js-cookie'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Filings',
          path: 'components/filings',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        // Tables
        {
          name: 'Transaction History',
          path: 'tables/transactions',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
      ],
      async beforeEnter (to, from, next) {
        const permission = Cookies.get('authenticated')
        try {
          if (permission === 'true') {
            next()
          }
        } catch (e) {
          next({
            name: 'login_form', // back to safety route //
            query: { redirectFrom: to.name },
          })
        }
      },
    },
    {
      path: '/login',
      name: 'login_form',
      component: () => import('@/views/dashboard/Login_Page'),
      async beforeEnter (to, from, next) {
        const permission = Cookies.get('authenticated')
        try {
          if (permission === 'false') {
            next()
          }
        } catch (e) {
          next({
            name: 'Dashboard',
            query: { redirectFrom: to.fullPath },
          })
        }
      },
    },
  ],
})
