import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import firebase from '../../firebase/clients';
type User = firebase.User;

async function updateScore(uid: string) { 
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    await userRef.get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if (data) {
                userRef.update({ challenge1: 1 });
            }
        } else {
            console.log('No such document!');
        }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });

}

function IntervalChecker() {
    const [lastExecutionTime, setLastExecutionTime] = useState(Date.now());
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                console.log(user)
            } else {
                router.push('/signin');
            }
        });
    }, [router]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeDiff = now - lastExecutionTime;

            if (timeDiff > 1000) {
                console.log(`Time difference is more than 500ms: ${timeDiff}ms`);
                console.log("ALERT ???")
                updateScore(user?.uid || "")
                // updateScore("1")
            }

            setLastExecutionTime(now);
        }, 50);

        return () => clearInterval(interval);
    }, [lastExecutionTime,user]);

    return null; // This component does not render anything
}

export default IntervalChecker;