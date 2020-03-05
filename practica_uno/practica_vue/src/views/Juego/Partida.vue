<template>
  <section class="partida">
    <div class="row">
      <div class="col col-sm-6 offset-3">
        <h3 class="text-center">Juego 1</h3>
      </div>
    </div>
    <div class="row">
      <div class="col col-sm-6">
        <user-arena @opcion="getOpcion"></user-arena>
      </div>
      <div class="col col-sm-6">
        <user-arena></user-arena>
      </div>
    </div>
  </section>
</template>
<script lang="js">
import UserArena from '@/components/Juego/UserArena'
export default {
  name: 'Partida',
  components: {
    UserArena
  },
  methods: {
    getOpcion (opcion) {
      alert(`Estoy en partida: ${opcion}`)
    }
  }
}
</script>
<style lang="scss">
.partida {
  background: palevioletred;
}
</style>
