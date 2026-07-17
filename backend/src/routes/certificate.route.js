const express = require("express");
const {
  addCertificate,
  getCertificate,
} = require("../controllers/certificate.controller");

const router = express.Router();

router.post("/", addCertificate);
router.get("/", getCertificate);

module.exports = router;
