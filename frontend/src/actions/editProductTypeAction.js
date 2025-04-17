import axios from "axios";

export async function editProductTypeAction({ request, params }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");

  try {
    await axios.put(`http://localhost:8000/api/product-types/${params.productId}`, {
      name,
      description,
    });
    return null;
  } catch (error) {
    throw new Error("Failed to update product type");
  }
}
