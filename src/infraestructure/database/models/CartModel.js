const Product = require('../../../domain/entities/Product');
const mongoose = require('../mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true, trim: true },
  products: { type: Product, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);