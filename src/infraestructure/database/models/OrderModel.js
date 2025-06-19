const mongoose = require("../mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    userId: { type: ObjectID, required: true, trim: true, ref: "User" },
    address: { type: String, required: true },
    products: { type: ObjectID, required: true, ref: "Product" },
    count: { type: Number, required: true, min: 0 },
    total: { type: String, required: true },
    state: { type: String },
    date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
