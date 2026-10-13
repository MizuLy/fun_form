const { prisma } = require("../config/db");
const { InvitationCode } = require("../utils/makeCode");

const createInvitation = async (req, res) => {
  try {
    const { name, event, date, time } = req.body;

    if (!name || !event || !date || !time)
      return res.status(400).json({ error: "All the fields are required" });

    // Validate date format: YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Validate time format: HH:mm
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      return res.status(400).json({ error: "Invalid time format" });
    }

    const invitationDate = new Date(`${date}T${time}:00`);

    // Use today's local date
    const today = new Date();
    const todayString =
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-` +
      `${String(today.getDate()).padStart(2, "0")}`;

    if (date < todayString) {
      return res.status(400).json({
        error: "Invitation date cannot be before today",
      });
    }

    const invitation = await prisma.invitation.create({
      data: {
        name,
        event,
        date: invitationDate,
        code: InvitationCode(),
      },
    });

    return res.status(201).json({
      message: "Invitation has been created!",
      data: invitation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInvitation = async (req, res) => {
  try {
    const result = await prisma.invitation.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createInvitation, getInvitation };
