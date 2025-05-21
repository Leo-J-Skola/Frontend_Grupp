import api from "./axios";

// get a specific user by username 
export const getUserByUsername = async (username) => {
  const response = await api.get(`/user/username/${username}`);
  return response.data;
}

// get users current listings
export const getUsersListings = async (hostId) => {
  const response = await api.get(`/listing/user-listings/${hostId}`);
  return response.data;
}

// get users previous bookings


// get users favorite listings
export const getUserFavorites = async (userId) => {
  const response = await api.get(`/favorites/user-favorites/${userId}`);
  return response.data;
}
