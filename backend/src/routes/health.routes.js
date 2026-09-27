const express = require("express");

const router = express.Router();

// Verificar se a API está ativa.
router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "AIONÔDJUNTA",
    service: "api",
    message: "API em funcionamento",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
