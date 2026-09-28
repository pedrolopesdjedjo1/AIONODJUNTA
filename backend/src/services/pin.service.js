const bcrypt = require("bcryptjs");
const prisma = require("../config/database");

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

async function setPin(userId, pin) {
  if (!/^\d{6}$/.test(pin)) {
    throw new Error("O PIN deve conter exatamente 6 dígitos.");
  }

  const pinHash = await bcrypt.hash(pin, 12);

  await prisma.user.update({
    where: { id: userId },
    data: {
      pinHash,
      pinFailedAttempts: 0,
      pinLockedUntil: null
    }
  });

  return { success: true };
}

async function verifyPin(userId, pin) {
  if (!/^\d{6}$/.test(pin)) {
    throw new Error("O PIN deve conter exatamente 6 dígitos.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      pinHash: true,
      pinFailedAttempts: true,
      pinLockedUntil: true
    }
  });

  if (!user || !user.pinHash) {
    throw new Error("PIN ainda não configurado.");
  }

  if (user.pinLockedUntil && user.pinLockedUntil > new Date()) {
    throw new Error("PIN temporariamente bloqueado.");
  }

  const valid = await bcrypt.compare(pin, user.pinHash);

  if (valid) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        pinFailedAttempts: 0,
        pinLockedUntil: null
      }
    });

    return true;
  }

  const attempts = user.pinFailedAttempts + 1;
  const lockedUntil =
    attempts >= MAX_ATTEMPTS
      ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000)
      : null;

  await prisma.user.update({
    where: { id: userId },
    data: {
      pinFailedAttempts: attempts >= MAX_ATTEMPTS ? 0 : attempts,
      pinLockedUntil: lockedUntil
    }
  });

  throw new Error(
    lockedUntil
      ? "PIN temporariamente bloqueado por 15 minutos."
      : "PIN incorreto."
  );
}

module.exports = {
  setPin,
  verifyPin
};
