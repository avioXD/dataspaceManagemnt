import { useEffect, useState } from "react";
import "react-image-picker-editor/dist/index.css";
import { IoCalendarOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import studentCommonApi from "../../../../../services/_student_skillup_api";
import PrimeDataTable from "../../../../../common/prime_data_table";
import { Columns } from "../../../../../interfaces/_common";
import protectedStudentApiService from "../../../../../services/_protected_student_api";
export default function AlreadyEnrolledForm() {
  const init: any = {
    job_id: "",
    branch_name: "",
    education: "",
    location: "",
    company: "",
    experience: "",
    job_role: "",
    job_description: "",
    terms_condition: "",
  };
  const tablesStructure: Columns[] = [
    {
      data_name: "course_name",
      header: "Course Name",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "date",
      header: "Date",
      sortable: false,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "time",
      header: "Timing",
      sortable: false,
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
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
  ];
  const [creeds, setCreeds] = useState(init);
  const [show, setShow] = useState(false);
  const [allSchedules, setAllSchedules] = useState<any>();
  const { getAllSchedule } = protectedStudentApiService();
  useEffect(() => {
    getSchedule();
  }, []);
  const getSchedule = async () => {
    const res: any = await getAllSchedule();
    console.log(res);
    setAllSchedules(res);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onValueChange = (val: any) => {
    console.log(val);
    setCreeds({ ...creeds, ...val });
  };
  //   const onSubmit = async () => {
  //     const res: any = await postAddJob(creeds);
  //     if (res == 1) {
  //       toast.success("Job Added");
  //       setCreeds(init);
  //     } else {
  //       toast.error("Adding failed!");
  //     }
  //   };

  return (
    <>
      <div className=" mt-3">
        <h6 className="heading">Complete Enrollment</h6>
        <div className="card shadow mt-3 p-4">
          <div className="row mx-3">
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label htmlFor="course" className="form-label">
                  Branch
                </label>
                <select
                  className="form-select"
                  name="course_mode"
                  id="course_mode"
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
                  <option value="Kolkata">Kolkata</option>
                  <option value="Guwahati">Guwahati</option>
                  <option value="Delhi">Delhi</option>
                  <option value="KSA">KSA</option>
                  <option value="Durgapur">Durgapur</option>
                  <option value="Dhanbad">Dhanbad</option>
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Counsellor Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="counsellor"
                  id="counsellor"
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
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="contact_no" className="form-label">
                  Experience
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
                  onClick={handleShow}
                  className="btn icon-btn btn-sm btn-outline-primary btn-wide"
                >
                  <IoCalendarOutline size={28} className="mx-2" />
                  See All Scheduled Batch
                </button>
              </div>
            </div>
          </div>
          <div className="flex-start p-3 mx-3">
            <button onClick={() => {}} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <PrimeDataTable
            data={allSchedules || []}
            structure={tablesStructure}
            title={"All Scheduled"}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
