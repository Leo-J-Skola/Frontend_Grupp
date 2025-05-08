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

// Create listing. Backend using @RequestHeader to authenticate a user, so i need to send the jwt token in the header
// listingData is just everything relevant inside the listing model (title, rooms, description etc) in backend

export const createListing = async (listingData) => {
  const token = Cookies.get("jwt"); // get the jwt token from cookies
  const response = await api.post("/listing/create", listingData, {
    headers: {
      Authorization: `Bearer ${token}`, // const token = user jwt token
      "Content-Type": "application/json",
    },
  });
  return response.data;
}