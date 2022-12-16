import create from "zustand";
import * as CryptoJS from "crypto-js";
const secretKey: string = process.env.REACT_APP_SECRET_KEY
  ? process.env.REACT_APP_SECRET_KEY
  : "12345";
export const encrypt = (plainText: string) => {
  if (plainText.length) {
    const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return cipherText;
  }
  return "";
};

export const decrypt = (cipherText: string) => {
  if (cipherText?.length) {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
  }
  return "";
};

const getLocalUser = () => {
  const l_user: any = localStorage.getItem("bypass");
  console.log(decrypt(l_user));

  if (l_user) return JSON.parse(decrypt(l_user));
  return null;
};
const store = create((set: any) => ({
  user_data: getLocalUser(),
  user_role: 0,
  access_token: decrypt(localStorage.getItem("access") || ""),
  is_login: false,
  //functions
  set_user_data: (data: any) =>
    set((state: any) => {
      return {
        user_data: { ...data },
        is_login: data ? true : false,
      };
    }),
  set_access_token: (token: string) => set(() => ({ access_token: token })),
}));

export default function userState() {
  const userStore = {
    user: store((state: any) => state.user_data),
    role: store((state: any) => state.user_role),
    accessToken: store((state: any) => state.access_token),
    isLogin: store((state: any) => state.is_login),
    setUser: store((state: any) => state.set_user_data),
    setAccessToken: store((state) => state.set_access_token),
  };

  return userStore;
}
