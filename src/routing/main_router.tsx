import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { rootRouterPath } from "./router_paths";

import { AnimatePresence, motion } from "framer-motion";
export default function MainRouter() {
  let routes;
  const { routings } = rootRouterPath();
  if (true) {
    routes = createBrowserRouter(routings);
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      {routes && (
        <AnimatePresence>
          <RouterProvider router={routes} />
        </AnimatePresence>
      )}
    </>
  );
}
