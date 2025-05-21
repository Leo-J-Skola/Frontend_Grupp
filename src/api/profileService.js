import api from "./axios";
import Cookies from "js-cookie";

// get a specific user by username 
export const getUserByUsername = async (username) => {
  const response = await api.get(`/user/username/${username}`);
  return response.data;
}

// update a specific user by username 
export const updateUser = async (username, userData, token) => {
  const response = await api.put(`/user/update/`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};