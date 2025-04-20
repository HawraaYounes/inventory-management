import React from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import FormModal from "./ui/organisms/FormModal";
import { productTypeFields } from "../constants/productTypeFields";

const EditProductTypeModal = () => {
  const navigate = useNavigate();
  const { productType } = useLoaderData();

  const handleClose = () => navigate(-1);

  return (
    <FormModal
      title="Edit Product Type"
      fields={productTypeFields}
      initialValues={{
        name: productType.name,
        description: productType.description,
      }}
      actionUrl={`/product-types/${productType.id}/edit`}
      onClose={handleClose}
    />
  );
};

export default EditProductTypeModal;
