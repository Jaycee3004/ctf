import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Env from './pages/Env'
import SignIn from './pages/SignIn'

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
      {/* <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </nav> */}
      <Routes>
        <Route key={"/"} path="/" element={<Home/>} />
        <Route key={"/about"} path="/about" element={<About/>} />
        <Route key={"/env"} path="/env" element={<Env/>} />
        <Route key={"/signin"} path="/signin" element={<SignIn/>} />
        {/* {routes.map(({ path, component: RouteComp }) => {
          console.log("Path+RouteComp:",path, RouteComp)
          return <Route key={path} path={path} element={<RouteComp />}></Route>
        })} */}
      </Routes>
    </>
  )
}
