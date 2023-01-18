import { useEffect, useState, useCallback } from "react";
import "react-image-picker-editor/dist/index.css";
import { IoCalendarOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import PrimeDataTable from "../../../../../common/prime_data_table";
import { Columns } from "../../../../../interfaces/_common";
import protectedStudentApiService from "../../../../../services/_protected_student_api";
export default function AlreadyEnrolledForm() {
  const location = useLocation();
  const course = location.state;
  const navigate = useNavigate();
  const init: any = {
    user_id: "",
    branch_name: "",
    counsellor: "",
    transaction_id: "",
    schedule_timing: "",
    counsellor_name: "",
    schedule: {},
    course_name: course?.page_name || "",
  };
  const tablesStructure: Columns[] = [
    {
      data_name: "course_name",
      header: "Course Name",
      sortable: false,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "date",
      header: "Date",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "time",
      header: "Timing",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "instructor_name",
      header: "Instructor",
      sortable: false,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "location",
      header: "Location",
      sortable: false,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "location",
      header: "Location",
      sortable: false,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "Select",
      header: "Select",
      sortable: true,
      dataFilter: (data: any, key: any) => {
        return (
          <>
            <button
              onClick={() => {
                onValueChange({ schedule: data });
                handleClose();
              }}
              className="btn btn-outline-success btn-sm"
            >
              Select
            </button>
          </>
        );
      },
    },
  ];
  const [creeds, setCreeds] = useState(init);
  const [show, setShow] = useState(false);
  const [allSchedules, setAllSchedules] = useState<any>();
  const [branch, setBranch] = useState<any>({
    counsellors: null,
    branches: null,
  });
  const { getAllSchedule, getAllBranch, postRequestSchedule } =
    protectedStudentApiService();
  useEffect(() => {
    if (!course?.page_name) {
      navigate(-1);
    }
    getSchedule();
    getBranch();
  }, []);
  const getSchedule = useCallback(async () => {
    const res: any = await getAllSchedule();
    console.log(res);

    setAllSchedules(res.filter((r: any) => r.course_name == course.page_name));
  }, [allSchedules]);

  const getBranch = useCallback(async () => {
    const res: any = await getAllBranch();
    setBranch(res);
  }, [branch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onValueChange = (val: any) => {
    console.log(val);
    setCreeds({ ...creeds, ...val });
  };
  const onSubmit = async () => {
    const res: any = await postRequestSchedule(creeds);
    if (res.status == 1) {
      toast.success("Applied");
      setCreeds(init);
      navigate(-1);
    } else {
      toast.error("failed!");
    }
  };

  return (
    <>
      <div className=" mt-3">
        <h6 className="heading">Complete Enrollment</h6>
        {branch?.counsellors && (
          <div className="card shadow mt-3 p-4">
            <div className="row mx-3">
              {branch?.counsellors && branch?.branches && (
                <>
                  {" "}
                  <div className="col-sm-6 ">
                    <div className="mb-3">
                      <label htmlFor="course" className="form-label">
                        Branch
                      </label>
                      <select
                        className="form-select"
                        name="branch_name"
                        id="branch_name"
                        defaultValue={creeds.branch_name || "3"}
                        required
                        onChange={(e) =>
                          onValueChange({
                            [e.target.name]: e.target.value,
                          })
                        }
                      >
                        <option value="default" disabled selected hidden>
                          Select Branch
                        </option>
                        {branch.branches &&
                          branch.branches.map((x: any) => (
                            <option value={x.branch}>{x.branch}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Counsellor Name
                      </label>
                      {branch?.counsellors.length ? (
                        <>
                          {" "}
                          <select
                            className="form-select"
                            name="counsellor_name"
                            id="counsellor_name"
                            defaultValue={creeds.counsellor_name || "3"}
                            required
                            onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                          >
                            <option value="default" disabled selected hidden>
                              Select Counsellor
                            </option>
                            {branch.counsellors &&
                              branch.counsellors.map((x: any) => (
                                <option value={x.counsellor_name}>
                                  {x.counsellor_name}
                                </option>
                              ))}
                          </select>
                        </>
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          name="counsellor_name"
                          id="counsellor_name"
                          value={creeds.counsellor}
                          aria-describedby="namelHelp"
                          placeholder="Enter Counsellor Name"
                          //  onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                          onChange={(e) =>
                            onValueChange({
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Course Name
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    name="course_name"
                    id="course_name"
                    value={creeds.course_name}
                    placeholder="Course Name"
                    //  onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="contact_no" className="form-label">
                    Transaction Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="transaction_id"
                    id="transaction_id"
                    value={creeds.transaction_id}
                    aria-describedby="namelHelp"
                    placeholder="Enter Transaction ID"
                    //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="col-sm-3">
                <div className="mb-3">
                  <button
                    onClick={() => {
                      getAllSchedule();
                      handleShow();
                    }}
                    className="btn icon-btn btn-sm btn-outline-primary btn-wide"
                  >
                    <IoCalendarOutline size={28} className="mx-2" />
                    See All Scheduled Batch
                  </button>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="contact_no" className="form-label">
                    {creeds.schedule.date && (
                      <>
                        <p>
                          Selected
                          {creeds?.schedule?.date || ""} ||{" "}
                          {creeds?.schedule.time || ""} ||{" "}
                          {creeds?.schedule.instructor_name || ""} ||{" "}
                          {creeds?.schedule.location || ""} ||{" "}
                          {creeds?.schedule.timing || ""}
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-start p-3 mx-3">
              <button
                onClick={() => {
                  onSubmit();
                }}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <PrimeDataTable
            data={allSchedules || []}
            structure={tablesStructure}
            title={"All Scheduled"}
            noSearch
            noChecks
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
