import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { SlGraduation } from "react-icons/sl";
import protectedStudentApiService from "../../../../services/_protected_student_api";
export default function StudentJobs() {
  const [allJobs, setAllJobs] = useState<any>(null);
  const { getAllJobs } = protectedStudentApiService();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const resp: any = await getAllJobs();
    setAllJobs(resp);
  };
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">Recommended Job</h5>
          <div className="row">
            {allJobs &&
              allJobs.map((x: any) => (
                <Link className="col-sm-6 " to="Selected Job" state={x}>
                  <div
                    className="card  m-2 p-4 jobs-card"
                    style={{ maxWidth: "45rem" }}
                  >
                    <div className="flex-between">
                      <h5 className="heading text-dark">
                        {x.title || "Front-End Engineer React JS"}
                      </h5>
                      <h5 className="heading text-primary">
                        {x.package || "Rs. 10 - 15 LPA"}
                      </h5>
                    </div>
                    <p className="text-gray">
                      {" "}
                      {x.company || "Numax Data Lab Pvt. Ltd."}
                    </p>
                    <div className="row p-2">
                      <div className="chips btn-sm    ">
                        <IoBriefcaseOutline className="mx-2" /> {x.experience}{" "}
                        years
                      </div>
                      <div className="chips btn-sm   ">
                        <BsClockHistory className="mx-2" />
                        Full Time
                      </div>
                      <div className="chips btn-sm  ">
                        <GrLocation className="mx-2" />{" "}
                        {x.location || "Hyderabad"}
                      </div>
                      <div className="chips btn-sm   ">
                        <SlGraduation className="mx-2" />
                        {x.qualification || ""}
                      </div>
                    </div>
                    <hr />
                    <p className="text-gray limited-char-150">
                      {x.job_description ||
                        "lorem ipsum dolor sit amet, consectetur adip"}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </>
    </>
  );
}
