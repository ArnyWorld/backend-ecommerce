const OrderRepository = require("../../domain/repositories/OrderRepository");
const OrderModel = require("../database/models/OrderModel");
const Order = require("../../domain/entities/Order");

class MongoOrderRepository extends OrderRepository {
  async getAll() {
    const orders = await CartModel.find();
    return orders.map((c) => new Cart(c.toObject()));
  }

  async create(cart) {
    const newCart = await CartModel.create(cart);
    return new Cart(newCart.toObject());
  }

  async getById(id) {
    const cart = await CartModel.findById(id);
    if (!cart) {
      return null;
    }
    return new Cart(cart.toObject());
  }
}
module.exports = MongoOrderRepository;
