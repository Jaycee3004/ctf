'use client'
// import App from 'next/app';
import firebase from '../../../firebase/clients'

import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { app } from "../server";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false); // State to track registration success
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Registration successful, you can redirect or perform other actions
      console.log('Registration successful')

      const db = firebase.firestore();
      const userRef = db.collection('users').doc(firebase.auth().currentUser?.uid);
      await userRef.set({
        email: email,
        challenge1: 0
      });
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
        <div>
          
          <div className="flex flex-col items-center mt-[10vh]">
                <h2 className="mb-5 text-gray-900 font-mono font-bold text-xl">Register</h2>
      
                <form onSubmit={handleRegister}>
                    <input type="text" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    
                    <button className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]">Register</button>
                </form>
                <p className="text-center mt-3 text-[14px]">Already have an account? 
                    <Link href="/login" className="text-gray-600">Log In</Link>
                </p>
                
            </div>
        </div>
      );
}