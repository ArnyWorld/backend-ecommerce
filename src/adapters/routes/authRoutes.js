const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

module.exports = (signInUseCase) => {
  const router = Router();
  const controller = new AuthController(signInUseCase);

  /**
   * @swagger
   * tags:
   *   name: Authentication
   *   description: Endpoints de autenticación
   */

  /**
   * @swagger
   * /api/v1/auth/signin:
   *   post:
   *     summary: Iniciar sesión
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Login exitoso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   *       401:
   *         description: Credenciales inválidas
   */
  router.post("/signin", controller.signIn.bind(controller));
  /**
   * @swagger
   * /api/v1/auth/refresh:
   *   post:
   *     summary: Refrescar token de acceso
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Nuevo token generado
   *       403:
   *         description: Refresh token inválido o expirado
   */
  router.post("/refresh", controller.refresh.bind(controller));

  /**
   * @swagger
   * /api/v1/auth/logout:
   *   post:
   *     summary: Cerrar sesión y eliminar refresh token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Sesión cerrada correctamente
   */
  router.post("/logout", controller.logout.bind(controller));
  return router;
};
