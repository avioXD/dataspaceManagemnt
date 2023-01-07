import { Link, useLocation } from "react-router-dom";

export default function SpecificAssignments() {
  const location = useLocation();
  const assignment = location.state;
  return (
    <>
      <>
        <div className="card  enrolled p-2">
          <p className="heading">Assignment Details</p>
          <div className="card shadow-sm p-4">
            <h5 className="heading">{assignment.assigment_name}</h5>
            <div
              style={{ maxWidth: "80rem" }}
              dangerouslySetInnerHTML={{
                __html: assignment.assigment_details,
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
