const Order = require('../../domain/entities/Order');

class CreateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderData) {
    const order = new Order(orderData);
    return await this.orderRepository.create(order);
  }
}

module.exports = CreateOrder;