import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useCallback, useEffect, useState } from "react";
import commonApiService from "../../../../../services/_common_api";
import globalDataStore from "../../../../../store/_globalData";
import { FilterDropdown } from "../../../../../common/prime_data_table";

export default function AllCourseList() {
  const { getAllCourses } = commonApiService();
  const { allCourses, setAllCourses } = globalDataStore();
  const [changeableData, setChangeableData] = useState<any>(null);
  useEffect(() => {
    if (!allCourses) {
      fetchCourses();
    } else {
      setChangeableData(allCourses);
    }
  }, []);
  const fetchCourses = useCallback(async () => {
    const res: any = await getAllCourses();
    setAllCourses(res);
    setChangeableData(res);
  }, [allCourses]);
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">All Courses</h5>
          <div className="d-flex justify-content-end my-2">
            {allCourses && (
              <FilterDropdown
                allData={allCourses}
                filterField={"category"}
                setChangeableData={setChangeableData}
                header={"Category"}
              />
            )}
          </div>
          <div className="row">
            {changeableData &&
              changeableData.map((x: any) => (
                <div className="col-sm-4 flex-center course-card">
                  <div className="card shadow m-2  ">
                    <img
                      src={x.featured_image || "/assets/bg/register_bg.png"}
                      alt=""
                    />
                    <div className="details p-4">
                      <h5 className="heading">
                        {x.page_name || "Test Course"}
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
                            <Link to="Already Enrolled" state={x}>
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
