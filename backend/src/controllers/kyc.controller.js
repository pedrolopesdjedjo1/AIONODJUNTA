const prisma = require("../config/database");

const DOCUMENT_TYPES = [
  "NATIONAL_ID",
  "PASSPORT",
  "DRIVERS_LICENSE"
];

async function submitKyc(req, res) {
  try {
    const {
      documentType,
      documentNumber,
      documentUrl
    } = req.body;

    if (!DOCUMENT_TYPES.includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: "Tipo de documento inválido."
      });
    }

    if (
      typeof documentNumber !== "string" ||
      documentNumber.trim().length < 3 ||
      documentNumber.trim().length > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Número de documento inválido."
      });
    }

    if (
      documentUrl !== undefined &&
      documentUrl !== null &&
      typeof documentUrl !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Documento inválido."
      });
    }

    const pending = await prisma.kycRequest.findFirst({
      where: {
        userId: req.user.userId,
        status: "PENDING"
      }
    });

    if (pending) {
      return res.status(409).json({
        success: false,
        message: "Já existe um pedido de verificação pendente."
      });
    }

    const request = await prisma.kycRequest.create({
      data: {
        userId: req.user.userId,
        documentType,
        documentNumber: documentNumber.trim(),
        documentUrl: documentUrl || null
      },
      select: {
        id: true,
        documentType: true,
        status: true,
        createdAt: true
      }
    });

    await prisma.user.update({
      where: { id: req.user.userId },
      data: { kycStatus: "PENDING" }
    });

    return res.status(201).json({
      success: true,
      message: "Pedido de verificação enviado.",
      request
    });
  } catch (error) {
    console.error("SUBMIT_KYC_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao enviar pedido de verificação."
    });
  }
}

async function getMyKyc(req, res) {
  try {
    const requests = await prisma.kycRequest.findMany({
      where: {
        userId: req.user.userId
      },
      select: {
        id: true,
        documentType: true,
        status: true,
        rejectionReason: true,
        reviewedAt: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json({
      success: true,
      requests
    });
  } catch (error) {
    console.error("GET_KYC_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao consultar verificação."
    });
  }
}

module.exports = {
  submitKyc,
  getMyKyc
};
