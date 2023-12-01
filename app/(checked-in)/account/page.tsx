'use client';

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useForceLogin from "../../../hooks/useForceLogin";
// import firebase from '../firebaseConfig'
import firebase from '../../../firebase/clients'
import Link from "next/link";
import { recentSignInAtom } from "../../atoms";
import { useAtomValue,useSetAtom } from "jotai";
// import { AppInstanceRouter } from "next/navigation/router";

type User = firebase.User;

function deleteAccount(router,setDelError,setError) {
    const user = firebase.auth().currentUser;
    if (user) {
        user.delete().then(() => {
            console.log("User deleted")
            router.push('/signin');
        }).catch((error) => {
            setDelError(true)
            
            console.log(error)
        });
    }
}



export default function Account() {

    // const recentSignIn = useAtomValue(recentSignInAtom);
    // const setRecentSignIn = useSetAtom(recentSignInAtom);
    // // if (!recentSignIn) {
    // //     useForceLogin();
    // // }
    // setRecentSignIn(false);



    

    const [user, setUser] = useState<User | null>(null);
    // const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [delError, setDelError] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    function handleChange(form) {
        form.preventDefault();
        // setError(null);
        if (user) {
            user.updatePassword(password)
        .then(() => {
        console.log("Password updated successfully");
        setMessage("Password updated successfully");
        })
        .catch((error) => {
        console.log("Error updating password:", error);
            setMessage("Error updating password. Sign-In required again");
        });
        }

        setPassword("");
        // setEmail("");
        


    }



    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 3000);
    },[message])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/signin');
            }
        });
    }, [router]);

    if (user) {
        return (
            <>
            
                {/* <h1>Account</h1> */}
                <div className="flex items-center">
                    {delError && <h1 className="text-red-500">Recent login required :(</h1>}
                </div>
                
                <button className="flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => deleteAccount(router,setDelError,setError)}>Delete Account</button>
                <div >
      {/* {error && <p>{error}</p>} */}
      {message !== "" && <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Warning !</span> {message}
        </div>
      </div>}
      
      <div className="flex flex-col items-center mt-[10vh] rounded-md">
            <h2 className="mb-5 text-gray-900 font-mono font-bold text-xl">Change-Info</h2>
  
            <form onSubmit={handleChange}>
                {/* <input type="text" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Re-enter email" value={email} onChange={(e) => setEmail(e.target.value)}/> */}
                <input type="password" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <button type="submit" className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]">Change</button>
            </form>
            <p className="text-center mt-3 text-[14px]"> 
                <Link href="/register" className="text-gray-600">Register</Link>
                <span> | </span>
                <Link href="/signin" className="text-gray-600">Sign In</Link>
            </p>
            
        </div>
    </div>
            </>
        )
    } else {
        return <p>Loading...</p>
    }
}