import { useState } from "react";
import "react-image-picker-editor/dist/index.css";
import { IoCalendarOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
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
  const [creeds, setCreeds] = useState(init);
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
                  <option value="1">A</option>
                  <option value="2">B</option>
                  <option value="3">C</option>
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
                <button className="btn icon-btn btn-sm btn-outline-primary btn-wide">
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
    </>
  );
}
