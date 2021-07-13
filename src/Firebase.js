import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';


const app = firebase.initializeApp({
    apiKey: "AIzaSyCJZXI2L7CyvZRgTh3wwXbksonU4fM2u1o",
    authDomain: "ecommerce-dashboard-dd9c3.firebaseapp.com",
    projectId: "ecommerce-dashboard-dd9c3",
    storageBucket: "ecommerce-dashboard-dd9c3.appspot.com",
    messagingSenderId: "4472431640",
    appId: "1:4472431640:web:854121db1a63e265280f6d"

  //   apiKey: "AIzaSyDJE5k56AfrfOy1xoHRzFQEb_7hG97-Zmk",
  // authDomain: "auth-738de.firebaseapp.com",
  // projectId: "auth-738de",
  // storageBucket: "auth-738de.appspot.com",
  // messagingSenderId: "319754982751",
  // appId: "1:319754982751:web:9c17f78b468db5bc49d2ea",
  // measurementId: "G-D5Q00S9M9D"
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
export const auth = app.auth()

export default app
