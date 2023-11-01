import React, { useEffect, useState } from 'react';
import { app } from "../firebase/clients";
import SignIn from "./SignIn";
import { getAuth } from "firebase-admin/auth";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

async function checkSessionCookie(isAuthenticated: number, setIsAuthenticated: any) {
  try {
    console.log("Reaching here Huh!")
    const auth = await getAuth(app);
    if (Cookies.get("session")) {
      const sessionCookie = Cookies.get("session")!;
      const decodedCookie = await auth.verifySessionCookie(sessionCookie);
      if (decodedCookie) {
        setIsAuthenticated(1);
      } else {
        console.log(" Session cookies not verified");
        setIsAuthenticated(-1);
      }
    } else {
      console.log("Error: NO cookies AT ALL");
      setIsAuthenticated(-1);
    }
  } catch (error) {
    console.log("Error verifying session cookie:", error);
    setIsAuthenticated(-1);
  }
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    checkSessionCookie(isAuthenticated, setIsAuthenticated);
  }, []);

  if (isAuthenticated === 0 && Cookies.get("session")) {
    return <div>Loading...</div>; // Show a loading spinner or message while checking authentication
  }

  if (isAuthenticated === 1 && Cookies.get("session")) {
    return (
      <>
        <h1>Home</h1>
      </>
    );
  } else {
    return (
      <>
        <h1>Home not found</h1>
        <Link to={'/signin'}>SignIn</Link>
      </>
    );
  }
}