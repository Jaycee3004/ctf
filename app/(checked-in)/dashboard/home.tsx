'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
            <div>
                <h1>Home</h1>
                <p>Welcome {user.displayName}</p>
                <button onClick={() => firebase.auth().signOut()}>Logout</button>
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}