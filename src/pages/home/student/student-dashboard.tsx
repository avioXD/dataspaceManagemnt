import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <>
      <div className=" s-dashboard">
        <div className="row mt-4">
          <div className="col-sm-6  ">
            <Link to="/Enrolled">
              <div className="image m-2">
                <img src="/assets/student/live_interactive.png" alt="" />
              </div>
            </Link>
          </div>
          <div className="col-sm-6 ">
            <Link to="/Enrolled/Skill Up Courses">
              <div className="image m-2">
                <img src="/assets/student/skill_up_course.png" alt="" />
              </div>
            </Link>
          </div>
          <div className="col-sm-12  ">
            <a href="https://webinar.dataspaceacademy.com/">
              <div className="image m-2">
                <img src="/assets/student/Events.png" alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
