import React, { useState, useEffect, useCallback } from "react";
import $ from "jquery";
import { FiCode, FiBookOpen } from "react-icons/fi";
import { AiOutlineLogout, AiOutlineSchedule } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { rootRouterPath } from "../routing/router_paths";
import userState from "../store/_userState";
import AuthService from "../services/_auth";
import { Button } from "primereact/button";
import ProgressBar from "react-bootstrap/ProgressBar";
import protectedStudentApiService from "../services/_protected_student_api";
export default function Sidebar(props: any) {
  const [togglerShow, setTogglerShow] = useState(true);
  const { user } = userState();
  const [stdAtt, setStdAtt] = useState<any>();
  const { getStudentDetailsAll } = protectedStudentApiService();
  const getData = useCallback(async () => {
    const res: any = await getStudentDetailsAll();
    setStdAtt(res);
  }, [stdAtt]);
  useEffect(() => {
    doQuerry();
    runJquery();
    getData();
  }, []);

  const doQuerry = () => {
    if (!$("#toggler").is(":checked")) {
      $(".list-item").css("width", "max-content");
      $(".route_name").css({ display: "none" });
      $(".sub-icon").css({ display: "none" });
    } else {
      $(".sub-icon").css({ display: "initial" });
      $(".route_name").css({ display: "flex" });
      $(".list-item").css("width", "100%");
    }
  };
  const runJquery = () => {
    $("#toggler").change(function () {
      doQuerry();
    });
  };

  const onExpand = (path: any) => {
    $(`#li${path}`).addClass("active-list-item");
  };
  const { routings }: any = rootRouterPath();
  const RenderLi = ({ elements, sub, parentPath }: any) => {
    return elements.map((ele: any) => (
      <>
        {ele.shortcut && ele.path ? (
          <li
            id={`li${ele.path}`}
            className={`list-item ${
              location.pathname
                .split("/")
                [location.pathname.split("/").length - 1].replaceAll(
                  "%20",
                  " "
                ) == ele.path
                ? "active-list-item"
                : location.pathname
                    .split("/")
                    [location.pathname.split("/").length - 2].replaceAll(
                      "%20",
                      " "
                    ) == ele.path
                ? "active-list-item"
                : ""
            }`}
          >
            {ele.children.length && !ele?.no_collapse ? (
              <>
                <a
                  href={`#link-${ele.path}`}
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="link drop-link"
                  onClick={() => {
                    onExpand(ele.path);
                  }}
                  id={`#sub-${ele.path}`}
                >
                  <div className="cont">
                    {ele.icon ? <>{ele.icon}</> : <span className="dot"></span>}
                    <span className="route_name">{ele.route}</span>
                    <span className="sub-icon"></span>
                  </div>
                </a>
                <div
                  id={`link-${ele.path}`}
                  className="collapse sidebar-submenu"
                >
                  <RenderLi
                    elements={ele.children}
                    sub={1}
                    parentPath={
                      parentPath
                        ? parentPath + "/" + ele.path
                        : "/" + ele.path || ""
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => navigateToUrl(parentPath, ele)}
                  aria-expanded="false"
                  className={`link ${sub ? "bg-force" : ""}`}
                  id={`li-item-${ele.path}`}
                >
                  <div className="cont">
                    {ele.icon ? <>{ele.icon}</> : <span className="dot"></span>}
                    <span className="route_name">{ele.route}</span>
                  </div>
                </div>
              </>
            )}
          </li>
        ) : (
          <></>
        )}
      </>
    ));
  };
  const navigate = useNavigate();
  const navigateToUrl = (parentPath: any, ele: any) => {
    navigate(parentPath ? parentPath + "/" + ele.path : "/" + ele.path);
    setToggleMobile(false);
  };
  let location: any = useLocation();
  useEffect(() => {
    console.log(
      location.pathname.split("/")[location.pathname.split("/").length - 1]
    );
  }, [location]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [toggleMobile, setToggleMobile] = useState<boolean>(false);
  useEffect(() => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    $(window).resize(function () {
      if (window.innerWidth < 720) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);
  useEffect(() => {
    if (!toggleMobile) {
      $(".mobile-sidebar").css({ width: "0", opacity: "0" });
    } else {
      $(".mobile-sidebar").css({ width: "100vw", opacity: "1" });
    }
  }, [toggleMobile]);
  const { logout } = AuthService();
  return (
    <>
      {!isMobile && (
        <>
          {routings !== undefined && (
            <>
              <div
                className="sidebar"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <input
                  id="toggler"
                  className="checkbox"
                  type="checkbox"
                  name="toggler"
                  checked={togglerShow}
                  onChange={() => setTogglerShow(!togglerShow)}
                />
                <div className="open-close">
                  <div className="hamburger-lines">
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                  </div>{" "}
                </div>

                <div className="options d-flex flex-column ">
                  <div className="s-menu">
                    <ul className="list-group">
                      <RenderLi
                        elements={
                          routings.filter(
                            (x: any) =>
                              x.path == location.pathname.split("/")[1]
                          )[0]?.children
                        }
                        parentPath={`/${location.pathname.split("/")[1]}`}
                        sub={0}
                      />
                      {user?.role == "5" &&
                        togglerShow &&
                        location.pathname.split("/")[1].replaceAll("%20", "") ==
                          "Home" && (
                          <div className="only-dashboard flex-center flex-column">
                            <li className="list">
                              <img
                                className="sidebar-img"
                                src="/assets/student/referal.png"
                                alt=""
                              />
                            </li>
                            <button className="btn btn-primary btn-sm mx-auto">
                              Refer Now
                            </button>
                          </div>
                        )}
                      {user?.role == "5" &&
                        togglerShow &&
                        location.pathname.split("/")[1].replaceAll("%20", "") ==
                          "Enrolled" && (
                          <>
                            {stdAtt && (
                              <div className="only-dashboard mx-3 flex-start mt-5 pt-4  flex-column">
                                <p className="heading text-start">
                                  Course completed:{" "}
                                </p>
                                <span className="form-label">Present: </span>
                                <ProgressBar
                                  variant="info"
                                  now={
                                    (stdAtt.class_completed / stdAtt.total) *
                                    100
                                  }
                                  style={{ width: "100%" }}
                                  label={`${60}%`}
                                />

                                <hr />
                                <p className="heading text-start">
                                  Attendance:{" "}
                                </p>
                                <span className="form-label">Present: </span>
                                <ProgressBar
                                  variant="success"
                                  now={(stdAtt.present / stdAtt.total) * 100}
                                  style={{ width: "100%" }}
                                  label={`${stdAtt.present}/${stdAtt.total}`}
                                />
                                <br />
                                <span className="form-label">Absent: </span>
                                <ProgressBar
                                  variant="danger"
                                  now={(stdAtt.absent / stdAtt.total) * 100}
                                  style={{ width: "100%" }}
                                  label={`${stdAtt.absent}/${stdAtt.total}`}
                                />
                              </div>
                            )}
                          </>
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {isMobile && (
        <>
          {routings !== undefined && (
            <>
              <div
                className="mobile-sidebar"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <div
                  className="toggler"
                  onClick={() => setToggleMobile(!toggleMobile)}
                ></div>
                <div className="options d-flex flex-column ">
                  <div className="s-user">
                    <div className="user-image">
                      <img src={user.profile_url} className="image--cover" />
                    </div>
                    <div className="user-details">
                      <h3>{user.name} </h3>
                      <div className="d-flex"></div>
                      <p>
                        {user.username} <br />
                      </p>
                      <Button
                        onClick={logout}
                        className="p-button-secondary p-button-text"
                      >
                        <AiOutlineLogout />
                        <span className="mx-3">Logout</span>
                      </Button>
                    </div>
                  </div>
                  <div className="s-menu">
                    <ul className="list-group">
                      <RenderLi
                        elements={
                          routings.filter(
                            (x: any) =>
                              x.path == location.pathname.split("/")[1]
                          )[0]?.children
                        }
                        parentPath={`/${location.pathname.split("/")[1]}`}
                        sub={0}
                      />
                      {user?.role == "5" &&
                        location.pathname.split("/")[1].replaceAll("%20", "") ==
                          "Home" && (
                          <div className="only-dashboard flex-center flex-column">
                            <li className="list">
                              <img
                                className="sidebar-img"
                                src="/assets/student/referal.png"
                                alt=""
                              />
                            </li>
                            <button className="btn btn-primary btn-sm mx-auto">
                              Refer Now
                            </button>
                          </div>
                        )}
                      {user?.role == "5" &&
                        location.pathname.split("/")[1].replaceAll("%20", "") ==
                          "Enrolled" && (
                          <>
                            {stdAtt && (
                              <div className="only-dashboard mx-3 flex-start mt-5 pt-4   flex-column">
                                <p className="heading text-start">
                                  Course completed:{" "}
                                </p>
                                <span className="form-label">Present: </span>
                                <ProgressBar
                                  variant="info"
                                  now={
                                    (stdAtt.class_completed / stdAtt.total) *
                                    100
                                  }
                                  style={{ width: "100%" }}
                                  label={`${60}%`}
                                />

                                <hr />
                                <p className="heading text-start">
                                  Attendance:{" "}
                                </p>
                                <span className="form-label">Present: </span>
                                <ProgressBar
                                  variant="success"
                                  now={(stdAtt.present / stdAtt.total) * 100}
                                  style={{ width: "100%" }}
                                  label={`${stdAtt.present}/${stdAtt.total}`}
                                />
                                <br />
                                <span className="form-label">Absent: </span>
                                <ProgressBar
                                  variant="danger"
                                  now={(stdAtt.absent / stdAtt.total) * 100}
                                  style={{ width: "100%" }}
                                  label={`${stdAtt.absent}/${stdAtt.total}`}
                                />
                              </div>
                            )}
                          </>
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
