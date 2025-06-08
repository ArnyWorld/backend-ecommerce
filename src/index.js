const express = require('express');
const config = require('./config');
const MongoProductRepository = require('./infraestructure/repositories/MongoProductRepository');
const ProductController = require('./adapters/controllers/ProductController');
const productRoutes = require('./adapters/routes/productRoutes');
const orderRoutes = require('./adapters/routes/OrderRoute');
const cartRoutes = require('./adapters/routes/CartRoute');
const { verifyToken } = require('./adapters/middlewares/authJwt');

const app = express();
const port = config.port;

// Dependencies
const dbType = config.DB_TYPE || 'mongodb';
let productRepository;
console.log("DB_TYPE: ", dbType);
if(dbType === 'mysql'){
  productRepository = new MySQLProductRepository();
}else{
  productRepository = new MongoProductRepository();
}

const productController = new ProductController(productRepository);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/products', verifyToken, productRoutes(productController));
app.use('/api/v1/orders', verifyToken, orderRoutes(orderRoutes));
app.use('/api/v1/carts', verifyToken, cartRoutes(cartRoutes));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// Start Server
app.listen(port, () => {
  console.log(`E-commerce server running on port ${port}`);
});