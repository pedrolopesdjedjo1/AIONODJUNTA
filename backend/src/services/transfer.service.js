const prisma = require("../config/database");
const { generateReference } = require("../utils/reference");

async function transferMoney({
  senderId,
  receiverPhone,
  amount,
  note
}) {
  if (!Number.isSafeInteger(amount) || amount <= 0) {
    throw new Error("O valor deve ser um número inteiro positivo.");
  }

  if (!receiverPhone) {
    throw new Error("O telefone do destinatário é obrigatório.");
  }

  if (amount > 100000000) {
    throw new Error("O valor excede o limite permitido.");
  }

  return prisma.$transaction(async (tx) => {
    const sender = await tx.user.findUnique({
      where: { id: senderId }
    });

    if (!sender || sender.status !== "ACTIVE") {
      throw new Error("A conta de origem não está ativa.");
    }

    const receiver = await tx.user.findUnique({
      where: { phone: receiverPhone }
    });

    if (!receiver || receiver.status !== "ACTIVE") {
      throw new Error("Destinatário não encontrado ou inativo.");
    }

    if (sender.id === receiver.id) {
      throw new Error("Não podes transferir para ti mesmo.");
    }

    const senderWallet = await tx.wallet.findUnique({
      where: { userId: sender.id }
    });

    const receiverWallet = await tx.wallet.findUnique({
      where: { userId: receiver.id }
    });

    if (!senderWallet || !receiverWallet) {
      throw new Error("Carteira não encontrada.");
    }

    if (senderWallet.currency !== receiverWallet.currency) {
      throw new Error("As moedas das carteiras são diferentes.");
    }

    // Debita apenas se existir saldo suficiente.
    const debit = await tx.wallet.updateMany({
      where: {
        userId: sender.id,
        balance: { gte: amount }
      },
      data: {
        balance: { decrement: amount }
      }
    });

    if (debit.count !== 1) {
      throw new Error("Saldo insuficiente.");
    }

    await tx.wallet.update({
      where: { userId: receiver.id },
      data: {
        balance: { increment: amount }
      }
    });

    const reference = generateReference("TRF");

    const transfer = await tx.transfer.create({
      data: {
        senderId: sender.id,
        receiverId: receiver.id,
        amount,
        currency: senderWallet.currency,
        status: "COMPLETED",
        reference,
        note: note || null
      }
    });

    await tx.transaction.createMany({
      data: [
        {
          userId: sender.id,
          type: "TRANSFER",
          amount,
          currency: senderWallet.currency,
          status: "COMPLETED",
          reference: `${reference}-OUT`,
          description: `Transferência enviada para ${receiver.phone}`
        },
        {
          userId: receiver.id,
          type: "TRANSFER",
          amount,
          currency: receiverWallet.currency,
          status: "COMPLETED",
          reference: `${reference}-IN`,
          description: `Transferência recebida de ${sender.phone}`
        }
      ]
    });

    return {
      reference,
      amount,
      currency: senderWallet.currency,
      status: transfer.status,
      recipient: {
        firstName: receiver.firstName,
        phone: receiver.phone
      },
      createdAt: transfer.createdAt
    };
  }, {
    isolationLevel: "Serializable"
  });
}

module.exports = {
  transferMoney
};
