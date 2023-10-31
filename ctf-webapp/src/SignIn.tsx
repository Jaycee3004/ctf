// import {Routes,Route} from 'react-router-dom';
import Cookies from 'js-cookie';


// import { useEffect } from 'react';

export default function SignIn() {

    // Check for presense of Cookies. is authenticated yet.
    // If authenticated, redirect to dashboard
    // if (Cookies.get('authenticated')) {
    //     return (
    //         <Routes>
    //             <Route path = "/dashboard" element={<Landing/>}/>
    //         </Routes>
    //     )
    // }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        console.log("Form submitted")
        e.preventDefault();
        const form = e.currentTarget;
        const username = form.username?.value;
        const password = form.password?.value;

        console.log(username);
        console.log(password);
        fetch('http://localhost:3000/login/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username":username,"password":password})
        }).then((response) => {response.json().then((data) => {
            console.log(data);
            return data;
        })

        Cookies.set('authenticated', 'true', { expires: 7 });
    })

        
        console.log("Fetch complete");
        
        return false;
    }
    

    
    // If NOT authenticated, redirect to .

    

    return(
        <div>
            <h1>Sign In</h1>
            <form id="loginForm" method="post" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" id="username"/>
                <input type="text" placeholder="Password"id="password"/>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )


    
}