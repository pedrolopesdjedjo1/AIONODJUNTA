const prisma = require("../config/database");

async function getProfile(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId
      },
      select: {
        id: true,
        phone: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        kycStatus: true,
        createdAt: true,
        wallet: {
          select: {
            balance: true,
            currency: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado."
      });
    }

    return res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error("GET_PROFILE_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao obter perfil."
    });
  }
}

async function updateProfile(req, res) {
  try {
    const {
      firstName,
      lastName,
      email
    } = req.body;

    const data = {};

    if (firstName !== undefined) {
      data.firstName = firstName;
    }

    if (lastName !== undefined) {
      data.lastName = lastName;
    }

    if (email !== undefined) {
      data.email = email || null;
    }

    const user = await prisma.user.update({
      where: {
        id: req.user.userId
      },
      data,
      select: {
        id: true,
        phone: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        kycStatus: true,
        updatedAt: true
      }
    });

    return res.json({
      success: true,
      message: "Perfil atualizado com sucesso.",
      user
    });
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "O email já está associado a outra conta."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar perfil."
    });
  }
}

module.exports = {
  getProfile,
  updateProfile
};
