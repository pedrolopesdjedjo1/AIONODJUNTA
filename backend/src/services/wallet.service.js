const prisma = require("../config/database");

async function getOrCreateWallet(userId) {
  let wallet = await prisma.wallet.findUnique({
    where: {
      userId
    }
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: {
        userId,
        balance: 0,
        currency: "XOF"
      }
    });
  }

  return wallet;
}

async function creditWallet(tx, userId, amount) {
  if (amount <= 0) {
    throw new Error("O valor deve ser maior que zero.");
  }

  const wallet = await tx.wallet.update({
    where: {
      userId
    },
    data: {
      balance: {
        increment: amount
      }
    }
  });

  return wallet;
}

async function debitWallet(tx, userId, amount) {
  if (amount <= 0) {
    throw new Error("O valor deve ser maior que zero.");
  }

  const wallet = await tx.wallet.findUnique({
    where: {
      userId
    }
  });

  if (!wallet) {
    throw new Error("Carteira não encontrada.");
  }

  if (Number(wallet.balance) < Number(amount)) {
    throw new Error("Saldo insuficiente.");
  }

  return tx.wallet.update({
    where: {
      userId
    },
    data: {
      balance: {
        decrement: amount
      }
    }
  });
}

module.exports = {
  getOrCreateWallet,
  creditWallet,
  debitWallet
};
