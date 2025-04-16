import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth, { action } from "./pages/Auth";
import ProductItemsList from "./pages/ProductItemsList";
import { productTypesLoader } from "./loaders/dashboardLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    action: action
  },
  {
    path: "/product-types",
    element: <Dashboard />,
    loader: productTypesLoader 
  },
  {
    path: "product-types/:productId",
    element: <ProductItemsList />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
