import axios from "axios";

const API = axios.create({
  baseURL: "https://taskplanet-social-app.onrender.com/api",
});

export default API;