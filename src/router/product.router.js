import { Router } from 'express';
import { ProductController } from '../controller/productController.js';

export const ProductRouter = new Router();

ProductRouter.post("/productos", ProductController.createProduct)
ProductRouter.get("/productos", ProductController.getAllProducts)
ProductRouter.get("/productos/:id", ProductController.getProductById)