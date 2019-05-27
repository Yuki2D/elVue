import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout/Layout'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login/Login'),
    },
    {
      path: '/',
      component: Layout,
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/components/Layout/dashboard/dashboard'),
          name: 'index',
          meta: { title: '首页', icon: 'index', noCache: true }
        },
        {
          path: 'system',
          children: [
            {
              path: 'role',
              name: 'role',
              component: ()=>import('@/components/Layout/system/role/index')
            }
          ]
        },
      ]
    },
    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path*',
          component: () => import('@/components/Layout/redirect/redirect')
        }
      ]
    },
  ]
})
