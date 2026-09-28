const prisma = require("../config/database");

async function getDashboardStats(req, res, next) {
  try {
    const [
      totalUsers,
      activeUsers,
      suspendedUsers,
      blockedUsers,
      pendingKyc,
      verifiedKyc,
      pendingTransactions,
      completedTransactions,
      failedTransactions,
      completedTransactionTotals,
    ] = await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: { status: "ACTIVE" },
      }),

      prisma.user.count({
        where: { status: "SUSPENDED" },
      }),

      prisma.user.count({
        where: { status: "BLOCKED" },
      }),

      prisma.kycRequest.count({
        where: { status: "PENDING" },
      }),

      prisma.kycRequest.count({
        where: { status: "VERIFIED" },
      }),

      prisma.transaction.count({
        where: { status: "PENDING" },
      }),

      prisma.transaction.count({
        where: { status: "COMPLETED" },
      }),

      prisma.transaction.count({
        where: { status: "FAILED" },
      }),

      prisma.transaction.aggregate({
        where: { status: "COMPLETED" },
        _sum: {
          amount: true,
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          suspended: suspendedUsers,
          blocked: blockedUsers,
        },
        kyc: {
          pending: pendingKyc,
          verified: verifiedKyc,
        },
        transactions: {
          pending: pendingTransactions,
          completed: completedTransactions,
          failed: failedTransactions,
          completedAmount:
            completedTransactionTotals._sum.amount?.toString() || "0",
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboardStats,
};
