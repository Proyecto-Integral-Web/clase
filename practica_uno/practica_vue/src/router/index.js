/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// Importamos nuevas vistas
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  // Agregamos nueva rutas
  {
    path: '/', // asignamos path, el cual también tiene que ser unico.
    name: 'login', // Asignamos nombre, debe ser unico y original.
    component: Login, // Decalaramos componente
    meta: {
      auth: false // Se utiliza para controlar el acceso a usuarios o no.
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      auth: true // Se utiliza para controlar el acceso a usuarios o no.
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
