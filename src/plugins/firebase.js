import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJk3PdeE2mY8gVyTHL6ENPE1xkfOMiCx0",
    authDomain: "vue-error-handling.firebaseapp.com",
    projectId: "vue-error-handling",
    storageBucket: "vue-error-handling.appspot.com",
    messagingSenderId: "457928275166",
    appId: "1:457928275166:web:7dfaba77d5961f0843fe4f",
    measurementId: "G-S7ZSVS2BF8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// Use these for db & auth
const db = firebaseApp.firestore();

export default db;