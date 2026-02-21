import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

import { setupAuthGuards } from './guards/auth'
setupAuthGuards(router)

export default router
