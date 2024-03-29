import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useCallback, useEffect, useState } from "react";
import studentCommonApi from "../../../../services/_student_skillup_api";
import studentGlobalDataStore from "../../../../store/_global_studentData";
import { FilterDropdown } from "../../../../common/prime_data_table";

export default function AllSkillUpCourseList() {
  const { getAllSkillUpCourses } = studentCommonApi();
  const [allCourses, setCourses] = useState<any>(null);
  const { setAllCoursesGroup, setSkillUpModule } = studentGlobalDataStore();
  const [changeableData, setChangeableData] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = useCallback(async () => {
    const res: any = await getAllSkillUpCourses();
    setCourses(res);
    setChangeableData(res);
  }, [allCourses, changeableData]);
  const redirectToModule = (x: any) => {
    setSkillUpModule(x);
    navigate("/SkillUpModule");
  };
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">All Skill Up Courses</h5>
          <div className="d-flex justify-content-end my-2">
            {allCourses && (
              <FilterDropdown
                allData={allCourses}
                filterField={"course_name"}
                setChangeableData={setChangeableData}
                header={"Course"}
              />
            )}
          </div>
          <div className="row">
            {changeableData &&
              changeableData.map((x: any) => (
                <div className="col-sm-4 flex-center course-card">
                  <div className="card shadow-sm m-2  ">
                    <img src={x.img || "/assets/bg/register_bg.png"} alt="" />
                    <div className="details p-4">
                      <h5 className="heading">
                        {x.course_name || "Test Course"}
                      </h5>
                      <div className="sub">
                        <div className="flex-between">
                          <div className="left">
                            <span className="text-gray">
                              Class Duration : {x.duration || "3"} Months
                            </span>
                          </div>
                          <div className="right">
                            <button
                              onClick={() => redirectToModule(x)}
                              className="btn  btn-sm btn-outline-primary  "
                            >
                              Start Now
                            </button>
                          </div>
                        </div>
                        {/* <div className="row  ">
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
                        </div> */}
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
