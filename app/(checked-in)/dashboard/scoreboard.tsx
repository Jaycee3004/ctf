'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import firebase from '../firebaseConfig'
import firebase from '../../../firebase/clients'
import Link from 'next/link'
import { challengeOneAtom } from "../../atoms";

type User = firebase.User;

async function readChallenges(uid: string) {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    
    console.log(userRef)

    const to_return = await userRef.get().then((doc) => {
        // console.log(doc)
        if (doc.exists) {
            const data = doc.data();
            console.log("data")
            console.log(data)
            if (data) {
                return data
            }
            // return data
        } else {
            console.log('No such document!');
            return null
        }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });
    return to_return


}


export default function Scoreboard() {

    const [user, setUser] = useState<User | null>(null);
    const [challengeOneDone, setChallengeOneDone] = useState(false)
    const router = useRouter();

    // const [userData, setUserData] = useState();
    // let userData = null
    // const [filteredData, setFilteredData] = useState({});

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/signin');
            }
        });

        console.log(user)


        

          
        // filteredData

    }, [router]);

    if (user) {
        // console.log("User exists")
        // console.log(user.uid)
        readChallenges(user.uid).then((data) => {
            // console.log("tempo-",data)
            if (data) {
                // console.log("data['challenge1']",data['challenge1'])
                if (data['challenge1'] === 1) {
                    setChallengeOneDone(true)
                }
            }
            
            // return data
        })
        // console.log("user_dict",user_dict)

        
        // const filteredData = Object.keys(userData).reduce((acc, key) => {
        //     if (key.startsWith('challenge')) {
        //       acc[key] = userData[key];
        //     }
        //     return acc;
        //   }, {});
        return (
            <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Challenge No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Topic
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    IS Completed
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link href="/challenge1" > Challenge 1</Link>
                                </th>
                                <td className="px-6 py-4">
                                    XSS Vulnerablity
                                </td>
                                <td className="px-6 py-4">
                                    {  challengeOneDone &&
                                    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Done</span>

                                    }
                                    {  !challengeOneDone &&
                                    <span className="bg-green-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Incomplete</span>

                                    }
                                    {/* <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Green</span> */}

                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>

            </>
        )
    } else {
        return <p>Loading...</p>
    }
}