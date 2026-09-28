const prisma = require("../config/database");

const ALLOWED_STATUSES = [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
];

const ALLOWED_TYPES = [
  "DEPOSIT",
  "WITHDRAWAL",
  "TRANSFER",
  "PAYMENT",
  "AIRTIME",
  "REFUND",
  "FEE",
];

async function listTransactions(req, res, next) {
  try {
    const page = Math.max(
      1,
      Number.parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      50,
      Math.max(
        1,
        Number.parseInt(req.query.limit, 10) || 20
      )
    );

    const { status, type, reference } = req.query;

    if (
      status &&
      !ALLOWED_STATUSES.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Estado de transação inválido.",
      });
    }

    if (
      type &&
      !ALLOWED_TYPES.includes(type)
    ) {
      return res.status(400).json({
        success: false,
        message: "Tipo de transação inválido.",
      });
    }

    const where = {
      ...(status ? { status } : {}),
      ...(type ? { type } : {}),
      ...(typeof reference === "string" && reference.trim()
        ? {
            reference: {
              contains: reference.trim(),
              mode: "insensitive",
            },
          }
        : {}),
    };

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          userId: true,
          type: true,
          amount: true,
          fee: true,
          currency: true,
          status: true,
          reference: true,
          description: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
        },
      }),
      prisma.transaction.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      data: transactions.map((transaction) => ({
        ...transaction,
        amount: transaction.amount.toString(),
        fee: transaction.fee.toString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}
async function getTransactionDetails(req, res, next) {
  try {
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        type: true,
        amount: true,
        fee: true,
        currency: true,
        status: true,
        reference: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transação não encontrada.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        ...transaction,
        amount: transaction.amount.toString(),
        fee: transaction.fee.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listTransactions,
};
