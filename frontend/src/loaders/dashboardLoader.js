import axios from "axios";
import { API_BASE_URL } from "../config"; // Ensure you have the API_BASE_URL defined

export const dashboardLoader = async ({ params }) => { 
  const token = localStorage.getItem("token");
  if (!token) throw new Response("Unauthorized", { status: 401 });

  const url = params.productId
    ? `/api/product-types/${params.productId}/items`
    : `/api/product-types`;

  try {
    const res = await axios.get(`${API_BASE_URL}${url}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return params.productId
      ? { items: res.data }
      : { products: res.data };
  } catch (error) {
    console.error("Error in dashboard loader:", error);
    return { items: [], error: error.message }; // Handle error and return empty array for items
  }
};
