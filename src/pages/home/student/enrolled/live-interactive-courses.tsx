import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlinePersonPin, MdOutlineDoneOutline } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";
import { GoChecklist } from "react-icons/go";
import protectedStudentApiService from "../../../../services/_protected_student_api";
import studentGlobalDataStore from "../../../../store/_global_studentData";
import { ProgressBar } from "react-bootstrap";
export default function LiveInteractiveClasses() {
  const navigate: any = useNavigate();
  const [filtered_courses, set_Filtered_course] = useState<any[]>([]);
  const [progress_steps, setProgressSteps] = useState<any>([]);
  useEffect(() => {
    getCourses();
    getProgress();
  }, []);
  const { getStudentClasses, getStudentProgress } =
    protectedStudentApiService();
  const { setAllCoursesGroup, setLiveClass } = studentGlobalDataStore();
  const getProgress = async () => {
    const res: any = await getStudentProgress();
    setProgressSteps(res);
  };

  const getCourses = async () => {
    const res: any = await getStudentClasses();
    setRunningCourses(res);
  };
  function groupBy(arr: any, property: any) {
    return arr.reduce(function (memo: any, x: any) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  const setRunningCourses = (data: any) => {
    var course_set: any = [];
    data.forEach((element: any) => {
      course_set.push(element.course_name);
    });
    let uniqueItems: any = [...new Set(course_set)];
    let items = groupBy(data, "course_name");
    // console.log(items);
    setAllCoursesGroup(items);
    let grouped_course = uniqueItems.map((x: any) => {
      return {
        classList: items[x],
        course_name: x,
        course_id: items[x][0].course_id,
        total_classes: items[x].length,
        faculty: items[x][0].name,
        duration: items[x][0].duration,
        class_completed: items[x].reduce(
          (accumulator: any, current: any) =>
            accumulator + current.class_completed,
          0
        ),
        course: items[x][0].course,
        avg_duration:
          items[x].reduce(
            (accumulator: any, current: any) =>
              accumulator + parseInt(current.duration),
            0
          ) / items[x].length,
      };
    });
    set_Filtered_course(grouped_course);
  };
  const redirectToLiveClass = (x: any) => {
    setLiveClass(x);
    navigate("/StudentClasses/Courses/LiveClass");
  };
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <div className="row">
            <div className="col-sm-3 flex-start">
              <h5 className="heading">Enrolled Courses</h5>
            </div>
            <div className="col-sm-9">
              <div id="setps" className="steps">
                {progress_steps.map((ps: any, index: any) => {
                  return (
                    <>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="track">
                            <div
                              className="step active"
                              data-aos="zoom-in"
                              data-aos-offset="300"
                              data-aos-easing="ease-in-sine"
                            >
                              {" "}
                              <span className="icon">
                                {" "}
                                <GiArchiveRegister className="" />
                              </span>{" "}
                              <span className="text">Enrolled</span>{" "}
                            </div>
                            <div
                              className={`step ${
                                ps.assign_class == 1 ? "active" : ""
                              }`}
                              data-aos="zoom-in"
                              data-aos-offset="300"
                              data-aos-anchor="#right-screen"
                              data-aos-easing="ease-in-sine"
                            >
                              {" "}
                              <span className="icon">
                                {" "}
                                <SiGoogleclassroom />
                              </span>{" "}
                              <span className="text"> Assigned Class</span>{" "}
                            </div>
                            <div
                              className={`step ${
                                ps.course_completed == 1 ? "active" : ""
                              }`}
                              data-aos="zoom-in"
                              data-aos-offset="300"
                              data-aos-anchor="#right-screen"
                              data-aos-easing="ease-in-sine"
                            >
                              {" "}
                              <span className="icon">
                                {" "}
                                <GoChecklist />
                              </span>{" "}
                              <span className="text">
                                Course Completed
                              </span>{" "}
                            </div>
                            <div
                              className={`step ${
                                ps.project_assigned == 1 ? "active" : ""
                              }`}
                              data-aos="zoom-in"
                              data-aos-anchor="#right-screen"
                              data-aos-offset="300"
                              data-aos-easing="ease-in-sine"
                            >
                              {" "}
                              <span className="icon">
                                {" "}
                                <AiOutlineProject />
                              </span>{" "}
                              <span className="text">
                                Project Assigned
                              </span>{" "}
                            </div>
                            <div
                              className={`step ${
                                ps.interview == 1 ? "active" : ""
                              }`}
                              data-aos="zoom-in"
                              data-aos-anchor="#right-screen"
                              data-aos-offset="300"
                              data-aos-easing="ease-in-sine"
                            >
                              {" "}
                              <span className="icon">
                                {" "}
                                <MdOutlinePersonPin />
                              </span>{" "}
                              <span className="text">Interview</span>{" "}
                            </div>
                            <div
                              className={`step no-before${
                                ps.placement == 1 ? "active" : ""
                              }`}
                              data-aos="zoom-in"
                              data-aos-anchor="#right-screen"
                              data-aos-offset="300"
                              data-aos-easing="ease-in-sine"
                            >
                              {" "}
                              <span className="icon">
                                {" "}
                                <MdOutlineDoneOutline />
                              </span>{" "}
                              <span className="text">Placement</span>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row">
            {filtered_courses.map((x: any) => (
              <>
                <div className="col-sm-6 flex-center">
                  <div className="card shadow m-2 course-card">
                    <img src="/assets/bg/register_bg.png" alt="" />
                    <div className="details p-4">
                      <h5 className="heading">{x.course_name}</h5>
                      <div className="sub">
                        <span className="text-gray">Faculty : {x.faculty}</span>
                        <br />
                        <span className="text-gray">
                          Class Duration : {x.duration} Months
                        </span>
                        <button
                          onClick={() => redirectToLiveClass(x)}
                          className="btn mt-2 btn-primary btn-wide"
                        >
                          View Details
                        </button>
                        <div className="my-3">
                          <ProgressBar
                            variant="success"
                            now={x.class_completed}
                            label={`${x.class_completed}%`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
