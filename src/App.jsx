import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import "./App.scss"
import Cart from './components/Cart/Cart'

const App = () => {
  return (
    <>
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </>
  )
}

export default App