/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// Importamos nuevas vistas
import Login from '../views/Login.vue'
import Partida from '../views/Juego/Partida.vue'

Vue.use(VueRouter)

const routes = [
  // Agregamos nueva rutas
  {
    path: '/', //* asignamos path, el cual también tiene que ser unico.
    name: 'login', //* Asignamos nombre, debe ser unico y original.
    component: Login, // *Decalaramos componente
    meta: {
      auth: false //* Se utiliza para controlar el acceso a usuarios o no.
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
      auth: true //* Se utiliza para controlar el acceso a usuarios o no.
    }
  },
  {
    // * Ruta dinamica, donde no_partida puede ser diferente para cargar dicha partida.
    path: '/juego-1/:no_partida',
    name: 'partida',
    component: Partida
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
