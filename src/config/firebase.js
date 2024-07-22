// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD08cBVAJc3A9UHmWPz0XreNJODS45gFUY",
  authDomain: "react-pizza-b1861.firebaseapp.com",
  projectId: "react-pizza-b1861",
  storageBucket: "react-pizza-b1861.appspot.com",
  messagingSenderId: "866411416380",
  appId: "1:866411416380:web:fc6bd811a2bb80616fac39",
  measurementId: "G-2MRWTLWEDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}