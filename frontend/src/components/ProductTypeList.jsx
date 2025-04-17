// src/components/ProductTypeList.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "./Table"; // adjust if path is different

const ProductTypeList = ({ products }) => {
  const navigate = useNavigate();

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (value) => (
        <img
          src={`http://localhost:8000/storage/${value}`}
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
    <div className="px-10">
      <Table
        columns={columns}
        data={products}
        onRowClick={(row) => navigate(`/product-types/${row.id}`)}
        onEdit={(row) => navigate(`/product-types/${row.id}/edit`)}
        onRemove={(row) => navigate(`/product-types/${row.id}/remove`)}
      />
    </div>
  );
};

export default ProductTypeList;
