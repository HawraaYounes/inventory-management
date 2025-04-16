import axios from "axios";
import { redirect } from "react-router-dom";

export async function addProductTypeAction({ request }) {
  const formDataFromRequest = await request.formData();

  const formData = new FormData();
  formData.append("name", formDataFromRequest.get("name"));
  formData.append("description", formDataFromRequest.get("description"));
  formData.append("image", formDataFromRequest.get("image"));

  const token = localStorage.getItem("token"); // or sessionStorage.getItem("token")

  try {
    await axios.post("http://localhost:8000/api/product-types", formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    return redirect("/product-types");
  } catch (error) {
    console.error("❌ Axios error:", error);
    console.error("❌ Response data:", error.response?.data);
    throw new Error("Failed to create product type.");
  }
}
