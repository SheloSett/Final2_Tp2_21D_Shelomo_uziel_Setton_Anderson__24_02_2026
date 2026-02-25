export class ProductDTO {
    constructor(productDocument) {
        this.id = productDocument._id.toString();
        this.producto = productDocument.producto;
        this.stockAmount = productDocument.stockAmount;
        this.fechaIngreso = productDocument.fechaIngreso 
            ? productDocument.fechaIngreso.toISOString().split('T')[0] 
            : null;
    }

    static fromArray(products) {
        return products.map(product => new ProductDTO(product));
    }

    toPlainObject() {
        return {
            id: this.id,
            producto: this.producto,
            stockAmount: this.stockAmount,
            fechaIngreso: this.fechaIngreso
        };
    }
}