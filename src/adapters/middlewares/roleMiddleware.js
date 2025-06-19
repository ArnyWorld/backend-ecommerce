const requireRole = (requiredRole) => {
  return (req, res, next) => {
    const roles = req.userRoles || [];

    if (!roles.includes(requiredRole)) {
      return res
        .status(403)
        .json({ message: `Access denied. ${requiredRole} role required.` });
    }

    next();
  };
};

module.exports = { requireRole };
