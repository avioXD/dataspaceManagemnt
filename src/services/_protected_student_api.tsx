import axios from "axios";
import globalDataStore from "../store/_globalData";
import userState, { decrypt } from "../store/_userState";

import AuthService from "./_auth";
export default function protectedStudentApiService() {
  const _https = axios.create({
    baseURL: "https://dataspaceacademymanagement.in/api",
  });
  const { logout } = AuthService();
  const { accessToken, user } = userState();
  // console.log(decrypt(localStorage.getItem("access") || ""), accessToken);
  let authHeader = {
    headers: {
      authentication: accessToken,
    },
  };
  const createForm = (creeds: any) => {
    let formData = new FormData();
    Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
    return formData;
  };
  // console.log(authHeader);
  ////////////////////student requests
  const getStudentClasses = async () => {
    try {
      const res = await _https.get(
        "/student_class_get/" + user?.user_id,
        authHeader
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getStudentProgress = async () => {
    try {
      const res = await _https.get(
        "/get_student_student_steps/" + accessToken,
        authHeader
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  return {
    getStudentClasses,
    getStudentProgress,
  };
}
