'use client'
// import App from 'next/app';
import firebase from '../../firebase/clients'

import { useState } from "react";
import { useRouter } from 'next/navigation';
// import { app } from "../server";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Registration successful, you can redirect or perform other actions
      console.log('Registration successful')
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}