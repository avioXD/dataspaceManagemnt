import { useEffect, useState } from "react";
import { collectionCount } from "../../../functions/_helperFunctions";
import protectedApiService from "../../../services/_protected_api";
import globalDataStore from "../../../store/_globalData";

export default function AdminDashboard() {
  const { getClassSummery, getAdminAllReport, getAllFaculty } =
    protectedApiService();
  const empt: any = null;
  const [classSummery, setClassSummery] = useState(empt);
  const [adminReports, setAdminReports] = useState(empt);
  const [facultyReports, setFacultyReports] = useState(empt);
  const { allFaculty } = globalDataStore();
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const cls_data: any = await getClassSummery();
    setClassSummery(cls_data);
    const all_reprts: any = await getAdminAllReport();
    setAdminReports(all_reprts);
    // console.log("all", allFaculty);
    if (!allFaculty) {
      // console.log("looping");
      const all_faulty: any = await getAllFaculty();
      if (all_faulty) {
        setFacultyReports({
          total_faculty: all_faulty.length,
          ethical_hacking: collectionCount(all_faulty, "course_id", "9"),
          data_science: collectionCount(all_faulty, "course_id", "8"),
          others:
            all_faulty.length -
            (collectionCount(all_faulty, "course_id", "8") +
              collectionCount(all_faulty, "course_id", "9")),
        });
      }
    } else {
      // console.log("looping");
      if (allFaculty) {
        setFacultyReports({
          total_faculty: allFaculty.length,
          ethical_hacking: collectionCount(allFaculty, "course_id", "9"),
          data_science: collectionCount(allFaculty, "course_id", "8"),
          others:
            allFaculty.length -
            (collectionCount(allFaculty, "course_id", "8") +
              collectionCount(allFaculty, "course_id", "9")),
        });
      }
    }
  };
  return (
    <>
      <div className="admin-dashboard">
        <div className="row">
          {classSummery ? (
            <>
              {/* part */}
              <div className="col-sm-6 flex-start box  ">
                <div className="box">
                  <h6 className="box-header">Class Summery</h6>
                  <div className="card box-blue">
                    <div className="row">
                      {/* section */}
                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">
                            Total Ongoing Classes
                          </span>
                          <div className="item ">
                            <img
                              src="/assets/png/Total_Ongoing_Classes.png"
                              alt=""
                            />
                            <div className="text ">
                              <h3>{classSummery.ongoing_classes || 0} </h3>
                              <h6>Classes</h6>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">
                            Total Classes Completed
                          </span>
                          <div className="item ">
                            <img
                              src="/assets/png/Total_Classes_Completed.png"
                              alt=""
                            />
                            <div className="text ">
                              <h3>{classSummery.class_completed || 0} </h3>
                              <h6>Completed</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">Today Classes</span>
                          <div className="item  ">
                            <img src="/assets/png/today_classes.png" alt="" />
                            <div className="text ">
                              <h3>{classSummery.today_class || 0} </h3>
                              <h6>Classes</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">
                            Today Completed Classes
                          </span>
                          <div className="item  ">
                            <img
                              src="/assets/png/today_completed_classes.png"
                              alt=""
                            />
                            <div className=" text">
                              <h3>{classSummery.completed_class || 0} </h3>
                              <h6>Completed</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {adminReports ? (
            <>
              {/* part */}
              <div className="col-sm-6   flex-start box">
                <div>
                  <h6 className="box-header">Student Summery</h6>
                  <div className="card box-green">
                    <div className="row">
                      {/* section */}
                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">
                            Total Registered Students
                          </span>
                          <div className="item ">
                            <img
                              src="/assets/png/Total_Registered_Students.png"
                              alt=""
                            />
                            <div className="text ">
                              <h3>{adminReports.reg_students || 0} </h3>
                              <h6>Students</h6>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">
                            Total Scheduled Students
                          </span>
                          <div className="item ">
                            <img
                              src="/assets/png/total_scheduled_studenrts.png"
                              alt=""
                            />
                            <div className="text ">
                              <h3>{adminReports.scheduled || 0} </h3>
                              <h6>Students</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">
                            Not Scheduled Students
                          </span>
                          <div className="item  ">
                            <img
                              src="/assets/png/not_scheduled_students.png"
                              alt=""
                            />
                            <div className="text ">
                              <h3>{adminReports.not_scheduled || 0} </h3>
                              <h6>Students</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">Today Registered</span>
                          <div className="item  ">
                            <img
                              src="/assets/png/total_registered.png"
                              alt=""
                            />
                            <div className=" text">
                              <h3>{adminReports.reg_students || 0} </h3>
                              <h6>Students</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {facultyReports ? (
            <>
              {/* part */}
              <div className="col-sm-6  flex-start box  ">
                <div>
                  <h6 className="box-header">Faculty Summery</h6>
                  <div className="card box-red">
                    <div className="row">
                      {/* section */}
                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">Total Faculty</span>
                          <div className="item ">
                            <img
                              src="/assets/png/Total_Registered_Students.png"
                              alt=""
                            />
                            <div className="text ">
                              <h3>{facultyReports.total_faculty || 0} </h3>
                              <h6>Faculties</h6>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">Ethical Hacking</span>
                          <div className="item ">
                            <img
                              src="/assets/png/total_scheduled_studenrts.png"
                              alt=""
                            />
                            <div className="text ">
                              <h3>{facultyReports.ethical_hacking || 0} </h3>
                              <h6>Faculties</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">Data Science</span>
                          <div className="item  ">
                            <img
                              src="/assets/png/not_scheduled_students.png"
                              alt=""
                            />
                            <div className="text ">
                              <h3>{facultyReports.data_science || 0} </h3>
                              <h6>Faculties</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 flex-start ">
                        <div className="data">
                          <span className="tag-name">Others</span>
                          <div className="item  ">
                            <img
                              src="/assets/png/total_registered.png"
                              alt=""
                            />
                            <div className=" text">
                              <h3>{facultyReports.others || 0} </h3>
                              <h6>Faculties</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {adminReports ? (
            <>
              {/* part */}
              <div className="col-sm-6   flex-start box  ">
                <div>
                  <h6 className="box-header">Course Summery</h6>
                  <div className="card box-green ">
                    <div className="row">
                      {/* section */}
                      <div className="col-sm-6   ">
                        <div className="data flex-center flex-column">
                          <div className=" flex-center flex-column ">
                            <img
                              src="/assets/png/total_courses.png"
                              alt=""
                              style={{ width: "7rem" }}
                            />
                            <div className="text text-center">
                              <h6> Total Courses </h6>
                              <h3>{adminReports.total_courses || 0} </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
