import create from "zustand";

const store = create((set: any) => ({
  all_course_group: null,
  live_class: null,
  all_skill_up: null,
  skillUp_module: null,
  all_sales: null,
  all_courses: null,

  //functions
  set_live_class: (data: any) =>
    set((state: any) => {
      return {
        live_class: data,
      };
    }),
  set_all_skill_up: (data: any) =>
    set((state: any) => {
      return {
        all_skill_up: data,
      };
    }),
  set_all_faculty: (data: any) =>
    set((state: any) => {
      return {
        all_faculty: [...data],
      };
    }),
  set_skillUp_module: (data: any) =>
    set((state: any) => {
      return {
        skillUp_module: data,
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
    allSkillUp: store((state: any) => state.all_skill_up),
    skillUpModule: store((state: any) => state.skillUp_module),
    liveClass: store((state: any) => state.live_class),
    setAllSkillUp: store((state: any) => state.set_all_skill_up),
    allCoursesGroup: store((state: any) => state.all_course_group),
    setAllStudents: store((state: any) => state.set_all_students),
    setAllAdmins: store((state: any) => state.set_all_admins),
    setSkillUpModule: store((state: any) => state.set_skillUp_module),
    setLiveClass: store((state: any) => state.set_live_class),
    setAllCoursesGroup: store((state: any) => state.set_all_course_group),
  };

  return globalStore;
}
