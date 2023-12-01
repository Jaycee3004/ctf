'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Scoreboard from "./scoreboard";
// import firebase from '../firebaseConfig'
import firebase from '../../../firebase/clients'

type User = firebase.User;

export default function Home() {

    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

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
            <div>
                {/* <h1>Home</h1> */}
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => firebase.auth().signOut()}>Logout</button>
            </div>
            <Scoreboard />
            </>
        )
    } else {
        return <p>Loading...</p>
    }
}