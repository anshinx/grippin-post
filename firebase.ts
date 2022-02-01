// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firestore, { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdfcswkrEo4sp2CexFPTKvKrAe9iJcgF4",
  authDomain: "node-103.firebaseapp.com",
  projectId: "node-103",
  storageBucket: "node-103.appspot.com",
  messagingSenderId: "72341058485",
  appId: "1:72341058485:web:cbd2410425ed7a09781ffc",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const realtimedb = getDatabase(app)
export { app, auth, db, firestore, storage, ref, realtimedb };