import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  // headers: { "X-Custom-Header": "foobar" },
});

API.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
