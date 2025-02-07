import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePage = () => {  
  //used to put data into the book object to submit it latter
  //react use useState instead of the old forms techniques
  //we are constantly updating the object on change
  const [book, setBook] = useState({  
    title: '',  
    author: '',  
    publishYear: '',  
    genre: '',  
    price: '',  
    rating: '',  
    description: '',  
    cover: '' 
  });  

  // posting the new book data to the backend
 const createBook = async (newBook) => {
  // check if any field is missing
  if (!book.title || !book.author || !book.publishYear || !book.price || 
    !book.genre || !book.rating || !book.description || !book.cover) {
    return { success: false, message: "Please fill in all fields" };
  }
  const apiURI = 'https://book-store-igazi7cik-mohamedfffffs-projects.vercel.app';
  const res = await fetch(`${apiURI}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });
  const data = await res.json();
  if (!data.success) return { success: false, message: 'Server Error' };
  return { success: true, message: 'Product created successfully' };
  } 

  const navigate = useNavigate();//to use the navigate function
  toast.configure;//to use the toast notification 
  const handleAddBook = async()=>{
    const { success, message } = await createBook(book);
    //showing success or error message to the user when submit
    if (!success) {  
      toast.error(message); 
    } else {  
      toast.success(message); 
      // redirect to home page
      navigate('/');   
    }
    
  };

  return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">  
      <div  
        className="bg-gray-900 p-8 space-y-4 w-full max-w-md"  
      >  
        <h2 className="text-2xl font-bold text-center">Create a New Book</h2>  
        
        <div>  
          <input  
            type="text"  
            name="title"  
            value={book.title}  
            //using setBook hook that we created to update the book targeted value
            //{...book} this part spread the object and we target what we want
            onChange={(e) => setBook({ ...book, title: e.target.value })}  
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Book Title"  
          />  
        </div>  

        <div>  
          <input  
            type="text"  
            name="author"  
            value={book.author}  
            onChange={(e) => setBook({ ...book, author: e.target.value })}    
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Author's Name"  
          />  
        </div>  

        <div>  
          <input  
            type="number"  
            name="publishYear"  
            value={book.publishYear}  
            onChange={(e) => setBook({ ...book, publishYear: e.target.value })}   
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            style={{appearance: 'none'}}
            placeholder="Publish Year"  
          />  
        </div>  

        <div>  
          <input  
            type="text"  
            name="genre"  
            value={book.genre}  
            onChange={(e) => setBook({ ...book, genre: e.target.value })}  
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Book Genre"  
          />  
        </div>  

        <div>  
          <input  
            type="number"  
            name="price"  
            value={book.price}  
            onChange={(e) => setBook({ ...book, price: e.target.value })}  
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Price"  
          />  
        </div>  

        <div>  
          <input  
            type="number"  
            name="rating"  
            value={book.rating}  
            onChange={(e) => setBook({ ...book, rating: e.target.value })}  
            min="1" max="5"  
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Rating (1-10)"  
          />  
        </div>  

        <div>  
          <input  
            type="text"  
            name="cover"  
            value={book.cover}  
            onChange={(e) => setBook({ ...book, cover: e.target.value })}  
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Cover Image URI"  
          />  
        </div>  

        <div>  
          <textarea  
            name="description"  
            value={book.description}  
            onChange={(e) => setBook({ ...book, description: e.target.value })}   
            required  
            rows="4"  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Description"  
          />  
        </div>  

        <button  
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"  
          onClick={handleAddBook}  
        >  
          Create Book  
        </button>  
      </div>  
    </div>  
  );  
};  

export default CreatePage;