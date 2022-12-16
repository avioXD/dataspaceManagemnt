import create from "zustand";

const store = create((set: any) => ({
  all_students: null,
  all_admins: null,
  all_faculty: null,
  all_marketing: null,
  all_sales: null,
  //functions
  set_all_students: (data: any) =>
    set((state: any) => {
      return {
        all_students: [...data],
      };
    }),
  set_all_admins: (data: any) =>
    set((state: any) => {
      return {
        all_admins: [...data],
      };
    }),
  set_all_faculty: (data: any) =>
    set((state: any) => {
      return {
        all_faculty: [...data],
      };
    }),
  set_all_marketing: (data: any) =>
    set((state: any) => {
      return {
        all_marketing: [...data],
      };
    }),
    set_all_sales: (data: any) =>
    set((state: any) => {
      return {
        all_marketing: [...data],
      };
    }),
}));

export default function globalDataStore() {
  const globalStore = {
    allStudents: store((state: any) => state.all_students),
    allAdmins: store((state: any) => state.all_admins),
    allFaculty: store((state: any) => state.all_faculty),
    allMarketing: store((state: any) => state.all_marketing),
    allSales: store((state: any) => state.all_sales),
    setAllStudents: store((state: any) => state.set_all_students),
    setAllAdmins: store((state: any) => state.set_all_admins),
    setAllFaculty: store((state: any) => state.set_all_faculty),
    setAllMarketing: store((state: any) => state.set_all_marketing),
    setAllSales: store((state: any) => state.set_all_sales),
  };

  return globalStore;
}
