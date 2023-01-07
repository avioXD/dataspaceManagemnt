import { Navigate, Outlet } from "react-router-dom";
import { RiDashboardFill, RiNewspaperLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import StudentDashboard from "../../pages/home/student/student-dashboard";
import StudentJobs from "../../pages/home/student/jobs/student-jobs";
import AllCertificates from "../../pages/home/student/all-certificates";
import SelectedJobs from "../../pages/home/student/jobs/selected_job";
export default function studentRoutings() {
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
      element: <StudentDashboard />,
      icon: <RiDashboardFill />,
      children: [],
      shortcut: true,
    },
    {
      route: "Jobs",
      path: "Jobs",
      element: <Outlet />,
      icon: <GoPerson />,
      children: [
        {
          route: "Base",
          path: "",
          element: <Navigate to="All Jobs" />,
          children: [],
          shortcut: false,
        },
        {
          route: "All Jobs",
          path: "All Jobs",
          element: <Outlet />,
          collapse: false,
          children: [
            {
              route: "Base",
              path: "",
              element: <StudentJobs />,
              children: [],
              shortcut: false,
            },
            {
              route: "Selected Job",
              path: "Selected Job",
              element: <SelectedJobs />,
              collapse: false,
              children: [],
              shortcut: false,
            },
          ],
          shortcut: false,
        },
      ],
      shortcut: true,
    },
    {
      route: "Certificates",
      path: "Certificates",
      element: <AllCertificates />,
      icon: <GoPerson />,
      children: [],
      shortcut: true,
    },
    {
      route: "Support",
      path: "Support",
      element: <></>,
      icon: <FaChalkboardTeacher />,
      children: [],
      shortcut: true,
    },
    {
      route: "Enrolled",
      path: "Enrolled",
      element: <></>,
      icon: <FaChalkboardTeacher />,
      children: [],
      shortcut: false,
    },
  ];

  return routes;
}
