import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDPBHSSGB3DIFWeuRHrQCl1j7zBGmPvC8U",
    authDomain: "todo-c4489.firebaseapp.com",
    projectId: "todo-c4489",
    storageBucket: "todo-c4489.appspot.com",
    messagingSenderId: "278829897712",
    appId: "1:278829897712:web:a5b3585c5979313c8aef35",
    measurementId: "G-G21SDZLBHS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;