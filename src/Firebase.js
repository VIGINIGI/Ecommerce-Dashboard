import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    // apiKey: "AIzaSyCJZXI2L7CyvZRgTh3wwXbksonU4fM2u1o",
    // authDomain: "ecommerce-dashboard-dd9c3.firebaseapp.com",
    // projectId: "ecommerce-dashboard-dd9c3",
    // storageBucket: "ecommerce-dashboard-dd9c3.appspot.com",
    // messagingSenderId: "4472431640",
    // appId: "1:4472431640:web:854121db1a63e265280f6d"

    apiKey: "AIzaSyDuAF8zyfzRKdgXf0v1mu7ZrQ_njGNQdkU",
    authDomain: "jefli-8c48e.firebaseapp.com",
    projectId: "jefli-8c48e",
    storageBucket: "jefli-8c48e.appspot.com",
    messagingSenderId: "197853377653",
    appId: "1:197853377653:web:fd250d46850a9aa11f743c",
    measurementId: "G-902GPZZ4CV"
  })



// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })
export const db=firebase.firestore();
export const auth = app.auth();
export const storageRef=app.storage().ref();
