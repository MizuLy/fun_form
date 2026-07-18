import axios from "axios";

const API = import.meta.env.VITE_API_CERTIFICATE;

export const createCertificate = (data) => axios.post(API, data);
