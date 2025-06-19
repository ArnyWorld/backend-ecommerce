class OrderDTO {
  constructor(order) {
    this.id = order._id;
    this.userId = order.userId;
    this.address = order.address;
    this.productId = order.productId;
    this.count = order.count;
    this.total = order.total;
    this.state = order.state;
    this.date = order.date;
  }
}

module.exports = OrderDTO;
