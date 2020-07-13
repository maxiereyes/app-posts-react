const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api-rest-posts.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
