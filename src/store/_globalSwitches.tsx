import create from "zustand";

const store = create((set: any) => ({
  inEnrolledCourse: false,
  setInEnrolledCourse: (data: any) =>
    set((state: any) => {
      return {
        inEnrolledCourse: data,
      };
    }),
}));
