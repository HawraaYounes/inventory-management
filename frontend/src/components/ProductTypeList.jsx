import React from "react";
import { Form, useNavigate } from "react-router-dom";
import SearchableTable from "./ui/organisms/SearchableTable"

const ProductTypeList = ({ products }) => {
  console.log(products,"ProductTypeList");
  const navigate = useNavigate();

  const columns = [
    {
      key: "image", label: "Image",
      render: (val) => (
        <img
          src={`http://localhost:8000/storage/${val}`}
          alt="Product"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    { key: "id",    label: "ID" },
    { key: "name",  label: "Name" },
    {
      key: "count",
      label: "Count",
      render: (_, row) => (
        <span>{row.items_count}</span>  
      ),
    },
    {
      key: "actions", label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <Form
            method="get"
            action={`/product-types/${row.id}/edit`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="text-blue-500 hover:underline">Edit</button>
          </Form>
          <Form
            method="delete"
            action={`/product-types/${row.id}/remove`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="text-red-500 hover:underline">Remove</button>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="px-10">
      <SearchableTable
        localData={products}
        columns={columns}
        searchKey="name"
        placeholder="Search product types…"
        onRowClick={(row) => navigate(`${row.id}`)}
      />
    </div>
  );
};

export default ProductTypeList;
