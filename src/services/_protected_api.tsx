import axios from "axios";
import globalDataStore from "../store/_globalData";
import userState, { decrypt } from "../store/_userState";
import AuthService from "./_auth";
export default function protectedApiService() {
  const _https = axios.create({
    baseURL: "https://dataspaceacademymanagement.in/api",
  });
  const { logout } = AuthService();
  const { accessToken } = userState();
  // console.log(decrypt(localStorage.getItem("access") || ""), accessToken);
  let authHeader = {
    headers: {
      authentication: accessToken,
    },
  };
  // console.log(authHeader);
  const { setAllAdmins, setAllFaculty, setAllStudents, setAllMarketing } =
    globalDataStore();
  const getAllStudents = async () => {
    try {
      const res = await _https.get("/student_course_all_report", authHeader);
      // console.log(res.data);
      setAllStudents(res.data);
      return res.data;
    } catch (e: any) {
      if (e.msg === "you are not an authorised user") {
        logout();
      }
      //  console.log("details", e);
    }
  };
  const getAllAdmins: any = async () => {
    try {
      const res = await _https.get("/get_admin", authHeader);
      // console.log(res.data);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      setAllAdmins(res.data);
      return res.data;
    } catch (e: any) {
      if (e.msg === "you are not an authorised user") {
      }
      /// console.log(e);
    }
  };
  const getAllFaculty = async () => {
    try {
      const res = await _https.get("/get_faculty_report_all", authHeader);
      // console.log(res.data);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      } else {
        setAllFaculty(res.data);
      }
      return res.data;
    } catch (e: any) {
      // console.log("error", e);
    }
  };
  const getAllMarketing = async () => {
    try {
      const res = await _https.get("/get_marketing_tean", authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      setAllMarketing(res.data);
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getAllSales = async () => {
    try {
      const res = await _https.get("/get_marketing_tean", authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      setAllMarketing(res.data);
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getClassSummery = async () => {
    try {
      const res_one = await _https.get("/today_all_reports", authHeader);
      if (res_one.data?.msg === "you are not an authorised user") {
      }
      // console.log(res.data);
      if (res_one.data) {
        // console.log({ ...res_one.data, ...res_two.data });
        return { ...res_one.data };
      }
    } catch (e) {
      //console.log(e);
    }
  };
  const getAdminAllReport = async () => {
    try {
      const res = await _https.get("/admin_all_reports", authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getFacultyDetails = async (id: any) => {
    try {
      const res = await _https.get("/get_faculty_details/" + id, authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getUserDetails = async (id: any) => {
    try {
      const res = await _https.get("/get_user_details/" + id, authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  ////// all protected post requests

  const postAddFacultyTiming = async (creeds: any) => {
    try {
      const res = await _https.post("/faculty_add_timing", creeds, authHeader);
      return res.data;
    } catch (e) {}
  };
  const postDeleteFacultyTiming = async (creeds: any) => {
    try {
      const res = await _https.get(
        `/delete_faculty_timing/${creeds}`,
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  return {
    getAllStudents,
    getAllFaculty,
    getAllAdmins,
    getClassSummery,
    getAdminAllReport,
    getAllMarketing,
    getFacultyDetails,
    getAllSales,
    getUserDetails,
    ///post requests
    postAddFacultyTiming,
    postDeleteFacultyTiming,
  };
}
