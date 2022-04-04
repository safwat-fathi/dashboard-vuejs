import axios from "axios";

const API_BASE_URL = "http://145.255.67.211:1111/new_akila/api";
const configHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const login = async (user) => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/login",
      {
        email: user.email,
        password: user.password,
      },
      { headers: configHeaders }
    );

    if (response.data.access_token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    return error;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = async (userData) => {
  try {
    const response = await axios.post(API_BASE_URL + "/register", {
      ...userData,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
