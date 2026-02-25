import Product from '../models/Producto.js';


export const productRepositoryMongo = {
    getOne: async (id) => {
        return await Product.findById(id)
    },

    updateOne: async (id , { stockAmount }) => {
        return await Product.findByIdAndUpdate(
            id,
            { stockAmount },
            { new: true }
        )
    },

    deleteOne: async (id) => {
        return await Product.deleteOne({ _id: id })
    },

    createProduct: async (newProduct) => {

        return await Product.create(newProduct)
    },

    getAll: async () => {
        return await Product.find({})
    },

}