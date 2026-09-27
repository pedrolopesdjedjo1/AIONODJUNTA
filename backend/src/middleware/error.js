function notFound(req, res) {
  return res.status(404).json({
    success: false,
    message: "Rota não encontrada."
  });
}

function errorHandler(err, req, res, next) {
  console.error("SERVER_ERROR:", err);

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erro interno do servidor."
  });
}

module.exports = {
  notFound,
  errorHandler
};
