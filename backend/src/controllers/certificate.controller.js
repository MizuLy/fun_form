const { prisma } = require("../config/db");
const { CertificateCodetificateCode } = require("../utils/makeCode");

const addCertificate = async (req, res) => {
  try {
    const { name, achievement, issuedBy } = req.body;

    if (!name || !achievement || !issuedBy)
      return res.status(400).json({ error: "All the fields are required!" });

    const certificate = await prisma.certificate.create({
      data: {
        name,
        achievement,
        issuedBy,
        code: CertificateCode(),
      },
    });
    res.status(201).json({
      message: "Certificate form has been created!",
      data: {
        id: certificate.id,
        name,
        achievement,
        issuedBy,
        code,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCertificate = async (req, res) => {
  try {
    const result = await prisma.certificate.findMany({
      orderBy: { issuedBy: "desc" },
    });

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addCertificate, getCertificate };
