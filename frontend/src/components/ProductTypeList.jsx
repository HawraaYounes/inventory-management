import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table"; // Adjust the import path if needed

const ProductTypeList = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Bed", count: 30, image: "/images/download (10).jpeg" },
    { id: 2, name: "Couch", count: 30, image: "/images/Evins Sofa.jpeg" },
    { id: 3, name: "Table", count: 30, image: "/images/table.jpeg" },
  ];

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (value) => (
        <img
          src={value}
          alt="Product"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    { key: "id", label: "ID" },
    { key: "name", label: "Product Type Name" },
    { key: "count", label: "Count" },
  ];

  return (
    <div className="px-14">
      <h2 className="text-xl font-bold mb-4">Product Types</h2>
      <Table
        columns={columns}
        data={products}
        onRowClick={(product) => navigate(`/product-types/${product.id}`)}
        onEdit={(product) => console.log("Edit", product)}
        onRemove={(product) => console.log("Remove", product)}
      />
    </div>
  );
};

export default ProductTypeList;
