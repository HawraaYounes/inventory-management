import React from "react";
import { Form, useNavigate } from "react-router-dom";
import Table from "./Table"; // assuming your custom Table component is here

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
    {
      key: "actions",
      label: "Actions",
      render: (value, row) => (
        <div className="flex gap-2">
          <Form
            method="post"
            action={`/product-types/${row.id}/edit`}
            onClick={(e) => e.stopPropagation()}
          >
            <input type="hidden" name="name" value={row.name} />
            <input
              type="hidden"
              name="description"
              value={row.description || ""}
            />
            <button type="submit" className="text-blue-500 hover:underline">
              Edit
            </button>
          </Form>

          <Form
            method="post"
            action={`/product-types/${row.id}/remove`}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="submit" className="text-red-500 hover:underline">
              Remove
            </button>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="px-10">
      <Table
        columns={columns}
        data={products}
        onRowClick={(row) => navigate(`/product-types/${row.id}`)}
      />
    </div>
  );
};

export default ProductTypeList;
