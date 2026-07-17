const { prisma } = require("../config/db");
const { PermissionCodessionCode } = require("../utils/makeCode");

const addPermission = async (req, res) => {
  try {
    const { name, reason, date, dueDate } = req.body;

    if (!name || !reason || !date || !dueDate)
      return res.status(400).json({ error: "All the fields are required" });

    if (new Date(dueDate) < new Date(date))
      return res
        .status(400)
        .json({ error: "Due date can't be before leave date" });

    const permission = await prisma.permission.create({
      data: {
        name,
        reason,
        date: new Date(date),
        dueDate: new Date(dueDate),
        code: PermissionCode(),
      },
    });

    res.status(201).json({
      message: "Permission form has been created!",
      data: {
        id: permission.id,
        name,
        reason,
        date,
        dueDate,
        code: permission.code,
        createdAt: permission.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPermission = async (req, res) => {
  try {
    const result = await prisma.permission.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addPermission, getPermission };
