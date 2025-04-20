import axios from "axios";
import { redirect } from "react-router-dom";

export async function removeProductTypeAction({params}) {
  const {productId} = params;
  try {
    const token = localStorage.getItem("token"); 

    await axios.delete(`http://localhost:8000/api/product-types/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return redirect("/product-types");
  } catch (error) {
    console.error("DELETE ERROR", error);
    throw new Error("Failed to delete product type");
  }
}
