import firebase from 'firebase'
var firebaseConfig = {
    apiKey: 'AIzaSyBd63jpzF1J2dErNMC_yW-eSTjw2uOnhF4',
    authDomain: 'terminal-prototype.firebaseapp.com',
    databaseURL: 'https://terminal-prototype.firebaseio.com',
    projectId: 'terminal-prototype',
    storageBucket: 'terminal-prototype.appspot.com',
    messagingSenderId: '354894608266',
    appId: '1:354894608266:web:b76df36fe732cae19f7a73',
    measurementId: 'G-F12RQDHE5J',
  }
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()
