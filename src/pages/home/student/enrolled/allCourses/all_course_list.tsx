import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useCallback, useEffect, useState } from "react";
import commonApiService from "../../../../../services/_common_api";
import globalDataStore from "../../../../../store/_globalData";
import { FilterDropdown } from "../../../../../common/prime_data_table";
import Loading from "../../../../../common/loader";
import { Modal } from "react-bootstrap";
import { Button } from "primereact/button";

export default function AllCourseList() {
  const { getAllCourses } = commonApiService();
  const { allCourses, setAllCourses } = globalDataStore();
  const [changeableData, setChangeableData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [pricing, setPricing] = useState<any>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        {!allCourses && <Loading />}
        {allCourses && (
          <div className="card  enrolled p-4">
            <h5 className="heading">All Courses</h5>
            <div className="d-flex justify-content-end my-2">
              <FilterDropdown
                allData={allCourses}
                filterField={"category"}
                setChangeableData={setChangeableData}
                header={"Category"}
              />
            </div>
            <div className="row">
              {!changeableData && <Loading />}
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
                              <a
                                href={`https://dataspaceacademy.com/${x.slug}`}
                              >
                                <button className="btn  btn-sm btn-outline-primary  ">
                                  View Details
                                </button>
                              </a>
                            </div>
                          </div>
                          <div className="row  ">
                            <div className="col-sm-6 mt-2">
                              <button
                                onClick={() => {
                                  handleShow();
                                  setPricing(JSON.parse(x.plans));
                                }}
                                className="btn btn-sm btn-primary btn-wide"
                              >
                                Enroll Now
                              </button>
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
        )}
      </>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show && pricing}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row align-item-center">
            {pricing &&
              pricing.map((x: any) => (
                <div className="col-sm-4 flex-start-center">
                  <div className="plans-card shadow card mx-2 p-3">
                    <div className="flex-between">
                      <h4 className="text-warning">{x.plan_name}</h4>
                      <h5 className="text-success">{x.price} /-</h5>
                    </div>
                    <hr />
                    <p className="text-gray">Plan Description</p>
                    <div
                      dangerouslySetInnerHTML={{ __html: x.other_data }}
                    ></div>
                    <hr />
                    {x.price == "0" ? (
                      <Button
                        label="Free Enroll Now"
                        className="btn  btn-success"
                      />
                    ) : (
                      <Button label="Punches Now" className="p-btn" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
