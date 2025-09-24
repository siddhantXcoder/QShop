import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Order from './components/Order'
import Product from './components/Product'
import Userdashboard from './components/Userdashboard'

function App() {

  return (
    <div>
      <Routes>
        <Route path= "/" element={<Home/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/userdashboard' element={<Userdashboard/>}/>
        <Route path='/order'element={<Order/>}/>
  
        <Route path='/product' element={<Product/>}/>
      </Routes>
    </div>
  )
}

export default App

