import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import Cookies from "js-cookie";
import { initializeApp as initializeApp$1, cert } from "firebase-admin/app";
import { config } from "dotenv";
const firebaseConfig = {
  apiKey: "AIzaSyB0L6v3HE3MNxvzc65LtOmHDXViNZ43fX4",
  authDomain: "ctf-webapp.firebaseapp.com",
  projectId: "ctf-webapp",
  storageBucket: "ctf-webapp.appspot.com",
  messagingSenderId: "140992120654",
  appId: "1:140992120654:web:3bab9b38ec0a725a23001f"
};
const app$1 = initializeApp(firebaseConfig);
async function checkSessionCookie(isAuthenticated, setIsAuthenticated) {
  try {
    console.log("Reaching here Huh!");
    const auth = await getAuth(app$1);
    if (Cookies.get("session")) {
      const sessionCookie = Cookies.get("session");
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
function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(0);
  useNavigate();
  useEffect(() => {
    checkSessionCookie(isAuthenticated, setIsAuthenticated);
  }, []);
  if (isAuthenticated === 0 && Cookies.get("session")) {
    return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  }
  if (isAuthenticated === 1 && Cookies.get("session")) {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h1", { children: "Home" }) });
  } else {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h1", { children: "Home not found" }),
      /* @__PURE__ */ jsx(Link, { to: "/signin", children: "SignIn" })
    ] });
  }
}
function About() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h1", { children: "About" }) });
}
function Env() {
  let msg = "default message here";
  try {
    msg = process.env.MY_CUSTOM_SECRET || msg;
  } catch {
  }
  return /* @__PURE__ */ jsx("h1", { children: msg });
}
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginFormRef = useRef(null);
  const handleSubmit = async (e) => {
    console.log(username);
    console.log(password);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Sign In" }),
    /* @__PURE__ */ jsxs("form", { id: "loginForm", ref: loginFormRef, onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Username",
          value: username,
          onChange: (e) => setUsername(e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          placeholder: "Password",
          value: password,
          onChange: (e) => setPassword(e.target.value)
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "submit", children: "Sign In" })
    ] })
  ] });
}
config();
console.log(process.env.FIREBASE_PROJECT_ID);
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};
const app = initializeApp$1({
  credential: cert(serviceAccount)
});
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginFormRef = useRef(null);
  const auth = getAuth(app);
  console.log(username);
  console.log(password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Reaching here");
    console.log("USER" + username);
    console.log("Pass:" + password);
    try {
      const userCredential = await auth.createUser({
        email: username,
        password
      });
      console.log("User created successfully\n");
      console.log("->   user email: ", userCredential.email);
      console.log("userUID: ", userCredential.uid);
    } catch (error) {
      console.log(error);
      return new Response(`Something went wrong`, {
        status: 400
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Register" }),
    /* @__PURE__ */ jsxs("form", { id: "loginForm", ref: loginFormRef, onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Username: email",
          value: username,
          onChange: (e) => setUsername(e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          placeholder: "Password",
          value: password,
          onChange: (e) => setPassword(e.target.value)
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "submit", children: "Sign In" })
    ] }),
    /* @__PURE__ */ jsx(Link, { to: "/signin", children: "SignIn" })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }, "/"),
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }, "/about"),
    /* @__PURE__ */ jsx(Route, { path: "/env", element: /* @__PURE__ */ jsx(Env, {}) }, "/env"),
    /* @__PURE__ */ jsx(Route, { path: "/signin", element: /* @__PURE__ */ jsx(SignIn, {}) }, "/signin"),
    /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(Register, {}) }, "/register")
  ] }) });
}
console.log("Server side rendering");
function render(url, context) {
  return ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, context, children: /* @__PURE__ */ jsx(App, {}) })
  );
}
export {
  render
};
