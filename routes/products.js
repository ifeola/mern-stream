import express from "express";
import { getGenres, getBooks } from "../controllers/productsController.js";

const productRouter = express.Router();

productRouter.get("/", getBooks);
productRouter.get("/genres", getGenres);

export default productRouter;
