import { Router } from "express";
import { createBook, getBooks, getBook, updateBook, deleteBook } from "../controller/book.controller.js";

const router = Router();

router.get("/:id", getBook);//get a book by id
router.get("/", getBooks);//get all books
router.post("/", createBook);//create a book
router.put("/:id", updateBook);//update a book
router.delete("/:id", deleteBook);//delete a book

export default router;