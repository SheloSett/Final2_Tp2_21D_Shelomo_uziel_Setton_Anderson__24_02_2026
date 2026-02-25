import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  producto: {
    type: String,
    required: true,
    trim: true
  },
  stockAmount: {
    type: Number,
    required: true,
    min: 0
  },
  fechaIngreso: {
    type: Date,
    default: Date.now
  }
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;