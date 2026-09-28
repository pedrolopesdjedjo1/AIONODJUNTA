const prisma = require("../config/database");
const { generateReference } = require("../utils/reference");

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 100000;

const SUPPORTED_PROVIDERS = [
  "ORANGE",
  "FREE",
  "EXPRESSO"
];

async function createAirtimeRequest({
  userId,
  phone,
  amount,
  provider
}) {
  if (
    !Number.isSafeInteger(amount) ||
    amount < MIN_AMOUNT ||
    amount > MAX_AMOUNT
  ) {
    throw new Error("Valor de recarga inválido.");
  }

  if (
    typeof phone !== "string" ||
    !/^\+?[1-9]\d{7,14}$/.test(phone)
  ) {
    throw new Error("Número de telefone inválido.");
  }

  if (!SUPPORTED_PROVIDERS.includes(provider)) {
    throw new Error("Operador não suportado.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user || user.status !== "ACTIVE") {
    throw new Error("A conta não está ativa.");
  }

  const reference = generateReference("AIR");

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      type: "AIRTIME",
      amount,
      currency: "XOF",
      status: "PENDING",
      reference,
      description: JSON.stringify({
        provider,
        phone,
        stage: "REQUESTED"
      })
    }
  });

  return {
    reference: transaction.reference,
    amount: transaction.amount,
    currency: transaction.currency,
    status: transaction.status,
    provider,
    phone
  };
}

module.exports = {
  createAirtimeRequest
};
