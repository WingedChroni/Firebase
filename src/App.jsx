// import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './components/Header/Header'
import Homepage from './pages/Homepage/Homepage'
import './App.css'
import CategoryArticle from './pages/CategoryArticle/CategoryArticle'
import Auth from './pages/Auth/Auth'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element ={<Homepage />} />
        <Route path="/auth" element ={<Auth />} />
        <Route path="/category/:categoryName" element={<CategoryArticle />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
