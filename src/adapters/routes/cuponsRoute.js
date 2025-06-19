const express = require("express");
const router = express.Router();

module.exports = (CuponsController) => {
  /**
   * @swagger
   * /api/v1/cupons:
   *   get:
   *     summary: Obtiene todos los cupones
   *     tags: [Cupons]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de cupones
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Cupons'
   *       401:
   *         description: No autorizado
   *       500:
   *         description: Error del servidor
   */

  router.get("/", (req, res) => CuponsController.getAll(req, res));
  router.post("/", (req, res) => CuponsController.create(req, res));

  return router;
};
