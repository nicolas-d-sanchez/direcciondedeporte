  
  require("firebase/firestore");
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'


  var firebaseConfig = {
    apiKey: "AIzaSyASB8a99yJ0D5wQfbVZaORBOX2BrzC-HUU",
    authDomain: "dirdeporteunne.firebaseapp.com",
    databaseURL: "https://dirdeporteunne.firebaseio.com",
    projectId: "dirdeporteunne",
    storageBucket: "dirdeporteunne.appspot.com",
    messagingSenderId: "556952285720",
    appId: "1:556952285720:web:b58599e52d8b01fea8096d"
};

const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export {db,fb}
