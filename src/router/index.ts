import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/SLogin.vue'),
    children: []
  },
  {
    path: '/main',
    name: 'home',
    component: () => import('../pages/SMain.vue'),
    children: []
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import('../pages/SRegistration.vue'),
    children: []
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
