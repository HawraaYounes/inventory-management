import axios from "axios";

export const productTypeLoader = async ({ params }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
        console.log("params id",params)
      const res = await axios.get(
        `http://localhost:8000/api/product-types/${params.productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return { productType: res.data };
    } catch (err) {
      throw new Response(err.message, { status: err.response?.status || 500 });
    }
  };
  