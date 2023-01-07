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
import { CgGoogleTasks } from "react-icons/cg";
import { HiFolderOpen } from "react-icons/hi";
import { TbCertificate } from "react-icons/tb";
import LiveClassesList from "../../pages/home/student/enrolled/live_classes/live-classes-list";

import AllAssignments from "../../pages/home/student/enrolled/assignments/all_assignments";
import SpecificAssignments from "../../pages/home/student/enrolled/assignments/specific_assignment";

import AllProjects from "../../pages/home/student/enrolled/projects/all_projects";
import SpecificProjects from "../../pages/home/student/enrolled/projects/specific_project";
import AllResources from "../../pages/home/student/enrolled/resources/all_resouce";
import SelectedResource from "../../pages/home/student/enrolled/resources/selected_resources";
import CourseCertificate from "../../pages/home/student/enrolled/certificate";
export default function liveClassesRoutings() {
  const routes: any[] = [
    {
      route: "Base",
      path: "",
      element: <Navigate to="Courses" />,
      children: [],
      shortcut: true,
    },
    {
      route: "Back",
      path: "Back",
      element: <Navigate to="/Enrolled" />,
      icon: <MdArrowBack />,
      children: [],
      shortcut: true,
    },
    {
      route: "Live Classes",
      path: "Courses",
      element: <Outlet />,
      icon: <MdClass />,
      collapse: false,
      children: [
        {
          route: "Base",
          path: "",
          element: <Navigate to="LiveClass" />,
          children: [],
          shortcut: true,
        },
        {
          route: "Enrolled",
          path: "LiveClass",
          element: <LiveClassesList />,
          icon: <MdAccountBalanceWallet />,

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
      collapse: false,
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
          element: <AllAssignments />,
          icon: <MdAccountBalanceWallet />,
          collapse: false,
          children: [],
          shortcut: false,
        },
        {
          route: "Assignment Details",
          path: "Assignment Details",
          element: <SpecificAssignments />,
          icon: <MdAccountBalanceWallet />,
          collapse: false,
          children: [],
          shortcut: false,
        },
      ],
      shortcut: true,
    },
    {
      route: "Projects",
      path: "Projects",
      element: <Outlet />,
      icon: <CgGoogleTasks />,
      collapse: false,
      children: [
        {
          route: "Base",
          path: "",
          element: <Navigate to="AssignedProjects" />,
          children: [],
          shortcut: true,
        },
        {
          route: "AssignedProjects",
          path: "AssignedProjects",
          element: <AllProjects />,
          icon: <MdAccountBalanceWallet />,
          collapse: false,
          children: [],
          shortcut: false,
        },
        {
          route: "AssignedProjectsDetails",
          path: "AssignedProjectsDetails",
          element: <SpecificProjects />,
          icon: <MdAccountBalanceWallet />,
          collapse: false,
          children: [],
          shortcut: false,
        },
      ],
      shortcut: true,
    },
    {
      route: "Resources",
      path: "Resources",
      element: <Outlet />,
      icon: <HiFolderOpen />,
      collapse: false,
      children: [
        {
          route: "Base",
          path: "",
          element: <Navigate to="AllResources" />,
          children: [],
          shortcut: true,
        },
        {
          route: "All Resources",
          path: "AllResources",
          element: <AllResources />,
          icon: <MdAccountBalanceWallet />,
          collapse: false,
          children: [],
          shortcut: false,
        },
        {
          route: "Selected Resource",
          path: "SelectedResource",
          element: <SelectedResource />,
          icon: <MdAccountBalanceWallet />,
          collapse: false,
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
      collapse: false,
      children: [],
      shortcut: true,
    },
  ];

  return routes;
}
