const prisma = require("../config/database");
const { generateReference } = require("../utils/reference");

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 1000000;

async function createPaymentRequest({
  userId,
  amount,
  type,
  provider
}) {
  if (!Number.isSafeInteger(amount)) {
    throw new Error("O valor deve ser um número inteiro.");
  }

  if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    throw new Error(
      `O valor deve estar entre ${MIN_AMOUNT} e ${MAX_AMOUNT} XOF.`
    );
  }

  if (!["DEPOSIT", "WITHDRAWAL"].includes(type)) {
    throw new Error("Tipo de operação inválido.");
  }

  if (!provider) {
    throw new Error("O fornecedor de pagamento é obrigatório.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user || user.status !== "ACTIVE") {
    throw new Error("A conta não está ativa.");
  }

  const reference = generateReference(type);

  return prisma.transaction.create({
    data: {
      userId,
      type,
      amount,
      currency: "XOF",
      status: "PENDING",
      reference,
      description: JSON.stringify({
        provider,
        stage: "REQUESTED"
      })
    }
  });
}

module.exports = {
  createPaymentRequest
};
