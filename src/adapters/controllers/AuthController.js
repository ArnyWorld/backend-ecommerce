const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../middlewares/authJwt");

// Simulación en memoria. Para producción, usa DB o Redis.
const refreshTokens = new Map();

class AuthController {
  constructor(signInUseCase) {
    this.signInUseCase = signInUseCase;
  }

  async signIn(req, res) {
    try {
      const { username, password } = req.body;
      const { user } = await this.signInUseCase.execute({ username, password });

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      refreshTokens.set(refreshToken, user.id);

      delete user.password;
      res.json({ user, accessToken, refreshToken });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  async refresh(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.has(refreshToken)) {
      return res
        .status(403)
        .json({ message: "Refresh token inválido o expirado" });
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = { id: decoded.id, roles: ["user"] }; // Ideal: cargar desde DB
      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(403).json({ message: "Refresh token inválido" });
    }
  }

  async logout(req, res) {
    const { refreshToken } = req.body;
    refreshTokens.delete(refreshToken);
    res.json({ message: "Sesión cerrada exitosamente" });
  }
}

module.exports = AuthController;
