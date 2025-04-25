import api from "./axios";

// hämta produkter
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// hämta en produkt med id
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
