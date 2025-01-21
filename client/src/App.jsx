import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import User from "./pages/User";
import UserRegistration from "./pages/UserRegistration";
import UserLogin from "./pages/UserLogin";
import Layout from './Layout';
import Vehicle from "./pages/Vehicle";
import VehicleRegistration from './pages/VehicleRegistration';
import GetVehileDetails from './pages/GetVehileDetails';
import REgDetails from './pages/REgDetails';
import AdminPanel from './pages/AdminPanel';



const App = () => {
  

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact-us",
            element: <Contact />,
          },
          {
            path: "user-register",
            element: <UserRegistration />
          },
          {
            path: "user-login",
            element: <UserLogin/>
          },
          {
            path: "register-vehicle",
            element: <Vehicle />
          },
          {
            path: "user",
            element: <User />
          },
          {
            path: "reg-vech",
            element: <VehicleRegistration />
          },
          {
            path: "vech-Details",
            element: <GetVehileDetails />
          },
          {
            path: "reg-detail",
            element: <REgDetails />
          },
          {
            path: "admin-panel",
            element: <AdminPanel />
          },
        ]
      }
    ]
  );
  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
