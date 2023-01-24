import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { SlGraduation } from "react-icons/sl";
import { Chip } from "primereact/chip";
import protectedStudentApiService from "../../../../services/_protected_student_api";
import userState from "../../../../store/_userState";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { Button } from "primereact/button";
import { useState } from "react";
import Loading from "../../../../common/loader";
import ShowMoreText from "react-show-more-text";
export default function SelectedJobs() {
  const location = useLocation();
  const job = location.state.job;
  const allJobs = location.state.allJob;
  const { postApplyJob } = protectedStudentApiService();
  const { user } = userState();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [applied, setApplied] = useState(false);
  const [recomended, setRecomended] = useState<any>(null);
  const [creeds, setCreeds] = useState<any>({
    job: job,
    file: null,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onValueChange = (val: any) => {
    setCreeds({ ...creeds, ...val });
  };
  const onApply = async () => {
    if (job.job_id && creeds.cv) {
      const res = await postApplyJob({
        job_id: job.job_id,
        user_id: user.user_id,
        cv: creeds.cv,
      });
      if (res == 1) {
        showApplied();
        setTimeout(() => {
          handleClose();
          navigate(-1);
        }, 3500);
      }
    }
  };
  const showApplied = () => {
    setApplied(true);
  };
  return (
    <>
      <>
        {!job && <Loading />}
        {job && (
          <>
            <div className="row">
              <div className="col-sm-7">
                <div className="card m-2 p-4 jobs-card">
                  <div className="flex-between">
                    <h5 className="heading">
                      {job.title || "Front-End Engineer React JS"}
                    </h5>
                    <h5 className="heading text-primary">
                      {job.package || "Rs. 10 - 15 LPA"}
                    </h5>
                  </div>
                  <p className="text-gray">
                    {" "}
                    {job.company || "Numax Data Lab Pvt. Ltd."}
                  </p>
                  <div className="d-flex flex-warp  ">
                    <div className="chips btn-sm    ">
                      <IoBriefcaseOutline className="mr-2" /> {job.experience}{" "}
                      years
                    </div>
                    <div className="chips btn-sm   ">
                      <BsClockHistory className="mr-2" />
                      Full Time
                    </div>
                    <div className="chips btn-sm  ">
                      <GrLocation className="mr-2" />{" "}
                      {job.location || "Hyderabad"}
                    </div>
                    <div className="chips btn-sm   ">
                      <SlGraduation className="mr-2" />
                      {job.education || ""}
                    </div>
                  </div>
                  <div className="flex-start mt-2">
                    <button onClick={handleShow} className="btn btn-primary">
                      Apply Now
                    </button>
                  </div>
                  <hr />
                  <div className="mt-2 content">
                    <h5 className="heading">Job Description</h5>
                    <div
                      className="text-gray"
                      dangerouslySetInnerHTML={{
                        __html: job.job_description,
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 content">
                    <h5 className="heading">Qualifications </h5>
                    <p className="text-gray">
                      {job.qualification ||
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
                      {JSON.parse(job.skills).map((x: any) => (
                        <Chip label={x} className="mb-2 custom-chip" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-5">
                {recomended &&
                  recomended.map((x: any) => (
                    <Link className="col-sm-6 " to="Selected Job" state={x}>
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
                        <div className="d-flex flex-warp align-item-start justify-content-start ">
                          <div className="chips btn-sm    ">
                            <IoBriefcaseOutline className="mx-2" />{" "}
                            {x.experience} years
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
        )}
      </>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        {applied ? (
          <>
            <div className="flex-center">Applied</div>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Submit your CV</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="applying mx-2">
                <div className="mb-2">
                  <h5 className="heading">Job: {creeds.job?.title}</h5>
                </div>
                <div className="mb-3">
                  <span className="text-gray text-sm">Upload CV</span>
                  <div className="flex-start">
                    <input
                      type="file"
                      className="form-control"
                      name="cv"
                      id="cv"
                      accept="application/msword, application/pdf"
                      placeholder="Submit your file  here"
                      onChange={(e) =>
                        onValueChange({
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="p-btn-gray  " onClick={handleClose}>
                Close
              </Button>
              <Button className="p-btn-success" onClick={onApply}>
                Apply
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
