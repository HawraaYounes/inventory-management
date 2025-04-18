import React from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import AddPopup from "./AddPopup";
import { productTypeFields } from "../constants/productTypeFields";

const EditProductTypeModal = () => {
  const navigate = useNavigate();
  const { productType } = useLoaderData();

  // close modal by going back to parent route
  const handleClose = () => navigate(-1);

  return (
    <AddPopup
      title="Edit Product Type"
      fields={productTypeFields}
      initialValues={{
        name: productType.name,
        description: productType.description,
        // we won’t prefill file inputs
      }}
      actionUrl={`/product-types/${productType.id}/edit`}
      onClose={handleClose}
    />
  );
};

export default EditProductTypeModal;
