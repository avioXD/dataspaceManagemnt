import { Navigate, Outlet } from "react-router-dom";
import { RiDashboardFill, RiPagesFill, RiNewspaperLine } from "react-icons/ri";
import { GoPerson, GoThreeBars } from "react-icons/go";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import {
  MdAccountBalanceWallet,
  MdStickyNote2,
  MdAssignment,
  MdArrowBack,
  MdClass,
} from "react-icons/md";

import ModuleVideoPlayer from "../../pages/home/student/skillup/video_player";
import VideoModuleDashboard from "../../pages/home/student/skillup/moduel_dashboard";
import AllAssignments from "../../pages/home/student/enrolled/assignments/all_assignments";
import SpecificAssignments from "../../pages/home/student/enrolled/assignments/specific_assignment";
import CourseCertificate from "../../pages/home/student/enrolled/certificate";
import { TbCertificate } from "react-icons/tb";
import RecommendedCourse from "../../pages/home/student/enrolled/allCourses/recommended_course";
import SkillUpAssignment from "../../pages/home/student/enrolled/assignments/specfic_skillup_assignments";
export default function skillUpCoursePaths() {
  const routes: any[] = [
    {
      route: "Base",
      path: "",
      element: (props: any) => <Navigate to="Modules" {...props} />,
      children: [],
      shortcut: true,
    },
    {
      route: "Back",
      path: "Back",
      element: <Navigate to="/Enrolled/Skill Up Courses" />,
      icon: <MdArrowBack />,
      children: [],
      shortcut: true,
    },
    {
      route: "Modules",
      path: "Modules",
      element: <Outlet />,
      icon: <MdClass />,
      no_collapse: true,
      children: [
        {
          route: "Base",
          path: "",
          element: <VideoModuleDashboard />,
          children: [],
          shortcut: false,
        },
        {
          route: "Base",
          path: ":course_id/:course_name",
          element: <VideoModuleDashboard />,
          children: [],
          shortcut: false,
        },
      ],
      shortcut: true,
    },
    {
      route: "Assignments",
      path: "Assignments",
      element: <Outlet />,
      icon: <MdAssignment />,
      no_collapse: true,
      children: [
        {
          route: "Base",
          path: "",
          element: <Navigate to="Assigned" />,
          children: [],
          shortcut: true,
        },
        {
          route: "Assigned",
          path: "Assigned",
          element: <SkillUpAssignment />,
          icon: <MdAccountBalanceWallet />,
          no_collapse: true,
          children: [],
          shortcut: false,
        },
        {
          route: "Assignment Details",
          path: "Assignment Details",
          element: <SpecificAssignments />,
          icon: <MdAccountBalanceWallet />,
          no_collapse: true,
          children: [],
          shortcut: false,
        },
      ],
      shortcut: true,
    },
    {
      route: "Certificates",
      path: "Certificates",
      element: <CourseCertificate />,
      icon: <TbCertificate />,
      no_collapse: true,
      children: [],
      shortcut: true,
    },
    {
      route: "Upgrade",
      path: "Upgrade",
      element: <RecommendedCourse />,
      icon: <TbCertificate />,
      no_collapse: true,
      children: [],
      shortcut: true,
    },
  ];

  return routes;
}
