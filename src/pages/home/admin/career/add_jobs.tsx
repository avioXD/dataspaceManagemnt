import { useState, useEffect } from "react";
import "react-image-picker-editor/dist/index.css";
import protectedApiService from "../../../../services/_protected_api";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { Chips } from "primereact/chips";
import commonApiService from "../../../../services/_common_api";
import globalDataStore from "../../../../store/_globalData";
import { Editor } from "primereact/editor";
export default function AddJobs() {
  const init: any = {
    title: "",
    education: "",
    location: "",
    company: "",
    experience: "",
    job_role: "",
    terms_condition: "",
    course_id: "",
    qualification: "",
    duration: "",
    package: "",
  };
  const [job_description, onTextChange] = useState<string>("");
  const [skills, onSkillsAdd] = useState<any[]>([]);
  const [creeds, setCreeds] = useState(init);
  const { postAddJob } = protectedApiService();
  const { getAllCourses } = commonApiService();
  const { allCourses } = globalDataStore();
  const onValueChange = (val: any) => {
    console.log({ ...creeds, ...val });
    setCreeds({ ...creeds, ...val });
  };
  const onSubmit = async () => {
    let error = false;
    Object.keys(creeds).map((x: any) => {
      if (creeds[x] == "") {
        toast.error("Error in" + x);
        error = true;
      }
    });
    if (!error) {
      const res: any = await postAddJob({
        ...creeds,
        job_description: job_description,
        skills: JSON.stringify(skills),
      });
      if (res == 1) {
        toast.success("Job Added");
        setCreeds(init);
        onSkillsAdd([]);
        onTextChange("");
      } else {
        toast.error("Adding failed!");
      }
    } else {
      toast.error("Some fields have error!");
    }
  };
  const [course, setCourse] = useState<any>(null);
  const getCourse = async () => {
    const res: any = await getAllCourses();
    setCourse(res);
  };
  useEffect(() => {
    if (allCourses) {
      setCourse(allCourses);
    } else {
      getCourse();
    }
  }, []);
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
            {course && (
              <div className="col-sm-6 ">
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">
                    Related Course
                  </label>
                  <select
                    className="form-select"
                    name="course_id"
                    id="course_id"
                    defaultValue={creeds.course_id}
                    required
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    <option value="default" disabled selected hidden>
                      Select Course
                    </option>
                    {course.map((x: any) => (
                      <option value={x.course_id}>{x.page_name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label htmlFor="course" className="form-label">
                  Job Duration
                </label>
                <select
                  className="form-select"
                  name="duration"
                  id="duration"
                  defaultValue={creeds.duration}
                  required
                  onChange={(e) =>
                    onValueChange({
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value="default" disabled selected hidden>
                    Select Course
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
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
                  Package
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="package"
                  id="package"
                  value={creeds.package}
                  aria-describedby="namelHelp"
                  placeholder="10 - 15 L / Not disclosable"
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
                  type="number"
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
                  Degree
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="education"
                  id="education"
                  value={creeds.education}
                  aria-describedby="namelHelp"
                  placeholder="Education Details"
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
                  Qualification
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="qualification"
                  id="qualification"
                  value={creeds.qualification}
                  aria-describedby="namelHelp"
                  placeholder="B.tech"
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
            <div className="col-sm-6">
              <div className="mb-3 ">
                <p className="form-label">Skills</p>
                <Chips
                  width={"100%"}
                  separator=","
                  value={skills}
                  onChange={(e) => onSkillsAdd(e.value)}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Job Description
                </label>
                <Editor
                  style={{ height: "180px" }}
                  value={creeds}
                  onTextChange={(e: any) => onTextChange(e.htmlValue)}
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
