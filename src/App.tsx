import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import AppLayout from "./components/AppLayout";
import Display from "./pages/Display";
import DefaultPage from "./pages/DefaultPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/display/:isItMovie/:id",
        element: <Display />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "*",
        element: <DefaultPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
