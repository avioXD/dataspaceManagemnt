import { BsThreeDotsVertical } from "react-icons/bs";
import studentGlobalDataStore from "../../../../../store/_global_studentData";
export default function LiveClassesList() {
  const { liveClass } = studentGlobalDataStore();
  console.log(liveClass);
  return (
    <>
      <>
        <div className="card shadow enrolled p-4">
          <h5 className="heading">Live Classes</h5>
          <div className="flex-start">
            {liveClass &&
              liveClass?.classList.map((e: any) => (
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
                            <div className="col-sm-2 flex-center">
                              <button className="icon-btn btn-sm mt-2">
                                <BsThreeDotsVertical size={23} />
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
                            <div className="col-sm-2 flex-center">
                              <button className="icon-btn btn-sm mt-2">
                                <BsThreeDotsVertical size={23} />
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
      </>
    </>
  );
}
