import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
