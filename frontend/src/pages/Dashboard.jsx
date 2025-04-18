// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import ProductTypeList from "../components/ProductTypeList";
import AddPopup from "../components/AddPopup";
import Button from "../components/ui/atoms/Button";
import styles from "../styles";
import { productTypeFields } from "../constants/productTypeFields";

const Dashboard = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const { products } = useLoaderData();

  return (
    <div className={`${styles.paddingX} py-5`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-graydarkest">
          Product Types
        </h2>
        <Button
          variant="outline"
          label="Add new Product Type"
          onClick={() => setIsAddPopupOpen(true)}
        />
      </div>

      <ProductTypeList products={products} />

      {isAddPopupOpen && (
        <AddPopup
          title="Add New Product Type"
          fields={productTypeFields}
          onClose={() => setIsAddPopupOpen(false)}
          // no actionUrl = posts back to /product-types → addProductTypeAction
        />
      )}

      {/* this renders <EditProductTypeModal> at /product‑types/:id/edit */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
