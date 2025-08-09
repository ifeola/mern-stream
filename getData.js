import Book from "./model/data.model.js";
import connectDb from "./database/connectDb.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const getAllBooks = async () => {
	try {
		await mongoose.connect(process.env.mongoDB_URL);
		const books = await Book.find(); // Get all documents in the collection
		console.log("Books:", books);
	} catch (error) {
		console.error("Error fetching books:", error);
	}
};

getAllBooks();
