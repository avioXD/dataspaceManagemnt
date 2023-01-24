import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import commonApiService from "../../../../../services/_common_api";
import globalDataStore from "../../../../../store/_globalData";
import studentGlobalDataStore from "../../../../../store/_global_studentData";
import Loader from "../../../../../common/loader";

export default function RecommendedCourse() {
  const { getAllCourses } = commonApiService();
  const { allCourses, setAllCourses } = globalDataStore();
  const { skillUpModule } = studentGlobalDataStore();
  const [rec, setRec] = useState<any>(null);
  useEffect(() => {
    if (!allCourses) {
      fetchCourses();
    }

    if (allCourses && skillUpModule) {
      setRec(
        allCourses.filter(
          (x: any) => x.course_name == skillUpModule[0]?.course_name
        )[0]
      );
    }
  }, []);
  const fetchCourses = async () => {
    const res: any = await getAllCourses();
    setAllCourses(res);
  };
  return (
    <>
      <>
        {!rec && <Loader />}
        {rec && (
          <div className="card  enrolled p-4">
            <h5 className="heading">Upgrade to paid course</h5>
            <div className="row">
              <div className="col-sm-6 flex-center course-card">
                <div className="card shadow m-2  ">
                  <img src="/assets/bg/register_bg.png" alt="" />
                  <div className="details p-4">
                    <h5 className="heading">
                      {rec.course_name || "Test Course"}
                    </h5>
                    <div className="sub">
                      <div className="flex-between">
                        <div className="left">
                          <span className="text-gray">
                            Faculty : {rec.faculty || "Test Faculty"}
                          </span>
                          <br />
                          <span className="text-gray">
                            Class Duration : {rec.duration || "3"} Months
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
                            state={rec.classList}
                          >
                            <button className="btn btn-sm btn-primary btn-wide">
                              Enroll Now
                            </button>
                          </Link>
                        </div>
                        {/* <div className="col-sm-6 mt-2">
                        <Link to="Already Enrolled" state={rec.classList}>
                          <button className="btn btn-sm btn-primary btn-wide">
                            Already Enrolled
                          </button>
                        </Link>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
