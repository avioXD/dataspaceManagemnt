import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import studentCommonApi from "../../../../../services/_student_skillup_api";
import studentGlobalDataStore from "../../../../../store/_global_studentData";

export default function AllProjects() {
  const { getStudentProjects } = studentCommonApi();
  const { liveClass } = studentGlobalDataStore();
  const [data, setData] = useState<any>(null);
  console.log(liveClass);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res: any = await getStudentProjects(liveClass.course_id);
    console.log(res);
    setData(res);
  };
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">All Projects</h5>
          <div className="row">
            {data &&
              data.map((x: any) => (
                <div className="col-sm-3">
                  <div className="card assignment-card p-3">
                    <div className="flex-center flex-column">
                      <img
                        src=" /assets/student/online-homework-help.png"
                        alt=""
                      />
                      <p className="text-center">Projects</p>
                    </div>
                    <div className="text-start">
                      <h5 className="heading">Penetration Testing</h5>
                    </div>
                    <Link
                      to="/StudentClasses/Projects/AssignedProjectsDetails"
                      state={x}
                    >
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
