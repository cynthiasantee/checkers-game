import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
});

api.interceptors.response.use(undefined, (error) => {
  switch (error.response.status) {
    case 401:
      //clear session cookie
      window.location.pathname = "/";
      break;
    case 403:
      window.location.pathname = "/bad-request";
      break;
    case 404:
      window.location.pathname = "/bad-request";
      break;
    case 500:
      window.location.pathname = "/bad-request";
      break;
  }
  return Promise.reject(error);
});
