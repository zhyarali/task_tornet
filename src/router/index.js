import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '@/views/dashboard/auth/login'
import HomeDashboard from '@/views/dashboard/dep/home'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard/login',
    name: 'login',
    component: login
  },
  {
    path: '/dashboard/home',
    name: 'HomeDashboard',
    component: HomeDashboard
  },
   
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
