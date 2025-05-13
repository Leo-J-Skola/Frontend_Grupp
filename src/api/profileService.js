import api from "./axios";
import Cookies from "js-cookie";

// get a specific user by username 
export const getUserByUserName = async (username) => {
  const response = await api.get(`/user/findByUserName/${username}`);
  return response.data;
}

