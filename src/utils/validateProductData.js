export const validateProductData =  {
    onCreation: (productData) => {
        let { producto, stockAmount, fechaIngreso } = productData;
        
        if(producto == null || producto.trim() === '') {
            throw new Error('El nombre del producto es obligatorio.');
        }

        if(stockAmount == null || Number.isNaN(stockAmount) || stockAmount < 0) {
            throw new Error('La cantidad de stock debe ser un número válido y no puede ser negativa.');
        }

        if(fechaIngreso == null || fechaIngreso.trim() === '') {
            fechaIngreso = new Date().toISOString().split('T')[0];
        }

        return {
            producto,
            stockAmount,
            fechaIngreso 
        };
    },

    onUpdateStock: (newStockAmount) => {

        if(newStockAmount == null || Number.isNaN(newStockAmount) || newStockAmount < 0) {
            throw new Error('La cantidad de stock debe ser un número válido y mayor a 0.');
        }
        
        return newStockAmount;
    }
};