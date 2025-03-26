import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  
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
