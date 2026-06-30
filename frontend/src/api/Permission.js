import axios from "axios";

const API = "http://localhost:6969/api/permissions";

export const createPermission = (data) => axios.post(API, data);
