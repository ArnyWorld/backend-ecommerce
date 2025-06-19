const mongoose = require("../mongoose");

const cuponsSchema = new mongoose.Schema(
  {
    productId: { type: ObjectId, required: true, ref: "Product", trim: true },
    discount: { type: Number, required: true, min: 0 },
    expirationDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cupons", cuponsSchema);
