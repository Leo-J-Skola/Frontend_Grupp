import api from "./axios";
import Cookies from "js-cookie";

// get a specific user by username 
export const getUserByUsername = async (username) => {
  const response = await api.get(`/user/username/${username}`);
  return response.data;
}
