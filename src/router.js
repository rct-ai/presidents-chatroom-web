import { createRouter, createWebHistory } from 'vue-router'
import Chatroom from '@/views/Chatroom.vue'

const routes = [
  {
    path: '/',
    component: Chatroom,
    name: 'chatroom'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
