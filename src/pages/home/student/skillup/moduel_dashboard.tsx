import { useEffect, useState, useCallback } from "react";
import studentGlobalDataStore from "../../../../store/_global_studentData";
import ModuleVideoPlayer from "./video_player";
import { GiPadlock, GiPadlockOpen } from "react-icons/gi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import studentSkillUpApi from "../../../../services/_student_skillup_api";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { RxDoubleArrowLeft } from "react-icons/rx";
import $ from "jquery";
import Loader from "../../../../common/loader";

export default function VideoModuleDashboard() {
  const { skillUpModule } = studentGlobalDataStore();
  const { getCourseModules, getCourseProgress } = studentSkillUpApi();
  const [modules, setModules] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const { course_id, course_name } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const [playable, setPlayable] = useState<any>(null);
  const getData = async () => {
    if (!course_id) {
      navigate(-1);
    }
    const res1: any = await getCourseModules(course_id);
    console.log(res1.data);
    setModules(res1.data);
    const res2: any = await getCourseProgress();
    console.log(
      res2,
      res2.data.filter((x: any) => x.course_id == course_id)
    );
    setProgress(res2.data.filter((x: any) => x.course_id == course_id));
    setPlayable(res1.data[0]);
  };
  const onRefresh = async () => {
    const res1: any = await getCourseModules(course_id);
    console.log(res1.data);
    setModules(res1.data);
  };
  const onHoverIn = () => {
    $("#side-bar").css("right", "0rem");
  };
  const onHoverOut = () => {
    $("#side-bar").css("right", "-23rem");
  };
  const onNext = () => {
    if (playable.index < modules.length)
      setPlayable({
        ...modules[playable.index + 1],
        index: playable.index + 1,
      });
  };
  return (
    <>
      {!progress && <Loader />}
      {progress && (
        <div className="skillup-dashboard d-flex">
          <div
            onMouseLeave={onHoverOut}
            id="side-bar"
            className="side-panel shadow p-3"
          >
            <div className="switch flex-center" onMouseEnter={onHoverIn}>
              <RxDoubleArrowLeft color={"gray"} size={30} />
            </div>
            <h5 className="heading">Course Details: </h5>
            <div className="total flex-center flex-column p-3">
              <p>Course Completed</p>
              <div style={{ width: 100, height: 100 }}>
                {" "}
                {progress && (
                  <CircularProgressbar
                    value={progress.completed_percent || 0}
                    text={`${progress.completed_percent || 0}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,

                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "butt",

                      // Text size
                      textSize: "28px",

                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 0.5,

                      // Can specify path transition in more detail, or remove it entirely
                      // pathTransition: 'none',

                      // Colors
                      pathColor: `#2BBB10`,
                      textColor: "#2BBB10",
                      trailColor: "#f6fff5",
                      backgroundColor: "#f6fff5",
                    })}
                  />
                )}
              </div>
            </div>
            <div className="modules">
              <span className="p-2">Course Modules:</span>
              {modules &&
                modules.map((x: any, index: any) => (
                  <div
                    className={`items flex-between ${
                      playable.title == x.title ? "active" : ""
                    }`}
                    onClick={() => setPlayable({ ...x, index: index })}
                  >
                    {x.video_completed > 0 ? (
                      <GiPadlockOpen color={"#2BBB10"} size={27} />
                    ) : (
                      <GiPadlock color={"#B4B4B4"} size={27} />
                    )}

                    <div className="details align-items-start flex-column">
                      <div className="mb-auto  ">
                        <span className="name">{x.title}</span>
                      </div>
                      <div className=" ">
                        <div
                          className="heading "
                          dangerouslySetInnerHTML={{
                            __html: x.description
                              .replaceAll("<p>", "")
                              .replaceAll("</p>", ""),
                          }}
                        ></div>
                      </div>
                      <div className=" time">
                        <span>
                          {Math.floor(x.video_duration / 60)}:
                          {Math.floor(x.video_duration % 60)} mins
                        </span>
                      </div>
                    </div>
                    <div className="progress flex-center">
                      <ProgressBar
                        variant="success"
                        now={x.completed_percent}
                        label={`${Math.floor(x.completed_percent)}%`}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="frame" onMouseEnter={onHoverOut}>
            <ModuleVideoPlayer
              onRefresh={onRefresh}
              playNext={onNext}
              playable={playable}
            />
          </div>
        </div>
      )}
    </>
  );
}
