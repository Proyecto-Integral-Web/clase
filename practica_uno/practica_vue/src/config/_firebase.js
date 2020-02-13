import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAMdl_MkiHtGUfjM-aWxVGG8-0AwJfTG_o',
  authDomain: 'clase-proyecto.firebaseapp.com',
  databaseURL: 'https://clase-proyecto.firebaseio.com',
  projectId: 'clase-proyecto',
  storageBucket: 'clase-proyecto.appspot.com',
  messagingSenderId: '30636711066',
  appId: '1:30636711066:web:0a0d1712a90a907e13d323',
  measurementId: 'G-PELCXN7ZNR'
}

var fireApp = firebase.initializeApp(firebaseConfig)

export default fireApp
