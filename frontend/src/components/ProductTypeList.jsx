// src/components/ProductTypeList.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

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
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="py-2 px-4 text-left">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column.key} className="py-2 px-4">
                  {column.render
                    ? column.render(product[column.key])
                    : product[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTypeList;
