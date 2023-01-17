import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { SlGraduation } from "react-icons/sl";
import { Chip } from "primereact/chip";
import protectedStudentApiService from "../../../../services/_protected_student_api";
import userState from "../../../../store/_userState";
import { toast } from "react-toastify";
export default function SelectedJobs() {
  const location = useLocation();
  const job = location.state;
  const { postApplyJob } = protectedStudentApiService();
  const { user } = userState();
  const navigate = useNavigate();
  const onApply = async () => {
    const res = await postApplyJob({
      job_id: job.job_id,
      user_id: user.user_id,
    });
    if (res == 1) {
      toast.success("Successfully applied!");
      navigate(-1);
    }
  };
  return (
    <>
      <>
        {" "}
        {job && (
          <div className="col-sm-7">
            <div className="card shadow m-2 p-4 jobs-card no-border">
              <div className="flex-between">
                <h5 className="heading">
                  {job.title || "Front-End Engineer React JS"}
                </h5>
                <h5 className="heading text-primary">Rs. 10 - 15 LPA</h5>
              </div>
              <p className="text-gray">
                {" "}
                {job.company || "Numax Data Lab Pvt. Ltd."}
              </p>
              <div className="row p-2">
                <div className="col-lg-8">
                  <div className="row  ">
                    <div className="chips btn-sm    ">
                      <IoBriefcaseOutline className="mx-2" /> {job.experience}{" "}
                      years
                    </div>
                    <div className="chips btn-sm   ">
                      <BsClockHistory className="mx-2" />
                      Full Time
                    </div>
                    <div className="chips btn-sm  ">
                      <GrLocation className="mx-2" />{" "}
                      {job.location || "Hyderabad"}
                    </div>
                    <div className="chips btn-sm   ">
                      <SlGraduation className="mx-2" /> Education:{" "}
                      {job.education || ""}
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 flex-end">
                  <button onClick={onApply} className="btn btn-primary">
                    Apply
                  </button>
                </div>
              </div>
              <hr />
              <div className="mt-2 content">
                <h5 className="heading">Job Description</h5>
                <p className="text-gray">
                  {job.job_description ||
                    "lorem ipsum dolor sit amet, consectetur adip"}
                </p>
              </div>
              <div className="mt-2 content">
                <h5 className="heading">Terms & Conditions</h5>
                <p className="text-gray">
                  {job.terms_condition ||
                    "lorem ipsum dolor sit amet, consectetur adip"}
                </p>
              </div>
              <div className="mt-2 content">
                <h5 className="heading">Skill Required</h5>
                <div className="flex align-items-center flex-wrap">
                  <Chip label="Action" className="mb-2 custom-chip" />
                  <Chip label="Comedy" className="mb-2 custom-chip" />
                  <Chip label="Mystery" className="mb-2 custom-chip" />
                  <Chip label="Thriller" className="mb-2 custom-chip" />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
