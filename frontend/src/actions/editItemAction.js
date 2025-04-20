import axios from "axios";
import { API_BASE_URL } from "../config";

export const editItemAction = async ({ request, params }) => {
  const formData = await request.formData();
  const serialNumber = formData.get("serial_number");

  const token = localStorage.getItem("token"); 

  try {
    await axios.put(
      `${API_BASE_URL}/api/items/${params.itemId}`,
      { serial_number: serialNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return null;
  } catch (error) {
    console.error("Failed to update item:", error);
    throw new Error("Could not update item.");
  }
};
