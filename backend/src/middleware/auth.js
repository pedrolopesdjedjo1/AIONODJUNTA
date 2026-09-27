const { verifyToken } = require("../utils/jwt");

function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token de autenticação não fornecido."
    });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido ou expirado."
    });
  }
}

module.exports = authenticate;
