import { Navigate, Outlet } from "react-router-dom";
import { RiDashboardFill, RiNewspaperLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import StudentDashboard from "../../pages/home/student/student-dashboard";
import StudentJobs from "../../pages/home/student/jobs/student-jobs";
import AllCertificates from "../../pages/home/student/all-certificates";
import SelectedJobs from "../../pages/home/student/jobs/selected_job";
import ViewProfileDetails from "../../pages/home/admin/common/view_profile";
import EditProfileDetails from "../../pages/home/admin/common/edit_profile";
import ViewStudentProfile from "../../pages/home/student/student_profile";
import Help from "../../pages/home/student/help";
import Support from "../../pages/home/faculty/support";
import StudentSupport from "../../pages/home/support";
import { BiHelpCircle, BiSupport } from "react-icons/bi";
import { GrCertificate } from "react-icons/gr";
import { GiOfficeChair } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";
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
      icon: <GiOfficeChair />,
      no_collapse: true,
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
          no_collapse: true,
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
              no_collapse: true,
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
      icon: <TbCertificate />,
      children: [],
      shortcut: true,
    },
    {
      route: "Support",
      path: "Support",
      element: <StudentSupport />,
      icon: <BiSupport />,
      children: [],
      shortcut: true,
    },
    {
      route: "Help",
      path: "Help",
      element: <Help />,
      icon: <BiHelpCircle />,
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
    {
      route: "Profile",
      path: "Profile",
      element: <Outlet />,
      icon: <GoPerson />,
      children: [
        {
          route: "",
          path: "",
          element: <ViewStudentProfile />,
          icon: <GoPerson />,
          children: [],
          shortcut: false,
        },
        {
          route: "Edit",
          path: "Edit",
          element: <ViewStudentProfile editable={true} />,
          icon: <GoPerson />,
          children: [],
          shortcut: false,
        },
      ],
      shortcut: false,
    },
  ];

  return routes;
}
