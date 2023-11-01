// import {Routes,Route} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
// import  FormEvent from 'react';
import Cookies from 'js-cookie';
import ReactDOMServer from 'react-dom/server';
import { getAuth } from "firebase-admin/auth";
import { app } from "../firebase/server";

// import auth from './auth/auth.tsx';

import { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

export default function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginFormRef = useRef<HTMLFormElement>(null)
    const auth = getAuth(app);
    // console.log("auth: ", auth);
    console.log(username);
    console.log(password);
    const handleSubmit = async (e ) => {
        e.preventDefault();
        console.log("Reaching here");
        
        

        console.log("USER"+username);
        console.log("Pass:"+password);


        try {
            const userCredential = await auth.createUser({
            email: username as string,
            password: password as string,
            });
            console.log("User created successfully\n");    
            console.log("->   user email: ", userCredential.email);
            console.log("userUID: ", userCredential.uid);
        } catch (error) {
            console.log(error);
            return new Response(`Something went wrong`, {
            status: 400,
            });
        }
        
        
        
    // console.log(checkCred(username, password));
      // console.log(loginForm.username);
      // console.log(loginForm.password);

      // const form = document.getElementById('loginForm') as HTMLFormElement;
  }

//   form.addEventListener('submit', async (e: Event) => {
//     e.preventDefault();
//     console.log('Form submitted');
    
    
//     Cookies.set('authenticated', 'true', { expires: 7 });
//     console.log('Fetch complete');
//   })
  

  

  return (
    <div>
      <h1>Register</h1>
      <form id="loginForm" ref={loginFormRef} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username: email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>

      <Link to={'/signin'}>SignIn</Link>
    </div>
  );
};