const {
  createPaymentRequest
} = require("../services/payment.service");

async function createDeposit(req, res) {
  try {
    const { amount, provider } = req.body;

    const transaction = await createPaymentRequest({
      userId: req.user.userId,
      amount,
      type: "DEPOSIT",
      provider
    });

    return res.status(201).json({
      success: true,
      message: "Pedido de depósito criado. Aguarda confirmação.",
      transaction
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

async function createWithdrawal(req, res) {
  try {
    const { amount, provider } = req.body;

    const transaction = await createPaymentRequest({
      userId: req.user.userId,
      amount,
      type: "WITHDRAWAL",
      provider
    });

    return res.status(201).json({
      success: true,
      message: "Pedido de levantamento criado. Aguarda confirmação.",
      transaction
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  createDeposit,
  createWithdrawal
};
