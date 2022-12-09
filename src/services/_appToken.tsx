import axios from "axios";
const _https = axios.create({
  baseURL: "https://dataspaceacademymanagement.in/api",
});
export default function AppTokenService() {
  const getAppToken = async (user_id: any) => {
    try {
      const res: any = await _https.get(`/token_refresh_api_mobile/${user_id}`);
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log("error:", e);
    }
  };
  return { getAppToken };
}
