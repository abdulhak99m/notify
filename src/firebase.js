import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAS6RgbNbxMOfY1RaqeLnlhdmVOqrqE0A8",
    authDomain: "convo-c6304.firebaseapp.com",
    projectId: "convo-c6304",
    storageBucket: "convo-c6304.appspot.com",
    messagingSenderId: "894390327963",
    appId: "1:894390327963:web:8834a57c28eba56507043e",
    measurementId: "G-ZVL6TC4JTS"
  };
  const fire = firebase.initializeApp(firebaseConfig);

  export const db = fire.database().ref();

  export default fire;
