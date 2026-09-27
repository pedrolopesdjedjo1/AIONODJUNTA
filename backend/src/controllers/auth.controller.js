const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const prisma = require("../config/database");
const { generateToken } = require("../utils/jwt");

async function register(req, res) {
  try {
    const {
      phone,
      email,
      password,
      firstName,
      lastName
    } = req.body;

    if (!phone || !password || !firstName) {
      return res.status(400).json({
        success: false,
        message: "Telefone, palavra-passe e nome são obrigatórios."
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { phone },
          ...(email ? [{ email }] : [])
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Utilizador já existe."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        phone,
        email: email || null,
        passwordHash,
        firstName,
        lastName: lastName || null
      }
    });

    await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
        currency: "XOF"
      }
    });

    const token = generateToken({
      userId: user.id,
      role: user.role
    });

    return res.status(201).json({
      success: true,
      message: "Conta criada com sucesso.",
      token,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        kycStatus: user.kycStatus
      }
    });
  } catch (error) {
    console.error("REGISTER_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao criar a conta."
    });
  }
}

async function login(req, res) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Telefone e palavra-passe são obrigatórios."
      });
    }

    const user = await prisma.user.findUnique({
      where: { phone }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas."
      });
    }

    if (user.status === "BLOCKED") {
      return res.status(403).json({
        success: false,
        message: "Conta bloqueada."
      });
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas."
      });
    }

    const token = generateToken({
      userId: user.id,
      role: user.role
    });

    return res.json({
      success: true,
      message: "Login efetuado com sucesso.",
      token,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        kycStatus: user.kycStatus
      }
    });
  } catch (error) {
    console.error("LOGIN_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao efetuar login."
    });
  }
}

async function me(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        phone: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        kycStatus: true,
        createdAt: true
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
    console.error("ME_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao obter utilizador."
    });
  }
}

module.exports = {
  register,
  login,
  me
};
