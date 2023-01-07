import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";

export default function AllCourseList() {
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">All Courses</h5>
          <div className="row">
            {new Array(10).fill(0).map((x) => (
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
