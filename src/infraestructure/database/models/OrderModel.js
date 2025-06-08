const Product = require('../../../domain/entities/Product');
const mongoose = require('../mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  products: { type: Product, required: true, min: 0 },
  count: { type: Number, required: true, min: 0 },
  total: { type: String, required: true },
  state: { type: String },
  date: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);