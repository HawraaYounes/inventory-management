// src/actions/addItemAction.js

import { redirect } from "react-router-dom";
import axios from "axios";

export async function addItemAction({ request, params }) {
  // 1. Pull form data out
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { productId } = params;

  // 2. JWT token
  const token = localStorage.getItem("token");
  if (!token) {
    return { error: "You must be logged in to perform this action." };
  }

  // 3. Parse serial_numbers textarea into an array
  // Expect `data.serial_numbers` as a newline-separated string
  const rawLines = (data.serial_numbers || "").split(/\r?\n/);
  const serial_numbers = rawLines
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (serial_numbers.length === 0) {
    return { error: "Please enter at least one serial number." };
  }

  // 4. (Optional) validate count matches lines
  if (data.count) {
    const expected = parseInt(data.count, 10);
    if (isNaN(expected) || expected !== serial_numbers.length) {
      return { error: "The total items count must match the number of serials entered." };
    }
  }

  // 5. Send to backend
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

    // 6. On success, redirect back to the items page
    return redirect(`/product-types/${productId}`);
  } catch (error) {
    console.error("Error adding items:", error);
    // Capture Laravel validation errors or generic message
    const message =
      error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(" ")
        : error.response?.data?.message || "Failed to add items. Please try again.";
    return { error: message };
  }
}
