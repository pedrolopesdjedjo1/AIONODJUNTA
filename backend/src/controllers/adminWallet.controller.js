const prisma = require("../config/database");

async function listWallets(req, res, next) {
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

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : "";

    const where = search
      ? {
          user: {
            OR: [
              {
                firstName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: search,
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
        }
      : {};

    const [wallets, total] = await Promise.all([
      prisma.wallet.findMany({
        where,
        orderBy: {
          updatedAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          userId: true,
          balance: true,
          currency: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
              status: true,
            },
          },
        },
      }),

      prisma.wallet.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      data: wallets.map((wallet) => ({
        ...wallet,
        balance: wallet.balance.toString(),
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

module.exports = {
  listWallets,
};
