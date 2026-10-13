const express = require("express");
const {
  createInvitation,
  getInvitation,
} = require("../controllers/invitation.controller");

const router = express.Router();

router.post("/", createInvitation);
router.get("/", getInvitation);

module.exports = router;
