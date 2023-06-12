// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//need function to connect to firestore
import {getFirestore} from 'firebase/firestore'

//need to set up auth
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3MW3JRsPPUL_JmDsaLbPbM86EfCxMc7c",
  authDomain: "cohort-25-blog.firebaseapp.com",
  projectId: "cohort-25-blog",
  storageBucket: "cohort-25-blog.appspot.com",
  messagingSenderId: "473113489879",
  appId: "1:473113489879:web:fd989915d3b1b953ba1b92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up database and export it
export const db = getFirestore (app);


//active auth
export const auth = getAuth (app);