import axios from "axios";
import AuthHooks from "../hooks/_authHooks";
import { getEncryptString, oF } from "../functions/_helperFunctions";
import AppTokenService from "./_appToken";
const _https = axios.create({
  baseURL: "https://dataspaceacademymanagement.in/api",
});

export default function AuthService() {
  //essentials
  const authHook = AuthHooks();
  const { getAppToken } = AppTokenService();
  //login
  const loginUser = async (creeds: any) => {
    //console.log("User Login");

    try {
      let formData = new FormData();
      Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
      // let formData = oF(creeds);
      console.log("Form Data", formData);
      const res: any = await _https.post("/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response", res.data);
      if (res.data.data.token && res.data.status) {
        // const user: any = await _https.get(
        //   "/get_user_details/" + res.data.data.user_id,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       authentication: res.data.data.token,
        //     },
        //   }
        // );
        // console.log(user);
        // const { data } = user;
        const prop: any = {
          username: res.data.data.username,
          user_id: res.data.data.user_id,
          role: res.data.data.role,
          status: res.data.data.status,
        };
        console.log(prop);
        authHook.useLogin(prop, res.data.data.token);
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const registerUser = async (creeds: any) => {
    //console.log("User Login");
    try {
      const res: any = await _https.post("/student_register", creeds);
      //console.log("Response", res.data);
      if (res.data.status) {
        return await loginUser(creeds);
      }
      res.data.status = 0;
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };

  return { loginUser, registerUser };
}
