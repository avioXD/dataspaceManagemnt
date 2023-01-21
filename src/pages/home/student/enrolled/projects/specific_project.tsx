import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import userState from "../../../../../store/_userState";
import studentSkillUpApi from "../../../../../services/_student_skillup_api";
import { toast } from "react-toastify";

export default function SpecificProjects() {
  const location: any = useLocation();
  const project: any = location.state;

  const { user } = userState();
  const init: any = {
    user_id: user.user_id,
    project_id: project.project_id,
    project_doc: null,
  };
  const [creeds, setCreeds] = useState<any>(init);
  const onValueChange = (val: any) => {
    setCreeds({ ...creeds, ...val });
  };
  const navigate = useNavigate();
  const { postProject } = studentSkillUpApi();
  const onSubmit = async () => {
    const res: any = await postProject(creeds);
    if (res.status == 1) {
      toast.success("Project Successfully Submitted !");
      setCreeds(init);
    } else {
      toast.error(res.msg);
      setCreeds(init);
    }
    navigate(-1);
  };
  return (
    <>
      <>
        <div className="card  enrolled p-2">
          <p className="heading">Project Details</p>
          <div className="card shadow-sm p-4">
            <h5 className="heading">{project.project_name}</h5>
            <div
              style={{ maxWidth: "80rem" }}
              dangerouslySetInnerHTML={{
                __html: project.project_details,
              }}
            ></div>
            <hr />
            <div className="col-sm-6">
              <div className="mb-3">
                <span className="text-gray text-sm">Answer</span>
                <div className="flex-start">
                  <input
                    type="file"
                    className="form-control"
                    name="project"
                    id="project"
                    placeholder="Submit your file  here"
                    onChange={(e) =>
                      onValueChange({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <button onClick={onSubmit} className="btn mx-2 btn-primary  ">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
