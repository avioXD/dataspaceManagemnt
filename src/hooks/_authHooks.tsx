import {
  addHours,
  createEncryptToken,
  getDecryptString,
  getEncryptString,
  validateEncryptedToken,
} from "../functions/_helperFunctions";
import AppTokenService from "../services/_appToken";
import userState from "../store/_userState";

export default function AuthHooks() {
  const { setUser, setAccessToken } = userState();

  const useSyncUser = async () => {
    const { getAppToken } = AppTokenService();
    try {
      const res: any = localStorage.getItem("USER");
      const access: any = localStorage.getItem("AccessToken");
      console.log(typeof res);

      if (res) {
        let access_token: string = "";
        let result: any = JSON.parse(res);
        console.log(result);
        if (access) {
          access_token = access;
        } else {
          const token_response: any = await getAppToken(result.user_id);
          access_token = token_response.token;
        }
        if (access_token) {
          // console.log({ ...res, token: obj.token });
          setUser({ ...result });
          setAccessToken(access_token);
          return true;
        } else {
          localStorage.removeItem("USER");
          localStorage.removeItem("AccessToken");
          return true;
        }
      } else {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const useLogin = (user: any | null, token: string) => {
    try {
      console.log(user, token);
      if (user) {
        console.log("useLogin", token);
        localStorage.setItem("USER", JSON.stringify(user));
        setUser(user);
      } else localStorage.removeItem("USER");

      if (token) {
        console.log("useLogin", token);
        localStorage.setItem("AccessToken", token);
        setAccessToken(token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const useLogout = () => {
    useLogin(null || {}, "");
  };

  return {
    useLogin,
    useLogout,
    useSyncUser,
  };
}
