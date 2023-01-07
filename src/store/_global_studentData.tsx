import create from "zustand";

const store = create((set: any) => ({
  all_course_group: null,
  live_class: null,
  all_faculty: null,
  all_marketing: null,
  all_sales: null,
  all_courses: null,

  //functions
  set_live_class: (data: any) =>
    set((state: any) => {
      return {
        live_class: data,
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
  set_all_course_group: (data: any) =>
    set((state: any) => {
      return {
        all_course_group: data,
      };
    }),
}));

export default function studentGlobalDataStore() {
  const globalStore = {
    allStudents: store((state: any) => state.all_students),
    allAdmins: store((state: any) => state.all_admins),
    allFaculty: store((state: any) => state.all_faculty),
    allMarketing: store((state: any) => state.all_marketing),
    liveClass: store((state: any) => state.live_class),
    allCoursesGroup: store((state: any) => state.all_course_group),
    setAllStudents: store((state: any) => state.set_all_students),
    setAllAdmins: store((state: any) => state.set_all_admins),
    setAllFaculty: store((state: any) => state.set_all_faculty),
    setAllMarketing: store((state: any) => state.set_all_marketing),
    setLiveClass: store((state: any) => state.set_live_class),
    setAllCoursesGroup: store((state: any) => state.set_all_course_group),
  };

  return globalStore;
}
