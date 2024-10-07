import axios from "axios";

const instance = axios.create({
  baseURL: "https://password-generator-backend-p9k5.onrender.com/",
});

export default instance;
