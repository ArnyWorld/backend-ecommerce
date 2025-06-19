const express = require("express");
const config = require("./config");
console.log(">>> Config leída:", config);
const MongoProductRepository = require("./infraestructure/repositories/MongoProductRepository");
const MongoCuponsRepository = require("./infraestructure/repositories/");

const MySQLProductRepository = require("./infraestructure/repositories/MySQLProductRepository");

const ProductController = require("./adapters/controllers/ProductController");
const productRoutes = require("./adapters/routes/productRoutes");

const OrderController = require("./adapters/controllers/OrderController");
const orderRoutes = require("./adapters/routes/OrderRoute");

const CartController = require("./adapters/controllers/CartController");
const cartRoutes = require("./adapters/routes/CartRoute");

const CuponsController = require("./adapters/controllers/CuponsController");
const cuponsRoutes = require("./adapters/routes/cuponsRoute");

const { verifyToken } = require("./adapters/middlewares/authJwt");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./infraestructure/docs/swaggerConfig");
const MongoUserRepository = require("./infraestructure/repositories/MongoUserRepository");
const PasswordHasher = require("./infraestructure/services/PasswordHasher");
const TokenGenerator = require("./infraestructure/services/TokenGenerator");
const SignIn = require("./application/useCases/SignIn");

const authRoutes = require("./adapters/routes/authRoutes");
const userRoutes = require("./adapters/routes/userRoutes");

const SignUp = require("./application/useCases/SignUp");
const CuponsRepository = require("./domain/repositories/CuponsRepository");
const MongoOrderRepository = require("./infraestructure/repositories/MongoOrderRepository");
const MongoCartRepository = require("./infraestructure/repositories/MongoCartRepository");

const app = express();
const port = config.port;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dependencies
const dbType = config.DB_TYPE || "mongodb";
let productRepository;
let cuponRepository;
let cartRepository;
let orderRepository;

console.log("DB_TYPE: ", dbType);
if (dbType === "mysql") {
  productRepository = new MySQLProductRepository();
} else {
  productRepository = new MongoProductRepository();
  cuponRepository = new MongoCuponsRepository();
  cartRepository = new MongoCartRepository();
  orderRepository = new MongoOrderRepository();
}
// —– SETUP AUTH —–
const userRepo = new MongoUserRepository();
const passwordHasher = new PasswordHasher();
const tokenGen = new TokenGenerator();
const signInUseCase = new SignIn(userRepo, passwordHasher, tokenGen);
app.use("/api/v1/auth", authRoutes(signInUseCase));

// ——— SETUP SIGNUP ———
const signUpUseCase = new SignUp(userRepo, passwordHasher);
app.use("/api/v1/users", express.json(), userRoutes(signUpUseCase));

const productController = new ProductController(productRepository);
const cuponsController = new CuponsController(cuponRepository);
const cartController = new CartController(cartRepository);
const orderController = new OrderController(orderRepository);
// Configuración de Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes
app.use("/api/v1/products", verifyToken, productRoutes(productController));
app.use("/api/v1/orders", verifyToken, orderRoutes(orderController));
app.use("/api/v1/cupons", verifyToken, cuponsRoutes(cuponsController));
app.use("/api/v1/carts", verifyToken, cartRoutes(cartController));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server!" });
});

// Start Server
app.listen(port, () => {
  console.log(`E-commerce server running on port ${port}`);
});
