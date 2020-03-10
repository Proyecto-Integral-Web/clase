<template>
  <section>
    <div class="row">
      <div class="col">
        <button
          class="btn btn-success mb-2"
          @click="crearPartida"
        >
          Nueva Partida
        </button>
      </div>
    </div>
    <div class="partida py-3">
      <div class="row">
        <div class="col col-sm-6 offset-3">
          <h3 class="text-center">{{$route.params.no_partida.replace('-',' ')}}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col col-sm-6">
          <user-arena
            @opcion="getOpcion"
            :userOpcion="partida.usuario_1"
          ></user-arena>
        </div>
        <div class="col col-sm-6">
          <user-arena :userOpcion="partida.usuario_1!=''?partida.usuario_2:''"></user-arena>
        </div>
      </div>
      {{partida}}
    </div>
  </section>
</template>
<script lang="js">
import UserArena from '@/components/Juego/UserArena'
import fireApp from '../../config/_firebase.js'

const partida = fireApp.firestore().collection('juego-1')

export default {
  name: 'Partida',
  components: {
    UserArena
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.obtenerPartida(to.params.no_partida)
      vm.$bind('partida', partida.doc(to.params.no_partida))
    })
  },
  data () {
    return {
      partida: {},
      partidas: []
    }
  },
  firestore: {
    partidas: fireApp.firestore().collection('juego-1')
  },
  //* Helper para asignar objetos o variables que necesitan ser detectados en sus cambios para ejecutar metodos.
  watch: {
    '$route.params': {
      deep: true,
      immediate: true,
      handler (value) {
        this.$bind('partida', partida.doc(value.no_partida))
      }
    }
  },
  methods: {
    // * Metodo para generar nueva partida.
    crearPartida () {
      // *Escribe en la base de datos.
      fireApp.firestore().collection('juego-1').doc('partida-2').set({
        'usuario_1': '',
        'usuario_2': '',
        'ganador': ''
      })
    },
    //* Cargar los datos de la partida del firestore. El ID de la partida se obtiene del parametro de la ruta.
    obtenerPartida (partida) {
      fireApp.firestore().collection('juego-1').doc(partida).get().then((result) => {
        console.log(result.data())
      })
    },
    getOpcion (opcion) {
      fireApp.firestore().collection('juego-1').doc(this.$route.params.no_partida).update({
        'usuario_1': opcion
      })
    }
  }
}
</script>
<style lang="scss">
.partida {
  background: palevioletred;
}
</style>
