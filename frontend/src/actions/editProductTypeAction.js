import axios from "axios";

export async function editProductTypeAction({ request, params }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");

  const token = localStorage.getItem("token");

  try {
    await axios.put(
      `http://localhost:8000/api/product-types/${params.productId}`,
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return null;
  } catch (error) {
    console.log("UPDATE ERROR",error)
    throw new Error("Failed to update product type");
  }
}
