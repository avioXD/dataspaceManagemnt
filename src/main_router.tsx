import React from "react";
import "react-toastify/dist/ReactToastify.css";
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
import StudentDetails from "./pages/home/admin/students/student_details";
import AdminDashboard from "./pages/home/admin/admin_dashboard";
import ProjectNotAssignedStudents from "./pages/home/admin/students/live_interactive/project_not_assigned";
import LiveInteractiveStudents from "./pages/home/admin/students/live_interactive/outlet_live_ineractive_students";
import ProjectAssignedStudents from "./pages/home/admin/students/live_interactive/project_assigned";
import SendMessage from "./pages/home/admin/send_message";
import CourseCompletedStudents from "./pages/home/admin/students/live_interactive/course_completed";
import InterviewStudents from "./pages/home/admin/students/live_interactive/Interview";
import CourseNotCompletedStudents from "./pages/home/admin/students/live_interactive/course_not_completed";
import ScheduledStudents from "./pages/home/admin/students/live_interactive/scheduled_students";
import NotScheduledStudents from "./pages/home/admin/students/live_interactive/not_scheduled_student";
import InterviewNotCompleted from "./pages/home/admin/students/live_interactive/interview_not_completed";
import AddAdmin from "./pages/home/admin/add_admin";
import AllFaculty from "./pages/home/admin/faculty/all_faculty";
import AddFaculty from "./pages/home/admin/faculty/add_faculty";
import EditProfileDetails from "./pages/home/admin/common/edit_profile";
import ViewProfileDetails from "./pages/home/admin/common/view_profile";
import AddNewSchedule from "./pages/home/admin/students/live_interactive/new_schedule";
import AddMarketing from "./pages/home/admin/marketing/add_marketing";
import AllMarketing from "./pages/home/admin/marketing/all_marketing";
import SetFacultyTiming from "./pages/home/admin/faculty/set_faculty_timing";
import FacultyReport from "./pages/home/admin/reports/faculty_report";
import ReportsOutlet from "./pages/home/admin/reports/outlet_reports";
import { ToastContainer } from "react-toastify";
import SetStudentClass from "./pages/home/admin/students/live_interactive/set_get_schedule_calender/set_student_class";
import StudentsReport from "./pages/home/admin/reports/student_report";
import AddNews from "./pages/home/admin/news/mews_add";
import NewsView from "./pages/home/admin/news/news_view";
import Timeline from "./pages/home/admin/timeline";
import ViewStudentClass from "./pages/home/admin/students/live_interactive/view_student_class";
import ViewAllJobs from "./pages/home/admin/career/view_all_jobes";
import CareerOutlet from "./pages/home/admin/career/outlet_career";
import EditJobs from "./pages/home/admin/career/edit_jobs";
import AddJobs from "./pages/home/admin/career/add_jobs";

export const routings: any[] = [
  {
    route: "",
    path: "",
    element: <Navigate to="login" />,
    children: [],
    shortcut: false,
  },
  {
    route: "Home",
    path: "Home",
    element: <Home />,
    shortcut: false,
    children: [
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
        element: <AdminDashboard />,
        icon: <RiDashboardFill />,
        children: [],
        shortcut: true,
      },
      {
        route: "Admin",
        path: "Admin",
        element: <EditAdmin />,
        icon: <GoPerson />,
        children: [],
        shortcut: true,
      },
      {
        route: "Add Admins",
        path: "Add Admins",
        element: <AddAdmin />,
        icon: <GoPerson />,
        children: [],
        shortcut: false,
      },
      {
        route: "View Profile",
        path: "View Profile",
        element: <ViewProfileDetails />,
        icon: <GoPerson />,
        children: [],
        shortcut: false,
      },
      {
        route: "Edit Profile",
        path: "Edit Profile",
        element: <EditProfileDetails />,
        icon: <GoPerson />,
        children: [],
        shortcut: false,
      },
      {
        route: "Students",
        path: "Students",
        element: <StudentIndex />,
        icon: <FaUserGraduate />,
        shortcut: true,
        children: [
          {
            route: "Base",
            path: "",
            element: <Navigate to="All Students" />,
            children: [],
            shortcut: true,
          },
          {
            route: "Message",
            path: "Message",
            element: <SendMessage />,
            children: [],
            shortcut: false,
          },
          {
            route: "All Students",
            path: "All Students",
            element: <AllStudents />,
            children: [],
            shortcut: true,
          },
          {
            route: "View Student Class",
            path: "View Student Class",
            element: <ViewStudentClass />,
            children: [],
            shortcut: false,
          },

          {
            route: "Live Interactive Students",
            path: "live",
            element: <LiveInteractiveStudents />,
            shortcut: true,
            children: [
              {
                route: "Base",
                path: "",
                element: <Navigate to="Scheduled Students" />,
                children: [],
                shortcut: false,
              },
              {
                route: "Add New Schedule",
                path: "Add New Schedule",
                element: <AddNewSchedule />,
                shortcut: true,
                children: [],
              },
              {
                route: "Scheduled Students",
                path: "Scheduled Students",
                element: <ScheduledStudents />,
                shortcut: true,
                children: [],
              },
              {
                route: "Not Scheduled Students",
                path: "Not Scheduled Students",
                element: <NotScheduledStudents />,
                shortcut: true,
                children: [],
              },
              {
                route: "Set Student Class",
                path: "Set Student Class",
                element: <SetStudentClass />,
                shortcut: false,
                children: [],
              },
              {
                route: "Course Completed",
                path: "Course Completed",
                element: <CourseCompletedStudents />,
                shortcut: true,
                children: [],
              },
              {
                route: "Course Complete Reminder",
                path: "Course Complete Reminder",
                element: <CourseNotCompletedStudents />,
                shortcut: true,
                children: [],
              },

              {
                route: "Project Assigned",
                path: "Project Assigned",
                element: <ProjectAssignedStudents />,
                children: [],
                shortcut: true,
              },
              {
                route: "Project Not Assigned",
                path: "Project Not Assigned",
                element: <ProjectNotAssignedStudents />,
                children: [],
                shortcut: true,
              },
              {
                route: "Interview Completed",
                path: "Interview Completed",
                element: <InterviewStudents />,
                children: [],
                shortcut: true,
              },
              {
                route: "Interview Not Completed",
                path: "Interview Not Completed",
                element: <InterviewNotCompleted />,
                children: [],
                shortcut: true,
              },

              {
                route: "View Student",
                path: "View Student",
                element: <StudentDetails />,
                children: [],
                shortcut: false,
              },
            ],
          },
        ],
      },
      {
        route: "Faculties",
        path: "faculties",
        element: <AllFaculty />,
        icon: <FaChalkboardTeacher />,
        children: [],
        shortcut: true,
      },
      {
        route: "Set Faculty Timing",
        path: "Set Faculty Timing",
        element: <SetFacultyTiming />,
        icon: <GoPerson />,
        children: [],
        shortcut: false,
      },
      {
        route: "Add Faculty",
        path: "Add Faculty",
        element: <AddFaculty />,
        icon: <GoPerson />,
        children: [],
        shortcut: false,
      },
      {
        route: "Marketing",
        path: "Marketing",
        element: <AllMarketing />,
        icon: <BiStats />,
        children: [],
        shortcut: true,
      },
      {
        route: "Add Marketing",
        path: "Add Marketing",
        element: <AddMarketing />,
        icon: <GoPerson />,
        children: [],
        shortcut: false,
      },
      {
        route: "Reports",
        path: "reports",
        element: <ReportsOutlet />,
        icon: <HiClipboardList />,
        children: [
          {
            route: "Faculty Report",
            path: "Faculty Report",
            element: <FacultyReport />,
            icon: <HiBriefcase />,
            children: [],
            shortcut: true,
          },
          {
            route: "Student Report",
            path: "Student Report",
            element: <StudentsReport />,
            icon: <HiBriefcase />,
            children: [],
            shortcut: true,
          },
        ],
        shortcut: true,
      },
      {
        route: "Career",
        path: "Career",
        element: <CareerOutlet />,
        icon: <HiBriefcase />,
        children: [
          {
            route: "View All Jobs",
            path: "View All Jobs",
            element: <ViewAllJobs />,
            icon: <HiBriefcase />,
            children: [],
            shortcut: true,
          },
          {
            route: "Edit Jobs",
            path: "Edit Jobs",
            element: <EditJobs />,
            icon: <HiBriefcase />,
            children: [],
            shortcut: false,
          },
          {
            route: "Add Jobs",
            path: "Add Jobs",
            element: <AddJobs />,
            icon: <HiBriefcase />,
            children: [],
            shortcut: false,
          },
        ],
        shortcut: true,
      },
      {
        route: "Payment Gateway",
        path: "p_gateway",
        element: <DataTable />,
        icon: <IoMdWallet />,
        children: [],
        shortcut: true,
      },
      {
        route: "News",
        path: "news",
        element: <NewsView />,
        icon: <RiNewspaperLine />,
        children: [],
        shortcut: true,
      },
      {
        route: "Add News",
        path: "add news",
        element: <AddNews />,
        icon: <RiNewspaperLine />,
        children: [],
        shortcut: false,
      },
      // {
      //   route: "Notes",
      //   path: "notes",
      //   element: <DataTable />,
      //   icon: <RiNewspaperLine />,
      //   children: [],
      //   shortcut: true,
      // },
      {
        route: "Message",
        path: "Message",
        element: <SendMessage />,
        children: [],
        shortcut: false,
      },
      {
        route: "Timeline",
        path: "Timeline",
        element: <Timeline />,
        children: [],
        shortcut: false,
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
      {routes && <RouterProvider router={routes} />}
    </>
  );
}
