import axios from "axios";

const API = import.meta.env.VITE_API_PERMISSION;

console.log(API);
export const createPermission = (data) => axios.post(API, data);
