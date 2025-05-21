import api from "./axios";
import Cookies from "js-cookie";



// get all listings
export const getAllListings = async () => {
  const response = await api.get("/listing");
  return response.data;
}
// get a specific listing
export const getListingById = async (id) => {
  const response = await api.get(`/listing/${id}`);
  return response.data;
}

// Create a new listing
export const createListing = async (listingData) => {
  const response = await api.post("/listing/create", listingData);
  return response.data;
}