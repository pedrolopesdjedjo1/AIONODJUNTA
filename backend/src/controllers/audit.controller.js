const prisma = require("../config/database");

async function getAuditLogs(req, res) {
  try {
    const page = Math.max(
      1,
      Number.parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        Number.parseInt(req.query.limit, 10) || 20
      )
    );

    const skip = (page - 1) * limit;

    const [logs, total] = await prisma.$transaction([
      prisma.auditLog.findMany({
        orderBy: {
          createdAt: "desc"
        },
        skip,
        take: limit
      }),
      prisma.auditLog.count()
    ]);

    return res.json({
      success: true,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      logs
    });
  } catch (error) {
    console.error("GET_AUDIT_LOGS_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao consultar auditoria."
    });
  }
}

module.exports = {
  getAuditLogs
};
