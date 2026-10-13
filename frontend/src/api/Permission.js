import api from "./client";

export const createPermission = (data) => api.post("/permissions", data);
