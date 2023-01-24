import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { SlGraduation } from "react-icons/sl";
import protectedStudentApiService from "../../../../services/_protected_student_api";
import Loading from "../../../../common/loader";
import ShowMoreText from "react-show-more-text";
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
            {!allJobs && <Loading />}
            {allJobs &&
              allJobs.map((x: any) => (
                <Link
                  className="col-sm-6 "
                  to="Selected Job"
                  state={{ job: x, allJobs: allJobs }}
                >
                  <div
                    className="card  m-2 p-4 jobs-card"
                    style={{ maxWidth: "45rem" }}
                  >
                    <div className="flex-between">
                      <h5 className="heading">
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
                    <div className="row ">
                      <div className="chips btn-sm    ">
                        <IoBriefcaseOutline className="mx-2" /> {x.experience}{" "}
                        years
                      </div>
                      <div className="chips btn-sm   ">
                        <BsClockHistory className="mx-2" />
                        {x.duration}
                      </div>
                      <div className="chips btn-sm  ">
                        <GrLocation className="mx-2" />{" "}
                        {x.location || "Hyderabad"}
                      </div>
                      <div className="chips btn-sm   ">
                        <SlGraduation className="mx-2" />
                        {x.education || ""}
                      </div>
                    </div>
                    <ShowMoreText
                      lines={3}
                      more="Show more"
                      less="Show less"
                      className="text-gray mt-2"
                      anchorClass="show-more-less-clickable"
                      expanded={false}
                      width={280}
                      truncatedEndingComponent={"... "}
                    >
                      {" "}
                      <div
                        className="text-gray"
                        dangerouslySetInnerHTML={{
                          __html: x.job_description,
                        }}
                      ></div>
                    </ShowMoreText>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </>
    </>
  );
}
