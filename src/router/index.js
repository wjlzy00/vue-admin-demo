import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: () => import('../views/Dashboard.vue') },
  { path: '/goods',     component: () => import('../views/GoodsList.vue') },
  { path: '/orders',    component: () => import('../views/OrderList.vue') },
  { path: '/users',     component: () => import('../views/UserList.vue') },
  { path: '/rbac',      component: () => import('../views/RBAC.vue') },
  { path: '/login',     component: () => import('../views/Login.vue')}
]
export default createRouter({
  history: createWebHistory(),
  routes
})