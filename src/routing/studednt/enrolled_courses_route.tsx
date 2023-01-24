import { Navigate, Outlet } from "react-router-dom";
import { RiDashboardFill, RiPagesFill, RiNewspaperLine } from "react-icons/ri";
import { GoPerson, GoThreeBars } from "react-icons/go";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import {
  MdAccountBalanceWallet,
  MdArrowBack,
  MdStickyNote2,
} from "react-icons/md";
import StudentDashboard from "../../pages/home/student/student-dashboard";
import StudentJobs from "../../pages/home/student/jobs/student-jobs";
import AllCertificates from "../../pages/home/student/all-certificates";
import LiveInteractiveClasses from "../../pages/home/student/enrolled/live-interactive-courses";
import LiveClassesList from "../../pages/home/student/enrolled/live_classes/live-classes-list";
import AllFaculty from "../../pages/home/admin/faculty/all_faculty";

import AllCourseList from "../../pages/home/student/enrolled/allCourses/all_course_list";
import AlreadyEnrolledForm from "../../pages/home/student/enrolled/allCourses/already_enrolled_form";
import AllSkillUpCourseList from "../../pages/home/student/skillup/all_skillup_course";
import SelectedJobs from "../../pages/home/student/jobs/selected_job";
import { GiBookStorm, GiBookshelf, GiUpgrade } from "react-icons/gi";
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
      route: "Back",
      path: "Home",
      element: <Navigate to="/Home" />,
      icon: <MdArrowBack />,
      children: [],
      shortcut: true,
    },
    {
      route: "Active Courses",
      path: "Live Interactive Courses",
      element: <Outlet />,
      icon: <GiBookStorm />,
      no_collapse: true,
      children: [
        {
          route: "Base",
          path: "",
          element: <Navigate to="Active Courses" />,
          children: [],
          shortcut: true,
        },
        {
          route: "Active Courses",
          path: "Active Courses",
          element: <LiveInteractiveClasses />,
          icon: <MdAccountBalanceWallet />,
          no_collapse: true,
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
      icon: <GiBookshelf />,
      no_collapse: true,
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
          no_collapse: true,
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
      route: "Skill Up Courses",
      path: "Skill Up Courses",
      element: <Outlet />,
      icon: <GiUpgrade />,
      no_collapse: true,
      children: [
        {
          route: "Base",
          path: "",
          element: <AllSkillUpCourseList />,
          children: [],
          shortcut: false,
        },
      ],
      shortcut: true,
    },
    {
      route: "Jobs",
      path: "Jobs",
      no_collapse: true,
      element: <Outlet />,
      icon: <FaChalkboardTeacher />,
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
      shortcut: true,
    },
  ];

  return routes;
}
