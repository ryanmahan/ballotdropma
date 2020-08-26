import axios from "axios";
import getSession from "./session";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:8080",
})

instance.interceptors.request.use(config => {
  console.log(config)
  if (["get", "post", "put", "patch"].includes(config.method)) {
    config.params = {
    session: getSession(),
      ...config.params,
    };
    console.log(config)
  }
  return config;
});

export default instance;