// In Dashboard.js (or a dedicated component for Product Types)
import React, { useState } from "react";
import ProductTypeList from "../components/ProductTypeList";
import AddPopup from "../components/AddPopup";
import Button from "../components/Button";
import styles from "../styles";

const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const productTypeFields = [
    { name: "name", label: "Product Type Name", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: false },
    { name: "image", label: "Upload Image", type: "file", required: false },
  ];

  const handleProductTypeSubmit = (data) => {
    console.log("New Product Type Data:", data);
    // You can call your API to add the product type here.
  };

  return (
    <div className={`${styles.paddingX} py-5`}>
      <div className="flex justify-between items-center mb-4 ">
        <div className="items-center">
          <h2 className="text-xl font-medium text-graydarkest">Product Types</h2>
        </div>
        <div className="">
          <Button
            variant="outline"
            label="Add new Product Type                                                               "
            onClick={() => setIsPopupOpen(true)}
          />
        </div>
      </div>

      <ProductTypeList className="bg-slate-900" />

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
