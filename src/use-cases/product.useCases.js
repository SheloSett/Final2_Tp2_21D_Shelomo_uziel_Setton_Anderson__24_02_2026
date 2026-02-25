import { productRepositoryMongo } from '../repository/productoRepositoryMongo.js'
import { ProductDTO } from '../models/ProductoDTO.js';
import { validateProductData } from '../utils/validateProductData.js'; 


export const productUseCases = {

    updateProductStock: async (productId, newStockAmount) => {
        const productExist = await productRepositoryMongo.getOne(productId);
        const validStockAmount = validateProductData.onUpdateStock(newStockAmount);

        if(!productExist || validStockAmount === null) {
            return null;
        }

        const updatedProduct = await productRepositoryMongo.updateOne(productExist._id, { stockAmount: validStockAmount });

        const dto = new ProductDTO(updatedProduct);
        return dto.toPlainObject();
    },

    
    deleteProduct: async(productId) => {
        const productExist = await productRepositoryMongo.getOne(productId);

        if(!productExist) {
            return null;
        }

        await productRepositoryMongo.deleteOne(productId);

        return true;
    },

    createProduct: async(newProduct) => {
        const validProduct = validateProductData.onCreation(newProduct);
        const createdProduct = await productRepositoryMongo.createProduct(validProduct);

        const dto = new ProductDTO(createdProduct)
        return dto.toPlainObject()
    },

    getAllProducts: async() => {

        const products = await productRepositoryMongo.getAll();

        if(!products){
            return null;
        }

        return ProductDTO.fromArray(products).map(dto => dto.toPlainObject())
    },

    getProductById: async(productId) => {
        const product = await productRepositoryMongo.getOne(productId);

        if (!product){
            return null
        }

        return new ProductDTO(product).toPlainObject();
    }
}