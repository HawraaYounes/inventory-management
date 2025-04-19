import axios from "axios";
import { API_BASE_URL } from "../config";

export const itemsLoader = async ({ params }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Response("Unauthorized", { status: 401 });

  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/product-types/${params.productId}/items`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { items: res.data };
  } catch (err) {
    throw new Response("Failed to fetch items", { status: 500 });
  }
};
