import { useState } from "react";
import studentGlobalDataStore from "../../../../../store/_global_studentData";
import { CgNotes } from "react-icons/cg";
import { FiDownload } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { Modal } from "react-bootstrap";
import { Button } from "primereact/button";
import Loader from "../../../../../common/loader";
export default function LiveClassesList() {
  const { liveClass } = studentGlobalDataStore();
  const [show, setShow] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const giveFeedback = () => {};

  return (
    <>
      <>
        {!liveClass && <Loader />}
        {liveClass && (
          <>
            <div className="card enrolled p-4">
              <h5 className="heading">Live Classes</h5>
              <div className="flex-start">
                {liveClass?.classList.map((e: any) => (
                  <>
                    {new Date(e.date) == new Date() && (
                      <div className="card  m-2 class-card">
                        <div className="details p-4">
                          <div className="flex-between">
                            <p className="text-primary">Class 13</p>
                            <p
                              className={
                                e.student_cls == 1
                                  ? "schedule bg-success "
                                  : e.student_cls == 0
                                  ? "schedule bg-danger "
                                  : "schedule bg-info"
                              }
                            >
                              {e.student_cls == 1
                                ? "Present"
                                : e.student_cls == 0
                                ? "Absent"
                                : "Upcoming"}
                            </p>
                          </div>
                          <h6 className="  mt-2">{e.course_name}</h6>
                          <div className="sub">
                            <span className="text-gray">
                              Instructor : {e.name}
                            </span>
                            <br />
                            <span className="text-gray">
                              Date : {e.date} | Time : {e.start_time}
                            </span>
                            <div className="buttons row  ">
                              <div className="col-sm">
                                <a href={e.link}>
                                  <div className="btn mt-2 btn-primary flex-center btn-sm btn-wide">
                                    <img
                                      src="/assets/svg/LiveClass.svg"
                                      className="mx-1"
                                      alt=""
                                    />
                                    Join Class
                                  </div>
                                </a>
                              </div>
                              {/* <div className="col-sm-2 flex-center">
                            <button className="icon-btn btn-sm mt-2">
                              <img src="/assets/svg/Notes.svg" alt="" />
                            </button>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
              <hr />
              <h5 className="heading">Past Classes</h5>
              <div className="flex-start">
                {liveClass?.classList &&
                  liveClass?.classList.map((e: any) => (
                    <>
                      {new Date(e.date) < new Date() && (
                        <div className="card  m-2 class-card">
                          <div className="details p-4">
                            <div className="flex-between">
                              <p className="text-primary">Class 13</p>
                              <p
                                className={
                                  e.student_cls == 1
                                    ? "schedule bg-success "
                                    : e.student_cls == 0
                                    ? "schedule bg-danger "
                                    : "schedule bg-info"
                                }
                              >
                                {e.student_cls == 1
                                  ? "Present"
                                  : e.student_cls == 0
                                  ? "Absent"
                                  : "Upcoming"}
                              </p>
                            </div>
                            <h6 className="  mt-2">{e.course_name}</h6>
                            <div className="sub">
                              <span className="text-gray">
                                Instructor : {e.name}
                              </span>
                              <br />
                              <span className="text-gray">
                                Date : {e.date} | Time : {e.start_time}
                              </span>
                              <div className="buttons flex-between  ">
                                <div className="w-100 mr-2">
                                  <a href={e.recorded_link}>
                                    <div className="btn mt-2 btn-primary flex-center btn-sm btn-wide">
                                      <FiDownload size={23} className="mr-2" />{" "}
                                      Download
                                    </div>
                                  </a>
                                </div>
                                {/* <div className="col-sm-2 flex-center">
                            <button className="icon-btn btn-sm mt-2">
                              <img src="/assets/svg/Notes.svg" alt="" />
                            </button>
                          </div> */}
                                <div className=" flex-center mr-2">
                                  <a href={e.note_docs}>
                                    <button className="icon-btn btn-sm mt-2">
                                      <CgNotes size={23} />
                                    </button>
                                  </a>
                                </div>
                                <div className=" flex-center">
                                  <button
                                    onClick={() => {
                                      setSelectedClass(e);
                                      handleShow();
                                    }}
                                    className="icon-btn btn-sm mt-2"
                                  >
                                    <VscFeedback size={23} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </div>
            </div>
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>Give Feedback</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you're reading this text in a modal!
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={giveFeedback}>Feedback</Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </>
    </>
  );
}
