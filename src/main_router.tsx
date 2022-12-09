import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DataTable from "./common/data_table";
import Home from "./pages/home/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import { HiClipboardList, HiBriefcase } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import { RiNewspaperLine } from "react-icons/ri";
import EditAdmin from "./pages/home/admin/edit_admin";
import AllStudents from "./pages/home/admin/students/all_students";
import StudentIndex from "./pages/home/admin/students/student_index";
import SendMessage from "./pages/home/admin/students/send_message";
import StudentDetails from "./pages/home/admin/students/student_details";
import AdminDashboard from "./pages/home/admin/admin_dashboard";
import ProjectNotAssignedStudents from "./pages/home/admin/students/live_interactive/project_not_assigned";
import LiveInteractiveStudents from "./pages/home/admin/students/live_interactive/live_ineractive_students";
import ProjectAssignedStudents from "./pages/home/admin/students/live_interactive/project_assigned";
export const routings: any[] = [
  {
    route: "",
    path: "",
    element: <Home />,
    canActivate: false,
    children: [
      {
        route: "Base",
        path: "",
        element: <Navigate to="Dashboard" />,
        children: [],
      },
      {
        route: "Dashboard",
        path: "Dashboard",
        element: <AdminDashboard />,
        icon: <RiDashboardFill />,
        children: [],
      },
      {
        route: "Admin",
        path: "Admin",
        element: <EditAdmin />,
        icon: <GoPerson />,
        children: [],
      },
      {
        route: "Students",
        path: "Students",
        element: <StudentIndex />,
        icon: <FaUserGraduate />,
        children: [
          {
            route: "Base",
            path: "",
            element: <Navigate to="All Students" />,
            children: [],
          },
          {
            route: "All Students",
            path: "All Students",
            element: <AllStudents />,
            children: [],
          },
          {
            route: "Message",
            path: "Message",
            element: <StudentDetails />,
            children: [],
          },
          {
            route: "Live Interactive Students",
            path: "live",
            element: <LiveInteractiveStudents />,
            children: [
              {
                route: "Base",
                path: "",
                element: <Navigate to="Scheduled Students" />,
                children: [],
              },
              {
                route: "Scheduled Students",
                path: "Scheduled Students",
                element: <DataTable />,
                children: [],
              },
              {
                route: "Project Assigned",
                path: "Project Assigned",
                element: <ProjectAssignedStudents />,
                children: [],
              },
              {
                route: "Project Not Assigned",
                path: "Project Not Assigned",
                element: <ProjectNotAssignedStudents />,
                children: [],
              },
            ],
          },
        ],
      },
      {
        route: "Faculties",
        path: "faculties",
        element: <DataTable />,
        icon: <FaChalkboardTeacher />,
        children: [],
      },
      {
        route: "Sales",
        path: "sales",
        element: <DataTable />,
        icon: <BiStats />,
        children: [],
      },
      {
        route: "Reports",
        path: "reports",
        element: <DataTable />,
        icon: <HiClipboardList />,
        children: [],
      },
      {
        route: "Career",
        path: "career",
        element: <DataTable />,
        icon: <HiBriefcase />,
        children: [],
      },
      {
        route: "Payment Gateway",
        path: "p_gateway",
        element: <DataTable />,
        icon: <IoMdWallet />,
        children: [],
      },
      {
        route: "News",
        path: "news",
        element: <DataTable />,
        icon: <RiNewspaperLine />,
        children: [],
      },
      {
        route: "Notes",
        path: "notes",
        element: <DataTable />,
        icon: <RiNewspaperLine />,
        children: [],
      },
    ],
  },
  {
    route: "Register",
    path: "register",
    element: <Register />,
    children: [],
  },
  {
    route: "Login",
    path: "login",
    element: <Login />,
    children: [],
  },
];
const noAuthRoute = [
  {
    route: "",
    path: "",
    element: <Navigate to="/login" />,
    children: [],
  },
  {
    route: "Register",
    path: "register",
    element: <Register />,
    children: [],
  },
  {
    route: "Login",
    path: "login",
    element: <Login />,
    children: [],
  },
];
export default function MainRouter() {
  let routes;
  if (true) {
    routes = createBrowserRouter(routings);
  } else {
    routes = createBrowserRouter(noAuthRoute);
  }

  return <>{routes && <RouterProvider router={routes} />}</>;
}
