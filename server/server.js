import express from "express";
import dotenv from "dotenv";
import productRouter from "../routes/products.js";
import connectDb from "../database/connectDb.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));
app.use("/api/books", productRouter);

app.listen(PORT, () => {
	connectDb();
	console.log(`Server running on http://localhost:${PORT}`);
});
