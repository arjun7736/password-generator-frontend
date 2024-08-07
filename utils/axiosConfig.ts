import axios from "axios";

const instance = axios.create({
  baseURL: "https://password-generator-backend-production.up.railway.app/",
});

export default instance;
