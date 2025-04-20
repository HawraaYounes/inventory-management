// src/actions/addProductTypeAction.js
import axios from "axios";

export async function addProductTypeAction({ request }) {
  // 1. Pull the incoming form data
  const formDataFromRequest = await request.formData();

  // 2. Rebuild a browser-compatible FormData
  const formData = new FormData();
  formData.append("name", formDataFromRequest.get("name"));
  formData.append("description", formDataFromRequest.get("description") || "");
  const file = formDataFromRequest.get("image");
  if (file && file.size > 0) {
    formData.append("image", file);
  }

  // 3. Get your JWT
  const token = localStorage.getItem("token");
  if (!token) {
    return { error: "You must be logged in to perform this action." };
  }

  try {
    // 4. Send to the API
    const res = await axios.post(
      "http://localhost:8000/api/product-types",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // 5. Return the created ProductType JSON
    return res.data;
  } catch (err) {
    console.error("Error creating product type:", err.response?.data || err);
    // 6. Return a minimal error object; fetcher.data will be set to this
    return {
      error:
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {}).flat().join(" ") ||
        "Failed to create product type.",
    };
  }
}
