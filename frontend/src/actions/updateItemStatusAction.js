import axios from "axios";
import { API_BASE_URL } from "../config";

export async function updateItemStatusAction({ request, params }) {
  console.log("Params received:", params);
  const formData = await request.formData();
  const isSold = formData.get("is_sold") === "on";
  console.log("Updating sold status:", { itemId: params.itemId, isSold });

  try {
    await axios.post(`${API_BASE_URL}/api/items/${params.itemId}/sold`, {
        is_sold: isSold,
      });

    return redirect(`/product-types/${params.productId}`);
  } catch (error) {
    console.error("Error updating item status", error);
    throw error;
  }
}
