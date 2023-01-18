import axios from "axios";
import globalDataStore from "../store/_globalData";
import userState, { decrypt } from "../store/_userState";

import AuthService from "./_auth";
export default function studentSkillUpApi() {
  const _https = axios.create({
    baseURL: "https://dataspaceacademymanagement.in/skillup/api",
  });
  const { logout } = AuthService();
  const { accessToken, user } = userState();
  // console.log(decrypt(localStorage.getItem("access") || ""), accessToken);
  let authHeader = {
    headers: {
      Authorization:
        "$2y$10$YRZaKwpyhCMDIOAFdzyYq.WlMutbIjyBjzjlhwB81ibCL3uFhPyZi",
    },
  };
  // console.log(authHeader);
  ////////////////////student requests
  const getStudentAssignments = async (course_id: any) => {
    try {
      const res = await _https.get(
        "/get_student_assignments/" + course_id + "/" + user.user_id
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getStudentProjects = async (course_id: any) => {
    try {
      const res = await _https.get("/get_student_projects/" + course_id);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getAllSkillUpCourses = async () => {
    try {
      const res = await _https.get("/get_all_skillup_courses", authHeader);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getCourseModules = async (module_id: any) => {
    try {
      const res = await _https.get(
        "/course_modules_get/" + module_id + "/" + user.user_id,
        authHeader
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getCourseProgress = async () => {
    try {
      const res = await _https.get(
        "/skillup_courses_get/" + user.user_id,
        authHeader
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const postAssignment = async (creeds: any) => {
    try {
      const res = await _https.post(
        "/submit_student_assigment",
        creeds,
        accessToken
      );
      return res.data;
    } catch (e) {}
  };

  return {
    getStudentAssignments,
    getStudentProjects,
    getAllSkillUpCourses,
    postAssignment,
    getCourseModules,
    getCourseProgress,
  };
}
