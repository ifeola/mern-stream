import Book from "../model/data.model.js";

const getGenres = async (request, response) => {
	try {
		// Use the .distinct() method on the Book model to get unique genres
		const genres = await Book.distinct("genre");

		// Sort the genres alphabetically for a consistent order
		genres.sort();
		response.status(200).json(genres);
	} catch (error) {
		console.error("Error fetching distinct genres:", error);
		response
			.status(500)
			.json({ message: "Failed to fetch genres.", error: error.message });
	}
};

const getBooks = async (request, response) => {
	const books = await Book.find();
	if (books.length === 0)
		return response.status(500).json({ message: "Not books found" });
	return response.json(books);
};

export { getGenres, getBooks };
