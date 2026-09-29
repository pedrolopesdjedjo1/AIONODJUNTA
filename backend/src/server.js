require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");

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

      return callback(
        new Error("Origem não autorizada pelo CORS")
      );
    },
  })
);

app.use(express.json({ limit: "1mb" }));

// Página inicial da API.
app.get("/", (req, res) => {
  res.json({
    app: "AIONÔDJUNTA",
    message: "API em funcionamento",
    status: "online",
  });
});

// Rotas de saúde.
app.use("/health", healthRoutes);

// Rotas de autenticação.
app.use("/api/auth", authRoutes);

// Rota para endereços inexistentes.
app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada",
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
  console.log(
    `AIONÔDJUNTA API ativa na porta ${PORT}`
  );
});
