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
  const createForm = (creeds: any) => {
    let formData = new FormData();
    Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
    return formData;
  };
  // console.log(authHeader);
  const {
    setAllAdmins,
    setAllFaculty,
    setAllStudents,
    setAllMarketing,
    setAllCourses,
  } = globalDataStore();
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
  const getAllStudentsReminder = async () => {
    try {
      const res = await _https.get(
        "/get_student_class_complete_reminder",
        authHeader
      );
      // console.log(res.data);
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
  const getAllNews = async () => {
    try {
      const res = await _https.get("/get_all_news", authHeader);
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
  const getStudentNotes = async (id: any) => {
    try {
      const res = await _https.get("/get_student_note/" + id, authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getStudentMessages = async (id: any) => {
    try {
      const res = await _https.get("/student-message/" + id, authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getStudentClasses = async (id: any) => {
    try {
      const res = await _https.get("/student_class_get/" + id, authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getFacultyTimingAll = async () => {
    try {
      const res = await _https.get("/get_faculty_details", authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getJobsAll = async () => {
    try {
      const res = await _https.get("/get_jobs", authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getStudentFacultyTiming = async (creeds: any) => {
    try {
      const res = await _https.post("/get_faculty_tm", creeds, authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getNotifications = async () => {
    try {
      const res = await _https.get(
        "/get_notification_data/" + accessToken,
        authHeader
      );
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const getMessages = async () => {
    try {
      const res = await _https.get(
        "/student-message/" + accessToken,
        authHeader
      );
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
  const postUpdateJob = async (creeds: any) => {
    try {
      let formData = new FormData();
      Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
      const res = await _https.post(
        "/update_job_student",
        formData,
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  const postAddJob = async (creeds: any) => {
    try {
      let formData = new FormData();
      Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
      const res = await _https.post("/add_job_student", formData, authHeader);
      return res.data;
    } catch (e) {}
  };
  const postAddNotes = async (creeds: any) => {
    try {
      let formData = new FormData();
      Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
      const res = await _https.post("/add_note_user", formData, authHeader);
      return res.data;
    } catch (e) {}
  };
  const postAssignProject = async (creeds: any) => {
    try {
      let formData = new FormData();
      Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
      const res = await _https.post(
        "/add_teacher_assign",
        formData,
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  const postAddFacultyTiming = async (creeds: any) => {
    try {
      const res = await _https.post("/faculty_add_timing", creeds, authHeader);
      return res.data;
    } catch (e) {}
  };
  const postAddMarketing = async (creeds: any) => {
    try {
      const res = await _https.post(
        "/marketing_add",
        createForm(creeds),
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  const postAddMessage = async (creeds: any) => {
    try {
      const res = await _https.post(
        "/add_user_message_data",
        creeds,
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  const postGiveStudentClass = async (creeds: any) => {
    try {
      const res = await _https.post("/student_class_set", creeds, authHeader);
      return res.data;
    } catch (e) {}
  };
  const postAddAdmin = async (creeds: any) => {
    try {
      const res = await _https.post(
        "/add_admin",
        createForm(creeds),
        authHeader
      );
      return res.data;
    } catch (e) {}
  };

  const postAddFaculty = async (creeds: any) => {
    try {
      const res = await _https.post(
        "/add_faculty",
        createForm(creeds),
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  const postAddNews = async (creeds: any) => {
    try {
      const res = await _https.post("/add_news_details", creeds, authHeader);
      return res.data;
    } catch (e) {}
  };
  /////////////delete requests
  const postDeleteFacultyTiming = async (creeds: any) => {
    try {
      const res = await _https.get(
        `/delete_faculty_timing/${creeds}`,
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  const postUpdateCourseCompleteStatus = async (creeds: any) => {
    try {
      const res = await _https.get(
        `/course_completed_status_change/${creeds}`,
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  const postUpdateProjectCompleteStatus = async (creeds: any) => {
    try {
      const res = await _https.post(
        `/course_student_interview`,
        creeds,
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  const deleteOneNews = async (creeds: any) => {
    try {
      const res = await _https.get(`/delete_news/${creeds}`, authHeader);
      return res.data;
    } catch (e) {}
  };
  const deleteJob = async (creeds: any) => {
    try {
      const res = await _https.get(`/delete_jobs/${creeds}`, authHeader);
      return res.data;
    } catch (e) {}
  };
  const deleteUser = async (creeds: any) => {
    try {
      const res = await _https.get(`/delete_user/${creeds}`, authHeader);
      return res.data;
    } catch (e) {}
  };
  const deleteStudentClass = async (creeds: any) => {
    try {
      const res = await _https.get(
        `/delete_student_class/${creeds}`,
        authHeader
      );
      return res.data;
    } catch (e) {}
  };
  const updateUserDetails = async (creeds: any) => {
    try {
      const res = await _https.post(
        `/delete_faculty_timing `,
        creeds,
        authHeader
      );
      return res.data;
    } catch (e) {}
  };

  const getFacultyevents = async () => {
    try {
      const res = await _https.get("/get_live_link_data_param", authHeader);
      // console.log(res.data);
      //setAllStudents(res.data);
      return res.data;
    } catch (e: any) {
      if (e.msg === "you are not an authorised user") {
        logout();
      }
      //  console.log("details", e);
    }
  };

  const get_student_remarks = async (user_id: any) => {
    try {
      const res = await _https.get(
        "/get_all_students_feedback/" + user_id,
        authHeader
      );
      return res.data;
    } catch (e: any) {
      if (e.msg === "you are not an authorised user") {
        logout();
      }
    }
  };

  const get_faculty_tming = async (id: any) => {
    // console.log(id);
    try {
      const res = await _https.get("get_faculty_tming/" + id, authHeader);
      //console.log(res.data);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch {}
  };

  const get_faculty_upcoming_classes = async (id: any) => {
    try {
      const res = await _https.get(
        "get_faculty_upcomming_classes/" + id,
        authHeader
      );
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch {}
  };

  const get_faculty_project = async (id: any) => {
    try {
      const res = await _https.get("faculty_project_assign/" + id, authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch {}
  };

  const faculty_project_assign_accepted = async (id: any) => {
    try {
      const res = await _https.get(
        "faculty_project_assign_final/" + id,
        authHeader
      );
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch {}
  };

  const student_present_absent_data_submit = async (data: any) => {
    try {
      const res = await _https.post("class_present_absent", data, authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch {}
  };

  const get_student_all_courses = async()=>{
    try{
    const res = await _https.get("get_courses");
    if (res.data?.msg === "you are not an authorised user") {
      logout();
    }
    // console.log(res.data);
    return res.data;
    }catch{

    }
  }

  const getAppliedJob = async()=>{
try{
  const res = await _https.get("get_user_job_apply",authHeader);
  if (res.data?.msg === "you are not an authorised user") {
    logout();
  }
  // console.log(res.data);
  return res.data;
}catch{

}
  }


  const course_add = async(data:any)=>{
    try{
    const res = await _https.post("add_course",data, authHeader);

    if (res.data?.msg === "you are not an authorised user") {
      logout();
    }
    // console.log(res.data);
    return res.data;
  } catch (e) {
    //console.log(e);
  }

  }

  const course_update = async(data:any)=>{
    try{
      const res = await _https.post("update_course",data, authHeader);
  
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  }

  const course_delete = async(id:any)=>{
try{
const res = await _https.get("delete_course/"+id,authHeader);
if (res.data?.msg === "you are not an authorised user") {
  logout();
}
// console.log(res.data);
return res.data;
}catch{

}
  }

  const update_student_details = ()=>{
    
  }

  const stud_update_details = async(data:any)=>{
    try{
    const res = await _https.post("stud_update_details",data,authHeader);
    if (res.data?.msg === "you are not an authorised user") {
      logout();
    }
  }catch{

  }

  }

  const fac_update_details = async(data:any)=>{
    try{
      const res = await _https.post("fac_update_details",data,authHeader);
      if (res.data?.msg === "you are not an authorised user") {
        logout();
      }
    }catch{

    }
  }

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
    postDeleteFacultyTiming,
    getFacultyTimingAll,
    getAllNews,
    getNotifications,
    getMessages,
    getJobsAll,
    getStudentNotes,
    getStudentMessages,
    getAllStudentsReminder,
    postUpdateCourseCompleteStatus,
    postUpdateProjectCompleteStatus,
    postAssignProject,

    ///post requests
    getStudentFacultyTiming,
    postAddFacultyTiming,
    postAddMarketing,
    postAddAdmin,
    getStudentClasses,
    postGiveStudentClass,
    deleteOneNews,
    postAddNews,
    postAddMessage,
    deleteJob,
    postUpdateJob,
    postAddFaculty,
    postAddJob,
    postAddNotes,
    updateUserDetails,
    deleteUser,
    deleteStudentClass,
    getFacultyevents,
    get_student_remarks,
    get_faculty_tming,
    get_faculty_upcoming_classes,
    get_faculty_project,
    faculty_project_assign_accepted,
    student_present_absent_data_submit,
    get_student_all_courses,
    getAppliedJob,
    course_add,
    course_update,
    course_delete,
    update_student_details,
    stud_update_details,
    fac_update_details
  };
}
