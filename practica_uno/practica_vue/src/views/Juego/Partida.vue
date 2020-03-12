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
            @opcion="partida.participantes[0] === user.uid?getOpcion:''"
            :userOpcion="partida.usuario_1"
            :displayName="!user.displayName?partida.names[0]!== user.displayName?partida.names[0]:'':user.displayName"
          ></user-arena>
        </div>
        <div class="col col-sm-6">
          <!-- <button
            v-if="!partida.names[1] && user.uid !== partida.participantes[0]"
            class="btn btn-outline-primary"
          >-->
          <button
            v-if="!partida.names[1]"
            class="btn btn-outline-primary"
            @click="retar"
          >
            👾
          </button>
          <user-arena
            :displayName="!partida.names[1]?'Esperando Retador':partida.names[1]"
            :userOpcion="partida.usuario_1!=''?partida.usuario_2:''"
            @opcion="partida.participantes[1] === user.uid?getOpcion:''"
          ></user-arena>
        </div>
      </div>
      {{partida}}
    </div>
  </section>
</template>
<script lang="js">
import UserArena from '@/components/Juego/UserArena'
import fireApp from '../../config/_firebase.js'
import Auth from '@/config/auth'

const partida = fireApp.firestore().collection('juego-1')

export default {
  name: 'Partida',
  components: {
    UserArena
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.obtenerPartida(to.params.no_partida)
      vm.user = Auth.getUser()
      vm.$bind('partida', partida.doc(to.params.no_partida))
    })
  },
  data () {
    return {
      partida: {},
      partidas: [],
      user: {}
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
        this.user = Auth.getUser()
        this.$bind('partida', partida.doc(value.no_partida))
      }
    }
  },
  mounted () {
    this.user = Auth.getUser()
  },
  methods: {
    // * Metodo para generar nueva partida.
    crearPartida () {
      this.user = Auth.getUser()
      // eslint-disable-next-line no-unused-vars
      let uid = this.user.uid
      // *Escribe en la base de datos.
      fireApp.firestore().collection('juego-1').add({
        participantes: [uid],
        names: [this.user.displayName == null ? 'Usuario 1' : this.user.displayName],
        usuario_1: '',
        usuario_2: '',
        ganador: ''
      })
    },
    //* Cargar los datos de la partida del firestore. El ID de la partida se obtiene del parametro de la ruta.
    obtenerPartida (partida) {
      fireApp.firestore().collection('juego-1').doc(partida).get().then((result) => {
        console.log(result.data())
      })
    },
    retar () {
      this.user = Auth.getUser()
      // eslint-disable-next-line no-unused-vars
      let uid = this.user.uid
      // *Escribe en la base de datos.
      this.partida.names.push(this.user.displayName == null ? 'Usuario' : this.user.displayName)
      this.partida.participantes.push(this.user.uid)
      fireApp.firestore().collection('juego-1').doc(this.$route.params.no_partida).update(this.partida)
    },
    getOpcion (opcion) {
      let participantes = this.partida.participantes
      console.log(participantes.indexOf(this.user.uid))
      let data = {}
      if (participantes.indexOf(this.user.uid) === 0) {
        data = {
          'usuario_1': opcion
        }
      } else {
        data = {
          'usuario_2': opcion
        }
      }
      fireApp.firestore().collection('juego-1').doc(this.$route.params.no_partida).update(data)
    }
  }
}
</script>
<style lang="scss">
.partida {
  background: palevioletred;
}
</style>
