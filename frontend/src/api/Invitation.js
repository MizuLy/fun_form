import api from "./client";

export const createInvitation = (data) => api.post("/invitations", data);
