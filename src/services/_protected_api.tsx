import axios from "axios";
import globalDataStore from "../store/_globalData";
import userState from "../store/_userState";
export default function protectedApiService() {
  const _https = axios.create({
    baseURL: "https://dataspaceacademymanagement.in/api",
  });
  const { accessToken } = userState();
  let authHeader = {
    headers: {
      authentication: accessToken,
    },
  };

  const { setAllAdmins, setAllFaculty, setAllStudents } = globalDataStore();
  const getAllStudents = async () => {
    try {
      const res = await _https.get("/get_all_students", authHeader);
      // console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getAllAdmins = async () => {
    try {
      const res = await _https.get("/get_admin", authHeader);
      // console.log(res.data);
      setAllAdmins(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getAllFaculty = async () => {
    try {
      const res = await _https.get("/faculties", authHeader);
      // console.log(res.data);
      setAllFaculty(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getClassSummery = async () => {
    try {
      const res_one = await _https.get("/today_all_reports", authHeader);
      const res_two = await _https.get("/admin_all_reports", authHeader);
      // console.log(res.data);
      if (res_one.data && res_two.data) {
        // console.log({ ...res_one.data, ...res_two.data });
        return { ...res_one.data, ...res_two.data };
      }
    } catch (e) {
      //console.log(e);
    }
  };
  const getAdminAllReport = async () => {
    try {
      const res = await _https.get("/admin_all_reports", authHeader);
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  return {
    getAllStudents,
    getAllFaculty,
    getAllAdmins,
    getClassSummery,
    getAdminAllReport,
  };
}
