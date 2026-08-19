import { Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import PrivateRoute from "./PrivateRoute"
import Home from "./pages/home/Home"

function App() {
  return (
    <Routes>
      <Route path="/"  element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
      }/>
    </Routes>
  )
}

export default App
