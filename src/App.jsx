import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Challenge1 from './pages/Challenge1'
import About from './pages/About'
import Env from './pages/Env'
import SignIn from './pages/SignIn'
import Register from './pages/Register'

// const pages = import.meta.glob('./pages/*.jsx', { eager: true })
// console.log(pages)
// const routes = Object.keys(pages).map((path) => {
//   const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1]
//   return {
//     name,
//     path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
//     component: pages[path].default,
//   }
// })

export function App() {
  return (
    <>
      <Routes>
        <Route key={"/"} path="/" element={<Challenge1/>} />
        <Route key={"/about"} path="/about" element={<About/>} />
        <Route key={"/env"} path="/env" element={<Env/>} />
        <Route key={"/signin"} path="/signin" element={<SignIn/>} />
        <Route key={"/register"} path="/register" element={<Register/>} />
        {/* {routes.map(({ path, component: RouteComp }) => {
          console.log("Path+RouteComp:",path, RouteComp)
          return <Route key={path} path={path} element={<RouteComp />}></Route>
        })} */}
      </Routes>
    </>
  )
}
