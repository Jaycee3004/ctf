import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Routes, Route } from "react-router-dom";
import fs from "fs";
import path from "path";
import { useState, useRef } from "react";
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
function checkCred(username, password) {
  const p = path.resolve(__dirname, "./../data/userData.json");
  const data = fs.readFileSync(p).toString();
  const userData = JSON.parse(data);
  for (const user of userData.users) {
    if (user.username === username && user.password === password) {
      return true;
    }
  }
  return false;
}
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginFormRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    console.log(checkCred(username, password));
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
function App() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }, "/about"),
    /* @__PURE__ */ jsx(Route, { path: "/env", element: /* @__PURE__ */ jsx(Env, {}) }, "/env"),
    /* @__PURE__ */ jsx(Route, { path: "/signin", element: /* @__PURE__ */ jsx(SignIn, {}) }, "/signin")
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
