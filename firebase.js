// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAQt4P4NPwupRaMye-9RZERVyKOfp_K71s",
  authDomain: "laundry-application-73fa8.firebaseapp.com",
  projectId: "laundry-application-73fa8",
  storageBucket: "laundry-application-73fa8.appspot.com",
  messagingSenderId: "845967242707",
  appId: "1:845967242707:web:7ad31b540559e49f282b26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};