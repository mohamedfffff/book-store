import React, { useState } from 'react';  
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateCard = ({ onClose , book }) => {  
  const [updatedBook, setUpdatedBook] = useState(book); 
  const navigate = useNavigate();//to use the navigate function
  toast.configure;//to use the toast notification 
  // getting the id from the page params
  const { id } = useParams();

  // posting the new book data to the backend
 const updateBook = async (updatedBook) => {
  // check if any field is missing
  if (!updatedBook.title || !updatedBook.author || !updatedBook.publishYear || !updatedBook.price || 
    !updatedBook.genre || !updatedBook.rating || !updatedBook.description || !updatedBook.cover) {
    return { success: false, message: "Please fill in all fields" };
  }
  const res = await fetch(`http://localhost:3000/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBook),
  });
  const data = await res.json();
  if (!data.success) return { success: false, message: 'Server Error' };
  return { success: true, message: 'Product updated successfully' };
  }

  //showing success or error message to the user when submit
  const handleUpdateBook = async()=>{
    const { success, message } = await updateBook(updatedBook);
    //showing success or error message to the user when submit
    if (!success) {  
      toast.error(message); 
    } else {  
      toast.success(message);
      //refresh the page after updating because i'm lazy
      //edit 1: you know what ?, i'm just gonna do it
      //edit 2: actually you know what ?, i don't care, i'll just refresh the page
      navigate('/');
      //stop rendering update screen 
      onClose()

    }
  };

  return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">  
      <div  
        className="bg-gray-900 p-8 space-y-4 w-full max-w-md"  
      >  
        <h2 className="text-2xl font-bold text-center">Update a Book</h2>  
        
        <div>  
          <input  
            type="text"  
            name="title"  
            value={updatedBook.title}  
            //using setBook hook that we created to update the book targeted value
            //{...book} this part spread the object and we target what we want
            onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })}  
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Book Title"  
          />  
        </div>  

        <div>  
          <input  
            type="text"  
            name="author"  
            value={updatedBook.author}  
            onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}    
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Author's Name"  
          />  
        </div>  

        <div>  
          <input  
            type="number"  
            name="publishYear"  
            value={updatedBook.publishYear}  
            onChange={(e) => setUpdatedBook({ ...updatedBook, publishYear: e.target.value })}   
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
            value={updatedBook.genre}  
            onChange={(e) => setUpdatedBook({ ...updatedBook, genre: e.target.value })}  
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Book Genre"  
          />  
        </div>  

        <div>  
          <input  
            type="number"  
            name="price"  
            value={updatedBook.price}  
            onChange={(e) => setUpdatedBook({ ...updatedBook, price: e.target.value })}  
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Price"  
          />  
        </div>  

        <div>  
          <input  
            type="number"  
            name="rating"  
            value={updatedBook.rating}  
            onChange={(e) => setUpdatedBook({ ...updatedBook, rating: e.target.value })}  
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
            value={updatedBook.cover}  
            onChange={(e) => setUpdatedBook({ ...updatedBook, cover: e.target.value })}  
            required  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Cover Image URI"  
          />  
        </div>  

        <div>  
          <textarea  
            name="description"  
            value={updatedBook.description}  
            onChange={(e) => setUpdatedBook({ ...updatedBook, description: e.target.value })}   
            required  
            rows="4"  
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
            placeholder="Description"  
          />  
        </div>  

        <button  
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"  
          onClick={handleUpdateBook}  
        >  
          Update Book  
        </button>
        <button  
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"  
          onClick={onClose} 
        >  
          Close  
        </button>
      </div>  
    </div>  
  );  
};  

export default UpdateCard;