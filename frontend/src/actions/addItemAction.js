
import { redirect } from "react-router-dom";
import axios from "axios";

export async function addItemAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { productId } = params;

  const token = localStorage.getItem("token");
  if (!token) {
    return { error: "You must be logged in to perform this action." };
  }

  const rawLines = (data.serial_numbers || "").split(/\r?\n/);
  const serial_numbers = rawLines
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (serial_numbers.length === 0) {
    return { error: "Please enter at least one serial number." };
  }

  if (data.count) {
    const expected = parseInt(data.count, 10);
    if (isNaN(expected) || expected !== serial_numbers.length) {
      return { error: "The total items count must match the number of serials entered." };
    }
  }

  try {
    await axios.post(
      `http://localhost:8000/api/product-types/${productId}/items`,
      { serial_numbers },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error adding items:", error);
    const message =
      error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(" ")
        : error.response?.data?.message || "Failed to add items. Please try again.";
    return { error: message };
  }
}
