import axios from "axios";

export async function removeProductTypeAction({ params }) {
  try {
    const token = localStorage.getItem("token"); // or sessionStorage, depending on your setup
    await axios.delete(`http://localhost:8000/api/product-types/${params.productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return null;
  } catch (error) {
    console.error("DELETE ERROR", error);
    throw new Error("Failed to delete product type");
  }
}
