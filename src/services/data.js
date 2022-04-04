import axios from "axios";
import authHeader from "./authHeader";

const API_BASE_URL = "http://145.255.67.211:1111/new_akila/api";
const configHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const orders = async () => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/eairs",

      { headers: { ...configHeaders, ...authHeader() } }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
