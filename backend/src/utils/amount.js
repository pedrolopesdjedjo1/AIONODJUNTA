function validateAmount(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    throw new Error("Valor inválido.");
  }

  if (amount <= 0) {
    throw new Error("O valor deve ser maior que zero.");
  }

  return amount;
}

module.exports = {
  validateAmount
};
