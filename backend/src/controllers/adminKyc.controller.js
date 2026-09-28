const prisma = require("../config/database");

async function listPendingKyc(req, res, next) {
  try {
    const page = Math.max(
      1,
      Number.parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 20)
    );

    const [requests, total] = await Promise.all([
      prisma.kycRequest.findMany({
        where: {
          status: "PENDING",
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          userId: true,
          documentType: true,
          documentNumber: true,
          documentUrl: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
              email: true,
              kycStatus: true,
            },
          },
        },
      }),
      prisma.kycRequest.count({
        where: {
          status: "PENDING",
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: requests,
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

async function reviewKyc(req, res, next) {
  try {
    const { id } = req.params;
    const { decision, rejectionReason } = req.body;

    if (!["VERIFIED", "REJECTED"].includes(decision)) {
      return res.status(400).json({
        success: false,
        message: "Decisão inválida.",
      });
    }

    if (
      decision === "REJECTED" &&
      (!rejectionReason ||
        typeof rejectionReason !== "string" ||
        !rejectionReason.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Indique o motivo da rejeição.",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const request = await tx.kycRequest.findUnique({
        where: { id },
      });

      if (!request) {
        const error = new Error("Pedido KYC não encontrado.");
        error.statusCode = 404;
        throw error;
      }

      if (request.status !== "PENDING") {
        const error = new Error(
          "Este pedido já foi analisado."
        );
        error.statusCode = 409;
        throw error;
      }

      const updatedRequest = await tx.kycRequest.update({
        where: { id },
        data: {
          status: decision,
          reviewedBy: req.user.id,
          reviewedAt: new Date(),
          rejectionReason:
            decision === "REJECTED"
              ? rejectionReason.trim()
              : null,
        },
      });

      await tx.user.update({
        where: {
          id: request.userId,
        },
        data: {
          kycStatus: decision,
        },
      });

      return updatedRequest;
    });

    return res.status(200).json({
      success: true,
      message:
        decision === "VERIFIED"
          ? "Identidade verificada com sucesso."
          : "Pedido KYC rejeitado.",
      data: {
        id: result.id,
        userId: result.userId,
        status: result.status,
        reviewedAt: result.reviewedAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listPendingKyc,
  reviewKyc,
};
