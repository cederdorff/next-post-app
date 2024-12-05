// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb2V3ranv-osMbP9wosb3PqHKw1WTc9JI",
  authDomain: "next-post-app-race.firebaseapp.com",
  databaseURL: "https://next-post-app-race-default-rtdb.firebaseio.com",
  projectId: "next-post-app-race",
  storageBucket: "next-post-app-race.firebasestorage.app",
  messagingSenderId: "528327461982",
  appId: "1:528327461982:web:213fb90ab670afcc8bb8cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const firebaseAuth = getAuth(app);
