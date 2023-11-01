import React from 'react';
import { app } from "../firebase/server";
import { getAuth } from "firebase-admin/auth";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

/* Check if the user is authenticated */
const auth = getAuth(app);
if (Cookies.get("session")) {
  const sessionCookie = Cookies.get("session")!;
  const decodedCookie = await auth.verifySessionCookie(sessionCookie);
  if (!decodedCookie) {
    redirect("/signin");
  }
}


// import { addAndMultiply } from '../add'
// import { multiplyAndAdd } from '../multiply'

export default function Home() {

  return (
    
          <>
            <h1>Home</h1>

          </>
        )
      
  }