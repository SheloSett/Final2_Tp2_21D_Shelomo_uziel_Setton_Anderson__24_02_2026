import { Router } from 'express';
import { ProductController } from '../controller/productController.js';
import { apiKeyMiddleware } from '../middlewares/auth.Middleware.js';


export const ProductAdminRouter = new Router();

ProductAdminRouter.put("/productos/:id", apiKeyMiddleware, ProductController.updateById)
ProductAdminRouter.delete("/productos/:id", apiKeyMiddleware, ProductController.deleteById)