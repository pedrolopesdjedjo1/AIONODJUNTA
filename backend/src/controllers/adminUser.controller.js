const prisma = require("../config/database");

async function listUsers(req, res, next) {
  try {
    const page = Math.max(
      1,
      Number.parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 20)
    );

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : "";

    const where = search
      ? {
          OR: [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { phone: { contains: search } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          email: true,
          role: true,
          status: true,
          kycStatus: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      data: users,
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

async function updateUserStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "ACTIVE",
      "SUSPENDED",
      "BLOCKED",
      "PENDING",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Estado de conta inválido.",
      });
    }

    if (id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Não podes alterar o estado da tua própria conta.",
      });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
      },
    });

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado.",
      });
    }

    if (
      ["ADMIN", "SUPER_ADMIN"].includes(targetUser.role) &&
      req.user.role !== "SUPER_ADMIN"
    ) {
      return res.status(403).json({
        success: false,
        message: "Apenas um SUPER_ADMIN pode alterar esta conta.",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        status: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Estado da conta atualizado.",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}
async function getUserDetails(req, res, next) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        kycStatus: true,
        createdAt: true,

        wallet: {
          select: {
            id: true,
            balance: true,
            currency: true,
            updatedAt: true,
          },
        },

        transactions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
          select: {
            id: true,
            type: true,
            amount: true,
            fee: true,
            currency: true,
            status: true,
            reference: true,
            createdAt: true,
          },
        },

        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        ...user,

        wallet: user.wallet
          ? {
              ...user.wallet,
              balance: user.wallet.balance.toString(),
            }
          : null,

        transactions: user.transactions.map((transaction) => ({
          ...transaction,
          amount: transaction.amount.toString(),
          fee: transaction.fee.toString(),
        })),

        totalTransactions: user._count.transactions,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  listUsers,
  updateUserStatus,
  getUserDetails,
};
