function isValidPhone(phone) {
  return (
    typeof phone === "string" &&
    /^\+?[1-9]\d{7,14}$/.test(phone)
  );
}

function isValidEmail(email) {
  if (email === null || email === undefined || email === "") {
    return true;
  }

  return (
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function isValidPassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 12 &&
    password.length <= 128
  );
}

function isValidName(name) {
  return (
    typeof name === "string" &&
    name.trim().length >= 2 &&
    name.trim().length <= 80
  );
}

function isValidAmount(amount) {
  return (
    typeof amount === "number" &&
    Number.isSafeInteger(amount) &&
    amount > 0
  );
}

module.exports = {
  isValidPhone,
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidAmount
};
