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
}

// Create listing. Backend using @RequestHeader to authenticate a user, so i need to send the jwt token in the header
// listingData is just everything relevant inside the listing model (title, rooms, description etc) in backend

//IMPORTANT: RIGHT NOW IT LOOKS FOR THE TOKEN INSIDE LOCAL STORAGE
//IT SHOULD BE IN THE COOKIES

export const createListing = async (listingData) => {
  const response = await api.post("/listing/create", listingData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`, //not sure how to get the token from cookies right now
      "Content-Type": "application/json",
    },
  });
    return response.data;
}