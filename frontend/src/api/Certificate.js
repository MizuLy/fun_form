import api from "./client";

export const createCertificate = (data) => api.post("/certificates", data);
