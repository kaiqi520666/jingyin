import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/home/components/Dashboard.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/home/components/Profile.vue'),
        },
        {
          path: '/query',
          name: 'query',
          component: () => import('@/views/home/components/Query.vue'),
        },
        {
          path: '/shop',
          name: 'shop',
          component: () => import('@/views/home/components/Shop.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
  ],
})

export default router
