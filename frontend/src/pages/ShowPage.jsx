import React from 'react'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import UpdateCard from '../components/UpdateCard';

const ShowPage = () => {
  // getting the id from the page params
  // the variable has to be the same name when passing it from the Route Path
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateCard, setUpdateCard] = useState(false);

  // fetching a book from the backend with an id
 const fetchBook = async (id) => {
  try {
      const apiURI = 'https://book-store-deployment.vercel.app';
      const response = await fetch(`${apiURI}/books/${id}`);
      const data = await response.json();
      setBook(data.data);
  } catch (error) {
      console.error(error);
  } finally {
    setLoading(false);
  }
  } 

  // deleting a book from the database
 const deleteBook = async(bookId)=>{
  const apiURI = 'https://book-store-deployment.vercel.app';
  const res = await fetch(`${apiURI}/books/${bookId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
    if(!data.success){
        return { success: false, message: 'Something went wrong'}
    }
  return { success: true, message: 'Product deleted successfully' };
  };
  
  // calling the fetch function with useEffect
  useEffect(()=>{
    fetchBook(id);
  },[]);

  // showing message after book deletion success or fail
  const navigate = useNavigate();
  toast.configure;
  const handleDeleteBook = async()=>{
    const { success, message } = await deleteBook(book._id);
    //showing success or error message to the user when submit
    if (!success) {  
      toast.error(message); 
    } else {  
      toast.success(message);
      navigate('/');//redirect to the home page
    }
  };

  // showing loader while fetching data
  if (loading) {
    return ( <Loading />); 
  }

  // showing updateCard when clicking on updating a book
  if (updateCard) {  
    // Passing an onClose prop which when called it updates the setUpdateCard function to false.
    // You must pass it as a parameter when creating the UpdateCard component
    return ( <UpdateCard book={book} onClose={() => setUpdateCard(false)} /> );
  }

  // showing the normal page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">  
      <div className="max-w-lg mx-auto bg-gray-800 m-8 rounded-lg shadow-md overflow-hidden">  
        <img src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover rounded-t-lg"
              onError={(e)=>{e.currentTarget.src='https://bookcart.azurewebsites.net/Upload/Default_image.jpg'}} />  
        <div className="flex flex-col items-start p-6 bg-gray-800 rounded-lg shadow-lg">  
          <h2 className="text-4xl font-bold text-white mb-2">{book.title}</h2>  
          <h3 className="text-xl font-medium text-gray-300 mb-1">{book.author}</h3>  
          <p className="text-sm text-gray-400 mb-4">  
            <span className="font-semibold text-gray-300">{book.genre}</span> | <span className="text-gray-500">{book.publishYear}</span>  
          </p>  
          <p className="text-3xl font-bold text-indigo-400 mb-3">${book.price}</p>  
          <p className="text-lg text-gray-200 mb-2">  
            <span className="font-semibold">Rating:</span> <span>{book.rating} ⭐</span>  
          </p>  
          <p className="text-base text-gray-100 mb-4">{book.description}</p>  
          <div className="flex items-center justify-around w-full">
            <button onClick={() => setUpdateCard(true)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300">  
            <FaEdit /> 
            </button> 
            <button onClick={handleDeleteBook}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300">  
            <RiDeleteBin6Line />  
            </button> 
          </div>
        </div>
      </div>  
    </div>
  )
}

export default ShowPage