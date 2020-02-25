import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Auth from './config/auth'

// Librerias de usuario
import 'bootstrap/scss/bootstrap.scss'
Vue.config.productionTip = false
//* Metodo de comprobación de permiso de accceso
router.beforeEach(async (to, from, next) => {
  //* Verificamos las rutas que neceistan autorización
  if (to.meta.auth) {
    console.log('Necesita permiso para entrar')
    //* Traemos info del usuario actual
    let user = await Auth.checkUser()
    console.log(`User: ${user}`)
    //* Comprobamos que si haya usuario
    if (user == null) {
      //* Si no hay usuario, lo mandamos al login
      next({
        name: 'login'
      })
      return
    }
    //* Si hay usuario ingresamos a la ruta.
    console.log(`Usuario logeado: ${user.email}`)
    next()
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
