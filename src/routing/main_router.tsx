import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DataTable from "../common/data_table";
import Home from "../pages/home/home";
import Login from "../pages/login";
import Register from "../pages/register";
import { useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import { HiClipboardList, HiBriefcase } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import { RiNewspaperLine } from "react-icons/ri";
import EditAdmin from "../pages/home/admin/edit_admin";
import AllStudents from "../pages/home/admin/students/all_students";
import StudentIndex from "../pages/home/admin/students/student_index";
import StudentDetails from "../pages/home/admin/students/student_details";
import AdminDashboard from "../pages/home/admin/admin_dashboard";
import ProjectNotAssignedStudents from "../pages/home/admin/students/live_interactive/project_not_assigned";
import LiveInteractiveStudents from "../pages/home/admin/students/live_interactive/outlet_live_ineractive_students";
import ProjectAssignedStudents from "../pages/home/admin/students/live_interactive/project_assigned";
import SendMessage from "../pages/home/admin/send_message";
import CourseCompletedStudents from "../pages/home/admin/students/live_interactive/course_completed";
import InterviewStudents from "../pages/home/admin/students/live_interactive/Interview";
import CourseNotCompletedStudents from "../pages/home/admin/students/live_interactive/course_not_completed";
import ScheduledStudents from "../pages/home/admin/students/live_interactive/scheduled_students";
import NotScheduledStudents from "../pages/home/admin/students/live_interactive/not_scheduled_student";
import InterviewNotCompleted from "../pages/home/admin/students/live_interactive/interview_not_completed";
import AddAdmin from "../pages/home/admin/add_admin";
import AllFaculty from "../pages/home/admin/faculty/all_faculty";
import AddFaculty from "../pages/home/admin/faculty/add_faculty";
import EditProfileDetails from "../pages/home/admin/common/edit_profile";
import ViewProfileDetails from "../pages/home/admin/common/view_profile";
import AddNewSchedule from "../pages/home/admin/students/live_interactive/new_schedule";
import AddMarketing from "../pages/home/admin/marketing/add_marketing";
import AllMarketing from "../pages/home/admin/marketing/all_marketing";
import SetFacultyTiming from "../pages/home/admin/faculty/set_faculty_timing";
import FacultyReport from "../pages/home/admin/reports/faculty_report";
import ReportsOutlet from "../pages/home/admin/reports/outlet_reports";
import { ToastContainer } from "react-toastify";
import SetStudentClass from "../pages/home/admin/students/live_interactive/set_get_schedule_calender/set_student_class";
import StudentsReport from "../pages/home/admin/reports/student_report";
import AddNews from "../pages/home/admin/news/mews_add";
import NewsView from "../pages/home/admin/news/news_view";
import Timeline from "../pages/home/admin/timeline";
import ViewStudentClass from "../pages/home/admin/students/live_interactive/view_student_class";
import ViewAllJobs from "../pages/home/admin/career/view_all_jobes";
import CareerOutlet from "../pages/home/admin/career/outlet_career";
import EditJobs from "../pages/home/admin/career/edit_jobs";
import AddJobs from "../pages/home/admin/career/add_jobs";
import { rootRouterPath } from "./router_paths";
import adminRoutings from "./admin_route_paths";
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
