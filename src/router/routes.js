export default [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    component: () => import('@/views/home/HomeView.vue'),
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
]
