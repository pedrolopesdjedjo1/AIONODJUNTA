require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const PORT = process.env.API_PORT || 4000;

const allowedOrigins = (
  process.env.CORS_ORIGINS || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origem não autorizada pelo CORS"));
    },
  })
);

app.use(express.json({ limit: "1mb" }));

// Rota inicial para verificar se a API está ativa.
app.get("/", (req, res) => {
  res.json({
    app: "AIONÔDJUNTA",
    message: "API em funcionamento",
    status: "online",
  });
});

// Rota de saúde do servidor.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "aionodjunta-api",
    timestamp: new Date().toISOString(),
  });
});

// Tratamento de erros.
app.use((err, req, res, next) => {
  console.error("Erro na API:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: "Ocorreu um erro interno no servidor.",
  });
});

// Iniciar o servidor.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`AIONÔDJUNTA API ativa na porta ${PORT}`);
});
