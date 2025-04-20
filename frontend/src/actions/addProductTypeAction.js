import axios from "axios";

export async function addProductTypeAction({ request }) {
  const formDataFromRequest = await request.formData();

  const formData = new FormData();
  formData.append("name", formDataFromRequest.get("name"));
  formData.append("description", formDataFromRequest.get("description") || "");
  const file = formDataFromRequest.get("image");
  if (file && file.size > 0) {
    formData.append("image", file);
  }

  const token = localStorage.getItem("token");
  if (!token) {
    return { error: "You must be logged in to perform this action." };
  }

  try {
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

    return res.data;
  } catch (err) {
    console.error("Error creating product type:", err.response?.data || err);
    return {
      error:
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {}).flat().join(" ") ||
        "Failed to create product type.",
    };
  }
}
