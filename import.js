import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Book from "./model/data.model.js";
import dotenv from "dotenv";

dotenv.config();

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your JSON data file
const dataFilePath = path.join(__dirname, "books.json");

const importData = async () => {
	try {
		const MONGODB_URL = process.env.mongoDB_URL;
		const conn = await mongoose.connect(MONGODB_URL);

		// Optional: Clear existing data
		await Book.deleteMany({});
		console.log("Existing data cleared from collection.");

		// Read JSON file
		const rawData = fs.readFileSync(dataFilePath, "utf-8");
		const data = JSON.parse(rawData);
		console.log(`${data.length} records read from file.`);

		// Insert into collection
		await Book.insertMany(data);
		console.log("Data has been successfully imported!");
	} catch (error) {
		console.error("Error during data import:", error);
	} finally {
		await mongoose.connection.close();
		console.log("MongoDB connection closed.");
	}
};

// Run the function
importData();
