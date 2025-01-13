import mongoose from 'mongoose';


// Create a schema for the book in the database
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
},{
    timestamps: true // this will add createdAt and updatedAt timestamps
});

// Create a model for the book schema
const Book = mongoose.model('Book', bookSchema);

export default Book;