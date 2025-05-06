import api from "./axios";

// get all listings
export const getAllListings = async () => {
    const response = await api.get("/listing");
    return response.data;
    }

// get a specific listing
export const getListingById = async (id) => {
  const response = await api.get(`/listing/${id}`);
  return response.data;
};
