class OrderDTO {
  constructor(order) {
    this.id = order._id;
    this.user = order.user;
    this.address = order.address;
    this.products = order.products;
    this.count = order.count;
    this.total = order.total;
    this.state = order.state;
    this.date = order.date;
  }
}
 
module.exports = OrderDTO;