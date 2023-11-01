// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0L6v3HE3MNxvzc65LtOmHDXViNZ43fX4",
  authDomain: "ctf-webapp.firebaseapp.com",
  projectId: "ctf-webapp",
  storageBucket: "ctf-webapp.appspot.com",
  messagingSenderId: "140992120654",
  appId: "1:140992120654:web:3bab9b38ec0a725a23001f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);