const CreateCart = require('../../application/useCases/CreateCart');
const CartDTO = require('../../application/dtos/CartDTO');
 
class CartController {
  constructor(cartRepository) {
    this.createCart = new CreateCart(cartRepository);
  }
 
  async create(req, res) {
    try {
      const cart = await this.createCart.execute(req.body);
      res.status(201).json(new CartDTO(cart));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const carts = await this.cartRepository.getAll();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving carts' });
    }
  }
 
}
 
module.exports = CartController;