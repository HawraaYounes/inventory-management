import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth, { action } from "./pages/Auth";
import ProductItemsList from "./pages/ProductItemsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    action: action
  },
  {
    path: "/product-types",
    element: <Dashboard />,
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
