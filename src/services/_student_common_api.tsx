import axios from "axios";
import globalDataStore from "../store/_globalData";
import userState, { decrypt } from "../store/_userState";

import AuthService from "./_auth";
export default function studentCommonApi() {
  const _https = axios.create({
    baseURL: "https://dataspaceacademymanagement.in/skillup/api",
  });
  const { logout } = AuthService();
  const { accessToken, user } = userState();
  // console.log(decrypt(localStorage.getItem("access") || ""), accessToken);
  let authHeader = {
    headers: {
      authentication: accessToken,
    },
  };
  // console.log(authHeader);
  ////////////////////student requests
  const getStudentAssignments = async (course_id: any) => {
    try {
      const res = await _https.get("/get_student_assignments/" + course_id);
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
  return {
    getStudentAssignments,
    getStudentProjects,
  };
}
