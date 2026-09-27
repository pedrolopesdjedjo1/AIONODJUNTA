const prisma = require("../config/database");

async function getWallet(req, res) {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: req.user.userId
      },
      select: {
        id: true,
        balance: true,
        currency: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Carteira não encontrada."
      });
    }

    return res.json({
      success: true,
      wallet
    });
  } catch (error) {
    console.error("GET_WALLET_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao obter carteira."
    });
  }
}

async function getTransactions(req, res) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 100
    });

    return res.json({
      success: true,
      count: transactions.length,
      transactions
    });
  } catch (error) {
    console.error("GET_TRANSACTIONS_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao obter histórico."
    });
  }
}

module.exports = {
  getWallet,
  getTransactions
};
