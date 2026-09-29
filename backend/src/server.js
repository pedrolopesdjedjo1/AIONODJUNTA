require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || process.env.API_PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AIONÔDJUNTA API funcionando"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "AIONÔDJUNTA API online"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AIONÔDJUNTA API rodando na porta ${PORT}`);
});
