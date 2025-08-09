import express from "express";
import { getGenres, getProducts } from "../controllers/productsController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/genres", getGenres);

export default productRouter;
