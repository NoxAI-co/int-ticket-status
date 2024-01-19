import SearchTicket from "./pages/SearchTicket";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ViewTicket from "./pages/ViewTicket";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <SearchTicket /> },
      { path: "ticket/:id", element: <ViewTicket /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
