const prisma = require("../config/database");

async function getNotifications(req, res) {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 100
    });

    return res.json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    console.error("GET_NOTIFICATIONS_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao carregar notificações."
    });
  }
}

async function markAsRead(req, res) {
  try {
    const { id } = req.params;

    const result = await prisma.notification.updateMany({
      where: {
        id,
        userId: req.user.userId,
        read: false
      },
      data: {
        read: true
      }
    });

    if (result.count === 0) {
      const notification = await prisma.notification.findFirst({
        where: {
          id,
          userId: req.user.userId
        }
      });

      if (!notification) {
        return res.status(404).json({
          success: false,
          message: "Notificação não encontrada."
        });
      }
    }

    return res.json({
      success: true,
      message: "Notificação marcada como lida."
    });
  } catch (error) {
    console.error("MARK_NOTIFICATION_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar notificação."
    });
  }
}

async function markAllAsRead(req, res) {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user.userId,
        read: false
      },
      data: {
        read: true
      }
    });

    return res.json({
      success: true,
      message: "Todas as notificações foram marcadas como lidas."
    });
  } catch (error) {
    console.error("MARK_ALL_NOTIFICATIONS_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar notificações."
    });
  }
}

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead
};
