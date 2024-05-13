import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./home/home"
import Login from "./login/login"
import Register from "./register/register"
import UserProfile from "./userProfile/userProfile"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/Register" element={<Register />}/>
      <Route path="/userProfile" element={<UserProfile />} />

    </Routes>
  )
}

export default App;