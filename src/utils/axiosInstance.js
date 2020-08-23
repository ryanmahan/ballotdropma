import axios from "axios";
import getSession from "./session";

const instance = axios.create({
  baseURL: "http://localhost:8080",
})

instance.interceptors.request.use(config => {
  config.params = {
   session: getSession(),
    ...config.params,
  };
  return config;
});

export default instance;