const prisma = require("../config/database");

async function getBeneficiaries(req, res) {
  try {
    const beneficiaries = await prisma.beneficiary.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        name: "asc"
      }
    });

    return res.json({
      success: true,
      count: beneficiaries.length,
      beneficiaries
    });
  } catch (error) {
    console.error("GET_BENEFICIARIES_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao carregar beneficiários."
    });
  }
}

async function createBeneficiary(req, res) {
  try {
    const { name, phone } = req.body;

    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > 80
    ) {
      return res.status(400).json({
        success: false,
        message: "Nome inválido."
      });
    }

    if (
      typeof phone !== "string" ||
      !/^\+?[1-9]\d{7,14}$/.test(phone)
    ) {
      return res.status(400).json({
        success: false,
        message: "Número de telefone inválido."
      });
    }

    const beneficiary = await prisma.beneficiary.create({
      data: {
        userId: req.user.userId,
        name: name.trim(),
        phone: phone.trim()
      }
    });

    return res.status(201).json({
      success: true,
      message: "Beneficiário adicionado.",
      beneficiary
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Este beneficiário já existe."
      });
    }

    console.error("CREATE_BENEFICIARY_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao adicionar beneficiário."
    });
  }
}

async function deleteBeneficiary(req, res) {
  try {
    const result = await prisma.beneficiary.deleteMany({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Beneficiário não encontrado."
      });
    }

    return res.json({
      success: true,
      message: "Beneficiário removido."
    });
  } catch (error) {
    console.error("DELETE_BENEFICIARY_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao remover beneficiário."
    });
  }
}

module.exports = {
  getBeneficiaries,
  createBeneficiary,
  deleteBeneficiary
};
