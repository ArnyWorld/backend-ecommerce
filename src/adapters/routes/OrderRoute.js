const express = require("express");
const router = express.Router();

module.exports = (OrderController) => {
  /**
   * @swagger
   * tags:
   *   name: Orders
   *   description: Gestión de pedidos
   */

  /**
   * @swagger
   * /api/orders:
   *   get:
   *     summary: Obtiene todos los pedidos
   *     tags: [Pedidos]
   *     responses:
   *       200:
   *         description: Lista de pedidos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/order'
   */
  router.get("/", (req, res) => OrderController.getAll(req, res));
  router.post("/", (req, res) => OrderController.create(req, res));

  return router;
};
