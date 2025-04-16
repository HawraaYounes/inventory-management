// src/loaders/productTypesLoader.js

import axios from "axios";
import { API_BASE_URL } from "../config"; // Ensure you have the API_BASE_URL defined

export const productTypesLoader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Response(
      JSON.stringify({ message: "Unauthorized", type: "warning" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/product-types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { products: response.data }; // Return the products data
  } catch (error) {
    console.error(error);
    throw new Response(
      JSON.stringify({ message: "Failed to fetch product types", type: "error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
