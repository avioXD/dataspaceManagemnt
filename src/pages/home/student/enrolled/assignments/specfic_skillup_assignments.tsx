import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import studentCommonApi from "../../../../../services/_student_skillup_api";
import studentGlobalDataStore from "../../../../../store/_global_studentData";

export default function SkillUpAssignment() {
  const { getStudentAssignments } = studentCommonApi();
  const { skillUpModule } = studentGlobalDataStore();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res: any = await getStudentAssignments(skillUpModule[0].course_id);
    setData(res);
  };
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">All Assignments</h5>
          <div className="row">
            {data &&
              data.map((x: any) => (
                <div className="col-sm-3">
                  <div className="card assignment-card p-3">
                    <div className="flex-center flex-column">
                      <img src="/assets/student/assignment.png" alt="" />
                      <p className="text-center">Assignment</p>
                    </div>
                    <div className="text-start">
                      <h5 className="heading">{x.assignment_name}</h5>
                    </div>
                    <Link to="Assignment Details" state={x}>
                      <button className="btn btn-sm mt-2 btn-primary btn-wide">
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    </>
  );
}
