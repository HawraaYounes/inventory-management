// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth, { action as authAction } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import EditProductTypeModal from "./components/EditProductTypeModal";

import { dashboardLoader } from "./loaders/dashboardLoader";
import { productTypeLoader } from "./loaders/productTypeLoader";

import { addProductTypeAction } from "./actions/addProductTypeAction";
import { editProductTypeAction } from "./actions/editProductTypeAction";
import { removeProductTypeAction } from "./actions/removeProductTypeAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    action: authAction,
  },
  {
    // single route handles both list and detail (items) views
    path: "/product-types/:productId?",
    element: <Dashboard />,
    loader: dashboardLoader,
    action: addProductTypeAction,
    children: [
      {
        // /product-types/:productId/edit
        path: "edit",
        element: <EditProductTypeModal />,
        loader: productTypeLoader,
        action: editProductTypeAction,
      },
      {
        // /product-types/:productId/remove
        path: "remove",
        action: removeProductTypeAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
