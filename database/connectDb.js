import mongoose from "mongoose";

const connectDb = async () => {
	try {
		const MONGODB_URL = process.env.mongoDB_URL;
		const conn = await mongoose.connect(MONGODB_URL);
		console.log("Database connected successfully:", conn.connection.host);
	} catch (error) {
		console.log("Database connection failed:", error.message);
		process.exit(1);
	}
};

export default connectDb;
