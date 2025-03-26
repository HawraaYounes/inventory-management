import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth, { action } from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    action: action
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
