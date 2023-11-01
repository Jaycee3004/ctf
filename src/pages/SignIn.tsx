// import {Routes,Route} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import Cookies from 'js-cookie';
import ReactDOMServer from 'react-dom/server';
import { FormEvent } from 'react';

// import auth from './auth/auth.tsx';

import { useState, useEffect, useRef} from 'react';

export default function SignIn(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginFormRef = useRef<HTMLFormElement>(null)



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(username);
    console.log(password);
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
      <h1>Sign In</h1>
      <form id="loginForm" ref={loginFormRef} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
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
    </div>
  );
};