import React from 'react'
import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import Loading from '../components/Loading';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  // fetching books from the backend
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/books');
      const data = await response.json();
      setBooks(data.data);
      if (!data.success) return { success: false, message: 'Server Error' };
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  } 
  // calling the fetch function
  useEffect(()=>{
    fetchBooks();
  },[]);

  // showing loader while fetching data
  if (loading) {
    return (  
      <Loading />
    ); 
  }

  return (
    <div className="flex flex-wrap justify-center p-8 bg-gray-900 min-h-screen">  
      {books.map((book) => (<ProductCard key={book._id} book={book}/>))} 
      {(books.length === 0 && <div className='text-white text-3xl text-bold'>No Products Found 😢</div>)}
    </div>  
  )
}

export default HomePage