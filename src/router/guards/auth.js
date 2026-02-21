import { useUserStore } from '@/stores/user'
export function setupAuthGuards(router) {
  router.beforeEach((to) => {
    const userStore = useUserStore()
    if (to.name !== 'login' && !userStore.isLoggedIn && to.meta?.requiresAuth) {
      return {
        name: 'login',
        query: { redirect: to.fullPath },
      }
    }
  })
}
