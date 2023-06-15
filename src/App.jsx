// import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './components/Header/Header'
import Homepage from './pages/Homepage/Homepage'
import './App.css'
import CategoryArticle from './pages/CategoryArticle/CategoryArticle'
import Auth from './pages/Auth/Auth'
import AddArticle from "./pages/AddArticle/AddArticle"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {

  // const notify = () => toast("Wow so easy!");

  return (

    
    <BrowserRouter>
      <Header />
      {/* <button onClick={notify}>Notify!</button>
        <ToastContainer /> */}
      <Routes>
        <Route path="/" element ={<Homepage />} />
        <Route path="/auth" element ={<Auth />} />
        <Route path ="/addArticle" element = {<AddArticle />} />
        <Route path="/category/:categoryName" element={<CategoryArticle />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
