const prisma = require("../config/database");

async function createAuditLog({
  userId = null,
  action,
  entity = null,
  entityId = null,
  ipAddress = null,
  metadata = null
}) {
  if (!action) {
    throw new Error("A ação é obrigatória.");
  }

  return prisma.auditLog.create({
    data: {
      userId,
      action,
      entity,
      entityId,
      ipAddress,
      metadata
    }
  });
}

module.exports = {
  createAuditLog
};
