import { Link, useLocation } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";

export default function SpecificProjects() {
  const location: any = useLocation();
  const project: any = location.state;
  console.log(project);
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
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    aria-describedby="namelHelp"
                    placeholder="Enter your answer"
                    //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                  />
                  <button className="btn mx-2 btn-primary  ">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
