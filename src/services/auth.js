import axios from "axios";

export const login = async (user) => {
  try {
    const response = await axios.post(process.env.API_BASE_URL + "login", {
      username: user.name,
      password: user.password,
    });

    if (response.data.accessToken) {
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

export const register = async (user) => {
  try {
    const response = await axios.post(process.env.API_BASE_URL + "register", {
      username: user.name,
      email: user.email,
      password: user.password,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
