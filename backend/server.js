import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import router from "./routes/book.route.js";
import connectDB from "./config/db.js";
dotenv.config();//allows to use the .env variables

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());//allows to make requests from the frontend
app.use("/books", router);

//production configuration to run the frontend with the backend
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
} 

// connect to the database and start the server
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});