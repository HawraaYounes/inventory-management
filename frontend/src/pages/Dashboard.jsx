// src/pages/Dashboard.jsx
import React, { useState } from "react";
import {
  useLoaderData,
  useParams,
  Outlet,
  useNavigationType,
} from "react-router-dom";
import ProductTypeList from "../components/ProductTypeList";
import ProductItemsList from "./ProductItemsList"; // or wherever it lives
import FormModal from "../components/ui/organisms/FormModal";
import Button from "../components/ui/atoms/Button";
import styles from "../styles";
import { productTypeFields } from "../constants/productTypeFields";

const Dashboard = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // either loader gives you { products } or { items }
  const loaderData = useLoaderData();
  const { productId } = useParams();

  // if there's a productId in the URL, we're in ITEMS mode
  const mode = productId ? "items" : "productType";

  return (
    <div className={`${styles.paddingX} py-5`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-graydarkest">
          {mode === "productType"
            ? "Product Types"
            : "Items in Product #" + productId}
        </h2>
        {mode === "productType" ? (
          <Button
            variant="outline"
            label="Add new Product Type"
            onClick={() => setIsFormModalOpen(true)}
          />
        ) : (
          <Button
            variant="outline"
            label="Add new Item"
            onClick={() => /* open your AddItem modal */ {}}
          />
        )}
      </div>

      {mode === "productType" ? (
        <ProductTypeList products={loaderData.products} />
      ) : (
        <ProductItemsList items={loaderData.items} />
      )}

      {isFormModalOpen && (
        <FormModal
          title="Add New Product Type"
          fields={productTypeFields}
          onClose={() => setIsFormModalOpen(false)}
          // no actionUrl = posts back to /product-types → addProductTypeAction
        />
      )}

      {/* Renders <EditProductTypeModal> at /product‑types/:id/edit */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
