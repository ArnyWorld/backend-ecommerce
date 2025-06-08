const CreateOrder = require('../../application/useCases/CreateOrder');
const OrderDTO = require('../../application/dtos/OrderDTO');
 
class OrderController {
  constructor(orderRepository) {
    this.createOrder = new CreateOrder(orderRepository);
  }
 
  async create(req, res) {
    try {
      const order = await this.createOrder.execute(req.body);
      res.status(201).json(new OrderDTO(order));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const orders = await this.orderRepository.getAll();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving orders' });
    }
  }
 
}
 
module.exports = OrderController;