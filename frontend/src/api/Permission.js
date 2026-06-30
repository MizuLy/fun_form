import axios from "axios";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:6969/api/permissions";

export const createPermission = (data) => axios.post(API, data);
