// src/pages/Dashboard.jsx

import React, { useState } from "react";
import {
  useLoaderData,
  useParams,
  Outlet,
} from "react-router-dom";

import ProductTypeList from "../components/ProductTypeList";
import ProductItemsList from "./ProductItemsList";
import FormModal from "../components/ui/organisms/FormModal";
import Button from "../components/ui/atoms/Button";
import styles from "../styles";

import { productTypeFields } from "../constants/productTypeFields";
import { itemFields } from "../constants/itemFields"; // Create this like productTypeFields

const Dashboard = () => {
  const loaderData = useLoaderData();
  const { productId } = useParams();

  // One modal config for both forms
  const [modalConfig, setModalConfig] = useState(null);

  const mode = productId ? "items" : "productType";

  // Handles opening the modal for both modes
  const handleOpenModal = () => {
    if (mode === "productType") {
      setModalConfig({
        title: "Add New Product Type",
        fields: productTypeFields,
        onClose: () => setModalConfig(null),
        actionUrl: "/product-types",
        // Optionally add: actionUrl, method, defaultValues, etc.
      });
    } else {
      setModalConfig({
        title: "Add New Item",
        fields: itemFields,
        onClose: () => setModalConfig(null),
        actionUrl: `/product-types/${productId}/add-item`
      });
    }
  };

  return (
    <div className={`${styles.paddingX} py-5`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-graydarkest">
          {mode === "productType"
            ? "Product Types"
            : `Items in Product #${productId}`}
        </h2>

        <Button
          variant="outline"
          label={mode === "productType" ? "Add new Product Type" : "Add new Item"}
          onClick={handleOpenModal}
        />
      </div>

      {mode === "productType" ? (
        <ProductTypeList products={loaderData.products} />
      ) : (
        <ProductItemsList items={loaderData.items} />
      )}

      {modalConfig && (
        <FormModal
          {...modalConfig}
        />
      )}

      <Outlet />
    </div>
  );
};

export default Dashboard;
