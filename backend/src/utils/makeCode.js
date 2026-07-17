const PermissionCode = () => {
  return "PMF-" + Math.random().toString(36).slice(2, 8).toUpperCase();
};

const CertificateCode = () => {
  return "CTF-" + Math.random().toString(36).slice(2, 8).toUpperCase();
};

module.exports = { PermissionCode, CertificateCode };
