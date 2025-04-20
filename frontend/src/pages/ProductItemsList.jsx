// src/pages/ProductItemsList.jsx
import React from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import SearchableTable from "../components/ui/organisms/SearchableTable";
import axios from "axios";
import { API_BASE_URL } from "../config";
import SoldCheckbox from "../components/ui/atoms/SoldCheckBox";
import FormModal from "../components/ui/organisms/FormModal";
import { editItemFields } from "../constants/editItemFields";

const ProductItemsList = ({ items }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [modalConfig, setModalConfig] = React.useState(null);

  const handleEdit = (item) => {
    setModalConfig({
      title: "Edit Item",
      fields: editItemFields,
      onClose: () => setModalConfig(null),
      actionUrl: `items/${item.id}/edit`, 
      initialValues: item,
    });
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "serial_number", label: "Serial Number" },
    {
      key: "is_sold",
      label: "Sold",
      render: (_, row) => <SoldCheckbox item={row} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
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

      {modalConfig && <FormModal {...modalConfig} />}
    </div>
  );
};


export default ProductItemsList;
