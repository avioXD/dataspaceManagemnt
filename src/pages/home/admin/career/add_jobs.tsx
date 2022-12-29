import { useState } from "react";
import "react-image-picker-editor/dist/index.css";
import protectedApiService from "../../../../services/_protected_api";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
export default function AddJobs() {
  const init: any = {
    job_id: "",
    title: "",
    education: "",
    location: "",
    company: "",
    experience: "",
    job_role: "",
    job_description: "",
    terms_condition: "",
  };
  const [creeds, setCreeds] = useState(init);
  const { postAddJob } = protectedApiService();
  const onValueChange = (val: any) => {
    console.log(val);
    setCreeds({ ...creeds, ...val });
  };
  const onSubmit = async () => {
    const res: any = await postAddJob(creeds);
    if (res == 1) {
      toast.success("Job Added");
      setCreeds(init);
    } else {
      toast.error("Adding failed!");
    }
  };

  return (
    <>
      <div className=" mt-3">
        <h5>New Job Details</h5>
        <div className="card shadow mt-3 p-4">
          <div className="row mx-3">
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Job Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="title"
                  value={creeds.title}
                  aria-describedby="namelHelp"
                  placeholder="Title"
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                <label htmlFor="name" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  id="company"
                  value={creeds.company}
                  aria-describedby="namelHelp"
                  placeholder="example"
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                  name="experience"
                  id="experience"
                  value={creeds.experience}
                  aria-describedby="namelHelp"
                  placeholder="Years"
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                <label htmlFor="name" className="form-label">
                  Education
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="education"
                  id="education"
                  value={creeds.education}
                  aria-describedby="namelHelp"
                  placeholder="B.Tech"
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                  onChange={(e) =>
                    onValueChange({
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  id="location"
                  value={creeds.location}
                  aria-describedby="namelHelp"
                  placeholder="14H Road, example "
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                <label htmlFor="name" className="form-label">
                  Job Role
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="job_role"
                  id="job_role"
                  value={creeds.job_role}
                  aria-describedby="namelHelp"
                  placeholder="Senior Programmer II"
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                <label htmlFor="name" className="form-label">
                  Job Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="job_description"
                  id="job_description"
                  value={creeds.job_description}
                  aria-describedby="namelHelp"
                  placeholder="Description"
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
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
                <label htmlFor="name" className="form-label">
                  Terms and Conditions
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="terms_condition"
                  id="terms_condition"
                  value={creeds.terms_condition}
                  aria-describedby="namelHelp"
                  placeholder="T&C "
                  //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                  onChange={(e) =>
                    onValueChange({
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex-start p-3 mx-3">
            <button onClick={onSubmit} className="btn btn-primary">
              Add New Job
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
