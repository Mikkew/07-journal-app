import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcC0-fWjz6a44oiA8mQuLxc8mJin0ugus",
  authDomain: "react-app-cursos-4076e.firebaseapp.com",
  projectId: "react-app-cursos-4076e",
  storageBucket: "react-app-cursos-4076e.appspot.com",
  messagingSenderId: "620079450523",
  appId: "1:620079450523:web:6b2e3983cc957bab38f93e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase,
  storage,
}