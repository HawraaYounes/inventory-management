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
import { addItemAction } from "./actions/addItemAction";
import { removeItemAction } from "./actions/removeItemAction";
import { updateItemStatusAction } from "./actions/updateItemStatusAction";
import { editItemAction } from "./actions/editItemAction";

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
        path: "add-item",
        action: addItemAction, // this matches POST /product-types/:productId/add-item
      },
      { path: "items/:itemId", action: removeItemAction },
      {
        path: "items/:itemId/toggle-sold",
        action: updateItemStatusAction
      },
      {
        // /product-types/:productId/edit
        path: "edit",
        loader: productTypeLoader,
        action: editProductTypeAction,
      },
      {
        // /product-types/:productId/remove
        path: "remove",
        action: removeProductTypeAction,
      },
      
      {
        path: "items/:itemId/edit",
        action: editItemAction,
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
