import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/login')
  }
}

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
          component: () => import('@/views/dashboard/pages/FilingSearch'),
        },
        {
          name: 'Charting',
          path: 'components/charting',
          component: () => import('@/views/dashboard/pages/Charting/Charting.vue'),
        },
        // Tables
        {
          name: 'Transaction History',
          path: 'tables/transactions',
          component: () => import('@/views/dashboard/pages/RegularTables'),
        },
        {
          name: 'Statement Wizard',
          path: 'components/fundamentals',
          component: () => import('@/views/dashboard/pages/Fundamentals.vue'),
        },
        {
          name: 'Security Analysis',
          path: 'pages/analysis',
          component: () => import('@/views/dashboard/pages/CompanyProfile.vue'),
        },
        {
          name: 'Knowledge Base',
          path: 'pages/resources',
          component: () => import('@/views/dashboard/pages/Resources'),
        },
        {
          name: 'Algo-Trading',
          path: 'pages/trading',
          component: () => import('@/views/dashboard/pages/ComingSoon'),
        },
        {
          name: 'Standings',
          path: 'pages/standings',
          component: () => import('@/views/dashboard/pages/Standings.vue'),
        },
      ],
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'login_form',
      component: () => import('@/views/dashboard/Login_Page'),
    },
  ],
})
