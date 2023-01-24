import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import userState from "../../../../../store/_userState";
import studentSkillUpApi from "../../../../../services/_student_skillup_api";
import { toast } from "react-toastify";
import { Alert } from "react-bootstrap";

export default function SpecificAssignments() {
  const location = useLocation();
  const assignment = location.state;

  const { user } = userState();
  const init: any = {
    user_id: user.user_id,
    assignment_id: assignment.assigments_id,
    assignment: "",
  };
  const [creeds, setCreeds] = useState<any>(init);
  const onValueChange = (val: any) => {
    setCreeds({ ...creeds, ...val });
  };
  const navigate = useNavigate();
  const { postAssignment } = studentSkillUpApi();
  const onSubmit = async () => {
    const res: any = await postAssignment(creeds);
    if (res.status == 1) {
      toast.success("Assignment Successfully Submitted !");
      setCreeds(init);
    } else {
      toast.error(res.msg);
      setCreeds(init);
    }
    navigate("/StudentClasses/Assignments/Assigned");
  };
  return (
    <>
      <>
        <div className="card w-75 enrolled p-2">
          <p className="heading">Assignment Details</p>
          <div className="card  p-4">
            <h5 className="heading">{assignment.assigment_name}</h5>
            <div
              style={{ maxWidth: "80rem" }}
              dangerouslySetInnerHTML={{
                __html: assignment.assigment_details,
              }}
            ></div>
            <hr />
            {!assignment.is_submitted ? (
              <div className="col-sm-6">
                <div className="mb-3">
                  <span className="text-gray text-sm">Answer</span>
                  <div className="flex-start">
                    <input
                      type="text"
                      className="form-control"
                      name="assignment"
                      id="assignment"
                      placeholder="Enter your answer"
                      onChange={(e) =>
                        onValueChange({
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={onSubmit}
                      className="btn mx-2 btn-primary  "
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {assignment.result ? (
                  <Alert variant={"success"}>
                    You have successfully submitted the assignment!
                  </Alert>
                ) : (
                  <Alert variant={"danger"}>
                    Your submitted assignment is incorrect!
                  </Alert>
                )}
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
}
