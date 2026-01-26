import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Navbar from './components/navbar/navbar'
import Signup from './pages/signup/signup'
import Login from './pages/login/login'
import Dashboard from './pages/dashboard/dashboard'
import AdminDashboard from './pages/dashboard/adminDashboard'
import Input from './pages/input/input'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/phrases/:category' element={<Input/>}/>
      </Routes>
    </div>
  )
}

export default App
