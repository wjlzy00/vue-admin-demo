import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: () => import('../views/Dashboard.vue') },
  { path: '/goods',     component: () => import('../views/GoodsList.vue') },
  { path: '/orders',    component: () => import('../views/OrderList.vue') },
  { path: '/users',     component: () => import('../views/UserList.vue') }
]
export default createRouter({
  history: createWebHistory(),
  routes
})