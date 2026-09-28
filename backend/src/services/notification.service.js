const prisma = require("../config/database");

async function createNotification({
  userId,
  title,
  message
}) {
  if (!userId || !title || !message) {
    throw new Error(
      "Utilizador, título e mensagem são obrigatórios."
    );
  }

  return prisma.notification.create({
    data: {
      userId,
      title,
      message
    }
  });
}

module.exports = {
  createNotification
};
