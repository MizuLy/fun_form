const express = require("express");
const {
  addPermission,
  getPermission,
} = require("../controllers/permission.controller");

const router = express.Router();

router.post("/", addPermission);
router.get("/", getPermission);

module.exports = router;
