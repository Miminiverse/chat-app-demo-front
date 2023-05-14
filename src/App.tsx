import { useState } from 'react'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import axios from "axios"
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  // axios.defaults.baseURL = "http://localhost:5052"


  return (
    <>
      <div>
      <BrowserRouter>
      <Routes>
      <Route path={"/register"} element={<Register/> } />
      <Route path={"/login"} element={<Login/> } />
      <Route path={"/"} element={<Chat/> } />
      </Routes>
      </BrowserRouter>
      </div>

    </>
  )
}

export default App
