import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import commonApiService from "../../../../../services/_common_api";
import globalDataStore from "../../../../../store/_globalData";

export default function AllCourseList() {
  const { getAllCourses } = commonApiService();
  const { allCourses, setAllCourses } = globalDataStore();

  useEffect(() => {
    if (!allCourses) {
      fetchCourses();
    }
  }, []);
  const fetchCourses = async () => {
    const res: any = await getAllCourses();
    setAllCourses(res);
  };
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">All Courses</h5>
          <div className="row">
            {allCourses &&
              allCourses.map((x: any) => (
                <div className="col-sm-4 flex-center course-card">
                  <div className="card shadow m-2  ">
                    <img src="/assets/bg/register_bg.png" alt="" />
                    <div className="details p-4">
                      <h5 className="heading">
                        {x.course_name || "Test Course"}
                      </h5>
                      <div className="sub">
                        <div className="flex-between">
                          <div className="left">
                            <span className="text-gray">
                              Faculty : {x.faculty || "Test Faculty"}
                            </span>
                            <br />
                            <span className="text-gray">
                              Class Duration : {x.duration || "3"} Months
                            </span>
                          </div>
                          <div className="right">
                            <button className="btn  btn-sm btn-outline-primary  ">
                              View Details
                            </button>
                          </div>
                        </div>
                        <div className="row  ">
                          <div className="col-sm-6 mt-2">
                            <Link
                              to="/StudentClasses/Courses/LiveClass"
                              state={x.classList}
                            >
                              <button className="btn btn-sm btn-primary btn-wide">
                                Enroll Now
                              </button>
                            </Link>
                          </div>
                          <div className="col-sm-6 mt-2">
                            <Link to="Already Enrolled" state={x.classList}>
                              <button className="btn btn-sm btn-primary btn-wide">
                                Already Enrolled
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    </>
  );
}
