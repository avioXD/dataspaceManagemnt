import axios from "axios";
import globalDataStore from "../store/_globalData";
export default function commonApiService() {
  const _https = axios.create({
    baseURL: "https://dataspaceacademy.com/api",
  });
  const { setAllCourses } = globalDataStore();
  const getAllCourses = async () => {
    try {
      const res = await _https.get("/get_all_courses/");
      // console.log(res.data);
      setAllCourses(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  return { getAllCourses };
}
