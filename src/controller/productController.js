import { productUseCases } from "../use-cases/product.useCases.js";

export const ProductController = {
    updateById: async (req, res) => {
        try {
            const productId = req.params.id;
            const { newStockAmount } = req.body;

            const updatedProduct = await productUseCases.updateProductStock(productId, newStockAmount);

            if(!updatedProduct){
                return res.status(404).json(
                    {
                        statusCode: 404,
                        error: "Producto no encontrado",
                    }
                );
            }

            return res.status(200).json(
                {
                    statusCode: 200,
                    payload: updatedProduct,
                }
            );

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    deleteById: async (req, res) => {
        try {
            const productId = req.params.id;
            const deletedProduct = await productUseCases.deleteProduct(productId);
    
            if (!deletedProduct){
                return res.status(404).json(
                    {
                        statusCode: 404,
                        error: "Producto no encontrado",
                    }
                );
            };
    
            return res.status(200).json(
                {
                    statusCode: 200,
                    payload: deletedProduct,
                }
            );
        } catch (error){
            return res.status(500).json({ message: error.message });
        }

    },

    createProduct: async (req, res) => {
        try {
            const newProduct = req.body;
            const createdProduct = await productUseCases.createProduct(newProduct);
            
            if(!createdProduct){
                return res.status(404).json(
                    {
                        statusCode: 404,
                        error: "El Producto no se pudo crear",
                    }
                );
            }

            return res.status(201).json(
                {
                    statusCode: 201,
                    payload: createdProduct,
                }
            );
        }catch (error){
            return res.status(500).json( { message: error.message } )
        }
    },

    getAllProducts: async(req, res) => {
        try {
            const products = await productUseCases.getAllProducts();
            
            if (!products){
                return res.status(404).json(
                    {
                        statusCode: 404,
                        error: "No se encontraron productos con stock disponible",
                    }
                );
            }
            
            return res.status(200).json(
                {
                    statusCode: 200,
                    payload: products,
                }
            );

        }catch(error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getProductById: async(req, res) => {
        try {
            const productId = req.params.id;
            const product = await productUseCases.getProductById(productId);

            if(!product){
                return res.status(404).json(
                    {
                        statusCode: 404,
                        error: "Producto no encontrado"
                    }
                )
            }

            return res.status(200).json(
                {
                    statusCode: 200,
                    payload: product
                }
            )

        } catch(error){
            return res.status(500).json( { message: error.message } )
        }
    }

}