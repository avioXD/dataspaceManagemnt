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
  // const createForm = (creeds: any) => {
  //   let formData = new FormData();
  //   Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
  //   return formData;
  // };
  // console.log(authHeader);
  ////////////////////student requests
  const getStudentClasses = async () => {
    try {
      const res = await _https.get(
        "/student_class_get/" + user?.user_id,
        authHeader
      );
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
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
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getStudentDetails = async (student_id: any = user.user_id) => {
    try {
      const res = await _https.get(
        "/get_student_details/" + student_id,
        authHeader
      );
      const res1 = await _https.get(
        "/get_student_atten/" + accessToken,
        authHeader
      );
      if (res1.data?.msg === "you are not an authorised user") {
        logout();
      }
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      return { ...res.data, ...res1.data };
    } catch (e) {
      console.log(e);
    }
  };
  const getStudentDetailsAll = async () => {
    try {
      const res1 = await _https.get(
        "/get_student_atten/" + accessToken,
        authHeader
      );
      const res2 = await _https.get(
        "/get_student_details_all/" + accessToken,
        authHeader
      );
      if (res1.data?.msg === "you are not an authorised user") {
        logout();
      }
      if (res2.data?.msg === "you are not an authorised user") {
        logout();
      }
      return { ...res1.data, ...res2.data };
    } catch (e) {
      console.log(e);
    }
  };
  const getAllBranch = async () => {
    try {
      const res = await _https.get("/counsellor_branches", authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getAllSchedule = async () => {
    try {
      const res = await _https.get(
        "/get_available_schedule_link_data_filter_date",
        authHeader
      );
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getAllJobs = async () => {
    try {
      const res = await _https.get("/get_jobs", authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const postApplyJob = async (creeds: any) => {
    try {
      let formData = new FormData();
      Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
      const res = await _https.post("/job_apply", formData, authHeader);
      return res.data;
    } catch (e) {}
  };
  const postRequestSchedule = async (creeds: any) => {
    try {
      const res = await _https.post(
        "/add_user_applied_schedule",
        { ...creeds, user_id: user.user_id },
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  return {
    getStudentClasses,
    getStudentProgress,
    getAllSchedule,
    getAllJobs,
    getStudentDetails,
    postApplyJob,
    getStudentDetailsAll,
    getAllBranch,
    postRequestSchedule,
  };
}
