import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: LoginView,
      meta: { isProtected: false },
      name: 'login',
      path: '/',
      alias: '/login',
    },
    {
      component: SignUpView,
      meta: { isProtected: false },
      name: 'signup',
      path: '/signup',
    },
    {
      component: AdminView,
      meta: { isProtected: true },
      name: 'admin',
      path: '/admin',
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = (await import('@/stores/auth')).default()
  if (to.meta.isProtected && !authStore.token) {
    return '/login'
  } else if (!to.meta.isProtected && authStore.token) {
    return '/admin'
  }
})

export default router
