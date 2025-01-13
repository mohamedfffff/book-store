import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({book}) => {
  return (
    <Link to={`/details/${book._id}`} className="relative m-8 group w-80 h-128 overflow-hidden rounded-lg transition-transform transform hover:scale-105">  
      <img  src={book.cover}  
            alt={book.title} 
            onError={(e)=>{e.currentTarget.src='https://bookcart.azurewebsites.net/Upload/Default_image.jpg'}}
            className="w-full h-full object-cover" />  
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <h2 className="text-xl font-semibold">{book.title}</h2>  
        <p className="mt-1 text-lg text-yellow-400">{book.rating} ⭐</p>
      </div>  
    </Link>
  )
}

export default ProductCard