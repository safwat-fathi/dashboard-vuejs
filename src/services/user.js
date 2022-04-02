import axios from "axios";
import authHeader from "./authHeader";

// example
export const getUser = () => {
  return axios.get(process.env.API_BASE_URL + "/user", {
    headers: authHeader(),
  });
};
