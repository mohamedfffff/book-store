import React from 'react'
import { MdAddBox } from "react-icons/md";
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <nav className="bg-gray-800 p-4">  
      <div className="container mx-auto flex justify-between items-center">  
        <Link to="/" className="text-white text-2xl font-bold">  
          The Book Store 📖  
        </Link> 
        <Link to="/create" className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded transition duration-200">  
        <MdAddBox />  
        </Link>  
      </div>   
    </nav>
    </>
  )
}

export default Navbar