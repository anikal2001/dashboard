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
      beforeEnter (to, from, next) {
        const permission = Cookies.get('authenticated')
        if (permission === 'true') {
            next()
        } else {
          next({
          path: '/login', // back to safety route //
          })
        }
      },
    },
    {
      path: '/login',
      name: 'login_form',
      component: () => import('@/views/dashboard/Login_Page'),
      beforeEnter (to, from, next) {
        const permission = Cookies.get('authenticated')
          if (permission === 'false') {
            next()
        } else {
          next('/')
        }
      },
    },
    {
      path: '*',
      name: 'Redirect',
      redirect: '/login',
    },
  ],
})
