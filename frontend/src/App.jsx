// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth, { action as authAction } from "./pages/Auth";
import ProductItemsList from "./pages/ProductItemsList";
import { productTypesLoader } from "./loaders/dashboardLoader";
import { addProductTypeAction } from "./actions/addProductTypeAction";
import { editProductTypeAction } from "./actions/editProductTypeAction";
import { removeProductTypeAction } from "./actions/removeProductTypeAction";
import { productTypeLoader } from "./loaders/productTypeLoader";
import EditProductTypeModal from "./components/EditProductTypeModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    action: authAction,
  },
  {
    path: "/product-types",
    element: <Dashboard />,
    loader: productTypesLoader,
    action: addProductTypeAction,
    children: [
      {
        path: ":productId/edit",
        element: <EditProductTypeModal />,
        loader: productTypeLoader,
        action: editProductTypeAction,
      },
      {
        path: ":productId/remove",
        action: removeProductTypeAction,
      },
    ],
  },
  {
    path: "/product-types/:productId",
    element: <ProductItemsList />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
