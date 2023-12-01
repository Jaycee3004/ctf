// hooks/useForceLogin.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import firebase from '../firebase/clients';
// import 'firebase/auth';

const useForceLogin = () => {
    const router = useRouter();
    console.log("running force login")
    useEffect(() => {
        // Force sign out
        firebase.auth().signOut();

        // Check if the user is not logged in
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                // Redirect to login page
                router.push('/signin?redirect=account');
            }
        });
    },[]);
};

export default useForceLogin;
