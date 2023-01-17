import { Navigate, RouterProvider } from "react-router-dom";
import { RiDashboardFill, RiNewspaperLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import Schedule from "../pages/home/faculty/Schedule";
import StudentRemarks from "../pages/home/faculty/student_remarks";
import Studentevents from "../pages/home/faculty/events";
import Projects from "../pages/home/faculty/project";
import Support from "../pages/home/faculty/support";
import Facultydashboard from "../pages/home/faculty/dashboard";

export default function facultyRoutings() {
  const routes: any[] = [
    {
      route: "Base",
      path: "",
      element: <Navigate to="Dashboard" />,
      children: [],
      shortcut: true,
    },
    {
      route: "Dashboard",
      path: "Dashboard",
      element: <Facultydashboard />,
      icon: <RiDashboardFill />,
      children: [],
      shortcut: true,
    },
    {
      route: "Schedule",
      path: "Schedule",
      element: <Schedule />,
      icon: <GoPerson />,
      children: [],
      shortcut: true,
    },

    {
      route: "Student Remarks",
      path: "Student Remarks",
      element: <StudentRemarks />,
      icon: <GoPerson />,
      children: [],
      shortcut: true,
    },

    {
      route: "Projects",
      path: "Projects",
      element: <Projects />,
      icon: <GoPerson />,
      children: [],
      shortcut: true,
    },

    {
      route: "Events",
      path: "Events",
      element: <Studentevents />,
      icon: <GoPerson />,
      children: [],
      shortcut: true,
    },

    {
      route: "Support",
      path: "Support",
      element: <Support />,
      icon: <GoPerson />,
      children: [],
      shortcut: true,
    },
    
  ];
  return routes;
}
