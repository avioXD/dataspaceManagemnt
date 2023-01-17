import axios from "axios";
import globalDataStore from "../store/_globalData";
export default function commonApiService() {
  const _https = axios.create({
    baseURL: "http://dataspaceacademy.com/api",
  });
  const { setAllCourses } = globalDataStore();
  const getAllCourses = async () => {
    try {
      const res = await _https.get("/all_courses/");
      // console.log(res.data);
      setAllCourses(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  return { getAllCourses };
}
