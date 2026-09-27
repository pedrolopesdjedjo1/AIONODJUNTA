const dotenv = require("dotenv");

dotenv.config();

const required = [
  "PORT",
  "JWT_SECRET"
];

for (const variable of required) {
  if (!process.env[variable]) {
    console.warn(`⚠️ Variável ${variable} ainda não configurada.`);
  }
}

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "CHANGE_THIS_SECRET",
  databaseUrl: process.env.DATABASE_URL || "",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000"
};
