// Template, ubicamos el html de nuestro componente.
<template>
  <section>
    <h3 class="text-left">Hello, </h3>
    <h3 class="text-left">Welcome back! </h3>
    <!-- * Lo utilizamos como etiqueta de HTML -->
    <alerts-component
      v-if="showError"
      :message="errorMessage"
      :code="errorCode"
    ></alerts-component>
    <div class="form-group">
      <input
        type="email"
        class="form-control mb-2"
        placeholder="E-mail"
        v-model="user.email"
        @keypress="showError = false"
      >
      <input
        type="password"
        class="form-control mb-2"
        placeholder="Password"
        v-model="user.password"
        @keypress.enter="login"
        @keypress="showError = false"
      >
      <!-- Handlebars templating -->
      <!-- {{user.password}}
      {{1+1}} -->
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col">
          <small>Remember me</small>

        </div>
        <div class="col">
          <small>Forgot password?</small>

        </div>
      </div>
    </div>
    <button
      class="btn btn-purple btn-dark btn-block"
      @click="login"
    >Login</button>
    <div class="form-group">
      <small>Don't have a account? <routerLink to="sign-up">Sign up</routerLink></small>
    </div>
  </section>
</template>
// Script, ubicamos todo el javascript de nuestros componentes o views
<script lang="js">
import Auth from '@/config/auth.js'
//* Importamos componente reutilizable de alertas.
import AlertsComponent from './helpers/Alerts'
export default {
  name: 'LoginForm',
  components: {
    AlertsComponent //* Lo registramos como componente.
  },
  data () {
    return {
      showError: false,
      errorMessage: '',
      errorCode: '',
      user: {
        email: 'mail@mail.com',
        password: '123456',
        nombre: 'Test'
      }
    }
  },
  beforeCreate () {
    console.log(`Estoy en beforecreated ${this.user}`)
  },
  created () {
    console.log(`Estoy en created ${this.user}`)
  },
  mounted () {
    // Auth.signUp(this.user)
    console.log(`Estoy en mounted ${this.user}`)
    console.log(`Estoy en ${this.$route.name}`)
    // this.login()
  },
  methods: {
    login () {
      // Esta variable es de uso local de nuestro metodo.
      // let user = {
      //   email: 'esto es local'
      // }
      // console.log('soy el login')
      // console.log('User local' + user.email)
      // console.log('User from data:' + this.user.email)
      // console.log(this.user.password)
      // Aquí llamo la funcion login de mi archivo auth.js
      Auth.login(this.user).catch(error => {
        // *Tomamos el error y lo utilizamos en el alert correspondiente.
        console.log('Estoy en LoginForm')
        console.log('Esto es un error:' + error.code, error.message)
        this.showError = true
        this.errorMessage = error.message
        this.errorCode = error.code
        // setTimeout(() => {
        //   this.showError = false
        // }, 700)
      })

      // setTimeout(() => {
      // Luego de iniciar sesión nos envia a la pagina about
      // this.$router.push({ name: 'about' })
      // }, 1000)
    }
  }
}
</script>
// Style, ubicamos el css relacionado a nuestros views y componentes.
<style lang="scss">
.btn-purple {
  background: darkviolet !important;
  &:hover,
  &:active {
    background: purple;
  }
}
</style>
