import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true, // Removes whitespace from both ends of a string
		},
		author: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0, // Price cannot be negative
		},
		image: {
			type: String,
			// You might want to add validation for URL format if needed
			// match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
			required: false, // Image can be optional
		},
		year: {
			type: Number,
			required: true,
			min: 1000, // Reasonable minimum year
			max: new Date().getFullYear() + 5, // Allow some future publication dates
		},
		genre: {
			type: String,
			required: true,
			trim: true,
		},
		stock: {
			type: Number,
			required: true,
			min: 0, // Stock cannot be negative
			default: 0, // Default value if not provided
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields automatically
	}
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
