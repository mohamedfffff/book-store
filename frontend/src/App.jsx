import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import ShowPage from './pages/ShowPage'
import EditPage from './pages/EditPage'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/details/:id" element={<ShowPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App