import React from "react";
import { useNavigate } from "react-router-dom";
import SearchableTable from "./ui/organisms/SearchableTable";
import FormModal from "./ui/organisms/FormModal";
import { productTypeFields } from "../constants/productTypeFields";

const ProductTypeList = ({ products }) => {
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = React.useState(null);

  const handleEdit = (product) => {
    setModalConfig({
      title: "Edit Product Type",
      fields: productTypeFields,
      onClose: () => setModalConfig(null),
      actionUrl: `/product-types/${product.id}/edit`,
      initialValues: product,
    });
  };

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
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    {
      key: "count",
      label: "Count",
      render: (_, row) => <span>{row.items_count}</span>,
    },
    {
      key: "actions", label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
          >
            Edit
          </button>
          <form
            method="delete"
            action={`/product-types/${row.id}/remove`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="text-red-500 hover:underline">Remove</button>
          </form>
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
      {modalConfig && <FormModal {...modalConfig} />}
    </div>
  );
};

export default ProductTypeList;
