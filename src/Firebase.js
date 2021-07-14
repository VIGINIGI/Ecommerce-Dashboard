import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';


const app = firebase.initializeApp({
  // Vighnesh Account
  // apiKey: "AIzaSyDa5KQ5aeMvz3Xmqoq9_ynoXAIG5qBnGSI",
  // authDomain: "dashboard-58354.firebaseapp.com",
  // projectId: "dashboard-58354",
  // storageBucket: "dashboard-58354.appspot.com",
  // messagingSenderId: "73069477453",
  // appId: "1:73069477453:web:c75c05a3bff02ff004a604"

  apiKey: "AIzaSyCJZXI2L7CyvZRgTh3wwXbksonU4fM2u1o",
    authDomain: "ecommerce-dashboard-dd9c3.firebaseapp.com",
    projectId: "ecommerce-dashboard-dd9c3",
    storageBucket: "ecommerce-dashboard-dd9c3.appspot.com",
    messagingSenderId: "4472431640",
    appId: "1:4472431640:web:854121db1a63e265280f6d"
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
