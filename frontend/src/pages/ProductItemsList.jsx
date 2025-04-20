// src/pages/ProductItemsList.jsx
import React from "react";
import { Form, useNavigate } from "react-router-dom";
import SearchableTable from "../components/ui/organisms/SearchableTable";

const ProductItemsList = ({ items }) => {
  const navigate = useNavigate();

  const columns = [
    { key: "id", label: "ID" },
    { key: "serial_number", label: "Serial Number" },
    {
      key: "is_sold",
      label: "Sold",
      render: (val, row) => (
        <Form
          method="put"
          action={`/api/items/${row.id}/sold`}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            name="is_sold"
            type="checkbox"
            checked={val}
            onChange={() => {}}
            className="cursor-pointer"
          />
        </Form>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <Form
            method="put"
            action={`/items/${row.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="text-blue-500 hover:underline">Edit</button>
          </Form>
          <Form
            method="delete"
            action={`items/${row.id}`} 
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
        localData={items}
        columns={columns}
        searchKey="serial_number"
        placeholder="Search serial numbers…"
        onRowClick={() => {}}
      />
    </div>
  );
};

export default ProductItemsList;
