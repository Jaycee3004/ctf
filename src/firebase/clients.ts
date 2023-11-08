// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.PUBLIC_FIREBASE_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);