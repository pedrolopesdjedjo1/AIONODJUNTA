const { setPin, verifyPin } = require("../services/pin.service");

async function configurePin(req, res) {
  try {
    const { pin } = req.body;

    await setPin(req.user.userId, pin);

    return res.json({
      success: true,
      message: "PIN configurado com sucesso."
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

async function checkPin(req, res) {
  try {
    const { pin } = req.body;

    await verifyPin(req.user.userId, pin);

    return res.json({
      success: true,
      message: "PIN validado."
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  configurePin,
  checkPin
};
