import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCUBBw-jYFjjrV08ZyXhRSXKr4J9XDbbUs",
  authDomain: "ptachat-c053f.firebaseapp.com",
  projectId: "ptachat-c053f",
  storageBucket: "ptachat-c053f.appspot.com",
  messagingSenderId: "406564631752",
  appId: "1:406564631752:web:77cac51afe888cb9fca1fd",
  measurementId: "G-27VFH6LP6Z"
  };
  const fire = firebase.initializeApp(firebaseConfig);

  export const db = fire.database().ref();

  export default fire;


 