// 'use client'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// Import the functions you need from the SDKs you need
// import  firebase from 'firebase/app';
// import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

// Initialize Firebase
// export const app = firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  
export default firebase;