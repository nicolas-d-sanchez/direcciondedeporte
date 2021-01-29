  // Your web app's Firebase configuration
<<<<<<< HEAD

  import firebase from 'firebase';
  import firestore from 'firebase/firestore'
  require("firebase/firestore");
=======
  import firebase from 'firebase/app'
  // import 'firebase/auth'
  import 'firebase/firestore'
>>>>>>> 1b56835fab26032e4cb76543f72dd36ee3142de0

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
export {db,fb}
