<template>
  <div class="about">
    <h1>This is an {{$route.name}} page</h1>
    <button
      class="btn btn-danger"
      @click="logOut"
    >
      Cerrar Sesión</button>
  </div>
</template>
<script lang="js">
import Auth from '@/config/auth.js'
export default {
  name: 'About',
  methods: {
    logOut () {
      return Auth.logOut()
    }
  }
}
</script>
