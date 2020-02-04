<template>
  <div class="login">
    <!-- Soy el login -->
    <h1>Bienvenido</h1>
    <!-- Invocamos el componente para su visualización en nuestro View -->
    <LoginForm></LoginForm>
  </div>
</template>

<script lang="js">
// Importanmos el component para luego registrarlo
import LoginForm from '@/components/LoginForm'
export default {
  name: 'login',
  components: {
    LoginForm // Registramos el componente
  }
}
</script>

<style lang="scss">
</style>
