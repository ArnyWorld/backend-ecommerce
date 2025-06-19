class Order {
  constructor({ userId, address, productId, count, total, state, date }) {
    this.userId = userId;
    this.address = address;
    this.productId = productId;
    this.count = count;
    this.total = total;
    this.state = state;
    this.date = date;
  }
}

module.exports = Order;
