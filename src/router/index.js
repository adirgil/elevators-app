import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Entry from "../views/Entry";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Entry',
    component: () => import('../views/Entry.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
