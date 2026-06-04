import axios from "axios";

const API = axios.create({
  baseURL: "https://taskplanet-social-app.onrender.com/",
});

export default API;