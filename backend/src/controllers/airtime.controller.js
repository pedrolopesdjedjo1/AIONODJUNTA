const {
  createAirtimeRequest
} = require("../services/airtime.service");

async function createAirtime(req, res) {
  try {
    const { phone, amount, provider } = req.body;

    const result = await createAirtimeRequest({
      userId: req.user.userId,
      phone,
      amount,
      provider
    });

    return res.status(201).json({
      success: true,
      message: "Pedido de recarga criado. Aguarda confirmação.",
      airtime: result
    });
  } catch (error) {
    console.error("AIRTIME_ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  createAirtime
};
