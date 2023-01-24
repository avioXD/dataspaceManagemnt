import { Navigate } from "react-router-dom";
import Home from "../pages/home/home";
import Register from "../pages/register";
import Login from "../pages/login";
import adminRoutings from "./admin_route_paths";
import userState from "../store/_userState";
import superAdminRoutings from "./superadmin_route_paths";
import marketingRoutings from "./marketing_route_paths";
import facultyRoutings from "./faculty_route_paths";
import studentRoutings from "./studednt/student_routing_paths";
import ViewProfileDetails from "../pages/home/admin/common/view_profile";
import StudentDashboard from "../pages/home/student/student-dashboard";
import AllCertificates from "../pages/home/student/all-certificates";
import enrolledCourseRoutings from "./studednt/enrolled_courses_route";
import liveClassesRoutings from "./studednt/active_course_paths";
import { GoPerson } from "react-icons/go";
import skillUpCoursePaths from "./studednt/skillup_course_paths";

export const rootRouterPath = () => {
  const { user } = userState();
  const routings: any[] = [
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
      children:
        user?.role == 1
          ? superAdminRoutings()
          : user?.role == 2
          ? adminRoutings()
          : user?.role == 4
          ? marketingRoutings()
          : user?.role == 3
          ? facultyRoutings()
          : user?.role == 5
          ? studentRoutings()
          : [
              {
                route: "",
                path: "",
                shortcut: false,
                Element: <Navigate to="login" />,
                children: [],
              },
            ],
    },
    {
      route: "Student Classes",
      path: "StudentClasses",
      element: <Home />,
      shortcut: false,
      children:
        user?.role == 5
          ? liveClassesRoutings()
          : [
              {
                route: "",
                path: "",
                shortcut: false,
                Element: <Navigate to="login" />,
                children: [],
              },
            ],
    },
    {
      route: "Enrolled",
      path: "Enrolled",
      element: <Home />,
      shortcut: false,
      children:
        user?.role == 5
          ? enrolledCourseRoutings()
          : [
              {
                route: "",
                path: "",
                shortcut: false,
                Element: <Navigate to="login" />,
                children: [],
              },
            ],
    },
    {
      route: "Skill Up Module",
      path: "SkillUp",
      element: <Home />,
      shortcut: false,
      children:
        user?.role == 5
          ? skillUpCoursePaths()
          : [
              {
                route: "",
                path: "",
                shortcut: false,
                Element: <Navigate to="login" />,
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
  return { routings };
};
