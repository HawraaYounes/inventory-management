import { json, redirect } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

export async function removeItemAction({ params }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await axios.delete(
      `${API_BASE_URL}/api/items/${params.itemId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return null; 
  } catch (err) {
    const msg =
      err.response?.data?.message || "Failed to delete item. Please try again.";
    return json({ error: msg }, { status: err.response?.status || 500 });
  }
}
