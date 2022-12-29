import axios from "axios";

import userState, { encrypt } from "../store/_userState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
const _https = axios.create({
  baseURL: "https://dataspaceacademymanagement.in/api",
});

export default function AuthService() {
  //essentials
  const { setUser, setAccessToken, accessToken } = userState();
  const navigate = useNavigate();

  //////////////////
  const setLogin = (user: any | null, token: string) => {
    if (!user) {
      setUser(null);
      setAccessToken("");
    } else {
      try {
        localStorage.setItem("bypass", encrypt(JSON.stringify(user)));
        localStorage.setItem("access", encrypt(token));
        setUser(user);
        setAccessToken(token);
        navigate("/Home");
      } catch (e) {
        console.log(e);
      }
    }
  };
  //login
  const loginUser = async (creeds: any) => {
    //console.log("User Login");
    try {
      let formData = new FormData();
      Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
      // let formData = oF(creeds);
      // console.log("Form Data", formData);
      const res: any = await _https.post("/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      if (res.data.status == 0) {
        setLogin(null, "");
        return res.data;
      }
      // console.log("Response", res.data);
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
        // console.log(prop);
        setLogin(prop, res.data.data.token);
        return res.data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async (creeds: any) => {
    //console.log("User Login");

    try {
      let formData = new FormData();
      Object.keys(creeds).map((item) => formData.append(item, creeds[item]));
      const res: any = await _https.post("/student_register", creeds);
      console.log("Response", res.data);
      if (res.data.status) {
        return await loginUser({
          username: creeds.email,
          password: creeds.password,
        });
      }
      res.data.status = 0;
      return res.data;
    } catch (e) {
      //console.log(e);
    }
  };
  const logout = () => {
    setUser(null);
    setAccessToken("");
    localStorage.removeItem("bypass");
    localStorage.removeItem("access");
    navigate("/login");
  };
  return { loginUser, signUp, logout };
}
