const crypto = require("crypto");

function generateReference(prefix = "AION") {
  const timestamp = Date.now().toString(36).toUpperCase();

  const random = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `${prefix}-${timestamp}-${random}`;
}

module.exports = {
  generateReference
};
