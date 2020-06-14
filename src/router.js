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
          name: 'Financial Fundamentals',
          path: 'components/fundamentals',
          component: () => import('@/views/dashboard/pages/Fundamentals.vue'),
        },
        {
          name: 'Single Stock Analysis',
          path: 'pages/analysis',
          component: () => import('@/views/dashboard/pages/CompanyProfile.vue'),
        },
        {
          name: 'Resources',
          path: 'pages/resources',
          component: () => import('@/views/dashboard/pages/ComingSoon'),
        },
        {
          name: 'Algo-Trading',
          path: 'pages/trading',
          component: () => import('@/views/dashboard/pages/ComingSoon'),
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
