import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/user",
          element: <UserDetails />,
          errorElement: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
