import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import firebase from '../../firebase/clients';
import {useAtomValue,useSetAtom} from 'jotai'
import { challengeOneAtom } from '../atoms';
type User = firebase.User;


// async function readScore(uid: string) {
//     const db = firebase.firestore();
//     const userRef = db.collection('users').doc(uid);
//     const challengeComplete = false //useSetAtom(challenge1Atom)
//     const updateChallengeComplete = useSetAtom(challengeOneAtom)

//     await userRef.get().then((doc) => {
//         if (doc.exists) {
//             const data = doc.data();
//             if (data?.challenge1 === '1') {
//                 console.log("Challenge 1 complete")
//                 updateChallengeComplete(true)


//                 // challengeComplete(true)
//             }
//         } else {
//             console.log('No such document!');
//         }
//     }).catch((error) => {
//         console.log('Error getting document:', error);
//     });
// }

async function updateScore(uid: string,atomSetter: any) { 
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    
    

    await userRef.get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if (data) {
                userRef.update({ challenge1: 1 });
                atomSetter(true)
                // challengeComplete(true)
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
    const atomSetter = useSetAtom(challengeOneAtom)
    

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                console.log(user)
            } else {
                router.push('/signin');
            }
        });

        // user ? readScore(user.uid) : null
    }, [router]);

    useEffect(() => {
        
        const interval = setInterval(() => {
            const now = Date.now();
            const timeDiff = now - lastExecutionTime;

            if (timeDiff > 1000) {
                console.log(`Time difference is more than 500ms: ${timeDiff}ms`);
                console.log("ALERT ???")
                updateScore(user?.uid || "",atomSetter)
                
                // updateScore("1")
            }

            setLastExecutionTime(now);
        }, 50);

        return () => clearInterval(interval);
    }, [lastExecutionTime,user]);

    return null; // This component does not render anything
}

export default IntervalChecker;