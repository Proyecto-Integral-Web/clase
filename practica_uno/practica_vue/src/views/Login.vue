<template>
  <!-- Container nos da un ancho maximo de 1140px -->
  <div class="login">
    <div class="card p-3">
      <!-- Soy el login -->
      <div class="row">
        <div class="col">

        </div>
        <div class="col">
          <!-- Invocamos el componente para su visualización en nuestro View -->
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
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
