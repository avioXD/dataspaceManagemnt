import { Navigate, Outlet } from "react-router-dom";
import { RiDashboardFill, RiPagesFill, RiNewspaperLine } from "react-icons/ri";
import { GoPerson, GoThreeBars } from "react-icons/go";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { MdAccountBalanceWallet, MdStickyNote2 } from "react-icons/md";
import StudentDashboard from "../../pages/home/student/student-dashboard";
import StudentJobs from "../../pages/home/student/jobs/student-jobs";
import AllCertificates from "../../pages/home/student/all-certificates";
import LiveInteractiveClasses from "../../pages/home/student/enrolled/live-interactive-courses";
import LiveClassesList from "../../pages/home/student/enrolled/live_classes/live-classes-list";
import AllFaculty from "../../pages/home/admin/faculty/all_faculty";

import AllCourseList from "../../pages/home/student/enrolled/allCourses/all_course_list";
import AlreadyEnrolledForm from "../../pages/home/student/enrolled/allCourses/already_enrolled_form";
export default function enrolledCourseRoutings() {
  const routes: any[] = [
    {
      route: "Base",
      path: "",
      element: <Navigate to="Live Interactive Courses" />,
      children: [],
      shortcut: true,
    },
    {
      route: "Main Menu",
      path: "Home",
      element: <Navigate to="/Home" />,
      icon: <GoThreeBars />,
      children: [],
      shortcut: true,
    },
    {
      route: "Enrolled",
      path: "Live Interactive Courses",
      element: <Outlet />,
      icon: <MdAccountBalanceWallet />,
      collapse: false,
      children: [
        {
          route: "Base",
          path: "",
          element: <Navigate to="Active Courses" />,
          children: [],
          shortcut: true,
        },
        {
          route: "Enrolled",
          path: "Active Courses",
          element: <LiveInteractiveClasses />,
          icon: <MdAccountBalanceWallet />,
          collapse: false,
          children: [],
          shortcut: false,
        },
      ],
      shortcut: true,
    },
    {
      route: "All Courses",
      path: "All Courses",
      element: <Outlet />,
      icon: <RiPagesFill />,
      collapse: false,
      children: [
        {
          route: "Base",
          path: "",
          element: <Navigate to="Courses" />,
          children: [],
          shortcut: false,
        },
        {
          route: "Enrolled",
          path: "Courses",
          element: <Outlet />,
          icon: <MdAccountBalanceWallet />,
          collapse: false,
          children: [
            {
              route: "Base",
              path: "",
              element: <AllCourseList />,
              children: [],
              shortcut: false,
            },
            {
              route: "Already Enrolled",
              path: "Already Enrolled",
              element: <AlreadyEnrolledForm />,
              icon: <MdAccountBalanceWallet />,
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
      route: "SkillUp Courses",
      path: "SkillUp Courses",
      element: <AllCertificates />,
      icon: <FaUserGraduate />,
      children: [],
      shortcut: true,
    },
    {
      route: "Jobs",
      path: "Jobs",
      element: <></>,
      icon: <FaChalkboardTeacher />,
      children: [],
      shortcut: true,
    },
    {
      route: "Articles",
      path: "Articles",
      element: <></>,
      icon: <MdStickyNote2 />,
      children: [],
      shortcut: true,
    },
  ];

  return routes;
}
