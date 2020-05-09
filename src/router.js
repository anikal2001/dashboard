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
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
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
