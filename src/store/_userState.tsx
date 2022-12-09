import create from "zustand";

const store = create((set: any) => ({
  user_data: {},
  user_role: 0,
  access_token: "",
  is_login: false,
  //functions
  set_user_data: (data: any) =>
    set((state: any) => {
      return {
        user_data: data,
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
