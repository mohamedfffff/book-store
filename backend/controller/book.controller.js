import { mongo } from "mongoose";
import Book from "../model/book.model.js";

// get a book by id
export const getBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        // if id not found
        if(!mongo.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "book not found" });
        }
        res.status(200).json({ success: true, data: book });    
    } catch (error) {
        console.log('error in fetching book'+error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        // if no books found
        if(books.length === 0) {
            return res.status(404).json({ success: false, message: "no books found" });
        }
        res.status(200).json({ success: true, data: books });    
    } catch (error) {
        console.log('error in fetching books'+error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// create a book
export const createBook = async (req, res) => {
    const book = req.body;
        // check if any field is missing
        if (!book.title || !book.author || !book.publishYear || !book.price || 
            !book.genre || !book.rating || !book.description || !book.cover) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }
    const newBook = new Book(book);
    try {
        await newBook.save();// save the book to the database
        res.status(201).json({ success: true, message: "Book created successfully", data: newBook });
    } catch (error) {
        console.log("error in creating book"+error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// delete a book by id
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
        console.log("book not found"+error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// update a book by id
export const updateBook = async (req, res) => {
    const updatedBook = req.body;
    const { id } = req.params;
    if (!updatedBook.title || !updatedBook.author || !updatedBook.publishYear || !updatedBook.price || 
        !updatedBook.genre || !updatedBook.rating || !updatedBook.description || !updatedBook.cover) {
        return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }
    try {
        await Book.findByIdAndUpdate(id, updatedBook, { new: true });
        res.status(200).json({ success: true, message: "Book updated successfully", data: updatedBook });
    } catch (error) {
        console.log("error in updating book"+error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

