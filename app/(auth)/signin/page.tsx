'use client';

import { redirect } from 'next/dist/server/api-utils';
import firebase from '../../../firebase/clients'
import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false); // State to track registration success
  const [error, setError] = useState(null);
  const router = useRouter();
  // console.log("under execution")

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("under execution")
  //     setRegistered(true);
  //     router.push('/dashboard');
  //   }, 2000);
  //       // router.push('/signin');
  // }, [router]);

  
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("under execution")
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Sign-in successful, you can redirect or perform other actions
      console.log('Sign-in successful')
      router.push('/dashboard');
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div >
      {/* {error && <p>{error}</p>} */}
      {error && <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Warning !</span> Invalid Username or Password.
        </div>
      </div>}
      {registered && <p>Registration successful!</p>}  
      <div className="flex flex-col items-center mt-[10vh] rounded-md">
            <h2 className="mb-5 text-gray-900 font-mono font-bold text-xl">Sign-In</h2>
  
            <form onSubmit={handleSignIn}>
                <input type="text" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <button type="submit" className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]">login</button>
            </form>
            <p className="text-center mt-3 text-[14px]">Don't have an account? 
                <Link href="/register" className="text-gray-600">Register</Link>
            </p>
            
        </div>
    </div>
  );
}