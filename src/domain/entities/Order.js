class Order {
  constructor({ user, address, products, count, total, state, date }) {
    this.user = user;
    this.address = address;
    this.products = products;
    this.count = count;
    this.total = total;
    this.state = state;
    this.date = date;
  }
}

module.exports = Order;