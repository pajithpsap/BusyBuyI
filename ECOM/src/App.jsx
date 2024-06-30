// App.jsx
import "flowbite";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

import Signup from "./components/Signup";
import AuthProvider from "./components/AuthProvider"; // Import AuthProvider

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />, // Use AuthProvider as the top-level element
    children: [
      {
        path: "/",
        element: <Navbar />,
        children: [
          { index: true, element: <Home /> },
          { path: "orders", element: <Orders /> },
          { path: "cart", element: <Cart /> },
          { path: "login", element: <Signup /> },
          //{ path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
