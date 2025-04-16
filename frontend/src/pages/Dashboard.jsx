// src/pages/Dashboard.jsx

import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductTypeList from "../components/ProductTypeList"; // Same page, not nested route
import AddPopup from "../components/AddPopup";
import Button from "../components/Button";
import styles from "../styles";

const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { products } = useLoaderData(); // Fetch product types via the loader

  const productTypeFields = [
    { name: "name", label: "Product Type Name", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: false },
    { name: "image", label: "Upload Image", type: "file", required: false },
  ];

  const handleProductTypeSubmit = (data) => {
    console.log("New Product Type Data:", data);
    // Call your API to add the product type here.
  };

  return (
    <div className={`${styles.paddingX} py-5`}>
      <div className="flex justify-between items-center mb-4">
        <div className="items-center">
          <h2 className="text-xl font-medium text-graydarkest">Product Types</h2>
        </div>
        <div>
          <Button
            variant="outline"
            label="Add new Product Type"
            onClick={() => setIsPopupOpen(true)}
          />
        </div>
      </div>

      <ProductTypeList products={products} /> {/* Pass the products data to ProductTypeList */}

      {isPopupOpen && (
        <AddPopup
          title="Add New Product Type"
          fields={productTypeFields}
          onSubmit={handleProductTypeSubmit}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
