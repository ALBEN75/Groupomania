import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import('../views/Forum.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
