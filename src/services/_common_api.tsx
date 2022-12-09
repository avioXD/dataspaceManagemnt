import axios from "axios";
export default function commonApiService() {
  const _https = axios.create({
    baseURL: "https://management.dataspaceacademy.com/api",
  });
  const getCourses = async () => {
    try {
      const res = await _https.get("/get_courses");
      // console.log(res.data);
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  return { getCourses };
}
