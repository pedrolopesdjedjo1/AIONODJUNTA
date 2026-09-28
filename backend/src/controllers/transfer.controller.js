const { transferMoney } = require("../services/transfer.service");

async function createTransfer(req, res) {
  try {
    const { receiverPhone, amount, note } = req.body;

    if (!receiverPhone || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Telefone do destinatário e valor são obrigatórios."
      });
    }

    const result = await transferMoney({
      senderId: req.user.userId,
      receiverPhone: String(receiverPhone).trim(),
      amount,
      note
    });

    return res.status(201).json({
      success: true,
      message: "Transferência efetuada com sucesso.",
      transfer: result
    });
  } catch (error) {
    console.error("TRANSFER_ERROR:", error);

    const knownErrors = [
      "O valor deve ser um número inteiro positivo.",
      "O telefone do destinatário é obrigatório.",
      "O valor excede o limite permitido.",
      "A conta de origem não está ativa.",
      "Destinatário não encontrado ou inativo.",
      "Não podes transferir para ti mesmo.",
      "Carteira não encontrada.",
      "As moedas das carteiras são diferentes.",
      "Saldo insuficiente."
    ];

    if (knownErrors.includes(error.message)) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (error.code === "P2034") {
      return res.status(409).json({
        success: false,
        message: "Conflito na operação. Tenta novamente."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Não foi possível efetuar a transferência."
    });
  }
}

module.exports = {
  createTransfer
};
